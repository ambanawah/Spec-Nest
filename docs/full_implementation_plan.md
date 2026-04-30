# Full-Stack Implementation Plan: SpecNest

This document provides a comprehensive, full-stack implementation plan for the SpecNest platform. It integrates the approved PostgreSQL database schema with a detailed strategy for the backend API and the frontend React components, using existing UI code as a reference.

## 1. Backend API Implementation

The backend will be a Node.js/Express application that serves as a RESTful API, connecting the frontend to the database. All business logic will be handled either by the API or, for critical transactions, by the database's stored procedures.

### API Endpoints

**Product Endpoints**

*   `GET /api/products`
    *   **Description:** Fetches a list of products. Supports filtering, sorting, and pagination.
    *   **Query Parameters:**
        *   `category`: `string` (e.g., 'Laptops')
        *   `specs.[spec_name]`: `string` (e.g., `specs.cpu=Intel%20i9-14900K`)
        *   `sortBy`: `string` (e.g., 'price_usd')
        *   `order`: `string` ('asc' or 'desc')
        *   `currency`: `string` (e.g., 'EUR')
    *   **Response Body:**
        ```json
        {
          "products": [
            {
              "id": 1,
              "name": "DevBook Pro 16",
              "price": 2207.99, // Converted price
              "currency_code": "EUR",
              "stock_quantity": 50,
              "image_url": "...",
              "specs": {"cpu": "M3 Max", "ram": "32GB", "storage": "1TB SSD"}
            }
          ]
        }
        ```

*   `GET /api/products/compare`
    *   **Description:** Fetches detailed data for a list of product IDs for the comparison page.
    *   **Query Parameters:** `ids`: `string` (comma-separated, e.g., '1,2,5')
    *   **Response Body:**
        ```json
        {
          "products": [
            { "id": 1, "name": "DevBook Pro 16", "specs": { ... } },
            { "id": 2, "name": "GamerStation 9000", "specs": { ... } }
          ]
        }
        ```

**Order & Cart Endpoints**

*   `POST /api/orders`
    *   **Description:** Places a new order by calling the `place_order` stored procedure.
    *   **Request Body:** `{ "currency_code": "EUR" }`
    *   **Response Body:** `{ "order_id": 123, "status": "pending" }`

*   `GET /api/cart` / `POST /api/cart` / `DELETE /api/cart/items/:productId`
    *   **Description:** Standard CRUD operations for managing the user's shopping cart.

## 2. Frontend Implementation

The frontend will be a Next.js application, leveraging its features for server-side rendering (SSR) for dynamic pages and static site generation (SSG) for content like product details.

### State Management

*   **Server State (React Query):** All data fetched from the API (products, orders, user profile) will be managed by React Query. This will handle caching, re-fetching, and optimistic updates.
*   **Client State (Zustand):** Global UI state, such as the visibility of the shopping cart, the state of the product filter panel, and the items in the comparison tray, will be managed with Zustand.

### Component Breakdown

*   **`ProductCard.js`**: Displays a single product in a list. It will fetch the product's data and dynamically display key specs from the `specs_json` object, similar to what is seen in `app/catalog/desktops/page.js`.

*   **`FilterPanel.js`**: A sidebar component that allows users to filter products by category, price, and dynamic specs. It will construct the query parameters for the `GET /api/products` endpoint.

*   **`ProductDetailsPage.js`**: A page that shows all information for a single product. It will display all specs from the `specs_json` field.

*   **`ComparisonTable.js`**: The component for `app/compare/page.js`. It will take a list of product IDs from the Zustand store, fetch their data via the `GET /api/products/compare` endpoint, and render a comparison table with specs aligned in rows, as shown in the existing HTML.

*   **`CurrencySelector.js`**: A UI component that allows users to select their preferred currency. This selection will be stored in the Zustand store and passed as a query parameter to all relevant API calls.

## 3. Phased Implementation Rollout

**Phase 1: Core Backend & Product Display (Weeks 1-2)**

*   **Backend:**
    *   Set up the PostgreSQL database using the `database.sql` script.
    *   Build the Express API server.
    *   Implement the `GET /api/products` and `GET /api/products/:id` endpoints, including currency conversion.
    *   Set up the automated cron job to update exchange rates daily.
*   **Frontend:**
    *   Develop the `ProductCard` and `ProductDetailsPage` components.
    *   Use React Query to fetch and display product data.
    *   Build the `CurrencySelector` component and integrate it with the API calls.

**Phase 2: Cart & Checkout (Weeks 3-4)**

*   **Backend:**
    *   Implement all `/api/cart` endpoints for cart management.
    *   Implement the `POST /api/orders` endpoint that calls the `place_order` stored procedure.
*   **Frontend:**
    *   Develop the `CartView` component (sidebar or page).
    *   Implement the checkout flow, allowing users to place an order.

**Phase 3: Advanced Features (Weeks 5-6)**

*   **Backend:**
    *   Implement the `GET /api/products/compare` endpoint.
    *   Enhance the `/api/products` endpoint with advanced filtering based on `specs_json`.
*   **Frontend:**
    *   Develop the `FilterPanel` with dynamic spec filtering.
    *   Build the `ComparisonTable` component and the associated `ComparisonTray` to add products for comparison.

**Phase 4: Admin & Polish (Weeks 7-8)**

*   **Backend:**
    *   Implement admin-only endpoints for managing products and viewing orders.
    *   Implement materialized view refresh logic.
*   **Frontend:**
    *   Develop an admin dashboard for product and order management.
    *   Conduct thorough testing and UI/UX polishing.
