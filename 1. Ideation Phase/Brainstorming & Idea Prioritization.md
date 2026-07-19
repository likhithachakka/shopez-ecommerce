# Ideation Phase — Brainstorming & Idea Prioritization

| Field | Value |
|---|---|
| **Date** | January 2025 |
| **Team ID** | ShopEZ Team |
| **Project Name** | ShopEZ — Curated E-Commerce Platform |
| **Maximum Marks** | 4 Marks |

---

## Purpose

Brainstorming provides a free and open environment that encourages everyone within a team to participate in the creative thinking process that leads to problem solving. Prioritizing volume over value, out-of-the-box ideas are welcome and built upon, and all participants are encouraged to collaborate, helping each other develop a rich amount of creative solutions.

**Reference:** https://www.mural.co/templates/brainstorm-and-idea-prioritization

---

## Step 1 — Team Gathering, Collaboration & Select the Problem Statement

| Parameter | Value |
|---|---|
| **Team ID** | ShopEZ Team |
| **Project Name** | ShopEZ — Curated E-Commerce Platform |
| **Selected Problem Statement** | **PS-1** — Online shoppers struggle to discover curated products quickly and complete purchases without friction |
| **Problem Statement Text** | **I am** an online shopper. **I'm trying to** find quality products quickly without wading through thousands of irrelevant listings. **But** most platforms overload me with choices, slow checkouts, and unclear pricing. **Because** there is no curated, clean, and fast alternative that respects my time. **Which makes me feel** overwhelmed and distrustful — I often abandon my cart before completing a purchase. |

### Team Composition

| Role | Responsibility |
|---|---|
| Product Owner | Defines vision, prioritizes features, validates against customer needs |
| UX Designer | Ensures clean, intuitive interface and frictionless user flows |
| Full-Stack Developer | Architects and implements the solution across frontend and backend |
| QA / Tester | Validates functionality, fallback behaviour, and edge cases |

---

## Step 2 — Brainstorm, Idea Listing & Grouping

The team conducted a brainstorming session focused on solving **PS-1**. Ideas were generated freely, then grouped by functional category.

| # | Idea | Category |
|---|---|---|
| 1 | Product catalogue with category-based grouping and item counts | Browsing |
| 2 | Search by title, description, or category | Search |
| 3 | Category filter dropdown for narrowing results | Filtering |
| 4 | Guest (no-signup) shopping experience throughout the entire flow | Onboarding |
| 5 | Real-time cart with quantity increment/decrement controls | Cart |
| 6 | Remove item from cart with one click | Cart |
| 7 | One-page checkout with shipping form + payment method selection | Checkout |
| 8 | Order confirmation page after successful placement | Orders |
| 9 | Order history list with item details, totals, and dates | Orders |
| 10 | Discount / sale badge visibility on every product card | Merchandising |
| 11 | Admin dashboard for viewing all products | Admin |
| 12 | Fallback sample data when database is offline | Resilience |
| 13 | Responsive design for mobile browsing | UX |
| 14 | Transparent pricing with ₹ amounts shown upfront | Trust |
| 15 | Image-based product cards with clean brutalist styling | UI/UX |

### Idea Grouping Summary

| Category | Ideas | Count |
|---|---|---|
| **Browsing** | #1 — Product catalogue with category grouping | 1 |
| **Search & Filter** | #2 — Search, #3 — Category filter | 2 |
| **Onboarding** | #4 — Guest shopping (no sign-up) | 1 |
| **Cart** | #5 — Quantity controls, #6 — Remove item | 2 |
| **Checkout** | #7 — One-page checkout | 1 |
| **Orders** | #8 — Order confirmation, #9 — Order history | 2 |
| **Merchandising** | #10 — Discount badges | 1 |
| **Admin** | #11 — Admin dashboard | 1 |
| **Resilience** | #12 — Fallback data | 1 |
| **UX** | #13 — Responsive design | 1 |
| **Trust** | #14 — Transparent pricing | 1 |
| **UI/UX** | #15 — Clean brutalist styling | 1 |

---

## Step 3 — Idea Prioritization

The team evaluated each idea against two dimensions: **Impact on solving PS-1** and **Implementation complexity**. Ideas were categorized into three priority tiers.

### Priority Matrix

| Priority | Definition | Criteria |
|---|---|---|
| **P0 — Must Have** | Core to solving the problem | Required for MVP launch. Without this, the product does not deliver value. |
| **P1 — Should Have** | Important for experience | Adds significant value but product works without it. Can ship in Sprint-2. |
| **P2 — Nice to Have** | Enhances over time | Useful but not critical. Can be deferred post-MVP. |

### Prioritized Ideas

| Priority | # | Idea | Rationale |
|---|---|---|---|
| **P0** | 1 | Product catalogue with category grouping | Core value proposition — curated browsing is the primary feature |
| **P0** | 4 | Guest shopping (no sign-up) | Removes #1 friction point — users experience value before commitment |
| **P0** | 5 | Cart with quantity controls | Required for any purchase flow |
| **P0** | 7 | One-page checkout | Must-have for order completion — minimal steps to purchase |
| **P0** | 8 | Order confirmation | Essential to give user confidence that order went through |
| **P1** | 9 | Order history | Important for post-purchase trust and repeat visits |
| **P1** | 10 | Discount badges | Drives purchase decisions and deal perception |
| **P1** | 2 | Search functionality | Helps users find products faster than browsing alone |
| **P1** | 3 | Category filter | Complements browsing — lets users narrow by department |
| **P1** | 12 | Fallback sample data | Ensures app never shows empty state — critical for demo/deployment resilience |
| **P1** | 14 | Transparent pricing | Builds trust — no hidden fees or surprises |
| **P2** | 6 | Remove item from cart | Already covered by cart management flow (part of P0) |
| **P2** | 11 | Admin dashboard | Internal tool, not customer-facing. Can follow later |
| **P2** | 13 | Mobile responsiveness | Important long-term but desktop MVP ships first |
| **P2** | 15 | Clean brutalist styling | Visual polish — functional MVP prioritizes working features over aesthetics |

### Sprint Allocation

| Sprint | Features |
|---|---|
| **Sprint-1 (MVP)** | Product catalogue, Guest shopping, Cart with quantity, One-page checkout, Order confirmation, Discount badges, Fallback data, Transparent pricing |
| **Sprint-2** | Order history, Search, Category filter, Admin dashboard |
| **Future** | Mobile responsiveness, Enhanced UI styling, User authentication, Payment gateway |

---

## Key Decisions & Rationale

| Decision | Rationale |
|---|---|
| **Guest-first over account-first** | Users should experience value (browsing, cart, checkout) before being asked to create an account. This reduces cart abandonment — the #1 problem in e-commerce. |
| **Catalogue curation over infinite scroll** | A smaller, high-quality catalogue reduces decision fatigue. Users can browse an entire category in seconds, not hours. |
| **Fallback data over error states** | The app should never show an error or empty state. Even if MongoDB is offline, users can still browse sample products. This is critical for demos, presentations, and deployment reliability. |
| **One-page checkout over multi-step** | Every additional step in checkout reduces conversion. A single page with all fields visible eliminates the "next page" barrier. |

---

## Reference

- Template: `1. Ideation Phase/Brainstorming- Idea Generation- Prioritizaation Template.docx`
- Methodology: https://www.mural.co/templates/brainstorm-and-idea-prioritization
