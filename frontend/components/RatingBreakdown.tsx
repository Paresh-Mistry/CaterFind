export default function RatingBreakdown({ rating }: { rating: number }) {
  const bars = [
    { label: 'Food Quality', pct: Math.min(100, (rating / 5) * 100 + 5) },
    { label: 'Service',      pct: Math.min(100, (rating / 5) * 100 - 2) },
    { label: 'Value',        pct: Math.min(100, (rating / 5) * 100 + 2) },
    { label: 'Presentation', pct: Math.min(100, (rating / 5) * 100 - 4) },
  ];
  return (
    <div className="space-y-3">
      {bars.map((b) => (
        <div key={b.label} className="flex items-center gap-3">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#8A8278', width: '88px', flexShrink: 0 }}>
            {b.label}
          </span>
          <div className="rating-bar-bg flex-1">
            <div className="rating-bar-fill" style={{ width: `${b.pct}%` }} />
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1C2E20', width: '28px', textAlign: 'right' }}>
            {(b.pct / 20).toFixed(1)}
          </span>
        </div>
      ))}
    </div>
  );
}