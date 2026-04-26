const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ── DATABASE ─────────────────────────────────────────────────
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// ── MIDDLEWARE: AUTH ─────────────────────────────────────────
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
};

const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admins only' });
    next();
};

// ── HEALTH CHECK ─────────────────────────────────────────────
app.get('/api/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.json({ status: 'ok', db: 'connected', time: new Date() });
    } catch (err) {
        res.status(500).json({ status: 'error', db: 'disconnected' });
    }
});

// ── AUTH ─────────────────────────────────────────────────────

// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return res.status(400).json({ error: 'Name, email and password are required' });
    try {
        const exists = await pool.query('SELECT user_id FROM users WHERE email = $1', [email]);
        if (exists.rows.length > 0)
            return res.status(409).json({ error: 'Email already registered' });

        const hashed = await bcrypt.hash(password, 10);
        const { rows } = await pool.query(
            'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING user_id, name, email, role',
            [name, email, hashed, 'customer']
        );
        const token = jwt.sign(
            { id: rows[0].user_id, role: rows[0].role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        res.status(201).json({ user: rows[0], token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ error: 'Email and password are required' });
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (rows.length === 0)
            return res.status(401).json({ error: 'Invalid credentials' });

        const valid = await bcrypt.compare(password, rows[0].password_hash);
        if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign(
            { id: rows[0].user_id, role: rows[0].role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        res.json({
            user: { id: rows[0].user_id, name: rows[0].name, email: rows[0].email, role: rows[0].role },
            token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login failed' });
    }
});

// GET /api/auth/me
app.get('/api/auth/me', authenticate, async (req, res) => {
    try {
        const { rows } = await pool.query(
            'SELECT user_id as id, name, email, role, created_at FROM users WHERE user_id = $1',
            [req.user.id]
        );
        if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

// ── PRODUCTS ─────────────────────────────────────────────────

// GET /api/products
app.get('/api/products', async (req, res) => {
    try {
        const { rows } = await pool.query(`
            SELECT p.product_id as id, p.name, p.price, p.stock_quantity,
                   p.image_url as image, p.ram, p.storage, p.cpu,
                   c.name as category
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.category_id
            WHERE p.is_active = true
            ORDER BY p.created_at DESC
        `);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

// GET /api/products/:id
app.get('/api/products/:id', async (req, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT p.*, c.name as category
             FROM products p
             LEFT JOIN categories c ON p.category_id = c.category_id
             WHERE p.product_id = $1`,
            [req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

// POST /api/products/filter
app.post('/api/products/filter', async (req, res) => {
    const { brand, ram, storage, price_min, price_max, category } = req.body;
    let conditions = ['p.is_active = true'];
    let values = [];
    let i = 1;

    if (brand?.length)      { conditions.push(`p.brand = ANY($${i++})`);    values.push(brand); }
    if (ram?.length)        { conditions.push(`p.ram = ANY($${i++})`);      values.push(ram); }
    if (storage?.length)    { conditions.push(`p.storage = ANY($${i++})`);  values.push(storage); }
    if (price_min != null)  { conditions.push(`p.price >= $${i++}`);        values.push(price_min); }
    if (price_max != null)  { conditions.push(`p.price <= $${i++}`);        values.push(price_max); }
    if (category)           { conditions.push(`c.name ILIKE $${i++}`);      values.push(category); }

    const sql = `
        SELECT p.product_id as id, p.name, p.price, p.image_url as image,
               p.ram, p.storage, p.cpu, c.name as category
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.category_id
        WHERE ${conditions.join(' AND ')}
        ORDER BY p.price ASC
    `;
    try {
        const { rows } = await pool.query(sql, values);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Filter failed' });
    }
});

// GET /api/products/compare?ids=1,2,3
app.get('/api/products/compare', async (req, res) => {
    const ids = req.query.ids?.split(',').map(Number).filter(Boolean);
    if (!ids || ids.length < 2) return res.status(400).json({ error: 'Provide at least 2 product IDs' });
    try {
        const { rows } = await pool.query(
            `SELECT p.*, c.name as category FROM products p
             LEFT JOIN categories c ON p.category_id = c.category_id
             WHERE p.product_id = ANY($1)`,
            [ids]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

// POST /api/products — Admin only
app.post('/api/products', authenticate, authorizeAdmin, async (req, res) => {
    const { name, price, stock_quantity, image_url, category_id, ram, storage, cpu, brand, description } = req.body;
    try {
        const { rows } = await pool.query(
            `INSERT INTO products (name, price, stock_quantity, image_url, category_id, ram, storage, cpu, brand, description, is_active)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,true) RETURNING *`,
            [name, price, stock_quantity, image_url, category_id, ram, storage, cpu, brand, description]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create product' });
    }
});

// PUT /api/products/:id — Admin only
app.put('/api/products/:id', authenticate, authorizeAdmin, async (req, res) => {
    const { name, price, stock_quantity, image_url, ram, storage, cpu, brand, description, is_active } = req.body;
    try {
        const { rows } = await pool.query(
            `UPDATE products SET name=$1, price=$2, stock_quantity=$3, image_url=$4,
             ram=$5, storage=$6, cpu=$7, brand=$8, description=$9, is_active=$10
             WHERE product_id=$11 RETURNING *`,
            [name, price, stock_quantity, image_url, ram, storage, cpu, brand, description, is_active, req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Update failed' });
    }
});

// DELETE /api/products/:id — Admin only (soft delete)
app.delete('/api/products/:id', authenticate, authorizeAdmin, async (req, res) => {
    try {
        await pool.query('UPDATE products SET is_active=false WHERE product_id=$1', [req.params.id]);
        res.json({ success: true, message: 'Product removed' });
    } catch (err) {
        res.status(500).json({ error: 'Delete failed' });
    }
});

// ── CATEGORIES ───────────────────────────────────────────────

// GET /api/categories
app.get('/api/categories', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM categories ORDER BY name ASC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

// ── CART ─────────────────────────────────────────────────────

// GET /api/cart
app.get('/api/cart', authenticate, async (req, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT c.cart_id, c.quantity, p.product_id, p.name, p.price, p.image_url as image
             FROM carts c
             JOIN products p ON c.product_id = p.product_id
             WHERE c.user_id = $1`,
            [req.user.id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

// POST /api/cart
app.post('/api/cart', authenticate, async (req, res) => {
    const { product_id, quantity = 1 } = req.body;
    try {
        const existing = await pool.query(
            'SELECT cart_id, quantity FROM carts WHERE user_id=$1 AND product_id=$2',
            [req.user.id, product_id]
        );
        if (existing.rows.length > 0) {
            const { rows } = await pool.query(
                'UPDATE carts SET quantity=quantity+$1 WHERE cart_id=$2 RETURNING *',
                [quantity, existing.rows[0].cart_id]
            );
            return res.json(rows[0]);
        }
        const { rows } = await pool.query(
            'INSERT INTO carts (user_id, product_id, quantity) VALUES ($1,$2,$3) RETURNING *',
            [req.user.id, product_id, quantity]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add to cart' });
    }
});

// PUT /api/cart/:cartId
app.put('/api/cart/:cartId', authenticate, async (req, res) => {
    const { quantity } = req.body;
    try {
        const { rows } = await pool.query(
            'UPDATE carts SET quantity=$1 WHERE cart_id=$2 AND user_id=$3 RETURNING *',
            [quantity, req.params.cartId, req.user.id]
        );
        if (rows.length === 0) return res.status(404).json({ error: 'Cart item not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Update failed' });
    }
});

// DELETE /api/cart/:cartId
app.delete('/api/cart/:cartId', authenticate, async (req, res) => {
    try {
        await pool.query('DELETE FROM carts WHERE cart_id=$1 AND user_id=$2', [req.params.cartId, req.user.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Delete failed' });
    }
});

// ── ORDERS ───────────────────────────────────────────────────

// POST /api/orders
app.post('/api/orders', authenticate, async (req, res) => {
    const { items, total_amount } = req.body;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const { rows } = await client.query(
            'INSERT INTO orders (user_id, total_amount, status) VALUES ($1, $2, $3) RETURNING order_id',
            [req.user.id, total_amount, 'pending']
        );
        const order_id = rows[0].order_id;
        for (const item of items) {
            // Check stock
            const stock = await client.query(
                'SELECT stock_quantity FROM products WHERE product_id=$1 FOR UPDATE',
                [item.product_id]
            );
            if (stock.rows[0].stock_quantity < item.quantity) {
                await client.query('ROLLBACK');
                return res.status(400).json({ error: `Insufficient stock for product ${item.product_id}` });
            }
            await client.query(
                'INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price) VALUES ($1,$2,$3,$4,$5)',
                [order_id, item.product_id, item.quantity, item.price, item.price * item.quantity]
            );
            await client.query(
                'UPDATE products SET stock_quantity=stock_quantity-$1 WHERE product_id=$2',
                [item.quantity, item.product_id]
            );
        }
        // Clear cart
        await client.query('DELETE FROM carts WHERE user_id=$1', [req.user.id]);
        await client.query('COMMIT');
        res.json({ success: true, order_id });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ error: 'Order failed' });
    } finally {
        client.release();
    }
});

// GET /api/orders — user's own orders
app.get('/api/orders', authenticate, async (req, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT o.order_id, o.total_amount, o.status, o.created_at,
                    json_agg(json_build_object(
                        'product_id', oi.product_id, 'name', p.name,
                        'quantity', oi.quantity, 'unit_price', oi.unit_price
                    )) as items
             FROM orders o
             JOIN order_items oi ON o.order_id = oi.order_id
             JOIN products p ON oi.product_id = p.product_id
             WHERE o.user_id = $1
             GROUP BY o.order_id
             ORDER BY o.created_at DESC`,
            [req.user.id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

// GET /api/orders/:id
app.get('/api/orders/:id', authenticate, async (req, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT o.*, json_agg(json_build_object(
                'product_id', oi.product_id, 'name', p.name,
                'quantity', oi.quantity, 'unit_price', oi.unit_price, 'total_price', oi.total_price
            )) as items
             FROM orders o
             JOIN order_items oi ON o.order_id = oi.order_id
             JOIN products p ON oi.product_id = p.product_id
             WHERE o.order_id = $1 AND o.user_id = $2
             GROUP BY o.order_id`,
            [req.params.id, req.user.id]
        );
        if (rows.length === 0) return res.status(404).json({ error: 'Order not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

// PUT /api/orders/:id/status — Admin only
app.put('/api/orders/:id/status', authenticate, authorizeAdmin, async (req, res) => {
    const { status } = req.body;
    const valid = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!valid.includes(status)) return res.status(400).json({ error: 'Invalid status' });
    try {
        const { rows } = await pool.query(
            'UPDATE orders SET status=$1 WHERE order_id=$2 RETURNING *',
            [status, req.params.id]
        );
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Update failed' });
    }
});

// ── REVIEWS ──────────────────────────────────────────────────

// GET /api/products/:id/reviews
app.get('/api/products/:id/reviews', async (req, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT r.review_id, r.rating, r.comment, r.created_at, u.name as user_name
             FROM reviews r
             JOIN users u ON r.user_id = u.user_id
             WHERE r.product_id = $1
             ORDER BY r.created_at DESC`,
            [req.params.id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

// POST /api/products/:id/reviews
app.post('/api/products/:id/reviews', authenticate, async (req, res) => {
    const { rating, comment } = req.body;
    if (!rating || rating < 1 || rating > 5)
        return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    try {
        const { rows } = await pool.query(
            'INSERT INTO reviews (product_id, user_id, rating, comment) VALUES ($1,$2,$3,$4) RETURNING *',
            [req.params.id, req.user.id, rating, comment]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Review failed' });
    }
});

// ── START SERVER ─────────────────────────────────────────────
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`SpecNest API running on port ${PORT}`));
}

module.exports = app;