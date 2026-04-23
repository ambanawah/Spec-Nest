-- SpecNest PostgreSQL Database Setup
-- This script contains the complete schema, procedures, triggers, and views.

-- Drop existing objects to start fresh
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS inventory_logs CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS exchange_rates CASCADE;
DROP MATERIALIZED VIEW IF EXISTS product_sales_stats;
DROP MATERIALIZED VIEW IF EXISTS category_sales_summary;

-- ===================================================================
-- 1. TABLE CREATION
-- ===================================================================

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(80) UNIQUE NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password_hash VARCHAR(256) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_admin BOOLEAN DEFAULT FALSE
);

-- Exchange Rates Table
CREATE TABLE exchange_rates (
    currency_code VARCHAR(3) PRIMARY KEY,
    rate_against_base DECIMAL NOT NULL,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- Products Table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price_usd NUMERIC(10, 2) NOT NULL, -- Base price in USD
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    category_id INTEGER REFERENCES categories(id),
    image_url VARCHAR(500),
    specs_json JSONB, -- For flexible product specifications
    low_stock_threshold INT NOT NULL DEFAULT 10,
    last_restocked TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Inventory Logs Table
CREATE TABLE inventory_logs (
    log_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id),
    previous_quantity INT,
    new_quantity INT,
    changed_by_user_id INT REFERENCES users(id),
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    reason VARCHAR(50) -- e.g., 'order_placed', 'admin_update', 'restock'
);

-- Orders Table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    total_amount NUMERIC(10, 2), -- Total in the currency of purchase
    currency_code VARCHAR(3) REFERENCES exchange_rates(currency_code),
    exchange_rate_at_purchase DECIMAL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) NOT NULL,
    product_id INTEGER REFERENCES products(id) NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price_usd NUMERIC(10, 2) NOT NULL -- Price in base currency for consistent reporting
);

-- Cart Items Table
CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    product_id INTEGER REFERENCES products(id) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

-- ===================================================================
-- 2. TRIGGERS AND FUNCTIONS
-- ===================================================================

-- Trigger function to log inventory changes
CREATE OR REPLACE FUNCTION log_inventory_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF (NEW.stock_quantity IS DISTINCT FROM OLD.stock_quantity) THEN
        INSERT INTO inventory_logs (product_id, previous_quantity, new_quantity, reason)
        VALUES (NEW.id, OLD.stock_quantity, NEW.stock_quantity, 'admin_update'); -- Reason can be more dynamic
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach trigger to products table
CREATE TRIGGER trigger_log_inventory_changes
AFTER UPDATE OF stock_quantity ON products
FOR EACH ROW
EXECUTE FUNCTION log_inventory_changes();

-- ===================================================================
-- 3. STORED PROCEDURES
-- ===================================================================

-- Stored procedure to place an order from cart
CREATE OR REPLACE FUNCTION place_order(p_user_id INTEGER, p_currency_code VARCHAR(3))
RETURNS INTEGER AS $$
DECLARE
    v_order_id INTEGER;
    v_total_usd NUMERIC(10, 2) := 0;
    v_cart_item RECORD;
    v_exchange_rate DECIMAL;
BEGIN
    -- Get exchange rate
    SELECT rate_against_base INTO v_exchange_rate FROM exchange_rates WHERE currency_code = p_currency_code;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Invalid currency code: %', p_currency_code;
    END IF;

    -- Validate stock and calculate total in USD
    FOR v_cart_item IN
        SELECT ci.product_id, ci.quantity, p.stock_quantity, p.price_usd
        FROM cart_items ci JOIN products p ON ci.product_id = p.id
        WHERE ci.user_id = p_user_id
    LOOP
        IF v_cart_item.quantity > v_cart_item.stock_quantity THEN
            RAISE EXCEPTION 'Insufficient stock for product %', v_cart_item.product_id;
        END IF;
        v_total_usd := v_total_usd + (v_cart_item.price_usd * v_cart_item.quantity);
    END LOOP;

    -- Create the order
    INSERT INTO orders (user_id, status, total_amount, currency_code, exchange_rate_at_purchase)
    VALUES (p_user_id, 'pending', v_total_usd * v_exchange_rate, p_currency_code, v_exchange_rate)
    RETURNING id INTO v_order_id;

    -- Move cart items to order items and update inventory
    FOR v_cart_item IN
        SELECT ci.product_id, ci.quantity, p.price_usd FROM cart_items ci
        JOIN products p ON ci.product_id = p.id WHERE ci.user_id = p_user_id
    LOOP
        INSERT INTO order_items (order_id, product_id, quantity, unit_price_usd)
        VALUES (v_order_id, v_cart_item.product_id, v_cart_item.quantity, v_cart_item.price_usd);

        UPDATE products
        SET stock_quantity = stock_quantity - v_cart_item.quantity
        WHERE id = v_cart_item.product_id;
    END LOOP;

    -- Clear the cart
    DELETE FROM cart_items WHERE user_id = p_user_id;

    RETURN v_order_id;
END;
$$ LANGUAGE plpgsql;

-- Stored procedure to update order status
CREATE OR REPLACE FUNCTION update_order_status(p_order_id INTEGER, p_new_status VARCHAR)
RETURNS BOOLEAN AS $$
DECLARE
    v_current_status VARCHAR;
BEGIN
    SELECT status INTO v_current_status FROM orders WHERE id = p_order_id;
    IF NOT FOUND THEN RAISE EXCEPTION 'Order % not found', p_order_id; END IF;

    IF NOT CASE v_current_status
        WHEN 'pending' THEN p_new_status IN ('processing', 'cancelled')
        WHEN 'processing' THEN p_new_status IN ('shipped', 'cancelled')
        WHEN 'shipped' THEN p_new_status = 'delivered'
        ELSE FALSE
    END CASE THEN
        RAISE EXCEPTION 'Invalid status transition from % to %', v_current_status, p_new_status;
    END IF;

    UPDATE orders SET status = p_new_status, updated_at = CURRENT_TIMESTAMP WHERE id = p_order_id;
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- ===================================================================
-- 4. MATERIALIZED VIEWS
-- ===================================================================

-- Product sales statistics view
CREATE MATERIALIZED VIEW product_sales_stats AS
SELECT
    p.id AS product_id,
    p.name AS product_name,
    p.price_usd,
    p.stock_quantity,
    c.name AS category_name,
    COALESCE(SUM(oi.quantity), 0) AS total_units_sold,
    COALESCE(SUM(oi.quantity * oi.unit_price_usd), 0) AS total_revenue_usd
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.id AND o.status <> 'cancelled'
GROUP BY p.id, c.name
WITH DATA;

CREATE UNIQUE INDEX idx_product_sales_stats_product_id ON product_sales_stats(product_id);

-- Category sales summary view
CREATE MATERIALIZED VIEW category_sales_summary AS
SELECT
    c.id AS category_id,
    c.name AS category_name,
    COUNT(p.id) AS product_count,
    COALESCE(SUM(oi.quantity), 0) AS total_units_sold,
    COALESCE(SUM(oi.quantity * oi.unit_price_usd), 0) AS total_revenue_usd
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.id AND o.status <> 'cancelled'
GROUP BY c.id
WITH DATA;

CREATE UNIQUE INDEX idx_category_sales_summary_category_id ON category_sales_summary(category_id);

-- Function to refresh all materialized views
CREATE OR REPLACE FUNCTION refresh_sales_stats()
RETURNS VOID AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY product_sales_stats;
    REFRESH MATERIALIZED VIEW CONCURRENTLY category_sales_summary;
END;
$$ LANGUAGE plpgsql;

-- ===================================================================
-- 5. SAMPLE DATA INSERTION
-- ===================================================================

-- Insert sample users
INSERT INTO users (username, email, password_hash, is_admin) VALUES
('admin_user', 'admin@specnest.com', 'supersecretpasswordhash', TRUE),
('john_doe', 'john.doe@example.com', 'anothersecretpasswordhash', FALSE);

-- Insert sample currencies
INSERT INTO exchange_rates (currency_code, rate_against_base) VALUES
('USD', 1.00),
('EUR', 0.92),
('GBP', 0.79),
('JPY', 157.65);

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
    ('Laptops', 'Portable computers for all uses'),
    ('Desktops', 'Powerful stationary computers'),
    ('Components', 'Processors, GPUs, RAM, and more'),
    ('Peripherals', 'Keyboards, mice, and monitors');

-- Insert sample products
INSERT INTO products (name, description, price_usd, stock_quantity, category_id, specs_json) VALUES
    ('DevBook Pro 16', 'High-performance laptop for developers', 2399.99, 50, 1, '{"cpu": "M3 Max", "ram": "32GB", "storage": "1TB SSD"}'),
    ('GamerStation 9000', 'Top-tier gaming desktop', 3499.00, 25, 2, '{"cpu": "Intel i9-14900K", "ram": "64GB DDR5", "storage": "4TB NVMe SSD", "gpu": "NVIDIA RTX 4090"}'),
    ('Quantum CPU X', 'Next-generation processor', 899.50, 100, 3, '{"cores": 24, "clock_speed": "5.8GHz"}'),
    ('ErgoType Keyboard', 'Ergonomic mechanical keyboard', 175.00, 200, 4, '{"switch_type": "Cherry MX Brown", "layout": "TKL"}');

-- Sample cart for a user
INSERT INTO cart_items (user_id, product_id, quantity) VALUES
(2, 1, 1),
(2, 4, 1);

-- You can test the main stored procedure by running:
-- SELECT place_order(2, 'EUR'); -- Places an order for user_id 2 in EUR


