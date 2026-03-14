export default function FeatureCard({
  icon,
  title,
  description,
  accentClass,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentClass: string;
}) {
  return (
    <div className="group relative rounded-3xl bg-white border border-sand p-8 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_64px_-12px_rgba(0,0,0,0.1)] hover:border-sand-dark">
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(circle at top right, rgba(196,134,92,0.05), transparent)' }}
      />
      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-6 ${accentClass}`}>
        {icon}
      </div>
      <h3 className="font-sans text-[1.0625rem] font-semibold text-forest mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-sm text-muted leading-[1.85]">{description}</p>
    </div>
  );
}