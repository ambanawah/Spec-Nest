# SpecNest API Endpoints Documentation

**Base URL:** `http://localhost:3001` (dev) or `https://your-vercel-domain.vercel.app` (prod)

**Authentication:** Most endpoints require JWT token in `Authorization: Bearer <token>` header

---

## 📋 Table of Contents
1. [Authentication](#authentication)
2. [Exchange Rates & Currencies](#exchange-rates--currencies)
3. [Products](#products)
4. [Reviews](#reviews)
5. [Shopping Cart](#shopping-cart)
6. [Orders](#orders)
7. [User Profile](#user-profile)
8. [Admin Routes](#admin-routes)
9. [Seller Routes](#seller-routes)

---

## Authentication

### POST `/api/auth/register`
Register a new user account or seller store.

**Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "role": "customer",    // "customer" or "seller"
  "store_name": "John's PC Store",      // Only for sellers
  "store_description": "Premium gaming components"  // Only for sellers
}
```

**Response (201):**
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "role": "customer",
  "store_name": null
}
```

---

### POST `/api/auth/login`
Login and receive JWT token.

**Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": 1,
  "username": "johndoe",
  "role": "customer",
  "store_name": null
}
```

**Token Usage:**
Store the token and send it in all authenticated requests:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Exchange Rates & Currencies

### GET `/api/rates`
Fetch all supported currencies and their USD exchange rates. **Used to auto-update prices when user selects currency.**

**Response (200):**
```json
[
  {
    "currency_code": "USD",
    "currency_name": "US Dollar",
    "rate_against_usd": 1.0
  },
  {
    "currency_code": "EUR",
    "currency_name": "Euro",
    "rate_against_usd": 0.92
  },
  {
    "currency_code": "ZAR",
    "currency_name": "South African Rand",
    "rate_against_usd": 17.85
  },
  {
    "currency_code": "NGN",
    "currency_name": "Nigerian Naira",
    "rate_against_usd": 755.5
  },
  {
    "currency_code": "KES",
    "currency_name": "Kenyan Shilling",
    "rate_against_usd": 125.3
  },
  {
    "currency_code": "EGP",
    "currency_name": "Egyptian Pound",
    "rate_against_usd": 30.8
  }
]
```

**Frontend Integration:**
```javascript
// When user selects a currency, call this endpoint
// Then re-fetch products with ?currency=ZAR
fetch('/api/products?currency=ZAR')
```

---

## Products

### GET `/api/products`
List products with filtering, sorting, pagination, and currency conversion.

**Query Parameters:**
- `category` (string) — Filter by category slug (e.g., "desktops", "laptops")
- `sellerId` (int) — Filter by seller ID
- `search` (string) — Text search on product name
- `sortBy` (string) — "price" or "name" (default: "price")
- `sortOrder` (string) — "asc" or "desc" (default: "asc")
- `limit` (int) — Items per page (default: 10, max: 100)
- `page` (int) — Page number (default: 1)
- `currency` (string) — ISO currency code (default: "USD", e.g., "EUR", "ZAR", "NGN")
- `specs` (string) — JSON-encoded spec filters, e.g., `{"brand":"Intel","cores":"24"}`

**Example Requests:**
```
GET /api/products?category=desktops&sortBy=price&sortOrder=asc&limit=20&page=1&currency=USD
GET /api/products?search=gaming&currency=ZAR
GET /api/products?specs={"ram":"32GB","storage":"2TB"}
```

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "RTX 4090 Gaming PC",
    "description": "High-end gaming workstation",
    "price_usd": 2499.99,
    "converted_price": 44624.87,
    "display_currency": "ZAR",
    "stock_quantity": 5,
    "image_url": "https://...",
    "specs_json": {
      "cpu": "Intel i9-13900K",
      "gpu": "NVIDIA RTX 4090",
      "ram": "64GB DDR5",
      "storage": "2TB NVMe SSD"
    },
    "is_active": true,
    "category_name": "Desktops",
    "seller_name": "TechHub Store"
  }
]
```

---

### GET `/api/products/:id`
Get a single product with full details and currency conversion.

**Query Parameters:**
- `currency` (string) — ISO currency code (default: "USD")

**Example:**
```
GET /api/products/1?currency=ZAR
```

**Response (200):**
```json
{
  "id": 1,
  "name": "RTX 4090 Gaming PC",
  "description": "High-end gaming workstation",
  "price_usd": 2499.99,
  "converted_price": 44624.87,
  "display_currency": "ZAR",
  "stock_quantity": 5,
  "image_url": "https://...",
  "specs_json": { ... },
  "is_active": true,
  "category_name": "Desktops",
  "seller_name": "TechHub Store"
}
```

---

### GET `/api/products/compare?ids=1,2,3`
Compare products side-by-side by specs.

**Example:**
```
GET /api/products/compare?ids=1,2,5
```

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "RTX 4090 Gaming PC",
    "price_usd": 2499.99,
    "specs_json": { "cpu": "i9-13900K", "ram": "64GB" },
    "image_url": "https://..."
  },
  {
    "id": 2,
    "name": "RTX 4080 Gaming PC",
    "price_usd": 1799.99,
    "specs_json": { "cpu": "i7-13700K", "ram": "32GB" },
    "image_url": "https://..."
  }
]
```

---

## Reviews

### GET `/api/reviews/:productId`
Get all reviews for a product (public, no auth required).

**Response (200):**
```json
[
  {
    "id": 1,
    "rating": 5,
    "title": "Excellent PC!",
    "body": "Amazing performance and great support.",
    "created_at": "2026-04-20T10:30:00Z",
    "username": "happycustomer"
  }
]
```

---

### POST `/api/reviews`
Post a review (requires authentication). **Upsert: if user already reviewed, it updates.**

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "productId": 1,
  "rating": 5,
  "title": "Excellent PC!",
  "body": "Amazing performance and great support."
}
```

**Response (201):**
```json
{
  "id": 1,
  "user_id": 5,
  "product_id": 1,
  "rating": 5,
  "title": "Excellent PC!",
  "body": "Amazing performance and great support.",
  "created_at": "2026-04-20T10:30:00Z",
  "updated_at": "2026-04-20T10:30:00Z"
}
```

---

## Shopping Cart

### GET `/api/cart`
Get current user's shopping cart.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "RTX 4090 Gaming PC",
    "price_usd": 2499.99,
    "image_url": "https://...",
    "quantity": 1
  },
  {
    "id": 3,
    "name": "Monitor LG 4K",
    "price_usd": 799.99,
    "image_url": "https://...",
    "quantity": 2
  }
]
```

---

### POST `/api/cart/item`
Add item to cart or increase quantity.

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "productId": 1,
  "quantity": 1
}
```

**Response (201):**
```json
{
  "id": 10,
  "user_id": 5,
  "product_id": 1,
  "quantity": 2
}
```

---

### PUT `/api/cart/item/:productId`
Update quantity of a cart item.

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "quantity": 3
}
```

**Response (200):**
```json
{
  "id": 10,
  "user_id": 5,
  "product_id": 1,
  "quantity": 3
}
```

---

### DELETE `/api/cart/item/:productId`
Remove item from cart.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{ "success": true }
```

---

## Orders

### POST `/api/orders`
Create a new order from the shopping cart (clears cart on success).

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "currency": "USD",
  "shippingAddressId": 1
}
```

**Response (201):**
```json
{
  "order_id": 101,
  "user_id": 5,
  "total_amount_usd": 3299.98,
  "total_amount_converted": 58933.87,
  "display_currency": "USD",
  "status": "pending",
  "created_at": "2026-04-30T12:00:00Z",
  "items": [
    {
      "product_id": 1,
      "product_name": "RTX 4090 Gaming PC",
      "quantity": 1,
      "unit_price": 2499.99
    },
    {
      "product_id": 3,
      "product_name": "Monitor LG 4K",
      "quantity": 2,
      "unit_price": 799.99
    }
  ]
}
```

---

### GET `/api/orders`
Get current user's order history.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "order_id": 101,
    "user_id": 5,
    "total_amount_usd": 3299.98,
    "display_currency": "USD",
    "status": "pending",
    "created_at": "2026-04-30T12:00:00Z"
  },
  {
    "order_id": 100,
    "user_id": 5,
    "total_amount_usd": 1599.99,
    "display_currency": "USD",
    "status": "delivered",
    "created_at": "2026-04-25T10:00:00Z"
  }
]
```

---

### GET `/api/orders/:id`
Get a single order with all items.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "order_id": 101,
  "user_id": 5,
  "total_amount_usd": 3299.98,
  "total_amount_converted": 3299.98,
  "display_currency": "USD",
  "status": "pending",
  "created_at": "2026-04-30T12:00:00Z",
  "items": [
    {
      "product_id": 1,
      "product_name": "RTX 4090 Gaming PC",
      "quantity": 1,
      "unit_price": 2499.99
    },
    {
      "product_id": 3,
      "product_name": "Monitor LG 4K",
      "quantity": 2,
      "unit_price": 799.99
    }
  ]
}
```

---

## User Profile

### GET `/api/user/profile`
Get current user's profile (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": 5,
  "username": "johndoe",
  "email": "john@example.com",
  "role": "customer",
  "store_name": null,
  "created_at": "2026-04-20T08:00:00Z"
}
```

---

### GET `/api/addresses`
Get user's shipping addresses (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "id": 1,
    "street": "123 Main St",
    "city": "Nairobi",
    "state": "Nairobi",
    "postal_code": "00100",
    "country": "KE",
    "is_default": true
  }
]
```

---

### POST `/api/addresses`
Add a new shipping address (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "street": "456 Oak Ave",
  "city": "Pretoria",
  "state": "Gauteng",
  "postal_code": "0002",
  "country": "ZA",
  "is_default": false
}
```

**Response (201):**
```json
{
  "id": 2,
  "street": "456 Oak Ave",
  "city": "Pretoria",
  "state": "Gauteng",
  "postal_code": "0002",
  "country": "ZA",
  "is_default": false
}
```

---

## Admin Routes

### POST `/api/products` (Admin Only)
Create a new product.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Body:**
```json
{
  "name": "New Gaming PC",
  "description": "Latest model",
  "price_usd": 3499.99,
  "stock_quantity": 10,
  "category_id": 1,
  "image_url": "https://...",
  "specs_json": {
    "cpu": "i9-14900K",
    "ram": "128GB DDR5",
    "gpu": "RTX 5090"
  }
}
```

**Response (201):** [Product object]

---

### PUT `/api/products/:id` (Admin Only)
Update a product.

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Body:** (same as POST, all fields optional)

**Response (200):** [Updated product object]

---

### DELETE `/api/products/:id` (Admin Only)
Soft-delete a product (marks as inactive).

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response (200):**
```json
{ "success": true }
```

---

## Seller Routes

### POST `/api/products/seller` (Seller Only)
Create a product in your seller store.

**Headers:**
```
Authorization: Bearer <seller-token>
```

**Body:**
```json
{
  "name": "Custom PC Build",
  "description": "Built to order",
  "price_usd": 1299.99,
  "stock_quantity": 5,
  "category_id": 1,
  "image_url": "https://...",
  "specs_json": { ... }
}
```

**Response (201):** [Product object with seller_id set to current user]

---

### GET `/api/seller/products` (Seller Only)
Get all products you're selling.

**Headers:**
```
Authorization: Bearer <seller-token>
```

**Response (200):** [Array of product objects]

---

### GET `/api/seller/orders` (Seller Only)
Get all orders for your products.

**Headers:**
```
Authorization: Bearer <seller-token>
```

**Response (200):** [Array of orders containing your products]

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "error": "Descriptive error message"
}
```

**Common Status Codes:**
- `200` — Success
- `201` — Created
- `400` — Bad request (missing/invalid parameters)
- `401` — Unauthorized (missing/invalid token)
- `403` — Forbidden (insufficient permissions)
- `404` — Not found
- `409` — Conflict (e.g., duplicate username)
- `500` — Server error

---

## Frontend Integration Tips

### 1. Store JWT Token
```javascript
// After login
const { token } = await loginResponse.json();
localStorage.setItem('auth_token', token);
```

### 2. Attach Token to Requests
```javascript
const token = localStorage.getItem('auth_token');
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
};
fetch('/api/cart', { headers });
```

### 3. Currency Selector
```javascript
// When user changes currency
const rates = await fetch('/api/rates').then(r => r.json());
// Display currency options
// On selection, re-fetch products with ?currency=ZAR
```

### 4. Logout
```javascript
localStorage.removeItem('auth_token');
// Redirect to login
```

---

**Last Updated:** 2026-04-30  
**API Version:** 1.0
