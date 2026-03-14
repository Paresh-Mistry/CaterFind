import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'CaterFind — Discover Premium Caterers',
  description:
    'Find and book top-rated catering services for weddings, corporate events, and special occasions across India.',
  keywords: ['catering', 'wedding caterer', 'event catering', 'food service', 'India'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-cream font-sans antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}