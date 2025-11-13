/**
 * API service for fetching location states/provinces
 */

export interface State {
  state_id: string;
  state_abbr: string;
  state_name: string;
  timezone: string;
}

export interface Country {
  country_id: string;
  country_abbr: string;
  country_name: string;
  states: State[];
}

export interface StatesResponse {
  success: boolean;
  count: number;
  data: Country[];
}

/**
 * Fetch all states and provinces grouped by country
 */
export async function fetchStates(): Promise<StatesResponse> {
  const isLocalhost = typeof window !== 'undefined' && window.location.host === 'localhost:5000';
  const baseUrl = isLocalhost
    ? 'https://njs.opusvirtualoffices.com'
    : (typeof window !== 'undefined' ? window.location.origin : '');

  const response = await fetch(`${baseUrl}/jsonapi/all-states`, {
    next: { revalidate: 3600 } // Cache for 1 hour (states rarely change)
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch states: ${response.statusText}`);
  }

  return response.json();
}
