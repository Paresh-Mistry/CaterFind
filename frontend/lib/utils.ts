import { FormState } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export const CUISINE_OPTIONS = [
  'Indian', 'North Indian', 'South Indian', 'Mughlai', 'Hyderabadi',
  'Punjabi', 'Rajasthani', 'Chettinad', 'Seafood', 'Biryani', 'Kebabs',
  'Chinese', 'Italian', 'Continental', 'Mediterranean', 'Vegan',
  'Health Food', 'International',
];

export const SORT_OPTIONS = [
  { value: 'rating', label: 'Top Rated' },
  { value: 'pricePerPlate', label: 'Price: Low to High' },
  { value: 'pricePerPlate_desc', label: 'Price: High to Low' },
  { value: 'reviewCount', label: 'Most Reviewed' },
  { value: 'createdAt', label: 'Newest First' },
] as const;

export const RATING_OPTIONS = [
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
  { value: '4.5', label: '4.5+' },
] as const;

export const TAG_COLORS: Record<string, string> = {
  wedding: 'bg-rose-50 text-rose-700 border-rose-200',
  corporate: 'bg-blue-50 text-blue-700 border-blue-200',
  buffet: 'bg-amber-50 text-amber-700 border-amber-200',
  vegan: 'bg-green-50 text-green-700 border-green-200',
  'fine-dining': 'bg-purple-50 text-purple-700 border-purple-200',
  seafood: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  default: 'bg-gray-50 text-gray-600 border-gray-200',
};

export function getTagColor(tag: string): string {
  return TAG_COLORS[tag] ?? TAG_COLORS.default;
}

// Fallback image for caterers without images
export const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80';



export const TAG_OPTIONS = [
  'wedding', 'corporate', 'birthday', 'outdoor', 'indoor',
  'live-counter', 'buffet', 'home-delivery', 'bulk-orders',
  'jain-food', 'halal', 'organic', 'premium', 'budget-friendly',
  'themed-events', 'cocktail-party',
];

export const PERKS = [
  { icon: '🔍', text: 'Get discovered by thousands of event planners' },
  { icon: '🆓', text: 'Free listing — no upfront cost, ever' },
  { icon: '✦',  text: 'Verified badge after our quick review' },
  { icon: '📬', text: 'Direct enquiries sent straight to your email' },
  { icon: '✏️', text: 'Edit or update your listing any time' },
];


export const INITIAL: FormState = {
  name: '', location: '', pricePerPlate: '',
  rating: '', minGuests: '', maxGuests: '',
  contactEmail: '', contactPhone: '', description: '',
};