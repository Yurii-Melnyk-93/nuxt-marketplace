# Nuxt Marketplace

A small e-commerce marketplace built with Nuxt 4 while learning the framework — product catalog with search, filtering and pagination, product detail pages, and a shopping cart powered by Pinia. Built as a portfolio/learning project, with an emphasis on server-side rendering, a small reusable component library, and test coverage.

**Live demo:** [nuxt-marketplace-sage.vercel.app](https://nuxt-marketplace-sage.vercel.app/)

## Features

- Product catalog with SSR data fetching (`useFetch`), debounced search, category filtering, and pagination — all handled server-side via query parameters.
- Product detail pages (`/products/[id]`) with proper HTTP 404 handling for missing products.
- Shopping cart (Pinia store): add/remove items, adjust quantity, running total — all fully unit tested.
- A small reusable component library: `BaseInput` (using Vue's `defineModel`), `BaseCombobox` (a searchable single-select combobox), and `BaseDropdown` (a generic slot-based menu, used for a per-product "view details / copy link" actions menu).
- Fully typed end-to-end with a shared `Product` type (Nuxt 4's `shared/` directory) used by both the client and the server.

## Tech stack

- [Nuxt 4](https://nuxt.com/) / Vue 3 / TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [Pinia](https://pinia.vuejs.org/) for state management
- [VueUse](https://vueuse.org/) (`refDebounced`, `onClickOutside`, `useClipboard`)
- [Vitest](https://vitest.dev/) + `@nuxt/test-utils` for unit testing
- `@nuxt/eslint` for linting
- Deployed on [Vercel](https://vercel.com/)

## Project structure

```
app/
  components/    # BaseInput, BaseCombobox, BaseDropdown, ProductCard, AppFooter
  pages/         # index, products/[id], cart
  stores/        # Pinia cart store
  tests/         # Vitest unit tests
server/
  api/           # /api/products, /api/products/[id], /api/categories
  utils/         # mock product data + queryProducts() filtering logic
shared/
  types/         # Product type, shared between client and server
```

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Testing & code quality

```bash
npm run test        # run unit tests (Vitest)
npm run lint         # ESLint
npm run typecheck    # nuxt typecheck (vue-tsc)
```

## Build

```bash
npm run build
npm run preview
```
