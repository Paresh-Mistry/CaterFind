export default function EmptyResults({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center cf-fadein">
      <div className="w-20 h-20 rounded-full bg-[#F5F0E8] flex items-center justify-center text-4xl mb-6">
        🔍
      </div>
      <h3
        className="text-2xl text-[#1C2E20] mb-2"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        No caterers found
      </h3>
      <p className="text-sm text-[#8A8278] max-w-xs leading-[1.8] mb-6">
        Try adjusting your filters or search query to find what you're looking for.
      </p>
      <button
        onClick={onClear}
        className="rounded-full bg-[#C4865C] hover:bg-[#D49A72] text-white px-6 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-6px_rgba(196,134,92,0.4)]"
      >
        Clear all filters
      </button>
    </div>
  );
}