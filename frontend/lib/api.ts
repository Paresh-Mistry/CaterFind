import type {
  ApiResponse,
  Caterer,
  CatererFilters,
  CreateCatererPayload,
  PlatformStats,
} from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api';

// ─── Generic fetcher ─────────────────────────────────────────────────────────

async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const json = await res.json();
  if (!res.ok) {
    const message = json.errors?.join(', ') ?? json.message ?? 'Request failed';
    throw new Error(message);
  }
  return json as T;
}

// ─── Caterers ────────────────────────────────────────────────────────────────

export async function getCaterers(
  filters: Partial<CatererFilters>
): Promise<ApiResponse<Caterer[]>> {
  const params = new URLSearchParams();

  const sortVal = filters.sortBy ?? 'rating';
  let sortBy = sortVal;
  let order = 'desc';

  if (sortVal === 'pricePerPlate') { sortBy = 'pricePerPlate'; order = 'asc'; }
  else if (sortVal === 'pricePerPlate_desc') { sortBy = 'pricePerPlate'; order = 'desc'; }
  else if (sortVal === 'createdAt') { order = 'desc'; }

  params.set('page', String(filters.page ?? 1));
  params.set('limit', String(filters.limit ?? 9));
  params.set('sortBy', sortBy);
  params.set('order', order);

  if (filters.search) params.set('search', filters.search);
  if (filters.location) params.set('location', filters.location);
  if (filters.cuisine) params.set('cuisine', filters.cuisine);
  if (filters.minPrice) params.set('minPrice', filters.minPrice);
  if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
  if (filters.minRating) params.set('minRating', filters.minRating);

  return fetcher<ApiResponse<Caterer[]>>(`${API_BASE}/caterers?${params}`);
}

export async function getCatererById(id: string): Promise<ApiResponse<Caterer>> {
  return fetcher<ApiResponse<Caterer>>(`${API_BASE}/caterers/${id}`);
}

export async function createCaterer(
  payload: CreateCatererPayload
): Promise<ApiResponse<Caterer>> {
  return fetcher<ApiResponse<Caterer>>(`${API_BASE}/caterers`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateCaterer(
  id: string,
  payload: Partial<CreateCatererPayload>
): Promise<ApiResponse<Caterer>> {
  return fetcher<ApiResponse<Caterer>>(`${API_BASE}/caterers/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function deleteCaterer(id: string): Promise<ApiResponse<null>> {
  return fetcher<ApiResponse<null>>(`${API_BASE}/caterers/${id}`, {
    method: 'DELETE',
  });
}

export async function getPlatformStats(): Promise<ApiResponse<PlatformStats>> {
  return fetcher<ApiResponse<PlatformStats>>(`${API_BASE}/caterers/stats`);
}