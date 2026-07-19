# ShopEZ — Ideation & Solution Requirements

| Field | Value |
|---|---|
| **Date** | January 2025 |
| **Team ID** | ShopEZ Team |
| **Project Name** | ShopEZ — Curated E-Commerce Platform |

---

## Section A — Ideation Phase

---

### 1. Empathy Map Canvas

Understanding our primary user — an online shopper who values convenience, variety, and a frictionless purchase experience.

| Dimension | What the user experiences |
|---|---|
| **Think & Feel** | "I want quality products without spending hours browsing." / "I hope checkout is quick and secure." / "Will my order arrive on time?" |
| **Hear** | Friends talking about great deals online. Ads for trendy products. Reviews from other buyers. |
| **See** | Cluttered e-commerce sites with slow loading. Unclear return policies. Limited payment options. |
| **Say & Do** | Searches for specific product categories. Compares prices. Adds items to cart. Abandons cart if checkout is too long. |
| **Pains** | Too many options leading to decision fatigue. Hidden costs at checkout. Unreliable delivery estimates. Complex return processes. |
| **Gains** | Curated product lists. Simple, fast checkout. Transparent pricing with discount visibility. Order tracking. |

**Goal:** Build an e-commerce experience that is curated, fast, and trustworthy — from discovery to delivery.

---

### 2. Define Problem Statements

| # | Problem Statement |
|---|---|
| **PS-1** | **I am** an online shopper. **I'm trying to** find quality products quickly without wading through thousands of irrelevant listings. **But** most platforms overload me with choices, slow checkouts, and unclear pricing. **Because** there is no curated, clean, and fast alternative. **Which makes me feel** overwhelmed and distrustful — I often abandon my cart. |
| **PS-2** | **I am** a small business owner or independent seller. **I'm trying to** list products and reach customers without complex setup. **But** most platforms require technical knowledge or charge high commissions. **Because** there's no simple, affordable marketplace for curated goods. **Which makes me feel** excluded from the online market. |

---

### 3. Brainstorming & Idea Prioritization

#### Step 1 — Team Gathering & Problem Selection

**Selected Problem Statement:** PS-1 — Online shoppers struggle to discover curated products quickly and complete purchases without friction.

#### Step 2 — Brainstorm, Idea Listing & Grouping

| # | Idea | Category |
|---|---|---|
| 1 | Product catalogue with category filters | Browsing |
| 2 | Guest (no-signup) shopping experience | Onboarding |
| 3 | Real-time cart with quantity management | Cart |
| 4 | One-page checkout with shipping + payment | Checkout |
| 5 | Order history and tracking dashboard | Orders |
| 6 | Admin panel for product management | Admin |
| 7 | Discount / sale badge visibility on listing | Merchandising |
| 8 | Fallback sample data when database is offline | Resilience |
| 9 | Responsive design for mobile browsing | UX |
| 10 | Search by title, description, or category | Search |

#### Step 3 — Idea Prioritization

| Priority | Idea | Rationale |
|---|---|---|
| **P0** | Product catalogue with filters | Core value proposition |
| **P0** | Guest shopping (no sign-up) | Lower friction = higher conversion |
| **P0** | Cart + quantity management | Required for purchase flow |
| **P0** | One-page checkout | Must-have for order completion |
| **P1** | Order history | Essential for post-purchase trust |
| **P1** | Discount visibility | Drives purchase decisions |
| **P1** | Search functionality | Helps users find products faster |
| **P1** | Fallback sample data | Offline resilience for demo/deployment |
| **P2** | Admin panel | Internal tool, not customer-facing |
| **P2** | Mobile responsiveness | Important but can follow core |

---

## Section B — Requirement Analysis

---

### 4. Solution Requirements (Functional & Non-Functional)

#### Functional Requirements

| FR No. | Functional Requirement (Epic) | Sub Requirement (Story / Sub-Task) |
|---|---|---|
| FR-1 | Product Browsing | As a visitor, I can view all products grouped by category so I can browse efficiently |
| FR-2 | Product Search | As a visitor, I can search products by title, description, or category |
| FR-3 | Category Filtering | As a visitor, I can filter products by category to narrow results |
| FR-4 | Cart Management | As a visitor, I can add items to cart, update quantities, and remove items |
| FR-5 | Guest Cart | As a visitor, I can use the cart without creating an account (guest userId) |
| FR-6 | One-Page Checkout | As a visitor, I can enter shipping info, select payment method, and place an order on one page |
| FR-7 | Order Confirmation | As a visitor, I receive a confirmation message after placing an order |
| FR-8 | Order History | As a visitor, I can view my past orders with item details, totals, and dates |
| FR-9 | Product Discounts | As a visitor, I can see discount percentages on product cards |
| FR-10 | Admin Dashboard | As an admin, I can see all products in a simple dashboard view |
| FR-11 | Product CRUD API | As a developer, I can create, read, update, and delete products via REST API |
| FR-12 | Order API | As a developer, I can create and retrieve orders via REST API |
| FR-13 | Cart API | As a developer, I can add, update, remove, and clear cart items via REST API |
| FR-14 | Navigation | As a visitor, I can navigate between Home, Products, Cart, Orders, and Admin pages |

#### Non-Functional Requirements

| NFR No. | Non-Functional Requirement | Description |
|---|---|---|
| NFR-1 | Usability | Clean, minimal UI with intuitive navigation. Products load within 2 seconds. Default fallback data ensures the UI is never empty. |
| NFR-2 | Resilience | When MongoDB is unavailable, the app falls back to sample product data so the site still functions for browsing. |
| NFR-3 | Maintainability | Modular Express routes and controllers. Models separated from business logic. Frontend pages organized by feature. |
| NFR-4 | Performance | Frontend asset bundling via Vite. API proxy in dev mode avoids CORS issues. Product search uses server-side filtering. |
| NFR-5 | Portability | Deployable via single `node index.js` command. Procfile included for Heroku. Environment variables via .env file. |
| NFR-6 | Scalability | Stateless Express API can be horizontally scaled. MongoDB (when connected) handles growing product/order data. |

---

### 5. Technology Stack (Architecture & Stack)

#### Technical Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser (Client)                          │
│         React SPA — Vite Dev Server (port 5173)             │
│         React Router 7 — Pages: Home, Products,             │
│         Cart, Checkout, Orders, Admin                       │
│                         │                                    │
│          Vite Dev Proxy: /api → localhost:5000               │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTP / JSON
                          ▼
┌─────────────────────────────────────────────────────────────┐
│               Express.js Backend (port 5000)                 │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    Routes Layer                       │   │
│  │  /api/products    /api/cart    /api/orders           │   │
│  └──────────────────────┬───────────────────────────────┘   │
│                         │                                    │
│  ┌──────────────────────▼───────────────────────────────┐   │
│  │                  Controllers Layer                    │   │
│  │  productController   cartController   orderController │   │
│  │  (Business logic + MongoDB fallback to sample data)   │   │
│  └──────────────────────┬───────────────────────────────┘   │
│                         │                                    │
│  ┌──────────────────────▼───────────────────────────────┐   │
│  │                  Models Layer                         │   │
│  │  Product (Mongoose)  Cart (Mongoose)  Order (Mongoose)│   │
│  │  User (Mongoose)     + Sample Products (fallback)    │   │
│  └──────────────────────┬───────────────────────────────┘   │
│                         │                                    │
└─────────────────────────┼───────────────────────────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │     MongoDB Atlas     │
              │  (Optional — graceful │
              │   fallback to in-mem  │
              │   sample data if off) │
              └───────────────────────┘
```

#### Table 1 — Components & Technologies

| S.No | Component | Description | Technology |
|---|---|---|---|
| 1 | **User Interface** | Single-page application for browsing, cart, checkout, and order management | React 19, React Router 7, Vite 8, HTML, CSS |
| 2 | **Backend API Server** | RESTful API handling products, cart, orders, and user management | Express 5, Node.js |
| 3 | **Database** | Document store for products, carts, orders, and users | MongoDB + Mongoose 9 |
| 4 | **Fallback Data Store** | In-memory sample product data when MongoDB is unreachable | Static JS module (server/data/products.js) |
| 5 | **Authentication** | Password hashing and JWT token generation for user sessions | bcryptjs, jsonwebtoken |
| 6 | **Environment Configuration** | Environment variable management for DB URI, ports, secrets | dotenv |
| 7 | **Cross-Origin Resource Sharing** | CORS middleware for development server communication | cors |
| 8 | **API Proxy (Dev)** | Vite dev server proxies /api requests to Express backend | Vite config (`server.proxy`) |
| 9 | **Infrastructure / Server** | Application deployment on cloud or local system | Node.js runtime, Heroku-ready (Procfile) |

#### Table 2 — Application Characteristics

| S.No | Characteristic | Description | Technology |
|---|---|---|---|
| 1 | **Open-Source Frameworks** | Entirely built with open-source frameworks | React, Express, MongoDB, Mongoose, Vite, bcryptjs, JWT |
| 2 | **Resilient Architecture** | Graceful fallback when database is unreachable — app still works with sample data | Controllers check DB response; if empty/error, return sample products |
| 3 | **Modular Monolith** | Clean separation of concerns without over-engineering | Routes → Controllers → Models (backend). Pages separated by feature (frontend) |
| 4 | **Availability** | Single-server deployment with automatic fallback. No single point of failure for demo scenarios | Express server + Procfile |
| 5 | **Performance** | Fast development iteration with hot module replacement. Production build with Vite bundling | Vite (dev), Vite build (prod) |
| 6 | **Security Implementations** | Password hashing, JWT-based authentication, environment variable isolation | bcryptjs (SHA-256), jsonwebtoken, dotenv |

---

### 6. Data Flow Diagrams

#### Context-Level DFD (Level 0)

```
                  ┌───────────────────────────────────────┐
                  │           ShopEZ System               │
                  │                                       │
    ┌───────────► │  ┌─────────────┐  ┌───────────────┐  │
    │             │  │ View/Browse │  │  Cart/Checkout │  │
    │  Search &   │  │  Products   │  │  + Order       │  │
    │  Filter     │  └──────┬──────┘  └───────┬───────┘  │
    │             │         │                  │          │
    │  ┌──────┐   │  ┌──────▼──────────────────▼───────┐  │
    │  │User  │───┼─►│      Express API Server         │  │
    │  │(Web) │   │  │  (Controllers + Routes)         │  │
    │  └──────┘◄──┼─►│                                │  │
    │    Response  │  └──────┬──────────────────┬───────┘  │
    │             │         │                  │          │
    └─────────────┘  ┌──────▼──────┐  ┌───────▼───────┐  │
                     │  MongoDB    │  │  Fallback     │  │
                     │  (Primary)  │  │  Sample Data  │  │
                     └─────────────┘  └───────────────┘  │
                  └───────────────────────────────────────┘
```

#### Detailed DFD — Data Flows

| Flow # | Source | Destination | Data | Description |
|---|---|---|---|---|
| 1 | Browser | Product Controller | `GET /api/products?search=&category=` | Fetch products with optional filters |
| 2 | Product Controller | MongoDB / Fallback | Query params | Retrieve matching products |
| 3 | MongoDB / Fallback | Product Controller | Product[] | Return product list |
| 4 | Product Controller | Browser | JSON Product[] | Render product catalogue |
| 5 | Browser | Cart Controller | `POST /api/cart { productId, quantity }` | Add item to cart |
| 6 | Cart Controller | MongoDB | Cart document | Save cart item |
| 7 | Browser | Order Controller | `POST /api/orders { items, shipping }` | Place order |
| 8 | Order Controller | MongoDB | Order document | Save order + clear cart |
| 9 | Browser | Cart Controller | `DELETE /api/cart/clear` | Clear cart after order |
| 10 | MongoDB | Order Controller | Order[] | Return order history |

---

### 7. User Stories

| User Type | Functional Requirement (Epic) | User Story Number | User Story / Task | Acceptance Criteria | Priority | Release |
|---|---|---|---|---|---|---|
| **Visitor (Web)** | Product Browsing | US-01 | As a visitor, I can see products grouped by category so I can find what I need | Products render from API or fallback data. Grouped by category heading with item count | High | Sprint-1 |
| **Visitor (Web)** | Search & Filter | US-02 | As a visitor, I can type in a search box to filter products by title or description | Search input triggers re-fetch. Results update in real-time. "No matches" message shown when empty | High | Sprint-1 |
| **Visitor (Web)** | Category Filter | US-03 | As a visitor, I can select a category from a dropdown to narrow results | Dropdown with "All Categories" + each category. Selecting filters product list | High | Sprint-1 |
| **Visitor (Web)** | Cart — Add Item | US-04 | As a visitor, I can add a product to my cart | Cart page shows the item with image, title, price, quantity controls | High | Sprint-1 |
| **Visitor (Web)** | Cart — Manage Item | US-05 | As a visitor, I can increase, decrease, or remove items from my cart | +/- buttons update quantity. Remove button deletes item. Total updates accordingly | High | Sprint-1 |
| **Visitor (Web)** | Cart View | US-06 | As a visitor, I can see a summary of cart items with total price | Shows each item with image, title, category, quantity, subtotal. Grand total displayed | Medium | Sprint-1 |
| **Visitor (Web)** | Checkout — Form | US-07 | As a visitor, I can fill in shipping details (name, email, mobile, address, pincode) | Form fields are present and editable. Validation for required fields | High | Sprint-1 |
| **Visitor (Web)** | Checkout — Payment | US-08 | As a visitor, I can choose Cash on Delivery or Online Payment | Payment method selector in checkout. Selected method stored in order | Medium | Sprint-1 |
| **Visitor (Web)** | Place Order | US-09 | As a visitor, I can place an order and see a success message | POST /api/orders succeeds. Navigate to /order-success. Cart is cleared | High | Sprint-1 |
| **Visitor (Web)** | Order History | US-10 | As a visitor, I can see a list of all my past orders | Orders page fetches by userId. Shows items, totals, payment method, date for each order | Medium | Sprint-2 |
| **Visitor (Web)** | Discount Visibility | US-11 | As a visitor, I can see discount percentages on product cards | Discount badge shown on each product. Price shows original without hiding discount | Medium | Sprint-1 |
| **Visitor (Web)** | Navigation | US-12 | As a visitor, I can navigate between all pages using the navbar | Navbar has links: Home, Products, Cart, Orders, Admin. Active route is indicated | High | Sprint-1 |
| **Admin (Web)** | Dashboard | US-13 | As an admin, I can see all products in one list view | Admin page fetches all products. Each shown with title, category, price | Low | Sprint-2 |
| **Developer** | Product CRUD API | US-14 | As a developer, I can create, read, update, and delete products via REST | Full CRUD on /api/products. Proper status codes: 200, 201, 404, 500 | High | Sprint-1 |
| **Developer** | Cart API | US-15 | As a developer, I can manage cart items via REST | GET, POST, PUT, DELETE, DELETE /clear on /api/cart | High | Sprint-1 |
| **Developer** | Order API | US-16 | As a developer, I can create and retrieve orders via REST | POST /api/orders + GET /api/orders with proper validation | High | Sprint-1 |

---

### 8. Customer Journey Map

**Scenario:** A first-time visitor discovers ShopEZ, browses products, adds to cart, checks out, and views their order history.

| Steps | What does the person typically experience? | Interactions | Touchpoints / Places | Positive Moments | Negative Moments | Areas of Opportunity |
|---|---|---|---|---|---|---|
| **Entice — Discover** | User hears about ShopEZ or finds it via search | Visits website URL | Browser, search engine | Clean landing page with clear branding | — | Add social proof section (reviews, testimonials) |
| **Enter — Homepage** | User lands on Home page | Reads headline, sees highlights, clicks Browse Products | Home page (`/`) | Hero stats show credibility (500+ products, 4.9/5 rating) | User may not immediately understand what ShopEZ offers | Use more descriptive tagline; add a short product preview |
| **Engage — Browse Products** | User navigates to product catalogue | Views products grouped by category; uses search or category filter | Products page (`/products`) | Products render instantly with images and prices | No results state could be friendlier | Show "Try adjusting your search" message; suggest popular categories |
| **Engage — Add to Cart** | User finds a product and adds it | Clicks "View details" (unfinished) or navigates to Cart | Products page → Cart page | Cart shows item with image, quantity controls, total | No "Add to Cart" button on product listing itself | Add direct "Add to Cart" button on product cards; show toast notification |
| **Engage — Cart Review** | User reviews items in cart | Adjusts quantities, removes unwanted items | Cart page (`/cart`) | Clean card layout with image + details + remove button | Cart is empty if user hasn't added anything | Show "Continue Shopping" link when cart is empty |
| **Engage — Checkout** | User proceeds to checkout | Fills shipping form (name, email, mobile, address, pincode, payment) | Checkout page (`/checkout`) | One-page form with order summary side-by-side | Long form could feel tedious on mobile | Add address autocomplete; save shipping info in localStorage |
| **Engage — Place Order** | User submits the order | Clicks "Place Order" button | Checkout page → Order Confirmation | Success message shown immediately | No email confirmation sent | Add email notification on order placement |
| **Exit — Order Confirmation** | User sees success screen | Reads confirmation message | Order Confirmation (`/order-success`) | Bright, celebratory message | No order ID or next steps shown | Show order ID + summary; add "View My Orders" CTA |
| **Extend — Order History** | User checks past orders | Navigates to Orders page | Orders page (`/orders`) | Sees all orders with dates, items, totals | No order status tracking (pending/shipped/delivered) | Add status badges; show expected delivery date |
| **Extend — Return / Repeat** | User considers shopping again | Navigates back to Products or Home | Home / Products | Easy to start again from navbar | No recommendations or personalized suggestions | Add "Recently viewed" or "You might also like" section |

---

### 9. Pages & Routes Map

| Frontend Route | Page Component | Description | API Dependency | Navbar Link |
|---|---|---|---|---|
| `/` | Home | Landing page with hero, stats, feature cards | None | ✅ Home |
| `/products` | Products | Product catalogue with search & category filter | `GET /api/products` | ✅ Products |
| `/product/:productId` | OrderDetails | Product detail view (placeholder) | `GET /api/products/:id` | ❌ (via product card click) |
| `/cart` | Cart | Shopping cart with quantity controls | `GET /api/cart`, `PUT /api/cart/:id`, `DELETE /api/cart/:id` | ✅ Cart |
| `/checkout` | Checkout | Shipping form + order summary | `GET /api/cart`, `POST /api/orders` | ❌ (via Cart page) |
| `/orders` | Orders | Order history list | `GET /api/orders` | ✅ Orders |
| `/order-success` | OrderConfirmation | Post-order success message | None | ❌ (redirect after checkout) |
| `/admin` | Admin | Admin product dashboard | `GET /api/products` | ✅ Admin |

---

### 10. API Endpoints Reference

| Method | Endpoint | Controller | Description | Auth |
|---|---|---|---|---|
| `GET` | `/api/products` | `productController.getProducts` | List products (supports ?search, ?category, ?minPrice, ?maxPrice, ?discount) | No |
| `GET` | `/api/products/:id` | `productController.getProductById` | Get single product by ID | No |
| `POST` | `/api/products` | `productController.createProduct` | Create a new product | No |
| `PUT` | `/api/products/:id` | `productController.updateProduct` | Update a product | No |
| `DELETE` | `/api/products/:id` | `productController.deleteProduct` | Delete a product | No |
| `GET` | `/api/cart` | `cartController.getCart` | Get cart items (requires ?userId) | No |
| `POST` | `/api/cart` | `cartController.addToCart` | Add item to cart | No |
| `PUT` | `/api/cart/:id` | `cartController.updateCartItem` | Update cart item quantity | No |
| `DELETE` | `/api/cart/:id` | `cartController.removeCartItem` | Remove item from cart | No |
| `DELETE` | `/api/cart/clear` | `cartController.clearCart` | Clear entire cart (requires ?userId) | No |
| `GET` | `/api/orders` | `orderController.getOrders` | List orders (supports ?userId) | No |
| `POST` | `/api/orders` | `orderController.createOrder` | Create a new order | No |

---

*Document generated from ShopEZ project analysis — adapted from the following reference templates:*

| Template | Source |
|---|---|
| Empathy Map Canvas | `1. Ideation Phase/Empathy Map Canvas.docx` |
| Define Problem Statements | `1. Ideation Phase/Define Problem Statements Template.docx` |
| Brainstorm & Idea Prioritization | `1. Ideation Phase/Brainstorming- Idea Generation- Prioritizaation Template.docx` |
| Solution Requirements (Functional & Non-Functional) | `2. Requirement Analysis/Solution Requirements.docx` |
| Technology Stack (Architecture & Stack) | `2. Requirement Analysis/Technology Stack - Template.docx` |
| Data Flow Diagrams & User Stories | `2. Requirement Analysis/Data Flow Diagrams and User Stories.docx` |
| Customer Journey Map | `2. Requirement Analysis/Customer Journey Map - Example.pdf` |
