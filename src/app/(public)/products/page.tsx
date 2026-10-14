"use client";

import { Suspense } from "react";
import ProductsCatalogContent from "@/features/public/products/components/ProductCatalog";
import { useLanguage } from "@/context/LanguageContext";

function ProductsCatalogLoading() {
  const { dict } = useLanguage();
  return (
    <div className="p-10 text-center text-xs font-bold text-slate-500">
      {dict.productsPage.loadingCatalog}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsCatalogLoading />}>
      <ProductsCatalogContent />
    </Suspense>
  );
}
