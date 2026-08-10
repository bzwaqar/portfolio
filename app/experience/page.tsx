/**
 * ============================================================================
 * EXPERIENCE PAGE (app/experience/page.tsx) — Clean Light Theme
 * ============================================================================
 * Single H1. Consumes experienceData from lib/data.ts.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { experienceData } from '@/lib/data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqarkhan.dev';

export const metadata: Metadata = {
  title: 'Experience — Waqar Khan | Machine Learning & Full Stack Engineer',
  description: 'Professional work history and internships of Waqar Khan including Sectem Technologies, ITSimplera, Decode Labs, Arch Technologies Pakistan, and Devsinc Campus Ambassador.',
  alternates: {
    canonical: `${SITE_URL}/experience`,
  },
  openGraph: {
    title: 'Experience — Waqar Khan | Machine Learning & Full Stack Engineer',
    description: 'Professional work history and internships of Waqar Khan including Sectem Technologies, ITSimplera, Decode Labs, Arch Technologies Pakistan, and Devsinc Campus Ambassador.',
    url: `${SITE_URL}/experience`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Experience — Waqar Khan | Machine Learning & Full Stack Engineer',
    description: 'Professional work history and internships of Waqar Khan in Machine Learning & Full Stack Engineering.',
  },
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header section */}
      <div className="space-y-4 border-b border-gray-200 pb-8">
        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 border border-red-200">
          Career Timeline
        </span>
        {/* MANDATORY EXACTLY ONE H1 FOR EXPERIENCE PAGE */}
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Professional Experience
        </h1>
        <p className="text-base text-gray-500 max-w-2xl">
          Chronological record of my machine learning engineering, artificial intelligence, and full-stack development internships.
        </p>
      </div>

      {/* Timeline Section */}
      <section className="relative border-l-2 border-gray-200 pl-6 sm:pl-8 space-y-10 ml-2 sm:ml-4">
        
        {experienceData.map((exp) => (
          <article key={exp.id} className="relative group">
            
            {/* Timeline Dot Indicator */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full border-2 border-red-600 bg-white group-hover:scale-125 transition-transform" />

            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 space-y-4 shadow-sm">
              
              {/* Role Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                    {exp.role}
                  </h2>
                  <div className="text-sm font-semibold text-red-600">
                    {exp.company} • <span className="text-gray-500 font-normal">{exp.location}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="rounded-md bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 border border-gray-200">
                    {exp.period}
                  </span>
                  <span className="rounded-md bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600 border border-red-200">
                    {exp.type}
                  </span>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Responsibilities & Key Accomplishments:
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-red-600 font-bold">•</span>
                      <span className="leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </article>
        ))}

      </section>

      {/* Navigation Footer */}
      <div className="pt-8 border-t border-gray-200 flex items-center justify-between text-xs text-gray-400">
        <Link href="/skills" className="text-red-600 hover:underline">← Technical Skills</Link>
        <Link href="/education" className="text-red-600 hover:underline">Education & Certifications →</Link>
      </div>

    </div>
  );
}
