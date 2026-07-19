# Data Flow Diagrams & User Stories

| Field | Value |
|---|---|
| **Date** | January 2025 |
| **Team ID** | ShopEZ Team |
| **Project Name** | ShopEZ — Curated E-Commerce Platform |
| **Maximum Marks** | 4 Marks |

---

## Data Flow Diagrams

A Data Flow Diagram (DFD) is a visual representation of the information flows within a system. It shows how data enters and leaves the system, what changes the information, and where data is stored.

### Context-Level DFD (Level 0)

```
                           ┌──────────────────────────────────────┐
                           │           ShopEZ System             │
                           │                                      │
            ┌──────────────┼──────────────────────────────────┐   │
            │              │     EXPRESS API SERVER            │   │
            │    ┌─────────▼──────────┐  ┌─────────────────┐  │   │
            │    │  Product Service   │  │   Cart Service  │  │   │
            │    │  ─ Browsing        │  │   ─ Add Item    │  │   │
            │    │  ─ Search          │  │   ─ Update Qty  │  │   │
            │    │  ─ Category Filter │  │   ─ Remove Item │  │   │
            │    │  ─ CRUD Operations │  │   ─ Clear Cart  │  │   │
            │    └─────────┬──────────┘  └────────┬────────┘  │   │
            │              │                      │            │   │
            │    ┌─────────▼──────────────────────▼────────┐   │   │
            │    │          Order Service                   │   │   │
            │    │  ─ Create Order    ─ List Orders         │   │   │
            │    │  ─ Clear Cart on Order                   │   │   │
            │    └─────────┬───────────────────────────────┘   │   │
            │              │                                    │   │
            │    ┌─────────▼───────────────────────────────┐   │   │
            │    │     Data Sources                        │   │   │
            │    │  ┌──────────────┐  ┌────────────────┐  │   │   │
            │    │  │   MongoDB    │  │  Fallback Data │  │   │   │
            │    │  │  (Atlas)     │  │  (sample data) │  │   │   │
            │    │  └──────────────┘  └────────────────┘  │   │   │
            │    └────────────────────────────────────────┘   │   │
            └──────────────────────────────────────────────────┘   │
                           │                                      │
                           │                                      │
                  ┌────────▼────────┐                             │
                  │    User (Web)   │                             │
                  │  (Browser/SPA)  │                             │
                  └─────────────────┘                             │
                           │                                      │
                           └──────────────────────────────────────┘
```

### Detailed Data Flow Description

| Flow # | Source | Destination | Data / Payload | Description |
|---|---|---|---|---|
| F1 | Browser | Product Controller | `GET /api/products?search=&category=&minPrice=&maxPrice=` | User requests product list with optional filters |
| F2 | Product Controller | MongoDB | Query object `{ title: RegExp, category, price: {$gte, $lte} }` | Server queries MongoDB for matching products |
| F3 | MongoDB | Product Controller | `Product[]` (JSON documents) | Database returns matching product documents |
| F4 | Product Controller | Browser | `JSON Product[]` | Server returns products (or fallback data if DB failed) |
| F5 | Browser | Cart Controller | `POST /api/cart { userId, productId, size, quantity }` | User adds a product to their cart |
| F6 | Cart Controller | MongoDB | Cart document `{ userId, productId, title, price, ... }` | Server creates or updates cart item in DB |
| F7 | Browser | Cart Controller | `GET /api/cart?userId=guest` | User requests their cart items |
| F8 | Cart Controller | Browser | `CartItem[]` (JSON) | Server returns all cart items for the user |
| F9 | Browser | Cart Controller | `PUT /api/cart/:id { quantity }` | User updates quantity of a cart item |
| F10 | Browser | Cart Controller | `DELETE /api/cart/:id` | User removes an item from cart |
| F11 | Browser | Order Controller | `POST /api/orders { userId, name, email, mobile, address, pincode, paymentMethod, items }` | User places an order with shipping details |
| F12 | Order Controller | MongoDB | Order document with embedded items | Server saves the order in the database |
| F13 | Order Controller | Cart Controller | Delete query `{ userId }` | Server clears the user's cart after successful order |
| F14 | Order Controller | Browser | `{ message: "Order placed successfully", order }` | Server returns order confirmation |
| F15 | Browser | Order Controller | `GET /api/orders?userId=guest` | User requests their order history |
| F16 | Order Controller | MongoDB | Query object `{ userId }` | Server queries orders for the user |
| F17 | MongoDB | Order Controller | `Order[]` (JSON documents) | Database returns matching orders sorted by date |
| F18 | Order Controller | Browser | `JSON Order[]` | Server returns order history to the user |

---

## User Stories

Use the below template to list all the user stories for the product.

**User Types:** Visitor (Web), Customer (Returning), Admin, Developer

### Visitor (Web) — Browsing & Discovery

| User Type | Functional Requirement (Epic) | User Story Number | User Story / Task | Acceptance Criteria | Priority | Release |
|---|---|---|---|---|---|---|
| Visitor (Web) | Product Browsing | US-01 | As a visitor, I can view all products grouped by category so I can find what I need | Products render from API or fallback data. Grouped by category heading with item count displayed | High | Sprint-1 |
| Visitor (Web) | Product Search | US-02 | As a visitor, I can type in a search box to filter products by title, description, or category | Search input triggers API re-fetch. Results update in real-time. "No matches" message shown when empty | High | Sprint-1 |
| Visitor (Web) | Category Filter | US-03 | As a visitor, I can select a category from a dropdown to narrow my product view | Dropdown lists "All Categories" plus each unique category. Selecting a category filters the product grid | High | Sprint-1 |
| Visitor (Web) | Product Details | US-04 | As a visitor, I can click on a product card to see full details | Clicking "View details" navigates to `/product/:id` showing details, carousel, and pricing | Medium | Sprint-2 |
| Visitor (Web) | Discount Visibility | US-05 | As a visitor, I can see discount percentages on product cards so I can spot deals | Each product card shows the discount badge (e.g., "15% off") and the original price context | Medium | Sprint-1 |

### Visitor (Web) — Cart & Checkout

| User Type | Functional Requirement (Epic) | User Story Number | User Story / Task | Acceptance Criteria | Priority | Release |
|---|---|---|---|---|---|---|
| Visitor (Web) | Add to Cart | US-06 | As a visitor, I can add a product to my cart | Cart page shows the item with image, title, price, and quantity controls immediately | High | Sprint-1 |
| Visitor (Web) | Cart Management | US-07 | As a visitor, I can increase quantity, decrease quantity, or remove items from my cart | +/- buttons update quantity. Remove button deletes the item. Total updates accordingly without page refresh | High | Sprint-1 |
| Visitor (Web) | Cart Summary | US-08 | As a visitor, I can see a summary of all cart items with the grand total | Shows each item with image, title, category, quantity, and subtotal. Grand total displayed at bottom | Medium | Sprint-1 |
| Visitor (Web) | Guest Cart | US-09 | As a visitor, I can use the cart without creating an account or logging in | Cart works with a `userId=guest` identifier. No sign-up required to add items or checkout | High | Sprint-1 |
| Visitor (Web) | Checkout Form | US-10 | As a visitor, I can enter shipping details (name, email, mobile, address, pincode) on the checkout page | All five fields are present and editable. Form validates that fields are not empty before submission | High | Sprint-1 |
| Visitor (Web) | Payment Selection | US-11 | As a visitor, I can choose between Cash on Delivery and Online Payment | Dropdown or radio selector for payment method. Selected value is included in the order payload | Medium | Sprint-1 |
| Visitor (Web) | Place Order | US-12 | As a visitor, I can place an order and see a success confirmation | POST /api/orders returns 201. Page redirects to /order-success. Cart is cleared automatically | High | Sprint-1 |
| Visitor (Web) | Order Confirmation | US-13 | As a visitor, I see a clear success message with celebration after ordering | OrderConfirmation page shows "Order Placed Successfully! 🎉" or similar positive feedback | Medium | Sprint-1 |

### Visitor (Web) — Orders & Account

| User Type | Functional Requirement (Epic) | User Story Number | User Story / Task | Acceptance Criteria | Priority | Release |
|---|---|---|---|---|---|---|
| Visitor (Web) | Order History | US-14 | As a visitor, I can view a list of all my past orders with details | Orders page fetches by userId. Shows customer name, email, address, items, totals, payment method, and date for each order | Medium | Sprint-2 |
| Visitor (Web) | Order Details | US-15 | As a visitor, I can click on an order to see full details | Clicking an order navigates to a detailed view showing each item, quantities, prices, and shipping info | Low | Sprint-2 |
| Returning User | Account Registration | US-16 | As a returning user, I can register with email and password to save my information | Registration form with email, password, confirm password. User is created in MongoDB. JWT token returned | Medium | Sprint-2 |
| Returning User | Login | US-17 | As a returning user, I can log in with my email and password | Login form authenticates against MongoDB. JWT stored for session. Past orders linked to my account | Medium | Sprint-2 |

### Admin

| User Type | Functional Requirement (Epic) | User Story Number | User Story / Task | Acceptance Criteria | Priority | Release |
|---|---|---|---|---|---|---|
| Admin | Dashboard | US-18 | As an admin, I can see all products in one simple dashboard list | Admin page fetches all products. Each shown with title, category, and price in a card/row layout | Low | Sprint-2 |
| Admin | Add Product | US-19 | As an admin, I can add a new product through a form | Form with fields: title, description, price, discount, category, image URL, stock. POST creates the product | Low | Sprint-2 |
| Admin | Edit Product | US-20 | As an admin, I can edit existing product details | Clicking edit opens pre-filled form. PUT updates the product in the database | Low | Sprint-2 |
| Admin | Delete Product | US-21 | As an admin, I can delete a product from the catalog | Delete button with confirmation dialog. DELETE removes product. List refreshes | Low | Sprint-2 |

### Developer

| User Type | Functional Requirement (Epic) | User Story Number | User Story / Task | Acceptance Criteria | Priority | Release |
|---|---|---|---|---|---|---|
| Developer | Product CRUD API | US-22 | As a developer, I can create, read, update, and delete products via REST endpoints | Full CRUD on /api/products. Proper status codes: 200 (success), 201 (created), 404 (not found), 500 (server error) | High | Sprint-1 |
| Developer | Cart API | US-23 | As a developer, I can get, add, update, remove, and clear cart items via REST | GET /api/cart, POST /api/cart, PUT /api/cart/:id, DELETE /api/cart/:id, DELETE /api/cart/clear all functional | High | Sprint-1 |
| Developer | Order API | US-24 | As a developer, I can create and retrieve orders via REST with validation | POST /api/orders validates items array not empty. GET /api/orders supports ?userId filter. Cart auto-cleared on order | High | Sprint-1 |
| Developer | Fallback Mechanism | US-25 | As a developer, I can verify the app works without a database connection | When MongoDB is disconnected, product listing falls back to sampleProducts. App does not crash or show errors | High | Sprint-1 |
| Developer | Navigation | US-26 | As a developer, I can add new pages and routes easily | React Router 7 handles all routes. Adding a new page requires: create component → add Route → add Navbar link | Medium | Sprint-1 |
