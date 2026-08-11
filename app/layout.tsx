/**
 * ============================================================================
 * ROOT LAYOUT (app/layout.tsx) - PHASE 6 SEO IMPLEMENTATION
 * ============================================================================
 * Student Note:
 * - Metadata API Foundation: Configures metadataBase, canonical URL, OpenGraph,
 *   Twitter Cards, and Search Console verification placeholder.
 * - JSON-LD Integration: Renders Person and WebSite Schema.org structured data.
 * - Semantic Layout: Nav header (<header>), main content (<main>), footer (<footer>).
 */

import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PersonJsonLd, WebSiteJsonLd } from '@/components/JsonLd';
import { personalInfo } from '@/lib/data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqarkhan.dev';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${personalInfo.name} — ${personalInfo.primaryTitle} | ${personalInfo.secondaryTitle}`,
    template: `%s | ${personalInfo.name}`,
  },
  description: personalInfo.bio,
  keywords: [
    'Waqar Khan',
    'Machine Learning Engineer',
    'Full Stack Engineer',
    'Computer Vision',
    'Generative AI',
    'Deep Learning',
    'Python',
    'TypeScript',
    'Next.js',
    'FastAPI',
    'Islamabad Pakistan',
  ],
  authors: [{ name: personalInfo.name, url: SITE_URL }],
  creator: personalInfo.name,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: `${personalInfo.name} Portfolio`,
    title: `${personalInfo.name} — Machine Learning Engineer | Full Stack Engineer`,
    description: personalInfo.bio,
    images: [
      {
        url: `${SITE_URL}/avatar-placeholder.svg`,
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} — Machine Learning Engineer & Full Stack Developer`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${personalInfo.name} — Machine Learning Engineer | Full Stack Engineer`,
    description: personalInfo.bio,
    images: [`${SITE_URL}/avatar-placeholder.svg`],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || '',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <PersonJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="flex min-h-screen flex-col bg-white text-gray-900 antialiased selection:bg-red-600 selection:text-white">
        
        {/* Global Navigation Header */}
        <Navbar />

        {/* Semantic Main Content Container */}
        <main className="flex-1">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
        
      </body>
    </html>
  );
}
