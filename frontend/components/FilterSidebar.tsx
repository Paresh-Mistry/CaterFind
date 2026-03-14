'use client';

import { SlidersHorizontal, X, ChevronDown, MapPin, ChefHat, Star, IndianRupee } from 'lucide-react';
import { CUISINE_OPTIONS, RATING_OPTIONS, cn } from '@/lib/utils';
import type { CatererFilters } from '@/types';


interface FilterSidebarProps {
  filters: Partial<CatererFilters>;
  onChange: (filters: Partial<CatererFilters>) => void;
  onApply: () => void;
  onClear: () => void;
  activeCount: number;
}

// ─── FilterSection ────────────────────────────────────────────────────────────
function FilterSection({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.625rem' }}>
        <div className="fsb-section-icon">{icon}</div>
        <p style={{
          fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: '#8A8278',
          fontFamily: 'var(--font-body, "Instrument Sans", sans-serif)',
        }}>
          {label}
        </p>
      </div>
      {children}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function FilterSidebar({
  filters,
  onChange,
  onApply,
  onClear,
  activeCount,
}: FilterSidebarProps) {
  const update = (key: keyof CatererFilters, value: string) => {
    onChange({ ...filters, [key]: value || undefined, page: 1 });
  };

  // Active filter labels for the summary chips
  const activeChips: { key: keyof CatererFilters; label: string }[] = [
    ...(filters.cuisine    ? [{ key: 'cuisine'   as const, label: `🍛 ${filters.cuisine}`           }] : []),
    ...(filters.location   ? [{ key: 'location'  as const, label: `📍 ${filters.location}`          }] : []),
    ...(filters.minRating  ? [{ key: 'minRating' as const, label: `★ ${filters.minRating}+`          }] : []),
    ...((filters.minPrice || filters.maxPrice)
      ? [{ key: 'minPrice' as const, label: `₹ ${filters.minPrice ?? '0'}–${filters.maxPrice ?? '∞'}` }]
      : []),
  ];

  return (
    <>
      <aside style={{ fontFamily: 'var(--font-body, "Instrument Sans", sans-serif)', padding: '1.5rem' }}>

        {/* ── Header ────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <SlidersHorizontal style={{ width: '15px', height: '15px', color: '#C4865C' }} />
            <h2 style={{
              fontFamily: 'var(--font-display, "DM Serif Display", Georgia, serif)',
              fontSize: '1.125rem', color: '#1C2E20', letterSpacing: '-0.01em',
            }}>
              Filters
            </h2>
            {activeCount > 0 && (
              <span style={{
                background: '#C4865C', color: '#fff',
                fontSize: '0.625rem', fontWeight: 700,
                width: '18px', height: '18px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {activeCount}
              </span>
            )}
          </div>
        </div>

        {/* Active chips summary */}
        {activeChips.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '1.25rem' }}>
            {activeChips.map((chip) => (
              <span key={chip.key} className="fsb-active-chip">
                {chip.label}
                <button
                  onClick={() => onChange({ ...filters, [chip.key]: undefined, ...(chip.key === 'minPrice' ? { maxPrice: undefined } : {}), page: 1 })}
                  aria-label={`Remove ${chip.label} filter`}
                >
                  <X style={{ width: '10px', height: '10px' }} />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="fsb-divider" style={{ marginBottom: '1.25rem' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* ── Price Range ─────────────────────────────────────────── */}
          <FilterSection
            label="Price per Plate"
            icon={<IndianRupee style={{ width: '13px', height: '13px' }} />}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                className="fsb-input"
                type="number"
                placeholder="Min ₹"
                value={filters.minPrice ?? ''}
                onChange={(e) => update('minPrice', e.target.value)}
                min={0}
                style={{ minWidth: 0 }}
              />
              <div className="fsb-price-sep" />
              <input
                className="fsb-input"
                type="number"
                placeholder="Max ₹"
                value={filters.maxPrice ?? ''}
                onChange={(e) => update('maxPrice', e.target.value)}
                min={0}
                style={{ minWidth: 0 }}
              />
            </div>
            {/* Quick price presets */}
            <div style={{ display: 'flex', gap: '0.375rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { label: 'Under ₹500', min: '', max: '500' },
                { label: '₹500–1k', min: '500', max: '1000' },
                { label: '₹1k+', min: '1000', max: '' },
              ].map((p) => {
                const isActive = filters.minPrice === p.min && filters.maxPrice === p.max;
                return (
                  <button
                    key={p.label}
                    onClick={() => onChange({ ...filters, minPrice: p.min || undefined, maxPrice: p.max || undefined, page: 1 })}
                    style={{
                      fontSize: '0.6875rem', fontWeight: 600, padding: '0.25rem 0.625rem',
                      borderRadius: '100px', border: '1px solid',
                      borderColor: isActive ? '#C4865C' : '#E8E0D0',
                      background: isActive ? 'rgba(196,134,92,0.1)' : 'transparent',
                      color: isActive ? '#C4865C' : '#8A8278',
                      cursor: 'pointer', transition: 'all 0.15s',
                      fontFamily: 'var(--font-body, "Instrument Sans", sans-serif)',
                    }}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </FilterSection>

          <div className="fsb-divider" />

          {/* ── Cuisine ─────────────────────────────────────────────── */}
          <FilterSection
            label="Cuisine"
            icon={<ChefHat style={{ width: '13px', height: '13px' }} />}
          >
            <div className="fsb-select-wrap">
              <select
                className="fsb-select"
                value={filters.cuisine ?? ''}
                onChange={(e) => update('cuisine', e.target.value)}
              >
                <option value="">All Cuisines</option>
                {CUISINE_OPTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown className="fsb-select-icon" style={{ width: '14px', height: '14px' }} />
            </div>
          </FilterSection>

          <div className="fsb-divider" />

          {/* ── Location ────────────────────────────────────────────── */}
          <FilterSection
            label="Location"
            icon={<MapPin style={{ width: '13px', height: '13px' }} />}
          >
            <div style={{ position: 'relative' }}>
              <MapPin style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', width: '13px', height: '13px', color: '#A89E94', pointerEvents: 'none' }} />
              <input
                className="fsb-input"
                type="text"
                placeholder="City or state…"
                value={filters.location ?? ''}
                onChange={(e) => update('location', e.target.value)}
                style={{ paddingLeft: '2rem' }}
              />
            </div>
          </FilterSection>

          <div className="fsb-divider" />

          {/* ── Min Rating ──────────────────────────────────────────── */}
          <FilterSection
            label="Minimum Rating"
            icon={<Star style={{ width: '13px', height: '13px' }} />}
          >
            <div style={{ display: 'flex', gap: '0.375rem' }}>
              {RATING_OPTIONS.map(({ value, label }) => {
                const isActive = filters.minRating === value;
                return (
                  <button
                    key={value}
                    className={cn('fsb-rating-btn', isActive && 'active')}
                    onClick={() => update('minRating', isActive ? '' : value)}
                  >
                    <Star
                      className="fsb-star"
                      style={{ width: '12px', height: '12px', fill: isActive ? '#D49A72' : 'none', stroke: isActive ? '#D49A72' : 'currentColor' }}
                    />
                    {label}+
                  </button>
                );
              })}
            </div>
          </FilterSection>

          <div className="fsb-divider" />

          {/* ── Actions ─────────────────────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '0.25rem' }}>
            <button className="fsb-apply-btn" onClick={onApply}>
              <SlidersHorizontal style={{ width: '14px', height: '14px' }} />
              Apply Filters
              {activeCount > 0 && (
                <span style={{
                  background: 'rgba(212,154,114,0.25)', color: '#D49A72',
                  fontSize: '0.625rem', fontWeight: 700,
                  padding: '0.15rem 0.45rem', borderRadius: '100px',
                }}>
                  {activeCount} active
                </span>
              )}
            </button>

            {activeCount > 0 && (
              <button className="fsb-clear-btn" onClick={onClear}>
                <X style={{ width: '13px', height: '13px' }} />
                Clear all filters
              </button>
            )}
          </div>

        </div>
      </aside>
    </>
  );
}