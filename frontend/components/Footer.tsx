import { UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-forest-dark text-cream/70 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-md bg-clay flex items-center justify-center">
                <UtensilsCrossed className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-display text-lg font-semibold text-cream">
                Cater<span className="text-clay-light">Find</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Connecting people with exceptional catering services across India. From intimate
              gatherings to grand celebrations.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-cream font-medium mb-4 text-sm uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/', label: 'Discover Caterers' },
                { href: '/caterers', label: 'Browse All' },
                { href: '/add-caterer', label: 'List Your Service' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-cream transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* API */}
          <div>
            <h4 className="text-cream font-medium mb-4 text-sm uppercase tracking-wider">
              API
            </h4>
            <ul className="space-y-2 text-sm font-mono">
              {[
                'GET /api/caterers',
                'GET /api/caterers/:id',
                'POST /api/caterers',
                'GET /api/caterers/stats',
              ].map((ep) => (
                <li key={ep} className="text-clay-light/80">
                  {ep}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-xs text-center">
          © {new Date().getFullYear()} CaterFind. Built with Next.js, TypeScript &amp; Tailwind CSS.
        </div>
      </div>
    </footer>
  );
}