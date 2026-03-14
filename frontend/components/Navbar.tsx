'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UtensilsCrossed, ArrowRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const navLinks = [
    { href: '/',         label: 'Discover'     },
    { href: '/caterers', label: 'All Caterers' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[rgba(255,255,255,0.8]/97 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)]'
            : 'bg-[#14291a] backdrop-blur-md'
        )}
      >
        {/* Top gradient accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#F5F0E8]/40 to-transparent pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">

          {/* ── Logo ──────────────────────────────────────────────── */}
          <Link href="/" className="group flex items-center gap-2.5 shrink-0">
            {/* Icon */}
            <div className="relative w-8 h-8 rounded-[10px] bg-[#C4865C] flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:bg-[#D49A72] group-hover:scale-105 group-hover:shadow-[0_0_16px_rgba(196,134,92,0.4)]">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/15 to-transparent" />
              <UtensilsCrossed className="w-4 h-4 text-white relative z-10" />
            </div>
            {/* Wordmark */}
            <span
              className="text-xl text-[#F5F0E8] tracking-[-0.02em] transition-opacity duration-200 group-hover:opacity-90"
              style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
            >
              Cater<span className="text-[#D49A72]">Find</span>
            </span>
          </Link>

          {/* ── Desktop nav ───────────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'relative px-4 py-2 rounded-full text-[0.8125rem] font-semibold tracking-wide transition-all duration-200',
                    active
                      ? 'text-[#F5F0E8] bg-white/10'
                      : 'text-[#F5F0E8]/55 hover:text-[#F5F0E8] hover:bg-white/[0.07]'
                  )}
                >
                  {label}
                  {active && (
                    <span className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C4865C]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Right actions ─────────────────────────────────────── */}
          <div className="flex items-center gap-2.5">
            {/* Desktop CTA */}
            <Link
              href="/add-caterer"
              className="group hidden sm:inline-flex items-center gap-2 bg-[#C4865C] hover:bg-[#D49A72] text-white px-5 py-2.5 rounded-full text-[0.8125rem] font-semibold tracking-wide transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-6px_rgba(196,134,92,0.5)]"
            >
              List Your Service
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>

            {/* Mobile CTA pill */}
            <Link
              href="/add-caterer"
              aria-label="List your service"
              className="sm:hidden inline-flex items-center justify-center w-9 h-9 bg-[#C4865C] hover:bg-[#D49A72] text-white rounded-full transition-colors duration-200"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/[0.06] text-[#F5F0E8]/70 hover:bg-white/10 hover:text-[#F5F0E8] transition-all duration-200"
            >
              {mobileOpen
                ? <X className="w-4 h-4" />
                : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown ──────────────────────────────────────── */}
        <div
          className={cn(
            'md:hidden border-t border-white/[0.06] overflow-hidden transition-all duration-300 ease-in-out',
            mobileOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          )}
        >
          <div className="px-4 py-3 flex flex-col gap-1 bg-[#162518]/98 backdrop-blur-xl">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150',
                    active
                      ? 'bg-white/10 text-[#F5F0E8]'
                      : 'text-[#F5F0E8]/55 hover:text-[#F5F0E8] hover:bg-white/[0.07]'
                  )}
                >
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-[#C4865C] shrink-0" />}
                  {label}
                </Link>
              );
            })}

            <Link
              href="/add-caterer"
              className="mt-1 mb-1 flex items-center justify-center gap-2 bg-[#C4865C] hover:bg-[#D49A72] text-white px-5 py-3 rounded-xl text-sm font-semibold tracking-wide transition-colors duration-200"
            >
              List Your Service
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Height spacer for fixed nav */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
}