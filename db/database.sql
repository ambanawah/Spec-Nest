-- SpecNest PostgreSQL Database Schema
-- Database-centric architecture: triggers, stored procedures, materialized views
-- Run via: npm run db:setup

-- ===================================================================
-- 0. CLEANUP
-- ===================================================================
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS wishlists CASCADE;
DROP TABLE IF EXISTS addresses CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS inventory_logs CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS exchange_rates CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS order_status CASCADE;
DROP MATERIALIZED VIEW IF EXISTS product_sales_stats;
DROP MATERIALIZED VIEW IF EXISTS category_sales_summary;

-- ===================================================================
-- 1. ENUMS
-- ===================================================================

CREATE TYPE user_role AS ENUM ('guest', 'customer', 'seller', 'admin');
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');

-- ===================================================================
-- 2. TABLES
-- ===================================================================

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(80) UNIQUE NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password_hash VARCHAR(256) NOT NULL,
    role user_role NOT NULL DEFAULT 'customer',
    -- Seller-specific fields (NULL for non-sellers)
    store_name VARCHAR(150),
    store_description TEXT,
    store_logo_url VARCHAR(500),
    seller_rating NUMERIC(3, 2) DEFAULT 0.00,
    is_verified_seller BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exchange_rates (
    currency_code VARCHAR(3) PRIMARY KEY,
    currency_name VARCHAR(60) NOT NULL,
    rate_against_usd DECIMAL NOT NULL,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    parent_id INTEGER REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price_usd NUMERIC(10, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    seller_id INTEGER REFERENCES users(id) ON DELETE SET NULL, -- NULL = platform product
    image_url VARCHAR(500),
    specs_json JSONB,
    low_stock_threshold INT NOT NULL DEFAULT 10,
    last_restocked TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- GIN index for fast JSONB spec filtering
CREATE INDEX idx_products_specs ON products USING GIN (specs_json);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_seller ON products(seller_id);
CREATE INDEX idx_products_price ON products(price_usd);

CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    label VARCHAR(50) DEFAULT 'Home', -- e.g. Home, Work, Other
    full_name VARCHAR(150) NOT NULL,
    line1 VARCHAR(255) NOT NULL,
    line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state_province VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100) NOT NULL,
    phone VARCHAR(30),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inventory_logs (
    log_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    previous_quantity INT NOT NULL,
    new_quantity INT NOT NULL,
    changed_by_user_id INT REFERENCES users(id) ON DELETE SET NULL,
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    reason VARCHAR(50) -- 'order_placed', 'admin_update', 'restock', 'seller_update'
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    shipping_address_id INTEGER REFERENCES addresses(id) ON DELETE SET NULL,
    status order_status NOT NULL DEFAULT 'pending',
    total_amount_usd NUMERIC(10, 2) NOT NULL,
    display_currency VARCHAR(3) REFERENCES exchange_rates(currency_code) DEFAULT 'USD',
    display_amount NUMERIC(10, 2),
    exchange_rate_at_purchase DECIMAL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
    product_id INTEGER REFERENCES products(id) ON DELETE SET NULL,
    seller_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL,
    unit_price_usd NUMERIC(10, 2) NOT NULL
);

CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

CREATE TABLE wishlists (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title VARCHAR(150),
    body TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(product_id, user_id) -- one review per user per product
);

CREATE INDEX idx_reviews_product ON reviews(product_id);

-- ===================================================================
-- 3. TRIGGERS & FUNCTIONS
-- ===================================================================

-- Auto-update updated_at on users
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_orders_updated_at
BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Log inventory changes automatically
CREATE OR REPLACE FUNCTION log_inventory_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF (NEW.stock_quantity IS DISTINCT FROM OLD.stock_quantity) THEN
        INSERT INTO inventory_logs (product_id, previous_quantity, new_quantity, reason)
        VALUES (NEW.id, OLD.stock_quantity, NEW.stock_quantity,
            COALESCE(current_setting('app.inventory_reason', true), 'admin_update'));
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_log_inventory
AFTER UPDATE OF stock_quantity ON products
FOR EACH ROW EXECUTE FUNCTION log_inventory_changes();

-- Enforce only one default address per user
CREATE OR REPLACE FUNCTION enforce_single_default_address()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_default = TRUE THEN
        UPDATE addresses SET is_default = FALSE
        WHERE user_id = NEW.user_id AND id <> NEW.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_single_default_address
BEFORE INSERT OR UPDATE ON addresses
FOR EACH ROW EXECUTE FUNCTION enforce_single_default_address();

-- ===================================================================
-- 4. STORED PROCEDURES
-- ===================================================================

-- Place an order atomically from the user's cart
CREATE OR REPLACE FUNCTION place_order(
    p_user_id INTEGER,
    p_currency_code VARCHAR(3),
    p_shipping_address_id INTEGER DEFAULT NULL
)
RETURNS INTEGER AS $$
DECLARE
    v_order_id INTEGER;
    v_total_usd NUMERIC(10, 2) := 0;
    v_cart_item RECORD;
    v_exchange_rate DECIMAL;
    v_display_amount NUMERIC(10, 2);
BEGIN
    -- Validate currency
    SELECT rate_against_usd INTO v_exchange_rate
    FROM exchange_rates WHERE currency_code = p_currency_code;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Invalid currency code: %', p_currency_code;
    END IF;

    -- Validate cart is not empty
    IF NOT EXISTS (SELECT 1 FROM cart_items WHERE user_id = p_user_id) THEN
        RAISE EXCEPTION 'Cart is empty for user %', p_user_id;
    END IF;

    -- Lock rows and validate stock
    FOR v_cart_item IN
        SELECT ci.product_id, ci.quantity, p.stock_quantity, p.price_usd, p.seller_id
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.user_id = p_user_id
        FOR UPDATE OF p
    LOOP
        IF v_cart_item.quantity > v_cart_item.stock_quantity THEN
            RAISE EXCEPTION 'Insufficient stock for product %', v_cart_item.product_id;
        END IF;
        v_total_usd := v_total_usd + (v_cart_item.price_usd * v_cart_item.quantity);
    END LOOP;

    v_display_amount := ROUND(v_total_usd * v_exchange_rate, 2);

    -- Create order
    INSERT INTO orders (user_id, shipping_address_id, status, total_amount_usd, display_currency, display_amount, exchange_rate_at_purchase)
    VALUES (p_user_id, p_shipping_address_id, 'pending', v_total_usd, p_currency_code, v_display_amount, v_exchange_rate)
    RETURNING id INTO v_order_id;

    -- Move cart to order_items and decrement stock
    PERFORM set_config('app.inventory_reason', 'order_placed', true);
    FOR v_cart_item IN
        SELECT ci.product_id, ci.quantity, p.price_usd, p.seller_id
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.user_id = p_user_id
    LOOP
        INSERT INTO order_items (order_id, product_id, seller_id, quantity, unit_price_usd)
        VALUES (v_order_id, v_cart_item.product_id, v_cart_item.seller_id, v_cart_item.quantity, v_cart_item.price_usd);

        UPDATE products
        SET stock_quantity = stock_quantity - v_cart_item.quantity
        WHERE id = v_cart_item.product_id;
    END LOOP;

    -- Clear cart
    DELETE FROM cart_items WHERE user_id = p_user_id;

    RETURN v_order_id;
END;
$$ LANGUAGE plpgsql;

-- Update order status with valid transition enforcement
CREATE OR REPLACE FUNCTION update_order_status(p_order_id INTEGER, p_new_status order_status)
RETURNS BOOLEAN AS $$
DECLARE
    v_current_status order_status;
BEGIN
    SELECT status INTO v_current_status FROM orders WHERE id = p_order_id;
    IF NOT FOUND THEN RAISE EXCEPTION 'Order % not found', p_order_id; END IF;

    IF NOT (CASE v_current_status
        WHEN 'pending'    THEN p_new_status IN ('processing', 'cancelled')
        WHEN 'processing' THEN p_new_status IN ('shipped', 'cancelled')
        WHEN 'shipped'    THEN p_new_status = 'delivered'
        ELSE FALSE
    END) THEN
        RAISE EXCEPTION 'Invalid status transition: % -> %', v_current_status, p_new_status;
    END IF;

    UPDATE orders SET status = p_new_status WHERE id = p_order_id;
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- ===================================================================
-- 5. MATERIALIZED VIEWS
-- ===================================================================

CREATE MATERIALIZED VIEW product_sales_stats AS
SELECT
    p.id AS product_id,
    p.name AS product_name,
    p.price_usd,
    p.stock_quantity,
    p.seller_id,
    c.name AS category_name,
    COALESCE(AVG(r.rating), 0) AS avg_rating,
    COUNT(DISTINCT r.id) AS review_count,
    COALESCE(SUM(oi.quantity), 0) AS total_units_sold,
    COALESCE(SUM(oi.quantity * oi.unit_price_usd), 0) AS total_revenue_usd
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.id AND o.status <> 'cancelled'
LEFT JOIN reviews r ON p.id = r.product_id
GROUP BY p.id, c.name
WITH DATA;

CREATE UNIQUE INDEX idx_pss_product_id ON product_sales_stats(product_id);

CREATE MATERIALIZED VIEW category_sales_summary AS
SELECT
    c.id AS category_id,
    c.name AS category_name,
    COUNT(DISTINCT p.id) AS product_count,
    COALESCE(SUM(oi.quantity), 0) AS total_units_sold,
    COALESCE(SUM(oi.quantity * oi.unit_price_usd), 0) AS total_revenue_usd
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.id AND o.status <> 'cancelled'
GROUP BY c.id
WITH DATA;

CREATE UNIQUE INDEX idx_css_category_id ON category_sales_summary(category_id);

CREATE OR REPLACE FUNCTION refresh_sales_stats()
RETURNS VOID AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY product_sales_stats;
    REFRESH MATERIALIZED VIEW CONCURRENTLY category_sales_summary;
END;
$$ LANGUAGE plpgsql;

-- ===================================================================
-- 6. SEED DATA
-- ===================================================================

-- Users: admin, a seller, and a customer
INSERT INTO users (username, email, password_hash, role, store_name, store_description, is_verified_seller) VALUES
('admin', 'admin@specnest.com', '$2b$10$placeholder_admin_hash', 'admin', NULL, NULL, FALSE),
('techvault', 'seller@techvault.com', '$2b$10$placeholder_seller_hash', 'seller', 'TechVault Store', 'Premium refurbished and new hardware', TRUE),
('john_doe', 'john@example.com', '$2b$10$placeholder_customer_hash', 'customer', NULL, NULL, FALSE);

-- Exchange rates (USD base) — major + African currencies
INSERT INTO exchange_rates (currency_code, currency_name, rate_against_usd) VALUES
-- Major
('USD', 'US Dollar', 1.00),
('EUR', 'Euro', 0.92),
('GBP', 'British Pound', 0.79),
('JPY', 'Japanese Yen', 157.65),
('CAD', 'Canadian Dollar', 1.36),
('AUD', 'Australian Dollar', 1.53),
('CHF', 'Swiss Franc', 0.90),
('CNY', 'Chinese Yuan', 7.24),
('INR', 'Indian Rupee', 83.50),
('BRL', 'Brazilian Real', 5.10),
('MXN', 'Mexican Peso', 17.15),
('SGD', 'Singapore Dollar', 1.34),
('HKD', 'Hong Kong Dollar', 7.82),
('SEK', 'Swedish Krona', 10.42),
('NOK', 'Norwegian Krone', 10.55),
-- African
('NGN', 'Nigerian Naira', 1601.00),
('ZAR', 'South African Rand', 18.63),
('KES', 'Kenyan Shilling', 129.50),
('GHS', 'Ghanaian Cedi', 15.80),
('EGP', 'Egyptian Pound', 48.42),
('ETB', 'Ethiopian Birr', 57.50),
('TZS', 'Tanzanian Shilling', 2680.00),
('UGX', 'Ugandan Shilling', 3780.00),
('MAD', 'Moroccan Dirham', 9.98),
('XOF', 'West African CFA Franc', 603.00),
('XAF', 'Central African CFA Franc', 603.00),
('DZD', 'Algerian Dinar', 134.50),
('ZMW', 'Zambian Kwacha', 26.80),
('RWF', 'Rwandan Franc', 1310.00),
('MZN', 'Mozambican Metical', 63.90);

-- Categories (with subcategory support)
INSERT INTO categories (name, slug, description) VALUES
('Laptops', 'laptops', 'Portable computers for all uses'),
('Desktops', 'desktops', 'Powerful stationary computers'),
('Components', 'components', 'CPUs, GPUs, RAM, storage and more'),
('Peripherals', 'peripherals', 'Keyboards, mice, monitors and accessories'),
('Networking', 'networking', 'Routers, switches, and network cards'),
('Storage', 'storage', 'SSDs, HDDs, and NAS devices'),
('Monitors', 'monitors', 'Displays for work and gaming');

-- Products (mix of platform and seller products)
INSERT INTO products (name, description, price_usd, stock_quantity, category_id, seller_id, specs_json, low_stock_threshold) VALUES
(
    'DevBook Pro 16',
    'High-performance laptop engineered for developers and creators.',
    2399.99, 50, 1, NULL,
    '{"brand":"Apple","cpu":"M3 Max","ram":"32GB","storage":"1TB SSD","display":"16.2-inch Liquid Retina XDR","battery":"22hr","weight":"2.14kg","os":"macOS"}',
    10
),
(
    'GamerStation 9000',
    'Top-tier gaming desktop with the latest Intel and NVIDIA hardware.',
    3499.00, 25, 2, NULL,
    '{"brand":"SpecNest","cpu":"Intel i9-14900K","ram":"64GB DDR5","storage":"4TB NVMe SSD","gpu":"NVIDIA RTX 4090","psu":"1000W 80+ Platinum","cooling":"360mm AIO"}',
    5
),
(
    'Quantum CPU X1',
    'Next-generation desktop processor with 24 cores.',
    899.50, 100, 3, NULL,
    '{"brand":"Intel","cores":24,"threads":32,"clock_speed":"5.8GHz","tdp":"125W","socket":"LGA1700","cache":"36MB L3"}',
    20
),
(
    'ErgoType Pro Keyboard',
    'Ergonomic mechanical keyboard with per-key RGB.',
    175.00, 200, 4, NULL,
    '{"brand":"Keychron","switch_type":"Cherry MX Brown","layout":"TKL","connectivity":"USB-C / Bluetooth 5.1","backlight":"RGB","material":"Aluminum frame"}',
    30
),
(
    'UltraView 27 4K Monitor',
    '27-inch 4K IPS monitor with 144Hz refresh rate.',
    649.00, 60, 7, 2,
    '{"brand":"LG","resolution":"3840x2160","refresh_rate":"144Hz","panel":"IPS","response_time":"1ms","hdr":"HDR600","ports":"2x HDMI 2.1, 1x DP 1.4, 4x USB-A"}',
    10
),
(
    'NexGen RTX 4080 Super',
    'High-end GPU for 4K gaming and AI workloads.',
    999.00, 40, 3, 2,
    '{"brand":"NVIDIA","vram":"16GB GDDR6X","cuda_cores":10240,"boost_clock":"2.55GHz","tdp":"320W","slot":"PCIe 4.0 x16","outputs":"3x DP 1.4a, 1x HDMI 2.1"}',
    8
);

-- Sample cart for john_doe (user id 3)
INSERT INTO cart_items (user_id, product_id, quantity) VALUES (3, 1, 1), (3, 4, 2);

-- Sample address for john_doe
INSERT INTO addresses (user_id, label, full_name, line1, city, country, is_default) VALUES
(3, 'Home', 'John Doe', '123 Tech Street', 'San Francisco', 'United States', TRUE);

-- Sample reviews
INSERT INTO reviews (product_id, user_id, rating, title, body) VALUES
(1, 3, 5, 'Best laptop I have ever owned', 'Incredible performance, the M3 Max handles everything I throw at it.'),
(4, 3, 4, 'Great keyboard, minor gripes', 'Typing feel is excellent. Bluetooth connection could be more stable.');
