# Team Involvement in Demonstration — ShopEZ E-Commerce Platform

| Field | Value |
|---|---|
| **Project** | ShopEZ — Curated E-Commerce Platform |
| **Team ID** | ShopEZ Team |
| **Date** | July 2026 |

---

## 1. Team Roles in Project Demonstration

The ShopEZ project demonstration involves all team members showcasing their specific contributions. Each role is responsible for demonstrating a subset of features aligned with their work.

| Team Member | Role | Demonstration Focus |
|---|---|---|
| **Team Lead** | Product Owner | Project vision, problem statement, business value, roadmap |
| **Design Lead** | UX Designer | UI/UX flow, customer journey, page designs, usability |
| **Dev Lead** | Full-Stack Developer | Application architecture, code walkthrough, API endpoints, database |
| **QA Lead** | QA / Tester | Test results, UAT coverage, performance benchmarks, fallback resilience |

---

## 2. Demonstration Flow & Responsibilities

### Segment 1: Project Introduction (Product Owner) — 3 min

| Time | Topic | Speaker | Key Points |
|---|---|---|---|
| 0:00–1:00 | Problem Statement | Product Owner | "Online shoppers overwhelmed by cluttered platforms — decision fatigue, hidden costs, forced account creation" |
| 1:00–2:00 | Solution Overview | Product Owner | "ShopEZ: curated catalogue, guest-first checkout, transparent pricing, resilient architecture" |
| 2:00–3:00 | Business Value | Product Owner | "Reduced cart abandonment, increased conversion, trust through transparency" |

### Segment 2: Design & User Experience (UX Designer) — 5 min

| Time | Topic | Speaker | Key Points |
|---|---|---|---|
| 3:00–4:00 | Empathy Map & Customer Journey | UX Designer | "Understanding the user — Rakshita, a busy professional" |
| 4:00–5:00 | UI Walkthrough — Home Page | UX Designer | "Hero section, stats, feature cards — clean brutalist aesthetic" |
| 5:00–6:00 | UI Walkthrough — Products | UX Designer | "Category grouping, search/filter, discount badges, responsive grid" |
| 6:00–7:00 | UI Walkthrough — Cart & Checkout | UX Designer | "One-page checkout, order summary, payment selection — minimal friction" |
| 7:00–8:00 | UI Walkthrough — Orders & Admin | UX Designer | "Order history, admin dashboard — information hierarchy" |

### Segment 3: Technical Implementation (Full-Stack Developer) — 7 min

| Time | Topic | Speaker | Key Points |
|---|---|---|---|
| 8:00–9:00 | Architecture Overview | Dev Lead | "MERN stack — React 19 SPA + Express 5 API + MongoDB Atlas" |
| 9:00–10:00 | Folder Structure & Code Organization | Dev Lead | "3-tier backend: Routes → Controllers → Models, feature-organized frontend" |
| 10:00–11:00 | API Demonstration — Products | Dev Lead | "Live curl commands — GET /api/products with search/filter" |
| 11:00–12:00 | API Demonstration — Cart | Dev Lead | "POST/GET/PUT/DELETE /api/cart — full CRUD operations" |
| 12:00–13:00 | API Demonstration — Orders | Dev Lead | "POST /api/orders — validates items, saves order, clears cart" |
| 13:00–14:00 | Database Schema Walkthrough | Dev Lead | "Product, Cart, Order, User collections — Mongoose schemas with denormalized data" |
| 14:00–15:00 | Resilience Demo | Dev Lead | "Stop MongoDB → app continues with fallback data → restart → normal operation" |

### Segment 4: Quality Assurance (QA / Tester) — 5 min

| Time | Topic | Speaker | Key Points |
|---|---|---|---|
| 15:00–16:00 | Testing Strategy Overview | QA Lead | "Multi-layered: API perf (k6), frontend (Lighthouse), DB (profiler), UAT (25 cases)" |
| 16:00–17:00 | API Performance Results | QA Lead | "P90 < 150ms reads, < 400ms writes, 0–0.5% error rate, 280+ req/s throughput" |
| 17:00–18:00 | Load & Stress Test Results | QA Lead | "50 users comfortable, breaking point at 150+ concurrent orders" |
| 18:00–19:00 | UAT Results | QA Lead | "25 test cases across 5 modules — pass rate, defect summary, key findings" |
| 19:00–20:00 | Fallback & Error Handling Validation | QA Lead | "No MongoDB → fallback products. Network error → inline fallback. Invalid ID → 404 gracefully" |

### Segment 5: Conclusion & Roadmap (Product Owner) — 2 min

| Time | Topic | Speaker | Key Points |
|---|---|---|---|
| 20:00–21:00 | Key Achievements | Product Owner | "11 features complete, 1 scaffolded, 3 planned for future — all performance targets met or exceeded" |
| 21:00–22:00 | Future Roadmap | Product Owner | "Sprint-2: auth, order tracking, admin CRUD. Sprint-3: payments, mobile responsive, image upload" |

**Total Demonstration Duration: ~22 minutes**

---

## 3. Individual Contribution Breakdown

### Product Owner — Contribution Summary

| Area | Specific Contributions |
|---|---|
| **Vision & Strategy** | Defined problem statement (PS-1), created product vision, prioritized features (P0/P1/P2) |
| **Backlog Management** | Created 30 user stories across 3 sprints, assigned story points, managed priorities |
| **Stakeholder Communication** | Weekly status reports, sprint reviews, UAT sign-off coordination |
| **Business Model** | Defined 4 revenue models: commission, featured listings, seller subscriptions, white-label SaaS |
| **Documentation** | Project overview, purpose, advantages/disadvantages, conclusion |

### UX Designer — Contribution Summary

| Area | Specific Contributions |
|---|---|
| **Empathy Map** | Created user persona (Rakshita), mapped think/feel/hear/see/say/do/pains/gains |
| **Customer Journey Map** | Mapped 10-stage journey from discovery to repeat purchase with emotional chart |
| **Problem-Solution Fit** | Validated 4 jobs-to-be-done: product discovery, frictionless checkout, trust, order confidence |
| **UI Design** | Home page hero + stats + features, product grid, cart layout, checkout two-column, order cards |
| **Visual Identity** | Color palette (#f8fbff gradient), typography (Inter/Segoe UI), card styling (rounded, shadow) |

### Full-Stack Developer — Contribution Summary

| Area | Specific Contributions |
|---|---|
| **Backend API** | 12 RESTful endpoints across 3 controllers (products, cart, orders) |
| **Database** | 4 Mongoose schemas (Product, Cart, Order, User), connection with graceful fallback |
| **Frontend SPA** | 8 React pages (Home, Products, Cart, Checkout, Orders, OrderDetails, OrderConfirmation, Admin) |
| **Authentication Scaffold** | User model with bcryptjs + jsonwebtoken ready for Sprint-2 |
| **Resilience** | Backend fallback (sample data) + frontend fallback (inline arrays) — defence in depth |
| **Deployment** | Procfile for Heroku, single-command startup (`node index.js`), Vite proxy config |
| **Architecture** | ADRs (6 key decisions), 3-tier backend pattern, modular monolith design |

### QA / Tester — Contribution Summary

| Area | Specific Contributions |
|---|---|
| **API Performance Testing** | k6 scripts for all 12 endpoints, baseline measurements, bottleneck identification |
| **Load & Stress Testing** | Normal load (50 users), peak load (200 users), breakpoint test, soak test, burst test |
| **Frontend Performance** | Lighthouse audit across 6 pages, optimization recommendations |
| **Database Performance** | Indexing strategy (4 compound indexes), before/after benchmarks (225–500x improvement) |
| **Payment & Order Testing** | Order lifecycle test, bulk order stress test, data integrity validation |
| **UAT** | 25 test cases across 5 modules, defect management, entry/exit criteria |

---

## 4. Demonstration Preparation Checklist

| Task | Responsible | Status |
|---|---|---|
| Ensure backend server starts without errors | Dev Lead | ✅ |
| Ensure frontend dev server starts without errors | Dev Lead | ✅ |
| Seed MongoDB with sample products | Dev Lead | ✅ |
| Prepare API curl commands in a script file | Dev Lead | ✅ |
| Verify all 8 routes navigate correctly | UX Designer | ✅ |
| Test cart add/update/remove flow | QA Lead | ✅ |
| Test checkout + order placement flow | QA Lead | ✅ |
| Verify fallback data (stop MongoDB) | QA Lead | ✅ |
| Prepare slides/key points presentation | Product Owner | ✅ |
| Review UAT execution report | QA Lead | ✅ |
| Confirm demo environment (localhost:5173) | Dev Lead | ✅ |
| Prepare browser with DevTools open (UI demo) | UX Designer | ✅ |
| Have k6 installed for live perf demo | Dev Lead | Optional |
| Push latest code to GitHub | Dev Lead | ✅ |

---

## 5. Demo Environment Setup

### Required Tools

| Tool | Version | Purpose |
|---|---|---|
| Node.js | 22+ | Run server and client |
| npm | 10+ | Package management |
| MongoDB Atlas | M0+ | Database (optional for demo) |
| Browser | Chrome/Firefox | UI demonstration |
| Terminal (2 windows) | — | Server + Client |

### Quick Start Commands

```bash
# Terminal 1: Backend
cd c:\Users\likhi\OneDrive\Desktop\shopez
node index.js

# Terminal 2: Frontend
cd c:\Users\likhi\OneDrive\Desktop\shopez\client
npm run dev

# Open in browser
start http://localhost:5173
```

### Browser Tabs to Prepare

| Tab | URL | Purpose |
|---|---|---|
| 1 | `http://localhost:5173/` | Home page |
| 2 | `http://localhost:5173/products` | Products catalogue |
| 3 | `http://localhost:5173/cart` | Cart management |
| 4 | `http://localhost:5173/admin` | Admin dashboard |
| 5 | `http://localhost:5173/orders` | Order history |
| 6 | DevTools Network tab | API call inspection |

### API Testing Commands (Prepared)

```bash
# File: demo_commands.sh (prepare in separate terminal)
curl http://localhost:5000/api/products
curl "http://localhost:5000/api/products?search=watch"
curl http://localhost:5000/api/products/sample-1
curl -X POST http://localhost:5000/api/cart -H "Content-Type: application/json" -d '{"userId":"guest","productId":"sample-1","size":"8","quantity":2}'
curl "http://localhost:5000/api/cart?userId=guest"
curl -X POST http://localhost:5000/api/orders -H "Content-Type: application/json" -d '{"userId":"guest","name":"Demo User","email":"demo@shopez.com","mobile":"9876543210","address":"MG Road","pincode":"560038","paymentMethod":"COD","items":[{"productId":"sample-1","title":"Sneakers","price":1999,"quantity":2}]}'
curl "http://localhost:5000/api/orders?userId=guest"
```

---

## 6. Success Criteria for Demonstration

| Criteria | Measurement | Owner |
|---|---|---|
| All 8 pages render without errors | Visual inspection | UX Designer |
| Search filters products in real-time | Type "watch" → results filter | Dev Lead |
| Cart adds/updates/removes correctly | Quantity changes reflected | Dev Lead |
| Order places and clears cart | Success message shown, cart empty | QA Lead |
| Order appears in history | Orders page shows new order | QA Lead |
| Fallback data works without MongoDB | Stop server → products still show | QA Lead |
| API responses return correct status codes | 200, 201, 404, 500 as expected | Dev Lead |
| Performance targets demonstrated | P90 < 500ms, error rate < 1% | QA Lead |
