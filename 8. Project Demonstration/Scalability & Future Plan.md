# Scalability & Future Plan — ShopEZ E-Commerce Platform

| Field | Value |
|---|---|
| **Project** | ShopEZ — Curated E-Commerce Platform |
| **Team ID** | ShopEZ Team |
| **Date** | July 2026 |

---

## 1. Current Architecture Scalability

ShopEZ is built on a **modular monolith** architecture that can scale across multiple dimensions — technical, feature, geographic, and team.

### Technical Scalability

| Layer | Current State | How It Scales | Target |
|---|---|---|---|
| **API Server** | Single Express.js instance (port 5000) | Stateless design → multiple instances behind load balancer (Nginx / AWS ELB) | 10+ instances |
| **Frontend** | Vite dev server (port 5173) | Built static files served from CDN (Vercel, Netlify, Cloudflare) | Global CDN |
| **Database** | MongoDB Atlas M0 (free tier, 512MB) | Upgrade to M2+ cluster with read replicas and sharding | M10+ for production |
| **Caching** | None (direct DB queries) | Add Redis cache layer for product listings (60s TTL) | Reduce DB load by 80% |
| **File Storage** | Unsplash URL strings | Cloudinary/S3 for image upload + CDN delivery | Global image delivery |

### Horizontal Scaling Diagram

```
                          ┌───────────────────────────┐
                          │    Load Balancer           │
                          │    (Nginx / AWS ALB)       │
                          └───────────┬───────────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              │                       │                       │
    ┌─────────▼─────────┐   ┌─────────▼─────────┐   ┌─────────▼─────────┐
    │  Express Instance 1│   │  Express Instance 2│   │  Express Instance N│
    │  (Port 5000)       │   │  (Port 5000)       │   │  (Port 5000)       │
    │  Stateless API     │   │  Stateless API     │   │  Stateless API     │
    └─────────┬─────────┘   └─────────┬─────────┘   └─────────┬─────────┘
              │                       │                       │
              └───────────────────────┼───────────────────────┘
                                      │
                          ┌───────────▼───────────────┐
                          │     Redis Cache            │
                          │  (Product listings, TTL)   │
                          └───────────┬───────────────┘
                                      │
                          ┌───────────▼───────────────┐
                          │  MongoDB Atlas Cluster    │
                          │  (Primary + Read Replicas)│
                          └───────────────────────────┘
```

---

## 2. Database Scalability

### Current Limitations (M0 Free Tier)

| Resource | M0 Limit | Impact | Upgrade Path |
|---|---|---|---|
| Storage | 512 MB | ~100K products at 5KB each | M2: 2GB ($9/mo) → M5: 5GB ($25/mo) |
| Connections | 500 | Shared pool, queueing at >200 concurrent | M2: 500 connections with dedicated RAM |
| RAM | Shared (burst-limited) | Memory-mapped storage may degrade | M2: Dedicated 512MB → M10: 2GB |
| IOPS | Burst up to 100 | Sustained load throttles | M2: 100 baseline → M10: 500+ |
| Replica Set | Single node (no HA) | Downtime during maintenance | M2+: 3-node replica set |

### Index Strategy for Scale

```javascript
// Production indexes for large datasets
db.products.createIndex({ category: 1, price: 1 });
db.products.createIndex({ title: 'text', description: 'text', category: 'text' });
db.products.createIndex({ createdAt: -1 });
db.carts.createIndex({ userId: 1, createdAt: -1 });
db.orders.createIndex({ userId: 1, createdAt: -1 });
db.orders.createIndex({ status: 1, createdAt: -1 });
```

---

## 3. Feature Scalability Roadmap

### Phase 1: Sprint-2 Features (Next)

| Feature | Complexity | Dependencies | Expected Impact |
|---|---|---|---|
| **User Authentication** | 3 story points | User model done, bcrypt + JWT installed | Enables personalized carts/orders, user-specific data |
| **Order Status Tracking** | 2 story points | Order schema done | Adds Pending→Confirmed→Shipped→Delivered badges |
| **Full Product Detail Page** | 3 story points | Product model done | Image carousel, size selector, full description |
| **Admin CRUD** | 7 story points (3+2+2) | Product API done | Add/edit/delete products from dashboard |

### Phase 2: Sprint-3 Features

| Feature | Complexity | Dependencies | Expected Impact |
|---|---|---|---|
| **Payment Gateway** | 5 story points | Order flow done | Real payments via Razorpay/Stripe |
| **Mobile Responsive** | 3 story points | CSS framework | Full mobile support (375px–1920px) |
| **Image Upload** | 3 story points | Multer + Cloudinary | Admin upload instead of URL strings |
| **Email Notifications** | 2 story points | Nodemailer | Order confirmation emails |

### Phase 3: Long-Term Features

| Feature | Impact | Estimated Effort | Priority |
|---|---|---|---|
| **Reviews & Ratings** | High | 5 story points | Medium |
| **Product Recommendations** | Medium | 3 story points | Low |
| **Wishlist** | Medium | 2 story points | Low |
| **Seller Portal** | Medium | 8 story points | Low |
| **Multi-Language (i18n)** | Medium | 5 story points | Low |
| **Progressive Web App** | Medium | 5 story points | Low |
| **Analytics Dashboard** | Low | 5 story points | Low |

---

## 4. Infrastructure Scalability

### Deployment Options

| Option | Cost | Complexity | Best For |
|---|---|---|---|
| **Heroku (Free)** | $0 | Low | MVP demo, dev testing |
| **Heroku (Hobby)** | $7/mo | Low | Low-traffic production |
| **VPS (DigitalOcean/AWS EC2)** | $5–$20/mo | Medium | Full production control |
| **Docker + Kubernetes** | $20–$100/mo | High | Enterprise scale |

### Performance Budgets at Scale

| Metric | Current (M0) | Target (M2) | Target (M10+) |
|---|---|---|---|
| Concurrent Users | 50 | 200 | 10,000+ |
| Products | 5–100 | 10,000 | 1,000,000+ |
| Orders/Day | 100 | 5,000 | 100,000+ |
| API Response (P90) | < 150ms | < 200ms | < 300ms |
| Uptime | 99.5% | 99.9% | 99.99% |

---

## 5. Future Technical Improvements

### Performance Optimizations

| Improvement | Current State | Target | Impact |
|---|---|---|---|
| **Redis Caching** | No cache | Product listings cached (60s TTL) | 80% reduction in DB reads |
| **MongoDB Indexes** | Only _id indexed | Compound indexes on category, price, userId | 200–500x query improvement |
| **Rate Limiting** | None | 100 req/min per IP | Prevents abuse |
| **Code Splitting** | Single bundle | React.lazy() per page | 40% reduction in initial load |
| **Debounced Search** | Fires on every keystroke | 300ms debounce | 90% reduction in API calls |
| **CDN for Assets** | Local serving | Cloudflare/Netlify CDN | Global < 50ms load times |

### Security Improvements

| Improvement | Current State | Target |
|---|---|---|
| **Auth Middleware** | Not implemented | JWT verification on protected routes |
| **Input Sanitization** | None | express-validator for all POST/PUT |
| **HTTPS** | HTTP only | SSL/TLS via Let's Encrypt |
| **CORS** | Open (`*`) | Restrict to domain whitelist |
| **Helmet.js** | Not installed | Security headers middleware |

### DevOps Improvements

| Improvement | Current State | Target |
|---|---|---|
| **CI/CD** | Manual deploy | GitHub Actions → auto-test → auto-deploy |
| **Docker** | None | Multi-stage Dockerfile |
| **Monitoring** | None | Sentry for errors, Grafana for metrics |
| **Logging** | console.log | Winston/Morgan structured logging |
| **Testing** | Manual + k6 perf | Jest unit tests + Cypress E2E |

---

## 6. Team Scalability

### Current Team (MVP)

| Role | Headcount | Responsibilities |
|---|---|---|
| Product Owner | 1 | Vision, backlog, stakeholders |
| UX Designer | 1 | UI/UX, wireframes |
| Full-Stack Developer | 1 | All code (frontend + backend) |
| QA / Tester | 1 | Testing, UAT |

### Growth Plan

| Phase | Team Size | New Roles | Rationale |
|---|---|---|---|
| **MVP** | 4 | As above | Minimum team for functional product |
| **Growth** | 6 | +1 Backend Dev, +1 Frontend Dev | Separate concerns for faster delivery |
| **Scale** | 10+ | +DevOps, +Data Analyst, +2 Devs | Dedicated infrastructure, analytics, feature teams |

### Code Organization for Team Growth

```
Current (MVP): Single developer maintains all files

Growth Phase:
  /server → Backend team (2 devs)
  /client → Frontend team (2 devs)
  /infra  → DevOps (1 person)
  
Scale Phase:
  /services/auth-service    → Auth team
  /services/product-service → Product team  
  /services/order-service   → Order team
  /services/payment-service → Payment team
  /client                   → Frontend team
  /infra                    → DevOps team
```

---

## 7. Business Model Scalability

### Revenue Model Progression

| Phase | Model | Revenue Estimate |
|---|---|---|
| **MVP** | Free (no monetization) | ₹0 |
| **Launch** | Commission-per-sale (5–10%) | ₹5,000–₹50,000/mo (100–500 orders) |
| **Growth** | Commission + Featured listings | ₹50,000–₹5,00,000/mo |
| **Scale** | Commission + Featured + Seller subscriptions | ₹5,00,000+/mo |

### Path to Production Readiness

| Requirement | Current Status | Action Needed | Timeline |
|---|---|---|---|
| **Payment Gateway** | ❌ Not integrated | Razorpay/Stripe API integration | Sprint-3 |
| **Legal (GDPR/Privacy)** | ❌ Not addressed | Privacy policy, terms of service | Pre-launch |
| **SSL/HTTPS** | ❌ HTTP only | Let's Encrypt certificate | Pre-launch |
| **Monitoring** | ❌ None | Sentry + uptime monitoring | Pre-launch |
| **Backup Strategy** | ❌ None | Automated MongoDB backups | Pre-launch |
| **Load Testing** | ✅ Done | Scale test for 10x current load | Ongoing |
| **Documentation** | ✅ Complete | Keep updated with each sprint | Ongoing |

---

## 8. Technical Debt & Improvement Priorities

| Priority | Item | Effort | Impact | Sprint |
|---|---|---|---|---|
| **P0** | Add MongoDB indexes | 1 day | 200–500x query improvement | Current |
| **P0** | Implement auth middleware | 2 days | User-specific data isolation | Sprint-2 |
| **P1** | Add rate limiting | 0.5 day | Prevent API abuse | Sprint-2 |
| **P1** | Add input validation | 1 day | Data integrity, security | Sprint-2 |
| **P2** | Code splitting | 1 day | 40% faster initial load | Sprint-3 |
| **P2** | Debounce search | 0.5 day | Reduce API calls by 90% | Sprint-3 |
| **P3** | Unit tests | 3 days | Automated quality assurance | Sprint-3 |
| **P3** | Docker setup | 2 days | Consistent deployments | Sprint-3 |

---

## 9. Key Risk Factors & Mitigation

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| MongoDB connection limits at scale | Medium | High | Upgrade to M2+ cluster, add connection pooling |
| Single server point of failure | Medium | High | Add load balancer + multiple instances |
| Guest cart data loss on server restart | Low | Medium | Cart persistence in MongoDB (already implemented) |
| Third-party API dependency (Unsplash) | Low | Medium | Local image fallback + Cloudinary migration planned |
| No automated tests → regressions | Medium | Medium | Jest + Cypress suite planned for Sprint-3 |
