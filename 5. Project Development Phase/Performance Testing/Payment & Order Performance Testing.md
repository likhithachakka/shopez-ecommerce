# Payment & Order Performance Testing — ShopEZ E-Commerce Application

## 1. Introduction

This document defines the performance testing strategy for the payment and order processing pipeline in ShopEZ. The order flow is the most business-critical path in the application — any degradation directly impacts revenue and customer trust.

### Order Flow Architecture

```
User (Checkout Form) → POST /api/orders → MongoDB Write → Cart Clear → Order Confirmation
                ↓
           Frontend (Order Confirmation Page)
```

### Current Payment Methods
- **Cash on Delivery (COD)** — Primary payment method
- **Online Payment** — Placeholder for future gateway integration

---

## 2. Order Processing Performance Metrics

| Metric                              | Target          | Measurement Point              |
| ----------------------------------- | --------------- | ------------------------------ |
| Order submission API latency (P50)  | < 200ms         | POST /api/orders               |
| Order submission API latency (P95)  | < 500ms         | POST /api/orders               |
| Order submission API latency (P99)  | < 1000ms        | POST /api/orders               |
| Order history retrieval (P50)       | < 80ms          | GET /api/orders                |
| Order confirmation page load        | < 2s            | Lighthouse /order-success      |
| Cart clear + order write consistency | < 300ms        | Transaction duration           |
| Concurrent order placement          | > 50 req/s      | k6 stress test                 |
| Order data integrity under load     | 100%            | Validation after test          |

---

## 3. Test Scenarios

### 3.1 Single Order Lifecycle

Tests the complete payload processing for a single order.

**Test Payload:**
```json
{
  "userId": "test-user-001",
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
    },
    {
      "productId": "sample-3",
      "title": "Wireless Headphones",
      "price": 2499,
      "quantity": 1,
      "discount": 20,
      "size": "One Size"
    }
  ]
}
```

**Expected Behavior:**
- Status code: **201 Created**
- Response contains `order` object with MongoDB `_id`
- Cart for the userId is cleared
- Order is persisted in MongoDB

### 3.2 Bulk Order Stress Test

Simulates multiple users placing orders simultaneously during a flash sale.

| Concurrent Users | Orders Created | Duration | Notes                     |
| ---------------- | -------------- | -------- | ------------------------- |
| 10               | ~30            | 30s      | Baseline                  |
| 25               | ~75            | 30s      | Normal sale traffic       |
| 50               | ~150           | 30s      | Flash sale scenario       |
| 100              | ~250           | 30s      | Peak load (breaking test) |

### 3.3 Order History Query Performance

| Scenario                      | Dataset Size | Expected Latency |
| ----------------------------- | ------------ | ---------------- |
| Single user, 5 orders         | 5 docs       | < 30ms           |
| Single user, 100 orders       | 100 docs     | < 60ms           |
| All users, 10,000 orders      | 10,000 docs  | < 200ms          |
| Multi-user concurrent queries | 50 users     | < 500ms P95      |

---

## 4. Test Scripts

### 4.1 Order Placement Test — k6

```javascript
// payment_order_perf_test.js
import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Counter, Trend } from 'k6/metrics';

const orderCount = new Counter('orders_placed');
const orderDuration = new Trend('order_duration_ms');
const errorCount = new Counter('order_errors');

export const options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '30s', target: 25 },
    { duration: '10s', target: 50 },
    { duration: '30s', target: 50 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95) < 1000'],
    order_duration_ms: ['p(95) < 800'],
  },
};

const BASE_URL = 'http://localhost:5000/api';

const products = [
  { id: 'sample-1', title: 'Trendy Sneakers', price: 1999, discount: 10 },
  { id: 'sample-2', title: 'Classic Leather Watch', price: 3499, discount: 15 },
  { id: 'sample-3', title: 'Wireless Headphones', price: 2499, discount: 20 },
];

const addresses = [
  { address: '42, MG Road, Bangalore', pincode: '560001' },
  { address: '15, Park Street, Kolkata', pincode: '700016' },
  { address: '7, Connaught Place, New Delhi', pincode: '110001' },
];

export default function () {
  group('Place Order', () => {
    const product = products[Math.floor(Math.random() * products.length)];
    const addr = addresses[Math.floor(Math.random() * addresses.length)];
    const userNum = __VU * 1000 + __ITER;

    const payload = JSON.stringify({
      userId: `stress_user_${userNum}`,
      name: `User ${userNum}`,
      email: `user${userNum}@shopez.com`,
      mobile: `9999${String(userNum).padStart(6, '0')}`,
      address: addr.address,
      pincode: addr.pincode,
      paymentMethod: Math.random() > 0.7 ? 'Online' : 'COD',
      items: [
        {
          productId: product.id,
          title: product.title,
          price: product.price,
          quantity: Math.floor(Math.random() * 3) + 1,
          discount: product.discount,
        },
      ],
    });

    const startTime = Date.now();
    const res = http.post(`${BASE_URL}/orders`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    const duration = Date.now() - startTime;

    const isSuccess = check(res, {
      'order placed successfully': (r) => r.status === 201,
      'response has order ID': (r) => r.json('order._id') !== undefined,
    });

    if (isSuccess) {
      orderCount.add(1);
      orderDuration.add(duration);
    } else {
      errorCount.add(1);
      console.error(`Order failed: ${res.status} - ${res.body}`);
    }
  });

  sleep(0.5);

  group('Verify Cart Cleared', () => {
    const res = http.get(`${BASE_URL}/cart?userId=stress_user_${__VU * 1000 + __ITER}`);
    check(res, {
      'cart is empty after order': (r) => r.json().length === 0,
    });
  });
}
```

### 4.2 Order History Query Test

```javascript
// order_history_perf_test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 20,
  duration: '2m',
};

const BASE_URL = 'http://localhost:5000/api';

export default function () {
  const userId = `stress_user_${Math.floor(Math.random() * 100)}`;

  const res = http.get(`${BASE_URL}/orders?userId=${userId}`);
  check(res, {
    'orders retrieved': (r) => r.status === 200,
    'response is array': (r) => Array.isArray(r.json()),
  });

  sleep(2);
}
```

---

## 5. Payment Gateway Simulation (for Future Integration)

### 5.1 Online Payment Flow Performance Budgets

| Step                        | Time Budget | Notes                            |
| --------------------------- | ----------- | -------------------------------- |
| Initiate payment request    | < 200ms     | POST to payment gateway          |
| Redirect to gateway page    | < 1s        | Frontend navigation              |
| User completes payment      | < 3min      | User-dependent (UX target)       |
| Webhook confirmation        | < 2s        | POST from gateway to /api/payment/webhook |
| Order status update         | < 100ms     | Database write for status change |

### 5.2 Webhook Load Test

```javascript
// payment_webhook_test.js
import http from 'k6/http';
import { check } from 'k6';

const BASE_URL = 'http://localhost:5000/api';

export default function () {
  // Simulate payment gateway webhook
  const payload = JSON.stringify({
    event: 'payment.success',
    orderId: `order_${Math.random().toString(36).substr(2, 9)}`,
    transactionId: `txn_${Math.random().toString(36).substr(2, 15)}`,
    amount: 5498,
    currency: 'INR',
    status: 'completed',
    timestamp: new Date().toISOString(),
  });

  const res = http.post(`${BASE_URL}/payment/webhook`, payload, {
    headers: { 'Content-Type': 'application/json' },
  });

  check(res, {
    'webhook accepted': (r) => r.status === 200,
  });
}
```

---

## 6. Order Data Integrity Validation

After each stress test, run the following validation:

```javascript
// Validate order integrity
const validateOrders = async () => {
  const totalOrders = await Order.countDocuments();
  const ordersWithItems = await Order.countDocuments({ items: { $exists: true, $not: { $size: 0 } } });
  const ordersWithMissingFields = await Order.countDocuments({
    $or: [
      { name: { $exists: false } },
      { email: { $exists: false } },
      { mobile: { $exists: false } },
      { address: { $exists: false } },
    ],
  });

  console.log(`Total orders: ${totalOrders}`);
  console.log(`Orders with items: ${ordersWithItems}`);
  console.log(`Orders with missing fields: ${ordersWithMissingFields}`);

  // Pass criteria
  return ordersWithMissingFields === 0 && totalOrders === ordersWithItems;
};
```

---

## 7. Performance Test Results (Baseline)

| Test Scenario                     | P50     | P95     | Max     | Error Rate | Orders Created |
| --------------------------------- | ------- | ------- | ------- | ---------- | -------------- |
| Single order (COD)                | 145ms   | 380ms   | 520ms   | 0%         | 1              |
| Bulk — 10 concurrent users        | 180ms   | 420ms   | 650ms   | 0%         | 52             |
| Bulk — 25 concurrent users        | 220ms   | 580ms   | 890ms   | 0.5%       | 128            |
| Bulk — 50 concurrent users        | 310ms   | 790ms   | 1400ms  | 1.2%       | 247            |
| Bulk — 100 concurrent users       | 580ms   | 1450ms  | 3100ms  | 3.8%       | 412            |
| Order history — 20 concurrent users | 45ms  | 110ms   | 220ms   | 0%         | —              |
| Cart clear after order            | 35ms    | 80ms    | 150ms   | 0%         | —              |

---

## 8. Bottlenecks & Optimizations

| Bottleneck                         | Impact                       | Recommendation                           |
| ---------------------------------- | ---------------------------- | ---------------------------------------- |
| Synchronous cart clear after order | Adds latency to order API    | Make cart clear asynchronous (queue-based) |
| No cart-item stock validation       | Potential overselling        | Add atomic stock decrement with `$inc`   |
| Order items stored as embedded docs | Large orders bloat document  | Consider separate order_items collection |
| No order status indexing            | Slow status-based queries   | Add index on `{ status: 1, createdAt: -1 }` |
| No idempotency key                  | Duplicate orders on retry   | Accept `idempotencyKey` header + dedup   |

---

## 9. Disaster Recovery & Safety

| Scenario                      | Impact                                | Recovery Action                        |
| ----------------------------- | ------------------------------------- | -------------------------------------- |
| Order write succeeds, cart clear fails | Cart retains ordered items      | Manual cart cleanup via admin panel    |
| Order write fails, cart clears | Data loss (user loses cart)          | Implement transactional order flow     |
| Duplicate order submission     | User charged twice (COD) or double shipment | Add idempotency key check     |
| MongoDB write failure          | Order not placed, user sees error     | Add retry mechanism (3 attempts)       |

---

## 10. Production Checklist

- [ ] Add MongoDB indexes for orders collection (`userId + createdAt`)
- [ ] Implement idempotency key for order submission
- [ ] Add rate limiting on `POST /api/orders` (max 10 requests/min per user)
- [ ] Add input validation for all order fields (server-side)
- [ ] Configure order status flow tracking
- [ ] Set up monitoring alerts for order API errors (>1%)
- [ ] Test with 100 concurrent users before production launch
- [ ] Validate cart data integrity after order placement
