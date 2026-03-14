import { X } from "lucide-react";

export default function PillSelector({
  options, selected, onToggle, colorActive = 'clay',
}: {
  options: string[];
  selected: string[];
  onToggle: (val: string) => void;
  colorActive?: 'clay' | 'forest';
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isActive = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onToggle(opt)}
            className={[
              'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200',
              isActive
                ? colorActive === 'forest'
                  ? 'bg-[#1C2E20] border-[#1C2E20] text-[#F5F0E8] shadow-[0_2px_8px_rgba(28,46,32,0.2)]'
                  : 'bg-[#C4865C] border-[#C4865C] text-white shadow-[0_2px_8px_rgba(196,134,92,0.3)]'
                : 'bg-[#F5F0E8] border-[#E8E0D0] text-[#5A5550] hover:border-[#C4865C] hover:text-[#C4865C] hover:-translate-y-0.5',
            ].join(' ')}
          >
            {isActive && <X className="w-2.5 h-2.5 opacity-75" />}
            {opt}
          </button>
        );
      })}
    </div>
  );
}