# Demonstration of Proposed Features — ShopEZ E-Commerce Platform

| Field | Value |
|---|---|
| **Project** | ShopEZ — Curated E-Commerce Platform |
| **Team ID** | ShopEZ Team |
| **Date** | July 2026 |

---

## 1. Demonstration Overview

This document outlines how each proposed feature of ShopEZ is demonstrated in the running application. All features can be verified by starting the application locally and navigating through the user interface.

### How to Run the Demo

```bash
# Terminal 1: Start backend
node index.js

# Terminal 2: Start frontend
cd client && npm run dev

# Open http://localhost:5173 in a browser
```

---

## 2. Feature Demonstrations

### Feature 1: Curated Product Catalogue

**Location:** Products page (`/products`)

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to `/products` | Products are displayed grouped by category (Footwear, Watches, Electronics, Accessories) |
| 2 | Observe each category section | Each section has a heading and an item count badge (e.g., "2 items") |
| 3 | Observe product cards | Each card shows: product image (220px), category label, stock status (In stock / Out of stock), title, description, ₹ price, discount badge (e.g., "10% off"), and "View details" button |

**API Verification:**
```bash
curl http://localhost:5000/api/products
# Returns JSON array of products grouped by query
```

---

### Feature 2: Search & Category Filter

**Location:** Products page (`/products`)

| Step | Action | Expected Result |
|---|---|---|
| 1 | Type "watch" in the search input | Products with "watch" in title, description, or category are shown in real-time |
| 2 | Select "Footwear" from the category dropdown | Only footwear products are displayed |
| 3 | Combined: search "sneakers" + category "Footwear" | Only products matching BOTH criteria are shown |
| 4 | Search a non-existent term (e.g., "zzzz") | Message: "No products match your search" |

**API Verification:**
```bash
curl "http://localhost:5000/api/products?search=watch&category=Accessories"
# Returns filtered results
```

---

### Feature 3: Guest Cart Management

**Location:** Cart page (`/cart`)

| Step | Action | Expected Result |
|---|---|---|
| 1 | Click "Cart" in navbar | Cart page loads (may be empty) |
| 2 | Go to Products, add items via "View details" or direct navigation | Items appear in cart with full details |
| 3 | Click "+" to increase quantity | Quantity number updates; subtotal recalculates |
| 4 | Click "-" to decrease quantity | Quantity decreases (minimum 1) |
| 5 | Click "Remove" on an item | Item is removed; cart total recalculates |
| 6 | Remove all items | "Your cart is empty." message displayed |
| 7 | Observe total at bottom | Grand total updates in real-time |

**API Verification:**
```bash
# Add item
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"userId":"guest","productId":"sample-1","size":"8","quantity":1}'

# Get cart
curl "http://localhost:5000/api/cart?userId=guest"

# Update quantity
curl -X PUT http://localhost:5000/api/cart/<id> \
  -H "Content-Type: application/json" \
  -d '{"quantity":3}'

# Remove item
curl -X DELETE http://localhost:5000/api/cart/<id>
```

---

### Feature 4: One-Page Checkout

**Location:** Checkout page (`/checkout`)

| Step | Action | Expected Result |
|---|---|---|
| 1 | Add items to cart, then click "Proceed to Checkout" | Two-column checkout page loads |
| 2 | Observe left column | Shipping form with fields: Name, Email, Mobile, Address, Pincode |
| 3 | Observe right column | Order summary showing each item with quantity and subtotal, plus grand total |
| 4 | Select payment method from dropdown | Options: Cash on Delivery, Online Payment |
| 5 | Fill form fields | Inputs accept text |

**API Verification:**
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "guest",
    "name": "Test User",
    "email": "test@example.com",
    "mobile": "9999999999",
    "address": "123 Test Street",
    "pincode": "500001",
    "paymentMethod": "COD",
    "items": [{"productId":"sample-1","title":"Sneakers","price":1999,"quantity":1,"discount":10}]
  }'
```

---

### Feature 5: Order Placement & Confirmation

**Location:** Checkout page → Order Confirmation (`/order-success`)

| Step | Action | Expected Result |
|---|---|---|
| 1 | Fill checkout form completely | All fields populated |
| 2 | Click "Place Order" | Button shows "Placing order..." loading state |
| 3 | Wait for response | Redirected to `/order-success` |
| 4 | Observe confirmation page | "Order Placed Successfully! 🎉" message displayed |
| 5 | Check cart | Cart is cleared (items no longer appear) |
| 6 | Check Orders page | New order appears in order history |

---

### Feature 6: Order History

**Location:** Orders page (`/orders`)

| Step | Action | Expected Result |
|---|---|---|
| 1 | Click "Orders" in navbar | Order history page loads |
| 2 | Observe each order card | Shows: date, customer name, email, delivery address, pincode |
| 3 | Expand/observe items section | Each item shows: title, quantity, price |
| 4 | Observe payment method | Badge shows "COD" or "Online" |
| 5 | Empty state | If no orders: "No orders found yet." message |

**API Verification:**
```bash
curl "http://localhost:5000/api/orders?userId=guest"
# Returns sorted array of orders with items, timestamps
```

---

### Feature 7: Admin Dashboard

**Location:** Admin page (`/admin`)

| Step | Action | Expected Result |
|---|---|---|
| 1 | Click "Admin" in navbar | Admin dashboard loads |
| 2 | Observe product list | Each product card shows: title (left), category (below title), price (right) |
| 3 | Check number of products | All products from database are listed |

---

### Feature 8: Discount Badges

**Location:** Products page (`/products`)

| Step | Action | Expected Result |
|---|---|---|
| 1 | Browse any product card | If product has a discount > 0%, a red badge shows "{n}% off" |
| 2 | Example: Trendy Sneakers | Shows "10% off" next to ₹1,999 price |
| 3 | Example: Wireless Headphones | Shows "20% off" next to ₹2,499 price |
| 4 | Products without discount | No badge shown |

---

### Feature 9: Resilient Fallback Data

**Location:** Products page (`/products`) — with server stopped

| Step | Action | Expected Result |
|---|---|---|
| 1 | Stop the backend server (Ctrl+C) | Server goes offline |
| 2 | Refresh Products page | Products still display from fallback data |
| 3 | Verify fallback products | 5 products shown: Sneakers, Leather Watch, Headphones, Fitness Watch, Leather Wallet |
| 4 | Try adding to cart | Alert or graceful message (cart requires DB) |
| 5 | Restart server | Normal functionality resumes |

**Code Reference (fallback mechanism):**
```javascript
// controllers/productController.js
try {
  const products = await Product.find(query);
  if (!products.length) {
    // Fallback to sample data
    return res.status(200).json(sampleProducts.filter(...));
  }
  res.status(200).json(products);
} catch (error) {
  // On DB error, return filtered sample data
  return res.status(200).json(sampleProducts.filter(...));
}
```

---

### Feature 10: Responsive Navigation

**Location:** All pages

| Step | Action | Expected Result |
|---|---|---|
| 1 | Click "Home" | Navigates to `/` |
| 2 | Click "Products" | Navigates to `/products` |
| 3 | Click "Cart" | Navigates to `/cart` |
| 4 | Click "Orders" | Navigates to `/orders` |
| 5 | Click "Admin" | Navigates to `/admin` |
| 6 | Click ShopEZ 🛍️ logo | Returns to Home page |

---

## 3. Complete User Flow Demo

```
Home Page (/)
    │
    ▼
Products Page (/products) — Browse, Search, Filter
    │
    ▼
Cart Page (/cart) — Add items, Update quantities, Remove
    │
    ▼
Checkout Page (/checkout) — Fill form, Select payment
    │
    ▼
Order Confirmation (/order-success) — Success message 🎉
    │
    ▼
Orders Page (/orders) — View order history
    │
    ▼
Admin Page (/admin) — Admin dashboard
```

---

## 4. API Endpoint Demonstration

```bash
# 1. List all products
curl http://localhost:5000/api/products
# → 200: Returns array of product objects

# 2. Search products
curl "http://localhost:5000/api/products?search=watch"
# → 200: Returns filtered products

# 3. Get single product
curl http://localhost:5000/api/products/sample-2
# → 200: Returns single product object

# 4. Add to cart
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"userId":"guest","productId":"sample-1","size":"8","quantity":2}'
# → 201: Returns cart item with MongoDB _id

# 5. View cart
curl "http://localhost:5000/api/cart?userId=guest"
# → 200: Returns array of cart items

# 6. Place order
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId":"guest","name":"Ravi","email":"r@x.com",
    "mobile":"9876543210","address":"MG Road","pincode":"560038",
    "paymentMethod":"COD",
    "items":[{"productId":"sample-1","title":"Sneakers","price":1999,"quantity":2}]
  }'
# → 201: Order placed, cart cleared

# 7. View orders
curl "http://localhost:5000/api/orders?userId=guest"
# → 200: Returns order history
```

---

## 5. Performance Demonstration

```bash
# API Performance Test (requires k6)
k6 run --vus 50 --duration 30s \
  -e BASE_URL=http://localhost:5000/api \
  - <<EOF
import http from 'k6/http';
export default function() {
  http.get(`${__ENV.BASE_URL}/products`);
}
EOF
# Expected: P90 < 150ms, 0% errors, > 280 req/s
```

---

## 6. Fallback/Resilience Demonstration

| Test | Procedure | Expected Behaviour |
|---|---|---|
| **No MongoDB** | Remove MONGO_URI from env, restart server | Server starts with warning. Products page shows fallback data. |
| **Server Restart** | Stop and restart `node index.js` | Products auto-seeded if DB is empty. No data loss for orders/cart. |
| **Network Error** | Disconnect internet while browsing | Frontend catches fetch errors, uses inline fallback products. |
