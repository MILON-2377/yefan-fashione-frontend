export interface HeroBanner {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  bgImageUrl: string;
  metrics: {
    label: string;
    value: string;
  }[];
}


export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  itemCount?: number;
  parentId?: string | null;

}

export type ProductSpecifications = Record<string, string | number>;

// --- Product Variant (e.g. Size, Color, Custom Alloy Grade) ---
export interface ProductVariant {
  id: string;
  sku: string;
  name: string;
  price?: string;
  stockStatus?: "in_stock" | "out_of_stock" | "made_to_order";
  specifications?: ProductSpecifications;
}


// --- Primary Product Model ---
export interface Product {
  id: string;
  title: string;
  slug: string;
  sku: string;
  category: Category;
  description: string;
  specifications: ProductSpecifications;
  images: string[];
  priceRange?: string;
  moq?: string; // Minimum Order Quantity (e.g., "100 Units")
  isFeatured?: boolean;
  isActive?: boolean;
  variants?: ProductVariant[];
  downloadableSpecsUrl?: string; // Direct PDF spec sheet link
  createdAt: string;
  updatedAt?: string;
}



// --- Product Query Parameters for FastAPI Pagination & Filtering ---
export interface ProductQueryParams {
  page?: number;
  limit?: number;
  categorySlug?: string;
  search?: string;
  featured?: boolean;
  sortBy?: "newest" | "price_asc" | "price_desc" | "popular";
}



export interface WhatsAppConfig {
  phoneNumber: string;
  formattedNumber: string;
  qrImageUrl: string;
  messagePrefix?: string;
}



export interface ClientReview {
  id: string;
  clientName: string;
  roleTitle: string; // e.g., "Boutique Owner"
  companyName?: string;
  country: string; // e.g., "France", "United States"
  countryCode?: string; // e.g., "FR", "US"
  rating: number; // 1 - 5
  reviewText: string;
  orderType: string; // e.g., "OEM Bridal Custom Pack"
  date: string;
  verifiedOrder: boolean;
  avatarUrl?: string;
}




export interface NavCategory {
  id: string;
  title: string;
  slug: string; // Used for URL query params (e.g. "evening-gowns")
  href: string;
  description: string;
  itemCount?: number;
  imageUrl?: string;
}

export interface NavLinkItem {
  title: string;
  href: string;
}

export const MAIN_NAV_LINKS: NavLinkItem[] = [
  { title: "Home", href: "/" },
  { title: "Products", href: "/products" },
  { title: "About Us", href: "/about" },
  { title: "Downloads", href: "/downloads" },
  { title: "FAQ", href: "/faq" },
  { title: "Contact", href: "/contact" },
];