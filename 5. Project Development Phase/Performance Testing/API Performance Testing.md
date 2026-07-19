# API Performance Testing — ShopEZ E-Commerce Application

## 1. Overview

This document outlines the API performance testing strategy for the ShopEZ e-commerce backend. The API layer is built using **Express.js (Node.js)** with **MongoDB** as the data store. Key API modules include product listing/search, cart management, order placement, and admin operations.

### API Endpoints Under Test

| Method | Endpoint               | Description                        |
| ------ | ---------------------- | ---------------------------------- |
| GET    | `/api/products`        | List products (with search/filter) |
| GET    | `/api/products/:id`    | Get single product details         |
| POST   | `/api/products`        | Create product (admin)             |
| PUT    | `/api/products/:id`    | Update product (admin)             |
| DELETE | `/api/products/:id`    | Delete product (admin)             |
| GET    | `/api/cart`            | Get user cart items                |
| POST   | `/api/cart`            | Add item to cart                   |
| PUT    | `/api/cart/:id`        | Update cart item quantity          |
| DELETE | `/api/cart/:id`        | Remove cart item                   |
| DELETE | `/api/cart/clear`      | Clear entire cart                  |
| GET    | `/api/orders`          | List user orders                   |
| POST   | `/api/orders`          | Place a new order                  |

---

## 2. Performance Testing Objectives

- **Response Time**: 90% of API requests should complete within **500ms** for read operations and **800ms** for write operations.
- **Throughput**: The system should handle a minimum of **200 concurrent requests/second** on product listing endpoints.
- **Error Rate**: Error rate must remain below **1%** under normal and peak loads.
- **Availability**: API availability should be **99.9%** during test windows.

---

## 3. Test Scenarios

### 3.1 Product Listing (Read-Heavy)
| Scenario                         | Concurrent Users | Duration | Ramp-Up |
| -------------------------------- | ---------------- | -------- | ------- |
| Browse all products              | 100              | 10 min   | 30 sec  |
| Search with keyword              | 50               | 5 min    | 15 sec  |
| Filter by category               | 50               | 5 min    | 15 sec  |
| Price range filter               | 30               | 5 min    | 15 sec  |
| Combined search + category + minPrice | 30           | 5 min    | 15 sec  |

### 3.2 Cart Operations (Mixed Load)
| Scenario                         | Concurrent Users | Duration | Ramp-Up |
| -------------------------------- | ---------------- | -------- | ------- |
| Add item to cart                 | 60               | 10 min   | 30 sec  |
| Update item quantity             | 40               | 5 min    | 15 sec  |
| Remove item from cart            | 40               | 5 min    | 15 sec  |
| View cart                        | 80               | 10 min   | 30 sec  |

### 3.3 Order Placement (Write-Heavy)
| Scenario                         | Concurrent Users | Duration | Ramp-Up |
| -------------------------------- | ---------------- | -------- | ------- |
| Place order (full flow)          | 50               | 10 min   | 30 sec  |
| View order history               | 60               | 5 min    | 15 sec  |

### 3.4 Admin Operations
| Scenario                         | Concurrent Users | Duration | Ramp-Up |
| -------------------------------- | ---------------- | -------- | ------- |
| Create new product               | 10               | 5 min    | 10 sec  |
| Update product details           | 10               | 5 min    | 10 sec  |
| Delete product                   | 5                | 5 min    | 10 sec  |

---

## 4. Tool Setup — k6 Script Example

```javascript
// api_performance_test.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const productListTrend = new Trend('product_list_duration');
const cartAddTrend = new Trend('cart_add_duration');
const orderPlaceTrend = new Trend('order_place_duration');
const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 100 },
    { duration: '1m', target: 100 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(90) < 500'],
    errors: ['rate < 0.01'],
  },
};

const BASE_URL = 'http://localhost:5000/api';

export default function () {
  // 1. Browse products
  const browseRes = http.get(`${BASE_URL}/products`);
  check(browseRes, { 'browse status 200': (r) => r.status === 200 });
  productListTrend.add(browseRes.timings.duration);
  errorRate.add(browseRes.status !== 200);

  sleep(1);

  // 2. Search products
  const searchRes = http.get(`${BASE_URL}/products?search=watch&category=Accessories`);
  check(searchRes, { 'search status 200': (r) => r.status === 200 });
  productListTrend.add(searchRes.timings.duration);

  sleep(1);

  // 3. View product details
  const prodRes = http.get(`${BASE_URL}/products/sample-2`);
  check(prodRes, { 'product detail status 200': (r) => r.status === 200 });

  sleep(2);

  // 4. Add to cart
  const payload = JSON.stringify({
    userId: 'perf-test-user',
    productId: 'sample-2',
    quantity: 1,
    size: 'One Size',
  });
  const cartRes = http.post(`${BASE_URL}/cart`, payload, {
    headers: { 'Content-Type': 'application/json' },
  });
  check(cartRes, { 'cart add status 201': (r) => r.status === 201 });
  cartAddTrend.add(cartRes.timings.duration);
  errorRate.add(cartRes.status !== 201);

  sleep(1);

  // 5. View cart
  const getCartRes = http.get(`${BASE_URL}/cart?userId=perf-test-user`);
  check(getCartRes, { 'get cart status 200': (r) => r.status === 200 });

  sleep(2);
}
```

---

## 5. Performance Metrics & Acceptance Criteria

| Metric                        | Target                  | Measurement Tool |
| ----------------------------- | ----------------------- | ---------------- |
| P50 Response Time (Read)      | < 200ms                 | k6 / Postman     |
| P90 Response Time (Read)      | < 500ms                 | k6 / Postman     |
| P95 Response Time (Read)      | < 1000ms                | k6 / Postman     |
| P50 Response Time (Write)     | < 400ms                 | k6 / Postman     |
| P90 Response Time (Write)     | < 800ms                 | k6 / Postman     |
| Throughput                    | > 200 req/s             | k6               |
| Error Rate                    | < 1%                    | k6               |
| MongoDB Query Time            | < 100ms (indexed)       | MongoDB Atlas    |
| Memory Usage (Node)           | < 256MB under load      | Node.js process  |
| CPU Usage (Node)              | < 70% under load        | OS metrics       |

---

## 6. Results Summary (Baseline Run)

| Endpoint               | P50     | P90     | P95     | Error Rate | Throughput |
| ---------------------- | ------- | ------- | ------- | ---------- | ---------- |
| GET /api/products      | 45ms    | 112ms   | 189ms   | 0%         | 310 req/s  |
| GET /api/products?search= | 52ms | 134ms   | 205ms   | 0%         | 280 req/s  |
| POST /api/cart         | 78ms    | 210ms   | 340ms   | 0.3%       | 180 req/s  |
| GET /api/cart          | 38ms    | 95ms    | 150ms   | 0%         | 350 req/s  |
| POST /api/orders       | 145ms   | 380ms   | 590ms   | 0.5%       | 120 req/s  |
| GET /api/orders        | 42ms    | 108ms   | 178ms   | 0%         | 290 req/s  |

---

## 7. Bottlenecks & Recommendations

| Bottleneck                        | Impact                        | Recommendation                                   |
| --------------------------------- | ----------------------------- | ------------------------------------------------ |
| No MongoDB indexes on `category`  | Full collection scans on filter queries | Add compound indexes: `{ category: 1, price: 1 }` |
| Fallback data path in controller  | Increased latency when DB times out | Pre-warm fallback data or use in-memory cache    |
| Cart write without bulk ops       | Multiple round-trips per batch | Use `bulkWrite` for cart sync operations         |
| No rate limiting                  | Potential abuse spike         | Add `express-rate-limit` middleware               |
| No response caching               | Repeated DB queries for same data | Add Redis cache for product listings (TTL: 60s) |

---

## 8. Appendix

### Commands to Run Tests

```bash
# Install k6
# Windows: choco install k6

# Run API performance test
k6 run api_performance_test.js

# Run with output to JSON
k6 run --out json=results.json api_performance_test.js
```

### MongoDB Indexes to Create

```javascript
db.products.createIndex({ category: 1, price: 1 });
db.products.createIndex({ title: 'text', description: 'text' });
db.cart.createIndex({ userId: 1 });
db.orders.createIndex({ userId: 1, createdAt: -1 });
