# Project Planning Phase — Project Planning Template

| Field | Value |
|---|---|
| **Date** | July 2026|
| **Team ID** | ShopEZ Team |
| **Project Name** | ShopEZ — Curated E-Commerce Platform |
| **Maximum Marks** | 5 Marks |

---

## Purpose

This document contains the complete project planning artifacts for ShopEZ, including the Product Backlog, Sprint Schedule, User Stories with Story Points, Sprint Velocity calculation, and Burndown Chart. It follows Scrum agile methodology for iterative delivery.

**Reference Templates:**
- `4. Project Planning Phase/Project Planning Template.docx`
- `4. Project Planning Phase/Planning logic.docx`
- https://www.atlassian.com/agile/project-management
- https://www.atlassian.com/agile/tutorials/how-to-do-scrum-with-jira-software

---

## Product Backlog, Sprint Schedule & Estimation

| Sprint | Functional Requirement (Epic) | User Story Number | User Story / Task | Story Points | Priority | Team Members |
|---|---|---|---|---|---|---|
| **Sprint-1** | Product Catalogue | US-01 | As a visitor, I can view all products grouped by category with item counts so I can browse efficiently | 3 | High | Full-Stack Dev, UX Designer |
| **Sprint-1** | Product Catalogue | US-02 | As a visitor, I can see discount badges and transparent ₹ pricing on every product card | 2 | High | Full-Stack Dev |
| **Sprint-1** | Search & Filter | US-03 | As a visitor, I can search products by title, description, or category via a search input | 3 | High | Full-Stack Dev |
| **Sprint-1** | Search & Filter | US-04 | As a visitor, I can filter products by category using a dropdown selector | 2 | High | Full-Stack Dev |
| **Sprint-1** | Cart Management | US-05 | As a visitor, I can add a product to my cart with a default quantity of 1 | 2 | High | Full-Stack Dev |
| **Sprint-1** | Cart Management | US-06 | As a visitor, I can increase quantity, decrease quantity, or remove items from my cart | 3 | High | Full-Stack Dev |
| **Sprint-1** | Cart Management | US-07 | As a visitor, I can see the running total of all items in my cart | 1 | Medium | Full-Stack Dev |
| **Sprint-1** | Guest Shopping | US-08 | As a visitor, I can use the cart and checkout without creating an account (guest userId) | 2 | High | Full-Stack Dev |
| **Sprint-1** | Checkout | US-09 | As a visitor, I can fill in shipping details (name, email, mobile, address, pincode) | 2 | High | Full-Stack Dev, UX Designer |
| **Sprint-1** | Checkout | US-10 | As a visitor, I can choose between Cash on Delivery and Online Payment | 1 | Medium | Full-Stack Dev |
| **Sprint-1** | Checkout | US-11 | As a visitor, I can place an order and see a success confirmation | 3 | High | Full-Stack Dev |
| **Sprint-1** | Navigation | US-12 | As a visitor, I can navigate between Home, Products, Cart, Orders, and Admin pages via the navbar | 2 | High | UX Designer, Full-Stack Dev |
| **Sprint-1** | Fallback Data | US-13 | As a developer, I can ensure the app works with sample data when MongoDB is offline | 3 | High | Full-Stack Dev |
| **Sprint-1** | Home Page | US-14 | As a visitor, I can see a landing page with hero section, stats, and feature cards | 2 | Medium | UX Designer, Full-Stack Dev |
| | | | **Sprint-1 Total Story Points** | **31** | | |
| **Sprint-2** | Order History | US-15 | As a visitor, I can view all my past orders with item details, totals, payment method, and date | 3 | High | Full-Stack Dev |
| **Sprint-2** | Order History | US-16 | As a visitor, I can click on an order to see full details including each item and shipping info | 2 | Medium | Full-Stack Dev |
| **Sprint-2** | Admin Dashboard | US-17 | As an admin, I can see all products in one simple dashboard list with title, category, and price | 2 | Low | Full-Stack Dev |
| **Sprint-2** | Admin Dashboard | US-18 | As an admin, I can add a new product through a form with all required fields | 3 | Low | Full-Stack Dev |
| **Sprint-2** | Admin Dashboard | US-19 | As an admin, I can edit existing product details | 2 | Low | Full-Stack Dev |
| **Sprint-2** | Admin Dashboard | US-20 | As an admin, I can delete a product from the catalog with confirmation | 2 | Low | Full-Stack Dev |
| **Sprint-2** | User Auth | US-21 | As a returning user, I can register with email and password to save my information | 3 | Medium | Full-Stack Dev |
| **Sprint-2** | User Auth | US-22 | As a returning user, I can log in with my email and password | 2 | Medium | Full-Stack Dev |
| **Sprint-2** | Product Details | US-23 | As a visitor, I can click on a product card to see full details including carousel and sizes | 3 | Medium | UX Designer, Full-Stack Dev |
| | | | **Sprint-2 Total Story Points** | **22** | | |
| **Sprint-3** | Order Tracking | US-24 | As a visitor, I can see order status badges (Confirmed / Shipped / Delivered) on my orders | 2 | Medium | Full-Stack Dev |
| **Sprint-3** | Payment Gateway | US-25 | As a visitor, I can pay online via Razorpay/Stripe integration | 5 | High | Full-Stack Dev |
| **Sprint-3** | Image Upload | US-26 | As an admin, I can upload product images instead of using URL strings | 3 | Medium | Full-Stack Dev |
| **Sprint-3** | Mobile Responsive | US-27 | As a visitor, I can browse and shop seamlessly on my mobile device | 3 | Medium | UX Designer, Full-Stack Dev |
| **Sprint-3** | Reviews & Ratings | US-28 | As a visitor, I can read and write product reviews with star ratings | 3 | Low | Full-Stack Dev |
| **Sprint-3** | Email Notifications | US-29 | As a visitor, I receive an email confirmation after placing an order | 2 | Medium | Full-Stack Dev |
| **Sprint-3** | Recommendations | US-30 | As a visitor, I can see "You might also like" recommendations based on my orders | 3 | Low | Full-Stack Dev |
| | | | **Sprint-3 Total Story Points** | **21** | | |
| | | | **Grand Total Story Points** | **74** | | |

---

## Story Point Reference

Story Points represent the relative effort required to complete a user story, following the Fibonacci-like scale.

| Story Point | Effort Level | Description |
|---|---|---|
| **1** | Very Easy | Simple task, minimal effort (e.g., UI text change, single field addition) |
| **2** | Normal | Straightforward task with clear requirements (e.g., add a form field, create a simple component) |
| **3** | Moderate | Moderate complexity requiring coordination (e.g., full feature with API + UI + validation) |
| **5** | Difficult | Complex task involving multiple systems or new integration (e.g., payment gateway) |

---

## Project Tracker — Sprint Velocity

| Sprint | Total Story Points | Duration | Sprint Start Date | Sprint End Date (Planned) | Story Points Completed | Sprint Release Date (Actual) |
|---|---|---|---|---|---|---|
| **Sprint-1** | 31 | 14 Days | 06 Jan 2025 | 19 Jan 2025 | 31 | 19 Jan 2025 |
| **Sprint-2** | 22 | 14 Days | 20 Jan 2025 | 02 Feb 2025 | 22 | 02 Feb 2025 |
| **Sprint-3** | 21 | 14 Days | 03 Feb 2025 | 16 Feb 2025 | — | — |
| **Total** | **74** | **42 Days** | | | | |

### Velocity Calculation

**Formula:** Velocity = Total Story Points Completed / Number of Sprints

| Metric | Value |
|---|---|
| Total Story Points Completed (Sprint-1 + Sprint-2) | 31 + 22 = **53** |
| Number of Sprints Completed | **2** |
| **Team Velocity** | **53 / 2 = 26.5 ≈ 27 Story Points per Sprint** |

> **Interpretation:** The ShopEZ team consistently delivers approximately **27 story points per 14-day sprint**. This velocity can be used to forecast future sprint capacity and release timelines.

### Average Velocity Per Day

**Formula:** Average Velocity per Day = Total Story Points / Sprint Duration

| Sprint | Story Points | Duration (Days) | Points/Day |
|---|---|---|---|
| Sprint-1 | 31 | 14 | 2.21 |
| Sprint-2 | 22 | 14 | 1.57 |
| **Average** | | | **1.89 ≈ 2 points/day** |

---

## Burndown Chart

A burndown chart is a graphical representation of work left to do versus time. It is used in Scrum to track progress within a sprint.

### Sprint-1 Burndown

| Day | Start | Day 2 | Day 4 | Day 6 | Day 8 | Day 10 | Day 12 | Day 14 (End) |
|---|---|---|---|---|---|---|---|---|
| **Ideal Remaining** | 31 | 27 | 22 | 18 | 13 | 9 | 4 | 0 |
| **Actual Remaining** | 31 | 28 | 24 | 19 | 14 | 9 | 3 | 0 |

```
Remaining Story Points
31 ┤ ╳
   │  ╲
27 ┤   ╳
   │    ╲
22 ┤      ╳
   │       ╲
18 ┤         ╳  ╳
   │           ╲  ╲
13 ┤             ╳  ╳
   │                ╲  ╲
 9 ┤                  ╳  ╳
   │                     ╲  ╲
 4 ┤                       ╳  ╳
   │                          ╲  ╲
 0 ┤────────────────────────────╳──►
   │ Day 0  4    8    12   14
   
   ── Ideal Burndown
   ╳  Actual Progress
```

**Sprint-1 Analysis:** The team closely tracked the ideal burndown, completing all 31 story points by sprint end. The actual line stayed slightly above ideal in early days (scope discovery) but caught up by mid-sprint.

### Sprint-2 Burndown

| Day | Start | Day 2 | Day 4 | Day 6 | Day 8 | Day 10 | Day 12 | Day 14 (End) |
|---|---|---|---|---|---|---|---|---|
| **Ideal Remaining** | 22 | 19 | 16 | 13 | 9 | 6 | 3 | 0 |
| **Actual Remaining** | 22 | 20 | 17 | 14 | 10 | 6 | 2 | 0 |

```
Remaining Story Points
22 ┤ ╳
   │  ╲
19 ┤   ╳
   │    ╲
16 ┤      ╳
   │       ╲
13 ┤         ╳
   │          ╲
 9 ┤            ╳
   │             ╲
 6 ┤               ╳
   │                ╲
 3 ┤                  ╳
   │                   ╲
 0 ┤─────────────────────╳──►
   │ Day 0  4    8    12   14
   
   ── Ideal Burndown
   ╳  Actual Progress
```

**Sprint-2 Analysis:** With fewer story points (22 vs 31), the team maintained consistent velocity. Actual burndown tracked the ideal line closely throughout the sprint.

---

## Key Planning Decisions & Rationale

| Decision | Rationale |
|---|---|
| **14-day sprint duration** | Long enough to deliver meaningful increments, short enough to maintain focus and adapt to feedback |
| **Sprint-1 focuses on core purchase flow** | Product catalogue → Cart → Checkout → Order — the entire purchase funnel is delivered first so that the MVP is usable from day one |
| **Guest-first, auth later** | Auth features (US-21, US-22) are in Sprint-2 because the product works without them. Users can shop immediately without account creation |
| **Admin dashboard in Sprint-2** | Internal tooling is deprioritized behind customer-facing features. Admins can use the database directly in Sprint-1 if needed |
| **Payment gateway in Sprint-3** | Real payment integration requires third-party setup and compliance. COD + Online method capture is sufficient for MVP validation |
| **Highest story points (5) for payment gateway** | Payment integration involves third-party API, webhooks, security considerations, and testing — the most complex single feature |

---

## References

- **Template:** `4. Project Planning Phase/Project Planning Template.docx`
- **Planning Logic:** `4. Project Planning Phase/Planning logic.docx`
- https://www.atlassian.com/agile/project-management
- https://www.atlassian.com/agile/tutorials/how-to-do-scrum-with-jira-software
- https://www.atlassian.com/agile/tutorials/epics
- https://www.atlassian.com/agile/tutorials/sprints
- https://www.atlassian.com/agile/project-management/estimation
- https://www.atlassian.com/agile/tutorials/burndown-charts
- https://www.visual-paradigm.com/scrum/scrum-burndown-chart/
