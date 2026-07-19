# Solution Requirements (Functional & Non-functional)

| Field | Value |
|---|---|
| **Date** | January 2025 |
| **Team ID** | ShopEZ Team |
| **Project Name** | ShopEZ — Curated E-Commerce Platform |
| **Maximum Marks** | 4 Marks |

---

## Functional Requirements

| FR No. | Functional Requirement (Epic) | Sub Requirement (Story / Sub-Task) |
|---|---|---|
| FR-1 | Product Browsing | As a visitor, I can view all products grouped by category so I can browse efficiently |
| FR-2 | Product Search | As a visitor, I can search products by title, description, or category via a search input |
| FR-3 | Category Filtering | As a visitor, I can filter products by category using a dropdown selector |
| FR-4 | Product Discount Visibility | As a visitor, I can see discount percentages displayed on each product card |
| FR-5 | Cart — Add Item | As a visitor, I can add a product to my cart with a default quantity of 1 |
| FR-6 | Cart — Manage Items | As a visitor, I can increase quantity, decrease quantity, or remove items from my cart |
| FR-7 | Cart — Total Calculation | As a visitor, I can see the running total of all items in my cart |
| FR-8 | Guest Cart | As a visitor, I can use the cart and checkout without creating an account (guest userId) |
| FR-9 | One-Page Checkout | As a visitor, I can enter shipping info (name, email, mobile, address, pincode), select payment method, and place an order on one page |
| FR-10 | Order Confirmation | As a visitor, I receive a confirmation message after placing an order successfully |
| FR-11 | Order History | As a visitor, I can view all my past orders with item details, totals, payment method, and date |
| FR-12 | Admin Dashboard | As an admin, I can view all products in a simple dashboard list with title, category, and price |
| FR-13 | Navigation | As a visitor, I can navigate between Home, Products, Cart, Orders, and Admin pages via the navbar |
| FR-14 | Fallback Data | As a visitor, I can still browse products even when the database is offline (sample data fallback) |

---

## Non-Functional Requirements

| NFR No. | Non-Functional Requirement | Description |
|---|---|---|
| NFR-1 | Usability | Clean, minimal UI with intuitive navigation. Products load within 2 seconds. Fallback data ensures the UI is never empty. |
| NFR-2 | Security | Password hashing using bcryptjs. JWT-based authentication for user sessions. Environment variables isolate secrets. |
| NFR-3 | Reliability | Graceful fallback to sample product data when MongoDB is unreachable. Controllers handle errors without crashing the server. |
| NFR-4 | Performance | Frontend asset bundling via Vite for fast loads. API proxy in dev mode avoids CORS latency. Server-side search filtering reduces payload. |
| NFR-5 | Availability | Single-server Express deployment with zero-config startup. Procfile for Heroku. Works with or without MongoDB. |
| NFR-6 | Scalability | Stateless Express API can be horizontally scaled behind a load balancer. MongoDB (when connected) handles growing product/order data. |
| NFR-7 | Maintainability | Modular architecture: Routes → Controllers → Models (backend). Pages organized by feature (frontend). Separation of concerns. |
| NFR-8 | Portability | Single `node index.js` command starts the server. Environment variables via .env file. Works cross-platform (Windows/Mac/Linux). |
