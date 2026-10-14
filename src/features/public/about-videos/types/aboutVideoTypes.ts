export type AboutVideoStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface PublicAboutVideoItem {
  id: string;
  title: string;
  description?: string;
  media_asset_id: string;
  video_url?: string;
  sort_order: number;
  status: AboutVideoStatus;
  created_at: string;
  updated_at: string;
}

export interface AboutPageMetrics {
  readonly experience: string;
  readonly output: string;
  readonly partners: string;
  readonly certified: string;
}

export interface AboutPageFacility {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly specs: readonly string[];
}

export interface AboutPageDictContent {
  readonly badge: string;
  readonly heading: string;
  readonly descriptionStrong: string;
  readonly descriptionText: string;
  readonly metrics: AboutPageMetrics;
  readonly videoSectionTitle?: string;
  readonly videoSectionDesc?: string;
  readonly capabilitiesTitle: string;
  readonly capabilitiesDesc: string;
  readonly facilities: readonly AboutPageFacility[];
  readonly galleryTitle: string;
  readonly galleryItems: readonly string[];
  readonly ctaHeading: string;
  readonly ctaDesc: string;
  readonly ctaButton: string;
  readonly sidebarCollections: string;
  readonly viewAll: string;
  readonly consultationTitle: string;
  readonly consultationDesc: string;
  readonly consultationButton: string;
}
