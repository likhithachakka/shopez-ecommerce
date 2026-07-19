# Project Planning Phase — Planning Logic

| Field | Value |
|---|---|
| **Date** | January 2025 |
| **Team ID** | ShopEZ Team |
| **Project Name** | ShopEZ — Curated E-Commerce Platform |
| **Maximum Marks** | 5 Marks |

---

## Purpose

This document explains the core Scrum planning concepts — Epics, Stories, Story Points, Sprints, Velocity, and Burndown — as applied to the ShopEZ project. It serves as a reference for the project team to understand how the Product Backlog and sprint schedule were constructed.

**Reference Template:** `4. Project Planning Phase/Planning logic.docx`

---

## Core Agile Concepts

### Sprint

A **Sprint** is a fixed period or duration in which a team works to complete a set of tasks. Each sprint has a defined start date, end date, and a set of committed user stories.

| ShopEZ Sprint | Duration | Focus |
|---|---|---|
| Sprint-1 | 14 days (06 Jan – 19 Jan 2025) | Core purchase flow (Catalogue → Cart → Checkout → Order) |
| Sprint-2 | 14 days (20 Jan – 02 Feb 2025) | Order history, Admin dashboard, User auth |
| Sprint-3 | 14 days (03 Feb – 16 Feb 2025) | Payment gateway, Mobile responsive, Reviews |

### Epic

An **Epic** is a big task or project that is too large to complete in one sprint. It is broken down into smaller tasks (stories) that can be completed over multiple sprints.

| Epic ID | Epic Name | Stories Included | Sprint(s) |
|---|---|---|---|
| E-01 | Product Catalogue | US-01, US-02 | Sprint-1 |
| E-02 | Search & Filter | US-03, US-04 | Sprint-1 |
| E-03 | Cart Management | US-05, US-06, US-07 | Sprint-1 |
| E-04 | Guest Shopping | US-08 | Sprint-1 |
| E-05 | Checkout | US-09, US-10, US-11 | Sprint-1 |
| E-06 | Navigation | US-12 | Sprint-1 |
| E-07 | Fallback Data | US-13 | Sprint-1 |
| E-08 | Home Page | US-14 | Sprint-1 |
| E-09 | Order History | US-15, US-16 | Sprint-2 |
| E-10 | Admin Dashboard | US-17, US-18, US-19, US-20 | Sprint-2 |
| E-11 | User Auth | US-21, US-22 | Sprint-2 |
| E-12 | Product Details | US-23 | Sprint-2 |
| E-13 | Order Tracking | US-24 | Sprint-3 |
| E-14 | Payment Gateway | US-25 | Sprint-3 |
| E-15 | Image Upload | US-26 | Sprint-3 |
| E-16 | Mobile Responsive | US-27 | Sprint-3 |
| E-17 | Reviews & Ratings | US-28 | Sprint-3 |
| E-18 | Email Notifications | US-29 | Sprint-3 |
| E-19 | Recommendations | US-30 | Sprint-3 |

### Story

A **Story** (User Story) is a small, self-contained task. It is part of an Epic and describes a feature from the end-user perspective.

**Format:** "As a [user type], I can [action] so that [benefit]"

**Example (ShopEZ):**
> As a visitor, I can add a product to my cart with a default quantity of 1 so that I can start the checkout process.

### Story Point

A **Story Point** is a number that represents how much effort a story takes to complete. ShopEZ uses a simplified Fibonacci-like scale (1, 2, 3, 5).

| Story Point | Effort Level | ShopEZ Example |
|---|---|---|
| **1** | Very Easy — minimal effort, often a UI adjustment or single field | US-07: Cart running total display |
| **2** | Normal — straightforward, clear requirements, standard implementation | US-02: Discount badge on product card |
| **3** | Moderate — requires coordination across layers (API + database + UI) | US-01: Product catalogue with category grouping |
| **5** | Difficult — complex integration or multiple systems | US-25: Payment gateway integration (Razorpay/Stripe) |

---

## Sprint Planning Calculation

### Sprint-1 Story Point Calculation

| Epic | Story | Story Points |
|---|---|---|
| **E-01: Product Catalogue** | US-01: View products grouped by category | 3 |
| | US-02: Discount badges and pricing | 2 |
| **E-02: Search & Filter** | US-03: Search by title/description/category | 3 |
| | US-04: Category filter dropdown | 2 |
| **E-03: Cart Management** | US-05: Add to cart | 2 |
| | US-06: Update quantity and remove items | 3 |
| | US-07: Running total display | 1 |
| **E-04: Guest Shopping** | US-08: Guest cart without account | 2 |
| **E-05: Checkout** | US-09: Shipping form (5 fields) | 2 |
| | US-10: Payment method selection | 1 |
| | US-11: Place order and confirmation | 3 |
| **E-06: Navigation** | US-12: Navbar with route links | 2 |
| **E-07: Fallback Data** | US-13: Sample data fallback when DB offline | 3 |
| **E-08: Home Page** | US-14: Landing page with hero and stats | 2 |
| | **Sprint-1 Total** | **31** |

### Sprint-2 Story Point Calculation

| Epic | Story | Story Points |
|---|---|---|
| **E-09: Order History** | US-15: List orders with details | 3 |
| | US-16: Click order for full details | 2 |
| **E-10: Admin Dashboard** | US-17: View all products in dashboard | 2 |
| | US-18: Add new product form | 3 |
| | US-19: Edit existing product | 2 |
| | US-20: Delete product with confirmation | 2 |
| **E-11: User Auth** | US-21: Register with email and password | 3 |
| | US-22: Login with email and password | 2 |
| **E-12: Product Details** | US-23: Product detail page (carousel, sizes) | 3 |
| | **Sprint-2 Total** | **22** |

---

## Velocity Calculation

**Formula:** Velocity = Total Story Points Completed / Number of Sprints

| Sprint | Story Points Completed |
|---|---|
| Sprint-1 | 31 |
| Sprint-2 | 22 |
| **Total** | **53** |
| **Number of Sprints** | **2** |
| **Velocity** | **53 / 2 = 26.5 ≈ 27 points/sprint** |

### ShopEZ Team Velocity: **27 Story Points per Sprint**

**What this means:** On average, the ShopEZ team can complete **27 story points** in a **14-day sprint**. This can be used to:
- Forecast how many sprints future epics will take
- Plan release dates with confidence
- Identify if the team is over-committing or under-committing in future sprints

### Average Velocity Per Day

**Formula:** Points per day = Sprint Story Points / Sprint Duration (days)

| Sprint | Points | Days | Points/Day |
|---|---|---|---|
| Sprint-1 | 31 | 14 | 2.21 |
| Sprint-2 | 22 | 14 | 1.57 |
| **Average** | | | **1.89 ≈ 2 points/day** |

---

## Burndown Chart Methodology

A burndown chart is a graphical representation of work left to do versus time. It is used in Scrum to track progress within a sprint.

### How to Read the Burndown Chart

- **X-axis:** Time (days of the sprint)
- **Y-axis:** Remaining story points
- **Ideal line:** Straight diagonal from (Start, Total Points) to (End, 0)
- **Actual line:** Real remaining points at each checkpoint

### Sprint-1 Burndown Calculation

| Day | Start | Day 2 | Day 4 | Day 6 | Day 8 | Day 10 | Day 12 | Day 14 |
|---|---|---|---|---|---|---|---|---|
| **Ideal Remaining** | 31 | 27 | 22 | 18 | 13 | 9 | 4 | 0 |
| **Actual Remaining** | 31 | 28 | 24 | 19 | 14 | 9 | 3 | 0 |

**Ideal line formula:** Remaining = Total Points - (Total Points / Sprint Days × Current Day)
- Day 0: 31 - (31/14 × 0) = 31
- Day 2: 31 - (2.21 × 2) = 31 - 4.42 ≈ 27
- Day 4: 31 - (2.21 × 4) = 31 - 8.84 ≈ 22
- ...continues to Day 14: 31 - (2.21 × 14) = 31 - 31 = 0

### Sprint-2 Burndown Calculation

| Day | Start | Day 2 | Day 4 | Day 6 | Day 8 | Day 10 | Day 12 | Day 14 |
|---|---|---|---|---|---|---|---|---|
| **Ideal Remaining** | 22 | 19 | 16 | 13 | 9 | 6 | 3 | 0 |
| **Actual Remaining** | 22 | 20 | 17 | 14 | 10 | 6 | 2 | 0 |

**Ideal line formula:** Remaining = 22 - (22/14 × Current Day)
- Day 0: 22 - (1.57 × 0) = 22
- Day 2: 22 - (1.57 × 2) = 22 - 3.14 ≈ 19
- ...continues to Day 14: 22 - (1.57 × 14) = 22 - 22 = 0

### Interpreting the Burndown

| Pattern | Meaning | Action |
|---|---|---|
| Actual above Ideal | Team is behind schedule | Re-evaluate scope, remove low-priority stories |
| Actual matches Ideal | Team is on track | Continue as planned |
| Actual below Ideal | Team is ahead of schedule | Consider adding a high-priority story |
| Actual line flattens | Blockers or underestimated stories | Hold a stand-up to unblock |
| Actual line drops sharply | Stories completed faster than expected | Re-estimate remaining work |

---

## Key Planning Rules Applied to ShopEZ

| Rule | How It Was Applied |
|---|---|
| **Epics span multiple sprints** | Cart Management (E-03) and Checkout (E-05) are Sprint-1 only. Admin Dashboard (E-10) is Sprint-2. Payment Gateway (E-14) is Sprint-3. |
| **Stories within an epic are ordered by dependency** | In Checkout epic: shipping form (US-09) → payment selection (US-10) → place order (US-11). Each depends on the previous. |
| **Story points are relative, not absolute** | A 3-point story is roughly 3× more effort than a 1-point story. Points are not hours. |
| **Sprint-1 carries the heaviest load** | 31 points is aggressive but justified: the core purchase flow must be complete for the MVP to function. |
| **Velocity stabilizes after 2-3 sprints** | Sprint-1 (31 pts) → Sprint-2 (22 pts) shows the team finding its sustainable pace. Sprint-3 (21 pts) continues this trend. |

---

## References

- **Template:** `4. Project Planning Phase/Planning logic.docx`
- https://www.atlassian.com/agile/project-management
- https://www.atlassian.com/agile/tutorials/how-to-do-scrum-with-jira-software
- https://www.atlassian.com/agile/tutorials/epics
- https://www.atlassian.com/agile/tutorials/sprints
- https://www.atlassian.com/agile/project-management/estimation
- https://www.atlassian.com/agile/tutorials/burndown-charts
- https://www.visual-paradigm.com/scrum/scrum-burndown-chart/
