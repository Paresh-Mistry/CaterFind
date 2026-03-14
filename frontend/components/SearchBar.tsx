import { Search, X } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative cf-fadeup cf-d2">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8278] pointer-events-none" />
      <input
        type="text"
        placeholder="Search by name, cuisine, or location…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cf-search w-full rounded-2xl border border-[#C8BEA8] bg-white py-4 pl-11 pr-4 text-sm text-[#1C2E20] placeholder:text-[#8A8278] shadow-sm"
        style={{ fontFamily: 'var(--font-body)' }}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#E8E0D0] flex items-center justify-center text-[#8A8278] hover:bg-[#C8BEA8] transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}