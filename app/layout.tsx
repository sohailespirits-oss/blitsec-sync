import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from '@/app/components/ui/toaster';
import { Navbar } from '@/app/components/Navbar';
import { NoSurprisePopup } from '@/app/components/NoSurprisePopup';
import { PromotionPopup } from '@/app/components/PromotionPopup';
import { GlobalLoadingOverlay } from '@/app/components/GlobalLoadingOverlay';
import { getSeoMetadata } from '@/app/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Force dynamic rendering to fetch SEO on every request
export const dynamic = 'force-dynamic';

// Fetch SEO metadata from homepage.json
export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata('homepage');
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>
          <GlobalLoadingOverlay>
            <Navbar />
            {children}
            <Toaster />
            <NoSurprisePopup />
            <PromotionPopup />
          </GlobalLoadingOverlay>
        </Providers>
      </body>
    </html>
  );
}
