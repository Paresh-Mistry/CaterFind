import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Star, Shield, ChefHat, TrendingUp } from 'lucide-react';
import { getCaterers, getPlatformStats } from '@/lib/api';
import { cn, formatPrice } from '@/lib/utils';
import type { Caterer, PlatformStats } from '@/types';
import { CatererCard } from '@/components/CatererCard';
import FeatureCard from '@/components/FeatureCard';
import { dmSerif } from '@/font/font';



function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 group">
      <span className={cn("text-[#d8d7d7] text-[2rem] font-light text-clay-light tracking-tight group-hover:text-cream transition-colors duration-300", dmSerif.className)}>
        {value}
      </span>
      <span className="text-[10px] text-white font-bold uppercase tracking-[0.18em] text-cream/35">
        {label}
      </span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const [statsResult, caterersResult] = await Promise.allSettled([
    getPlatformStats(),
    getCaterers({ sortBy: 'rating', limit: 3 }),
  ]);

  const stats: PlatformStats | null =
    statsResult.status === 'fulfilled' ? statsResult.value.data : null;
  const topCaterers: Caterer[] =
    caterersResult.status === 'fulfilled' ? caterersResult.value.data : [];

  return (
    <>
      <main className="overflow-x-hidden bg-[#F5F0E8]" style={{ fontFamily: 'var(--font-body)' }}>

        <section className="relative min-h-screen flex flex-col justify-center bg-[#1C2E20] overflow-hidden pt-16">

          {/* Grid texture */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />

          {/* Orbs */}
          <div className="pointer-events-none absolute -top-40 -right-20 h-[600px] w-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(196,134,92,0.12) 0%, transparent 70%)' }}
          />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-96 w-96 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(168,109,68,0.1) 0%, transparent 70%)' }}
          />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 w-full text-center">

            {/* Badge */}
            <div className="flex justify-center mb-10 animate-fadeUp">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-md px-5 py-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D49A72] animate-dot-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D49A72]/90">
                  Find &amp; Book Premium Caterers
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1
              className={cn("text-[clamp(3rem,8vw,5.5rem)] text-[#F5F0E8] leading-[1.05] tracking-[-0.02em] mb-6 animate-fadeUp delay-100", dmSerif.className)}
            >
              Discover{' '}
              <span className="relative inline-block">
                <em className="not-italic italic text-[#D49A72]">exceptional</em>
                <span
                  className="animate-underline absolute -bottom-1 left-0 right-0 h-[2px]"
                  style={{ background: 'linear-gradient(90deg, transparent, #D49A72, transparent)' }}
                />
              </span>
              <br />
              <span className="text-[#F5F0E8]/55">caterers for every</span>
              <br />
              occasion
            </h1>

            <p className="text-[1.0625rem] text-[#F5F0E8]/50 max-w-md mx-auto mb-10 leading-[1.85] font-light animate-fadeUp delay-200">
              From intimate home dinners to grand weddings — explore top-rated catering
              services across India, curated and verified.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-20 animate-fadeUp delay-300">
              <Link
                href="/caterers"
                className="group inline-flex items-center gap-2.5 bg-[#C4865C] hover:bg-[#D49A72] text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_-8px_rgba(196,134,92,0.45)]"
              >
                Browse Caterers
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/add-caterer"
                className="inline-flex items-center gap-2.5 border border-white/12 bg-white/[0.05] hover:bg-white/[0.10] text-[#F5F0E8]/75 hover:text-[#F5F0E8] px-8 py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 backdrop-blur-sm"
              >
                List Your Service
                <ArrowUpRight className="w-4 h-4 opacity-60" />
              </Link>
            </div>

            {/* Stats */}
            {stats && (
              <div className="max-w-xl mx-auto animate-fadeUp delay-400">
                <div className="grid grid-cols-2 md:grid-cols-4 border border-white/[0.07] rounded-2xl overflow-hidden bg-white/[0.03] backdrop-blur-md">
                  {[
                    { value: String(stats.totalCaterers), label: 'Caterers Listed' },
                    { value: String(stats.verifiedCaterers), label: 'Verified' },
                    { value: `${stats.averageRating} ★`, label: 'Avg Rating' },
                    { value: formatPrice(stats.averagePricePerPlate), label: 'Avg / Plate' },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="py-7 px-4 flex items-center justify-center border-r border-white/[0.06] last:border-r-0 hover:bg-white/[0.04] transition-colors duration-200"
                    >
                      <StatPill value={s.value} label={s.label} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Wave divider */}
          <div className="relative overflow-hidden" style={{ height: '72px', background: '#F5F0E8', marginTop: '-1px' }}>
            <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 72" preserveAspectRatio="none" fill="none">
              <path d="M0,72 L0,36 Q180,0 360,28 Q540,56 720,18 Q900,-8 1080,28 Q1260,56 1440,18 L1440,72 Z" fill="#1C2E20" />
            </svg>
          </div>
        </section>

        {/* ─── MARQUEE ──────────────────────────────────────────────────── */}
        <div className="bg-[#C4865C] overflow-hidden py-3.5">
          <div className="flex animate-marquee" style={{ width: 'max-content' }}>
            {Array(4).fill(null).map((_, i) => (
              <span key={i} className="inline-flex items-center gap-6 px-8 text-[11px] font-bold uppercase tracking-[0.18em] text-white/75">
                {['Verified Caterers', 'Real Reviews', 'Free Listings', 'Across India', 'Every Cuisine', 'Every Budget'].map((t) => (
                  <span key={t} className="inline-flex items-center gap-3">
                    <span className="inline-block w-1 h-1 rounded-full bg-white/30" />
                    {t}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* ─── FEATURES ─────────────────────────────────────────────────── */}
        <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <div className="grid lg:grid-cols-[1fr_1.8fr] gap-20 items-start">

            {/* Sticky left */}
            <div className="lg:sticky lg:top-24 reveal">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C4865C] mb-3.5">
                Why CaterFind
              </p>
              <h2 className={cn("text-[clamp(2.25rem,5vw,3.25rem)] text-[#1C2E20] leading-[1.1] tracking-[-0.02em] mb-4", dmSerif.className)}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Everything you need to find the{' '}
                <em className="not-italic italic text-[#C4865C]">perfect caterer</em>
              </h2>
              <p className="text-sm text-[#8A8278] leading-[1.85] max-w-xs">
                We've built the most trusted catering marketplace in India — so you can focus
                on your event, not your search.
              </p>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-4">
              <div className="reveal reveal-d1">
                <FeatureCard
                  icon={<Star className="w-5 h-5" />}
                  title="Verified Reviews"
                  description="Every rating comes from a real event. Honest feedback from verified clients — nothing fabricated, nothing anonymous. You see the truth before you book."
                  accentClass="bg-[rgba(196,134,92,0.1)] text-[#C4865C]"
                />
              </div>
              <div className="reveal reveal-d2">
                <FeatureCard
                  icon={<Shield className="w-5 h-5" />}
                  title="Verified Businesses"
                  description="We check credentials, licenses, and operating history so you can book with complete peace of mind. Every listing is vetted before it goes live."
                  accentClass="bg-[rgba(28,46,32,0.08)] text-[#1C2E20]"
                />
              </div>
              <div className="reveal reveal-d3">
                <FeatureCard
                  icon={<ChefHat className="w-5 h-5" />}
                  title="Curated Selection"
                  description="Every cuisine, every budget, every city — from royal banquets in Delhi to intimate coastal dinners in Goa. If it exists, you'll find it here."
                  accentClass="bg-[rgba(168,109,68,0.08)] text-[#A86D44]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─── TOP CATERERS ────────────────────────────────────────────── */}
        {topCaterers.length > 0 && (
          <section className="relative py-28 overflow-hidden bg-[#FAF8F4]">
            <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[380px] rounded-full"
              style={{ background: 'radial-gradient(ellipse, rgba(196,134,92,0.06), transparent)' }}
            />

            <div className="relative max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between flex-wrap gap-6 mb-14 reveal">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C4865C] mb-3">
                    Top Rated
                  </p>
                  <h2 className={cn("text-[clamp(2.25rem,5vw,3.25rem)] text-[#1C2E20] tracking-[-0.02em] leading-tight", dmSerif.className)}
                  >
                    Featured caterers
                  </h2>
                </div>
                <Link
                  href="/caterers"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-[#C4865C] hover:text-[#A86D44] border-b border-[#C4865C]/30 hover:border-[#A86D44] pb-0.5 mb-2 transition-all"
                >
                  View all
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200" />
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {topCaterers.map((caterer, i) => (
                  <div
                    key={caterer.id}
                    className={`reveal reveal-d${i + 1}`}
                  >
                    <CatererCard caterer={caterer} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── CUISINE ─────────────────────────────────────────────────── */}
        <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 reveal">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C4865C] mb-3">
                Explore
              </p>
              <h2 className={cn("text-[clamp(2.25rem,5vw,3.25rem)] text-[#1C2E20] tracking-[-0.02em]",dmSerif.className)}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Browse by cuisine
              </h2>
            </div>
            <p className="text-sm text-[#8A8278] md:max-w-xs leading-[1.8]">
              Find caterers specialising in your preferred cuisine or style of cooking.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 reveal">
            {[
              { name: 'Indian', emoji: '🍛' },
              { name: 'North Indian', emoji: '🫓' },
              { name: 'South Indian', emoji: '🥘' },
              { name: 'Mughlai', emoji: '🍖' },
              { name: 'Biryani', emoji: '🍚' },
              { name: 'Seafood', emoji: '🦐' },
              { name: 'Chinese', emoji: '🥢' },
              { name: 'Continental', emoji: '🥗' },
              { name: 'Vegan', emoji: '🌿' },
              { name: 'Kebabs', emoji: '🍢' },
              { name: 'Punjabi', emoji: '🧆' },
              { name: 'Rajasthani', emoji: '🫕' },
            ].map(({ name, emoji }) => (
              <Link
                key={name}
                href={`/caterers?cuisine=${encodeURIComponent(name)}`}
                className="group inline-flex items-center gap-2 rounded-full border border-[#C8BEA8] bg-white hover:bg-[#F5F0E8] px-5 py-2.5 text-sm font-medium text-[#1C2E20] hover:border-[#C4865C] hover:text-[#C4865C] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
              >
                <span className="text-base leading-none">{emoji}</span>
                {name}
              </Link>
            ))}
          </div>
        </section>

        {/* ─── CTA BANNER ──────────────────────────────────────────────── */}
        <section className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 pb-28">
          <div className="relative overflow-hidden rounded-[28px] bg-[#1C2E20] reveal">

            {/* BG decoration */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(196,134,92,0.12), transparent)' }}
              />
              <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(168,109,68,0.1), transparent)' }}
              />
              <div className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)',
                  backgroundSize: '48px 48px',
                }}
              />
            </div>

            <div className="relative grid md:grid-cols-[1fr_auto] gap-12 items-center px-8 md:px-16 py-16 md:py-20">

              {/* Left */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 mb-8">
                  <TrendingUp className="w-3.5 h-3.5 text-[#D49A72]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#D49A72]">
                    For Caterers
                  </span>
                </div>
                <h2
                  className={cn("text-[clamp(2.25rem,4.5vw,3.25rem)] text-[#F5F0E8] mb-5 tracking-[-0.02em] leading-[1.1]",dmSerif.className)}
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Own a catering<br />
                  <em className="not-italic italic text-[#D49A72]">business?</em>
                </h2>
                <p className="text-[#F5F0E8]/45 text-sm max-w-sm leading-[1.9]">
                  Join hundreds of verified caterers on CaterFind and start receiving
                  enquiries from serious clients. Listing is completely free.
                </p>
              </div>

              {/* Right card */}
              <div className="md:min-w-[260px]">
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-sm p-8 text-center">
                  <p className={cn("text-[3rem] text-[#F5F0E8] leading-none mb-1",dmSerif.className)}
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Free
                  </p>
                  <p className="text-[10px] text-[#F5F0E8]/35 font-bold uppercase tracking-widest mb-6">
                    Always &amp; forever
                  </p>
                  <Link
                    href="/add-caterer"
                    className="group w-full inline-flex items-center justify-center gap-2 bg-[#C4865C] hover:bg-[#D49A72] text-white px-6 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:shadow-[0_8px_30px_-6px_rgba(196,134,92,0.5)]"
                  >
                    List Your Service
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 duration-200" />
                  </Link>
                  <p className="mt-4 text-[11px] text-[#F5F0E8]/25">
                    No credit card required
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Scroll-reveal observer */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            var els = document.querySelectorAll('.reveal');
            if (!window.IntersectionObserver) {
              els.forEach(function(el) { el.classList.add('visible'); });
              return;
            }
            var obs = new IntersectionObserver(function(entries) {
              entries.forEach(function(e) {
                if (e.isIntersecting) {
                  e.target.classList.add('visible');
                  obs.unobserve(e.target);
                }
              });
            }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
            els.forEach(function(el) { obs.observe(el); });
          })();
        `
      }} />
    </>
  );
}