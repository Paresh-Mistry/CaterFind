// ─── Core Domain Types ───────────────────────────────────────────────────────

export interface Caterer {
  id: string;
  name: string;
  location: string;
  pricePerPlate: number;
  cuisines: string[];
  rating: number;
  reviewCount: number;
  minGuests: number | null;
  maxGuests: number | null;
  description: string;
  contactEmail: string | null;
  contactPhone: string | null;
  tags: string[];
  images: string[];
  isVerified: boolean;
  createdAt: string;
  updatedAt?: string;
}

// ─── API Response Types ──────────────────────────────────────────────────────

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: PaginationMeta;
  filters?: Partial<CatererFilters>;
  message?: string;
  errors?: string[];
}

export interface PlatformStats {
  totalCaterers: number;
  verifiedCaterers: number;
  averageRating: string;
  averagePricePerPlate: number;
  priceRange: { min: number; max: number };
  topCuisines: { cuisine: string; count: number }[];
  topLocations: Record<string, number>;
}

// ─── Filter & Sort Types ─────────────────────────────────────────────────────

export type SortField = 'rating' | 'pricePerPlate' | 'pricePerPlate_desc' | 'name' | 'reviewCount' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

export interface CatererFilters {
  search: string;
  location: string;
  cuisine: string;
  minPrice: string;
  maxPrice: string;
  minRating: string;
  sortBy: SortField;
  page: number;
  limit: number;
}

// ─── Form Types ──────────────────────────────────────────────────────────────

export interface FormState {
  name: string;
  location: string;
  pricePerPlate: string;
  rating: string;
  minGuests: string;
  maxGuests: string;
  contactEmail: string;
  contactPhone: string;
  description: string;
}

export interface FormErrors {
  name?: string;
  location?: string;
  pricePerPlate?: string;
  rating?: string;
  cuisines?: string;
}

export interface CreateCatererPayload {
  name: string;
  location: string;
  pricePerPlate: number;
  cuisines: string[];
  rating: number;
  minGuests?: number;
  maxGuests?: number;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
}