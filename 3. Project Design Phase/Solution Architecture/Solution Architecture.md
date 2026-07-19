# Project Design Phase — Solution Architecture

| Field | Value |
|---|---|
| **Date** | January 2025 |
| **Team ID** | ShopEZ Team |
| **Project Name** | ShopEZ — Curated E-Commerce Platform |
| **Maximum Marks** | 4 Marks |

---

## 1. Purpose

Solution architecture bridges the gap between business problems and technology solutions. This document describes the **structure, characteristics, behaviour, and interactions** of the ShopEZ software system, defining the features, development phases, and specifications according to which the solution is built, managed, and delivered.

**Reference Template:** `3. Project Design Phase/Solution Architecture/Solution Architecture.docx`
**Methodology:** https://c4model.com/ — Architecture visualization methodology

---

## 2. High-Level Architecture Diagram

```
╔════════════════════════════════════════════════════════════════════════════╗
║                          BROWSER (Client Layer)                           ║
║                                                                           ║
║         React 19 SPA  ·  Vite 8 Dev Server (Port 5173)                   ║
║         React Router 7  ·  Lucide Icons  ·  CSS3                          ║
║                                                                           ║
║   ┌──────────┐  ┌──────────┐  ┌─────────┐  ┌──────────┐  ┌──────────┐   ║
║   │   Home   │  │ Products │  │  Cart   │  │ Checkout │  │  Orders  │   ║
║   │  (Hero,  │  │ (Search, │  │(Qty +/- │  │  (Form,  │  │ (History │   ║
║   │  Stats)  │  │  Filter, │  │ Remove)  │  │ Summary) │  │  + Items)│   ║
║   └──────────┘  │  Groups) │  └─────────┘  └──────────┘  └──────────┘   ║
║                 └──────────┘                   ┌──────────────┐          ║
║   ┌──────────┐  ┌────────────────────┐         │  Order       │          ║
║   │  Admin   │  │  OrderDetails      │         │ Confirmation │          ║
║   └──────────┘  └────────────────────┘         └──────────────┘          ║
║                                                                           ║
║   ════════════════════════════════════════════════════════════════════    ║
║   Vite Dev Proxy:  /api/*  ───→  http://localhost:5000  (Dev only)       ║
║   In Production:  Express serves React build from client/dist             ║
╚════════════════════════════════════════════════════════════════════════════╝
                               │
                          HTTP/JSON
                               ▼
╔════════════════════════════════════════════════════════════════════════════╗
║                    EXPRESS.JS BACKEND (Port 5000)                         ║
║                                                                           ║
║  ┌──────────────────────────────────────────────────────────────────────┐ ║
║  │                       ROUTES LAYER                                   │ ║
║  │                                                                      │ ║
║  │  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐               │ ║
║  │  │ Product     │   │ Cart        │   │ Order       │               │ ║
║  │  │ Routes      │   │ Routes      │   │ Routes      │               │ ║
║  │  │             │   │             │   │             │               │ ║
║  │  │ GET    /    │   │ GET    /    │   │ GET    /    │               │ ║
║  │  │ GET    /:id │   │ POST   /    │   │ POST   /    │               │ ║
║  │  │ POST   /    │   │ PUT    /:id │   │             │               │ ║
║  │  │ PUT    /:id │   │ DELETE /:id │   │             │               │ ║
║  │  │ DELETE /:id │   │ DELETE /clear│  │             │               │ ║
║  │  └──────┬──────┘   └──────┬──────┘   └──────┬──────┘               │ ║
║  └─────────┼─────────────────┼──────────────────┼──────────────────────┘ ║
║            │                 │                  │                         ║
║  ┌─────────▼─────────────────▼──────────────────▼──────────────────────┐ ║
║  │                       CONTROLLERS LAYER                              │ ║
║  │                                                                      │ ║
║  │  ┌──────────────────────────────────────────────────────────────┐   │ ║
║  │  │  productController.js        cartController.js               │   │ ║
║  │  │  • getProducts (search,      • getCart                       │   │ ║
║  │  │    category, minPrice,        • addToCart (with product      │   │ ║
║  │  │    maxPrice, discount)         lookup + duplicate check)     │   │ ║
║  │  │  • getProductById            • updateCartItem (quantity)     │   │ ║
║  │  │  • createProduct             • removeCartItem                │   │ ║
║  │  │  • updateProduct             • clearCart                     │   │ ║
║  │  │  • deleteProduct                                            │   │ ║
║  │  └──────────────────────────────────────────────────────────────┘   │ ║
║  │                                                                      │ ║
║  │  ┌──────────────────────────────────────────────────────────────┐   │ ║
║  │  │  orderController.js                                          │   │ ║
║  │  │  • createOrder (validates items, saves order, clears cart)   │   │ ║
║  │  │  • getOrders (supports ?userId filter, sorted by date desc)  │   │ ║
║  │  └──────────────────────────────────────────────────────────────┘   │ ║
║  │                                                                      │ ║
║  │  ════════════════════════════════════════════════════════════════    │ ║
║  │  FALLBACK LAYER:                                                    │ ║
║  │  When MongoDB is unreachable or returns empty results:              │ ║
║  │  • productController → sampleProducts (server/data/products.js)    │ ║
║  │  • Frontend pages also have their own inline fallback data         │ ║
║  │  • App NEVER shows empty/error state — graceful degradation        │ ║
║  └──────────────────────────────────────────────────────────────────────┘ ║
║            │                 │                  │                         ║
║  ┌─────────▼─────────────────▼──────────────────▼──────────────────────┐ ║
║  │                       MODELS LAYER                                  │ ║
║  │                                                                      │ ║
║  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │ ║
║  │  │   Product    │  │    Cart      │  │    Order     │              │ ║
║  │  │  ────────   │  │  ────────   │  │  ────────   │              │ ║
║  │  │  title      │  │  userId      │  │  userId      │              │ ║
║  │  │  description│  │  productId   │  │  name        │              │ ║
║  │  │  mainimg    │  │  title       │  │  email       │              │ ║
║  │  │  carousel[] │  │  mainimg     │  │  mobile      │              │ ║
║  │  │  sizes[]    │  │  sizes       │  │  address     │              │ ║
║  │  │  category   │  │  quantity    │  │  pincode     │              │ ║
║  │  │  gender     │  │  price       │  │  items[]     │              │ ║
║  │  │  price      │  │  discount    │  │  paymentMethod│              │ ║
║  │  │  discount   │  │  category    │  │  timestamps  │              │ ║
║  │  │  timestamps │  │  timestamps  │  │              │              │ ║
║  │  └──────────────┘  └──────────────┘  └──────────────┘              │ ║
║  │                                                                      │ ║
║  │  ┌──────────────┐                                                    │ ║
║  │  │    User      │    (scaffolded for future auth)                    │ ║
║  │  │  ────────   │                                                    │ ║
║  │  │  username    │                                                    │ ║
║  │  │  password    │  (bcrypt hashed)                                  │ ║
║  │  │  email       │                                                    │ ║
║  │  │  usertype    │  (admin / customer)                               │ ║
║  │  │  timestamps  │                                                    │ ║
║  │  └──────────────┘                                                    │ ║
║  └──────────────────────────────────────────────────────────────────────┘ ║
╚════════════════════════════════════════════════════════════════════════════╝
                               │
                               ▼
╔════════════════════════════════════════════════════════════════════════════╗
║                      DATA STORE LAYER                                     ║
║                                                                           ║
║  ┌─────────────────────────────────┐    ┌──────────────────────────────┐  ║
║  │       MONGODB ATLAS            │    │  FALLBACK (In-Memory)        │  ║
║  │                                 │    │                              │  ║
║  │  Collections:                  │    │  server/data/products.js     │  ║
║  │  • products (Product docs)     │    │  • Static array of 3 sample  │  ║
║  │  • carts (Cart docs by userId) │    │    products (Sneakers, Watch,│  ║
║  │  • orders (Order docs)         │    │    Headphones)              │  ║
║  │  • users (User docs)           │    │  • Used when MongoDB is     │  ║
║  │                                 │    │    unreachable or returns   │  ║
║  │  OPTIONAL — App works without  │    │    empty results            │  ║
║  │  it via fallback data          │    │                              │  ║
║  └─────────────────────────────────┘    └──────────────────────────────┘  ║
╚════════════════════════════════════════════════════════════════════════════╝
```

---

## 3. Deployment Architecture

```
                          ┌───────────────────────────┐
                          │    DNS / Domain            │
                          │    (shopez.example.com)    │
                          └───────────┬───────────────┘
                                      │
                          ┌───────────▼───────────────┐
                          │   Load Balancer / Proxy   │
                          │   (Nginx / Heroku Router) │
                          └───────────┬───────────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              │                       │                       │
    ┌─────────▼─────────┐   ┌─────────▼─────────┐   ┌─────────▼─────────┐
    │  Express Instance 1│   │  Express Instance 2│   │  Express Instance N│
    │  (Port 5000)       │   │  (Port 5000)       │   │  (Port 5000)       │
    │                    │   │                    │   │                    │
    │  Serves:           │   │  Serves:           │   │  Serves:           │
    │  • REST API (/api) │   │  • REST API (/api) │   │  • REST API (/api) │
    │  • React SPA (if   │   │  • React SPA (if   │   │  • React SPA (if   │
    │    NODE_ENV=prod)  │   │    NODE_ENV=prod)  │   │    NODE_ENV=prod)  │
    └─────────┬─────────┘   └─────────┬─────────┘   └─────────┬─────────┘
              │                       │                       │
              └───────────────────────┼───────────────────────┘
                                      │
                          ┌───────────▼───────────────┐
                          │     MongoDB Atlas         │
                          │  (Managed, auto-scaling)  │
                          └───────────────────────────┘
```

### Runtime Deployment Options

| Option | Command / Config | Use Case |
|---|---|---|
| **Local Development** | `node index.js` (backend) + `npm run dev` in `client/` (frontend) | Daily development with HMR |
| **Production (Heroku)** | `Procfile` → `web: node index.js` | Cloud deployment, single command |
| **Production (Standalone)** | `NODE_ENV=production node index.js` | Express serves built React files from `client/dist` |
| **Docker (Future)** | Dockerfile with multi-stage build | Containerized deployment to any cloud |

---

## 4. Data Flow Diagrams

### 4.1 Context-Level Data Flow (Level 0)

```
╔════════════════════════════════════════════════════════════════════╗
║                        SHOPEZ SYSTEM                              ║
║                                                                    ║
║  ┌──────────────┐    ┌──────────────────┐    ┌──────────────┐    ║
║  │  BROWSE      │    │  CART & CHECKOUT │    │  ORDER MGMT  │    ║
║  │              │    │                  │    │              │    ║
║  │ • View       │    │ • Add to Cart    │    │ • Place Order│    ║
║  │   products   │    │ • Update Qty     │    │ • Confirmation│   ║
║  │ • Search     │    │ • Remove Item    │    │ • History    │    ║
║  │ • Filter     │    │ • Clear Cart     │    │ • Details    │    ║
║  │ • Categories │    │ • One-page       │    │              │    ║
║  │              │    │   checkout       │    │              │    ║
║  └──────┬───────┘    └────────┬─────────┘    └──────┬───────┘    ║
║         │                    │                      │            ║
║         └────────────────────┼──────────────────────┘            ║
║                              │                                   ║
║                  ┌───────────▼────────────┐                      ║
║                  │    EXPRESS API         │                      ║
║                  │  (Routes + Controllers)│                      ║
║                  └───────────┬────────────┘                      ║
║                              │                                   ║
║                  ┌───────────▼────────────┐                      ║
║                  │  Data Sources          │                      ║
║                  │  ┌────────┐ ┌────────┐│                      ║
║                  │  │MongoDB │ │Sample  ││                      ║
║                  │  │(Atlas) │ │Data    ││                      ║
║                  │  └────────┘ └────────┘│                      ║
║                  └───────────────────────┘                      ║
╚══════════════════════════════════════════════════════════════════╝
           ▲                                        │
           │           HTTP / JSON                  │
           └────────────────┬───────────────────────┘
                            │
                  ┌─────────▼──────────┐
                  │  USER (Web Browser)│
                  │  React SPA Client  │
                  └────────────────────┘
```

### 4.2 Detailed Data Flows

#### Flow Set A — Product Browsing

| Flow ID | Source | Destination | Payload | Description |
|---|---|---|---|---|
| **F1** | Browser | `productController.getProducts` | `GET /api/products?search=&category=&minPrice=&maxPrice=` | User requests filtered product list |
| **F2** | Controller | MongoDB | `Product.find({ title: RegExp, category, price range })` | Query MongoDB with filters |
| **F3** | MongoDB | Controller | `Product[]` (JSON documents) | Return matching products |
| **F3-Fallback** | Controller | Sample Data | `sampleProducts.filter(matchFilter)` | If MongoDB fails/empty, use fallback |
| **F4** | Controller | Browser | `JSON Product[]` | Render product catalogue grouped by category |

#### Flow Set B — Cart Operations

| Flow ID | Source | Destination | Payload | Description |
|---|---|---|---|---|
| **F5** | Browser | `cartController.addToCart` | `POST /api/cart { userId, productId, size, quantity }` | Add item to guest cart |
| **F6** | Controller | MongoDB | `Cart.create({ userId, productId, title, price, ... })` | Save cart item (or increment if exists) |
| **F7** | Browser | `cartController.getCart` | `GET /api/cart?userId=guest` | Fetch all cart items |
| **F8** | Controller | Browser | `CartItem[]` | Render cart with quantities and totals |
| **F9** | Browser | `cartController.updateCartItem` | `PUT /api/cart/:id { quantity }` | Change item quantity |
| **F10** | Browser | `cartController.removeCartItem` | `DELETE /api/cart/:id` | Remove item from cart |

#### Flow Set C — Order Processing

| Flow ID | Source | Destination | Payload | Description |
|---|---|---|---|---|
| **F11** | Browser | `orderController.createOrder` | `POST /api/orders { userId, name, email, mobile, address, pincode, paymentMethod, items }` | Place order with shipping + payment info |
| **F12** | Controller | MongoDB | `Order.create({ userId, name, email, items[], ... })` | Save order document |
| **F13** | Controller | MongoDB | `Cart.deleteMany({ userId })` | Clear user's cart after successful order |
| **F14** | Controller | Browser | `{ message: "Order placed successfully", order }` | Return confirmation with order details |
| **F15** | Browser | `orderController.getOrders` | `GET /api/orders?userId=guest` | Request order history |
| **F16** | Controller | MongoDB | `Order.find({ userId }).sort({ createdAt: -1 })` | Query orders sorted by date |
| **F17** | Controller | Browser | `Order[]` | Render order history |

---

## 5. Component & Technology Specifications

### 5.1 Components & Technologies

| S.No | Component | Description | Technology | Version |
|---|---|---|---|---|
| 1 | **User Interface** | Single-page application — product browsing, cart, checkout, order management | React · React Router · Vite | React 19, React Router 7, Vite 8 |
| 2 | **Backend API Server** | RESTful API — products, cart, orders, user management | Express · Node.js | Express 5, Node 22+ |
| 3 | **Primary Database** | Document store for products, carts, orders, users | MongoDB + Mongoose | Mongoose 9 |
| 4 | **Fallback Data Store** | Static sample product data when MongoDB is offline | In-memory JS module | — |
| 5 | **Authentication** | Password hashing + JWT tokens for user sessions | bcryptjs · jsonwebtoken | bcryptjs 3.x, jsonwebtoken 9.x |
| 6 | **Environment Config** | Environment variable management | dotenv | 17.x |
| 7 | **CORS** | Cross-origin requests for dev mode | cors | 2.x |
| 8 | **API Proxy (Dev)** | Vite proxies /api → Express backend | Vite server.proxy | Vite 8 |
| 9 | **Icons** | Open-source icon library | lucide-react | 1.x |
| 10 | **Infrastructure** | Deployment platform | Node.js runtime · Heroku | — |

### 5.2 Application Characteristics

| S.No | Characteristic | Description | Implementation |
|---|---|---|---|
| 1 | **Open-Source Stack** | 100% open-source frameworks and libraries | React, Express, MongoDB, Mongoose, Vite, bcryptjs, JWT, lucide-react |
| 2 | **Security** | Passwords hashed via bcryptjs. JWT tokens. Environment-isolated secrets | bcryptjs (SHA-256), jsonwebtoken (RS256), dotenv (.env) |
| 3 | **Resilience** | Graceful degradation when DB is offline. Controllers catch errors and return fallback data | try/catch in every controller → `sampleProducts.filter()` |
| 4 | **Modular Architecture** | 3-tier backend (Routes → Controllers → Models). Feature-organized frontend pages | Express Router pattern. Single-responsibility React components |
| 5 | **Availability** | Single-server deployment with zero-config. No external service dependencies for basic function | `node index.js` starts everything. Works with/without MongoDB |
| 6 | **Performance** | Vite HMR for fast dev. Vite build for optimized prod. Server-side search filtering | Vite dev/build · Debounced search · Filtered DB queries |
| 7 | **Portability** | Single entry point. Cross-platform. Minimal config | `index.js` → `server/server.js` → Express on PORT |

---

## 6. Folder Structure & Module Map

```
c:\Users\likhi\OneDrive\Desktop\shopez\
│
├── index.js                          # Entry point — starts Express server
├── package.json                      # Root dependencies (Express, Mongoose, etc.)
├── Procfile                          # Heroku process declaration
├── .gitignore
├── ShopEZ-Ideation-and-Requirements.md   # Consolidated requirements doc
│
├── server/                           # BACKEND
│   ├── server.js                     # Express app setup, routes, middleware, DB connect
│   ├── config/
│   │   └── db.js                     # MongoDB connection with graceful failure
│   ├── models/
│   │   ├── Product.js                # Mongoose schema — products collection
│   │   ├── Cart.js                   # Mongoose schema — carts collection
│   │   ├── Order.js                  # Mongoose schema — orders collection
│   │   └── User.js                   # Mongoose schema — users collection (future auth)
│   └── data/
│       └── products.js               # Fallback sample products array
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
├── client/                           # FRONTEND (React + Vite)
│   ├── index.html                    # Vite HTML entry
│   ├── vite.config.js                # Vite config with API proxy
│   ├── package.json                  # Frontend dependencies
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   └── src/
│       ├── main.jsx                  # React entry point
│       ├── App.jsx                   # Router + layout
│       ├── App.css                   # Global and page styles
│       ├── index.css                 # CSS reset and variables
│       ├── assets/
│       │   ├── hero.png              # Home page hero image
│       │   ├── react.svg
│       │   └── vite.svg
│       ├── components/
│       │   └── Navbar.jsx            # Top navigation bar
│       └── pages/
│           ├── Home.jsx              # Landing page — hero, stats, features
│           ├── Products.jsx          # Product catalogue — search, filter, grouped display
│           ├── Cart.jsx              # Shopping cart — quantity controls, remove, total
│           ├── Checkout.jsx          # One-page checkout — form + order summary
│           ├── Orders.jsx            # Order history list
│           ├── OrderDetails.jsx      # Single order detail (placeholder)
│           ├── OrderConfirmation.jsx # Post-order success message
│           └── Admin.jsx             # Admin product dashboard
│
├── 1. Ideation Phase/                # IDEATION PHASE DOCUMENTS
│   ├── Empathy Map Canvas.md
│   ├── Define Problem Statements.md
│   └── Brainstorming & Idea Prioritization.md
│
├── 2. Requirement Analysis/          # REQUIREMENT ANALYSIS DOCUMENTS
│   ├── Customer Journey Map.md
│   ├── Data Flow Diagrams and User Stories.md
│   ├── Solution Requirements.md
│   └── Technology Stack - Architecture & Stack.md
│
└── 3. Project Design Phase/          # DESIGN PHASE DOCUMENTS
    ├── Problem - Solution Fit/
    │   └── Problem-Solution Fit Canvas.md
    ├── Proposed Solution/
    │   └── Proposed Solution.md
    └── Solution Architecture/
        └── Solution Architecture.md  # ← THIS DOCUMENT
```

---

## 7. API Contract & Response Formats

### 7.1 Products API

```
GET    /api/products?search=&category=&minPrice=&maxPrice=&discount=
→ 200  Product[]
→ 500  (falls back to sample data)

GET    /api/products/:id
→ 200  Product
→ 404  { message: "Product not found" }

POST   /api/products
Body:  { title, description, mainimg, carousel[], sizes[], category, gender, price, discount }
→ 201  Product
→ 500  { message: "Unable to create product", error }

PUT    /api/products/:id
Body:  { partial fields to update }
→ 200  Product (updated)
→ 404  { message: "Product not found" }

DELETE /api/products/:id
→ 200  { message: "Product deleted successfully" }
→ 404  { message: "Product not found" }
```

### 7.2 Cart API

```
GET    /api/cart?userId=guest
→ 200  CartItem[]

POST   /api/cart
Body:  { userId, productId, size, quantity }
→ 201  CartItem (created or incremented)
→ 404  { message: "Product not found" }

PUT    /api/cart/:id
Body:  { quantity }
→ 200  CartItem (updated)
→ 404  { message: "Cart item not found" }

DELETE /api/cart/:id
→ 200  { message: "Item removed from cart" }
→ 404  { message: "Cart item not found" }

DELETE /api/cart/clear?userId=guest
→ 200  { message: "Cart cleared" }
```

### 7.3 Orders API

```
GET    /api/orders?userId=guest
→ 200  Order[]

POST   /api/orders
Body:  { userId, name, email, mobile, address, pincode, paymentMethod, items[] }
→ 201  { message: "Order placed successfully", order }
→ 400  { message: "Order requires at least one item." }
→ 500  { message: "Order creation error", error }
```

---

## 8. Database Schema Design

### 8.1 Product Schema

```
┌──────────────────────────────────────┐
│ Product                              │
├──────────────────────────────────────┤
│ _id          ObjectId (auto)         │
│ title        String      [required]  │
│ description  String      [required]  │
│ mainimg      String      [required]  │  (URL to primary image)
│ carousel     Array       [required]  │  (Array of image URLs)
│ sizes        Array       [required]  │  (e.g. ['6','7','8','9','10'] or ['One Size'])
│ category     String      [required]  │  (e.g. 'Footwear', 'Accessories', 'Electronics')
│ gender       String      [required]  │  (e.g. 'Men', 'Women', 'Unisex')
│ price        Number      [required]  │  (in INR)
│ discount     Number      [required]  │  (percentage, 0–100)
│ createdAt    Date        (auto)      │
│ updatedAt    Date        (auto)      │
└──────────────────────────────────────┘
```

### 8.2 Cart Schema

```
┌──────────────────────────────────────┐
│ Cart                                 │
├──────────────────────────────────────┤
│ _id          ObjectId (auto)         │
│ userId       String      [required]  │  (guest identifier or future user ID)
│ title        String      [required]  │  (denormalized from Product)
│ description  String      [required]  │
│ mainimg      String      [required]  │
│ sizes        String      [required]  │  (selected size string)
│ quantity     Number      [required]  │
│ price        Number      [required]  │  (unit price, not multiplied)
│ discount     Number      [required]  │  (denormalized from Product)
│ category     String      (optional)  │
│ stock        Number      (optional)  │
│ createdAt    Date        (auto)      │
│ updatedAt    Date        (auto)      │
└──────────────────────────────────────┘
```

### 8.3 Order Schema

```
┌──────────────────────────────────────┐
│ Order                                │
├──────────────────────────────────────┤
│ _id          ObjectId (auto)         │
│ userId       String      [required]  │
│ name         String      [required]  │  (customer name from checkout)
│ email        String      [required]  │
│ mobile       String      [required]  │
│ address      String      [required]  │
│ pincode      String      [required]  │
│ items        Array       [required]  │
│  ├ productId  ObjectId   [required]  │  (ref: Product)
│  ├ title      String     [required]  │
│  ├ price      Number     [required]  │
│  ├ quantity   Number     [required]  │
│  ├ discount   Number     (default:0) │
│  ├ mainimg    String     (optional)  │
│  └ size       String     (optional)  │
│ paymentMethod String      [required] │  ('COD' or 'Online')
│ createdAt    Date        (auto)      │
│ updatedAt    Date        (auto)      │
└──────────────────────────────────────┘
```

### 8.4 User Schema (Scaffolded)

```
┌──────────────────────────────────────┐
│ User                                 │
├──────────────────────────────────────┤
│ _id          ObjectId (auto)         │
│ username     String      [required]  │
│ password     String      [required]  │  (bcrypt hashed)
│ email        String      [required]  │
│ usertype     String      [required]  │  ('admin' or 'customer')
│ createdAt    Date        (auto)      │
│ updatedAt    Date        (auto)      │
└──────────────────────────────────────┘
```

---

## 9. Error Handling & Fallback Strategy

| Scenario | Frontend Behaviour | Backend Behaviour | User Impact |
|---|---|---|---|
| MongoDB offline | Fetches `/api/products` → receives fallback data → renders normally | `connectDB()` returns false. Controllers catch errors → return `sampleProducts` | None — products still display |
| MongoDB offline (cart/orders) | Cart shows empty. Orders show empty. No crash | Cart/order controllers return 500 with error message | Cart and orders unavailable, but browsing works |
| API returns 404 | Product detail shows "not found" page | Controller returns `404 { message }` | User sees friendly not-found message |
| API returns 500 | Pages have try/catch → use inline fallback data or show empty state | Controller logs error, returns 500 with message | Page may show reduced data but never crashes |
| Network failure (offline) | Fetch throws → frontend catch blocks use fallback/empty state | — | Pages render with fallback or informative empty state |
| Empty cart at checkout | Checkout page shows alert "Your cart is empty" → prevents order | `createOrder` validates `items.length` → returns 400 | User cannot place empty order |

---

## 10. Development Phases (Roadmap)

### Sprint-1 (Current — MVP)
| Feature | Status | Priority |
|---|---|---|
| Product catalogue with category grouping | ✅ Complete | P0 |
| Search + category filter | ✅ Complete | P0 |
| Guest cart (add, update, remove, clear) | ✅ Complete | P0 |
| One-page checkout with form + payment selection | ✅ Complete | P0 |
| Order placement + confirmation | ✅ Complete | P0 |
| Discount badges on product cards | ✅ Complete | P1 |
| Fallback data when MongoDB offline | ✅ Complete | P1 |
| Home page (hero, stats, features) | ✅ Complete | P1 |
| Navbar with route links | ✅ Complete | P1 |

### Sprint-2 (Next)
| Feature | Status | Priority |
|---|---|---|
| Order history with item details | ⬜ Planned | P0 |
| User registration + login | ⬜ Planned | P1 |
| Admin dashboard (product list) | ⬜ Planned | P2 |
| Admin CRUD (add/edit/delete products) | ⬜ Planned | P2 |
| Product detail page (image carousel, sizes) | ⬜ Planned | P2 |
| Order status tracking (pending/shipped/delivered) | ⬜ Planned | P2 |

### Sprint-3 (Future)
| Feature | Status | Priority |
|---|---|---|
| Payment gateway (Razorpay/Stripe) | ⬜ Future | P1 |
| Image upload (Cloudinary/S3) | ⬜ Future | P2 |
| Responsive mobile design | ⬜ Future | P2 |
| Reviews and ratings | ⬜ Future | P3 |
| Seller portal | ⬜ Future | P3 |
| Email notifications | ⬜ Future | P3 |
| Multi-language support (i18n) | ⬜ Future | P3 |

---

## 11. Security Considerations

| Concern | Implementation |
|---|---|
| **Password storage** | bcryptjs hashing (SHA-256) before saving to MongoDB |
| **Session management** | JWT tokens with configurable expiry |
| **Environment isolation** | All secrets (MONGO_URI, JWT_SECRET) in `.env` file, never committed |
| **API access** | Currently open (no auth middleware) — auth middleware added in Sprint-2 |
| **XSS** | React's JSX auto-escapes. No `dangerouslySetInnerHTML` used |
| **CORS** | CORS middleware configured for dev mode. In production, same-origin serves frontend |
| **Input validation** | Mongoose schema validation + controller-level checks (e.g., non-empty items array) |

---

## 12. Performance Considerations

| Area | Strategy |
|---|---|
| **Frontend bundling** | Vite's production build code-splits and minifies assets |
| **API payload size** | Search and category filtering done server-side — reduces data sent to client |
| **Image loading** | Unsplash URLs with `w=800` thumbnails in catalogue, `w=1200` for carousel |
| **React rendering** | `useMemo` for derived data (grouped products). State is localized to pages |
| **CSS** | Single `App.css` file (can be scoped or modularized as project grows) |
| **Dev experience** | Vite HMR provides instant hot-reload on changes |

---

## 13. Key Architectural Decisions (ADRs)

| ADR # | Decision | Rationale |
|---|---|---|
| **ADR-1** | Guest-first architecture — no mandatory auth for cart/checkout | Removes #1 e-commerce friction. Users can experience value before committing data |
| **ADR-2** | Denormalized data in Cart/Order models (product title, price, image copied) | Ensures order/cart snapshots remain accurate even if product changes later. Avoids complex joins |
| **ADR-3** | Fallback data at both backend AND frontend layers | Backend fallback handles DB outages. Frontend fallback handles network errors. Defence in depth |
| **ADR-4** | Modular monolith (not microservices) | Team size = 1–3. Microservices would add complexity without proportional benefit at this stage |
| **ADR-5** | Routes at root level, models in server/ folder | Keeps Express routes accessible. Controllers import models from server/ — avoids circular dependency confusion |
| **ADR-6** | Vite proxy for dev instead of CORS configuration | Simpler dev setup. Same origin in production eliminates CORS entirely |

---

## 14. References

- **Template:** `3. Project Design Phase/Solution Architecture/Solution Architecture.docx`
- **Methodology:** https://c4model.com/ — Architecture visualization methodology
- https://expressjs.com/ — Backend framework
- https://react.dev/ — Frontend framework
- https://www.mongodb.com/atlas — Database service
- https://vite.dev/ — Build tool and dev server
- https://mongoosejs.com/ — MongoDB ODM
