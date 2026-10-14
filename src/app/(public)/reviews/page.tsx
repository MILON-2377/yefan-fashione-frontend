import { Metadata } from "next";
import { ReviewsCatalogContent } from "@/features/public/reviews/components/ReviewsCatalogContent";

export const metadata: Metadata = {
  title: "Client Testimonials & Partner Reviews | Atelier Apparel",
  description: "Explore reviews and testimonials from boutique buyers and fashion brands partnering with our OEM / ODM manufacturing atelier.",
};

export default function ReviewsPage() {
  return <ReviewsCatalogContent />;
}
