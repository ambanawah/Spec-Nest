"""# SpecNest: Computer Selling Platform
## System Architecture and Implementation Blueprint

## 1. Introduction

### 1.1 Background
With the rapid growth of the internet and digital technologies, online shopping has become an important part of modern commerce. E-commerce platforms allow customers to browse products, compare prices, and make purchases without physically visiting a store.

Businesses also benefit from e-commerce systems by expanding their market reach and improving customer engagement.

SpecNest is designed as a web-based platform for selling computers and related devices, allowing customers to purchase products online while administrators manage listings, categories, inventory, and orders efficiently.

### 1.2 Purpose of the System
The purpose of SpecNest is to build a reliable and user-friendly computer selling platform where users can discover products, compare configurations, add items to a cart, and complete purchases online.

The system also provides backend tools for administrators to manage products, categories, inventory, and customer orders with clarity and control.

### 1.3 Problem Statement
Traditional computer shopping often forces customers to visit physical stores, compare limited product selections, and rely on in-store staff for configuration guidance. This process is slow and inconvenient, especially for customers who need to compare detailed hardware specifications.

Many smaller computer retailers also struggle to present their full product catalogs online with the performance, searchability, and configurability customers expect.

SpecNest addresses these issues by delivering an online platform that makes computer shopping intuitive, transparent, and efficient for buyers while giving sellers a scalable, data-driven storefront.

---

## 2. Project Objectives
The main objectives of the SpecNest system are:
- Design and develop a user-friendly online shopping platform
- Allow users to create accounts and securely log into the system
- Enable customers to browse and search for products
- Provide a shopping cart system for managing selected items
- Allow customers to place and track orders
- Provide administrators with tools to manage products, categories, inventory, and customer orders

**[DEEP DIVE] The core technical objective is to build a system where the database is not just a data store, but the central source of truth and the enforcer of business logic. This ensures data integrity and simplifies application logic.**

---

## 3. Scope of the System
The SpecNest system includes functionalities for both customers and administrators.

### 3.1 Customer Functions
Customers will be able to:
- Register a new account
- Log into the platform
- Browse computer categories and detailed specs
- Search for products by name, category, or configuration
- Add products to a shopping cart
- Place orders and complete checkout
- View order history and status
- Compare multiple computers side-by-side
- Leave product reviews

### 3.2 Administrator Functions
Administrators will be able to:
- Add new products and coordinate inventory
- Update existing product information and pricing
- Remove products from the system
- Manage product categories and specifications
- View and manage customer orders
- Monitor stock levels and reorder thresholds
- Manage user accounts and roles

---

## 4. System Actors
### 4.1 Customer
A customer interacts with the system to browse, compare, and purchase products.
Customer actions include:
- Registering an account
- Logging into the system
- Browsing products
- Adding items to a cart
- Placing orders
- Writing reviews
- Viewing order history

### 4.2 Administrator
An administrator manages the overall operation of the system.
Administrator responsibilities include:
- Managing products
- Managing categories
- Monitoring customer orders
- Managing user accounts
- Overseeing inventory

**[DEEP DIVE] Actor Permissions Matrix:**

| Feature | Guest | Customer | Staff (Optional) | Admin |
| :--- | :--- | :--- | :--- | :--- |
| Browse Products | ✓ | ✓ | ✓ | ✓ |
| View Product Details | ✓ | ✓ | ✓ | ✓ |
| Add to Cart | ✓ | ✓ | ✓ | ✓ |
| Place Order | | ✓ | | |
| View Order History | | ✓ | ✓ | |
| Write Product Review | | ✓ | | |
| Manage Own Profile | | ✓ | ✓ | |
| Access Admin Dashboard | | | | ✓ |
| Create/Edit/Delete Products | | | | ✓ |
| Process Orders (e.g., mark as shipped) | | | ✓ | ✓ |
| View Sales Reports | | | | ✓ |

---

## 5. Functional Requirements
The system shall allow users to create a new account.
The system shall allow registered users to log into the platform.
The system shall allow users to browse available products.
The system shall allow users to search for products by name, category, or configuration.
The system shall allow users to add products to a shopping cart.
The system shall allow users to update or remove items from the cart.
The system shall allow users to place orders.
The system shall allow administrators to add, edit, and delete product information.
The system shall allow administrators to view and manage customer orders.
The system shall allow customers to compare multiple products side-by-side.
The system shall allow administrators to manage inventory and reorder thresholds.

---

## 6. Non-Functional Requirements
### 6.1 Performance
The system should load pages quickly and handle multiple users simultaneously without delays.

### 6.2 Security
The system must protect user information and ensure secure authentication. User passwords should be encrypted before being stored in the database.

### 6.3 Usability
The system interface should be simple, intuitive, and easy for users to navigate.

### 6.4 Reliability
The system should operate continuously with minimal downtime.

**[DEEP DIVE] Performance Targets:**
- **Page Load:** Homepage and product listing pages should load within 2 seconds on a standard broadband connection.
- **API Response:** API endpoints (e.g., filtering, adding to cart) should respond in under 500ms for 95% of requests.
- **Concurrency:** The system should handle at least 100 concurrent users performing read/write operations without significant performance degradation.

**[DEEP DIVE] Security Details:**
- **Password Policy:** Passwords must be at least 8 characters, containing a mix of letters, numbers, and symbols.
- **Session Management:** JWTs will have a short expiration (e.g., 15 minutes), with a refresh token mechanism for a better user experience.
- **Database Security:** The application's database user will have the minimum privileges required (e.g., `SELECT`, `INSERT`, `UPDATE`, `DELETE` on specific tables) and will not be an admin or owner.

---

## 7. System Features and Modules
The system will include modules for product catalog, search, filtering, cart management, checkout, order tracking, reviews, admin management, and reporting.

**[DEEP DIVE] 7.8 Advanced Filtering Module Deep Dive:**
The filtering module is the core differentiator for SpecNest. It will be implemented as follows:
- **Backend:** A dedicated `/api/products/filter` endpoint will accept a JSON payload of filter criteria (e.g., `{ "brand": ["Dell", "Apple"], "ram": ["16GB", "32GB"], "price_min": 500 }`).
- **Query Strategy:** The backend will dynamically build a SQL query. Using `JOIN`s on the `product_specs` table for each filter could be slow. To optimize, we will either:
  1. **Denormalize Key Specs:** Add columns like `ram`, `storage`, `cpu` directly to the `products` table for faster filtering, keeping `product_specs` for detailed, less-frequently filtered data.
  2. **Use JSONB:** Store specifications in a `specs_json` column in the `products` table. PostgreSQL's JSONB indexing allows for very fast querying on these dynamic fields. This is a highly scalable approach.
- **Frontend:** The UI will use `React Hook Form` to manage filter state. Filters will be applied in real-time (debounced) or via an "Apply Filters" button. The URL will update with query parameters (e.g., `?brand=apple&ram=16gb`) to allow users to share filtered views.

**[DEEP DIVE] 7.9 Multi-Currency Support Module:**
The system will provide real-time currency conversion for all products, allowing customers to browse and purchase in their preferred currency.
- **Base Currency:** All product prices will be stored in a single base currency (e.g., USD).
- **Exchange Rate Service:** A dedicated service will be responsible for fetching and storing exchange rates.
  - **Automated Updates:** A scheduled background job will run daily to fetch the latest exchange rates from a reliable third-party API (e.g., Open Exchange Rates, Fixer). This ensures rates are always up-to-date.
  - **Database Storage:** Exchange rates will be stored in a dedicated `exchange_rates` table to avoid making external API calls on every transaction.
- **API Integration:**
  - API endpoints that return pricing information will be updated to accept a `currency` parameter (e.g., `/api/products?currency=EUR`).
  - If a currency is provided, the API will calculate and return the price in the requested currency on the fly.
  - The base price and currency will always be available.
- **Transaction Handling:** When an order is placed, the transaction amount and the currency used will be recorded to ensure accurate financial records. The `orders` table will be updated to include `currency_code` and `exchange_rate` at the time of purchase.

---

## 8. Database-Centric System Architecture
This document focuses on the database-centric architecture of SpecNest, showing how users and applications interact with the database system. The architecture emphasizes the database as the core component, with all other elements serving as interfaces to the data.

**[DEEP DIVE] Expanding the Architecture:**
The system is organized into three distinct layers with clear responsibilities.

| Layer | Components | Role | Key Implementation Detail |
| :--- | :--- | :--- | :--- |
| **Client Layer** | Web browser (React) | Displays the UI, handles user interaction, manages client-side state. | Uses a service layer (e.g., `api/productService.js`) to abstract all API calls. |
| **Application Layer** | Node.js/Express Server | **API Gateway:** Validates requests, authenticates users. <br> **Business Logic:** Orchestrates workflows (e.g., order placement). | Controllers handle HTTP requests; Services contain the core business logic; Data Access Layer (DAL) interacts with the database. This separation prevents "fat controller" syndrome. |
| **Database Layer** | PostgreSQL | **Data Storage:** Stores all data. <br> **Integrity:** Enforces constraints. <br> **Business Logic Enforcement:** Uses triggers and stored procedures for critical, transactional logic. | The database is the *final arbiter* of data consistency. All writes that require high integrity (like order creation) go through a stored procedure. |

**[DEEP DIVE] Data Flow for a Critical Operation: Placing an Order**
1. **Client:** User clicks "Place Order". Frontend sends `POST /api/orders` with cart items and payment details.
2. **Application Layer (API):**
   * `authMiddleware` verifies the JWT and attaches user ID to the request.
   * `orderController` receives the request, performs basic validation (e.g., cart not empty).
   * `orderService` calls the `place_order` **stored procedure** in a database transaction.
3. **Database Layer:**
   * `BEGIN TRANSACTION`
   * `SELECT ... FOR UPDATE` to lock the relevant rows in the `inventory` table. This is crucial to prevent overselling in concurrent scenarios.
   * Check stock for each product. If any product is out of stock, `ROLLBACK` and return an error.
   * Insert the order into `orders`.
   * Insert items into `order_items`.
   * Update `inventory.quantity_on_hand`.
   * Insert a record into `payments` with status `pending`.
   * `COMMIT TRANSACTION`
4. **Application Layer:** Receives the new order ID from the stored procedure. It then triggers an asynchronous call to an external payment gateway.
5. **Client:** Receives a success response and redirects the user to an order confirmation page.

---

## 9. Database Design
The database design provides a structured and scalable foundation for the SpecNest platform. The following schema and constraints are designed to support user accounts, product catalog, orders, inventory, reviews, and admin workflows while maintaining strong data integrity.

**[DEEP DIVE] Revised Schema with Key Improvements:**

### 9.1 Products Table (Enhanced)
'''sql
-- Add denormalized columns for faster filtering
ALTER TABLE products ADD COLUMN ram VARCHAR(50);
ALTER TABLE products ADD COLUMN storage VARCHAR(100);
ALTER TABLE products ADD COLUMN cpu VARCHAR(255);

-- Alternatively, a more flexible approach:
-- ALTER TABLE products ADD COLUMN specs_json JSONB;
-- CREATE INDEX idx_products_specs ON products USING GIN (specs_json);
'''

### 9.2 Inventory Table (Integrated)
'''sql
-- Instead of a separate inventory table, we can manage stock directly on products.
-- This simplifies queries. Use a trigger to log changes if historical tracking is needed.
ALTER TABLE products ADD COLUMN low_stock_threshold INT NOT NULL DEFAULT 5;
ALTER TABLE products ADD COLUMN last_restocked TIMESTAMP;

-- Keep a separate inventory_logs table for auditing.
CREATE TABLE inventory_logs (
    log_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(product_id),
    previous_quantity INT,
    new_quantity INT,
    changed_by INT REFERENCES users(user_id),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reason VARCHAR(50) -- 'order_placed', 'admin_update', 'restock'
);
'''

---

## 10. Constraints and Data Integrity
The system uses strong constraints to enforce correctness at the database level.

**[DEEP DIVE] Trigger for Stock Update & Logging:**
'''sql
CREATE OR REPLACE FUNCTION log_inventory_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF (NEW.stock_quantity IS DISTINCT FROM OLD.stock_quantity) THEN
        INSERT INTO inventory_logs (product_id, previous_quantity, new_quantity, changed_by, reason)
        VALUES (NEW.product_id, OLD.stock_quantity, NEW.stock_quantity, current_setting('app.current_user_id', true)::int, 'order_placed');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_log_inventory_changes
AFTER UPDATE OF stock_quantity ON products
FOR EACH ROW
EXECUTE FUNCTION log_inventory_changes();
'''
*This trigger logs every stock change, identifying the user who made the change via a session variable (`app.current_user_id`), providing a complete audit trail.*

---

## 11. Advanced Database Features
The database is responsible for critical transactional business logic and reporting.

**[DEEP DIVE] Stored Procedure for Order Placement:**
This encapsulates the critical business logic within the database, ensuring consistency.
'''sql
CREATE OR REPLACE FUNCTION place_order(
    p_user_id INT,
    p_cart_items JSON,
    p_total_amount DECIMAL
)
RETURNS INT LANGUAGE plpgsql AS $$
DECLARE
    v_order_id INT;
    v_item RECORD;
BEGIN
    -- Start transaction
    BEGIN
        -- 1. Create the order
        INSERT INTO orders (user_id, total_amount, status)
        VALUES (p_user_id, p_total_amount, 'pending')
        RETURNING order_id INTO v_order_id;

        -- 2. Process each item, checking stock and inserting into order_items
        FOR v_item IN SELECT * FROM json_to_recordset(p_cart_items) AS x(product_id INT, quantity INT)
        LOOP
            -- Pessimistic locking to prevent race conditions
            PERFORM 1 FROM products WHERE product_id = v_item.product_id AND stock_quantity >= v_item.quantity FOR UPDATE;

            UPDATE products
            SET stock_quantity = stock_quantity - v_item.quantity
            WHERE product_id = v_item.product_id;

            INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price)
            SELECT v_order_id, v_item.product_id, v_item.quantity, price, (price * v_item.quantity)
            FROM products WHERE product_id = v_item.product_id;
        END LOOP;

        -- 3. Clear the user's cart
        DELETE FROM carts WHERE user_id = p_user_id;

        -- If everything is successful, commit (implicit at end of block)
        RETURN v_order_id;
    EXCEPTION
        WHEN OTHERS THEN
            -- Rollback on any error
            RAISE EXCEPTION 'Order placement failed: %', SQLERRM;
    END;
END;
$$;
'''

---

## 12. Technology Stack
SpecNest will combine modern frontend and backend technologies with a database-first architecture.

**[DEEP DIVE] Rationale for Choices:**
- **Next.js:** Chosen for its hybrid rendering capabilities. Product pages can be statically generated (SSG) for speed and SEO, while cart and order pages are server-side rendered (SSR) for real-time data. The built-in API routes simplify backend development.
- **PostgreSQL:** Selected over MySQL for its superior support for JSONB data types (perfect for flexible product specs) and advanced features like `FOR UPDATE` row-level locking for robust inventory management.
- **Tailwind CSS:** Enables rapid, consistent UI development with a utility-first approach, ensuring a custom design without writing large amounts of custom CSS.

---

## 13. System Implementation Overview
This section describes how the system is implemented across frontend, backend, and data layers.

**[DEEP DIVE] Frontend State Management Strategy:**
- **Server State:** React Query (TanStack Query) will be used to manage all data fetched from the API. It handles caching, background refetching, and optimistic updates. For example, adding an item to the cart will instantly update the UI, while the request runs in the background.
- **Client State:** Zustand (or Context API for simpler parts) will manage global client-only state like theme (dark/light mode), the current filter panel state, and temporary UI flags. This separation keeps concerns clear and state management efficient.

**[DEEP DIVE] Product Comparison Component:**
This is a complex frontend feature. Implementation strategy:
1. **State:** A Zustand store will hold a list of product IDs selected for comparison (max 4).
2. **Data Fetching:** When the user navigates to the comparison page, React Query will fetch the detailed data for all selected products in a single API request (`/api/products/compare?ids=1,2,3`).
3. **Rendering:** The table will be dynamically generated. The rows (e.g., "CPU", "RAM") are defined in a configuration file. For each product, the value for that spec is looked up (from its `product_specs` or the denormalized columns). If a spec is missing, "N/A" is displayed, ensuring a clean and informative view.

---

## 14. Testing Strategy
A strong testing strategy is essential for system reliability.

**[DEEP DIVE] Test Scenarios for Critical Flows:**
- **Unit Test:** `calculateCartTotal(cartItems)` - Ensure tax, discounts, and shipping are calculated correctly.
- **Integration Test:** `POST /api/orders` with a valid cart.
  * **Test 1 (Success):** Confirm a new order is created, stock is reduced, cart is cleared, and payment record is created.
  * **Test 2 (Concurrency):** Simulate two users trying to purchase the last unit of a product simultaneously. Ensure only one succeeds and the other receives an "out of stock" error.
  * **Test 3 (Failure):** Place an order with an item that has insufficient stock. Verify the transaction is rolled back and no changes persist.

---

## 15. Security Considerations
Security is a foundational requirement for SpecNest.

**[DEEP DIVE] SQL Injection Prevention:**
All database queries will use **parameterized queries** (prepared statements) via a library like `pg` (node-postgres). This ensures user input is treated as data, not executable code.
* **Example (Good):** `client.query('SELECT * FROM users WHERE email = $1', [userEmail]);`
* **Example (Bad):** `client.query(`SELECT * FROM users WHERE email = '${userEmail}'`);` (This is vulnerable).

**[DEEP DIVE] Role-Based Access Control (RBAC) Implementation:**
Middleware in Express will check the user's role from the JWT on protected routes.
'''javascript
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden: Insufficient permissions.' });
        }
        next();
    };
};

// Usage in route
router.put('/products/:id', authenticate, authorize('admin'), productController.updateProduct);
'''

---

## 16. Future Improvements
The following enhancements are planned for future phases:
- Mobile application version for iOS & Android.
- AI-powered product recommendations based on user behavior.
- Multi-language support.
- Advanced analytics dashboard for sellers.

---

## 17. Conclusion
**[DEEP DIVE] From Design to Deployment: A Phased Approach**
To bring SpecNest to life, development can be broken down into clear phases:

* **Phase 1: Core Database & API (Week 1-2)**
  * Set up PostgreSQL database with the final schema, including all constraints, indexes, triggers, and the `place_order` stored procedure.
  * Build foundational Express API with authentication (JWT) and role-based middleware.
  * Create API endpoints for basic CRUD operations on products and categories.
* **Phase 2: Essential User Features (Week 3-4)**
  * Develop Next.js frontend: product listing, search, and detail pages.
  * Implement cart and wishlist functionality using React Query for server state.
  * Integrate the `place_order` API endpoint to enable checkout.
* **Phase 3: Advanced Features & Admin (Week 5-6)**
  * Build the advanced filtering component on the frontend and corresponding dynamic query API.
  * Implement the product comparison tool.
  * Develop the Admin Dashboard with UI for managing products, orders, and viewing basic reports.
* **Phase 4: Polish & Testing (Week 7-8)**
  * Implement comprehensive unit, integration, and end-to-end testing.
  * Add final UI/UX polish: loading states, error boundaries, responsive design, and micro-interactions.
  * Deploy to a cloud platform (e.g., Vercel for frontend, Railway/AWS for backend and database).

By combining a robust, database-centric architecture with a modern, component-based frontend, SpecNest will not only meet its functional requirements but will also be a performant, secure, and maintainable platform ready for future growth.
""