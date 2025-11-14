# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context: WordPress to Headless CMS Migration

**This is a progressive migration project.** We are converting an existing, complex, highly customized WordPress website into a headless CMS architecture with Next.js as the frontend.

**Migration Strategy:**
- **One page at a time** - Converting pages incrementally, not all at once
- **WordPress becomes headless** - WordPress backend remains as the CMS, exposing REST APIs
- **Existing site complexity** - The WordPress site has thousands of dynamically generated pages with numerous API calls and custom functionality
- **Design team handoff** - The Next.js code comes from the design team and contains NO API calls - only static UI components and hardcoded content
- **Development team responsibility** - Implementing the data layer, API integrations, and connecting components to WordPress REST API

**What This Means for Development:**
1. The frontend UI is complete but non-functional (uses placeholder/static data)
2. All API integration work needs to be implemented from scratch
3. Each page conversion requires understanding the WordPress data structure and mapping it to Next.js
4. The WordPress backend must expose proper REST API endpoints for each page
5. Expect complex data relationships and numerous API calls per page

## Project Overview

This is **Opus Virtual Offices** - a Next.js 16 (App Router) website for a virtual office services company. The site is a marketing/landing page that showcases virtual office locations, pricing, features, and integrates with a WordPress backend via REST API for dynamic content.

**Technology Stack:**
- Next.js 16 (App Router, React 18, Turbopack)
- TypeScript
- TailwindCSS with custom design tokens
- Radix UI components (via shadcn/ui)
- TanStack Query for data fetching
- Framer Motion for animations
- Drizzle ORM (PostgreSQL) for future database needs

**Current State:**
- Frontend is fully built with static content from design team
- **Homepage location search API is IMPLEMENTED** ✅
- Homepage is LIVE on staging server (Next.js)
- All other pages remain WordPress (progressive migration)
- Old Vite codebase exists in `old_vite_code/` for reference

## Development Commands

```bash
# Start development server on port 5000
npm run dev

# Type checking
npm run check

# Build for production
npm run build

# Start production server on port 5000
npm start

# Database migrations (when needed)
npm run db:push
```

**Important Notes:**
- The dev server runs on **port 5000** (not the default 3000)
- Production server also runs on **port 5000**
- Project uses ES modules (`"type": "module"` in package.json)
- TypeScript strict mode is enabled
- Next.js uses Turbopack for faster builds
- **Requires Node.js 20.9.0+** (use `nvm use 20` before building)
- **Configuration file is `next.config.js` (ES module syntax)** - Uses `.js` extension instead of `.ts` for production compatibility (avoids requiring TypeScript on production server)

## Code Architecture

### Directory Structure

```
/app                      # Next.js App Router
  /components            # React components
    /ui/                 # shadcn/ui components (Radix UI wrappers)
    ActionSearchBar.tsx  # Location search with autocomplete
    FeaturesBox.tsx      # Feature list display
    Footer.tsx           # Site footer
    Navbar.tsx           # Site navigation
  /hooks               # Custom React hooks
  /lib                 # Utility functions
  globals.css          # Global styles + Tailwind
  layout.tsx           # Root layout with providers
  page.tsx             # Homepage (main landing page)
  providers.tsx        # Client-side providers (QueryClient, TooltipProvider)

/lib                   # Shared utilities
  storage.ts           # In-memory storage interface (for future use)

/shared                # Shared between client/server
  schema.ts            # Drizzle ORM schema (users table)

/public               # Static assets (images, videos, SVGs)
/old_vite_code        # Legacy Vite implementation (reference only)

next.config.js        # Next.js configuration (ES module)
tailwind.config.ts    # Tailwind with extensive custom tokens
tsconfig.json         # TypeScript configuration
drizzle.config.ts     # Database configuration
components.json       # shadcn/ui configuration
```

### Key Architectural Patterns

**1. Component Organization:**
- Main page components are in `app/components/` (Navbar, Footer, etc.)
- Reusable UI primitives are in `app/components/ui/` (shadcn/ui components)
- Page content is in `app/page.tsx` (currently a single-page application)

**2. Path Aliases:**
```typescript
"@/*"       → "./*"          // Maps to root
"@shared/*" → "./shared/*"   // Shared types/schemas
```

**3. Styling Approach:**
- TailwindCSS utility classes
- Custom design tokens defined in `globals.css` as CSS variables
- Extensive custom color palette (basewhite, blue-light400, gray-600, etc.)
- Custom font families using CSS variables (text-xl-regular, display-md-semibold, etc.)
- Framer Motion for scroll animations and hover effects

**4. Design System:**
The project uses a heavily customized design system with:
- Custom color tokens (basewhite, blue-light400/700, gray-50 through gray-900)
- Typography tokens (display-md-semibold, text-xl-regular, etc.)
- Shadow tokens (shadows-shadow-xs/sm/md/lg)
- Font families mapped through CSS variables

**5. State Management:**
- TanStack Query for server state (configured in `app/providers.tsx`)
- Local state with React hooks (useState, useEffect)
- No global state management library (Redux, Zustand, etc.)

**6. Data Fetching Strategy:**
TanStack Query is configured with:
```typescript
staleTime: 60 * 1000,           // 1 minute
refetchOnWindowFocus: false,    // Don't refetch on window focus
```

## WordPress API Integration

**Status:** Homepage location search API is **IMPLEMENTED** ✅

**What's Implemented:**
- Location search API integration (city, state, zipcode searches)
- Dynamic distance filtering for zipcode searches (5, 10, 20, 50 miles)
- Auto-redirect to state pages for state searches
- Real-time search with debouncing and loading states

**What's Still TODO:**
- Popular locations API
- Homepage FAQs API
- Google Reviews API
- Other page conversions (services, locations, FAQ, etc.)

**Documentation:** See `API_INTEGRATION.md` for complete WordPress REST API specifications.

**Required Endpoints:**
1. **Location Search** - `/wp-json/wp/v2/locations?search={query}`
2. **Popular Locations** - `/wp-json/opus/v1/locations/popular`
3. **Homepage FAQs** - `/wp-json/opus/v1/faqs/homepage`
4. **Google Reviews** - `/wp-json/opus/v1/reviews/homepage`

**Integration Points:**
- `ActionSearchBar.tsx` - needs to connect to location search API
- `app/page.tsx` - popularLocations, faqItems, reviews arrays need API data
- Create `/app/lib/api/` directory for API utilities when implementing

**TanStack Query Pattern:**
```typescript
// Example pattern for API integration
export function useLocationSearch(query: string) {
  return useQuery<Location[]>({
    queryKey: ['/api/locations/search', query],
    enabled: query.length >= 2,
  });
}
```

## Component-Specific Notes

### ActionSearchBar.tsx
- Autocomplete search for locations (cities, states, ZIP codes)
- Shows location results with address details
- Displays "Premium" badge for premium locations
- Currently uses static `sampleLocations` data
- **TODO:** Connect to WordPress locations API

### FeaturesBox.tsx
- Displays list of included features in a styled box
- Used on homepage hero section

### Navbar.tsx
- Sticky navigation with logo, phone number, and call-to-action
- Responsive design (mobile/desktop layouts)

### Footer.tsx
- Site footer with links, badges (BBB, payment methods, app store links)
- Social media links and company information

### app/page.tsx
- Main homepage - single-page scrolling layout
- Multiple sections: hero, benefits, locations, FAQs, reviews, CTA
- Uses Framer Motion extensively for scroll animations
- Contains hardcoded content that should eventually come from WordPress API

## Styling Guidelines

**Custom Design Tokens:**
When styling components, prefer using the custom tokens defined in `globals.css`:

```typescript
// Colors
className="text-gray-600 bg-basewhite border-gray-300"
className="bg-blue-light400 hover:bg-blue-light700"

// Typography (use CSS variables for consistency)
className="font-text-xl-regular"  // Body text
className="font-display-md-semibold"  // Headings

// Shadows
className="shadow-shadows-shadow-xs"
```

**Responsive Design:**
```typescript
// Mobile-first approach
className="text-base sm:text-lg md:text-xl"
className="px-4 sm:px-6 md:px-8"
```

## Database Schema

**Current State:** Database schema is defined but NOT IN USE yet. The project uses in-memory storage.

**Schema Location:** `shared/schema.ts`

**Tables:**
- `users` table with id, username, password

**When to use:**
- Future authentication implementation
- User account management
- Backend API routes (not currently implemented)

## Legacy Code

The `old_vite_code/` directory contains the original Vite implementation. This is for reference only:
- Do NOT modify files in `old_vite_code/`
- Refer to it for understanding component structure or logic
- The Next.js version in `/app` is the current implementation

## Common Tasks

### Adding a New Page
1. Create `app/[page-name]/page.tsx`
2. Add metadata export for SEO
3. Use the `Providers` wrapper for QueryClient access
4. Import Navbar and Footer if needed

### Adding a New UI Component
1. Use shadcn/ui CLI if it's a standard component: `npx shadcn@latest add [component]`
2. Custom components go in `app/components/`
3. Use Radix UI primitives for accessibility
4. Follow existing patterns for TypeScript props

### Adding API Integration
1. Create `app/lib/api/` directory structure
2. Define TypeScript interfaces for API responses
3. Create TanStack Query hooks (useLocationSearch, useHomepageFAQs, etc.)
4. Update components to use hooks instead of static data
5. Handle loading and error states

### Working with Animations
The project uses Framer Motion extensively:
```typescript
// Standard pattern
<motion.div
  initial="initial"
  whileInView="animate"
  viewport={{ once: true, amount: 0.3 }}
  variants={fadeInUp}
>
```

Common animation variants are defined in `app/page.tsx`:
- `fadeInUp` - fade in with upward motion
- `fadeIn` - simple fade in
- `staggerContainer` - stagger children animations

## TypeScript Configuration

- Strict mode enabled
- Path aliases configured: `@/*` and `@shared/*`
- JSX: react-jsx (automatic runtime)
- Module resolution: bundler (Node16 modern)
- Incremental builds enabled

## Environment Variables

Currently not heavily used, but prepared for:
- `DATABASE_URL` - PostgreSQL connection (required for Drizzle)
- Future: `WORDPRESS_API_URL` for WordPress integration

## Image Optimization

Next.js Image component is configured:
- Formats: AVIF, WebP
- All images in `/public` directory
- Use Next.js `<Image>` component for automatic optimization

## Testing

No testing framework is currently configured. When adding tests, consider:
- Jest + React Testing Library for component tests
- Playwright or Cypress for E2E tests
- Test IDs are already in place: `data-testid="button-get-started"`

## Deployment

**See `DEPLOYMENT.md` for complete deployment guide.**

### Quick Deployment Summary

**Build locally:**
```bash
nvm use 20
npm run build
```

**Deploy to server:**
```bash
rsync -avz .next/ public/ package.json package-lock.json next.config.js \
  user@server:/var/www/path/
```

**On server:**
```bash
npm install --production
pm2 restart opus-nextjs
```

### Current Deployment Status

- **Staging:** https://njs.opusvirtualoffices.com (LIVE)
- **Production:** Not yet deployed
- **Server:** Ubuntu with ISPConfig 3.2 + Nginx
- **Process Manager:** PM2
- **Port:** 5000 (proxied through Nginx)

### Nginx Configuration (ISPConfig)

The homepage is served by Next.js while all other pages remain WordPress:

- `location = /` → Next.js (port 5000)
- `location /_next/` → Next.js static assets
- `location /` → WordPress (all other pages)

**Critical:** Static file caching excludes `_next/` paths using regex: `^/(?!_next/)`

See `DEPLOYMENT.md` for full Nginx directives and ISPConfig setup.

## API Implementation Details

### Location Search API (IMPLEMENTED ✅)

**Files:**
- `app/lib/api/locations.ts` - API service layer
- `app/lib/api/useLocationSearch.ts` - TanStack Query hook
- `app/components/ActionSearchBar.tsx` - UI component (updated)

**Endpoint:** `/wp-json/opus/v1/locations/search/`

**Parameters:**
- `keyword` - Search term (city, state, or zipcode)
- `distance` - Distance in miles (default: 20, options: 5, 10, 20, 50)

**Features:**
- Detects zipcode (5 digits) automatically
- Shows distance selector for zipcode searches
- Auto-redirects to `/virtual-office/{statename}` for state searches
- Real-time search with 250ms debounce
- Loading states, error handling, empty results
- Keyboard navigation (↑↓ arrows, Enter, Escape)

**Data Flow:**
1. User types in search box → debounced to 250ms
2. `useLocationSearch` hook triggers API call
3. `searchLocations()` calls WordPress REST API
4. Response transformed from WordPress format to component format
5. State searches → immediate redirect
6. City/zipcode searches → display in dropdown
7. Zipcode searches → show distance selector

**Important Notes:**
- Links to WordPress pages use `prefetch={false}` to prevent Next.js from prefetching them
- Uses relative URL (current site origin) for API calls
- No hardcoded WordPress domain needed

### WordPress Link Handling

**Problem:** Next.js automatically prefetches all `<Link>` components, causing errors for WordPress pages.

**Solution:** Add `prefetch={false}` to all WordPress page links:

```tsx
// In Navbar.tsx
<Link href="/services" prefetch={false}>Services</Link>
<Link href="/locations" prefetch={false}>Locations</Link>
<Link href="/faq" prefetch={false}>FAQ</Link>
```

This prevents `?_rsc=...` prefetch requests to WordPress pages during page load.
