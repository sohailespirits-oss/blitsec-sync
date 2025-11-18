# CityLocationHero Component

## Overview

A responsive React component for displaying city-specific virtual office location pages. This component was generated from Figma design exports and includes both desktop and mobile layouts.

## Features

- ✅ **Responsive Design**: Separate optimized layouts for desktop (lg+) and mobile
- ✅ **TypeScript Support**: Full type safety with TypeScript interfaces
- ✅ **Tailwind CSS Styling**: Uses project's custom design tokens
- ✅ **Breadcrumb Navigation**: SEO-friendly breadcrumb trail
- ✅ **Review Badges**: Placeholder badges for BBB, Trustpilot, Google
- ✅ **Features List**: All-inclusive features with checkmark icons
- ✅ **Location Card**: Address, pricing, and company information
- ✅ **CTA Button**: "Select This Location" call-to-action

## Component Props

```typescript
interface CityLocationHeroProps {
  city: string;              // City name (e.g., "Orlando")
  state: string;             // Full state name (e.g., "Florida")
  stateAbbrev: string;       // State abbreviation (e.g., "FL")
  address: {
    street: string;          // Street address
    city: string;            // City (usually same as city prop)
    state: string;           // State abbreviation
    zip: string;             // ZIP code
    phone: string;           // Phone number
  };
  price: string;             // Monthly price (e.g., "$99/mo")
  image?: string;            // Optional image URL for location
  companyName?: string;      // Optional company name (default: "Web Design Agency")
}
```

## Usage

### Basic Example

```tsx
import CityLocationHero from '@/app/components/CityLocationHero';

export default function OrlandoPage() {
  return (
    <CityLocationHero
      city="Orlando"
      state="Florida"
      stateAbbrev="FL"
      address={{
        street: "200 E Robinson Street, Suite 1120",
        city: "Orlando",
        state: "FL",
        zip: "32801",
        phone: "(407) 559-2000",
      }}
      price="$99/mo"
      companyName="Web Design Agency"
    />
  );
}
```

### With Dynamic Data (App Router)

```tsx
// app/locations/[state]/[city]/page.tsx
import CityLocationHero from '@/app/components/CityLocationHero';

export default async function CityPage({
  params
}: {
  params: { state: string; city: string }
}) {
  // Fetch from WordPress API
  const data = await fetch(
    `/wp-json/opus/v1/locations/${params.state}/${params.city}`
  ).then(r => r.json());

  return (
    <main>
      <CityLocationHero
        city={data.city}
        state={data.state}
        stateAbbrev={data.stateAbbrev}
        address={data.address}
        price={data.price}
        image={data.featuredImage}
      />
    </main>
  );
}
```

## Layout Structure

### Desktop Layout (lg and above)

```
┌─────────────────────────────────────────────────────────┐
│ Breadcrumbs                          [BBB][Trust][Google]│
│ Heading: "Virtual office in {city}"                     │
│ Subtitle: "{city} Virtual Business Address..."          │
├──────────────────────────┬──────────────────────────────┤
│                          │                              │
│  [Location Image]        │  Features List:              │
│                          │  ✓ Prestigious Address       │
│  ┌──────────────────┐    │  ✓ Live Call Answering      │
│  │ {city}, {STATE}  │    │  ✓ Call Transferring        │
│  │ {address}        │    │  ✓ Phone/Fax Number         │
│  │ $99/mo           │    │  ✓ Mail Receipt             │
│  │ Company Name     │    │  ✓ Voicemail to Email       │
│  └──────────────────┘    │  ✓ Digital Notifications    │
│                          │                              │
│                          │  All for only $99/month      │
│                          │  [Select This Location]      │
└──────────────────────────┴──────────────────────────────┘
```

### Mobile Layout (< lg)

```
┌─────────────────────────┐
│ Breadcrumbs             │
│                         │
│ Heading                 │
│ Subtitle                │
│ [Select this location]  │
│                         │
│ [Location Image]        │
│                         │
│ ┌─────────────────────┐ │
│ │ {city}, {STATE}     │ │
│ │ {address}           │ │
│ │ $99/mo              │ │
│ └─────────────────────┘ │
│                         │
│ Features List:          │
│ ✓ Prestigious Address   │
│ ✓ Live Call Answering   │
│ ✓ Call Transferring     │
│ See All Features →      │
└─────────────────────────┘
```

## Customization

### Adding Custom Styles

The component uses Tailwind CSS classes. You can customize by:

1. Modifying the classes directly in the component
2. Using Tailwind's `@apply` directive in CSS
3. Extending the theme in `tailwind.config.ts`

### Changing Features List

The features are hardcoded in the component. To make them dynamic:

```typescript
// Add features prop to interface
interface CityLocationHeroProps {
  // ... other props
  features?: string[];
}

// Use in component
const features = props.features || [
  "Prestigious Business Address",
  // ... default features
];
```

### Review Badges

Currently, the review badges are placeholder divs. To add real badges:

1. Replace the placeholder divs with actual badge images
2. Or create separate badge components
3. Consider fetching badge data from WordPress API

## Design Source

This component was generated from Figma design files located in:
- `figma/figma.json` - Figma export containing Desktop and Mobile layouts
- Frame IDs: Desktop (1:2930), Mobile (3:5615)

### Figma Design Elements

**Desktop Layout:**
- Breadcrumbs with chevron separators
- Hero heading (36px, weight 500)
- Two-column grid layout
- Image carousel placeholder
- Location attribution card
- Features list with checkmarks
- CTA button

**Mobile Layout:**
- Simplified breadcrumbs
- Smaller heading (20px, weight 500)
- Single column layout
- Condensed features list (first 3 items + "See All")
- CTA button at top of page

## Browser Support

Tested on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

Responsive breakpoints follow Tailwind's defaults:
- Mobile: < 1024px
- Desktop: ≥ 1024px (lg breakpoint)

## Future Enhancements

- [ ] Add image carousel functionality
- [ ] Connect to WordPress REST API for dynamic data
- [ ] Add real review badge components
- [ ] Implement "See All Features" expandable section on mobile
- [ ] Add loading states
- [ ] Add error handling
- [ ] Add analytics tracking for CTA button clicks
- [ ] Optimize images with Next.js Image component

## Related Files

- `CityLocationHero.tsx` - Main component file
- `CityLocationHero.example.tsx` - Usage examples
- `CityLocationHero.README.md` - This documentation

## Notes

- Component uses `"use client"` directive (client-side component)
- Lucide React icons used for chevron icons
- All text content is currently static (placeholders like {city}, {state} are replaced with props)
- Price is displayed as-is (ensure it includes "/mo" suffix in the data)
- Image is optional - shows placeholder if not provided
