/**
 * Location Search API Service
 * Connects to WordPress REST API for location searches
 */

// WordPress API Response Types
export interface WordPressLocationResponse {
  success: boolean;
  result: {
    locations: Array<{
      // Common fields
      id?: string;
      city?: string;
      state?: string;
      state_english?: string;
      abbr?: string;

      // City/Zipcode specific fields
      cityID?: string;
      name?: string;
      address?: string;
      opuslocphone?: string;
      premium?: string;
      countryid?: string;
      opusowned?: string;
      showpopular?: string;
      point_x?: string;
      point_y?: string;
      image?: string;
      link?: string;
      display?: string;
    }>;
    opusownedzip: boolean;
  };
}

// Transformed Location Types for Component
export interface LocationResult {
  id: string;
  city: string;
  state?: string;
  type: 'city' | 'state';
  premium?: boolean;
  href?: string;
  addressLine1?: string;
  addressLine2?: string;
}

export interface StateResult {
  state: string;
  type: 'state';
}

export type SearchResult = LocationResult | StateResult;

/**
 * Detect if search term is a zipcode (5 digits)
 */
export function isZipcode(term: string): boolean {
  return /^\d{5}$/.test(term.trim());
}

/**
 * Search for locations via WordPress API
 * @param keyword - Search term (city, state, or zipcode)
 * @param distance - Distance in miles (default: 20)
 */
export async function searchLocations(
  keyword: string,
  distance: number = 20
): Promise<SearchResult[]> {
  if (!keyword || keyword.trim().length < 2) {
    return [];
  }

  try {
    // Use production hostname for localhost development, otherwise use current site
    const isLocalhost = typeof window !== 'undefined'
      ? window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      : false;

    const baseUrl = isLocalhost
      ? 'https://njs.opusvirtualoffices.com'
      : (typeof window !== 'undefined' ? window.location.origin : '');

    const url = new URL('/wp-json/opus/v1/locations/search/', baseUrl);

    // WordPress API expects POST with form data, not GET with query params
    const formData = new URLSearchParams();
    formData.append('keyword', keyword.trim());
    formData.append('distance', distance.toString());

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data: WordPressLocationResponse = await response.json();

    if (!data.success || !data.result?.locations) {
      return [];
    }

    // Transform API response to component format
    return transformLocations(data.result.locations);
  } catch (error) {
    console.error('Location search error:', error);
    throw error;
  }
}

/**
 * Transform WordPress API locations to component format
 */
function transformLocations(
  locations: WordPressLocationResponse['result']['locations']
): SearchResult[] {
  return locations.map((loc) => {
    // State-only result (for state searches)
    if (loc.state && !loc.city && !loc.name) {
      return {
        state: loc.state,
        type: 'state' as const,
      };
    }

    // City/Zipcode result
    return {
      id: loc.id || loc.cityID || '',
      city: loc.city || '',
      state: loc.abbr || loc.state || '',
      type: 'city' as const,
      premium: loc.premium === '1',
      href: loc.link || '',
      addressLine1: loc.name || loc.address || '',
      addressLine2: '', // Not provided in API response
    };
  });
}

/**
 * Type guard to check if result is a state result
 */
export function isStateResult(result: SearchResult): result is StateResult {
  return result.type === 'state' && 'state' in result && !('city' in result);
}
