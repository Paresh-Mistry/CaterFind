'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Users, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn, formatPrice, getTagColor, FALLBACK_IMAGE } from '@/lib/utils';
import type { Caterer } from '@/types';

interface CatererCardProps {
  caterer: Caterer;
  className?: string;
}

export function CatererCard({ caterer, className }: CatererCardProps) {
  const image = caterer.images?.[0] ?? FALLBACK_IMAGE;

  return (
    <Link href={`/caterers/${caterer.id}`} className={cn('block group', className)}>
      <article className="bg-white rounded-2xl overflow-hidden shadow-sm card-lift h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-sand flex-shrink-0">
          <Image
            src={image}
            alt={caterer.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 gradient-card" />

          {/* Rating pill */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1.5 rounded-full">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            {caterer.rating}
            <span className="text-white/60 font-normal">({caterer.reviewCount})</span>
          </div>

          {/* Verified badge */}
          {caterer.isVerified && (
            <div className="absolute top-3 right-3 bg-forest text-cream text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              ✓ Verified
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col flex-1">
          {/* Name + location */}
          <h3 className="font-display text-lg font-medium text-foreground mb-1.5 group-hover:text-clay-dark transition-colors line-clamp-1">
            {caterer.name}
          </h3>
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="line-clamp-1">{caterer.location}</span>
          </div>

          {/* Cuisines */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {caterer.cuisines.slice(0, 3).map((c) => (
              <Badge key={c} variant="outline" className="text-xs">
                {c}
              </Badge>
            ))}
            {caterer.cuisines.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{caterer.cuisines.length - 3}
              </Badge>
            )}
          </div>

          {/* Tags */}
          {caterer.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {caterer.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className={cn(
                    'text-xs px-2 py-0.5 rounded-full border',
                    getTagColor(tag)
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-sand">
            <div>
              <div className="font-display text-xl font-medium text-clay-dark">
                {formatPrice(caterer.pricePerPlate)}
              </div>
              <div className="text-xs text-muted-foreground">per plate</div>
            </div>
            {caterer.minGuests && caterer.maxGuests && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Users className="w-3.5 h-3.5" />
                {caterer.minGuests}–{caterer.maxGuests.toLocaleString()} guests
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

// ─── Skeleton version ─────────────────────────────────────────────────────────

export function CatererCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-sand shadow-sm">
      <div className="skeleton h-48" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-5 w-2/3 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
        <div className="flex gap-2">
          <div className="skeleton h-5 w-16 rounded-full" />
          <div className="skeleton h-5 w-20 rounded-full" />
        </div>
        <div className="flex justify-between pt-4 border-t border-sand">
          <div className="skeleton h-6 w-20 rounded" />
          <div className="skeleton h-4 w-24 rounded" />
        </div>
      </div>
    </div>
  );
}