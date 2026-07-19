# Load & Stress Testing — ShopEZ E-Commerce Application

## 1. Introduction

This document defines the load and stress testing strategy for the ShopEZ application. Load testing validates system behavior under expected traffic patterns, while stress testing pushes the system beyond normal capacity to identify breaking points and recovery behavior.

### System Architecture Under Test

```
Browser/Vite Dev Server → Express.js API Server → MongoDB Atlas
```

**Deployment Spec:**
- Node.js runtime on Heroku (free tier) or local development server
- MongoDB Atlas M0 (free shared cluster)
- React.js client served via Vite

---

## 2. Load Testing Scenarios

### 2.1 Normal Load (Typical Shopping Session)

Simulates a typical user journey through the ShopEZ application.

**User Flow:**
1. Visit Home Page → 2. Browse Products → 3. Search for item → 4. View Product Details → 5. Add to Cart → 6. View Cart → 7. Checkout → 8. Place Order

| Phase         | Virtual Users | Duration | Description               |
| ------------- | ------------- | -------- | ------------------------- |
| Ramp-up       | 0 → 50        | 2 min    | Gradually increase load   |
| Steady State  | 50            | 10 min   | Sustained normal traffic  |
| Ramp-down     | 50 → 0        | 1 min    | Gradually decrease load   |

**Expected Metrics:**
| Metric            | Target                   |
| ----------------- | ------------------------ |
| Avg Response Time | < 500ms                  |
| P95 Response Time | < 1000ms                 |
| Throughput        | > 100 complete journeys/min |
| Error Rate        | < 1%                     |

### 2.2 Peak Load (Festive Season / Flash Sale)

Simulates high-traffic events such as Diwali sales or new product launches.

| Phase         | Virtual Users | Duration | Description               |
| ------------- | ------------- | -------- | ------------------------- |
| Ramp-up       | 0 → 200       | 3 min    | Rapid load increase       |
| Spike         | 200           | 5 min    | Peak traffic simulation   |
| Steady State  | 150           | 5 min    | Post-spike stabilization  |
| Ramp-down     | 150 → 0       | 1 min     | Gradual decrease          |

**Expected Metrics:**
| Metric            | Target                    |
| ----------------- | ------------------------- |
| Avg Response Time | < 1000ms                  |
| P95 Response Time | < 2000ms                  |
| Throughput        | > 300 complete journeys/min |
| Error Rate        | < 2%                      |

---

## 3. Stress Testing Scenarios

### 3.1 Breakpoint Test

Identifies the maximum load the system can handle before failure.

| Phase       | Virtual Users | Duration | Description                  |
| ----------- | ------------- | -------- | ---------------------------- |
| Step 1      | 0 → 50        | 30 sec   | Baseline load               |
| Step 2      | 50 → 100      | 30 sec   | Moderate load               |
| Step 3      | 100 → 200     | 30 sec   | Heavy load                  |
| Step 4      | 200 → 400     | 30 sec   | Very heavy load             |
| Step 5      | 400 → 800     | 30 sec   | Extreme load (breaking zone)|

**Expected Outcome:** Identify the user count at which:
- Response time exceeds 3000ms (P95)
- Error rate exceeds 5%
- Server CPU/Memory reaches 90%+

### 3.2 Soak Test (Endurance)

Validates system stability over an extended period.

- **Virtual Users**: 50
- **Duration**: 60 minutes
- **Metrics to Monitor**: Memory leak detection, response time degradation, database connection pool behavior

**Pass Criteria:**
- Response time does not degrade more than 20% from baseline
- No memory leak (memory usage stabilizes after initial warm-up)
- No connection pool exhaustion

### 3.3 Burst Test

Simulates sudden traffic spikes (e.g., a product going viral on social media).

| Phase        | Virtual Users | Duration | Description              |
| ------------ | ------------- | -------- | ------------------------ |
| Normal       | 20            | 2 min    | Regular traffic          |
| Burst        | 20 → 300      | 10 sec   | Sudden traffic spike     |
| Recovery     | 300 → 20      | 10 sec   | Return to normal         |
| Normal       | 20            | 2 min    | Post-burst stabilization |

---

## 4. k6 Load Test Script

```javascript
// load_stress_test.js
import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate, Trend } from 'k6/metrics';

const errorRate = new Rate('errors');
const cartTrend = new Trend('cart_duration');
const orderTrend = new Trend('order_duration');

export const options = {
  scenarios: {
    load_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '2m', target: 50 },
        { duration: '10m', target: 50 },
        { duration: '1m', target: 0 },
      ],
      gracefulRampDown: '30s',
    },
    stress_test: {
      executor: 'ramping-arrival-rate',
      startRate: 10,
      timeUnit: '1s',
      preAllocatedVUs: 50,
      maxVUs: 200,
      stages: [
        { duration: '1m', target: 20 },
        { duration: '1m', target: 50 },
        { duration: '1m', target: 100 },
        { duration: '1m', target: 200 },
        { duration: '1m', target: 400 },
        { duration: '30s', target: 0 },
      ],
    },
  },
  thresholds: {
    http_req_duration: ['p(95) < 2000'],
    errors: ['rate < 0.05'],
  },
};

const BASE = 'http://localhost:5000/api';

export default function () {
  group('Product Browsing', () => {
    // Browse all products
    let res = http.get(`${BASE}/products`);
    check(res, { 'products listed': (r) => r.status === 200 });
    sleep(Math.random() * 2 + 1);

    // Search
    res = http.get(`${BASE}/products?search=watch`);
    check(res, { 'search results': (r) => r.status === 200 });
    sleep(1);
  });

  group('Cart Operations', () => {
    // Add item
    const addPayload = JSON.stringify({
      userId: `user_${__VU}`,
      productId: 'sample-3',
      quantity: 1,
      size: 'One Size',
    });
    let res = http.post(`${BASE}/cart`, addPayload, {
      headers: { 'Content-Type': 'application/json' },
    });
    check(res, { 'item added to cart': (r) => r.status === 201 });
    cartTrend.add(res.timings.duration);
    sleep(1);

    // View cart
    res = http.get(`${BASE}/cart?userId=user_${__VU}`);
    check(res, { 'cart retrieved': (r) => r.status === 200 });
  });

  group('Order Flow', () => {
    const orderPayload = JSON.stringify({
      userId: `user_${__VU}`,
      name: 'Test User',
      email: 'test@shopez.com',
      mobile: '9999999999',
      address: '123 Test Street, Test City',
      pincode: '500001',
      paymentMethod: 'COD',
      items: [
        {
          productId: 'sample-3',
          title: 'Wireless Headphones',
          price: 2499,
          quantity: 1,
          discount: 20,
        },
      ],
    });
    let res = http.post(`${BASE}/orders`, orderPayload, {
      headers: { 'Content-Type': 'application/json' },
    });
    check(res, { 'order placed': (r) => r.status === 201 });
    orderTrend.add(res.timings.duration);
    errorRate.add(res.status !== 201);
  });
}
```

---

## 5. Expected Bottlenecks & Mitigation

| Bottleneck                     | When Triggered                 | Mitigation Strategy                          |
| ------------------------------ | ------------------------------ | -------------------------------------------- |
| MongoDB Atlas M0 connection limit (500 connections) | >300 concurrent users | Upgrade to M2+ cluster or implement connection pooling |
| Express.js single-threaded event loop | CPU-intensive queries | Offload to worker threads or cached responses |
| Heroku free tier sleep (dyno goes idle after 30 min) | After inactivity period | Use uptime monitoring (e.g., Kaffeine) or upgrade |
| Vite HMR memory usage (dev mode only) | Prolonged dev sessions | Run production build (`vite build`) for load tests |
| No Redis cache                  | Repeated identical product queries | Implement Redis caching layer for product listings |

---

## 6. Test Environment Configuration

```bash
# Environment for performance testing
PORT=5000
NODE_ENV=production
# Use a dedicated test MongoDB cluster
MONGO_URI=mongodb+srv://test-user:test-password@cluster-test.xxxxx.mongodb.net/shopez_test?retryWrites=true&w=majority
```

---

## 7. Reporting

Test results should be captured in the following format:

```json
{
  "testName": "peak_load_test_2026-07-19",
  "duration": "15 min",
  "maxUsers": 200,
  "avgResponseTime": 320,
  "p95ResponseTime": 890,
  "errorRate": 0.008,
  "throughput": 245,
  "bottlenecksIdentified": [
    {
      "issue": "High MongoDB response time under >150 concurrent writes",
      "severity": "Medium",
      "recommendation": "Add write-optimized indexes on orders collection"
    }
  ],
  "pass": true
}
```

---

## 8. Conclusion

The ShopEZ application is expected to handle **50 concurrent users comfortably** on the current free-tier infrastructure. For **production deployment**, the following upgrades are recommended:

1. **MongoDB**: Upgrade from M0 to M2+ cluster for production workloads
2. **Caching**: Implement Redis for product listing endpoint caching
3. **Horizontal Scaling**: Add multiple Node.js instances behind a load balancer
4. **Database Indexes**: Create compound indexes on frequently queried fields
