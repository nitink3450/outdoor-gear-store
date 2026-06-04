# Architectural Decisions & Design Rationale

**This document outlines the key architectural decisions made during the development of the Premium Outdoor Gear Product Detail Page.**

---

## 1. API Integration: Why i choose - https://fakestoreapi.com ?

### Why Fake Store API?

- ✅ **Free:** No authentication required
- ✅ **Realistic Data:** Actual product-like data structure
- ✅ **Simple Endpoints:** Easy to understand REST API

### Limitations & Solutions

| Limitation              | Solution                              |
| ----------------------- | ------------------------------------- |
| No color variants       | Mocked with custom color data         |
| No size variants        | Mocked size options (XS-XXL)          |
| No available stock data | Mocked stock data using custom values |
| No Image arrays         | Mocked with custom images using CSS   |
| No discount prices      | Mocked using higher product price     |
| No discount prices      | Mocked using higher product price     |

### Extra implementations

1. Implemented stock based on color and reduce the stock when added to cart
2. Implemented quantity selector with max quantity based on stock

---

## 2. Why i chose custom swiper over swiper.js?

- **Native CSS Snap Points:** Uses CSS scroll-snapping for native, hardware-accelerated touch gestures.
- **Zero JS Overhead:** 0kb extra dependency bundle weight. Impeccable load times.
- **No Compatibility Issues:** Avoided external swiper library issues with React 19.

---

## 3. Why split state into CartContext and CartProvider?

- **HMR Preservation:** Fast Refresh only functions when a file only exports components.
- **Decoupled Hook/Provider:** Kept `CartContext.tsx` for context/hook exports and moved `CartProvider.tsx` component into its own file to maintain hot-reloads.

---

## 4. Global State Management: Why React Context API?

- **Built-in & Lightweight:** No external state management libraries (such as Redux or Zustand) are required. This reduces bundle size, avoids additional dependency overhead, and matches the project scale.
- **Perfect Fit for Simple Cart State:** The shopping cart state only needs to be shared across a few components (Header and ProductDetails), making Context API the most suitable choice without over-engineering.
- **Native React Integration:** Integrates seamlessly with React's built-in state primitives and lifecycle, ensuring predictable state updates and context propagation.

---

## 5. Product Details Section: Why Tabs over Accordion?

- **Side-by-side comparison:** Tabs let users switch between Description, Specifications, and Reviews instantly without scrolling. An accordion stacks panels vertically, pushing content further down the page.
- **Predictable content height:** Each tab panel occupies the same viewport region, keeping the page layout stable. Accordions cause layout shifts as panels expand/collapse.
- **Desktop-first UX:** On wide screens (our primary layout), horizontal tab bars are the standard pattern for product detail sections — users expect them. Accordions are better suited for FAQs or mobile-only layouts.
- **Cleaner visual hierarchy:** A single active panel with a highlighted tab indicator gives a clear focus state. With accordions, multiple panels can be open simultaneously, splitting the user's attention.

---

## 6. Simulated Async Add to Cart: Loading and Error States

### Rationale

In real-world e-commerce platforms, adding items to a cart is rarely an instantaneous local operation. It requires a backend API call to verify stock, lock inventory, and update the session state. To emulate this behavior, we wired the "Add to Cart" action to a mock async function.

### Design Choices

- **Simulated Latency:** We introduced a `1.2-second` delay using a Promise-based timeout. This simulates a real server latency and gives the user visual confirmation that their request is being processed.
- **Button Loading State:** During the network simulation, the Add to Cart button is disabled to prevent duplicate submissions, and the text transitions to "Adding to Cart..." alongside a spinning indicator.
- **Simulated Network Failures:** We introduced a `10%` random failure rate (using `Math.random() < 0.1`) to mimic connectivity drops or server timeouts.
- **Graceful Error Recovery:** If a failure occurs, the UI displays a clear banner with error details. Changing product color, size, or quantity resets the feedback state, encouraging the user to retry the action.
