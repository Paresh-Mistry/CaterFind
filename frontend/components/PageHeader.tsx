export default function PageHeader() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#1C2E20] px-8 md:px-14 py-14 md:py-20 mb-10 cf-fadein">
      {/* BG grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      {/* Orbs */}
      <div className="pointer-events-none absolute -top-24 -right-16 w-80 h-80 rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(196,134,92,0.14),transparent 70%)' }} />
      <div className="pointer-events-none absolute -bottom-16 -left-10 w-60 h-60 rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(168,109,68,0.1),transparent 70%)' }} />

      <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D49A72] mb-3 cf-fadeup">
            Catering Services
          </p>
          <h1
            className="text-[clamp(2.5rem,6vw,4rem)] text-[#F5F0E8] leading-[1.05] tracking-[-0.02em] cf-fadeup cf-d1"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Browse{' '}
            <em className="not-italic italic text-[#D49A72]">caterers</em>
          </h1>
          <p className="mt-3 text-sm text-[#F5F0E8]/45 max-w-sm leading-[1.8] cf-fadeup cf-d2">
            Discover top-rated catering services across India — verified, reviewed, and ready to book.
          </p>
        </div>
        {/* Quick stats */}
        <div className="flex gap-6 cf-fadeup cf-d3">
          {[
            { value: '240+', label: 'Caterers' },
            { value: '4.8★', label: 'Avg Rating' },
            { value: '12+', label: 'Cuisines' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-light text-[#D49A72]" style={{ fontFamily: 'var(--font-display)' }}>
                {s.value}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#F5F0E8]/30 mt-0.5">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}