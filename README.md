# Opus Virtual Offices - Next.js Website

Next.js 16 frontend for Opus Virtual Offices, progressively migrating from WordPress to a headless CMS architecture.

## 🚀 Quick Start

```bash
nvm use 20
npm install
npm run dev
```

Visit: http://localhost:5000

**For detailed setup:** See [QUICK_START.md](./QUICK_START.md)

## 📁 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Quick reference for developers
- **[CLAUDE.md](./CLAUDE.md)** - Complete architecture and development guide
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment instructions
- **[API_INTEGRATION.md](./API_INTEGRATION.md)** - WordPress REST API specifications
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history and changes

## 📊 Project Status

### ✅ Completed
- Homepage with location search API integration
- Deployed to staging: https://njs.opusvirtualoffices.com

### ⏸️ In Progress
- Progressive page-by-page migration from WordPress
- Additional API integrations (FAQs, Reviews, Popular Locations)

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript (strict mode)
- **Styling:** TailwindCSS with custom design tokens
- **Data Fetching:** TanStack Query
- **Animations:** Framer Motion
- **UI Components:** shadcn/ui (Radix UI)
- **CMS:** WordPress (headless)

## 🌐 Deployment

### Staging
- **URL:** https://njs.opusvirtualoffices.com
- **Status:** ✅ Live
- **Server:** Ubuntu + ISPConfig 3.2 + Nginx

### Production
- **URL:** https://www.opusvirtualoffices.com
- **Status:** ⏸️ Not yet deployed (WordPress only)

## 📋 Requirements

- **Node.js:** 20.9.0 or higher
- **npm:** 10.x or higher
- **OS:** Windows (WSL), macOS, or Linux

## 🔧 Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run check            # Type checking

# Production
npm run build            # Build for production
npm start                # Start production server

# Deployment
npm run build            # Build locally
# Then rsync to server (see DEPLOYMENT.md)
```

## 🏗️ Architecture

### Current State
- **Homepage:** Next.js (with WordPress API integration)
- **All other pages:** WordPress (unchanged)
- **Strategy:** Progressive page-by-page migration

### Migration Approach
This is not a complete rewrite. We're converting one page at a time:
1. Build Next.js page
2. Implement API integrations
3. Deploy alongside WordPress
4. Update Nginx to route specific page to Next.js
5. Repeat for next page

## 🔌 API Integration

### Implemented
- ✅ Location Search (`/wp-json/opus/v1/locations/search/`)
  - City, state, and zipcode searches
  - Dynamic distance filtering
  - Auto-redirect to state pages

### TODO
- ⏸️ Popular Locations API
- ⏸️ Homepage FAQs API
- ⏸️ Google Reviews API

## 📝 Key Features

- **Location Search** with autocomplete and distance filtering
- **Progressive enhancement** - WordPress fallback for non-migrated pages
- **Optimized builds** - Turbopack for faster development
- **Type-safe** - Full TypeScript with strict mode
- **Accessible** - Radix UI primitives with ARIA support
- **Responsive** - Mobile-first TailwindCSS design
- **Animated** - Framer Motion scroll and interaction animations

## 🤝 Development Workflow

1. **Make changes** in `app/` directory
2. **Test locally** with `npm run dev`
3. **Build** with `npm run build` (requires Node 20+)
4. **Deploy** to staging server (see DEPLOYMENT.md)
5. **Verify** on https://njs.opusvirtualoffices.com
6. **Deploy to production** when ready

## 🐛 Troubleshooting

### Node version error
```bash
nvm use 20
```

### Assets not loading
Check Nginx config excludes `_next/` paths from static caching.

### WordPress page errors
Add `prefetch={false}` to Link components pointing to WordPress pages.

**For more:** See [DEPLOYMENT.md](./DEPLOYMENT.md) troubleshooting section.

## 📦 Project Structure

```
app/
  components/         React components
    ui/              shadcn/ui components
    ActionSearchBar  Location search (API integrated)
    Navbar           Navigation
    Footer           Footer
  lib/
    api/             API services and hooks
  page.tsx           Homepage
  layout.tsx         Root layout

public/              Static assets
.next/               Build output (generated)
old_vite_code/       Legacy Vite code (reference only)

next.config.js       Next.js configuration
tailwind.config.ts   Tailwind customization
tsconfig.json        TypeScript configuration
```

## 🔒 Security

- Next.js runs on localhost:5000 (not publicly accessible)
- All traffic proxied through Nginx
- WordPress admin remains protected
- SSL/TLS handled by Nginx
- IP restrictions maintained from WordPress

## 📈 Performance

- **Build time:** ~11-20 seconds
- **First load:** <1s on staging
- **API response:** <500ms average
- **Static assets:** 7-day cache

## 🚢 Deployment Notes

- Build on **development machine** (not on server)
- Deploy only the `.next/` folder and required files
- Use PM2 to keep Next.js running
- Nginx proxies homepage to Next.js, everything else to WordPress

**Full guide:** [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📞 Support

- **Staging:** https://njs.opusvirtualoffices.com
- **Documentation:** See files above
- **Issues:** Contact development team

## 📜 License

Proprietary - Opus Virtual Offices

---

**For Claude Code:** This repository is documented for Claude Code. See [CLAUDE.md](./CLAUDE.md) for complete architecture and development guidance.
