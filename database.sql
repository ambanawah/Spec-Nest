
-- Create a table for users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create a table for products with a JSONB column for specifications
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    image_url VARCHAR(255),
    category VARCHAR(50),
    specs JSONB
);

-- Create a table for the shopping cart
CREATE TABLE shopping_cart (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id)
);

-- Create a table for items in the shopping cart
CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    cart_id INTEGER REFERENCES shopping_cart(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL
);

-- Create a table for promotions and deals
CREATE TABLE promotions (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    discount_percentage NUMERIC(5, 2) NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Create a table for product comparisons
CREATE TABLE product_comparison (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    product_id INTEGER REFERENCES products(id)
);

-- Create a trigger to automatically update the created_at timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.created_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the trigger to the users table
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Insert some sample data for demonstration purposes
INSERT INTO products (name, description, price, stock_quantity, category, specs) VALUES
('SpecNest Pro Gaming PC', 'A high-end gaming PC with the latest components.', 2499.99, 10, 'desktops', '{
    "cpu": "Intel Core i9-13900K",
    "gpu": "NVIDIA GeForce RTX 4090",
    "ram": "32GB DDR5",
    "storage": "2TB NVMe SSD"
}'),
('SpecNest Office Workstation', 'A reliable and powerful workstation for office tasks.', 1299.99, 25, 'desktops', '{
    "cpu": "Intel Core i7-13700",
    "gpu": "Integrated Intel UHD Graphics 770",
    "ram": "16GB DDR4",
    "storage": "1TB NVMe SSD"
}');
