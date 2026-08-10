/**
 * ============================================================================
 * SERVICES PAGE (app/services/page.tsx) — Clean Light Theme
 * ============================================================================
 * Single H1. Consumes servicesData from lib/data.ts.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { servicesData } from '@/lib/data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqarkhan.dev';

export const metadata: Metadata = {
  title: 'Services — Waqar Khan | AI & Full Stack Solutions',
  description: 'Technical services offered by Waqar Khan across Machine Learning Model Engineering, Computer Vision Pipelines, Generative AI Systems, and Full-Stack Web Development.',
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: 'Services — Waqar Khan | AI & Full Stack Solutions',
    description: 'Technical services offered by Waqar Khan across Machine Learning Model Engineering, Computer Vision Pipelines, Generative AI Systems, and Full-Stack Web Development.',
    url: `${SITE_URL}/services`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services — Waqar Khan | AI & Full Stack Solutions',
    description: 'Services offered by Waqar Khan across AI/ML Engineering, Computer Vision, and Full Stack Development.',
  },
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header section */}
      <div className="space-y-4 border-b border-gray-200 pb-8">
        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 border border-red-200">
          Technical Solutions
        </span>
        {/* MANDATORY EXACTLY ONE H1 FOR SERVICES PAGE */}
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Services & Technical Solutions
        </h1>
        <p className="text-base text-gray-500 max-w-2xl">
          Structured service placeholders covering machine learning model training, computer vision development, generative AI tools, and full-stack software development.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {servicesData.map((service) => (
          <section
            key={service.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-red-600 pl-3">
                {service.title}
              </h2>

              <p className="text-xs text-gray-600 leading-relaxed">
                {service.shortDescription}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px]">
              <span className="rounded bg-red-50 px-2 py-0.5 font-medium text-red-600 border border-red-200">
                {service.editableNote}
              </span>
              <Link
                href="/contact"
                className="font-semibold text-red-600 hover:text-red-700 transition-colors"
              >
                Inquire →
              </Link>
            </div>
          </section>
        ))}
      </div>

      {/* Navigation Footer */}
      <div className="pt-4 flex justify-between text-xs text-gray-400 border-t border-gray-200">
        <Link href="/education" className="text-red-600 hover:underline">← Education & Certifications</Link>
        <Link href="/projects" className="text-red-600 hover:underline">Projects →</Link>
      </div>

    </div>
  );
}
