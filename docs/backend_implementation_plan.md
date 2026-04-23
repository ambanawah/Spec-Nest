# Backend Implementation Plan: Database-Centric Approach

This document outlines the plan for implementing the backend of the SpecNest platform, following the database-centric architecture and advanced database patterns described in the project documentation.

## Core Principle: Database as the Source of Truth

The fundamental principle of our backend implementation is to treat the database not just as a data store, but as the central source of truth and the primary enforcer of business logic. This approach ensures data integrity, simplifies application logic, and enhances the overall robustness of the system.

## Key Implementation Steps & Database Features

### 1. Stored Procedure for Order Placement

We will implement the `place_order` stored procedure in PostgreSQL as the sole method for creating new orders. This encapsulates the entire order placement process within a single, atomic transaction, guaranteeing consistency.

**Logic to be included in the stored procedure:**
*   Create a new order in the `orders` table.
*   Iterate through the cart items, checking for sufficient stock using `SELECT ... FOR UPDATE` to implement pessimistic locking and prevent race conditions.
*   Update the `products` table to decrement the stock quantity.
*   Insert the items into the `order_items` table.
*   Clear the user's cart.
*   The entire process will be wrapped in a transaction block with error handling to ensure that any failure results in a complete rollback.

### 2. Trigger for Inventory Logging

A trigger named `trigger_log_inventory_changes` will be created to automatically log all changes to the `stock_quantity` in the `products` table.

**Implementation Details:**
*   The trigger will fire after any `UPDATE` on the `products` table's `stock_quantity` column.
*   It will insert a record into the `inventory_logs` table, capturing the previous quantity, new quantity, the user responsible for the change, and the reason for the change.
*   This provides a complete and reliable audit trail for all inventory movements.

### 3. Database Schema Enhancements

To support advanced filtering and improve query performance, we will enhance the `products` table schema. We will evaluate and implement one of the following two strategies:

*   **Denormalization:** Add columns like `ram`, `storage`, and `cpu` directly to the `products` table.
*   **JSONB:** Add a `specs_json` column of type `JSONB` to the `products` table and create a GIN index on it for fast querying of dynamic specifications.

### 4. Security: Parameterized Queries

To prevent SQL injection vulnerabilities, all database queries from the application layer will strictly use parameterized queries (prepared statements). The Node.js `pg` library's support for parameterized queries will be leveraged for this purpose.

### 5. Multi-Currency Feature Implementation

To support a global customer base, we will implement a multi-currency feature with automatic exchange rate updates.

*   **Database Schema Changes:**
    *   A new table, `exchange_rates`, will be created to store currency data:
        '''sql
        CREATE TABLE exchange_rates (
            currency_code VARCHAR(3) PRIMARY KEY,
            rate_against_base DECIMAL NOT NULL,
            last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        '''
    *   The `orders` table will be modified to capture the transaction currency:
        '''sql
        ALTER TABLE orders ADD COLUMN currency_code VARCHAR(3) NOT NULL DEFAULT 'USD';
        ALTER TABLE orders ADD COLUMN exchange_rate_at_purchase DECIMAL;
        '''

*   **Exchange Rate Service:** A new service will be implemented in the application layer. This service will be responsible for fetching and caching exchange rates from the `exchange_rates` table.

*   **Automated Rate Updates:** A scheduled background job (e.g., using `node-cron`) will be set up to run daily. This job will fetch the latest exchange rates from a reliable third-party API (e.g., Open Exchange Rates) and update the `exchange_rates` table.

*   **API Modifications:**
    *   API endpoints that return pricing (e.g., `/api/products`, `/api/orders/:id`) will be updated to accept a `currency` query parameter.
    *   The API will use the exchange rate service to convert the base price (stored in USD) to the requested currency on the fly.

*   **Stored Procedure Update:**
    *   The `place_order` stored procedure will be updated to accept `p_currency_code` and `p_exchange_rate` as parameters.
    *   These values will be saved in the new `currency_code` and `exchange_rate_at_purchase` columns in the `orders` table for every new order.

## Phased Implementation Plan

We will follow the phased approach outlined in the documentation:

*   **Phase 1: Core Database & API:**
    *   Set up the PostgreSQL database with the complete schema, including constraints, indexes, the `place_order` stored procedure, and the `log_inventory_changes` trigger.
    *   Build the foundational Express API with authentication and role-based access control.
    *   **Implement the multi-currency database schema changes and the automated exchange rate update service.**

*   **Phase 2 & 3: Feature Implementation:**
    *   Develop API endpoints to support user features, with the `POST /api/orders` endpoint directly calling the updated `place_order` stored procedure.
    *   Build the advanced filtering API that leverages the chosen schema enhancement (denormalization or JSONB).
    *   **Modify the relevant API endpoints to handle on-the-fly currency conversion.**

*   **Phase 4 & Beyond: Refinement**
    *   Integrate the currency selection feature into the frontend.
    *   Add user preferences for their default currency.

This plan ensures that we build a robust, secure, and scalable backend by leveraging the advanced features of our PostgreSQL database, in line with the architectural vision of the SpecNest platform.
