import { notFound } from "next/navigation";
import { ImageGallery } from "@/components/products/ImageGallery";
import { ProductInfo } from "@/components/products/ProductInfo";
import { ProductDetailsTabs } from "@/components/products/ProductDetailsTabs";

// Mock dataset generator (Replace with your actual database/API lookup)
const PRODUCT_DATA = {
  id: "prod-1",
  slug: "celestial-draped-mulberry-silk-evening-gown",
  title: "Celestial Draped Mulberry Silk Evening Gown",
  category: "evening-gowns",
  collection: "2026 Spring / Summer Lookbook",
  fabric: "100% Grade 6A Mulberry Silk",
  moq: "10 pcs / color",
  inStock: true,
  images: [
    "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80",
  ],
  pricingTiers: [
    { quantityRange: "10 - 49 pcs", pricePerUnit: "$120.00" },
    { quantityRange: "50 - 199 pcs", pricePerUnit: "$98.00" },
    { quantityRange: "200+ pcs", pricePerUnit: "$85.00" },
  ],
  colors: [
    { name: "Navy Slate", hex: "#1E293B" },
    { name: "Muted Steel", hex: "#94A3B8" },
    { name: "Soft Ivory", hex: "#E2E8F0" },
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  description:
    "Tailored from high-grade 22 momme Mulberry Silk, this floor-length evening gown features precision cowl-neck draping and hidden reinforced inner seam stitching designed specifically for boutique luxury lines.",
  fabricSpecs: [
    { label: "Fabric Composition", value: "100% Mulberry Silk (22 Momme)" },
    { label: "Weave Type", value: "Satin Finish Charmeuse" },
    { label: "Care Instructions", value: "Dry Clean Only" },
    { label: "Country of Origin", value: "Guangzhou, China" },
  ],
  oemFeatures: [
    "Custom Brand Woven Labels & Hangtags",
    "Tech-Pack Adjustment & Pattern Alteration",
    "Custom Dyeing to Pantone TCX Colors",
    "Biodegradable Individual Polybag Packaging",
  ],
};

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  // If routing dynamically, validate slug matches your catalog
  if (!PRODUCT_DATA) {
    notFound();
  }

  return (
    <div className="bg-white text-slate-900 py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Top Split Layout: Left Image Gallery & Right Product Information */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <ImageGallery
              images={PRODUCT_DATA.images}
              title={PRODUCT_DATA.title}
            />
          </div>
          <div className="lg:col-span-5">
            <ProductInfo product={PRODUCT_DATA} />
          </div>
        </div>

        {/* Bottom Section: Tabs for Deep Tech Specs, OEM Capabilities, and Close-up Views */}
        <div className="pt-6">
          <ProductDetailsTabs
            description={PRODUCT_DATA.description}
            fabricSpecs={PRODUCT_DATA.fabricSpecs}
            oemFeatures={PRODUCT_DATA.oemFeatures}
            galleryImages={PRODUCT_DATA.images}
          />
        </div>
      </div>
    </div>
  );
}
