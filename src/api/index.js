
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// --- CURRENCY CONVERSION ---
let conversionRates = {};

async function updateConversionRates() {
    try {
        console.log('Attempting to update currency conversion rates...');
        // In a real application, you would fetch this from a reliable API
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        if (!response.ok) {
            throw new Error(`Failed to fetch rates: ${response.statusText}`);
        }
        const data = await response.json();
        conversionRates = data.rates;

        // Also update the database
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            for (const currency in conversionRates) {
                const rate = conversionRates[currency];
                const query = 'INSERT INTO exchange_rates (currency_code, rate_against_base) VALUES ($1, $2) ON CONFLICT (currency_code) DO UPDATE SET rate_against_base = $2, last_updated = CURRENT_TIMESTAMP;';
                await client.query(query, [currency, rate]);
            }
            await client.query('COMMIT');
            console.log('Currency conversion rates updated successfully in-memory and in DB.');
        } catch (dbError) {
            await client.query('ROLLBACK');
            console.error('Database update failed, rolling back.', dbError);
            throw dbError; // re-throw to be caught by outer catch
        } finally {
            client.release();
        }

    } catch (error) {
        console.error('Failed to update conversion rates:', error);
        // Don't throw error on server start, but re-throw for cron job
        if (error.isCronJob) throw error;
    }
}


// --- API ENDPOINTS ---

// Cron job endpoint
app.get('/api/update-rates', async (req, res) => {
    // Secure this endpoint with a secret
    if (req.headers['x-vercel-cron-secret'] !== process.env.CRON_SECRET) {
        return res.status(401).send('Unauthorized');
    }
    try {
        const error = new Error("Cron job initiated error");
        error.isCronJob = true; // flag to differentiate from startup call
        await updateConversionRates();
        res.status(200).json({ message: 'Conversion rates updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update conversion rates.' });
    }
});


// Initial update on server start
updateConversionRates();


// --- AUTHENTICATION ---
app.post('/api/register', async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (username, password_hash, email) VALUES ($1, $2, $3) RETURNING id',
            [username, hashedPassword, email]
        );
        res.status(201).json({ userId: result.rows[0].id });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            if (await bcrypt.compare(password, user.password_hash)) {
                res.json({ message: 'Login successful', userId: user.id });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

// --- PRODUCTS ---
app.get('/api/products', async (req, res) => {
    const { category, sortBy, order = 'asc', currency = 'USD', ...query } = req.query;
    const specs = Object.entries(query).reduce((acc, [key, value]) => {
        if (key.startsWith('specs.')) {
            acc[key.substring(6)] = value;
        }
        return acc;
    }, {});

    try {
        let queryText = 'SELECT p.*, c.name as category_name FROM products p JOIN categories c ON p.category_id = c.id';
        const params = [];
        let whereClauses = [];

        if (category) {
            whereClauses.push(`c.name = $${params.length + 1}`);
            params.push(category);
        }

        Object.entries(specs).forEach(([key, value]) => {
            whereClauses.push(`p.specs_json->>'''${key}''' = $${params.length + 1}`);
            params.push(value);
        });

        if (whereClauses.length > 0) {
            queryText += ' WHERE ' + whereClauses.join(' AND ');
        }

        if (sortBy) {
            const validSortBy = ['price_usd', 'name', 'stock_quantity'];
            if (validSortBy.includes(sortBy)) {
                queryText += ` ORDER BY ${sortBy} ${order.toLowerCase() === 'desc' ? 'DESC' : 'ASC'}`;
            }
        }

        const { rows } = await pool.query(queryText, params);

        const rate = conversionRates[currency] || 1;
        const responseProducts = rows.map(product => {
            const { specs_json, price_usd, ...rest } = product;
            return {
                ...rest,
                specs: specs_json,
                price: (price_usd * rate).toFixed(2),
                currency_code: currency,
            };
        });

        res.json({ products: responseProducts });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Error fetching products' });
    }
});

app.get('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const { currency = 'USD' } = req.query;
    try {
        const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        if (rows.length > 0) {
            const product = rows[0];
            const rate = conversionRates[currency] || 1;
            const { specs_json, price_usd, ...rest } = product;
            const responseProduct = {
                ...rest,
                specs: specs_json,
                price: (price_usd * rate).toFixed(2),
                currency_code: currency,
            };
            res.json(responseProduct);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product' });
    }
});

app.get('/api/products/compare', async (req, res) => {
    const { ids } = req.query;
    if (!ids) {
        return res.status(400).json({ error: 'Product IDs are required' });
    }
    const productIds = ids.split(',').map(id => parseInt(id, 10));
    try {
        const { rows } = await pool.query('SELECT id, name, specs_json as specs FROM products WHERE id = ANY($1::int[])', [productIds]);
        res.json({ products: rows });
    } catch (error) {
        console.error('Error fetching products for comparison:', error);
        res.status(500).json({ error: 'Error fetching products for comparison' });
    }
});

// --- SHOPPING CART ---
app.get('/api/cart/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const { rows } = await pool.query(
            'SELECT p.name, p.price, ci.quantity FROM cart_items ci JOIN products p ON ci.product_id = p.id JOIN shopping_cart sc ON ci.cart_id = sc.id WHERE sc.user_id = $1',
            [userId]
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching cart' });
    }
});

app.post('/api/cart/:userId/add', async (req, res) => {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    try {
        const { rows } = await pool.query('SELECT id FROM shopping_cart WHERE user_id = $1', [userId]);
        let cartId;
        if (rows.length > 0) {
            cartId = rows[0].id;
        } else {
            const result = await pool.query('INSERT INTO shopping_cart (user_id) VALUES ($1) RETURNING id', [userId]);
            cartId = result.rows[0].id;
        }
        await pool.query(
            'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3)',
            [cartId, productId, quantity]
        );
        res.status(201).json({ message: 'Item added to cart' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding item to cart' });
    }
});

// --- PROMOTIONS ---
app.get('/api/promotions', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM promotions WHERE start_date <= NOW() AND end_date >= NOW()');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching promotions' });
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
