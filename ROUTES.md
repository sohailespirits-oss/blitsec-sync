# Route Configuration

This file tracks which routes are handled by Next.js vs WordPress during the progressive migration.

## Current Routing Status

### ✅ Next.js Routes (Implemented)

| Route | Status | Notes |
|-------|--------|-------|
| `/` | ✅ Next.js | Homepage with location search API |

### ⏸️ WordPress Routes (Not Yet Migrated)

| Route | Status | Priority | Notes |
|-------|--------|----------|-------|
| `/services` | ⏸️ WordPress | High | Services overview page |
| `/locations` | ⏸️ WordPress | High | All locations listing |
| `/faq` | ⏸️ WordPress | Medium | FAQ page |
| `/virtual-office/{state}` | ⏸️ WordPress | High | State location pages |
| `/virtual-office/{state}/{city}` | ⏸️ WordPress | Medium | City location pages |
| `/virtual-office/{state}/{city}/location-{id}` | ⏸️ WordPress | Medium | Individual location pages |
| `/pricing` | ⏸️ WordPress | Medium | Pricing information |
| `/about` | ⏸️ WordPress | Low | About us page |
| `/contact` | ⏸️ WordPress | Low | Contact page |
| `/blog` | ⏸️ WordPress | Low | Blog listing |
| `/blog/*` | ⏸️ WordPress | Low | Individual blog posts |
| `/wp-admin` | 🔒 WordPress | N/A | Admin area (always WordPress) |
| `/wp-json/*` | 🔒 WordPress | N/A | API endpoints (always WordPress) |

## Nginx Configuration Generator

When you migrate a page to Next.js, add its route here and update the Nginx configuration.

### Template for New Next.js Routes

```nginx
# {Route Name}
location = /route-path {
    proxy_pass http://localhost:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```

### Current Nginx Routes (ISPConfig Directives)

```nginx
# ===========================================
# NEXT.JS ROUTES
# ===========================================

# Homepage
location = / {
    proxy_pass http://localhost:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}

# Next.js static assets
location /_next/ {
    proxy_pass http://localhost:5000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}

# Next.js public folder assets
location ~ ^/(opus-logo-icon\.svg|opus-logo-text\.svg|.*\.webp|.*\.mp4)$ {
    proxy_pass http://localhost:5000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
}

# ===========================================
# WORDPRESS ROUTES (EVERYTHING ELSE)
# ===========================================

# Static file caching - EXCLUDE _next/ paths
location ~* ^/(?!_next/).*\.(jpg|jpeg|png|svg|gif|css|js|ico|woff|ttf|webp)$ {
    expires 7d;
    log_not_found off;
    access_log off;
    add_header Cache-Control "public, no-transform";
}

# Fallback to WordPress
location / {
    try_files $uri $uri/ /index.php?$args;
}
```

## Migration Checklist

When migrating a new page to Next.js:

- [ ] 1. **Update this file** - Move route from "WordPress" to "Next.js" section
- [ ] 2. **Create Next.js page** - Add `app/[route]/page.tsx`
- [ ] 3. **Implement API calls** - Connect to WordPress REST API
- [ ] 4. **Update Navbar links** - Add `prefetch={false}` if needed
- [ ] 5. **Build locally** - `npm run build`
- [ ] 6. **Update Nginx config** - Add location block in ISPConfig
- [ ] 7. **Deploy to staging** - Test thoroughly
- [ ] 8. **Update CHANGELOG.md** - Document the change
- [ ] 9. **Deploy to production** - When verified on staging

## Dynamic Routes

### Next.js Dynamic Routes

When implementing dynamic routes in Next.js, use this pattern:

```
app/
  virtual-office/
    [state]/
      page.tsx                    # /virtual-office/california
      [city]/
        page.tsx                  # /virtual-office/california/los-angeles
        location-[id]/
          page.tsx                # /virtual-office/california/los-angeles/location-123
```

### Nginx Config for Dynamic Routes

```nginx
# State pages
location ~ ^/virtual-office/[^/]+/?$ {
    proxy_pass http://localhost:5000;
    # ... proxy headers
}

# City pages
location ~ ^/virtual-office/[^/]+/[^/]+/?$ {
    proxy_pass http://localhost:5000;
    # ... proxy headers
}

# Location detail pages
location ~ ^/virtual-office/[^/]+/[^/]+/location-[0-9]+/?$ {
    proxy_pass http://localhost:5000;
    # ... proxy headers
}
```

## Testing Routes

### Test Next.js Routes

```bash
# Should return Next.js content
curl -I https://staging.domain.com/

# Should include x-powered-by: Next.js
curl -I https://staging.domain.com/ | grep -i next
```

### Test WordPress Routes

```bash
# Should return WordPress content
curl -I https://staging.domain.com/services

# Should NOT include x-powered-by: Next.js
curl -I https://staging.domain.com/services | grep -i next
```

### Test Static Assets

```bash
# Next.js assets - should work
curl -I https://staging.domain.com/_next/static/chunks/[hash].css

# WordPress assets - should work
curl -I https://staging.domain.com/wp-content/uploads/image.jpg
```

## Common Patterns

### Exact Match (Single Page)

Use `location =` for exact matches:

```nginx
location = /about {
    proxy_pass http://localhost:5000;
}
```

### Prefix Match (Section with Subpages)

Use `location ^~` for priority prefix match:

```nginx
location ^~ /blog/ {
    proxy_pass http://localhost:5000;
}
```

### Regex Match (Dynamic Routes)

Use `location ~` for regex patterns:

```nginx
location ~ ^/virtual-office/[^/]+/?$ {
    proxy_pass http://localhost:5000;
}
```

## Priority Order

Nginx evaluates locations in this order:

1. Exact match: `location = /path`
2. Priority prefix: `location ^~ /path`
3. Regex: `location ~ /pattern`
4. Prefix: `location /path`

Make sure Next.js routes have higher priority than WordPress fallback.

## Navbar Link Management

### Current Navbar Links

```tsx
// app/components/Navbar.tsx

// Next.js links (no prefetch={false} needed)
<Link href="/">Home</Link>

// WordPress links (prefetch={false} required)
<Link href="/services" prefetch={false}>Services</Link>
<Link href="/locations" prefetch={false}>Locations</Link>
<Link href="/faq" prefetch={false}>FAQ</Link>
```

### When to Use prefetch={false}

- ✅ **Use** for WordPress pages (not yet migrated)
- ❌ **Don't use** for Next.js pages (already migrated)

### Update Process

When migrating a page:
1. Create Next.js page
2. **Remove** `prefetch={false}` from Navbar link
3. Deploy and test

## API Endpoints

All WordPress REST API endpoints should remain accessible:

```nginx
# Don't proxy API endpoints - let WordPress handle them
location /wp-json/ {
    # This goes to WordPress by default
    try_files $uri $uri/ /index.php?$args;
}
```

## Monitoring

### Check Current Routing

```bash
# On server - view actual Nginx config
sudo cat /etc/nginx/sites-enabled/100-njs.opusvirtualoffices.com.vhost

# Check which routes are handled by Next.js
sudo grep "location.*proxy_pass.*5000" /etc/nginx/sites-enabled/*.vhost
```

### Verify Next.js is Running

```bash
# Check PM2 status
pm2 status

# Test Next.js directly
curl http://localhost:5000/

# Check logs
pm2 logs opus-nextjs --lines 50
```

## Future Considerations

### When All Pages are Migrated

Once all pages are migrated to Next.js:

1. Remove the WordPress fallback: `location / { try_files... }`
2. Keep WordPress admin and API endpoints
3. Simplify Nginx config to just proxy everything except admin/API

### WordPress Decommissioning

When ready to fully decommission WordPress:

1. Keep WordPress running for API only
2. Remove WordPress frontend entirely
3. Update Nginx to only serve `/wp-json/` and `/wp-admin/`
4. Archive WordPress theme files

## Notes

- **Always test on staging first** before updating production Nginx config
- **Keep this file updated** as the source of truth for routing
- **Document special cases** (redirects, aliases, etc.) in this file
- **Backup Nginx config** before making changes in ISPConfig

---

**Last Updated:** 2025-11-05
**Next.js Routes:** 1
**WordPress Routes:** 11+
**Migration Progress:** 8% (1 of ~12 main pages)
