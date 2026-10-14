import { Metadata } from "next";
import { ReviewForm } from "@/features/public/reviews/components/ReviewForm";

export const metadata: Metadata = {
  title: "Submit a Review & Testimonial | Atelier Apparel",
  description:
    "Share your experience partnering with our OEM/ODM apparel manufacturing atelier.",
};

export default function CreateReviewPage() {
  return (
    <main className="bg-slate-50/50 min-h-screen py-12 lg:py-16">
      <ReviewForm />
    </main>
  );
}
