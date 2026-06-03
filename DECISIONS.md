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
