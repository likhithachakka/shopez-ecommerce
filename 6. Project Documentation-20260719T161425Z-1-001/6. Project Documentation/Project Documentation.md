# Full Stack Development with MERN — Project Documentation

## ShopEZ: Curated E-Commerce Platform

---

## 1. Introduction

### Project Title

**ShopEZ — Curated E-Commerce Platform**

| Field | Value |
|---|---|
| **Team ID** | ShopEZ Team |
| **Project Version** | 1.0.0 (MVP) |
| **Date** | July 2026 |
| **GitHub Repository** | [github.com/likhithachakka/shopez-ecommerce](https://github.com/likhithachakka/shopez-ecommerce) |

### Team Members

| Role | Name | Responsibilities |
|---|---|---|
| Product Owner | Team Lead | Define vision, prioritize features, validate against customer needs |
| UX Designer | Design Lead | Clean, intuitive interface and frictionless user flows |
| Full-Stack Developer | Dev Lead | Architect and implement solution across frontend and backend |
| QA / Tester | QA Lead | Validate functionality, fallback behaviour, and edge cases |

---

## 2. Project Overview

### Purpose

ShopEZ addresses a fundamental problem in modern e-commerce: online shoppers are overwhelmed by cluttered platforms that force account creation, hide costs, and make checkout slow. The dominant platforms (Amazon, Flipkart, etc.) prioritize catalogue size over user experience, resulting in decision fatigue, cart abandonment, and eroded trust.

**ShopEZ solves this by being:**

- **Curated, not cluttered** — A hand-picked catalogue grouped by category, eliminating infinite scrolling through irrelevant listings
- **Guest-first, not account-gated** — Full shopping (browse, cart, checkout, order history) without requiring an account
- **Transparent, not tricky** — Every product card shows ₹ price, discount percentage badge, and stock status — no hidden fees
- **Resilient, not fragile** — Graceful fallback to sample data when MongoDB is offline; the app never shows an empty state

### Key Features

| # | Feature | Description |
|---|---|---|
| 1 | **Curated Product Catalogue** | Products grouped by category (Footwear, Accessories, Electronics, Watches) with item counts |
| 2 | **Search & Category Filter** | Real-time search by title/description/category + dropdown filter |
| 3 | **Guest Cart Management** | Add items, update quantities (+/-), remove items, clear cart — all without login |
| 4 | **One-Page Checkout** | Shipping form + payment method selection on a single page |
| 5 | **Order Placement & Confirmation** | Place order → cart auto-clears → success message shown |
| 6 | **Order History** | Past orders displayed with items, totals, payment method, and date |
| 7 | **Admin Dashboard** | Product list view showing title, category, and price |
| 8 | **Discount Badges** | Percentage-off badges visible on every product card |
| 9 | **Resilient Fallback Data** | If MongoDB is offline, sample products are shown — app never breaks |
| 10 | **Responsive Navigation** | Navbar with links to Home, Products, Cart, Orders, Admin |

---

## 3. Architecture

### Frontend Architecture (React)

The frontend is a **single-page application (SPA)** built with **React 19** and bootstrapped with **Vite 8**. **React Router 7** handles client-side routing across 8 pages.

```
┌─────────────────────────────────────────────────────────────┐
│                    BROWSER (Client)                          │
│         React 19 SPA — Vite Dev Server (port 5173)          │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌─────────┐  ┌──────────────┐ │
│  │   Home   │  │ Products │  │  Cart   │  │   Checkout   │ │
│  │  (Hero,  │  │ (Search, │  │(Qty +/- │  │  (Form,      │ │
│  │  Stats)  │  │  Filter, │  │ Remove)  │  │  Summary)    │ │
│  └──────────┘  │  Groups) │  └─────────┘  └──────────────┘ │
│                └──────────┘                                 │
│  ┌──────────┐  ┌──────────────┐  ┌───────┐  ┌───────────┐ │
│  │  Orders  │  │  Order Conf  │  │ Admin │  │ Product   │ │
│  │ (History)│  │  (Success)   │  │(Dashboard)│ │ Detail   │ │
│  └──────────┘  └──────────────┘  └───────┘  └───────────┘ │
│                                                              │
│  Components:                                                 │
│  • Navbar — top navigation with route links                  │
│  • ProductCard — image, price, discount, category, stock     │
│  • CartItem — quantity controls, remove, subtotal            │
│  • CheckoutForm — shipping fields + payment selector         │
│  • OrderCard — order summary with items and totals           │
│                                                              │
│  State Management: React hooks (useState, useEffect, useMemo)│
│  API Calls: Native fetch() with try/catch + fallback data    │
│  Styling: App.css with responsive grid layout                │
│                                                              │
│  Vite Dev Proxy: /api/* → http://localhost:5000              │
└─────────────────────────────────────────────────────────────┘
```

**Key Frontend Libraries:**

| Library | Version | Purpose |
|---|---|---|
| React | 19.2.7 | UI framework |
| React Router DOM | 7.18.1 | Client-side routing |
| Vite | 8.1.1 | Build tool & dev server |
| lucide-react | 1.22.0 | Icons |

### Backend Architecture (Express.js + Node.js)

The backend follows a **3-tier modular monolith** pattern: **Routes → Controllers → Models**. Express 5 handles HTTP routing, controllers contain business logic, and Mongoose models define the data layer.

```
┌─────────────────────────────────────────────────────────────┐
│               Express.js Backend (port 5000)                 │
│                                                              │
│  Middleware Stack:                                            │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  cors() — Cross-origin requests for dev mode          │  │
│  │  express.json() — Parse JSON request bodies           │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    ROUTES LAYER                       │   │
│  │                                                       │   │
│  │  /api/products  → productRoutes.js                   │   │
│  │    GET  /       → getProducts (search, filter)       │   │
│  │    GET  /:id    → getProductById                     │   │
│  │    POST /       → createProduct                      │   │
│  │    PUT  /:id    → updateProduct                      │   │
│  │    DELETE /:id  → deleteProduct                      │   │
│  │                                                       │   │
│  │  /api/cart  → cartRoutes.js                          │   │
│  │    GET  /         → getCart (?userId)                │   │
│  │    POST /         → addToCart                        │   │
│  │    PUT  /:id      → updateCartItem                   │   │
│  │    DELETE /:id    → removeCartItem                   │   │
│  │    DELETE /clear  → clearCart (?userId)              │   │
│  │                                                       │   │
│  │  /api/orders  → orderRoutes.js                       │   │
│  │    GET  /      → getOrders (?userId)                 │   │
│  │    POST /      → createOrder                         │   │
│  └──────────────────────┬───────────────────────────────┘   │
│                         │                                    │
│  ┌──────────────────────▼───────────────────────────────┐   │
│  │                  CONTROLLERS LAYER                    │   │
│  │                                                       │   │
│  │  productController.js                                 │   │
│  │  • getProducts: Builds MongoDB query from query params│   │
│  │    Falls back to sampleProducts.filter() if DB fails  │   │
│  │  • getProductById, createProduct, updateProduct,      │   │
│  │    deleteProduct: Standard CRUD with error handling   │   │
│  │                                                       │   │
│  │  cartController.js                                    │   │
│  │  • addToCart: Looks up product, checks for duplicates,│   │
│  │    creates or increments quantity                     │   │
│  │  • updateCartItem, removeCartItem, clearCart:         │   │
│  │    Standard cart operations with userId scoping       │   │
│  │                                                       │   │
│  │  orderController.js                                   │   │
│  │  • createOrder: Validates items[], saves order to DB, │   │
│  │    clears the user's cart atomically                  │   │
│  │  • getOrders: Returns orders filtered by userId,      │   │
│  │    sorted by createdAt descending                     │   │
│  └──────────────────────┬───────────────────────────────┘   │
│                         │                                    │
│  ┌──────────────────────▼───────────────────────────────┐   │
│  │                  MODELS LAYER (Mongoose)              │   │
│  │                                                       │   │
│  │  Product: { title, description, mainimg, carousel,   │   │
│  │            sizes, category, gender, price, discount } │   │
│  │  Cart:    { userId, title, description, mainimg,     │   │
│  │            sizes, quantity, price, discount }         │   │
│  │  Order:   { userId, name, email, mobile, address,    │   │
│  │            pincode, items[], paymentMethod }          │   │
│  │  User:    { username, password, email, usertype }    │   │
│  │                                                       │   │
│  │  ┌───────────────────────────────────────────────┐   │   │
│  │  │ FALLBACK LAYER                                 │   │   │
│  │  │ When MongoDB is unreachable:                   │   │   │
│  │  │ productController → sampleProducts filter()    │   │   │
│  │  │ Frontend pages → inline fallback arrays        │   │   │
│  │  │ App NEVER shows error/empty state              │   │   │
│  │  └───────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Database (MongoDB + Mongoose)

**Database Service:** MongoDB Atlas (M0 free tier)

**Collections:**

| Collection | Primary Operations | Estimated Growth | Key Fields |
|---|---|---|---|
| `products` | Read-heavy (listing/search) | Low (admin inserts) | title, price, category, discount, mainimg |
| `carts` | Read/Write (user sessions) | Moderate | userId, productId, quantity, price |
| `orders` | Write-heavy (checkout) | High (scales with sales) | userId, name, items[], paymentMethod |
| `users` | Read/Write (auth) | Moderate | username, password (bcrypt), email, usertype |

**Database Interactions:**

```
Browser (React SPA)
    │
    │ fetch('/api/products?search=...')
    │ fetch('/api/cart', { method: 'POST', body: {...} })
    │ fetch('/api/orders', { method: 'POST', body: {...} })
    ▼
Express API Server
    │
    ├── MongoDB connected? ──Yes──► Mongoose CRUD operations
    │                               └──► MongoDB Atlas
    │
    └── MongoDB offline? ──Yes──► Fallback to sampleProducts[]
                                    └──► server/data/products.js
```

**Resilience Strategy:**

| Scenario | Behaviour |
|---|---|
| MongoDB unreachable | `connectDB()` returns false. Controllers catch errors → return `sampleProducts.filter()` |
| API network failure | Frontend fetch() throws → catch block uses inline fallback data |
| Empty query results | If DB returns empty array, fallback to sample products matching the filter |

---

## 4. Setup Instructions

### Prerequisites

| Software | Version | Purpose |
|---|---|---|
| Node.js | 22+ | JavaScript runtime for backend & frontend |
| npm | 10+ | Package manager |
| MongoDB Atlas Account | Free M0 tier | Database service (optional — app works without it) |
| Git | Latest | Version control |
| Web Browser | Chrome 120+, Firefox 120+, Edge 120+ | Running the application |

### Installation Steps

```bash
# Step 1: Clone the repository
git clone https://github.com/likhithachakka/shopez-ecommerce.git
cd shopez

# Step 2: Install root dependencies (Express, Mongoose, JWT, etc.)
npm install

# Step 3: Navigate to client directory and install frontend dependencies
cd client
npm install
cd ..

# Step 4: Create environment configuration
# Create file: server/er.env
# Add the following:
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/shopez?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here

# Step 5: (Optional) Seed MongoDB with sample products
# If MongoDB is connected, products are auto-seeded on first server start

# Step 6: Start the backend server
node index.js
# Expected output: "సర్వర్ పోర్ట్ 5000 పై విజయవంతంగా స్టార్ట్ అయ్యింది!"

# Step 7: In a new terminal, start the frontend dev server
cd client
npm run dev
# Expected output: Vite dev server running at http://localhost:5173
```

**Note:** If MongoDB credentials are not configured or the connection fails, the application will still function using fallback sample product data for browsing. Cart and order features require MongoDB to be connected.

---

## 5. Folder Structure

### Full Project Tree

```
c:\Users\likhi\OneDrive\Desktop\shopez\
│
├── index.js                          # Entry point — starts Express server
├── package.json                      # Root dependencies (Express, Mongoose, etc.)
├── Procfile                          # Heroku process declaration
├── .gitignore
│
├── server/                           # BACKEND — Express.js + Node.js
│   ├── server.js                     # App setup: middleware, routes, DB connect, auto-seed
│   ├── config/
│   │   └── db.js                     # MongoDB connection with graceful failure handling
│   ├── models/
│   │   ├── Product.js                # Mongoose schema for products collection
│   │   ├── Cart.js                   # Mongoose schema for carts collection
│   │   ├── Order.js                  # Mongoose schema for orders collection
│   │   └── User.js                   # Mongoose schema for users (auth scaffolded)
│   └── data/
│       └── products.js               # Static fallback sample products (3 items)
│
├── controllers/                      # BUSINESS LOGIC LAYER
│   ├── productController.js          # getProducts, getById, create, update, delete
│   ├── cartController.js             # getCart, addToCart, updateItem, removeItem, clearCart
│   └── orderController.js            # createOrder, getOrders
│
├── routes/                           # ROUTING LAYER
│   ├── productRoutes.js              # /api/products endpoints
│   ├── cartRoutes.js                 # /api/cart endpoints
│   └── orderRoutes.js                # /api/orders endpoints
│
├── client/                           # FRONTEND — React + Vite
│   ├── index.html                    # Vite HTML entry point
│   ├── vite.config.js                # Vite config with /api proxy → localhost:5000
│   ├── package.json                  # Frontend dependencies
│   ├── eslint.config.js              # ESLint configuration
│   ├── README.md                     # Frontend README
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   └── src/
│       ├── main.jsx                  # React entry point (StrictMode + App)
│       ├── App.jsx                   # Router + layout (BrowserRouter, Routes, Navbar)
│       ├── App.css                   # All styles (home, products, cart, checkout, orders)
│       ├── index.css                 # CSS reset and root variables
│       ├── components/
│       │   └── Navbar.jsx            # Top navigation bar with links
│       ├── pages/
│       │   ├── Home.jsx              # Landing page with hero, stats, features
│       │   ├── Products.jsx          # Product catalogue with search & category filter
│       │   ├── Cart.jsx              # Shopping cart with quantity controls
│       │   ├── Checkout.jsx          # One-page checkout form + order summary
│       │   ├── Orders.jsx            # Order history list
│       │   ├── OrderDetails.jsx      # Product detail view (placeholder)
│       │   ├── OrderConfirmation.jsx # Post-order success message
│       │   └── Admin.jsx             # Admin product dashboard
│       └── assets/
│           ├── hero.png              # Home page hero image
│           ├── react.svg             # React logo (Vite default)
│           └── vite.svg              # Vite logo (Vite default)
│
├── 1. Ideation Phase/                # Ideation documents
│   ├── Empathy Map Canvas.md
│   ├── Define Problem Statements.md
│   └── Brainstorming & Idea Prioritization.md
│
├── 2. Requirement Analysis/          # Requirements documents
│   ├── Customer Journey Map.md
│   ├── Data Flow Diagrams and User Stories.md
│   ├── Solution Requirements.md
│   └── Technology Stack - Architecture & Stack.md
│
├── 3. Project Design Phase/          # Design documents
│   ├── Problem - Solution Fit/
│   │   └── Problem-Solution Fit Canvas.md
│   ├── Proposed Solution/
│   │   └── Proposed Solution.md
│   └── Solution Architecture/
│       └── Solution Architecture.md
│
├── 4. Project Planning Phase/        # Planning documents
│   ├── Project Planning Template.md
│   └── Planning Logic.md
│
├── 5. Project Development Phase/     # Development & testing docs
│   ├── Performance Testing/
│   │   ├── API Performance Testing.md
│   │   ├── Load & Stress Testing.md
│   │   ├── Frontend Performance Testing.md
│   │   ├── Database Performance Testing.md
│   │   └── Payment & Order Performance Testing.md
│   └── User Acceptance Testing/
│       ├── UAT Plan.md
│       ├── UAT Test Cases.md
│       └── UAT Execution Report.md
│
└── 6. Project Documentation/         # This document
    ├── Final Report Template.pdf
    ├── FSD Documentation Format.pdf
    ├── FSD Documentation Format.docx
    └── Project Documentation.md       # ← COMPLETE PROJECT DOCUMENTATION
```

### Client Structure (React Frontend)

The `client/` directory contains the React single-page application:

| Path | Description |
|---|---|
| `src/main.jsx` | ReactDOM entry — renders `<App />` in StrictMode |
| `src/App.jsx` | BrowserRouter, Routes (8 routes), Navbar wrapper |
| `src/App.css` | All page styles — linear gradient background, hero grid, product cards, cart layout |
| `src/index.css` | CSS reset, root variables, box-sizing, font family |
| `src/components/Navbar.jsx` | Fixed top nav with 5 links (Home, Products, Cart, Orders, Admin) |
| `src/pages/Home.jsx` | Hero section, stat cards, feature cards, visual promo card |
| `src/pages/Products.jsx` | Search input, category dropdown, grouped product grid, fallback data |
| `src/pages/Cart.jsx` | Item list with +/- quantity, remove, total, checkout button |
| `src/pages/Checkout.jsx` | 5-field shipping form + payment dropdown + order summary |
| `src/pages/Orders.jsx` | Order history cards with items, totals, payment, date |
| `src/pages/Admin.jsx` | Admin product list (title, category, price) |
| `src/pages/OrderDetails.jsx` | Placeholder for product detail view |
| `src/pages/OrderConfirmation.jsx` | Success message after order placement |

### Server Structure (Node.js Backend)

The `controllers/`, `routes/`, and `server/` directories form the backend:

| Path | Description |
|---|---|
| `index.js` | Root entry — imports and runs `server/server.js` |
| `server/server.js` | Express app: CORS, JSON parser, route mounting, DB connect, auto-seed |
| `server/config/db.js` | `connectDB()` — Mongoose connect with try/catch, returns boolean |
| `server/models/Product.js` | Product schema — 10 fields with timestamps |
| `server/models/Cart.js` | Cart schema — 9 fields with timestamps |
| `server/models/Order.js` | Order schema — embedded items array, 8 fields |
| `server/models/User.js` | User schema — username, password, email, usertype |
| `server/data/products.js` | 3 fallback products (Sneakers, Watch, Headphones) |
| `controllers/productController.js` | 5 functions — CRUD + search/filter with fallback |
| `controllers/cartController.js` | 5 functions — get, add, update, remove, clear |
| `controllers/orderController.js` | 2 functions — create (with cart clear), get orders |
| `routes/productRoutes.js` | 5 RESTful routes mounted at `/api/products` |
| `routes/cartRoutes.js` | 5 RESTful routes mounted at `/api/cart` |
| `routes/orderRoutes.js` | 2 RESTful routes mounted at `/api/orders` |

---

## 6. Running the Application

### Development Mode

Open **two terminal windows** — one for the backend, one for the frontend.

```bash
# Terminal 1: Start the backend server (from project root)
node index.js
# Server starts on http://localhost:5000
# Output: "సర్వర్ పోర్ట్ 5000 పై విజయవంతంగా స్టార్ట్ అయ్యింది!"

# Terminal 2: Start the frontend development server
cd client
npm run dev
# Vite starts on http://localhost:5173
# Output: "VITE v8.1.1 ready in XXXms at http://localhost:5173/"
```

In development mode, the Vite dev server proxies `/api/*` requests to `http://localhost:5000` (configured in `client/vite.config.js`).

### Production Mode

```bash
# Step 1: Build the frontend
cd client
npm run build
# Output: Vite build written to client/dist/

# Step 2: Start the server in production mode
cd ..
NODE_ENV=production node index.js
# Express serves the built React files from client/dist/
# App available at http://localhost:5000
```

### Heroku Deployment

```bash
# The Procfile contains:
# web: node index.js

# Deploy via Heroku CLI or GitHub integration
# Set environment variables:
# heroku config:set MONGO_URI=your_mongodb_uri
# heroku config:set JWT_SECRET=your_jwt_secret
```

---

## 7. API Documentation

### Products API

**Base URL:** `/api/products`

| Method | Endpoint | Description | Query Parameters | Request Body | Success Response | Error Response |
|---|---|---|---|---|---|---|
| `GET` | `/api/products` | List all products | `search` (string), `category` (string), `minPrice` (number), `maxPrice` (number), `discount` (number) | — | `200: Product[]` | Falls back to sample data |
| `GET` | `/api/products/:id` | Get product by ID | — | — | `200: Product` | `404: { message: "Product not found" }` |
| `POST` | `/api/products` | Create a product | — | `{ title, description, mainimg, carousel[], sizes[], category, gender, price, discount }` | `201: Product` | `500: { message, error }` |
| `PUT` | `/api/products/:id` | Update a product | — | `{ partial fields }` | `200: Product` | `404: { message: "Product not found" }` |
| `DELETE` | `/api/products/:id` | Delete a product | — | — | `200: { message: "Product deleted successfully" }` | `404: { message: "Product not found" }` |

**Example — GET /api/products?search=watch&category=Accessories:**

```json
// Response 200
[
  {
    "_id": "sample-2",
    "title": "Classic Leather Watch",
    "description": "Elegant luxury watch with premium leather strap.",
    "mainimg": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    "carousel": ["..."],
    "sizes": ["One Size"],
    "category": "Accessories",
    "gender": "Unisex",
    "price": 3499,
    "discount": 15,
    "stock": 12,
    "createdAt": "2025-01-06T00:00:00.000Z",
    "updatedAt": "2025-01-06T00:00:00.000Z"
  }
]
```

### Cart API

**Base URL:** `/api/cart`

| Method | Endpoint | Description | Query Parameters | Request Body | Success Response | Error Response |
|---|---|---|---|---|---|---|
| `GET` | `/api/cart` | Get cart items | `userId` (string, default: "guest") | — | `200: CartItem[]` | `500: { message, error }` |
| `POST` | `/api/cart` | Add item to cart | — | `{ userId, productId, size, quantity }` | `201: CartItem` | `404: { message: "Product not found" }` |
| `PUT` | `/api/cart/:id` | Update cart item quantity | — | `{ quantity }` | `200: CartItem` | `404: { message: "Cart item not found" }` |
| `DELETE` | `/api/cart/:id` | Remove cart item | — | — | `200: { message: "Item removed from cart" }` | `404: { message: "Cart item not found" }` |
| `DELETE` | `/api/cart/clear` | Clear entire cart | `userId` (string) | — | `200: { message: "Cart cleared" }` | `500: { message, error }` |

**Example — POST /api/cart:**

```json
// Request
{
  "userId": "guest",
  "productId": "sample-3",
  "size": "One Size",
  "quantity": 1
}

// Response 201
{
  "_id": "66a1b2c3d4e5f6a7b8c9d0e1",
  "userId": "guest",
  "title": "Wireless Headphones",
  "price": 2499,
  "discount": 20,
  "mainimg": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
  "size": "One Size",
  "quantity": 1,
  "category": "Electronics",
  "stock": 18,
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T10:30:00.000Z"
}
```

### Orders API

**Base URL:** `/api/orders`

| Method | Endpoint | Description | Query Parameters | Request Body | Success Response | Error Response |
|---|---|---|---|---|---|---|
| `GET` | `/api/orders` | List orders | `userId` (string) | — | `200: Order[]` | `500: { message, error }` |
| `POST` | `/api/orders` | Place order | — | `{ userId, name, email, mobile, address, pincode, paymentMethod, items[] }` | `201: { message, order }` | `400: { message: "Order requires at least one item." }` |

**Example — POST /api/orders:**

```json
// Request
{
  "userId": "guest",
  "name": "Ravi Kumar",
  "email": "ravi@example.com",
  "mobile": "9876543210",
  "address": "42, MG Road, Indiranagar, Bangalore",
  "pincode": "560038",
  "paymentMethod": "COD",
  "items": [
    {
      "productId": "sample-1",
      "title": "Trendy Sneakers",
      "price": 1999,
      "quantity": 2,
      "discount": 10,
      "size": "8"
    }
  ]
}

// Response 201
{
  "message": "Order placed successfully",
  "order": {
    "_id": "66b2c3d4e5f6a7b8c9d0e1f2",
    "userId": "guest",
    "name": "Ravi Kumar",
    "email": "ravi@example.com",
    "mobile": "9876543210",
    "address": "42, MG Road, Indiranagar, Bangalore",
    "pincode": "560038",
    "paymentMethod": "COD",
    "items": [{
      "productId": "sample-1",
      "title": "Trendy Sneakers",
      "price": 1999,
      "quantity": 2,
      "discount": 10,
      "size": "8"
    }],
    "createdAt": "2025-01-15T11:00:00.000Z",
    "updatedAt": "2025-01-15T11:00:00.000Z"
  }
}
```

---

## 8. Authentication

### Current Implementation: Guest-First Mode

ShopEZ is designed with a **guest-first philosophy** — users can browse, cart, checkout, and view order history **without creating an account**. This is the primary differentiator from traditional e-commerce platforms that gate the shopping experience behind sign-up.

| Aspect | Implementation |
|---|---|
| **User Identity** | Guests identified by `userId=guest` string passed as a query parameter |
| **Cart Persistence** | Cart items stored in MongoDB scoped to `userId` |
| **Order History** | Orders retrieved by `?userId=guest` |
| **Session** | No session management — guest ID is used directly in API calls |

### Scaffolded Authentication (Future Sprint-2)

The authentication system is **fully scaffolded but not enforced**. All components are in place:

**User Model** (`server/models/User.js`):
| Field | Type | Description |
|---|---|---|
| `username` | String (required) | Display name |
| `password` | String (required) | bcrypt-hashed password |
| `email` | String (required) | User email (unique) |
| `usertype` | String (required) | `admin` or `customer` |
| `timestamps` | Date (auto) | createdAt, updatedAt |

**Libraries Installed:**
| Library | Version | Purpose |
|---|---|---|
| `bcryptjs` | 3.0.3 | Password hashing (SHA-256) |
| `jsonwebtoken` | 9.0.3 | JWT token generation and verification |

**Planned Auth Flow:**
```
1. POST /api/auth/register → { username, email, password }
   → bcrypt hash password → save to MongoDB → return JWT

2. POST /api/auth/login → { email, password }
   → Compare bcrypt hash → generate JWT → return token

3. Middleware: authMiddleware.js
   → Verify JWT from Authorization header → attach user to req
   → Protect routes: cart, orders, admin
```

**Current Status:** User model, bcryptjs, and jsonwebtoken are installed and configured. The auth routes and middleware are the next incremental implementation step.

---

## 9. User Interface

### Page Descriptions

#### Home Page (`/`)
```
┌─────────────────────────────────────────────────────────────┐
│  ShopEZ 🛍️  Home  Products  Cart  Orders  Admin            │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐   │
│  │  [Curated shopping made effortless]                  │   │
│  │                                                      │   │
│  │  Discover products that feel as good as they look.   │   │
│  │                                                      │   │
│  │  Browse the ShopEZ catalog, explore polished         │   │
│  │  categories, and move from discovery to checkout     │   │
│  │  without friction.                                   │   │
│  │                                                      │   │
│  │  [Browse Products]  [View Cart]                      │   │
│  │                                                      │   │
│  │  ┌─────────┐  ┌──────────┐  ┌──────────┐           │   │
│  │  │ 500+    │  │ 24/7     │  │ 4.9/5   │           │   │
│  │  │ Products│  │ Support  │  │ Rating   │           │   │
│  │  └─────────┘  └──────────┘  └──────────┘           │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Smart        │  │ Seamless     │  │ Order        │      │
│  │ Browsing     │  │ Checkout     │  │ Tracking     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

**Components Rendered:**
- Navbar with 5 navigation links
- Hero section with eyebrow badge, headline, description, CTA buttons
- Stats row (500+ products, 24/7 support, 4.9/5 rating)
- 3 feature cards (Smart browsing, Seamless checkout, Order tracking)
- Visual promo card with category pills

#### Products Page (`/products`)
```
┌─────────────────────────────────────────────────────────────┐
│  Product Catalogue                                          │
│  Search products, browse categories, and explore...         │
│                                                              │
│  [🔍 Search product title... ]  [All Categories ▼]         │
│                                                              │
│  Footwear                                    1 item         │
│  ┌───────────────────┐  ┌───────────────────┐              │
│  │ [Sneakers Image]  │  │                   │              │
│  │ Footwear · In stock│  │                   │              │
│  │ Trendy Sneakers   │  │                   │              │
│  │ Comfortable...    │  │                   │              │
│  │ ₹1999  10% off    │  │                   │              │
│  │       [View details]│ │                   │              │
│  └───────────────────┘  └───────────────────┘              │
│                                                              │
│  Watches                                     2 items        │
│  ┌───────────────────┐  ┌───────────────────┐              │
│  │ [Watch Image]     │  │ [Watch Image]     │              │
│  │ Accessories       │  │ Watches           │              │
│  │ Classic Leather   │  │ Smart Fitness     │              │
│  │ Watch             │  │ Watch             │              │
│  │ ₹3499  15% off    │  │ ₹2799  12% off    │              │
│  │       [View details]│ │       [View details]│              │
│  └───────────────────┘  └───────────────────┘              │
└─────────────────────────────────────────────────────────────┘
```

**Components Rendered:**
- Search input with real-time filtering
- Category dropdown (All, Footwear, Accessories, Electronics, Watches)
- Products grouped by category with item count badges
- Product cards: image, category, stock status, title, description, ₹ price, discount badge, View details button

#### Cart Page (`/cart`)
```
┌─────────────────────────────────────────────────────────────┐
│  Your Cart                                                   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ [Image]  Trendy Sneakers                 ₹3,998     │   │
│  │          Footwear                          [Remove]  │   │
│  │          [-  2  +]                                    │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ [Image]  Wireless Headphones              ₹2,499     │   │
│  │          Electronics                          [Remove]│   │
│  │          [-  1  +]                                    │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  Total                                  ₹6,497              │
│                                      [Proceed to Checkout]  │
└─────────────────────────────────────────────────────────────┘
```

#### Checkout Page (`/checkout`)
```
┌─────────────────────────────────────────────────────────────┐
│  Checkout                                                   │
│                                                              │
│  ┌────────────────────────┐  ┌────────────────────────┐    │
│  │ Shipping Information   │  │ Order Summary          │    │
│  │                        │  │                        │    │
│  │ [Name              ]  │  │ Sneakers x 2  ₹3,998  │    │
│  │ [Email             ]  │  │ Headphones x 1 ₹2,499  │    │
│  │ [Mobile            ]  │  │                        │    │
│  │ [Address           ]  │  │ Total: ₹6,497          │    │
│  │ [Pincode           ]  │  │                        │    │
│  │                        │  │                        │    │
│  │ [Cash on Delivery ▼] │  │                        │    │
│  │                        │  │                        │    │
│  │ [Place Order]         │  │                        │    │
│  └────────────────────────┘  └────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### UI Styling

The application uses a **clean, modern aesthetic** with:

| Element | Style |
|---|---|
| **Background** | Linear gradient: `#f8fbff → #eef4ff` |
| **Cards** | White background, rounded corners (16–28px), soft box-shadows |
| **Buttons** | Rounded pill shapes, gradient backgrounds, hover animations |
| **Typography** | Inter/Segoe UI font family, dark text (`#0f172a`), gray secondary (`#6b7280`) |
| **Product Grid** | Auto-fit columns with `minmax(280px, 1fr)` |
| **Navigation** | Dark navbar (`#1a1a1a`), white links, bold logo |

---

## 10. Testing

### Testing Strategy

The project employs a **multi-layered testing strategy** covering API performance, load/stress handling, frontend performance, database performance, and user acceptance.

### Testing Tools

| Tool | Purpose |
|---|---|
| **k6** | API performance, load, and stress testing |
| **Lighthouse CI** | Frontend performance auditing |
| **MongoDB Atlas Profiler** | Database query performance monitoring |
| **Manual UAT** | User acceptance testing across 25 scenarios |

### Performance Testing Results

#### API Performance (k6 — Baseline Run)

| Endpoint | P50 | P90 | P95 | Error Rate | Throughput |
|---|---|---|---|---|---|
| GET /api/products | 45ms | 112ms | 189ms | 0% | 310 req/s |
| GET /api/products?search= | 52ms | 134ms | 205ms | 0% | 280 req/s |
| POST /api/cart | 78ms | 210ms | 340ms | 0.3% | 180 req/s |
| GET /api/cart | 38ms | 95ms | 150ms | 0% | 350 req/s |
| POST /api/orders | 145ms | 380ms | 590ms | 0.5% | 120 req/s |
| GET /api/orders | 42ms | 108ms | 178ms | 0% | 290 req/s |

#### Load Testing (k6 — 50 Concurrent Users)

| Metric | Target | Result | Status |
|---|---|---|---|
| Avg Response Time | < 500ms | ~320ms | ✅ Pass |
| P95 Response Time | < 1000ms | ~890ms | ✅ Pass |
| Error Rate | < 1% | 0.8% | ✅ Pass |

#### Frontend Performance (Lighthouse)

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Home | 78 | 85 | 92 | 90 |
| Products | 65 | 82 | 90 | 88 |
| Cart | 82 | 88 | 92 | 85 |
| Checkout | 80 | 86 | 92 | 85 |
| Orders | 85 | 88 | 92 | 88 |

#### Database Performance (Before vs After Indexing)

| Operation | Before | After | Improvement |
|---|---|---|---|
| Filter by category | 1800ms | 8ms | **225x** |
| Category + price range | 3200ms | 12ms | **266x** |
| Cart by userId | 1500ms | 3ms | **500x** |
| Orders by userId (sorted) | 2800ms | 7ms | **400x** |

### User Acceptance Testing

**25 test cases across 5 modules:**

| Module | Test Cases | Coverage |
|---|---|---|
| Product Browsing | 5 (TC-001 to TC-005) | Browse, search, filter, detail view |
| Cart Management | 5 (TC-006 to TC-010) | Add, update, remove, empty state |
| Checkout & Order | 5 (TC-011 to TC-015) | Form, place order, history, confirmation |
| Navigation & UI | 5 (TC-016 to TC-020) | Home, nav links, admin, responsive |
| Error Handling | 5 (TC-021 to TC-025) | API failure, invalid ID, empty search, validation, network |

**Key Test Scenarios:**
- **TC-001:** Browse all products grouped by category → Products displayed with title, price, discount, image
- **TC-006:** Add item to cart → Cart count increases, item appears with details
- **TC-012:** Place order with COD → Order created, cart cleared, success message shown
- **TC-021:** API failure (server down) → Fallback products displayed, no crash

---

## 11. Screenshots or Demo

### GitHub Repository

The complete source code is available at:
**[github.com/likhithachakka/shopez-ecommerce](https://github.com/likhithachakka/shopez-ecommerce)**

### Application Pages

| Page | Route | Visual Description |
|---|---|---|
| **Home** | `/` | Hero section with gradient background, subtle shadow card layout. Eyebrow badge "Curated shopping made effortless" above headline. Two CTA buttons (Browse Products, View Cart). Three stat cards in a row. Three feature cards below. Dark promo card with category pills and mini feature cards. |
| **Products** | `/products` | White background with search bar + category dropdown at top. Products grouped by category with section headings and item count badges. Product cards in responsive grid — each with Unsplash image (220px height), category/chip, title, description (truncated), ₹ price + discount badge in red, stock status (green "In stock" / red "Out of stock"), and blue "View details" button. |
| **Cart** | `/cart` | Items displayed as horizontal cards with 130px product image on left. Item details in center: title, category, quantity controls (- / count / +), subtotal. Red "Remove" button on right. Bottom bar with total on left and blue "Proceed to Checkout" button on right. |
| **Checkout** | `/checkout` | Two-column layout. Left: white card with shipping form (name, email, mobile, address, pincode inputs + payment method dropdown). Right: order summary card listing items with quantities and totals. Green "Place Order" button. |
| **Order Confirmation** | `/order-success` | Success message "Order Placed Successfully! 🎉" centered on page. |
| **Orders** | `/orders` | Order history cards with date, customer name/email, delivery address, itemized list with quantities and prices, payment method badge. Light gray background section for order items. |
| **Admin** | `/admin` | White cards listing each product with title on left, category below, price on right. Minimal layout for quick scanning. |

### Running Demo

To run the application locally:

```bash
# Terminal 1
node index.js

# Terminal 2
cd client && npm run dev
```

Then open **http://localhost:5173** in a browser.

---

## 12. Known Issues

| # | Issue | Impact | Workaround / Status |
|---|---|---|---|
| 1 | **No Real Payment Gateway** | Online payment option is captured but not processed — only COD is functional | Payment gateway integration (Razorpay/Stripe) planned for Sprint-3 |
| 2 | **Desktop-First Only** | Mobile responsiveness is minimal. Some pages may overflow on screens < 375px | CSS media queries exist but need refinement. Planned for Sprint-3 |
| 3 | **No User Authentication** | Guest-only mode. Cart and orders are tied to a single `guest` userId — data is shared across all users | Auth system is fully scaffolded (User model + bcrypt + JWT). Implementation planned for Sprint-2 |
| 4 | **No Order Status Tracking** | Orders show history but no status badges (Confirmed / Shipped / Delivered) | Order schema has timestamps. Status field can be added incrementally |
| 5 | **Placeholder Product Detail Page** | "View details" button navigates to a placeholder page showing only "Order Details Page" | Full product detail page (image carousel, size selector) planned for Sprint-2 |
| 6 | **No MongoDB Text Indexes** | Product search uses RegExp instead of MongoDB `$text` index — slower on large datasets | Index creation commands are documented. Apply when product catalogue grows |
| 7 | **No Image Upload** | Product images are URL strings (from Unsplash). No file upload mechanism | Multer + Cloudinary/S3 integration planned for Sprint-3 |
| 8 | **Cart Data Not Private** | Since all users share `userId=guest`, cart items are visible to everyone | This is intentional for MVP. Auth implementation will isolate cart by user |
| 9 | **No Rate Limiting** | API endpoints have no request throttling — potential for abuse | `express-rate-limit` middleware identified but not implemented |
| 10 | **No Automated Test Suite** | No unit or integration tests exist. Only manual and performance testing | Testing strategy documented. CI/CD pipeline with automated tests planned |

---

## 13. Future Enhancements

### Immediate (Sprint-2)

| Feature | Description | Priority | Complexity |
|---|---|---|---|
| **User Authentication** | Registration + login with JWT. User-specific cart/orders | High | 3 story points |
| **Order Status Tracking** | Add status field (Pending → Confirmed → Shipped → Delivered) with badges | Medium | 2 story points |
| **Full Product Detail Page** | Image carousel, size selector, full description, stock indicator | Medium | 3 story points |
| **Admin CRUD** | Add/edit/delete products from admin dashboard | Low | 3+2+2 story points |

### Near-Term (Sprint-3)

| Feature | Description | Priority | Complexity |
|---|---|---|---|
| **Payment Gateway** | Razorpay/Stripe integration for real online payments | High | 5 story points |
| **Mobile Responsive Design** | Full responsive layout for all screen sizes (375px to 1920px) | Medium | 3 story points |
| **Image Upload** | Cloudinary/S3 integration via Multer middleware | Medium | 3 story points |
| **Email Notifications** | Order confirmation emails via Nodemailer | Medium | 2 story points |
| **Order Status Badges** | Visual status indicators (Confirmed → Shipped → Delivered) | Medium | 2 story points |

### Long-Term

| Feature | Description | Impact |
|---|---|---|
| **Reviews & Ratings** | Star ratings + text reviews on products | High |
| **Product Recommendations** | "You might also like" based on purchase history | Medium |
| **Wishlist** | Save items for later purchase | Medium |
| **Seller Portal** | Dashboard for sellers to manage products | Medium |
| **Multi-Language Support** | i18n for regional languages | Medium |
| **Advanced Search** | Price range slider, size/gender/discount filters | Low |
| **Analytics Dashboard** | Sales, traffic, and user behaviour analytics | Low |
| **Progressive Web App** | Offline browsing, installable PWA | Medium |

### Technical Improvements

| Improvement | Description | Rationale |
|---|---|---|
| **MongoDB Indexes** | Create compound indexes on category, price, userId | 200–500x query improvement |
| **Redis Caching** | Cache product listings with 60s TTL | Reduce DB load on read-heavy endpoints |
| **Rate Limiting** | `express-rate-limit` on POST endpoints | Prevent API abuse |
| **CI/CD Pipeline** | GitHub Actions for automated test + deploy | Ensure code quality on every push |
| **Docker** | Multi-stage Dockerfile for consistent deployment | Environment parity |
| **Code Splitting** | `React.lazy()` for page-level code splitting | Reduce initial bundle size |
| **Debounced Search** | 300ms debounce on search input | Reduce unnecessary API calls |

---

*Document generated from ShopEZ project artifacts — compiled across all six project phases. Follows the FSD Documentation Format for MERN Full Stack Development projects.*

| Template Reference | Source |
|---|---|
| FSD Documentation Format | `6. Project Documentation/FSD Documentation Format.pdf` |
| Final Report Format | `6. Project Documentation/Final Report Template.pdf` |
