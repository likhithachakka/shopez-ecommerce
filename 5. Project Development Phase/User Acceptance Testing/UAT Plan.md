# User Acceptance Testing (UAT) Plan — ShopEZ E-Commerce Application

## 1. Document Control

| Field           | Detail                                 |
| --------------- | -------------------------------------- |
| **Application** | ShopEZ E-Commerce Platform             |
| **Version**     | 1.0.0                                  |
| **Prepared By** | QA Team                                |
| **Date**        | July 2026                              |
| **Status**      | Draft                                  |

---

## 2. Introduction

User Acceptance Testing (UAT) is the final phase of testing before the ShopEZ application is released to end users. It validates that the system meets business requirements and is ready for production deployment.

### 2.1 Objectives

- Verify that all business requirements from the Ideation and Requirements Analysis phases are implemented
- Validate end-to-end user flows for browsing, cart management, checkout, and order tracking
- Confirm the application works as expected in a production-like environment
- Identify any gaps between implemented functionality and user expectations
- Obtain formal sign-off from stakeholders

### 2.2 Scope

**In Scope:**
- Product catalog browsing and search
- Product detail view with size selection
- Cart add/update/remove operations
- Checkout flow with shipping information
- Order placement and confirmation
- Order history viewing
- Admin product management
- Responsive design on desktop and mobile

**Out of Scope:**
- Performance testing (covered in separate document)
- Security penetration testing
- Unit and integration tests (developer responsibility)
- Third-party payment gateway integration (future scope)

---

## 3. Test Environment

### 3.1 Environment Details

| Component          | Technology             | Environment                        |
| ------------------ | ---------------------- | ---------------------------------- |
| Frontend           | React 19 + Vite 8      | `http://localhost:5173` (dev)      |
| Backend API         | Express.js + Node.js  | `http://localhost:5000` (dev)      |
| Database            | MongoDB Atlas M0       | Test cluster `shopez_test`         |
| Browser             | Chrome 120+, Firefox 120+, Edge 120+ | Desktop & Mobile |

### 3.2 Test Data

- **Products**: 5 sample products (Footwear, Watches, Accessories, Electronics)
- **Users**: 2 test user accounts (regular user, admin)
- **Carts**: Pre-populated cart items for cart-related tests

---

## 4. UAT Team

| Role             | Name              | Responsibilities                     |
| ---------------- | ----------------- | ------------------------------------ |
| UAT Coordinator  | [Name]            | Schedule, coordinate, gather sign-off |
| Business Analyst | [Name]            | Validate requirements coverage       |
| Test Lead        | [Name]            | Test execution, defect tracking      |
| End User Rep     | [Name]            | Real-world usage validation          |
| Developer        | [Name]            | Bug fixes during UAT                 |

---

## 5. UAT Test Scenarios

### 5.1 Product Browsing (UC-001 to UC-005)

| Test ID  | Scenario                    | Precondition               | Steps                                                   | Expected Result                             |
| -------- | --------------------------- | -------------------------- | ------------------------------------------------------- | ------------------------------------------- |
| UC-001   | Browse all products          | Database has sample products | 1. Open ShopEZ<br>2. Click "Products" link<br>3. Observe product grid | Products displayed in category groups |
| UC-002   | Search products by keyword  | Products exist in DB       | 1. Go to Products page<br>2. Type "watch" in search<br>3. Observe results | Only matching products shown |
| UC-003   | Filter by category          | Products in multiple categories | 1. Go to Products page<br>2. Select "Footwear" from category dropdown | Only footwear products displayed |
| UC-004   | Search + category combined  | Products exist             | 1. Go to Products page<br>2. Search "sneakers"<br>3. Select "Footwear" | Only matching footwear products |
| UC-005   | View product details        | Product exists             | 1. Browse products<br>2. Click "View details" on a product | Product detail page shows title, price, description, image, sizes |

### 5.2 Cart Management (UC-006 to UC-010)

| Test ID  | Scenario                    | Precondition               | Steps                                                   | Expected Result                             |
| -------- | --------------------------- | -------------------------- | ------------------------------------------------------- | ------------------------------------------- |
| UC-006   | Add item to cart            | Product exists             | 1. View product details<br>2. Select size<br>3. Click "Add to Cart" | Item added, cart count increases |
| UC-007   | View cart contents          | Cart has items             | 1. Click "Cart" link<br>2. Observe cart items           | Cart displays items with title, price, quantity |
| UC-008   | Update item quantity        | Cart has items             | 1. Go to Cart<br>2. Click "+" to increase quantity     | Quantity updates, total recalculates |
| UC-009   | Remove item from cart       | Cart has items             | 1. Go to Cart<br>2. Click "Remove" on an item          | Item removed from cart |
| UC-010   | Empty cart message          | Cart is empty              | 1. Go to Cart<br>2. Observe message                     | "Your cart is empty" message displayed |

### 5.3 Checkout & Order (UC-011 to UC-015)

| Test ID  | Scenario                    | Precondition               | Steps                                                   | Expected Result                             |
| -------- | --------------------------- | -------------------------- | ------------------------------------------------------- | ------------------------------------------- |
| UC-011   | Proceed to checkout         | Cart has items             | 1. Go to Cart<br>2. Click "Proceed to Checkout"        | Checkout form displayed with shipping fields |
| UC-012   | Place order (COD)           | Cart has items, form filled | 1. Fill shipping form<br>2. Select "Cash on Delivery"<br>3. Click "Place Order" | Order placed, redirected to success page |
| UC-013   | Place order with empty cart | Cart is empty              | 1. Click "Place Order" without items<br>2. Observe      | Alert: "Your cart is empty" |
| UC-014   | View order history          | Orders exist for user      | 1. Click "Orders" link<br>2. Observe order list         | Orders displayed with items, totals, date |
| UC-015   | Order success page          | Order just placed          | 1. After placing order<br>2. Observe confirmation       | "Order Placed Successfully" message shown |

### 5.4 Navigation & UI (UC-016 to UC-020)

| Test ID  | Scenario                    | Precondition               | Steps                                                   | Expected Result                             |
| -------- | --------------------------- | -------------------------- | ------------------------------------------------------- | ------------------------------------------- |
| UC-016   | Home page loads             | Application running        | 1. Open ShopEZ<br>2. Observe home page                  | Hero section, feature cards, stats displayed |
| UC-017   | Navigation links            | Application running        | 1. Click each nav link<br>2. Observe page change        | Each link navigates to correct page |
| UC-018   | Admin page                  | Application running        | 1. Click "Admin" link<br>2. Observe                     | Product list shown in admin view |
| UC-019   | Responsive layout (mobile)  | Mobile viewport            | 1. Resize to 375px width<br>2. Observe layout           | Content stacks vertically, no overflow |
| UC-020   | Responsive layout (tablet)  | Tablet viewport            | 1. Resize to 768px width<br>2. Observe layout           | Navigation and grid adjusted |

### 5.5 Error Handling (UC-021 to UC-025)

| Test ID  | Scenario                    | Precondition               | Steps                                                   | Expected Result                             |
| -------- | --------------------------- | -------------------------- | ------------------------------------------------------- | ------------------------------------------- |
| UC-021   | API failure (server down)   | Server not running         | 1. Stop backend server<br>2. Browse products            | Fallback products shown, graceful error |
| UC-022   | Invalid product ID          | —                          | 1. Navigate to `/product/invalid-id`<br>2. Observe      | Error message or redirect, no crash |
| UC-023   | Empty search results        | No matching products       | 1. Search "zzzznotexist"<br>2. Observe                  | "No products match" message displayed |
| UC-024   | Checkout with missing fields | Cart has items            | 1. Leave name field empty<br>2. Click "Place Order"     | Client-side validation prevents submission |
| UC-025   | Network timeout             | Simulate slow network      | 1. Throttle to Slow 3G in DevTools<br>2. Browse to Products | Loading indicator shown, eventual data load |

---

## 6. Test Execution Schedule

| Phase             | Duration | Activities                                    |
| ----------------- | -------- | --------------------------------------------- |
| Environment Setup | 1 day    | Deploy test environment, seed test data       |
| Smoke Tests       | 0.5 day  | Verify core functionality is working          |
| Full UAT Cycle 1  | 3 days   | Execute all test scenarios, log defects       |
| Bug Fix Window    | 2 days   | Developers fix critical/high defects          |
| Full UAT Cycle 2  | 2 days   | Re-test fixed defects, verify all scenarios   |
| Sign-off          | 0.5 day  | Stakeholder review, formal sign-off           |

---

## 7. Defect Management

### 7.1 Severity Levels

| Severity | Description                                      | Response Time |
| -------- | ------------------------------------------------ | ------------- |
| Critical | Application crashes, data loss, core flow broken | Immediate     |
| High     | Major feature not working, incorrect behavior    | < 24 hours    |
| Medium   | Non-critical feature issue, UI misalignment      | < 48 hours    |
| Low      | Cosmetic issues, minor text errors               | < 1 week      |

### 7.2 Defect Log Template

```markdown
**Defect ID:** UAT-001
**Test ID:** UC-012
**Severity:** High
**Description:** Placing an order does not clear the cart
**Steps to Reproduce:**
1. Add item to cart
2. Complete checkout and place order
3. Go back to cart page
**Expected:** Cart should be empty
**Actual:** Cart still shows the ordered items
**Environment:** Chrome 120, Windows 11
**Status:** Open
```

---

## 8. UAT Test Results Summary

| Phase    | Total Tests | Passed | Failed | Blocked | Pass % |
| -------- | ----------- | ------ | ------ | ------- | ------ |
| Cycle 1  | 25          |        |        |         |        |
| Cycle 2  | 25          |        |        |         |        |

### Test Execution Log

| Test ID  | Scenario                        | Cycle 1     | Cycle 2     | Notes         |
| -------- | ------------------------------- | ----------- | ----------- | ------------- |
| UC-001   | Browse all products             | ⬜          | ⬜          |               |
| UC-002   | Search products by keyword      | ⬜          | ⬜          |               |
| UC-003   | Filter by category              | ⬜          | ⬜          |               |
| UC-004   | Search + category combined      | ⬜          | ⬜          |               |
| UC-005   | View product details            | ⬜          | ⬜          |               |
| UC-006   | Add item to cart                | ⬜          | ⬜          |               |
| UC-007   | View cart contents              | ⬜          | ⬜          |               |
| UC-008   | Update item quantity            | ⬜          | ⬜          |               |
| UC-009   | Remove item from cart           | ⬜          | ⬜          |               |
| UC-010   | Empty cart message              | ⬜          | ⬜          |               |
| UC-011   | Proceed to checkout             | ⬜          | ⬜          |               |
| UC-012   | Place order (COD)               | ⬜          | ⬜          |               |
| UC-013   | Place order with empty cart     | ⬜          | ⬜          |               |
| UC-014   | View order history              | ⬜          | ⬜          |               |
| UC-015   | Order success page              | ⬜          | ⬜          |               |
| UC-016   | Home page loads                 | ⬜          | ⬜          |               |
| UC-017   | Navigation links                | ⬜          | ⬜          |               |
| UC-018   | Admin page                      | ⬜          | ⬜          |               |
| UC-019   | Responsive layout (mobile)      | ⬜          | ⬜          |               |
| UC-020   | Responsive layout (tablet)      | ⬜          | ⬜          |               |
| UC-021   | API failure (server down)       | ⬜          | ⬜          |               |
| UC-022   | Invalid product ID              | ⬜          | ⬜          |               |
| UC-023   | Empty search results            | ⬜          | ⬜          |               |
| UC-024   | Checkout with missing fields    | ⬜          | ⬜          |               |
| UC-025   | Network timeout                 | ⬜          | ⬜          |               |

---

## 9. Entry & Exit Criteria

### 9.1 Entry Criteria
- [ ] All development features are completed and deployed to test environment
- [ ] Unit and integration tests have passed
- [ ] Test environment is stable and accessible
- [ ] Test data is seeded and verified
- [ ] UAT team members are identified and available

### 9.2 Exit Criteria
- [ ] All critical and high-severity defects are resolved and verified
- [ ] At least 95% of test scenarios pass
- [ ] All medium-severity defects have a documented workaround
- [ ] Stakeholders have reviewed and signed off
- [ ] UAT completion report is published

---

## 10. Sign-off

| Role              | Name   | Signature | Date   |
| ----------------- | ------ | --------- | ------ |
| Business Analyst  |        |           |        |
| Product Owner     |        |           |        |
| QA Lead           |        |           |        |
| Development Lead  |        |           |        |

**Decision:** 
☐ Approved for Production
☐ Approved with Conditions
☐ Not Approved
