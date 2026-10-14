"use client";

import { useParams } from "next/navigation";
import { useProductDetail } from "@/features/public/products/hooks/useProductDetail";
import { ImageGallery } from "@/features/public/products/components/ImageGallery";
import { ProductInfo } from "@/features/public/products/components/ProductInfo";
import { ProductDetailsTabs } from "@/features/public/products/components/ProductDetailsTabs";

export default function ProductDetailPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";

  const { data: product, isLoading, isError } = useProductDetail(id);

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (isError || !product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4 px-4 py-16">
        <h1 className="text-2xl font-bold text-slate-900">Product Not Found</h1>
        <p className="text-sm text-slate-500">
          The requested product could not be located or is no longer available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white text-slate-900 py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Top Split Layout: Left Image Gallery & Right Product Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <ImageGallery media={product.media} productName={product.name} />
          </div>
          <div className="lg:col-span-5">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Bottom Section: Technical Specifications & Measurement Guide Tabs */}
        <div className="pt-6">
          <ProductDetailsTabs product={product} />
        </div>
      </div>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="bg-white py-10 lg:py-14 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 h-125 bg-slate-100 rounded-2xl" />
          <div className="lg:col-span-5 space-y-4">
            <div className="h-6 w-1/3 bg-slate-100 rounded-md" />
            <div className="h-10 w-3/4 bg-slate-100 rounded-md" />
            <div className="h-24 w-full bg-slate-100 rounded-md" />
            <div className="h-12 w-full bg-slate-100 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
