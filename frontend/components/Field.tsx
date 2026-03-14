export default function Field({
  label, required, error, hint, children, className = '',
}: {
  label: string; required?: boolean; error?: string;
  hint?: string; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="flex items-center gap-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-[#8A8278]">
        {label}
        {required && <span className="text-[#C4865C]">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="text-[11px] text-[#A89E94] leading-none">{hint}</p>
      )}
      {error && (
        <p className="flex items-center gap-1 text-[11px] font-semibold text-red-500 leading-none">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}