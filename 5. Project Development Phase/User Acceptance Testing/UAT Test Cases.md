# UAT Test Cases — ShopEZ E-Commerce Application

## Document Information

| Field           | Detail                                 |
| --------------- | -------------------------------------- |
| Application     | ShopEZ E-Commerce Platform             |
| Version         | 1.0.0                                  |
| Document Type   | Test Case Specification                |
| Total Test Cases | 25                                    |
| Prepared By     | QA Team                                |

---

## Test Case Format

Each test case contains:
- **Test ID**: Unique identifier
- **Test Scenario**: What is being tested
- **Preconditions**: What must be true before test
- **Test Data**: Specific data values needed
- **Test Steps**: Step-by-step actions
- **Expected Result**: What should happen
- **Actual Result**: To be filled during execution
- **Status**: Pass / Fail / Blocked

---

## Module 1: Product Browsing (TC-001 to TC-005)

### TC-001: Browse All Products

| Field            | Detail                                              |
| ---------------- | --------------------------------------------------- |
| **Test ID**      | TC-001                                              |
| **Scenario**     | User browses all available products                 |
| **Precondition** | Application running, database has seeded products   |
| **Test Data**    | None                                                |
| **Steps**        | 1. Open browser and navigate to ShopEZ<br>2. Click "Products" link in navigation<br>3. Wait for product grid to load<br>4. Observe the displayed products |
| **Expected**     | Products are displayed grouped by category (e.g., Footwear, Accessories). Each product card shows title, price, discount badge, category, stock status, and image. |
| **Actual**       |                                                     |
| **Status**       | ⬜ Pass / ⬜ Fail / ⬜ Blocked                        |

---

### TC-002: Search Products by Keyword

| Field            | Detail                                              |
| ---------------- | --------------------------------------------------- |
| **Test ID**      | TC-002                                              |
| **Scenario**     | User searches for products using a keyword          |
| **Precondition** | Products exist in the database with varied titles and descriptions |
| **Test Data**    | Search keyword: "watch"                             |
| **Steps**        | 1. Go to Products page<br>2. Click on the search input field<br>3. Type "watch"<br>4. Observe that the product list filters automatically |
| **Expected**     | Only products with "watch" in title, description, or category are displayed. Non-matching products are hidden. |
| **Actual**       |                                                     |
| **Status**       | ⬜ Pass / ⬜ Fail / ⬜ Blocked                        |

---

### TC-003: Filter Products by Category

| Field            | Detail                                              |
| ---------------- | --------------------------------------------------- |
| **Test ID**      | TC-003                                              |
| **Scenario**     | User filters products by selecting a category       |
| **Precondition** | Products exist in multiple categories               |
| **Test Data**    | Category: "Footwear"                                |
| **Steps**        | 1. Go to Products page<br>2. Click the category dropdown<br>3. Select "Footwear"<br>4. Observe the displayed products |
| **Expected**     | Only products with category "Footwear" are shown. Category heading at the top of the list reads "Footwear". |
| **Actual**       |                                                     |
| **Status**       | ⬜ Pass / ⬜ Fail / ⬜ Blocked                        |

---

### TC-004: Combined Search and Category Filter

| Field            | Detail                                              |
| ---------------- | --------------------------------------------------- |
| **Test ID**      | TC-004                                              |
| **Scenario**     | User applies both search and category filter together |
| **Precondition** | Products exist matching the combination             |
| **Test Data**    | Search: "sneakers", Category: "Footwear"            |
| **Steps**        | 1. Go to Products page<br>2. Type "sneakers" in search<br>3. Select "Footwear" from category dropdown<br>4. Observe results |
| **Expected**     | Only products that match BOTH the search term AND the selected category are displayed. |
| **Actual**       |                                                     |
| **Status**       | ⬜ Pass / ⬜ Fail / ⬜ Blocked                        |

---

### TC-005: View Product Details

| Field            | Detail                                              |
| ---------------- | --------------------------------------------------- |
| **Test ID**      | TC-005                                              |
| **Scenario**     | User views detailed information about a product     |
| **Precondition** | Products are listed on the Products page            |
| **Test Data**    | Any product with "View details" button              |
| **Steps**        | 1. Go to Products page<br>2. Click "View details" button on any product card<br>3. Observe the product detail page |
| **Expected**     | Product detail page displays: title, price (with discount if applicable), description, product image, available sizes, stock status, and category. |
| **Actual**       |                                                     |
| **Status**       | ⬜ Pass / ⬜ Fail / ⬜ Blocked                        |

---

## Module 2: Cart Management (TC-006 to TC-010)

### TC-006: Add Item to Cart

| Field            | Detail                                              |
| ---------------- | --------------------------------------------------- |
| **Test ID**      | TC-006                                              |
| **Scenario**     | User adds a product to the shopping cart            |
| **Precondition** | User is on a product detail page with available size options |
| **Test Data**    | Product: "Trendy Sneakers", Size: "8", Quantity: 1   |
| **Steps**        | 1. Navigate to product detail page<br>2. Select size "8" (if applicable)<br>3. Click "Add to Cart" button<br>4. Observe confirmation |
| **Expected**     | Item is added to cart. Cart count in navigation increases by 1. |
| **Actual**       |                                                     |
| **Status**       | ⬜ Pass / ⬜ Fail / ⬜ Blocked                        |

---

### TC-007: View Cart Contents

| Field            | Detail                                              |
| ---------------- | --------------------------------------------------- |
| **Test ID**      | TC-007                                              |
| **Scenario**     | User views items currently in the cart              |
| **Precondition** | Cart has at least one item                          |
| **Test Data**    | None                                                |
| **Steps**        | 1. Click "Cart" link in navigation<br>2. Observe cart page |
| **Expected**     | Cart page displays: each item's image, title, category, individual price, quantity selector (+/- buttons), item subtotal. Total is shown at bottom with "Proceed to Checkout" button. |
| **Actual**       |                                                     |
| **Status**       | ⬜ Pass / ⬜ Fail / ⬜ Blocked                        |

---

### TC-008: Update Item Quantity in Cart

| Field            | Detail                                              |
| ---------------- | --------------------------------------------------- |
| **Test ID**      | TC-008                                              |
| **Scenario**     | User increases or decreases item quantity in cart   |
| **Precondition** | Cart has at least one item                          |
| **Test Data**    | Initial quantity: 1, New quantity: 3                 |
| **Steps**        | 1. Go to Cart page<br>2. Click "+" button twice to increase quantity to 3<br>3. Observe the updated quantity and total<br>4. Click "-" button once to decrease back to 2<br>5. Observe the updated quantity and total |
| **Expected**     | Quantity updates correctly. Item subtotal and cart total recalculate correctly. Quantity cannot go below 1. |
| **Actual**       |                                                     |
| **Status**       | ⬜ Pass / ⬜ Fail / ⬜ Blocked                        |

---

### TC-009: Remove Item from Cart

| Field            | Detail                                              |
| ---------------- | --------------------------------------------------- |
| **Test ID**      | TC-009                                              |
| **Scenario**     | User removes an item from the cart                  |
| **Precondition** | Cart has at least one item                          |
| **Test Data**    | None                                                |
| **Steps**        | 1. Go to Cart page<br>2. Click "Remove" button on one cart item<br>3. Observe the cart |
| **Expected**     | Item is removed from the cart display. Cart total recalculates. If no items remain, "Your cart is empty" message is shown. |
| **Actual**       |                                                     |
| **Status**       | ⬜ Pass / ⬜ Fail / ⬜ Blocked                        |

---

### TC-010: Empty Cart State

| Field            | Detail                                              |
| ---------------- | --------------------------------------------------- |
| **Test ID**      | TC-010                                              |
| **Scenario**     | User views cart when no items are present           |
| **Precondition** | Cart is empty (all items removed or fresh session)  |
| **Test Data**    | None                                                |
| **Steps**        | 1. Go to Cart page<br>2. Observe the displayed content |
| **Expected**     | Cart page shows "Your cart is empty" message. No checkout buttons are visible. |
| **Actual**       |                                                     |
| **Status**       | ⬜ Pass / ⬜ Fail / ⬜ Blocked                        |

---

## Module 3: Checkout & Order (TC-011 to TC-015)

### TC-011: Proceed to Checkout

| Field            | Detail                                              |
| ---------------- | --------------------------------------------------- |
| **Test ID**      | TC-011                                              |
| **Scenario**     | User proceeds from cart to checkout                 |
| **Precondition** | Cart has at least one item                          |
| **Test Data**    | None                                                |
| **Steps**        | 1. Go to Cart page<br>2. Click "Proceed to Checkout" button<br>3. Observe checkout page |
| **Expected**     | Checkout page displays shipping form (name, email, mobile, address, pincode), payment method selector, and order summary with items and total. |
| **Actual**       |                                                     |
| **Status**       | ⬜ Pass / ⬜ Fail / ⬜ Blocked                        |

---

### TC-012: Place Order with Cash on Delivery

| Field            | Detail                                              |
| ---------------- | --------------------------------------------------- |
| **Test ID**      | TC-012                                              |
| **Scenario**     | User places an order with Cash on Delivery          |
| **Precondition** | Cart has items, user is on checkout page            |
| **Test Data**    | Name: "Ravi Kumar", Email: "ravi@example.com", Mobile: "9876543210", Address: "42, MG Road, Bangalore", Pincode: "560038", Payment: "COD" |
| **Steps**        | 1. Fill all shipping form fields<br>2. Select "Cash on Delivery"<br>3. Click "Place Order" button<br>4. Wait for confirmation |
| **Expected**     | Order is placed successfully. User is redirected to order success page showing "Order Placed Successfully! 🎉". Cart is cleared. |
| **Actual**       |                                                     |
| **Status**       | ⬜ Pass / ⬜ Fail / ⬜ Blocked                        |

---

### TC-013: Place Order with Empty Cart

| Field            | Detail                                              |
| ---------------- | --------------------------------------------------- |
| **Test ID**      | TC-013                                              |
| **Scenario**     | User attempts to place an order with empty cart     |
| **Precondition** | Cart is empty                                       |
| **Test Data**    | None                                                |
| **Steps**        | 1. Ensure cart is empty<br>2. Try to place an order (e.g., by navigating directly to checkout form submission) |
| **Expected**     | System shows alert "Your cart is empty" or prevents order placement. |
| **Actual**       |                                                     |
| **Status**       | ⬜ Pass / ⬜ Fail / ⬜ Blocked                        |

---

### TC-014: View Order History

| Field            | Detail                                              |
| ---------------- | --------------------------------------------------- |
| **Test ID**      | TC-014                                              |
| **Scenario**     | User views their order history                      |
| **Precondition** | At least one order has been placed by the user      |
| **Test Data**    | None                                                |
| **Steps**        | 1. Click "Orders" link in navigation<br>2. Observe the orders page |
| **Expected**     | Orders are listed with: order date, customer name, email, delivery address, items ordered with quantities, individual prices, total, payment method. |
| **Actual**       |                                                     |
| **Status**       | ⬜ Pass / ⬜ Fail / ⬜ Blocked                        |

---

### TC-015: Order Success Confirmation

| Field            | Detail                                              |
| ---------------- | --------------------------------------------------- |
| **Test ID**      | TC-015                                              |
| **Scenario**     | User sees order success confirmation after placing order |
| **Precondition** | Order has just been placed successfully             |
| **Test Data**    | None                                                |
| **Steps**        | 1. Complete checkout and place order<br>2. Observe the redirect page |
| **Expected**     | "Order Placed Successfully! 🎉" message is displayed on the confirmation page. |
| **Actual**       |                                                     |
| **Status**       | ⬜ Pass / ⬜ Fail / ⬜ Blocked                        |

---

## Module 4: Navigation & UI (TC-016 to TC-020)

### TC-016: Home Page Load

| Field            | Detail                                              |
| ---------------- | --------------------------------------------------- |
| **Test ID**      | TC-016                                              |
| **Scenario**     | User opens the ShopEZ application                   |
| **Precondition** | Application is running                              |
| **Test Data**    | None                                                |
| **Steps**        | 1. Open browser and navigate to ShopEZ home page<br>2. Observe the page content |
| **Expected**     | Home page displays: Navbar with ShopEZ logo and navigation links (Home, Products, Cart, Orders, Admin), Hero section with headline and description, stat cards (500+ products, 24/7 support, 4.9/5 rating), three feature cards (Smart browsing, Seamless checkout, Order tracking). |
| **Actual**       |                                                     |
| **Status**       | ⬜ Pass / ⬜ Fail / ⬜ Blocked                        |

---

### TC-017: Navigation Links

| Field            | Detail                                              |
| ---------------- | --------------------------------------------------- |
| **Test ID**      | TC-017                                              |
| **Scenario**     | User navigates using the navigation bar links       |
| **Precondition** | Application is running                              |
| **Test Data**    | None                                                |
| **Steps**        | 1. Click "Home" link → observe page<br>2. Click "Products" link → observe page<br>3. Click "Cart" link → observe page<br>4. Click "Orders" link → observe page<br>5. Click "Admin" link → observe page<br>6. Click ShopEZ logo → observe |
| **Expected**     | Each link navigates to the correct corresponding page. URL changes appropriately. Active page may be indicated. ShopEZ logo returns to Home. |
| **Actual**       |                                                     |
| **Status**       | ⬜ Pass / ⬜ Fail / ⬜ Blocked                        |

---

### TC-018: Admin Page

| Field            | Detail                                              |
| ---------------- | --------------------------------------------------- |
| **Test ID**      | TC-018                                              |
| **Scenario**     | User views the admin dashboard                      |
| **Precondition** | Products exist in the database                      |
| **Test Data**    | None                                                |
| **Steps**        | 1. Click "Admin" link in navigation<br>2. Observe admin page |
| **Expected**     | Admin page displays "Admin Dashboard" heading followed by a list of all products with title, category, and price. |
| **Actual**       |                                                     |
| **Status**       | ⬜ Pass / ⬜ Fail / ⬜ Blocked                        |

---

### TC-019: Responsive Layout (Mobile - 375px)

| Field            | Detail                                              |
| ---------------- | --------------------------------------------------- |
| **Test ID**      | TC-019                                              |
| **Scenario**     | Application displays correctly on mobile viewport   |
| **Precondition** | Application is running                              |
| **Test Data**    | Viewport: 375px × 667px (iPhone SE)                |
| **Steps**        | 1. Open Chrome DevTools<br>2. Set viewport to 375px × 667px<br>3. Navigate through all pages (Home, Products, Cart, Orders, Admin)<br>4. Observe layout on each page |
| **Expected**     | All content is visible without horizontal scrolling. Navigation links are readable. Product grid stacks in single column. Text and buttons are appropriately sized. Touch targets are minimum 48px. |
| **Actual**       |                                                     |
| **Status**       | ⬜ Pass / ⬜ Fail / ⬜ Blocked                        |

---

### TC-020: Responsive Layout (Tablet - 768px)

| Field            | Detail                                              |
| ---------------- | --------------------------------------------------- |
| **Test ID**      | TC-020                                              |
| **Scenario**     | Application displays correctly on tablet viewport   |
| **Precondition** | Application is running                              |
| **Test Data**    | Viewport: 768px × 1024px (iPad)                   |
| **Steps**        | 1. Open Chrome DevTools<br>2. Set viewport to 768px × 1024px<br>3. Navigate through all pages<br>4. Observe layout |
| **Expected**     | Content adjusts to tablet width. Hero section shows side-by-side layout. Product grid shows 2 columns. No elements are cut off or overlapping. |
| **Actual**       |                                                     |
| **Status**       | ⬜ Pass / ⬜ Fail / ⬜ Blocked                        |

---

## Module 5: Error Handling (TC-021 to TC-025)

### TC-021: API Failure — Server Down

| Field            | Detail                                              |
| ---------------- | --------------------------------------------------- |
| **Test ID**      | TC-021                                              |
| **Scenario**     | User browses products when backend API is down      |
| **Precondition** | Backend server is stopped                           |
| **Test Data**    | None                                                |
| **Steps**        | 1. Stop the backend server (Ctrl+C in terminal)<br>2. Go to Products page<br>3. Observe the behavior |
| **Expected**     | Application should gracefully display fallback product data instead of crashing or showing a blank page. No unhandled errors shown to user. |
| **Actual**       |                                                     |
| **Status**       | ⬜ Pass / ⬜ Fail / ⬜ Blocked                        |

---

### TC-022: Invalid Product ID

| Field            | Detail                                              |
| ---------------- | --------------------------------------------------- |
| **Test ID**      | TC-022                                              |
| **Scenario**     | User navigates to a product with an invalid ID     |
| **Precondition** | Application is running                              |
| **Test Data**    | Invalid product ID                                  |
| **Steps**        | 1. Navigate to `/product/invalid-id-12345`<br>2. Observe the page behavior |
| **Expected**     | Application handles gracefully — shows error message or redirects. Application does not crash or show blank white screen. |
| **Actual**       |                                                     |
| **Status**       | ⬜ Pass / ⬜ Fail / ⬜ Blocked                        |

---

### TC-023: Empty Search Results

| Field            | Detail                                              |
| ---------------- | --------------------------------------------------- |
| **Test ID**      | TC-023                                              |
| **Scenario**     | User searches for a product that does not exist    |
| **Precondition** | Products exist in database                          |
| **Test Data**    | Search keyword: "zzzznotexistxyz"                   |
| **Steps**        | 1. Go to Products page<br>2. Type "zzzznotexistxyz" in search<br>3. Observe the page |
| **Expected**     | "No products match your search" message is displayed. Suggestion to try different keywords may be shown. |
| **Actual**       |                                                     |
| **Status**       | ⬜ Pass / ⬜ Fail / ⬜ Blocked                        |

---

### TC-024: Checkout with Missing Required Fields

| Field            | Detail                                              |
| ---------------- | --------------------------------------------------- |
| **Test ID**      | TC-024                                              |
| **Scenario**     | User submits checkout form with missing fields      |
| **Precondition** | Cart has items, user is on checkout page            |
| **Test Data**    | Leave "Name" field empty, fill all other fields     |
| **Steps**        | 1. Fill all checkout fields except "Name"<br>2. Select "Cash on Delivery"<br>3. Click "Place Order"<br>4. Observe |
| **Expected**     | Form submission is prevented. User is notified about the missing required field. Order is not placed. |
| **Actual**       |                                                     |
| **Status**       | ⬜ Pass / ⬜ Fail / ⬜ Blocked                        |

---

### TC-025: Network Throttling — Slow 3G

| Field            | Detail                                              |
| ---------------- | --------------------------------------------------- |
| **Test ID**      | TC-025                                              |
| **Scenario**     | User browses the application on slow network (3G)  |
| **Precondition** | Application is running                              |
| **Test Data**    | Network throttling: Slow 3G (400 Kbps, 300ms latency) |
| **Steps**        | 1. Open Chrome DevTools → Network tab<br>2. Set throttling to "Slow 3G"<br>3. Disable cache<br>4. Reload Products page<br>5. Observe loading state |
| **Expected**     | Loading indicator is shown while data is being fetched. Product data eventually loads and displays correctly. No timeout errors or blank state. |
| **Actual**       |                                                     |
| **Status**       | ⬜ Pass / ⬜ Fail / ⬜ Blocked                        |

---

## Appendix: Test Data Reference

### Sample Products

| ID         | Title                  | Category    | Price | Discount |
| ---------- | ---------------------- | ----------- | ----- | -------- |
| sample-1   | Trendy Sneakers        | Footwear    | ₹1999 | 10%      |
| sample-2   | Classic Leather Watch  | Watches     | ₹3499 | 15%      |
| sample-3   | Wireless Headphones    | Electronics | ₹2499 | 20%      |
| sample-4   | Smart Fitness Watch    | Watches     | ₹2799 | 12%      |
| sample-5   | Leather Wallet         | Accessories | ₹1299 | 5%       |

### Test User

| Field     | Value (Guest) |
| --------- | ------------- |
| userId    | guest         |
| Name      | [User Input]  |
| Email     | [User Input]  |
| Mobile    | [User Input]  |
| Payment   | COD / Online  |
