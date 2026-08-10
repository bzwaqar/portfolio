/**
 * ============================================================================
 * PUBLIC PROJECTS LAYOUT (app/projects/layout.tsx) - PHASE 6 SEO
 * ============================================================================
 * Student Note:
 * Defines default SEO metadata for the public projects showcase directory.
 */

import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqarkhan.dev';

export const metadata: Metadata = {
  title: 'Projects — Waqar Khan | Machine Learning & AI Projects',
  description: 'Explore Waqar Khan\'s published engineering projects in Machine Learning, Computer Vision, Deep Learning, Natural Language Processing, and Full-Stack Development.',
  alternates: {
    canonical: `${SITE_URL}/projects`,
  },
  openGraph: {
    title: 'Projects — Waqar Khan | Machine Learning & AI Projects',
    description: 'Explore Waqar Khan\'s published engineering projects in Machine Learning, Computer Vision, Deep Learning, Natural Language Processing, and Full-Stack Development.',
    url: `${SITE_URL}/projects`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects — Waqar Khan | Machine Learning & AI Projects',
    description: 'Explore Waqar Khan\'s published engineering projects in Machine Learning, Computer Vision, Deep Learning, NLP, and Full-Stack Development.',
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
