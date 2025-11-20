import { fetchTestimonials } from "@/app/lib/api/testimonials";
import { HomePageClient } from "@/app/components/HomePageClient";

// Server component that fetches data and passes to client
export default async function Page() {
  const testimonials = await fetchTestimonials(4);

  return <HomePageClient testimonials={testimonials} />;
}
