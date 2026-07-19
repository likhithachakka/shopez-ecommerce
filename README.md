# ShopEZ 🛍️

A full-stack e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js). ShopEZ provides a streamlined shopping experience with product browsing, cart management, checkout, and order tracking.

## ✨ Features

- **Product Catalog** — Browse products with search, category filters, and price range filtering
- **Cart Management** — Add, update quantities, and remove items from your cart
- **Checkout Flow** — Enter shipping details, select payment method, and place orders
- **Order History** — View all past orders with item details and order status
- **Admin Dashboard** — View all products with quick access to key info
- **Guest Sessions** — No sign-up required; browse and order as a guest
- **Fallback Data** — Works with sample products even without a database connection

## 🧰 Tech Stack

| Layer        | Technology                                          |
| ------------ | --------------------------------------------------- |
| **Frontend** | React 19, Vite, React Router 7, Lucide React        |
| **Backend**  | Node.js, Express 5, bcryptjs, jsonwebtoken, dotenv  |
| **Database** | MongoDB with Mongoose ODM                           |
| **Proxy**    | Vite dev server proxies `/api` calls to Express     |
| **Deploy**   | Heroku-ready (via Procfile)                         |

## 📁 Project Structure

```
shopez/
├── client/                  # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx          # Navigation bar
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Landing page
│   │   │   ├── Products.jsx        # Product catalog with filters
│   │   │   ├── Cart.jsx            # Shopping cart
│   │   │   ├── Checkout.jsx        # Shipping & order placement
│   │   │   ├── Orders.jsx          # Order history
│   │   │   ├── OrderDetails.jsx    # Single product details
│   │   │   ├── OrderConfirmation.jsx # Success page after order
│   │   │   └── Admin.jsx           # Admin product overview
│   │   ├── App.jsx                 # App root with routing
│   │   ├── App.css
│   │   └── main.jsx                # Vite entry point
│   ├── vite.config.js              # Vite config (API proxy)
│   └── package.json
│
├── server/                  # Express backend
│   ├── server.js            # Main app entry point
│   ├── config/
│   │   └── db.js            # MongoDB connection
│   ├── models/
│   │   ├── Product.js       # Product schema
│   │   ├── Order.js         # Order schema
│   │   ├── Cart.js          # Cart item schema
│   │   └── User.js          # User schema
│   └── data/
│       └── products.js      # Seed product data
│
├── routes/                  # API route definitions
│   ├── productRoutes.js     # /api/products
│   ├── orderRoutes.js       # /api/orders
│   └── cartRoutes.js        # /api/cart
│
├── controllers/             # Route handler logic
│   ├── productController.js
│   ├── orderController.js
│   └── cartController.js
│
├── index.js                 # Root entry (delegates to server/server.js)
├── package.json             # Root package with start script
├── Procfile                 # Heroku deployment
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [MongoDB](https://www.mongodb.com/) — local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) (optional — the app works with fallback data without it)

### 1. Clone the Repository

```bash
git clone https://github.com/likhithachakka/shopez-ecommerce.git
cd shopez
```

### 2. Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 3. Configure Environment (Optional)

Create a `server/er.env` file with your MongoDB connection string:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/shopez?retryWrites=true&w=majority
PORT=5000
```

> **Note:** If you skip this step, or MongoDB is unreachable, the app will automatically fall back to sample product data. You can still browse products, add to cart, and place orders.

### 4. Start the Application

You need **two terminals** — one for the backend, one for the frontend.

#### Terminal 1 — Backend (Express API)

```bash
npm start
```

The API server starts at **http://localhost:5000**.

#### Terminal 2 — Frontend (Vite dev server)

```bash
cd client
npm run dev
```

The frontend starts at **http://localhost:5173**.  
All `/api/*` requests from the browser are automatically proxied to the backend by Vite.

Open **http://localhost:5173** in your browser to see the app.

### 5. Build for Production

```bash
cd client
npm run build
```

This produces an optimized static build in `client/dist/` which can be served by the Express server or deployed to any static hosting.

## 🔌 API Endpoints

### Products

| Method | Endpoint             | Description                      |
| ------ | -------------------- | -------------------------------- |
| GET    | `/api/products`      | List products (with filters)     |
| GET    | `/api/products/:id`  | Get a single product by ID       |
| POST   | `/api/products`      | Create a new product             |
| PUT    | `/api/products/:id`  | Update a product                 |
| DELETE | `/api/products/:id`  | Delete a product                 |

**Query parameters for `GET /api/products`:**
- `search` — Search by title, description, or category
- `category` — Filter by category name
- `minPrice` / `maxPrice` — Price range filter
- `discount` — Minimum discount percentage

### Cart

| Method | Endpoint                | Description             |
| ------ | ----------------------- | ----------------------- |
| GET    | `/api/cart?userId=guest` | Get cart items          |
| POST   | `/api/cart`             | Add item to cart        |
| PUT    | `/api/cart/:id`         | Update item quantity    |
| DELETE | `/api/cart/:id`         | Remove item from cart   |
| DELETE | `/api/cart/clear?userId=guest` | Clear entire cart |

### Orders

| Method | Endpoint                      | Description      |
| ------ | ----------------------------- | ---------------- |
| GET    | `/api/orders?userId=guest`    | List orders      |
| POST   | `/api/orders`                 | Place a new order |

### Health Check

| Method | Endpoint | Response                          |
| ------ | -------- | --------------------------------- |
| GET    | `/`      | `"ShopEZ బ్యాకెండ్ సర్వర్ రన్ అవుతోంది..."` (server running confirmation) |

## 🧪 Running Without MongoDB

The app is designed to work even without a running database. If MongoDB is unavailable:
- **Product listing** falls back to 3 sample products (Trendy Sneakers, Classic Leather Watch, Wireless Headphones)
- **Cart and orders** require MongoDB — they will error without a connection
- To test the full flow, provide a valid `MONGO_URI` in `server/er.env`

## 🌐 Deployment

### Deploy to Heroku

```bash
# Create a Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set MONGO_URI=your_mongodb_connection_string

# Deploy
git push heroku main
```

The `Procfile` at the project root tells Heroku to run `node index.js`.

### Other Hosting

- **Backend:** Deploy `index.js` + `server/` + `routes/` + `controllers/` to any Node.js host (Render, Railway, Fly.io, etc.)
- **Frontend:** Build with `cd client && npm run build`, then serve `client/dist/` from any static host (Vercel, Netlify, Cloudflare Pages)

## 📄 Pages Overview

| Route              | Page                 | Description                            |
| ------------------ | -------------------- | -------------------------------------- |
| `/`                | Home                 | Landing page with hero and features    |
| `/products`        | Products             | Browse with search & category filters  |
| `/product/:id`     | Order Details        | Single product details (placeholder)   |
| `/cart`            | Cart                 | Review and modify cart items           |
| `/checkout`        | Checkout             | Shipping info + place order            |
| `/orders`          | Orders               | Order history                          |
| `/order-success`   | Order Confirmation   | Success page after order placement     |
| `/admin`           | Admin Dashboard      | Product overview for admins            |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📃 License

This project is licensed under the ISC License.

---

Built with ❤️ by the ShopEZ team.
