/**
 * Testimonials API Service
 * Connects to WordPress REST API for testimonials/reviews
 */

// WordPress API Response Types
export interface WordPressReviewACF {
  rating: number;
  reviewer_name: string;
  review_text: string;
  review_date?: string;
  reviewer_image?: {
    url: string;
    alt: string;
  };
  show_on_homepage: boolean;
}

export interface WordPressReview {
  id: number;
  acf: WordPressReviewACF;
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
    const isLocalhost = typeof window !== 'undefined' && window.location.host === 'localhost:5000';
    const baseUrl = isLocalhost
      ? 'https://njs.opusvirtualoffices.com'
      : (typeof window !== 'undefined' ? window.location.origin : '');

    const response = await fetch(
      `${baseUrl}/wp-json/opus/v1/reviews/homepage?per_page=${limit}`,
      {
        method: 'GET',
        next: { revalidate: 300 } // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const responseData: WordPressReview[] = await response.json();

    // Check if the API call returned data
    if (!Array.isArray(responseData)) {
      console.warn('API returned invalid response format');
      return [];
    }

    // Transform API response to component format
    return transformReviews(responseData);
  } catch (error) {
    console.error('[Testimonials API] Fetch error:', error);
    throw error;
  }
}

/**
 * Transform WordPress API reviews to component format
 */
function transformReviews(reviews: WordPressReview[]): Testimonial[] {
  return reviews
    .filter((review) => review.acf && review.acf.show_on_homepage)
    .map((review) => ({
      id: review.id,
      reviewerName: review.acf.reviewer_name?.trim() || 'Anonymous',
      reviewText: review.acf.review_text?.trim() || '',
      rating: review.acf.rating || 5,
    }));
}
