/**
 * ============================================================================
 * BLOG LAYOUT (app/blog/layout.tsx) - PHASE 6 SEO
 * ============================================================================
 * Student Note:
 * Defines default SEO metadata for the technical blog section.
 */

import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqarkhan.dev';

export const metadata: Metadata = {
  title: 'Blog — Waqar Khan | AI, Machine Learning & Engineering Insights',
  description: 'Technical articles, machine learning tutorials, computer vision guides, and full-stack engineering insights by Waqar Khan.',
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: 'Blog — Waqar Khan | AI, Machine Learning & Engineering Insights',
    description: 'Technical articles, machine learning tutorials, computer vision guides, and full-stack engineering insights by Waqar Khan.',
    url: `${SITE_URL}/blog`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Waqar Khan | AI, Machine Learning & Engineering Insights',
    description: 'Technical articles and tutorials by Waqar Khan on AI, Machine Learning, and Full Stack Engineering.',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
