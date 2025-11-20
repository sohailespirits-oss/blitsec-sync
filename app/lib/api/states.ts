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
  // Use internal Next.js API route that reads from filesystem
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const response = await fetch(`${baseUrl}/api/json/all-states`);

  if (!response.ok) {
    throw new Error(`Failed to fetch states: ${response.statusText}`);
  }

  return response.json();
}
