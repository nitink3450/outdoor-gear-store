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
