'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckCircle, ChefHat, Loader2, ArrowRight,
  MapPin, IndianRupee, Users, Phone, Mail,
  FileText, Star, Tag, Sparkles, X,
} from 'lucide-react';
import { createCaterer } from '@/lib/api';
import type { CreateCatererPayload , FormErrors, FormState} from '@/types';
import Field from '@/components/Field';
import PillSelector from '@/components/PillSelector';
import SuccessScreen from '@/components/SuccessScreen';
import { CUISINE_OPTIONS, INITIAL, PERKS, TAG_OPTIONS } from '@/lib/utils';


const inputCls =
  'w-full rounded-xl border border-[#E8E0D0] bg-[#F5F0E8] py-3 px-3.5 text-sm text-[#1C2E20] ' +
  'placeholder:text-[#A89E94] outline-none transition-all duration-200 ' +
  'hover:border-[#C8BEA8] hover:bg-[#EDE8DF] ' +
  'focus:border-[#C4865C] focus:bg-white focus:ring-2 focus:ring-[#C4865C]/10';

const inputErrCls = '!border-red-300 !bg-red-50 focus:!border-red-400 focus:!ring-red-100';


// ─── Section divider ──────────────────────────────────────────────────────────
function SectionDivider({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="col-span-2 flex items-center gap-3 pt-2">
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-6 h-6 rounded-lg bg-[rgba(196,134,92,0.1)] flex items-center justify-center text-[#C4865C]">
          {icon}
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8278] whitespace-nowrap">
          {label}
        </span>
      </div>
      <div className="flex-1 h-px bg-[#F0EBE3]" />
    </div>
  );
}


// ─── Selection count badge ────────────────────────────────────────────────────
function SelectionBadge({ count, noun }: { count: number; noun: string }) {
  if (count === 0) return null;
  return (
    <span className="ml-1.5 inline-flex items-center bg-[rgba(196,134,92,0.12)] text-[#C4865C] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[rgba(196,134,92,0.2)]">
      {count} {noun}{count !== 1 ? 's' : ''} selected
    </span>
  );
}


// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AddCatererPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState('');

  function handle(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
    setApiError('');
  }

  function toggleCuisine(val: string) {
    setSelectedCuisines((prev) =>
      prev.includes(val) ? prev.filter((c) => c !== val) : [...prev, val]
    );
    setErrors((p) => ({ ...p, cuisines: undefined }));
  }

  function toggleTag(val: string) {
    setSelectedTags((prev) =>
      prev.includes(val) ? prev.filter((t) => t !== val) : [...prev, val]
    );
  }

  function validate(): boolean {
    const next: FormErrors = {};
    if (!form.name.trim())     next.name = 'Business name is required';
    if (!form.location.trim()) next.location = 'Location is required';
    if (!form.pricePerPlate || Number(form.pricePerPlate) < 1)
      next.pricePerPlate = 'Enter a valid price';
    if (selectedCuisines.length === 0)
      next.cuisines = 'Select at least one cuisine';
    if (!form.rating || Number(form.rating) < 1 || Number(form.rating) > 5)
      next.rating = 'Must be between 1 and 5';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setApiError('');
    try {
      const payload: CreateCatererPayload = {
        name: form.name.trim(),
        location: form.location.trim(),
        pricePerPlate: Number(form.pricePerPlate),
        cuisines: selectedCuisines,
        rating: Number(form.rating),
        ...(selectedTags.length > 0  && { tags: selectedTags }),
        ...(form.minGuests           && { minGuests: Number(form.minGuests) }),
        ...(form.maxGuests           && { maxGuests: Number(form.maxGuests) }),
        ...(form.contactEmail.trim() && { contactEmail: form.contactEmail.trim() }),
        ...(form.contactPhone.trim() && { contactPhone: form.contactPhone.trim() }),
        ...(form.description.trim()  && { description: form.description.trim() }),
      };
      await createCaterer(payload);
      setSuccess(true);
      setForm(INITIAL);
      setSelectedCuisines([]);
      setSelectedTags([]);
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return <SuccessScreen onReset={() => setSuccess(false)} onBrowse={() => router.push('/caterers')} />;
  }

  return (
    <div
      className="min-h-screen bg-[#F5F0E8]"
      style={{ fontFamily: 'var(--font-body, "Instrument Sans", sans-serif)' }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-[5fr_7fr] gap-12 xl:gap-16 items-start">

          {/* ── LEFT: Pitch ──────────────────────────────────────────── */}
          <div className="lg:sticky lg:top-24 flex flex-col gap-7">

            <div className="inline-flex w-14 h-14 rounded-2xl bg-[#1C2E20] items-center justify-center shadow-[0_8px_24px_-6px_rgba(28,46,32,0.3)]">
              <ChefHat className="w-7 h-7 text-[#D49A72]" />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C4865C] mb-3">
                For caterers
              </p>
              <h1
                className="text-[clamp(2rem,4vw,2.75rem)] text-[#1C2E20] leading-[1.1] tracking-[-0.02em] mb-4"
                style={{ fontFamily: 'var(--font-display, "DM Serif Display", Georgia, serif)' }}
              >
                List your service,<br />
                <em className="not-italic italic text-[#C4865C]">grow your reach</em>
              </h1>
              <p className="text-sm text-[#8A8278] leading-[1.85]">
                Join hundreds of verified caterers and connect with clients planning
                weddings, corporate events, birthdays and more.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {PERKS.map((perk) => (
                <li key={perk.text} className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-white border border-[#E8E0D0] flex items-center justify-center text-sm shrink-0 shadow-sm">
                    {perk.icon}
                  </span>
                  <span className="text-sm text-[#1C2E20] leading-[1.7] pt-0.5">{perk.text}</span>
                </li>
              ))}
            </ul>

            {/* Social proof card */}
            <div className="relative overflow-hidden rounded-2xl bg-[#1C2E20] px-6 py-5">
              <div className="pointer-events-none absolute -top-8 -right-8 w-32 h-32 rounded-full"
                style={{ background: 'radial-gradient(circle,rgba(196,134,92,0.15),transparent 70%)' }} />
              <div className="relative">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D49A72] mb-2">
                  Why join CaterFind
                </p>
                <p className="text-base font-semibold text-[#F5F0E8] leading-snug mb-1">
                  Takes less than 2 minutes
                </p>
                <p className="text-xs text-[#F5F0E8]/45 mb-3">
                  Completely free. No hidden fees. No contracts.
                </p>
                <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                  <div className="flex">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#D49A72" className="-ml-0.5 first:ml-0">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-[11px] text-[#F5F0E8]/40">4.8 avg across all listings</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Form card ─────────────────────────────────────── */}
          <div className="rounded-3xl bg-white border border-[#E8E0D0] overflow-hidden shadow-[0_2px_32px_-8px_rgba(0,0,0,0.08)]">

            {/* Card header */}
            <div className="relative overflow-hidden bg-[#1C2E20] px-7 py-6">
              <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)',
                  backgroundSize: '40px 40px',
                }} />
              <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full"
                style={{ background: 'radial-gradient(circle,rgba(196,134,92,0.12),transparent 70%)' }} />
              <div className="relative">
                <p
                  className="text-xl text-[#F5F0E8] tracking-[-0.01em]"
                  style={{ fontFamily: 'var(--font-display, "DM Serif Display", Georgia, serif)' }}
                >
                  Listing details
                </p>
                <p className="text-xs text-[#F5F0E8]/40 mt-1">
                  Fields marked <span className="text-[#D49A72]">*</span> are required
                </p>
              </div>
            </div>

            {/* API error */}
            {apiError && (
              <div className="mx-6 mt-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-600">
                <span className="shrink-0 mt-px text-base">⚠️</span>
                <div>
                  <p className="font-semibold">Submission failed</p>
                  <p className="text-red-500/80 text-xs mt-0.5">{apiError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="p-7">
              <div className="grid grid-cols-2 gap-x-4 gap-y-5">

                {/* ── Business Info ─────────────────────────────────── */}
                <SectionDivider icon={<ChefHat className="w-3.5 h-3.5" />} label="Business Info" />

                <Field label="Business name" required error={errors.name} className="col-span-2">
                  <input
                    name="name" value={form.name} onChange={handle}
                    placeholder="e.g. Royal Feast Caterers"
                    className={`${inputCls} ${errors.name ? inputErrCls : ''}`}
                  />
                </Field>

                <Field label="Location" required error={errors.location}>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#A89E94] pointer-events-none" />
                    <input
                      name="location" value={form.location} onChange={handle}
                      placeholder="Mumbai, Maharashtra"
                      className={`${inputCls} pl-9 ${errors.location ? inputErrCls : ''}`}
                    />
                  </div>
                </Field>

                <Field label="Price per plate (₹)" required error={errors.pricePerPlate}>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#A89E94] pointer-events-none" />
                    <input
                      name="pricePerPlate" type="number" min="1"
                      value={form.pricePerPlate} onChange={handle}
                      placeholder="850"
                      className={`${inputCls} pl-9 ${errors.pricePerPlate ? inputErrCls : ''}`}
                    />
                  </div>
                </Field>

                {/* Star rating picker */}
                <Field label="Rating (1–5)" required error={errors.rating} className="col-span-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const filled = Number(form.rating) >= star;
                        return (
                          <button
                            key={star}
                            type="button"
                            onClick={() => {
                              setForm((p) => ({ ...p, rating: String(star) }));
                              setErrors((p) => ({ ...p, rating: undefined }));
                            }}
                            className="transition-transform hover:scale-110 active:scale-95"
                          >
                            <svg width="28" height="28" viewBox="0 0 24 24"
                              fill={filled ? '#C4865C' : 'none'}
                              stroke={filled ? '#C4865C' : '#C8BEA8'}
                              strokeWidth="1.5"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          </button>
                        );
                      })}
                    </div>
                    <div className="relative w-24">
                      <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#A89E94] pointer-events-none" />
                      <input
                        name="rating" type="number" min="1" max="5" step="0.1"
                        value={form.rating} onChange={handle}
                        placeholder="4.5"
                        className={`${inputCls} pl-9 text-center ${errors.rating ? inputErrCls : ''}`}
                      />
                    </div>
                    {form.rating && (
                      <span className="text-sm font-semibold text-[#C4865C]">
                        {Number(form.rating).toFixed(1)} / 5
                      </span>
                    )}
                  </div>
                </Field>

                {/* ── Cuisines ──────────────────────────────────────── */}
                <SectionDivider icon={<ChefHat className="w-3.5 h-3.5" />} label="Cuisines Offered" />

                <div className="col-span-2 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center flex-wrap gap-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-[#8A8278]">
                      Select cuisines
                      <span className="text-[#C4865C]">*</span>
                      <SelectionBadge count={selectedCuisines.length} noun="cuisine" />
                    </label>
                    {selectedCuisines.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setSelectedCuisines([])}
                        className="text-[10px] font-semibold text-[#8A8278] hover:text-[#C4865C] transition-colors underline shrink-0"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  <div className="rounded-xl border border-[#E8E0D0] bg-[#FDFBF8] p-3.5">
                    <PillSelector
                      options={CUISINE_OPTIONS}
                      selected={selectedCuisines}
                      onToggle={toggleCuisine}
                      colorActive="clay"
                    />
                  </div>

                  {errors.cuisines && (
                    <p className="flex items-center gap-1 text-[11px] font-semibold text-red-500 leading-none">
                      <span>⚠</span> {errors.cuisines}
                    </p>
                  )}
                </div>

                {/* ── Tags / Specialties ────────────────────────────── */}
                <SectionDivider icon={<Tag className="w-3.5 h-3.5" />} label="Tags & Specialties" />

                <div className="col-span-2 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center flex-wrap gap-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-[#8A8278]">
                      Events &amp; service types
                      <SelectionBadge count={selectedTags.length} noun="tag" />
                    </label>
                    {selectedTags.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setSelectedTags([])}
                        className="text-[10px] font-semibold text-[#8A8278] hover:text-[#C4865C] transition-colors underline shrink-0"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  <div className="rounded-xl border border-[#E8E0D0] bg-[#FDFBF8] p-3.5">
                    <PillSelector
                      options={TAG_OPTIONS}
                      selected={selectedTags}
                      onToggle={toggleTag}
                      colorActive="forest"
                    />
                  </div>

                  <p className="text-[11px] text-[#A89E94] leading-none">
                    Optional — helps clients find you by event type
                  </p>
                </div>

                {/* ── Guest Capacity ────────────────────────────────── */}
                <SectionDivider icon={<Users className="w-3.5 h-3.5" />} label="Guest Capacity" />

                <Field label="Min. guests">
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#A89E94] pointer-events-none" />
                    <input
                      name="minGuests" type="number" min="1"
                      value={form.minGuests} onChange={handle}
                      placeholder="50"
                      className={`${inputCls} pl-9`}
                    />
                  </div>
                </Field>

                <Field label="Max. guests">
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#A89E94] pointer-events-none" />
                    <input
                      name="maxGuests" type="number" min="1"
                      value={form.maxGuests} onChange={handle}
                      placeholder="2000"
                      className={`${inputCls} pl-9`}
                    />
                  </div>
                </Field>

                {/* ── Contact Details ───────────────────────────────── */}
                <SectionDivider icon={<Phone className="w-3.5 h-3.5" />} label="Contact Details" />

                <Field label="Email address">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#A89E94] pointer-events-none" />
                    <input
                      name="contactEmail" type="email"
                      value={form.contactEmail} onChange={handle}
                      placeholder="info@example.com"
                      className={`${inputCls} pl-9`}
                    />
                  </div>
                </Field>

                <Field label="Phone number">
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#A89E94] pointer-events-none" />
                    <input
                      name="contactPhone"
                      value={form.contactPhone} onChange={handle}
                      placeholder="+91-9876543210"
                      className={`${inputCls} pl-9`}
                    />
                  </div>
                </Field>

                {/* ── About ─────────────────────────────────────────── */}
                <SectionDivider icon={<FileText className="w-3.5 h-3.5" />} label="About Your Service" />

                <Field label="Description" className="col-span-2">
                  <textarea
                    name="description" rows={4}
                    value={form.description} onChange={handle}
                    placeholder="Tell us about your catering service, specialties, and experience…"
                    className={`${inputCls} resize-none leading-relaxed`}
                  />
                </Field>

                {/* ── Submit ────────────────────────────────────────── */}
                <div className="col-span-2 pt-2 flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="group w-full flex items-center justify-center gap-2.5 bg-[#C4865C] hover:bg-[#D49A72] disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_-8px_rgba(196,134,92,0.5)]"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        Submit listing
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-[#A89E94]">
                    By submitting, you agree to our{' '}
                    <a href="#" className="underline hover:text-[#C4865C] transition-colors">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="underline hover:text-[#C4865C] transition-colors">Privacy Policy</a>
                  </p>
                </div>

              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}