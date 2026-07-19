# Technology Stack (Architecture & Stack)

| Field | Value |
|---|---|
| **Date** | January 2025 |
| **Team ID** | ShopEZ Team |
| **Project Name** | ShopEZ — Curated E-Commerce Platform |
| **Maximum Marks** | 4 Marks |

---

## Technical Architecture

The diagram below shows the system architecture — a modular monolith with a React frontend, Express API backend, and MongoDB database with a graceful fallback mechanism.

```
┌──────────────────────────────────────────────────────────────────┐
│                         BROWSER (Client)                         │
│                                                                  │
│           React 19 SPA (Vite 8 dev server :5173)                │
│                                                                  │
│   ┌──────────┐  ┌──────────┐  ┌─────────┐  ┌───────────────┐   │
│   │   Home   │  │ Products │  │  Cart   │  │ Checkout      │   │
│   │   Page   │  │ Catalogue│  │ Manager │  │ + Orders      │   │
│   └──────────┘  └──────────┘  └─────────┘  └───────────────┘   │
│                                                                  │
│          Vite Proxy: /api/* → http://localhost:5000              │
└──────────────────────────┬───────────────────────────────────────┘
                           │ HTTP / JSON
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                     EXPRESS.JS BACKEND (Port 5000)               │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                     ROUTES LAYER                         │   │
│  │  /api/products   /api/cart   /api/orders                │   │
│  └────────────────────────┬─────────────────────────────────┘   │
│                           │                                      │
│  ┌────────────────────────▼─────────────────────────────────┐   │
│  │                  CONTROLLERS LAYER                       │   │
│  │  productController     cartController    orderController │   │
│  │  • List with filters   • Get cart items  • Create order  │   │
│  │  • Get by ID           • Add to cart     • List orders   │   │
│  │  • Create/Update/Delete • Update qty      • Clear cart   │   │
│  │                         • Remove item      after order   │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │  FALLBACK LAYER: When MongoDB is unreachable,     │  │   │
│  │  │  controllers return sample data from              │  │   │
│  │  │  server/data/products.js instead of erroring      │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  └────────────────────────┬─────────────────────────────────┘   │
│                           │                                      │
│  ┌────────────────────────▼─────────────────────────────────┐   │
│  │                    MODELS LAYER                          │   │
│  │  Product (Mongoose)  Cart (Mongoose)  Order (Mongoose)   │   │
│  │  User (Mongoose)     + Sample Products (in-memory)       │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└──────────────────────────┬───────────────────────────────────────┘
                           │
                           ▼
              ┌─────────────────────────────────────┐
              │          MONGODB ATLAS              │
              │                                     │
              │  Collections:                       │
              │  • products   • carts  • orders     │
              │  • users                            │
              │                                     │
              │  OPTIONAL — App works without it    │
              │  via fallback sample data           │
              └─────────────────────────────────────┘
```

---

### Table 1 — Components & Technologies

| S.No | Component | Description | Technology |
|---|---|---|---|
| 1 | **User Interface** | Single-page web application for browsing products, managing cart, checkout, and viewing orders | React 19, React Router 7, Vite 8, HTML5, CSS3 |
| 2 | **Backend API Server** | RESTful API handling all business logic — products, cart, orders, and user management | Express 5, Node.js (JavaScript) |
| 3 | **Primary Database** | Document-oriented NoSQL database for persistent storage of products, carts, orders, and users | MongoDB + Mongoose 9 ODM |
| 4 | **Fallback Data Store** | In-memory sample product data used when MongoDB is unreachable — ensures the app never shows an empty state | Static JavaScript module (`server/data/products.js`) |
| 5 | **Authentication** | Password hashing and JWT-based token authentication for user login/session management | bcryptjs, jsonwebtoken |
| 6 | **Environment Configuration** | Manages environment variables (MongoDB URI, port, JWT secret) securely via .env file | dotenv |
| 7 | **Cross-Origin Resource Sharing** | Allows the frontend dev server (port 5173) to communicate with the backend API (port 5000) | cors (Express middleware) |
| 8 | **API Proxy (Development)** | Vite dev server automatically proxies /api requests to the Express backend, avoiding CORS issues during development | Vite server.proxy config |
| 9 | **Infrastructure / Server** | Application deployment on cloud platforms or local system. Single-command startup | Node.js runtime, Heroku-ready (Procfile) |

---

### Table 2 — Application Characteristics

| S.No | Characteristic | Description | Implementation |
|---|---|---|---|
| 1 | **Open-Source Frameworks** | Entirely built with popular open-source frameworks and libraries | React, Express, MongoDB, Mongoose, Vite, bcryptjs, jsonwebtoken, cors, dotenv |
| 2 | **Security Implementations** | Passwords hashed before storage. JWT tokens for authenticated sessions. Sensitive config isolated in environment variables | bcryptjs (SHA-256 hashing), jsonwebtoken (JWT RS256), dotenv |
| 3 | **Resilient / Fault-Tolerant Architecture** | Graceful degradation when database is offline. Controllers catch errors and return sample data instead of 500 errors | try/catch in every controller → fallback to `sampleProducts.filter()` |
| 4 | **Modular Architecture** | Clean 3-tier separation: Routes (routing) → Controllers (business logic) → Models (data layer). Frontend pages organized by feature | Express Router + Controller pattern. Single-responsibility React components |
| 5 | **Availability** | Single-server deployment with zero-config startup. No external service dependencies for basic functionality | `node index.js` starts the server. Procfile for Heroku. Works with or without MongoDB |
| 6 | **Performance** | Fast development iteration with Vite HMR. Production builds optimized via Vite bundling. Server-side search reduces data transfer | Vite dev/build, server-side search filtering |
| 7 | **Portability** | Single entry point, cross-platform compatible, minimal configuration needed | `node index.js` → loads `server/server.js` → Express listens on PORT |

---

### References

- https://c4model.com/
- https://expressjs.com/
- https://react.dev/
- https://www.mongodb.com/atlas
- https://vite.dev/
- https://mongoosejs.com/
