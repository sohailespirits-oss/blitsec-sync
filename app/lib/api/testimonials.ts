/**
 * Testimonials API Service
 * Connects to WordPress REST API for testimonials
 */

// WordPress API Response Types
export interface WordPressReview {
  id: number;
  client_name: string;
  client_review: string;
  stars: number;
  review_by: string;
  show_on_general: string;
}

export interface WordPressReviewResponse {
  success: boolean;
  count: number;
  data: WordPressReview[];
}

// Transformed Testimonial Type for Component
export interface Testimonial {
  id: number;
  reviewerName: string;
  reviewText: string;
  rating: number;
}

/**
 * Fetch testimonials from WordPress API
 * @param limit - Number of testimonials to fetch (default: 4)
 */
export async function fetchTestimonials(limit: number = 4): Promise<Testimonial[]> {
  try {
    // Use production hostname for localhost development, otherwise use current site
    const isLocalhost = typeof window !== 'undefined'
      ? window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      : false;

    const baseUrl = isLocalhost
      ? 'https://njs.opusvirtualoffices.com'
      : (typeof window !== 'undefined' ? window.location.origin : '');

    const url = new URL('/wp-json/opus/v1/reviews', baseUrl);

    // Add query parameters
    url.searchParams.append('orderby', 'date');
    url.searchParams.append('order', 'desc');
    url.searchParams.append('per_page', limit.toString());

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const responseData: WordPressReviewResponse = await response.json();

    // Check if the API call was successful and has data
    if (!responseData.success || !responseData.data) {
      console.warn('API returned unsuccessful response or no data');
      return [];
    }

    // Transform API response to component format
    return transformReviews(responseData.data);
  } catch (error) {
    console.error('[Testimonials API] Fetch error:', error);
    throw error;
  }
}

/**
 * Transform WordPress API reviews to component format
 */
function transformReviews(reviews: WordPressReview[]): Testimonial[] {
  return reviews.map((review) => ({
    id: review.id,
    reviewerName: review.client_name.trim() || 'Anonymous',
    reviewText: review.client_review.trim(),
    rating: review.stars,
  }));
}
