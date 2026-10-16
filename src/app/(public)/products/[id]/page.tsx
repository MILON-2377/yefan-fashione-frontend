"use client";

import { useProductDetail } from "@/features/public/products/hooks/useProductDetail";
import { ImageGallery } from "@/features/public/products/components/ImageGallery";
import { ProductDetailsTabs } from "@/features/public/products/components/ProductDetailsTabs";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  PackageCheck,
  Ruler,
  ShieldCheck,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";

  const { data: product, isLoading, isError } = useProductDetail(id);

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (isError || !product) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center bg-[#FAF8F4] px-5 py-20">
        <div className="max-w-md text-center">
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#9D8974]">
            Yifan Bridal & Couture
          </span>
          <div className="mx-auto my-6 h-px w-12 bg-[#D8C9B8]" />
          <h1 className="font-serif text-3xl font-normal tracking-tight text-[#211F1C] sm:text-4xl">
            Product Not Found
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#625D57]">
            This piece may no longer be available. Explore our collection to
            discover more designs.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex items-center justify-center gap-3 bg-[#211F1C] px-7 py-4 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#51463B]"
          >
            Explore Collection
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#211F1C]">
      {/* Breadcrumb */}
      <div className="border-b border-[#E7E1D9]">
        <div className="mx-auto flex max-w-360 items-center gap-2 px-5 py-4 text-[10px] uppercase tracking-[0.14em] sm:px-8 lg:px-12">
          <Link
            href="/"
            className="text-[#817970] transition-colors hover:text-[#211F1C]"
          >
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-[#B5AAA0]" />
          <Link
            href="/products"
            className="text-[#817970] transition-colors hover:text-[#211F1C]"
          >
            Collection
          </Link>
          <ChevronRight className="h-3 w-3 text-[#B5AAA0]" />
          <span className="max-w-[45%] truncate text-[#51463B]">
            {product.name}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-360 px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
        {/* Product Overview */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-20">
          <section className="lg:col-span-7">
            <div className="mb-4 flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#9D8974]">
                <span className="h-px w-5 bg-[#9D8974]" />
                Product Gallery
              </span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-[#817970]">
                {product.product_code}
              </span>
            </div>

            <div className="overflow-hidden border border-[#E7E1D9] bg-white p-2 sm:p-3">
              <ImageGallery media={product.media} productName={product.name} />
            </div>

            <div className="mt-4 flex items-start gap-3 border-b border-[#E7E1D9] pb-5">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#9D8974]" />
              <p className="text-xs leading-6 text-[#625D57]">
                Need wholesale, OEM / ODM, or private-label options? Contact our
                team to discuss your requirements for this design.
              </p>
            </div>
          </section>

          <aside className="lg:sticky lg:top-8 lg:col-span-5">
            <div className="border-b border-[#D8C9B8] pb-6">
              <div className="mb-5 flex items-center gap-2">
                <span className="h-px w-7 bg-[#9D8974]" />
                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#9D8974]">
                  Yifan Atelier · Wholesale Collection
                </span>
              </div>

              <h1 className="font-serif text-3xl font-normal leading-tight tracking-tight text-[#211F1C] sm:text-4xl xl:text-5xl">
                {product.name}
              </h1>

              {product.description && (
                <p className="mt-5 text-sm leading-7 text-[#625D57]">
                  {product.description}
                </p>
              )}

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <span className="border border-[#D8C9B8] bg-white px-3 py-2 text-[10px] uppercase tracking-[0.14em] text-[#51463B]">
                  Ref. {product.product_code}
                </span>
                <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[#817970]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#9D8974]" />
                  Wholesale Enquiries
                </span>
              </div>
            </div>

            <div className="py-7">
              <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9D8974]">
                Made for Your Collection
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#625D57]">
                Discuss available sizes, fabric options, customization, and
                order quantities with our team. Specifications and production
                arrangements are confirmed according to your requirements.
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href={`/contact?product=${product.id}`}
                className="group flex w-full items-center justify-between gap-4 bg-[#211F1C] px-6 py-5 text-white transition-colors duration-300 hover:bg-[#51463B]"
              >
                <span>
                  <span className="block text-[11px] font-medium uppercase tracking-[0.16em]">
                    Request a Wholesale Quote
                  </span>
                  <span className="mt-1 block text-xs text-white/65">
                    Tell us about your order requirements
                  </span>
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="group flex w-full items-center justify-between border border-[#D8C9B8] bg-transparent px-6 py-4 text-[#211F1C] transition-colors duration-300 hover:border-[#211F1C] hover:bg-white"
              >
                <span className="text-[10px] font-medium uppercase tracking-[0.16em]">
                  Discuss Customization
                </span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-7 grid grid-cols-2 border-y border-[#E7E1D9]">
              <div className="border-r border-[#E7E1D9] py-5 pr-4">
                <PackageCheck className="mb-3 h-5 w-5 text-[#9D8974]" />
                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#51463B]">
                  OEM / ODM
                </p>
                <p className="mt-1 text-xs leading-5 text-[#817970]">
                  Custom design enquiries
                </p>
              </div>
              <div className="py-5 pl-5">
                <Ruler className="mb-3 h-5 w-5 text-[#9D8974]" />
                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#51463B]">
                  Custom Sizing
                </p>
                <p className="mt-1 text-xs leading-5 text-[#817970]">
                  Discuss your specifications
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Specifications and Measurement Guide */}
        <section className="mt-16 border-t border-[#D8C9B8] pt-10 sm:mt-24 sm:pt-14">
          <div className="mb-8 max-w-2xl">
            <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#9D8974]">
              Details & Specifications
            </span>
            <h2 className="mt-3 font-serif text-3xl font-normal tracking-tight text-[#211F1C] sm:text-4xl">
              Designed with Intention
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#625D57]">
              Explore the product specifications and measurement information
              before discussing your order with our team.
            </p>
          </div>

          <div className="border border-[#E7E1D9] bg-white p-3 sm:p-6 lg:p-8">
            <ProductDetailsTabs product={product} />
          </div>
        </section>

        {/* Closing CTA */}
        <section className="relative mt-16 overflow-hidden bg-[#F0ECE6] px-6 py-12 sm:mt-24 sm:px-12 sm:py-16 lg:px-16">
          <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border border-[#D8C9B8]/70" />
          <div className="pointer-events-none absolute -right-2 -top-10 h-44 w-44 rounded-full border border-[#D8C9B8]/70" />

          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#9D8974]">
                Start a Conversation
              </span>
              <h2 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight text-[#211F1C] sm:text-4xl">
                Let’s Create Something Exceptional.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-[#625D57]">
                Share your ideas, target quantities, and business requirements.
                We’ll help you explore the right options for your collection.
              </p>
            </div>

            <Link
              href={`/contact?product=${product.id}`}
              className="group inline-flex shrink-0 items-center justify-center gap-3 self-start bg-[#211F1C] px-7 py-4 text-[10px] font-medium uppercase tracking-[0.17em] text-white transition-colors hover:bg-[#51463B] md:self-center"
            >
              Enquire About This Piece
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function ProductDetailSkeleton() {
  return (
    <main className="min-h-screen animate-pulse bg-[#FAF8F4]">
      <div className="border-b border-[#E7E1D9]">
        <div className="mx-auto max-w-360 px-5 py-4 sm:px-8 lg:px-12">
          <div className="h-3 w-52 bg-[#E7E1D9]" />
        </div>
      </div>

      <div className="mx-auto max-w-360 px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="mb-4 flex justify-between">
              <div className="h-3 w-28 bg-[#E7E1D9]" />
              <div className="h-3 w-20 bg-[#E7E1D9]" />
            </div>
            <div className="aspect-4/5 bg-[#F0ECE6] sm:aspect-[5/4] lg:aspect-[4/5]" />
            <div className="mt-5 h-12 bg-[#F0ECE6]" />
          </div>

          <div className="space-y-7 lg:col-span-5">
            <div className="border-b border-[#E7E1D9] pb-7">
              <div className="h-3 w-40 bg-[#E7E1D9]" />
              <div className="mt-6 h-10 w-4/5 bg-[#E7E1D9]" />
              <div className="mt-3 h-10 w-3/5 bg-[#E7E1D9]" />
              <div className="mt-6 space-y-3">
                <div className="h-3 w-full bg-[#E7E1D9]" />
                <div className="h-3 w-11/12 bg-[#E7E1D9]" />
                <div className="h-3 w-3/4 bg-[#E7E1D9]" />
              </div>
              <div className="mt-6 h-8 w-32 bg-[#E7E1D9]" />
            </div>

            <div className="space-y-3">
              <div className="h-3 w-36 bg-[#E7E1D9]" />
              <div className="h-3 w-full bg-[#E7E1D9]" />
              <div className="h-3 w-10/12 bg-[#E7E1D9]" />
            </div>

            <div className="h-20 bg-[#211F1C]/10" />
            <div className="h-14 border border-[#E7E1D9] bg-white" />
            <div className="grid grid-cols-2 gap-4 border-y border-[#E7E1D9] py-5">
              <div className="h-16 bg-[#F0ECE6]" />
              <div className="h-16 bg-[#F0ECE6]" />
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-[#D8C9B8] pt-12">
          <div className="h-3 w-40 bg-[#E7E1D9]" />
          <div className="mt-4 h-9 w-80 max-w-full bg-[#E7E1D9]" />
          <div className="mt-4 h-4 w-full max-w-xl bg-[#E7E1D9]" />
          <div className="mt-8 h-72 border border-[#E7E1D9] bg-white" />
        </div>
      </div>
    </main>
  );
}
