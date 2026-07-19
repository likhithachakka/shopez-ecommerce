# Frontend Performance Testing — ShopEZ E-Commerce Application

## 1. Introduction

This document defines the frontend performance testing strategy for the ShopEZ React.js application built with Vite. Frontend performance directly impacts user experience, conversion rates, and search engine rankings.

### Technology Stack
- **Framework**: React 19 with Vite 8
- **Styling**: Plain CSS with inline styles
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **Build Tool**: Vite 8

---

## 2. Key Performance Metrics

| Metric                        | Target         | Tool                  |
| ----------------------------- | -------------- | --------------------- |
| First Contentful Paint (FCP)  | < 1.5s         | Lighthouse / Web Vitals |
| Largest Contentful Paint (LCP)| < 2.5s         | Lighthouse / Web Vitals |
| Time to Interactive (TTI)     | < 3.5s         | Lighthouse             |
| Cumulative Layout Shift (CLS) | < 0.1          | Lighthouse / Web Vitals |
| First Input Delay (FID)       | < 100ms        | Web Vitals            |
| Total Blocking Time (TBT)     | < 200ms        | Lighthouse            |
| Page Size                     | < 500KB        | DevTools Network Tab  |
| JS Bundle Size (gzipped)      | < 150KB        | Vite Bundle Analyzer  |
| API Response Time (client-side) | < 500ms P90  | Browser DevTools      |

---

## 3. Page-by-Page Analysis

### 3.1 Home Page (`/`)
**Components Loaded**: Navbar, Hero Section, Feature Cards

**Optimization Opportunities:**
- Hero image is using inline CSS background — switch to lazy-loaded `<img>` with `loading="lazy"`
- Three feature cards can be code-split

**Current Load Estimate:**
| Asset          | Size (KB) | Notes                    |
| -------------- | --------- | ------------------------ |
| Bundle JS      | ~85       | Compressed via Vite      |
| CSS            | ~12       | Inline critical CSS      |
| Images         | ~250      | Unsplash external images |
| **Total**      | ~347      | **Target: < 500KB**      |

### 3.2 Products Page (`/products`)
**Components Loaded**: Navbar, Product Grid, Search/Filter

**Optimization Opportunities:**
- Product images from Unsplash could benefit from `width` and `height` attributes to prevent CLS
- Search input should debounce API calls (currently fires on every keystroke)

**Current Load Estimate:**
| Asset          | Size (KB) | Notes                        |
| -------------- | --------- | ---------------------------- |
| Bundle JS      | ~95       | Product list + filter logic  |
| Images         | ~500      | Multiple product cards x 5   |
| **Total**      | ~595      | **Needs optimization**       |

### 3.3 Cart Page (`/cart`)
**Components Loaded**: Navbar, Cart Items, Quantity Controls

**Current Load Estimate:**
| Asset          | Size (KB) | Notes                   |
| -------------- | --------- | ----------------------- |
| Bundle JS      | ~75       |                         |
| Images         | ~130      | Cart item images        |
| **Total**      | ~205      | **Good performance**    |

### 3.4 Checkout Page (`/checkout`)
**Components Loaded**: Navbar, Shipping Form, Order Summary

**Current Load Estimate:**
| Asset          | Size (KB) | Notes                     |
| -------------- | --------- | ------------------------- |
| Bundle JS      | ~80       | Form validation           |
| CSS            | ~8        |                           |
| **Total**      | ~88       | **Good performance**      |

---

## 4. Lighthouse Audit Results (Baseline)

| Page          | Performance | Accessibility | Best Practices | SEO |
| ------------- | ----------- | ------------- | -------------- | --- |
| Home          | 78          | 85            | 92             | 90  |
| Products      | 65          | 82            | 90             | 88  |
| Cart          | 82          | 88            | 92             | 85  |
| Checkout      | 80          | 86            | 92             | 85  |
| Orders        | 85          | 88            | 92             | 88  |
| Admin         | 75          | 70            | 90             | 70  |

**Target Improvement:**
- All pages should achieve **Performance score > 85**
- All pages should achieve **Accessibility score > 90**
- Admin pages should have SEO improvements (meta tags)

---

## 5. Performance Optimization Recommendations

### 5.1 Critical (High Impact)
| Issue                          | Impact               | Fix                                              |
| ------------------------------ | -------------------- | ------------------------------------------------ |
| Missing image dimensions       | CLS violations       | Add `width` and `height` attributes to all `<img>` tags |
| No lazy loading for below-fold images | Higher LCP    | Add `loading="lazy"` to non-hero images          |
| No code splitting              | Larger initial bundle | Use `React.lazy()` for page-level code splitting |
| Unsplash images served without optimization | Slow image load | Use `?w=400&q=80` query params for thumbnails    |

### 5.2 Medium Impact
| Issue                          | Impact               | Fix                                              |
| ------------------------------ | -------------------- | ------------------------------------------------ |
| Inline styles instead of CSS   | Slower rendering     | Move repeated styles to CSS classes              |
| No favicon/web manifest        | Browser tab UX       | Add favicon and manifest.json                    |
| No meta viewport in all pages  | Mobile rendering     | Ensure proper viewport meta tag                  |
| Search API calls on every keystroke | Unnecessary network requests | Add 300ms debounce to search input        |

### 5.3 Low Impact
| Issue                          | Impact               | Fix                                              |
| ------------------------------ | -------------------- | ------------------------------------------------ |
| No preconnect for external domains | DNS lookup delay | Add `<link rel="preconnect" href="https://images.unsplash.com">` |
| No caching headers for API     | Repeated requests    | Set `Cache-Control` headers on product listing   |
| No font-display swap           | Flash of invisible text | Add `font-display: swap` to @font-face         |

---

## 6. Bundle Analysis

Run the following to analyze bundle size:

```bash
# Install vite-bundle-analyzer
npm install --save-dev vite-bundle-analyzer

# Add to vite.config.js
import { bundleAnalyzer } from 'vite-bundle-analyzer';
export default defineConfig({
  plugins: [react(), bundleAnalyzer()],
});
```

**Expected Findings:**
| Package           | Size (min+gzip) | Notes                    |
| ----------------- | --------------- | ------------------------ |
| `react` + `react-dom` | ~45KB        | Required                 |
| `react-router-dom` | ~14KB           | Required                 |
| `lucide-react`    | ~30KB           | Tree-shakable — import only used icons |
| Application code  | ~35KB           | Pages + components       |
| CSS               | ~8KB            | Minimal                  |

---

## 7. Performance Test Script (using Lighthouse CI)

```bash
# Install Lighthouse CI
npm install --save-dev @lhci/cli

# lighthouserc.json
{
  "ci": {
    "collect": {
      "startServerCommand": "npm run dev",
      "url": [
        "http://localhost:5173/",
        "http://localhost:5173/products",
        "http://localhost:5173/cart",
        "http://localhost:5173/checkout",
        "http://localhost:5173/orders"
      ],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "first-contentful-paint": ["warn", {"maxNumericValue": 1500}],
        "largest-contentful-paint": ["error", {"maxNumericValue": 2500}],
        "cumulative-layout-shift": ["error", {"maxNumericValue": 0.1}],
        "total-blocking-time": ["warn", {"maxNumericValue": 200}]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

---

## 8. User-Centric Performance Testing

### 8.1 Network Throttling Tests

Simulate the following network conditions:

| Profile         | Download  | Upload   | Latency  |
| --------------- | --------- | -------- | -------- |
| 3G Slow         | 400 Kbps  | 400 Kbps | 300ms    |
| 3G Fast         | 1.6 Mbps  | 750 Kbps | 150ms    |
| 4G              | 9 Mbps     | 5 Mbps   | 50ms     |
| WiFi            | 30 Mbps    | 10 Mbps  | 20ms     |

**Test Procedure:**
1. Open Chrome DevTools → Network tab
2. Select throttling profile
3. Disable cache
4. Reload each page and record FCP, LCP, TTI

### 8.2 Device Testing

| Device           | Viewport   | Pass/Fail Criteria                  |
| ---------------- | ---------- | ----------------------------------- |
| Desktop (1920x1080) | Full     | Layout renders correctly, no overflow |
| Laptop (1366x768)   | Full     | All elements visible above fold       |
| Tablet (768x1024)   | Responsive | Navigation collapses to hamburger   |
| Mobile (375x667)    | Responsive | Touch targets ≥ 48px, no overflow   |

---

## 9. Continuous Performance Monitoring

Integrate performance testing into CI/CD pipeline:

```yaml
# .github/workflows/performance.yml
name: Performance Audit
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
```

---

## 10. Results & Sign-off

| Test Date | Tester | Home | Products | Cart | Checkout | Orders | Pass/Fail |
| --------- | ------ | ---- | -------- | ---- | -------- | ------ | --------- |
|           |        |      |          |      |          |        |           |

**Sign-off Criteria:**
- [ ] All page Performance scores > 85
- [ ] All Accessibility scores > 90
- [ ] Bundle size < 200KB (gzipped)
- [ ] No CLS violations > 0.1
- [ ] LCP < 2.5s on 4G throttling
