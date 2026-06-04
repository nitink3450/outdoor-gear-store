# 🌲 Outdoor Gear Store - Premium Product Detail Page

🚀 **Live Deployment URL:** [https://gear-store-nua.vercel.app/](https://gear-store-nua.vercel.app/)

---

## 📋 Table of Contents

1. [Setup and Installation](#-setup-and-installation)
2. [Folder Structure](#-folder-structure)
3. [Key Features](#-key-features)
4. [Design Decisions](#-design-decisions)
5. [Known Trade-offs & Limitations](#-known-trade-offs--limitations)
6. [Tech Stack](#-tech-stack)
7. [Performance & SEO](#-performance--seo)

---

## ⚡ Setup and Installation

Follow these steps to run the project locally:

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 1. Clone the Repository

```bash
git clone https://github.com/nitink3450/outdoor-gear-store.git
cd outdoor-gear-store
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

Start the local server with hot module replacement (HMR):

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

### 4. Build for Production

To bundle the application for production deployment:

```bash
npm run build
```

This runs TypeScript type checking (`tsc`) and compiles the assets using Vite into the `dist/` directory.

### 5. Preview Production Build

Preview the built application locally:

```bash
npm run preview
```

---

## 📂 Folder Structure

The project follows a modular, feature-based directory structure for high scalability and clean separation of concerns:

```
outdoor-gear-store/
├── public/                       # Static public assets
├── src/
│   ├── assets/                   # Local assets (icons, images, logos)
│   ├── components/               # Reusable UI components
│   │   ├── CartSidebar/          # Sliding checkout sidebar
│   │   ├── Header/               # Global navigation bar & cart trigger
│   │   ├── ImageGallery/         # Snap-scroll slider with thumbnail gallery
│   │   ├── ProductDetailsSection/# Tabbed details section (below fold)
│   │   └── ProductInfoPanel/     # Main product config panel (options, buy box)
│   ├── data/                     # Configuration and local mock data
│   │   ├── config.ts             # Site-wide settings
│   │   └── productDetails.ts     # Tab specifications & customer reviews data
│   ├── hooks/                    # Custom React hooks
│   │   └── useProductDetails.ts  # Fetches and formats data from Fake Store API
│   ├── pages/                    # Main route page controllers
│   │   ├── ProductDetails.tsx    # Page template for product layout grid
│   │   └── ProductDetails.module.scss
│   ├── router/                   # React Router routing configuration
│   │   └── index.tsx
│   ├── stores/                   # State stores (React Context API)
│   │   ├── CartContext.tsx       # Context and custom useCart hook definition
│   │   └── CartProvider.tsx      # Provider wrapping state & local storage effects
│   ├── styles/                   # Global CSS & SCSS variables/themes
│   │   ├── _variables.scss       # Design tokens (colors, animations, sizing)
│   │   └── global.scss           # Global resets and typographic baselines
│   ├── App.tsx                   # Root component
│   └── main.tsx                  # React DOM mounting entrypoint
├── vercel.json                   # Server rewrite configurations for Vercel
├── vite.config.ts                # Vite compile config
├── tsconfig.json                 # TypeScript compiler options
├── DECISIONS.md                  # Comprehensive architectural decision log
└── README.md                     # Setup instructions & developer documentation
```

---

## ✨ Key Features

- **Fake Store API Integration:** Dynamically fetches live product metadata (price, basic description, ratings) from `https://fakestoreapi.com`.
- **Global Shopping Cart State:** Fully reactive cart managed by React Context API. Color, size, and quantity options are validated before adding.
- **Inventory/Stock Management:** Local storage tracks the stock levels of each specific color + size variant. The app reduces stock as you add items to the cart and prevents users from exceeding available stock.
- **Persistent UI State:** Cart items and remaining variant inventory are persisted across reloads using `localStorage`.
- **Sliding Cart Sidebar:** Smooth slide-out panel allowing users to adjust item quantities, remove specific variants, clear the cart, and view the checkout summary.
- **Interactive Multi-Image Gallery:** Responsive gallery supporting desktop hover-to-zoom, thumbnail selection, and touch-friendly CSS scroll-snap transitions for mobile viewports.
- **Below-Fold Tabbed Section:** Implements custom tabs displaying the API-fetched product description, detailed specifications (key-value table), and mock customer reviews (star ratings, date, verified buyer cards).
- **Vercel SPA Handling:** Configured with `vercel.json` rewrites to guarantee React Router path transitions function on hard refreshes.
- **Simulated Async Add to Cart:** The Add to Cart action mimics real-world network requests with a 1.2-second loading state, disabled actions to prevent duplicate requests, and a simulated 30% failure rate for robust validation.

---

## 🧠 Design Decisions

A summary of key architectural choices:

1. **React Context API over Redux/Zustand:** Built-in hooks (`useContext`, `useReducer`) offer zero-dependency state sharing suitable for a lightweight storefront application without third-party bloating.
2. **Custom Scroll-Snapping Slider over Swiper.js:** Utilizes native CSS scroll snap points (`scroll-snap-type: x mandatory`). This reduces JavaScript bundle size and guarantees smooth native performance without React 19 version conflict concerns.
3. **Context & Provider Code Separation:** We split `CartContext.tsx` and `CartProvider.tsx` into separate files. This preserves Vite's Hot Module Replacement (HMR) capabilities, as Vite's HMR requires component-only exports.
4. **Tabs over Accordion for Below-Fold Section:** Chosen for desktop layout conventions, clean user focus, lack of vertical page layout shifts, and rapid tab switching.
5. **Simulated API Latency & Failures:** Wired to a Promise-based timeout with a 30% random error simulation. This allows verification of UX loading indicator animations and error banner displays in real-world network congestion scenarios.

---

## ⚖️ Known Trade-offs & Limitations

1. **Fake Store API Limitations:**
   - _Problem:_ Fake Store API is extremely limited—it does not support multiple images per product, variant options (size, color), or inventory levels.
   - _Trade-off:_ We augment the fetched product data client-side by generating custom color options, size arrays, corresponding images, and stock values on-the-fly. This mimics a real enterprise database interface.
2. **Client-Side Storage vs. Server Database:**
   - _Problem:_ Cart persistence and inventory deductions are stored strictly in the user's browser `localStorage`.
   - _Trade-off:_ While this provides a rapid, serverless demo experience, in a production storefront, cart actions and checkout steps would sync to a backend server (e.g., PostgreSQL or MongoDB) to prevent users from altering stock locally or losing cart items on cookie clear.

---

## 🛠️ Tech Stack

- **Framework:** React 19 (TypeScript)
- **Bundler:** Vite
- **Styling:** CSS Modules with Sass (SCSS)
- **Routing:** React Router v7
- **Hosting:** Vercel
- **APIs:** Fake Store API

---

## ⚡ Performance & SEO

The store is highly optimized for fast page loads, accessibility, best practices, and search engines (SEO). You can check the live audit reports via Google PageSpeed Insights:

- **Desktop Report:** [PageSpeed Insights (Desktop)](https://pagespeed.web.dev/analysis/https-gear-store-nua-vercel-app-product-1/s3uosm5380?form_factor=desktop)
- **Mobile Report:** [PageSpeed Insights (Mobile)](https://pagespeed.web.dev/analysis/https-gear-store-nua-vercel-app-product-1/s3uosm5380?form_factor=mobile)
