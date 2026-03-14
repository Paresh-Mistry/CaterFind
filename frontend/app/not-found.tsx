/**
 * 404 PAGE
 * Uses Button from ui/index (uploaded).
 */
import Link from 'next/link';
import { UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 w-20 h-20 rounded-3xl bg-sand flex items-center justify-center text-clay">
        <UtensilsCrossed className="w-9 h-9" />
      </div>
      <p className="font-display text-7xl font-light text-foreground mb-2">404</p>
      <h1 className="font-display text-2xl font-light text-muted-foreground mb-3">
        Page not found
      </h1>
      <p className="text-sm text-muted-foreground max-w-sm mb-8">
        The page you&apos;re looking for doesn&apos;t exist, or this caterer may have been removed.
      </p>
      <div className="flex gap-3">
        <Link href="/caterers">
          <Button variant="secondary">Browse Caterers</Button>
        </Link>
        <Link href="/">
          <Button variant="outline">Go Home</Button>
        </Link>
      </div>
    </div>
  );
}