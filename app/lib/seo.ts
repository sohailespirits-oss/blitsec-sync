import type { Metadata } from 'next';

interface SeoData {
  success: boolean;
  page: string;
  page_type: string;
  view: string;
  seo: {
    title: string;
    meta_description: string;
    canonical?: string;
    og?: {
      title: string;
      description: string;
      url: string;
      type: string;
      image?: string;
    };
  };
  data?: {
    state?: string;
    city?: string;
    location_id?: string;
    mode?: string;
  };
}

/**
 * Fetches SEO metadata from WordPress JSON files
 * @param jsonPath - Path to the JSON file (e.g., 'homepage', 'virtual-office', 'states/florida/boca-raton/776/776_seo_vo')
 * @returns Next.js Metadata object
 */
export async function getSeoMetadata(jsonPath: string): Promise<Metadata> {
  try {
    // Determine base URL based on environment
    // During build time, we need to use the full URL
    const isProduction = process.env.NODE_ENV === 'production';
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://njs.opusvirtualoffices.com';

    // Build the full URL to the JSON file
    const jsonUrl = `${baseUrl}/newsite/json/${jsonPath}.json`;

    const response = await fetch(jsonUrl, {
      cache: 'no-store' // Always fetch fresh data on every request
    });

    if (!response.ok) {
      console.warn(`Failed to fetch SEO data from ${jsonUrl}, using defaults`);
      return getDefaultMetadata();
    }

    const data: SeoData = await response.json();

    if (!data.success || !data.seo) {
      console.warn(`Invalid SEO data structure from ${jsonUrl}, using defaults`);
      return getDefaultMetadata();
    }

    // Get current hostname for URLs that might be relative
    const getFullUrl = (url: string | undefined): string | undefined => {
      if (!url) return undefined;

      // If already a full URL, return as-is
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
      }

      // Otherwise, prepend the current hostname
      const hostname = process.env.NEXT_PUBLIC_SITE_URL || 'https://njs.opusvirtualoffices.com';
      return `${hostname}${url.startsWith('/') ? url : '/' + url}`;
    };

    // Build Next.js Metadata object
    const metadata: Metadata = {
      title: data.seo.title,
      description: data.seo.meta_description,
    };

    // Add OpenGraph data if available
    if (data.seo.og) {
      const ogImage = data.seo.og.image ? getFullUrl(data.seo.og.image) : undefined;

      metadata.openGraph = {
        title: data.seo.og.title,
        description: data.seo.og.description,
        url: getFullUrl(data.seo.og.url),
        type: data.seo.og.type as 'website',
        images: ogImage ? [ogImage] : undefined,
      };
    }

    // Add canonical URL if available
    if (data.seo.canonical) {
      metadata.alternates = {
        canonical: getFullUrl(data.seo.canonical),
      };
    }

    return metadata;
  } catch (error) {
    console.error(`Error fetching SEO metadata for ${jsonPath}:`, error);
    return getDefaultMetadata();
  }
}

/**
 * Returns default metadata as fallback
 */
function getDefaultMetadata(): Metadata {
  return {
    title: 'Opus Virtual Offices - Professional Business Solutions',
    description: 'Discover premium virtual office solutions with Opus VO. Get a prestigious business address, professional live call answering, and more.',
    openGraph: {
      title: 'Opus Virtual Offices - Professional Business Solutions',
      description: 'Discover premium virtual office solutions with Opus VO. Get a prestigious business address, professional live call answering, and more.',
      type: 'website',
    },
  };
}
