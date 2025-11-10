/**
 * API service for fetching popular Opus-owned locations including top premium slider data.
 */

export interface PopularSliderLocation {
  id: string;
  name: string;
  city: string;
  state: string;
  state_abbr: string;
  link: string;
  top_premium: string;
  alttext: string | null;
  city_featured_image_url: string;
  location_image_url: string;
}

export interface PopularSliderResponse {
  success: boolean;
  count: number;
  top_premium_count: number;
  data: {
    all_popular: PopularSliderLocation[];
    top_premium: PopularSliderLocation[];
  };
}

const WP_HOST = 'https://njs.opusvirtualoffices.com';

function normalizeUrl(url: string) {
  if (!url) return '';
  const cleaned = url.replace(/\\\//g, '/');
  if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
    return cleaned;
  }
  if (cleaned.startsWith('//')) {
    return `https:${cleaned}`;
  }
  if (cleaned.startsWith('/')) {
    return `${WP_HOST}${cleaned}`;
  }
  return `${WP_HOST}/${cleaned}`;
}

/**
 * Fetch enhanced slider payload (with_flagged=true ensures images + top premium data).
 */
export async function fetchPopularSlider(): Promise<PopularSliderResponse> {
  const response = await fetch(
    'https://njs.opusvirtualoffices.com/wp-json/opus/v1/locations/popular-slider/?with_flagged=true',
    { cache: 'no-store' }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch popular slider data: ${response.statusText}`);
  }

  const data = (await response.json()) as PopularSliderResponse;

  data.data.all_popular = data.data.all_popular.map((location) => ({
    ...location,
    city_featured_image_url: normalizeUrl(location.city_featured_image_url),
    location_image_url: normalizeUrl(location.location_image_url),
    link: normalizeUrl(location.link),
  }));

  data.data.top_premium = data.data.top_premium.map((location) => ({
    ...location,
    city_featured_image_url: normalizeUrl(location.city_featured_image_url),
    location_image_url: normalizeUrl(location.location_image_url),
    link: normalizeUrl(location.link),
  }));

  return data;
}
