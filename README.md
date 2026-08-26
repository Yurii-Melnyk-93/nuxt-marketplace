# Nuxt Marketplace

[![CI](https://github.com/Yurii-Melnyk-93/nuxt-marketplace/actions/workflows/ci.yml/badge.svg)](https://github.com/Yurii-Melnyk-93/nuxt-marketplace/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://nuxt-marketplace-sage.vercel.app/)

A small e-commerce marketplace built with Nuxt 4 while learning the framework — product catalog with search, filtering and pagination, product detail pages, and a shopping cart powered by Pinia. Built as a portfolio/learning project, with an emphasis on server-side rendering, accessibility, a small reusable component library, and test coverage.

**Live demo:** [nuxt-marketplace-sage.vercel.app](https://nuxt-marketplace-sage.vercel.app/)

## Features

- Product catalog with SSR data fetching (`useFetch`), debounced search with a clear button, category filtering via an accessible combobox, and pagination — all handled server-side via query parameters.
- Product detail pages (`/products/[id]`) with proper HTTP 404 handling for missing products and full SEO/Open Graph metadata.
- Shopping cart (Pinia store): add/remove items, adjust quantity, running total, persisted to `localStorage` across sessions — fully unit tested.
- Toast notifications on "Add to cart", and skeleton loaders while product data is refetching client-side.
- Custom error page for unhandled/fatal errors, with a way back to the catalog.
- Image handling via `@nuxt/image`, with explicit width/height to prevent layout shift.
- Consistent price formatting across the app.
- A small reusable, accessible component library:
  - `BaseInput` — a generic text input built on Vue's `defineModel`.
  - `SearchInput` — a search field with a clear button.
  - `BaseCombobox` — a searchable single-select combobox following the ARIA combobox pattern (keyboard navigation, `aria-activedescendant`, roving focus).
  - `BaseDropdown` — a generic slot-based menu with click-outside and Escape-to-close (with focus return), used for the per-product actions menu.
- Fully typed end-to-end with a shared `Product` type (Nuxt 4's `shared/` directory) used by both the client and the server.
- CI pipeline (GitHub Actions): lint, typecheck, unit tests, and a production build run on every push and pull request.

## Tech stack

- [Nuxt 4](https://nuxt.com/) / Vue 3 / TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [Pinia](https://pinia.vuejs.org/) + `pinia-plugin-persistedstate` for state management
- [VueUse](https://vueuse.org/) (`refDebounced`, `onClickOutside`, `useClipboard`)
- [`@nuxt/image`](https://image.nuxt.com/) for image optimization
- [Vitest](https://vitest.dev/) + `@nuxt/test-utils` + `@vue/test-utils` for testing
- `@nuxt/eslint` for linting
- GitHub Actions for CI, deployed on [Vercel](https://vercel.com/)

## Project structure

```
app/
  components/    # BaseInput, SearchInput, BaseCombobox, BaseDropdown,
                 # ProductCard, ProductCardSkeleton, AppFooter, AppToaster
  composables/   # useToast
  pages/         # index, products/[id], cart
  plugins/       # pinia-plugin-persistedstate registration
  stores/        # Pinia cart store
  tests/         # Vitest unit tests
  error.vue      # custom fatal-error page
server/
  api/           # /api/products, /api/products/[id], /api/categories
  utils/         # mock product data + queryProducts() filtering logic
shared/
  types/         # Product type, shared between client and server
  utils/         # formatPrice
.github/
  workflows/     # CI pipeline
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

All three run automatically in CI on every push and pull request to `main`.

## Build

```bash
npm run build
npm run preview
```

## License

MIT — see [LICENSE](LICENSE).
