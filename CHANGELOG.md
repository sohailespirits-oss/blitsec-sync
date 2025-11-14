# Changelog

## [2025-11-05] - Homepage API Integration & Deployment

### Added

#### API Integration
- **Location Search API** (`/wp-json/opus/v1/locations/search/`)
  - Created `app/lib/api/locations.ts` - API service layer with WordPress response transformation
  - Created `app/lib/api/useLocationSearch.ts` - TanStack Query hook for location search
  - Supports city, state, and zipcode searches
  - Dynamic distance filtering (5, 10, 20, 50 miles) for zipcode searches
  - Auto-redirect to `/virtual-office/{statename}` for state searches
  - Real-time search with 250ms debounce
  - Loading states, error handling, empty results handling
  - Keyboard navigation support (↑↓, Enter, Escape)

#### Component Updates
- **ActionSearchBar.tsx**
  - Integrated `useLocationSearch` hook
  - Added distance selector UI (animated dropdown) for zipcode searches
  - Added state redirect logic using Next.js router
  - Added error state handling
  - Removed dependency on static sample data

- **Navbar.tsx**
  - Added `prefetch={false}` to WordPress page links (/services, /locations, /faq)
  - Prevents Next.js from prefetching WordPress pages (fixes 403 errors)

- **page.tsx (Homepage)**
  - Removed static `sampleLocations` array
  - Now uses real API data via ActionSearchBar integration

#### Configuration
- **next.config.ts → next.config.js**
  - Converted to JavaScript (ES module syntax) for production compatibility
  - Avoids requiring TypeScript on production server
  - Uses `export default` instead of `module.exports` (matches `"type": "module"` in package.json)

#### Documentation
- **CLAUDE.md** - Updated with:
  - Current project state (homepage API implemented)
  - Node.js 20+ requirement
  - Production deployment status
  - API implementation details
  - Nginx configuration notes
  - WordPress link handling solution

- **DEPLOYMENT.md** - Created comprehensive deployment guide:
  - Build process on development machine
  - File deployment instructions (rsync/scp)
  - PM2 setup and management
  - ISPConfig Nginx configuration
  - Troubleshooting guide
  - Progressive migration strategy
  - Update workflow
  - Monitoring and backup strategies

- **CHANGELOG.md** - This file

### Changed
- Updated directory structure documentation to reflect `next.config.js` instead of `next.config.ts`
- Updated current state documentation to show homepage is live on staging

### Fixed
- **Static asset 404 errors** - Fixed Nginx configuration to exclude `_next/` paths from static file caching using negative lookahead regex: `^/(?!_next/)`
- **WordPress prefetch 403 errors** - Added `prefetch={false}` to WordPress page links to prevent Next.js from attempting to prefetch them
- **TypeScript config error on production** - Converted `next.config.ts` to `next.config.js` to avoid requiring TypeScript on production server

### Deployment
- **Staging Server:** https://njs.opusvirtualoffices.com
  - Ubuntu with ISPConfig 3.2
  - Nginx 1.18.0+
  - Node.js 20+
  - PM2 process manager
  - Next.js running on port 5000 (proxied through Nginx)

### Technical Notes

#### Nginx Configuration (ISPConfig)
```nginx
# Homepage → Next.js
location = / { proxy_pass http://localhost:5000; }

# Next.js assets → Next.js
location /_next/ { proxy_pass http://localhost:5000; }

# Static assets → Exclude _next/ paths
location ~* ^/(?!_next/).*\.(css|js|svg)$ { ... }

# Everything else → WordPress
location / { try_files $uri $uri/ /index.php?$args; }
```

#### WordPress API Response Format
```json
{
  "success": true,
  "result": {
    "locations": [
      {
        "id": "123",
        "city": "New York",
        "state": "New York",
        "abbr": "NY",
        "premium": "1",
        "link": "https://...",
        "name": "Address line",
        ...
      }
    ],
    "opusownedzip": false
  }
}
```

#### Data Transformation
WordPress API responses are transformed to component-friendly format:
- Converts `premium: "1"` to `premium: true`
- Extracts relevant fields (id, city, state, address, link)
- Detects state-only results for redirect logic
- Handles nested `result.locations[]` structure

### Requirements Met
- ✅ Homepage location search with WordPress API
- ✅ City, state, and zipcode search support
- ✅ Dynamic distance filtering for zipcode searches
- ✅ State page auto-redirect functionality
- ✅ Production build process
- ✅ Deployment to staging server
- ✅ Nginx reverse proxy configuration
- ✅ Mixed Next.js/WordPress routing (homepage Next.js, others WordPress)

### TODO
- [ ] Implement Popular Locations API
- [ ] Implement Homepage FAQs API
- [ ] Implement Google Reviews API
- [ ] Convert /services page to Next.js
- [ ] Convert /locations page to Next.js
- [ ] Convert /faq page to Next.js
- [ ] Deploy to production (currently on staging only)
- [ ] Add SSL/HTTPS configuration details
- [ ] Implement monitoring/logging solution
- [ ] Add test suite (Jest + React Testing Library)

### Known Issues
None currently.

### Migration Status
- **Converted to Next.js:** Homepage only
- **Remaining WordPress:** /services, /locations, /faq, /virtual-office/*, admin, all other pages
- **Strategy:** Progressive page-by-page migration

### Performance Metrics
- Build time: ~11-20 seconds
- Page load: First load <1s on staging
- API response time: <500ms average
- Static assets: Cached 7 days (Nginx)

### Browser Compatibility
- Chrome/Edge: ✅ Tested
- Firefox: ⏸️ Not yet tested
- Safari: ⏸️ Not yet tested
- Mobile browsers: ⏸️ Not yet tested

---

## Previous Changes

This is the first entry. Previous work was undocumented.
