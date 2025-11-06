# Deployment Guide

This document covers deployment of the Next.js homepage to production/staging server while keeping WordPress for all other pages.

## Prerequisites

- Ubuntu server with Nginx and ISPConfig 3.2
- Node.js 20.9.0+ installed on server
- WordPress site already running
- PM2 for process management

## Build Process

### On Development Machine

**Requirements:**
- Node.js 20.9.0+ (use `nvm use 20`)

```bash
# 1. Switch to Node 20
nvm use 20

# 2. Build production version
npm run build

# This creates the .next/ folder with compiled code
```

### Files to Deploy

**Required files/folders:**
```
✅ .next/              # Compiled Next.js app (THE MOST IMPORTANT)
✅ public/             # Static assets (images, videos, fonts)
✅ package.json
✅ package-lock.json
✅ next.config.js      # Note: .js not .ts
```

**DO NOT deploy:**
```
❌ node_modules/      # Install fresh on server
❌ app/               # Source code (already compiled into .next/)
❌ .git/              # Optional
❌ old_vite_code/     # Legacy code
```

### Transfer to Server

**Option 1: SCP**
```bash
scp -r .next public package.json package-lock.json next.config.js \
  user@server:/var/www/path/to/site/
```

**Option 2: rsync (recommended)**
```bash
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude 'old_vite_code' \
  .next/ public/ package.json package-lock.json next.config.js \
  user@server:/var/www/path/to/site/
```

## Server Setup

### 1. Install Dependencies

```bash
cd /var/www/path/to/site
npm install --production
```

### 2. Start Next.js with PM2

```bash
# Install PM2 globally (if not installed)
sudo npm install -g pm2

# Start Next.js on port 5000
pm2 start npm --name "opus-nextjs" -- start

# Save PM2 configuration
pm2 save

# Enable PM2 on server reboot
pm2 startup
```

**Useful PM2 Commands:**
```bash
pm2 status                    # Check status
pm2 logs opus-nextjs          # View logs
pm2 restart opus-nextjs       # Restart after updates
pm2 stop opus-nextjs          # Stop the app
pm2 delete opus-nextjs        # Remove from PM2
```

### 3. Configure ISPConfig Nginx

**Location:** ISPConfig Admin Panel → Sites → Website → Options Tab → Nginx Directives

**Add these directives:**

```nginx
# Homepage - Next.js
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

# Next.js public folder assets (logos, images, videos)
location ~ ^/(opus-logo-icon\.svg|opus-logo-text\.svg|.*\.webp|.*\.mp4)$ {
    proxy_pass http://localhost:5000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
}

# Static file caching - EXCLUDE _next/ paths
location ~* ^/(?!_next/).*\.(jpg|jpeg|png|svg|gif|css|js|ico|woff|ttf|webp)$ {
    expires 7d;
    log_not_found off;
    access_log off;
    add_header Cache-Control "public, no-transform";
}

# Everything else - WordPress
location / {
    try_files $uri $uri/ /index.php?$args;
}
```

**Important Notes:**
- The `location = /` block uses exact match (`=`) so only homepage goes to Next.js
- The static file regex excludes `_next/` paths using negative lookahead: `^/(?!_next/)`
- All other pages (`/services`, `/locations`, `/faq`, etc.) continue to be served by WordPress

### 4. Reload Nginx

After saving in ISPConfig, reload Nginx:

```bash
sudo nginx -t          # Test configuration
sudo systemctl reload nginx
```

## Verification

### Test Next.js Directly

```bash
# On server
curl http://localhost:5000/                                  # Homepage HTML
curl http://localhost:5000/_next/static/chunks/[hash].css   # CSS file
curl http://localhost:5000/opus-logo-icon.svg               # Logo
```

All should return 200 OK.

### Test Through Nginx

```bash
# From anywhere
curl -I https://yourdomain.com/          # Should return Next.js page
curl -I https://yourdomain.com/services  # Should return WordPress page
```

## Troubleshooting

### Next.js Not Starting

```bash
# Check if port 5000 is in use
netstat -tulpn | grep 5000

# Check PM2 logs
pm2 logs opus-nextjs

# Check Node version
node --version  # Should be 20.9.0+
```

### Assets Getting 404

**Problem:** CSS, JS, or images return 404

**Solution:** Check if the static file regex excludes `_next/` properly:
```nginx
location ~* ^/(?!_next/).*\.(css|js|svg)$ {
```

The `(?!_next/)` is critical - it's a negative lookahead that excludes `_next/` paths.

### WordPress Pages Getting Proxied to Next.js

**Problem:** WordPress pages like `/services` or `/locations` go to Next.js instead

**Solution:** Ensure the homepage location uses exact match:
```nginx
location = / {    # Note the = for exact match
```

### Prefetch 403 Errors

**Problem:** Browser console shows 403 errors for `/locations/?_rsc=...`

**Solution:** WordPress page links in Navbar need `prefetch={false}`:
```tsx
<Link href="/services" prefetch={false}>Services</Link>
<Link href="/locations" prefetch={false}>Locations</Link>
<Link href="/faq" prefetch={false}>FAQ</Link>
```

This prevents Next.js from trying to prefetch WordPress pages.

## Progressive Migration Strategy

### Current State
- ✅ Homepage: Next.js
- ⏸️ All other pages: WordPress

### To Convert Another Page

1. **Create the Next.js page** (e.g., `app/services/page.tsx`)
2. **Implement API integrations** for that page
3. **Build and deploy** the updated `.next/` folder
4. **Add Nginx directive** for the new page:

```nginx
location = /services {
    proxy_pass http://localhost:5000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    # ... other headers
}
```

5. **Test** to ensure WordPress version is no longer accessible
6. **Repeat** for each page

### Migration Checklist Per Page

- [ ] Page component created in Next.js
- [ ] WordPress API endpoints identified
- [ ] API integration implemented and tested
- [ ] Static data replaced with API calls
- [ ] Build process successful
- [ ] Deployed to server
- [ ] Nginx directive added
- [ ] Tested in staging
- [ ] WordPress links updated (if needed)
- [ ] Deployed to production

## Updating Deployed Site

### For Code Changes

```bash
# On dev machine
nvm use 20
npm run build

# Deploy
rsync -avz .next/ user@server:/var/www/path/to/site/.next/

# On server
pm2 restart opus-nextjs
```

### For Dependency Changes

```bash
# On dev machine
nvm use 20
npm install
npm run build

# Deploy
rsync -avz .next/ package.json package-lock.json user@server:/var/www/path/to/site/

# On server
npm install --production
pm2 restart opus-nextjs
```

### For Configuration Changes

```bash
# Deploy updated next.config.js
scp next.config.js user@server:/var/www/path/to/site/

# On server
pm2 restart opus-nextjs
```

## Server Details

- **Server:** Ubuntu with ISPConfig 3.2
- **Web Server:** Nginx 1.18.0+
- **Node.js:** 20.9.0+
- **Process Manager:** PM2
- **Port:** 5000 (Next.js internal)
- **Public Access:** Via Nginx proxy on port 80/443

## Security Considerations

- Next.js runs on localhost:5000 (not publicly accessible)
- All traffic goes through Nginx (reverse proxy)
- WordPress admin area remains protected with existing IP restrictions
- SSL/TLS handled by Nginx (ISPConfig managed)
- PM2 keeps Next.js running and restarts on crashes

## Performance Optimization

### Nginx Caching

Add to Nginx directives for better performance:

```nginx
# Cache Next.js pages (optional)
proxy_cache_path /var/cache/nginx/nextjs levels=1:2 keys_zone=nextjs_cache:10m max_size=1g inactive=60m;

location = / {
    proxy_cache nextjs_cache;
    proxy_cache_valid 200 10m;
    proxy_cache_key $scheme$request_method$host$request_uri;
    # ... rest of proxy settings
}
```

### PM2 Cluster Mode

For better performance on multi-core servers:

```bash
pm2 delete opus-nextjs
pm2 start npm --name "opus-nextjs" -i max -- start
pm2 save
```

This runs multiple instances of Next.js.

## Backup Strategy

**Before deploying:**
```bash
# Backup current .next folder on server
tar -czf nextjs-backup-$(date +%Y%m%d).tar.gz .next/
```

**Rollback if needed:**
```bash
tar -xzf nextjs-backup-YYYYMMDD.tar.gz
pm2 restart opus-nextjs
```

## Monitoring

### Check Application Health

```bash
# Check if Next.js is responding
curl -I http://localhost:5000

# Check PM2 status
pm2 status

# View real-time logs
pm2 logs opus-nextjs --lines 100
```

### Check Nginx Access

```bash
# View recent access logs
tail -f /var/log/nginx/access.log | grep "GET / "

# Check error logs
tail -f /var/log/nginx/error.log
```

## Common Deployment Workflow

```bash
# 1. On dev machine
nvm use 20
npm run build

# 2. Deploy
rsync -avz --delete .next/ user@server:/path/.next/

# 3. On server
pm2 restart opus-nextjs

# 4. Verify
curl -I https://yourdomain.com/
pm2 logs opus-nextjs --lines 20
```

## Contact & Support

- **Staging URL:** https://njs.opusvirtualoffices.com
- **Production URL:** https://www.opusvirtualoffices.com
- **Server:** 64.135.100.25
- **Node Version Required:** 20.9.0+
