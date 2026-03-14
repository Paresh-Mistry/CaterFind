'use client';

import { useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { useCaterers } from '@/hooks/useCaterers';
import { useDebounce } from '@/hooks/useDebounce';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { CatererCard } from '@/components/CatererCard';
import { FilterSidebar } from '@/components/FilterSidebar';
import { Pagination } from '@/components/PaginationButton';
import type { CatererFilters } from '@/types';
import Skeleton from '@/components/Skeleton';
import EmptyResults from '@/components/EmptyResult';
import SearchBar from '@/components/SearchBar';
import PageHeader from '@/components/PageHeader';
import ResultsBar from '@/components/ResultBar';
import ErrorBanner from '@/components/ErrorBanner';


const DEFAULT_FILTERS: Partial<CatererFilters> = {
  sortBy: 'rating',
  page: 1,
  limit: 9,
};

function countActive(f: Partial<CatererFilters>): number {
  return (['search', 'location', 'cuisine', 'minPrice', 'maxPrice', 'minRating'] as const)
    .filter((k) => !!f[k]).length;
}

export default function CaterersPage() {
  const [savedFilters, setSavedFilters] = useLocalStorage<Partial<CatererFilters>>(
    'caterfind-filters',
    DEFAULT_FILTERS
  );
  const [filters, setFilters] = useState<Partial<CatererFilters>>(savedFilters);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const debouncedSearch = useDebounce(filters.search ?? '', 400);
  const activeFilters: Partial<CatererFilters> = {
    ...filters,
    search: debouncedSearch || undefined,
  };

  const { caterers, pagination, isLoading, error, refetch } = useCaterers(activeFilters);

  const handleChange = useCallback((next: Partial<CatererFilters>) => {
    setFilters(next);
  }, []);

  const handleApply = useCallback(() => {
    setSavedFilters(filters);
    setMobileFilterOpen(false);
  }, [filters, setSavedFilters]);

  const handleClear = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSavedFilters(DEFAULT_FILTERS);
    setMobileFilterOpen(false);
  }, [setSavedFilters]);

  const handlePageChange = useCallback(
    (page: number) => {
      const next = { ...filters, page };
      setFilters(next);
      setSavedFilters(next);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [filters, setSavedFilters]
  );

  const handleSort = useCallback(
    (value: string) => {
      const next = { ...filters, sortBy: value as CatererFilters['sortBy'], page: 1 };
      setFilters(next);
      setSavedFilters(next);
    },
    [filters, setSavedFilters]
  );

  const activeCount = countActive(activeFilters);

  return (
    <>
      {/* Mobile filter overlay */}
      {mobileFilterOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileFilterOpen(false)}
        />
      )}

      {/* Mobile filter drawer */}
      <div
        className={`cf-drawer fixed left-0 top-0 h-full w-80 bg-white z-50 shadow-2xl lg:hidden overflow-y-auto ${mobileFilterOpen ? 'open' : 'closed'}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E0D0] sticky top-0 bg-white">
          <p className="font-semibold text-[#1C2E20]" style={{ fontFamily: 'var(--font-body)' }}>
            Filters
            {activeCount > 0 && (
              <span className="ml-2 text-xs font-bold text-[#C4865C] bg-[rgba(196,134,92,0.1)] px-2 py-0.5 rounded-full">
                {activeCount} active
              </span>
            )}
          </p>
          <button
            onClick={() => setMobileFilterOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#8A8278] hover:bg-[#F5F0E8] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4">
          <FilterSidebar
            filters={filters}
            onChange={handleChange}
            onApply={handleApply}
            onClear={handleClear}
            activeCount={activeCount}
          />
        </div>
      </div>

      <div
        className="min-h-screen bg-[#F5F0E8]"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Hero header */}
          <PageHeader />

          {/* Search */}
          <div className="mb-6">
            <SearchBar
              value={filters.search ?? ''}
              onChange={(v) => setFilters((p) => ({ ...p, search: v, page: 1 }))}
            />
          </div>

          {/* Active filter pills */}
          {activeCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-5 cf-fadein">
              {filters.cuisine && (
                <span className="cf-pill">
                  🍛 {filters.cuisine}
                  <button onClick={() => setFilters((p) => ({ ...p, cuisine: undefined }))}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.location && (
                <span className="cf-pill">
                  📍 {filters.location}
                  <button onClick={() => setFilters((p) => ({ ...p, location: undefined }))}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.minRating && (
                <span className="cf-pill">
                  ★ {filters.minRating}+ rating
                  <button onClick={() => setFilters((p) => ({ ...p, minRating: undefined }))}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {(filters.minPrice || filters.maxPrice) && (
                <span className="cf-pill">
                  ₹ {filters.minPrice ?? '0'}–{filters.maxPrice ?? '∞'}
                  <button onClick={() => setFilters((p) => ({ ...p, minPrice: undefined, maxPrice: undefined }))}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={handleClear}
                className="text-[11px] font-semibold text-[#8A8278] hover:text-[#C4865C] underline transition-colors ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          <div className="flex gap-7 items-start">

            {/* ── Desktop Sidebar ─────────────────────────────────────── */}
            <div className="hidden lg:block w-68 shrink-0 cf-fadeup">
              <div className="sticky top-6">
                {/* Sidebar header */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8A8278]">
                    Filters
                  </p>
                  {activeCount > 0 && (
                    <button
                      onClick={handleClear}
                      className="text-[11px] font-semibold text-[#C4865C] hover:text-[#A86D44] transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <div className="bg-white rounded-2xl border border-[#E8E0D0] overflow-hidden shadow-sm">
                  <FilterSidebar
                    filters={filters}
                    onChange={handleChange}
                    onApply={handleApply}
                    onClear={handleClear}
                    activeCount={activeCount}
                  />
                </div>
              </div>
            </div>

            {/* ── Results ─────────────────────────────────────────────── */}
            <div className="min-w-0 flex-1">

              <ResultsBar
                total={pagination?.total ?? 0}
                activeCount={activeCount}
                sortBy={filters.sortBy ?? 'rating'}
                onSort={handleSort}
                onMobileFilter={() => setMobileFilterOpen(true)}
              />

              {error && <ErrorBanner onRetry={refetch} />}

              {isLoading && <Skeleton />}

              {!isLoading && !error && caterers.length === 0 && (
                <EmptyResults onClear={handleClear} />
              )}

              {!isLoading && caterers.length > 0 && (
                <div className="cf-grid grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {caterers.map((caterer, i) => (
                    <div
                      key={caterer.id}
                      className="cf-fadeup"
                      style={{ animationDelay: `${i * 0.06}s` }}
                    >
                      <CatererCard caterer={caterer} />
                    </div>
                  ))}
                </div>
              )}

              {!isLoading && pagination && pagination.totalPages > 1 && (
                <div className="mt-10 cf-fadein">
                  <Pagination pagination={pagination} onPageChange={handlePageChange} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
