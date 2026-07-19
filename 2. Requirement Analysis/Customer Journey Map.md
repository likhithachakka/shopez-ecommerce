# Customer Journey Map — ShopEZ

| Field | Value |
|---|---|
| **Date** | January 2025 |
| **Team ID** | ShopEZ Team |
| **Project Name** | ShopEZ — Curated E-Commerce Platform |
| **Maximum Marks** | 4 Marks |

---

## Overview

**Scenario:** A first-time visitor discovers ShopEZ, browses products, adds items to cart, places an order, and potentially returns as a repeat customer.

**Primary Persona:** Rakshita — a 28-year-old working professional who values convenience, curated choices, and a fast checkout experience. She shops online frequently but gets overwhelmed by cluttered e-commerce sites.

---

## The Journey Map

| Steps | What does the person typically experience? | Interactions | Touchpoints / Places | People | Positive Moments | Negative Moments | Areas of Opportunity |
|---|---|---|---|---|---|---|---|
| **1. Discover** | Rakshita hears about ShopEZ from a friend or finds it via a web search | Searches "curated online store" or clicks a shared link | Browser, search engine, social media | Friend who referred | Clean, modern landing page with clear branding | May not immediately trust a new/unknown store | Add trust signals: "As seen on", media mentions, user count |
| **2. Enter — Homepage** | Lands on the ShopEZ homepage. Sees the hero section with stats and call-to-action | Reads headline "Discover products that feel as good as they look", sees 500+ products stat, clicks "Browse Products" | Home page (`/`) | — | Hero stats build credibility (500+ products, 4.9/5 rating, 24/7 support) | May wonder if the products are relevant to her | Add personalized greeting or trending products section |
| **3. Browse Products** | Navigates to the Products page. Sees items grouped by category (Footwear, Accessories, Electronics, Watches) | Browses visually, reads product titles and prices, notices discount badges | Products page (`/products`), product cards | — | Products render with clear images, prices, and discount badges. Categories make navigation easy | No "Add to Cart" button directly on product card — must click "View details" which goes to a placeholder | Add "Add to Cart" button on each product card. Build the product detail page |
| **4. Search & Filter** | Decides to narrow down. Types "watch" in the search box, then selects "Watches" category from dropdown | Types keyword, selects category filter. Results narrow immediately | Products page search bar and category dropdown | — | Instant filtering without page reload. Results update as she types | "No products" message could be more helpful | Show "Did you mean?" suggestions. Display popular search terms |
| **5. Add to Cart** | Finds the Classic Leather Watch and adds it to cart by navigating to Cart page | Clicks "View details" (placeholder) then navigates to Cart via navbar | Product card → Cart page (`/cart`) | — | Item appears in cart with full details: image, title, price, quantity controls | No visual confirmation that item was added (no toast/notification) | Add a toast notification "Added to cart!" with undo option. Add direct "Add to Cart" button |
| **6. Review Cart** | Sees the cart with the watch. Decides to add one more. Adjusts quantity | Clicks "+" button to increase quantity. Sees total update | Cart page (`/cart`) | — | Quantity updates instantly. Total recalculates. Clean card layout with remove button | Empty cart state is plain text "Your cart is empty" | Show "Continue Shopping" link in empty cart. Suggest related products |
| **7. Checkout** | Clicks "Proceed to Checkout". Fills in name, email, mobile, address, pincode. Selects "Cash on Delivery" | Types into form fields, selects payment method from dropdown | Checkout page (`/checkout`) | — | One-page layout with shipping form on left, order summary on right. No account required | 5 form fields plus dropdown feels long on mobile | Add address autocomplete. Save form progress in localStorage. Add "Same as shipping" toggle for billing |
| **8. Place Order** | Clicks "Place Order" button. Waits for confirmation | Button shows "Placing order..." then redirects to success page | Checkout page → Order Confirmation | — | Success message "Order Placed Successfully! 🎉" appears immediately | No order ID or summary shown on confirmation page | Show order ID, item summary, and estimated delivery. Add "View My Orders" CTA |
| **9. Track Orders** | Later, wonders about the order status. Navigates to Orders page | Clicks "Orders" in navbar. Sees the order listed with details | Orders page (`/orders`) | — | All past orders visible with items, totals, payment method, and date | No order status tracking (pending/shipped/delivered). No expected delivery date | Add status badges (Confirmed / Shipped / Delivered). Show estimated delivery timeline |
| **10. Return & Repeat** | Happy with the experience, considers shopping again | Navigates back to Products or Home to browse again | Home / Products | — | Easy to find her way back via navbar | No recommendations based on past purchases. No "buy again" option | Add "Recently viewed" section. Show "You might also like" based on past orders. Offer loyalty discounts |

---

## Goals & Motivations (At Each Step)

| Step | Primary Goal ("Help me...") |
|---|---|
| 1. Discover | Help me find a trustworthy online store with quality products |
| 2. Enter — Homepage | Help me quickly understand what this store offers and whether it's relevant to me |
| 3. Browse Products | Help me see what products are available without feeling overwhelmed |
| 4. Search & Filter | Help me find exactly what I'm looking for with minimal effort |
| 5. Add to Cart | Help me save an item I like so I can buy it later |
| 6. Review Cart | Help me review my selections and adjust quantities easily |
| 7. Checkout | Help me complete my purchase quickly without hidden surprises |
| 8. Place Order | Help me feel confident that my order went through successfully |
| 9. Track Orders | Help me know when my order will arrive and what's happening |
| 10. Return & Repeat | Help me find new things I might like based on what I bought before |

---

## Customer Feedback Themes

### Positive Moments (What users would find enjoyable)
- Clean, uncluttered UI — no banner ads or pop-ups
- Products grouped by logical categories
- Discounts visible at a glance
- No account required to shop
- Quantity controls in cart work instantly
- One-page checkout with clear summary

### Negative Moments (What users would find frustrating)
- "View details" button goes to a placeholder page instead of a real product detail view
- No "Add to Cart" button directly on product cards
- No toast/notification when item is added to cart
- No order status tracking (pending/shipped/delivered)
- Empty cart shows only plain text message
- No personalized recommendations after purchase

### Areas of Opportunity (How we can improve each step)
- **Step 3-5:** Add direct "Add to Cart" button on product cards to reduce clicks
- **Step 5:** Add a toast notification "Added to cart ✓" with undo option
- **Step 6:** Show "Continue Shopping" link and suggested products when cart is empty
- **Step 7:** Save shipping form data in localStorage so users don't retype if they leave
- **Step 8:** Show order ID, item summary, estimated delivery on confirmation page
- **Step 9:** Add order status badges (Confirmed → Shipped → Delivered)
- **Step 10:** Add "Recently viewed" and "You might also like" product recommendations

---

## Emotional Journey Chart

```
Positive
  ↑
  │    Discover  Browse  Add to   Checkout   Track
  │      │        │      Cart       │       Orders
  │      │        │       │         │         │
  │   ┌──┐     ┌──┐    ┌──┐      ┌──┐      ┌──┐
  │   │  │     │  │    │  │      │  │      │  │
  │   │  │     │  │    │  │      │  │      │  │
  ├───┴──┴─────┴──┴────┴──┴──────┴──┴──────┴──┴──────► Time
  │                              │     │
  │                           Place   Return
  │                           Order   & Repeat
  │                              │     │
  Neutral                         └──┐ ┌──┐
  │                                  │ │  │
  │                                  │ │  │
  │                                  │ │  │
  ↓                                  └─┘  └──┐
  Negative                                     │
                                               │
                                        (No order
                                         tracking
                                         available)
```

*Note: The dip after placing an order represents the uncertainty gap — the user has placed the order but has no way to track its status. This is a key area for improvement.*

---

## Key Metrics to Track

| Stage | Metric | Current State | Target |
|---|---|---|---|
| Browse | Products viewed per session | Not tracked | 5+ products |
| Search | Search-to-result success rate | Not tracked | >80% find what they want |
| Cart | Cart add rate | Not tracked | >15% of sessions |
| Cart | Cart abandonment rate | Not tracked | <60% |
| Checkout | Checkout completion rate | Not tracked | >70% |
| Orders | Repeat purchase rate | Not tracked | >20% |
| UX | Average time to checkout | Not tracked | <3 minutes |

---

*Based on the Customer Journey Map template from the Requirement Analysis phase. Reference: MURAL / Fairplane Guided City Tours customer journey mapping methodology.*
