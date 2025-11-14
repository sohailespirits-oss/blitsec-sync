# Quick Start Guide

Quick reference for developers working on this project.

## Setup

```bash
# Clone repository
git clone <repo-url>
cd Opus-VO-NextJS-Website-2026-desktop

# Use Node.js 20+
nvm use 20

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit: http://localhost:5000

## Project Type

**WordPress to Headless CMS Migration** - Progressive page-by-page conversion.

- Homepage: Next.js ✅
- Other pages: WordPress ⏸️

## Key Commands

```bash
# Development
npm run dev              # Start dev server (port 5000)
npm run check            # TypeScript type checking

# Production
npm run build            # Build for production
npm start                # Start production server (port 5000)

# Database (if needed)
npm run db:push          # Push schema changes
```

## Important Files

```
app/
  components/
    ActionSearchBar.tsx    # Location search (API integrated)
    Navbar.tsx            # Navigation (prefetch={false} on WP links)
  lib/
    api/
      locations.ts        # Location search API service
      useLocationSearch.ts # TanStack Query hook
  page.tsx                # Homepage

next.config.js            # Config (ES module, not .ts)
DEPLOYMENT.md            # Full deployment guide
CLAUDE.md                # Architecture documentation
```

## API Integration Status

### ✅ Implemented
- Location search (`/wp-json/opus/v1/locations/search/`)

### ⏸️ TODO
- Popular locations
- Homepage FAQs
- Google reviews

## Build & Deploy

### Build Locally
```bash
nvm use 20
npm run build
```

### Deploy to Staging
```bash
rsync -avz .next/ public/ package.json package-lock.json next.config.js \
  user@server:/var/www/path/
```

### On Server
```bash
npm install --production
pm2 restart opus-nextjs
```

## Staging Access

- **URL:** https://njs.opusvirtualoffices.com
- **Server:** 64.135.100.25
- **SSH:** user@64.135.100.25
- **Path:** /var/www/clients/client1/web2/web/

## Common Issues

### Build fails: "Node.js version required"
```bash
nvm use 20
```

### Assets 404 in browser
Check Nginx config excludes `_next/` from static caching:
```nginx
location ~* ^/(?!_next/).*\.(css|js)$ { ... }
```

### WordPress pages getting prefetch errors
Add `prefetch={false}` to Link:
```tsx
<Link href="/services" prefetch={false}>
```

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript (strict mode)
- TailwindCSS (custom tokens)
- TanStack Query (data fetching)
- Framer Motion (animations)
- shadcn/ui (Radix UI components)

## Project Structure

```
app/              Next.js App Router
public/           Static assets
.next/            Build output (deploy this)
old_vite_code/    Legacy (don't modify)
```

## Key Patterns

### API Service
```typescript
// app/lib/api/myapi.ts
export async function fetchData() {
  const response = await fetch('/wp-json/...');
  return response.json();
}
```

### TanStack Query Hook
```typescript
// app/lib/api/useMyData.ts
export function useMyData() {
  return useQuery({
    queryKey: ['mydata'],
    queryFn: fetchData,
  });
}
```

### Component Usage
```tsx
// app/components/MyComponent.tsx
'use client';
import { useMyData } from '@/app/lib/api/useMyData';

export function MyComponent() {
  const { data, isLoading } = useMyData();
  // ...
}
```

## WordPress Links

Always use `prefetch={false}` for WordPress pages:

```tsx
<Link href="/wordpress-page" prefetch={false}>
  WordPress Page
</Link>
```

## Development Tips

1. **Port 5000** - Dev and prod both use 5000
2. **ES Modules** - Project uses `"type": "module"`
3. **Node 20+** - Required for Next.js 16
4. **Build locally** - Don't build on production server
5. **Test staging first** - Before production deployment

## Getting Help

- **Architecture:** See `CLAUDE.md`
- **Deployment:** See `DEPLOYMENT.md`
- **API Specs:** See `API_INTEGRATION.md`
- **Changes:** See `CHANGELOG.md`

## Next Steps

See `CLAUDE.md` → "WordPress API Integration" → "What's Still TODO"
