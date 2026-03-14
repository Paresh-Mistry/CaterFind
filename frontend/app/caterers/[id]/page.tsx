"use client"
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft, Star, MapPin, Phone, Mail,
  Users, ChefHat, CheckCircle, Calendar, Tag,
  ArrowRight, Quote,
} from 'lucide-react';
import { getCatererById } from '@/lib/api';
import { formatPrice, formatDate, getTagColor, FALLBACK_IMAGE, cn } from '@/lib/utils';
import RatingBreakdown from '@/components/RatingBreakdown';


interface PageProps {
  params: Promise<{ id: string }>;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarDisplay({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? '#C4865C' : 'none'}
          stroke={i <= Math.round(rating) ? '#C4865C' : '#C8BEA8'} strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CatererDetailPage({ params }: PageProps) {
  const { id } = await params;

  let caterer: any;
  try {
    const res = await getCatererById(id);
    caterer = res.data;
  } catch {
    notFound();
  }

  const heroImage = caterer.images?.[0] || FALLBACK_IMAGE;
  const extraImages = caterer.images?.slice(1, 3) || [];

  return (
    <>

      <div className="min-h-screen" style={{ background: '#F5F0E8', fontFamily: 'var(--font-body)' }}>

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <div className="relative w-full" style={{ height: 'clamp(360px, 48vw, 520px)' }}>
          <Image
            src={heroImage}
            alt={caterer.name}
            fill
            priority
            className="object-cover"
            style={{ transition: 'transform 0.7s ease' }}
          />

          {/* Layered gradient */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(28,46,32,0.92) 0%, rgba(28,46,32,0.4) 45%, rgba(0,0,0,0.1) 100%)' }}
          />

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)',
              backgroundSize: '56px 56px',
            }}
          />

          {/* Back */}
          <div className="absolute top-6 left-6">
            <Link href="/caterers" className="back-btn">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to caterers
            </Link>
          </div>

          {/* Verified badge */}
          {caterer.isVerified && (
            <div className="absolute top-6 right-6">
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                background: 'rgba(28,46,32,0.85)', backdropFilter: 'blur(10px)',
                color: '#D49A72', fontSize: '0.6875rem', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '0.375rem 0.875rem', borderRadius: '100px',
                border: '1px solid rgba(212,154,114,0.3)',
              }}>
                <CheckCircle style={{ width: '12px', height: '12px' }} /> Verified
              </div>
            </div>
          )}

          {/* Bottom overlay content */}
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pb-10">
            <div className="max-w-5xl mx-auto">

              {/* Eyebrow */}
              <p style={{
                fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: '#D49A72', marginBottom: '0.625rem',
              }}>
                {caterer.cuisines?.[0]} Catering · {caterer.location}
              </p>

              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <h1
                    className="d-fadeup"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(2rem,5vw,3.25rem)',
                      color: '#F5F0E8', lineHeight: 1.05,
                      letterSpacing: '-0.02em', marginBottom: '0.75rem',
                    }}
                  >
                    {caterer.name}
                  </h1>
                  <div className="d-fadeup d-d1" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.25rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', color: 'rgba(245,240,232,0.75)' }}>
                      <MapPin style={{ width: '14px', height: '14px' }} />
                      {caterer.location}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'rgba(245,240,232,0.75)' }}>
                      <StarDisplay rating={caterer.rating} />
                      <strong style={{ color: '#F5F0E8', fontWeight: 600 }}>{caterer.rating}</strong>
                      <span style={{ color: 'rgba(245,240,232,0.5)' }}>· {caterer.reviewCount} reviews</span>
                    </span>
                  </div>
                </div>

                {/* Price callout */}
                <div className="d-fadeup d-d2" style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.4)', marginBottom: '0.25rem' }}>
                    Starting from
                  </p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,2.75rem)', color: '#F5F0E8', lineHeight: 1, letterSpacing: '-0.02em' }}>
                    {formatPrice(caterer.pricePerPlate)}
                  </p>
                  <p style={{ fontSize: '0.8125rem', color: 'rgba(245,240,232,0.45)', marginTop: '0.2rem' }}>per plate</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CONTENT ────────────────────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* ── LEFT: main content ─────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-5">

              {/* Stat tiles */}
              <div className="grid grid-cols-3 gap-3 d-fadeup">
                {[
                  {
                    icon: <Star style={{ width: '18px', height: '18px', color: '#C4865C' }} />,
                    value: `${caterer.rating}/5`,
                    label: 'Rating',
                  },
                  {
                    icon: <Users style={{ width: '18px', height: '18px', color: '#C4865C' }} />,
                    value: caterer.minGuests && caterer.maxGuests
                      ? `${caterer.minGuests}–${caterer.maxGuests}`
                      : 'Flexible',
                    label: 'Guests',
                  },
                  {
                    icon: <ChefHat style={{ width: '18px', height: '18px', color: '#C4865C' }} />,
                    value: String(caterer.cuisines.length),
                    label: 'Cuisines',
                  },
                ].map((s) => (
                  <div key={s.label} className="stat-tile">
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.625rem' }}>
                      {s.icon}
                    </div>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: '#1C2E20', letterSpacing: '-0.01em', lineHeight: 1 }}>
                      {s.value}
                    </p>
                    <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A8278', marginTop: '0.375rem' }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* About */}
              {caterer.description && (
                <div className="detail-card d-fadeup d-d1">
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', color: '#1C2E20', letterSpacing: '-0.01em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Quote style={{ width: '16px', height: '16px', color: '#C4865C', flexShrink: 0 }} />
                    About
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: '#5A5550', lineHeight: 1.9 }}>
                    {caterer.description}
                  </p>
                </div>
              )}

              {/* Image gallery */}
              {extraImages.length > 0 && (
                <div className="d-fadeup d-d2" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                  <div className={`image-gallery ${extraImages.length === 1 ? 'two' : 'three'}`}
                    style={{ height: '220px' }}>
                    {extraImages.length === 1 ? (
                      <>
                        <div style={{ position: 'relative', overflow: 'hidden' }}>
                          <Image src={heroImage} alt="" fill className="object-cover" />
                        </div>
                        <div style={{ position: 'relative', overflow: 'hidden' }}>
                          <Image src={extraImages[0]} alt="" fill className="object-cover" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="main" style={{ position: 'relative', overflow: 'hidden' }}>
                          <Image src={extraImages[0]} alt="" fill className="object-cover" />
                        </div>
                        <div style={{ position: 'relative', overflow: 'hidden' }}>
                          <Image src={extraImages[1]} alt="" fill className="object-cover" />
                        </div>
                        <div style={{ position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1C2E20' }}>
                          <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#D49A72', position: 'relative', zIndex: 1 }}>
                            +{(caterer.images?.length || 3) - 3} more
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Cuisines */}
              <div className="detail-card d-fadeup d-d2">
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', color: '#1C2E20', letterSpacing: '-0.01em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ChefHat style={{ width: '16px', height: '16px', color: '#C4865C', flexShrink: 0 }} />
                  Cuisines Offered
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {caterer.cuisines.map((c: string) => (
                    <Link
                      key={c}
                      href={`/caterers?cuisine=${encodeURIComponent(c)}`}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                        background: 'rgba(28,46,32,0.06)', border: '1px solid rgba(28,46,32,0.12)',
                        color: '#1C2E20', fontSize: '0.8125rem', fontWeight: 600,
                        padding: '0.4rem 1rem', borderRadius: '100px',
                        textDecoration: 'none', transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(196,134,92,0.1)';
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,134,92,0.3)';
                        (e.currentTarget as HTMLElement).style.color = '#C4865C';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(28,46,32,0.06)';
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(28,46,32,0.12)';
                        (e.currentTarget as HTMLElement).style.color = '#1C2E20';
                      }}
                    >
                      {c}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tags */}
              {caterer.tags?.length > 0 && (
                <div className="detail-card d-fadeup d-d3">
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', color: '#1C2E20', letterSpacing: '-0.01em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Tag style={{ width: '16px', height: '16px', color: '#C4865C', flexShrink: 0 }} />
                    Specialties
                  </h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {caterer.tags.map((tag: string) => (
                      <span key={tag} className={cn('tag-pill', getTagColor(tag))}>
                        {tag.replace(/-/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Rating breakdown */}
              <div className="detail-card d-fadeup d-d4">
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', color: '#1C2E20', letterSpacing: '-0.01em', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Star style={{ width: '16px', height: '16px', color: '#C4865C', flexShrink: 0 }} />
                      Ratings &amp; Reviews
                    </h2>
                    <p style={{ fontSize: '0.8125rem', color: '#8A8278' }}>
                      Based on {caterer.reviewCount} verified reviews
                    </p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: '#1C2E20', lineHeight: 1, letterSpacing: '-0.02em' }}>
                      {caterer.rating}
                    </p>
                    <StarDisplay rating={caterer.rating} />
                    <p style={{ fontSize: '0.6875rem', color: '#8A8278', marginTop: '0.25rem' }}>out of 5</p>
                  </div>
                </div>
                <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid #F5F0E8' }}>
                  <RatingBreakdown rating={caterer.rating} />
                </div>
              </div>

            </div>

            {/* ── RIGHT: sticky sidebar ─────────────────────────────── */}
            <div className="space-y-4 lg:sticky lg:top-6 h-fit">

              {/* Pricing card */}
              <div
                className="d-scalein"
                style={{
                  borderRadius: '20px',
                  background: '#1C2E20',
                  padding: '1.75rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Orb */}
                <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(196,134,92,0.15),transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />

                <div style={{ position: 'relative' }}>
                  <p style={{ fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.4)', marginBottom: '0.25rem' }}>
                    Starting from
                  </p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '2.75rem', color: '#F5F0E8', lineHeight: 1, letterSpacing: '-0.02em' }}>
                    {formatPrice(caterer.pricePerPlate)}
                  </p>
                  <p style={{ fontSize: '0.8125rem', color: 'rgba(245,240,232,0.45)', marginTop: '0.2rem', marginBottom: '1.25rem' }}>per plate</p>

                  {caterer.minGuests && (
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', color: 'rgba(245,240,232,0.5)' }}>
                        <span>Min guests</span>
                        <span style={{ color: '#F5F0E8', fontWeight: 600 }}>{caterer.minGuests}</span>
                      </div>
                      {caterer.maxGuests && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', color: 'rgba(245,240,232,0.5)' }}>
                          <span>Max guests</span>
                          <span style={{ color: '#F5F0E8', fontWeight: 600 }}>{caterer.maxGuests.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Contact card */}
              {(caterer.contactEmail || caterer.contactPhone) && (
                <div
                  className="d-scalein d-d1"
                  style={{ background: '#fff', border: '1px solid #E8E0D0', borderRadius: '20px', padding: '1.5rem' }}
                >
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', color: '#1C2E20', letterSpacing: '-0.01em', marginBottom: '1rem' }}>
                    Get in Touch
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {caterer.contactPhone && (
                      <a href={`tel:${caterer.contactPhone}`} className="contact-link">
                        <span style={{
                          width: '36px', height: '36px', borderRadius: '50%',
                          background: '#F5F0E8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                          <Phone style={{ width: '15px', height: '15px', color: '#C4865C' }} />
                        </span>
                        {caterer.contactPhone}
                      </a>
                    )}
                    {caterer.contactEmail && (
                      <a href={`mailto:${caterer.contactEmail}`} className="contact-link">
                        <span style={{
                          width: '36px', height: '36px', borderRadius: '50%',
                          background: '#F5F0E8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                          <Mail style={{ width: '15px', height: '15px', color: '#C4865C' }} />
                        </span>
                        {caterer.contactEmail}
                      </a>
                    )}
                  </div>

                  {caterer.contactEmail && (
                    <a href={`mailto:${caterer.contactEmail}`} className="enquiry-btn" style={{ marginTop: '1rem' }}>
                      Send Enquiry
                      <ArrowRight style={{ width: '15px', height: '15px' }} />
                    </a>
                  )}
                </div>
              )}

              {/* Listed date */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 0.25rem' }}
                className="d-scalein d-d2">
                <Calendar style={{ width: '13px', height: '13px', color: '#8A8278' }} />
                <span style={{ fontSize: '0.75rem', color: '#8A8278' }}>
                  Listed {formatDate(caterer.createdAt)}
                </span>
              </div>

              {/* Browse more CTA */}
              <div
                className="d-scalein d-d3"
                style={{
                  background: 'linear-gradient(135deg, rgba(196,134,92,0.08), rgba(196,134,92,0.03))',
                  border: '1px solid rgba(196,134,92,0.2)',
                  borderRadius: '16px', padding: '1.25rem',
                }}
              >
                <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#1C2E20', marginBottom: '0.25rem' }}>
                  Looking for more options?
                </p>
                <p style={{ fontSize: '0.75rem', color: '#8A8278', lineHeight: 1.7, marginBottom: '0.875rem' }}>
                  Browse 240+ verified caterers across India.
                </p>
                <Link
                  href="/caterers"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                    fontSize: '0.8125rem', fontWeight: 600, color: '#C4865C',
                    textDecoration: 'none', transition: 'gap 0.2s',
                  }}
                >
                  Browse all caterers
                  <ArrowRight style={{ width: '14px', height: '14px' }} />
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}