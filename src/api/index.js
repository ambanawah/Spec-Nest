
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const port = process.env.PORT || 3001;
const saltRounds = 10;

// --- Database Connection ---
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// --- Middleware ---
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- In-memory cache for exchange rates ---
let conversionRates = {};

// --- Helper Functions ---

const refreshConversionRates = async () => {
  try {
    const result = await pool.query('SELECT * FROM exchange_rates');
    const newRates = {};
    result.rows.forEach(rate => {
      newRates[rate.currency_code] = parseFloat(rate.rate_to_usd);
    });
    conversionRates = newRates;
    console.log('Successfully refreshed conversion rates from database.');
    const defaultCurrencies = {
        'NGN': 1 / 1400, 'KES': 1 / 130, 'GHS': 1 / 14, 'ZAR': 1 / 18, 
        'EUR': 1.1, 'GBP': 1.25, 'JPY': 1 / 155
    };
    for (const curr in defaultCurrencies) {
        if (!conversionRates[curr]) {
            conversionRates[curr] = defaultCurrencies[curr];
            await pool.query('INSERT INTO exchange_rates (currency_code, rate_to_usd) VALUES ($1, $2) ON CONFLICT (currency_code) DO NOTHING', [curr, defaultCurrencies[curr]]);
        }
    }
  } catch (error) {
    console.error('Failed to fetch and refresh conversion rates:', error);
    if (Object.keys(conversionRates).length === 0) {
        conversionRates = { 'USD': 1.0, 'EUR': 1.1 };
    }
  }
};

// --- Authentication Middleware ---

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token not found' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Adds { id, role } to the request object
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Access denied. Admin role required.' });
    }
};

const isSeller = (req, res, next) => {
    if (req.user && (req.user.role === 'seller' || req.user.role === 'admin')) {
        next();
    } else {
        res.status(403).json({ error: 'Access denied. Seller or Admin role required.' });
    }
};


// --- API Endpoints ---

// ============================================
// PRODUCTS & CATALOG (Public)
// ============================================

app.get('/api/products', async (req, res) => {
    const { category, sortBy = 'price', sortOrder = 'asc', limit = 10, page = 1, currency = 'USD', specs } = req.query;
    const offset = (page - 1) * limit;
    const conversionRate = conversionRates[currency] || 1;

    let query = `
        SELECT p.*, c.name as category_name, p.price_usd / $1 as converted_price
        FROM products p JOIN categories c ON p.category_id = c.id
        WHERE p.is_active = true
    `;
    const params = [conversionRate];
    let paramIndex = 2;

    if (category) {
        query += ` AND c.name = $${paramIndex++}`;
        params.push(category);
    }

    if (specs) {
        try {
            const specsFilter = JSON.parse(specs);
            for (const key in specsFilter) {
                query += ` AND specs_json->>$${paramIndex++} = $${paramIndex++}`;
                params.push(key, specsFilter[key]);
            }
        } catch (e) {
            return res.status(400).json({ error: 'Invalid specs JSON format.' });
        }
    }

    query += ` ORDER BY ${sortBy === 'name' ? 'name' : 'converted_price'} ${sortOrder === 'desc' ? 'DESC' : 'ASC'}`;
    query += ` LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
    params.push(limit, offset);

    try {
        const { rows } = await pool.query(query, params);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/products/:id', async (req, res) => { /* ... unchanged ... */ });
app.get('/api/categories', async (req, res) => { /* ... unchanged ... */ });
app.get('/api/products/compare', async (req, res) => { /* ... unchanged ... */ });
app.get('/api/reviews/:productId', async (req, res) => { /* ... unchanged ... */ });

// ============================================
// USER & AUTH
// ============================================

app.post('/api/auth/register', async (req, res) => {
    const { email, password, name, role = 'customer' } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const { rows } = await pool.query(
            'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
            [name, email, hashedPassword, role]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ error: 'User with this email already exists.' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const user = rows[0];
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, userId: user.id, name: user.name, role: user.role });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ============================================
// CART (Authenticated)
// ============================================

app.get('/api/cart', authenticate, async (req, res) => {
    const userId = req.user.id;
    try {
        const { rows } = await pool.query(
            `SELECT p.id, p.name, p.price_usd, ci.quantity, p.image_url
             FROM cart_items ci JOIN products p ON ci.product_id = p.id
             WHERE ci.user_id = $1`,
            [userId]
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/cart/item', authenticate, async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;
    try {
        const { rows } = await pool.query(
            `INSERT INTO cart_items (user_id, product_id, quantity)
             VALUES ($1, $2, $3)
             ON CONFLICT (user_id, product_id)
             DO UPDATE SET quantity = cart_items.quantity + $3
             RETURNING *`,
            [userId, productId, quantity]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/cart/item/:productId', authenticate, async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.params;
    try {
        await pool.query('DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2', [userId, productId]);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ============================================
// ORDERS (Authenticated)
// ============================================

app.post('/api/orders', authenticate, async (req, res) => {
    const userId = req.user.id;
    const { shippingAddressId, currency } = req.body;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const { rows } = await client.query('SELECT place_order($1, $2, $3)', [userId, shippingAddressId, currency]);
        const orderId = rows[0].place_order;
        await client.query('COMMIT');
        res.status(201).json({ message: 'Order placed successfully', orderId });
    } catch (error) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: 'Failed to place order. ' + error.message });
    } finally {
        client.release();
    }
});

app.get('/api/orders', authenticate, async (req, res) => {
    const userId = req.user.id;
    try {
        const { rows } = await pool.query(
            `SELECT o.id as order_id, o.created_at, o.total_price, o.currency, o.status, a.full_address
             FROM orders o JOIN addresses a ON o.shipping_address_id = a.id
             WHERE o.user_id = $1 ORDER BY o.created_at DESC`,
            [userId]
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ============================================
// USER PROFILE (Authenticated)
// ============================================

app.post('/api/reviews', authenticate, async (req, res) => {
    const userId = req.user.id;
    const { productId, rating, comment } = req.body;
    const { rows } = await pool.query('INSERT INTO reviews (user_id, product_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *', [userId, productId, rating, comment]);
    res.status(201).json(rows[0]);
});

app.get('/api/wishlist', authenticate, async (req, res) => {
    const userId = req.user.id;
    const { rows } = await pool.query('SELECT p.* FROM products p JOIN wishlists w ON p.id = w.product_id WHERE w.user_id = $1', [userId]);
    res.json(rows);
});

app.post('/api/wishlist', authenticate, async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.body;
    const { rows } = await pool.query('INSERT INTO wishlists (user_id, product_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *', [userId, productId]);
    res.status(201).json(rows[0]);
});

app.get('/api/addresses', authenticate, async (req, res) => {
    const userId = req.user.id;
    const { rows } = await pool.query('SELECT * FROM addresses WHERE user_id = $1', [userId]);
    res.json(rows);
});

app.post('/api/addresses', authenticate, async (req, res) => {
    const userId = req.user.id;
    const { address_line1, city, postal_code, country } = req.body;
    const full_address = `${address_line1}, ${city}, ${postal_code}, ${country}`;
    const { rows } = await pool.query('INSERT INTO addresses (user_id, full_address, address_line1, city, postal_code, country) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [userId, full_address, address_line1, city, postal_code, country]);
    res.status(201).json(rows[0]);
});

// ============================================
// SELLER / ADMIN ROUTES
// ============================================

app.post('/api/seller/products', authenticate, isSeller, async (req, res) => {
    const sellerId = req.user.id;
    const { name, description, price_usd, category_id, stock_quantity, image_url, specs_json } = req.body;
    try {
        const { rows } = await pool.query(
            `INSERT INTO products (seller_id, name, description, price_usd, category_id, stock_quantity, image_url, specs_json)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [sellerId, name, description, price_usd, category_id, stock_quantity, image_url, specs_json]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/seller/products/:id', authenticate, isSeller, async (req, res) => {
    const { id } = req.params;
    const { name, description, price_usd, stock_quantity, is_active } = req.body;
    // Add check to ensure seller can only edit their own products (or if user is admin)
    try {
        let productQuery;
        if (req.user.role === 'admin') {
            productQuery = await pool.query('SELECT seller_id FROM products WHERE id = $1', [id]);
        } else {
            productQuery = await pool.query('SELECT seller_id FROM products WHERE id = $1 AND seller_id = $2', [id, req.user.id]);
        }
        if (productQuery.rows.length === 0) {
            return res.status(403).json({ error: "Permission denied. You can only edit your own products."}) 
        }

        const { rows } = await pool.query(
            `UPDATE products SET name = $1, description = $2, price_usd = $3, stock_quantity = $4, is_active = $5, updated_at = NOW()
             WHERE id = $6 RETURNING *`,
            [name, description, price_usd, stock_quantity, is_active, id]
        );
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// --- Server Initialization ---
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  refreshConversionRates();
  setInterval(refreshConversionRates, 3600 * 1000);
});

module.exports = app;
