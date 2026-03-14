import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { SORT_OPTIONS } from '@/lib/utils';

export default function ResultsBar({
  total,
  activeCount,
  sortBy,
  onSort,
  onMobileFilter,
}: {
  total: number;
  activeCount: number;
  sortBy: string;
  onSort: (v: string) => void;
  onMobileFilter: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6 cf-fadeup">
      <div className="flex items-center gap-3 flex-wrap">
        <p style={{ fontFamily: 'var(--font-display)' }}
          className="text-xl text-[#1C2E20] tracking-tight">
          <span className="text-[#C4865C]">{total}</span>{' '}
          caterer{total !== 1 ? 's' : ''} found
        </p>
        {activeCount > 0 && (
          <span className="text-[0.75rem] font-semibold text-[#8A8278] bg-[#F5F0E8] border border-[#E8E0D0] px-3 py-0.5 rounded-full">
            {activeCount} filter{activeCount !== 1 ? 's' : ''} active
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Mobile filter toggle */}
        <button
          onClick={onMobileFilter}
          className="lg:hidden flex items-center gap-2 border border-[#C8BEA8] bg-white text-[#1C2E20] text-sm font-semibold px-4 py-2 rounded-full hover:border-[#C4865C] hover:text-[#C4865C] transition-colors relative"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filters
          {activeCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#C4865C] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>

        {/* Sort */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSort(e.target.value)}
            className="cf-select"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8A8278]" />
        </div>
      </div>
    </div>
  );
}