# CaterFind 🍽️

> India's premier platform for discovering and booking top-rated catering services — built with Next.js 14 and Express.

![CaterFind](https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=400&fit=crop)

---

## Overview

CaterFind is a full-stack web application that connects event planners with catering businesses across India. Users can search, filter, and browse caterers by cuisine, location, price range, and rating — then contact them directly.

**Key features:**
- Browse and search caterers with real-time filtering
- Persistent filters saved to `localStorage`
- Debounced search (400ms) to reduce API calls
- Server-side data fetching for SEO on the home and detail pages
- Submit a new catering listing via a validated multi-field form
- Fully responsive — mobile sidebar drawer on the browse page
- Skeleton loading states and graceful API error handling

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| Next.js | 14.2.5 | App Router, SSR, routing |
| React | 18 | UI library |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 3.4 | Utility-first styling |
| Lucide React | 0.383 | Icons |
| clsx + tailwind-merge | latest | Conditional class utilities |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | ≥ 18 | Runtime |
| Express | 4.18 | HTTP server & routing |
| Helmet | 7 | Security headers |
| express-rate-limit | 7 | Rate limiting (100 req/15 min) |
| Morgan | 1.10 | Request logging |
| CORS | 2.8 | Cross-origin resource sharing |
| UUID | 9 | Unique ID generation |
| JSON file | — | Data persistence (flat file DB) |

### Fonts
- **Fraunces** — Display / serif headings (Google Fonts)
- **DM Sans** — Body / UI text (Google Fonts)

---

## Project Structure

```
caterfind/
├── backend/                        # Express REST API
│   ├── data/
│   │   └── caterers.json           # JSON flat-file database (6 seed caterers)
│   ├── middleware/
│   │   ├── errorHandler.js         # 404 + global error handler
│   │   └── validation.js           # Request validation middleware
│   ├── routes/
│   │   └── caterers.js             # All /api/caterers route handlers
│   ├── utils/
│   │   └── dataStore.js            # readData() / writeData() helpers
│   ├── server.js                   # Express app entry point
│   └── package.json
│
└── caterfind-nextjs/               # Next.js 14 frontend
    ├── src/
    │   ├── app/                    # App Router pages
    │   │   ├── layout.tsx          # Root layout (Navbar + Footer)
    │   │   ├── page.tsx            # / — Home page (Server Component)
    │   │   ├── globals.css         # Tailwind directives + custom utilities
    │   │   ├── not-found.tsx       # 404 page
    │   │   ├── caterers/
    │   │   │   ├── page.tsx        # /caterers — Browse page (Client Component)
    │   │   │   └── [id]/
    │   │   │       └── page.tsx    # /caterers/:id — Detail page (Server Component)
    │   │   └── add-caterer/
    │   │       └── page.tsx        # /add-caterer — Add listing (Client Component)
    │   │
    │   ├── components/
    │   │   ├── caterers/           # Domain-specific components
    │   │   │   ├── CatererCard.tsx     # Card + CatererCardSkeleton
    │   │   │   ├── FilterSidebar.tsx   # Filters panel (price, cuisine, location, rating)
    │   │   │   ├── PaginationButton.tsx # Pagination with ellipsis
    │   │   │   ├── Skeleton.tsx        # Generic skeleton block
    │   │   │   └── ui/                 # Shim re-exports for FilterSidebar's relative imports
    │   │   │       ├── button.tsx
    │   │   │       ├── input.tsx
    │   │   │       └── select.tsx
    │   │   ├── layout/
    │   │   │   ├── Navbar.tsx      # Sticky top nav with active link state
    │   │   │   └── Footer.tsx      # 3-column footer
    │   │   └── ui/
    │   │       └── index.tsx       # All shared primitives:
    │   │                           #   Badge, Button, Input, Textarea,
    │   │                           #   Select, Skeleton, Divider,
    │   │                           #   EmptyState, StarRating
    │   │
    │   ├── hooks/                  # Custom React hooks
    │   │   ├── useCaterers.ts      # Fetch caterers with race-condition protection
    │   │   ├── useDebounce.ts      # Debounce any value
    │   │   ├── useLocalStorage.ts  # Persistent state via localStorage
    │   │   └── useStats.ts         # Fetch platform stats
    │   │
    │   ├── lib/
    │   │   ├── api.ts              # All fetch functions (getCaterers, getCatererById, etc.)
    │   │   └── utils.ts            # cn(), formatPrice(), formatDate(),
    │   │                           # CUISINES, RATING_OPTIONS, SORT_OPTIONS, getTagColor()
    │   │
    │   └── types/
    │       └── index.ts            # All TypeScript interfaces and types
    │
    ├── tailwind.config.ts          # Custom design tokens
    ├── next.config.js              # Next.js config (image domains)
    ├── tsconfig.json
    ├── postcss.config.js
    └── package.json
```

---

## Prerequisites

Make sure you have the following installed before you begin:

| Tool | Minimum Version | Check with |
|---|---|---|
| Node.js | 18.0.0 | `node --version` |
| npm | 9.0.0 | `npm --version` |

> **Note:** The backend uses a JSON file as its database — no MongoDB, PostgreSQL, or any external database setup is required.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/caterfind.git
cd caterfind
```

---

### 2. Set up the Backend

The backend is a standalone Express server. It must be running before the frontend can display any data.

```bash
# Navigate to the backend folder
cd backend

# Install dependencies
pnpm install

# Start in development mode (with auto-restart via nodemon)
pnpm run dev

# OR start in production mode
pnpm start
```

The API will be available at **`http://localhost:5000`**.

You should see output like:
```
🚀 CaterFind API running on http://localhost:5000
📁 Environment: development
```

**Verify it's working:**
```bash
curl http://localhost:5000/health
# → { "status": "ok", "environment": "development", "timestamp": "..." }

curl http://localhost:5000/api/caterers
# → { "success": true, "data": [...], "pagination": {...} }
```

---

### 3. Set up the Frontend

Open a **new terminal** (keep the backend running) and run:

```bash
# Navigate to the frontend folder
cd frontend

# Install dependencies
pnpm install

# Start the development server
pnpm run dev
```

The frontend will be available at **`http://localhost:3000`**.

---

### 4. Environment Variables

#### Frontend (`caterfind-nextjs/.env.local`)

Create the file if it doesn't exist:

```bash
# frontend/.env.local

# URL of the backend API
# Default (used automatically if this file is missing): http://localhost:5000/api
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

> **Why `NEXT_PUBLIC_`?** Variables prefixed with `NEXT_PUBLIC_` are embedded into the browser bundle. This is required because the browse page (`/caterers`) is a Client Component that calls the API directly from the browser.

#### Backend (`backend/.env`) — optional

```bash
# backend/.env

PORT=5000
NODE_ENV=development

# Comma-separated list of allowed origins (leave empty to allow all)
ALLOWED_ORIGINS=http://localhost:3000
```

---

## Pages & Routes

| Route | File | Rendering | Description |
|---|---|---|---|
| `/` | `app/page.tsx` | **Server Component** | Hero, platform stats, top 3 caterers, cuisine pills, CTA banner |
| `/caterers` | `app/caterers/page.tsx` | **Client Component** | Search, filter, sort, paginated grid with 9 results per page |
| `/caterers/:id` | `app/caterers/[id]/page.tsx` | **Server Component** | Full caterer detail — hero image, stats, cuisines, tags, contact card |
| `/add-caterer` | `app/add-caterer/page.tsx` | **Client Component** | Multi-field listing form with client-side validation |
| `*` | `app/not-found.tsx` | **Server Component** | 404 page |

### Why Server vs Client?

- **Server Components** (`/`, `/caterers/:id`) — data is fetched at request time on the server. Fast initial load, SEO-friendly, no `useEffect`.
- **Client Components** (`/caterers`, `/add-caterer`) — need browser APIs (`localStorage`, `window.scrollTo`) and React state for interactive filtering and form handling.

---

## API Reference

All endpoints are prefixed with `/api`. The server runs on port `5000` by default.

### `GET /api/caterers`

Fetch a paginated, filtered list of caterers.

**Query Parameters:**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `search` | string | — | Full-text search on name and description |
| `location` | string | — | Filter by city or state |
| `cuisine` | string | — | Filter by a specific cuisine |
| `minPrice` | number | — | Minimum price per plate (₹) |
| `maxPrice` | number | — | Maximum price per plate (₹) |
| `minRating` | number | — | Minimum rating (e.g. `4`, `4.5`) |
| `sortBy` | string | `rating` | Field to sort by: `rating`, `pricePerPlate`, `reviewCount`, `createdAt`, `name` |
| `order` | string | `desc` | Sort direction: `asc` or `desc` |
| `page` | number | `1` | Page number |
| `limit` | number | `10` | Results per page |

**Example:**
```bash
GET /api/caterers?cuisine=Mughlai&minRating=4&sortBy=pricePerPlate&order=asc&page=1&limit=9
```

**Response:**
```json
{
  "success": true,
  "data": [ /* Caterer[] */ ],
  "pagination": {
    "total": 42,
    "page": 1,
    "limit": 9,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "filters": { "cuisine": "Mughlai", "minRating": "4" }
}
```

---

### `GET /api/caterers/stats`

Returns aggregate platform statistics.

```bash
GET /api/caterers/stats
```

```json
{
  "success": true,
  "data": {
    "totalCaterers": 6,
    "verifiedCaterers": 4,
    "averageRating": "4.62",
    "averagePricePerPlate": 975,
    "priceRange": { "min": 650, "max": 1800 },
    "topCuisines": [
      { "cuisine": "Indian", "count": 4 },
      { "cuisine": "Continental", "count": 2 }
    ],
    "topLocations": {
      "Mumbai, Maharashtra": 2,
      "Bengaluru, Karnataka": 1
    }
  }
}
```

---

### `GET /api/caterers/:id`

Fetch a single caterer by ID.

```bash
GET /api/caterers/cat_001
```

---

### `POST /api/caterers`

Create a new caterer listing.

**Request Body:**
```json
{
  "name": "Royal Feast Caterers",
  "location": "Delhi, NCR",
  "pricePerPlate": 900,
  "cuisines": ["Indian", "Mughlai", "Punjabi"],
  "rating": 4.5,
  "minGuests": 100,
  "maxGuests": 3000,
  "contactEmail": "info@royalfeast.com",
  "contactPhone": "+91-9876543210",
  "description": "Premium catering for weddings and corporate events."
}
```

**Validation rules:**
- `name` — required, string, 2–100 characters, unique
- `location` — required, string
- `pricePerPlate` — required, number ≥ 1
- `cuisines` — required, non-empty array of strings
- `rating` — required, number between 1–5

**Error response (422):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": ["name must be at least 2 characters", "rating must be between 1 and 5"]
}
```

---

### `PATCH /api/caterers/:id`

Partially update an existing caterer. Accepts any subset of the fields above.

---

### `DELETE /api/caterers/:id`

Delete a caterer by ID.

---

### `GET /health`

Health check endpoint. No auth required.

```json
{
  "status": "ok",
  "environment": "development",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## Component Architecture

### `CatererCard`

Renders a single caterer as a clickable card with image, rating pill, verified badge, cuisine tags, and price.

```tsx
import { CatererCard, CatererCardSkeleton } from '@/components/caterers/CatererCard';

// Normal card
<CatererCard caterer={caterer} />

// Skeleton placeholder (shown while loading)
<CatererCardSkeleton />
```

---

### `FilterSidebar`

Controlled component — all filter state lives in the parent page. Fires `onChange` on every field change, `onApply` when the Apply button is clicked, and `onClear` to reset.

```tsx
import { FilterSidebar } from '@/components/caterers/FilterSidebar';

<FilterSidebar
  filters={filters}          // Partial<CatererFilters>
  onChange={handleChange}    // (next: Partial<CatererFilters>) => void
  onApply={handleApply}      // () => void
  onClear={handleClear}      // () => void
  activeCount={activeCount}  // number — shows badge on "Filters" header
/>
```

---

### `Pagination`

Builds a smart page range with ellipsis (e.g. `1 … 4 5 6 … 20`). Returns `null` when `totalPages ≤ 1`.

```tsx
import { Pagination } from '@/components/caterers/PaginationButton';

<Pagination
  pagination={pagination}        // PaginationMeta
  onPageChange={handlePageChange} // (page: number) => void
/>
```

---

### UI Primitives (`components/ui/index.tsx`)

All shared primitives in one file:

| Export | Props of note | Description |
|---|---|---|
| `Badge` | `variant?: 'default' \| 'forest' \| 'clay' \| 'outline'` | Pill label |
| `Button` | `variant`, `size`, `isLoading` | Styled button with spinner state |
| `Input` | `label`, `error`, `hint`, `leftIcon` | Labelled input with error display |
| `Textarea` | `label`, `error`, `hint` | Labelled textarea |
| `Select` | `label`, `options: {value, label}[]` | Native `<select>` styled |
| `Skeleton` | `className` | Shimmer placeholder block |
| `EmptyState` | `icon`, `title`, `description`, `action` | Zero-results state |
| `StarRating` | `rating`, `size?: 'sm' \| 'md'` | Visual star display |

---

## Custom Hooks

### `useCaterers(filters)`

Fetches caterers from the API. Race-condition safe — stale responses from previous filter states are discarded using a `fetchIdRef`.

```ts
const { caterers, pagination, isLoading, error, refetch } = useCaterers(filters);
```

| Return | Type | Description |
|---|---|---|
| `caterers` | `Caterer[]` | Current page of results |
| `pagination` | `PaginationMeta \| null` | Pagination metadata |
| `isLoading` | `boolean` | True while a request is in-flight |
| `error` | `string \| null` | Error message, or null |
| `refetch` | `() => void` | Manually re-trigger the fetch |

---

### `useDebounce(value, delay?)`

Returns a debounced copy of `value` that only updates after `delay` ms of inactivity (default: 400ms). Used on the search input to avoid an API call on every keystroke.

```ts
const debouncedSearch = useDebounce(filters.search ?? '', 400);
```

---

### `useLocalStorage(key, initialValue)`

Persists state to `localStorage`. SSR-safe — falls back to `initialValue` during server render.

```ts
const [filters, setFilters] = useLocalStorage<Partial<CatererFilters>>('caterfind-filters', DEFAULT_FILTERS);
```

---

### `useStats()`

Fetches platform statistics from `GET /api/caterers/stats`. Used on the home page when you prefer a client-side approach (the home page uses direct `await` instead since it's a Server Component).

```ts
const { stats, isLoading } = useStats();
```

---

## Design System

All design tokens are defined in `tailwind.config.ts` and used throughout the project.

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `cream` | `#FAF6EF` | Page background |
| `sand` | `#E8DDD0` | Card borders, subtle backgrounds |
| `sand-dark` | `#D0C4B4` | Input borders, dividers |
| `clay` | `#C4714A` | Primary CTA, accents, active states |
| `clay-light` | `#D4845D` | Hover state for clay |
| `clay-dark` | `#A85E3A` | Pressed state for clay |
| `forest` | `#2D4A3E` | Navbar, secondary buttons, cards |
| `forest-light` | `#3D6050` | Hover state for forest |
| `forest-dark` | `#1A2C23` | Hero backgrounds, footer |
| `foreground` | `#1A1410` | Primary text |
| `muted-foreground` | `#8C7B6E` | Secondary text, placeholders |

### Typography

```css
/* Display — headings, prices, hero text */
font-family: 'Fraunces', Georgia, serif;
/* → font-display in Tailwind */

/* Body — all UI text */
font-family: 'DM Sans', system-ui, sans-serif;
/* → font-sans in Tailwind (default) */
```

### CSS Utilities (defined in `globals.css`)

| Class | Description |
|---|---|
| `.skeleton` | Animated shimmer gradient for loading placeholders |
| `.card-lift` | Smooth translate-up + shadow on hover |
| `.gradient-card` | Dark-to-transparent gradient overlay for card images |

### Spacing & Border Radius Conventions

- Cards: `rounded-2xl` (16px)
- Buttons: `rounded-xl` (12px) or `rounded-full` for pill buttons
- Inputs: `rounded-xl` (12px)
- Hero sections: `rounded-[2rem]` (32px) for large containers
- Page max-width: `max-w-7xl` (1280px) with `px-6 sm:px-10 lg:px-16` padding

---

## TypeScript Types

All types are defined in `src/types/index.ts`.

### `Caterer`
```ts
interface Caterer {
  id: string;
  name: string;
  location: string;
  pricePerPlate: number;
  cuisines: string[];
  rating: number;              // 1.0 – 5.0
  reviewCount: number;
  minGuests: number | null;
  maxGuests: number | null;
  description: string;
  contactEmail: string | null;
  contactPhone: string | null;
  tags: string[];              // e.g. ["wedding", "buffet", "live-counter"]
  images: string[];            // Array of image URLs
  isVerified: boolean;
  createdAt: string;           // ISO 8601
  updatedAt?: string;
}
```

### `CatererFilters`
```ts
interface CatererFilters {
  search?: string;
  location?: string;
  cuisine?: string;
  minPrice?: string;
  maxPrice?: string;
  minRating?: string;
  sortBy?: 'rating' | 'pricePerPlate' | 'pricePerPlate_desc' | 'name' | 'reviewCount' | 'createdAt';
  page?: number;
  limit?: number;
}
```

### `ApiResponse<T>`
```ts
interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: PaginationMeta;
  filters?: Partial<CatererFilters>;
  message?: string;
  errors?: string[];
}
```

---

## Common Issues & Troubleshooting

### "Could not connect to the API" error on the browse page

The backend is not running. Start it:
```bash
cd backend && npm run dev
```

### `NEXT_PUBLIC_API_URL` is not being picked up

Environment variables with `NEXT_PUBLIC_` are embedded at **build time** in Next.js. If you change `.env.local`, you must restart the dev server:
```bash
# Stop the dev server (Ctrl+C), then:
npm run dev
```

### Images not loading (`next/image` errors)

The `next.config.js` only allows images from `images.unsplash.com`. If your caterer has images from another host, add it:
```js
// next.config.js
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname: 'your-image-host.com' }, // add this
  ],
},
```

### Filters not persisting after refresh

Check that `localStorage` is available (it won't be in private browsing mode in some browsers). The `useLocalStorage` hook falls back to `DEFAULT_FILTERS` silently if `localStorage` throws.

### TypeScript errors about `params` in dynamic routes

Next.js 15 changed `params` to be a `Promise`. The detail page already handles this:
```ts
// Correct (async params)
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
}
```
If you're on Next.js 14, you can use `params: { id: string }` directly (not a Promise).

### Port 5000 already in use

Change the backend port:
```bash
# backend/.env
PORT=5001
```
Then update the frontend:
```bash
# caterfind-nextjs/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

---

## Scripts Reference

### Backend (`backend/`)

| Command | Description |
|---|---|
| `npm run dev` | Start with nodemon (auto-restarts on file changes) |
| `npm start` | Start in production mode |

### Frontend (`caterfind-nextjs/`)

| Command | Description |
|---|---|
| `npm run dev` | Start Next.js dev server on port 3000 |
| `npm run build` | Build for production |
| `npm start` | Start the production build |
| `npm run lint` | Run ESLint |

---

## Data Flow Summary

```
Browser (Client Component)
  └─► useCaterers(filters)
        └─► GET /api/caterers?...  ──► Express
                                         └─► readData() (caterers.json)
                                               └─► filter → sort → paginate
                                                     └─► { success, data[], pagination }
              ◄── ApiResponse<Caterer[]> ◄──────────────────────────────────

Browser (Server Component — e.g. home page)
  └─► getCaterers() / getPlatformStats()  (runs on the server, not in the browser)
        └─► fetch('/api/caterers/stats') ──► same Express API
              ◄── rendered HTML with data embedded ◄──────────────────────
```

---

*Built with ❤️ using Next.js 14, Express, TypeScript, and Tailwind CSS.*
