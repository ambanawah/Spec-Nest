const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const port = process.env.API_PORT || 3001;
const saltRounds = 10;

// --- Database Connection ---
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// --- Middleware ---
app.use(cors({
  origin: [
    'https://specnest.vercel.app',
    /\.vercel\.app$/,
    'http://localhost:3000',
  ],
  credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- In-memory cache for exchange rates (rate_against_usd) ---
let conversionRates = {};

const refreshConversionRates = async () => {
  try {
    const { rows } = await pool.query('SELECT currency_code, rate_against_usd FROM exchange_rates');
    const newRates = {};
    rows.forEach(r => { newRates[r.currency_code] = parseFloat(r.rate_against_usd); });
    conversionRates = newRates;
    console.log(`✅ Refreshed ${rows.length} exchange rates from DB.`);
  } catch (err) {
    console.error('❌ Failed to refresh exchange rates:', err.message);
    if (Object.keys(conversionRates).length === 0) conversionRates = { USD: 1.0 };
  }
};

// --- Authentication Middleware ---

/**
 * authenticate — verifies JWT from Authorization: Bearer <token>
 * Sets req.user = { id, role }
 */
const authenticate = (req, res, next) => {
  const token = (req.headers['authorization'] || '').split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Authorization token missing' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};

const isAdmin = (req, res, next) =>
  req.user?.role === 'admin' ? next() : res.status(403).json({ error: 'Admin role required' });

const isSeller = (req, res, next) =>
  ['seller', 'admin'].includes(req.user?.role) ? next() : res.status(403).json({ error: 'Seller or Admin role required' });

// ============================================================
// EXCHANGE RATES (Public)
// GET  /api/rates          — all rates
// ============================================================

app.get('/api/rates', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT currency_code, currency_name, rate_against_usd FROM exchange_rates ORDER BY currency_code');
    res.json(rows);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ============================================================
// CATEGORIES (Public)
// GET  /api/categories     — all categories
// ============================================================

app.get('/api/categories', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM categories ORDER BY name');
    res.json(rows);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ============================================================
// PRODUCTS (Public)
// GET  /api/products        — list with filtering, sorting, pagination, currency conversion
//   query params:
//     category (string)     — filter by category name
//     sellerId (int)        — filter by seller
//     sortBy (price|name)   — default: price
//     sortOrder (asc|desc)  — default: asc
//     limit (int)           — default: 10
//     page (int)            — default: 1
//     currency (string)     — ISO code, default: USD
//     specs (JSON string)   — e.g. {"brand":"Intel","cores":"24"}
// GET  /api/products/compare?ids=1,2,3  — side-by-side specs
// GET  /api/products/:id   — single product
// ============================================================

app.get('/api/products', async (req, res) => {
  const { category, sellerId, search, sortBy = 'price', sortOrder = 'asc', limit = 10, page = 1, currency = 'USD', specs } = req.query;
  const rate = conversionRates[currency] ?? 1;
  const offset = (parseInt(page) - 1) * parseInt(limit);

  let query = `
    SELECT p.id, p.name, p.description, p.price_usd,
           ROUND(p.price_usd * $1, 2) AS converted_price,
           $2::text AS display_currency,
           p.stock_quantity, p.image_url, p.specs_json, p.is_active,
           c.name AS category_name,
           u.store_name AS seller_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN users u ON p.seller_id = u.id
    WHERE p.is_active = true
  `;
  const params = [rate, currency];
  let i = 3;

  if (category) { query += ` AND c.slug = $${i++}`; params.push(category); }
  if (sellerId) { query += ` AND p.seller_id = $${i++}`; params.push(sellerId); }
  if (search) { query += ` AND p.name ILIKE $${i++}`; params.push(`%${search}%`); }

  if (specs) {
    try {
      const specsFilter = JSON.parse(specs);
      for (const [key, val] of Object.entries(specsFilter)) {
        // Parameterised key lookup — safe against injection
        query += ` AND specs_json->>$${i++} = $${i++}`;
        params.push(key, String(val));
      }
    } catch {
      return res.status(400).json({ error: 'Invalid specs JSON' });
    }
  }

  const orderCol = sortBy === 'name' ? 'p.name' : 'p.price_usd';
  const orderDir = sortOrder === 'desc' ? 'DESC' : 'ASC';
  query += ` ORDER BY ${orderCol} ${orderDir} LIMIT $${i++} OFFSET $${i++}`;
  params.push(parseInt(limit), offset);

  try {
    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/products/compare', async (req, res) => {
  const ids = (req.query.ids || '').split(',').map(Number).filter(Boolean);
  if (ids.length < 2) return res.status(400).json({ error: 'Provide at least 2 product ids' });
  try {
    const { rows } = await pool.query(
      'SELECT id, name, price_usd, specs_json, image_url FROM products WHERE id = ANY($1)',
      [ids]
    );
    res.json(rows);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  const currency = req.query.currency || 'USD';
  const rate = conversionRates[currency] ?? 1;
  try {
    const { rows } = await pool.query(
      `SELECT p.*, ROUND(p.price_usd * $1, 2) AS converted_price, $2::text AS display_currency,
              c.name AS category_name, u.store_name AS seller_name
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN users u ON p.seller_id = u.id
       WHERE p.id = $3`,
      [rate, currency, req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Product not found' });
    res.json(rows[0]);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ============================================================
// REVIEWS (Public read, Authenticated write)
// GET  /api/reviews/:productId
// POST /api/reviews
// ============================================================

app.get('/api/reviews/:productId', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT r.id, r.rating, r.title, r.body, r.created_at, u.username
       FROM reviews r JOIN users u ON r.user_id = u.id
       WHERE r.product_id = $1 ORDER BY r.created_at DESC`,
      [req.params.productId]
    );
    res.json(rows);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/reviews', authenticate, async (req, res) => {
  const { productId, rating, title, body } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO reviews (user_id, product_id, rating, title, body)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (product_id, user_id) DO UPDATE SET rating=$3, title=$4, body=$5, updated_at=NOW()
       RETURNING *`,
      [req.user.id, productId, rating, title, body]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// AUTH
// POST /api/auth/register
// POST /api/auth/login
// ============================================================

app.post('/api/auth/register', async (req, res) => {
  const { username, email, password, role = 'customer', store_name, store_description } = req.body;
  if (!username || !email || !password) return res.status(400).json({ error: 'username, email and password are required' });
  try {
    const password_hash = await bcrypt.hash(password, saltRounds);
    const { rows } = await pool.query(
      `INSERT INTO users (username, email, password_hash, role, store_name, store_description)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, username, email, role, store_name`,
      [username, email, password_hash, role, store_name || null, store_description || null]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'Username or email already exists' });
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (!rows.length) return res.status(401).json({ error: 'Invalid credentials' });
    const user = rows[0];
    if (!(await bcrypt.compare(password, user.password_hash))) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, userId: user.id, username: user.username, role: user.role, store_name: user.store_name });
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ============================================================
// CART (Authenticated)
// GET    /api/cart
// POST   /api/cart/item          body: { productId, quantity }
// PUT    /api/cart/item/:productId  body: { quantity }
// DELETE /api/cart/item/:productId
// ============================================================

app.get('/api/cart', authenticate, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT p.id, p.name, p.price_usd, p.image_url, ci.quantity
       FROM cart_items ci JOIN products p ON ci.product_id = p.id
       WHERE ci.user_id = $1`,
      [req.user.id]
    );
    res.json(rows);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/cart/item', authenticate, async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3)
       ON CONFLICT (user_id, product_id) DO UPDATE SET quantity = cart_items.quantity + $3
       RETURNING *`,
      [req.user.id, productId, quantity]
    );
    res.status(201).json(rows[0]);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/cart/item/:productId', authenticate, async (req, res) => {
  const { quantity } = req.body;
  if (!quantity || quantity < 1) return res.status(400).json({ error: 'quantity must be >= 1' });
  try {
    const { rows } = await pool.query(
      'UPDATE cart_items SET quantity = $1 WHERE user_id = $2 AND product_id = $3 RETURNING *',
      [quantity, req.user.id, req.params.productId]
    );
    if (!rows.length) return res.status(404).json({ error: 'Cart item not found' });
    res.json(rows[0]);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/cart/item/:productId', authenticate, async (req, res) => {
  try {
    await pool.query('DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2', [req.user.id, req.params.productId]);
    res.status(204).send();
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ============================================================
// ORDERS (Authenticated)
// POST /api/orders          body: { currency, shippingAddressId }
// GET  /api/orders          — current user's order history
// GET  /api/orders/:id      — single order with items
// ============================================================

app.post('/api/orders', authenticate, async (req, res) => {
  const { currency = 'USD', shippingAddressId } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // place_order(p_user_id, p_currency_code, p_shipping_address_id)
    const { rows } = await client.query(
      'SELECT place_order($1, $2, $3) AS order_id',
      [req.user.id, currency, shippingAddressId || null]
    );
    await client.query('COMMIT');
    res.status(201).json({ orderId: rows[0].order_id });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(400).json({ error: err.message });
  } finally {
    client.release();
  }
});

app.get('/api/orders', authenticate, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT o.id, o.status, o.total_amount_usd, o.display_currency, o.display_amount,
              o.exchange_rate_at_purchase, o.created_at,
              a.line1, a.city, a.country
       FROM orders o
       LEFT JOIN addresses a ON o.shipping_address_id = a.id
       WHERE o.user_id = $1 ORDER BY o.created_at DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/orders/:id', authenticate, async (req, res) => {
  try {
    const orderRes = await pool.query(
      `SELECT o.*, a.line1, a.city, a.country FROM orders o
       LEFT JOIN addresses a ON o.shipping_address_id = a.id
       WHERE o.id = $1 AND o.user_id = $2`,
      [req.params.id, req.user.id]
    );
    if (!orderRes.rows.length) return res.status(404).json({ error: 'Order not found' });
    const itemsRes = await pool.query(
      `SELECT oi.quantity, oi.unit_price_usd, p.name, p.image_url
       FROM order_items oi JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = $1`,
      [req.params.id]
    );
    res.json({ ...orderRes.rows[0], items: itemsRes.rows });
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ============================================================
// ADDRESSES (Authenticated)
// GET  /api/addresses
// POST /api/addresses
// PUT  /api/addresses/:id
// DELETE /api/addresses/:id
// ============================================================

app.get('/api/addresses', authenticate, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM addresses WHERE user_id = $1 ORDER BY is_default DESC', [req.user.id]);
    res.json(rows);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/addresses', authenticate, async (req, res) => {
  const { label = 'Home', full_name, line1, line2, city, state_province, postal_code, country, phone, is_default = false } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO addresses (user_id, label, full_name, line1, line2, city, state_province, postal_code, country, phone, is_default)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [req.user.id, label, full_name, line1, line2 || null, city, state_province || null, postal_code || null, country, phone || null, is_default]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/addresses/:id', authenticate, async (req, res) => {
  const { label, full_name, line1, line2, city, state_province, postal_code, country, phone, is_default } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE addresses SET label=$1, full_name=$2, line1=$3, line2=$4, city=$5,
       state_province=$6, postal_code=$7, country=$8, phone=$9, is_default=$10
       WHERE id=$11 AND user_id=$12 RETURNING *`,
      [label, full_name, line1, line2 || null, city, state_province || null, postal_code || null, country, phone || null, is_default, req.params.id, req.user.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Address not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/addresses/:id', authenticate, async (req, res) => {
  try {
    await pool.query('DELETE FROM addresses WHERE id = $1 AND user_id = $2', [req.params.id, req.user.id]);
    res.status(204).send();
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ============================================================
// WISHLIST (Authenticated)
// GET    /api/wishlist
// POST   /api/wishlist          body: { productId }
// DELETE /api/wishlist/:productId
// ============================================================

app.get('/api/wishlist', authenticate, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT p.id, p.name, p.price_usd, p.image_url
       FROM wishlists w JOIN products p ON w.product_id = p.id
       WHERE w.user_id = $1`,
      [req.user.id]
    );
    res.json(rows);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/wishlist', authenticate, async (req, res) => {
  const { productId } = req.body;
  try {
    await pool.query(
      'INSERT INTO wishlists (user_id, product_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [req.user.id, productId]
    );
    res.status(201).json({ productId });
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/wishlist/:productId', authenticate, async (req, res) => {
  try {
    await pool.query('DELETE FROM wishlists WHERE user_id = $1 AND product_id = $2', [req.user.id, req.params.productId]);
    res.status(204).send();
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ============================================================
// SELLER ROUTES (Authenticated + Seller/Admin)
// POST /api/seller/products
// PUT  /api/seller/products/:id
// GET  /api/seller/products      — seller's own listings
// GET  /api/seller/orders        — orders containing seller's products
// ============================================================

app.get('/api/seller/products', authenticate, isSeller, async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM products WHERE seller_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(rows);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/seller/products', authenticate, isSeller, async (req, res) => {
  const { name, description, price_usd, category_id, stock_quantity, image_url, specs_json, low_stock_threshold } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO products (seller_id, name, description, price_usd, category_id, stock_quantity, image_url, specs_json, low_stock_threshold)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [req.user.id, name, description, price_usd, category_id, stock_quantity, image_url || null, specs_json || null, low_stock_threshold || 10]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/seller/products/:id', authenticate, isSeller, async (req, res) => {
  const { name, description, price_usd, stock_quantity, is_active, low_stock_threshold } = req.body;
  try {
    // Sellers can only edit their own; admins can edit any
    const ownerCheck = req.user.role === 'admin'
      ? await pool.query('SELECT id FROM products WHERE id = $1', [req.params.id])
      : await pool.query('SELECT id FROM products WHERE id = $1 AND seller_id = $2', [req.params.id, req.user.id]);
    if (!ownerCheck.rows.length) return res.status(403).json({ error: 'Permission denied' });

    const { rows } = await pool.query(
      `UPDATE products SET name=$1, description=$2, price_usd=$3, stock_quantity=$4, is_active=$5, low_stock_threshold=$6
       WHERE id=$7 RETURNING *`,
      [name, description, price_usd, stock_quantity, is_active, low_stock_threshold || 10, req.params.id]
    );
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/seller/orders', authenticate, isSeller, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT o.id AS order_id, o.status, o.created_at,
              oi.quantity, oi.unit_price_usd, p.name AS product_name
       FROM order_items oi
       JOIN orders o ON oi.order_id = o.id
       JOIN products p ON oi.product_id = p.id
       WHERE oi.seller_id = $1
       ORDER BY o.created_at DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ============================================================
// ADMIN ROUTES (Authenticated + Admin)
// PUT  /api/admin/orders/:id/status   body: { status }
// GET  /api/admin/users
// GET  /api/admin/inventory-logs
// POST /api/admin/rates/refresh       — force refresh from DB
// ============================================================

app.put('/api/admin/orders/:id/status', authenticate, isAdmin, async (req, res) => {
  const { status } = req.body;
  try {
    await pool.query('SELECT update_order_status($1, $2::order_status)', [req.params.id, status]);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/admin/users', authenticate, isAdmin, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, username, email, role, is_verified_seller, created_at FROM users ORDER BY created_at DESC');
    res.json(rows);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/admin/inventory-logs', authenticate, isAdmin, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT il.*, p.name AS product_name FROM inventory_logs il
       JOIN products p ON il.product_id = p.id
       ORDER BY il.changed_at DESC LIMIT 200`
    );
    res.json(rows);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/admin/rates/refresh', authenticate, isAdmin, async (req, res) => {
  await refreshConversionRates();
  res.json({ rates: conversionRates });
});

// --- Server Initialization ---
app.listen(port, async () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  await refreshConversionRates();
  setInterval(refreshConversionRates, 60 * 60 * 1000); // refresh every hour
});

module.exports = app;
