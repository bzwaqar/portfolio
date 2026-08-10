/**
 * ============================================================================
 * EDUCATION & CERTIFICATIONS PAGE (app/education/page.tsx) — Clean Light Theme
 * ============================================================================
 * Single H1. Consumes educationData and certificationsData.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { educationData, certificationsData } from '@/lib/data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqarkhan.dev';

export const metadata: Metadata = {
  title: 'Education & Certifications — Waqar Khan',
  description: 'Bachelor of Science in Artificial Intelligence at COMSATS University Islamabad and verified AI/ML certifications of Waqar Khan.',
  alternates: {
    canonical: `${SITE_URL}/education`,
  },
  openGraph: {
    title: 'Education & Certifications — Waqar Khan',
    description: 'Bachelor of Science in Artificial Intelligence at COMSATS University Islamabad and verified AI/ML certifications of Waqar Khan.',
    url: `${SITE_URL}/education`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Education & Certifications — Waqar Khan',
    description: 'Academic degree at COMSATS University Islamabad and AI/ML professional certifications of Waqar Khan.',
  },
};

export default function EducationPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header section */}
      <div className="space-y-4 border-b border-gray-200 pb-8">
        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 border border-red-200">
          Academic & Professional Credentials
        </span>
        {/* MANDATORY EXACTLY ONE H1 FOR EDUCATION PAGE */}
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Education & Certifications
        </h1>
        <p className="text-base text-gray-500 max-w-2xl">
          Formal university degree program in Artificial Intelligence alongside specialized AI/ML bootcamp credentials.
        </p>
      </div>

      {/* Education Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 border-l-4 border-red-600 pl-3">
          University Education
        </h2>

        {educationData.map((edu) => (
          <div key={edu.id} className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 space-y-3 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
              <span className="rounded-md bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 border border-red-200">
                {edu.duration}
              </span>
            </div>

            <div className="text-sm font-semibold text-red-600">
              {edu.institution} • <span className="text-gray-500 font-normal">{edu.location}</span>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed pt-2">
              {edu.details}
            </p>
          </div>
        ))}
      </section>

      {/* Certifications Section */}
      <section className="space-y-6 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 border-l-4 border-red-600 pl-3">
          Professional Certifications
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {certificationsData.map((cert) => (
            <div key={cert.id} className="rounded-2xl border border-gray-200 bg-white p-6 space-y-2 flex flex-col justify-between shadow-sm">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-gray-900 leading-snug">{cert.title}</h3>
                <p className="text-xs text-red-600 font-medium">
                  {cert.issuer} {cert.platform ? `(${cert.platform})` : ''}
                </p>
              </div>
              <div className="pt-2 text-[11px] text-gray-400 flex items-center justify-between border-t border-gray-100">
                <span>Verified Credential</span>
                <span className="text-green-600 font-bold">✓ Complete</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="pt-4 flex justify-between text-xs text-gray-400 border-t border-gray-200">
        <Link href="/experience" className="text-red-600 hover:underline">← Work Experience</Link>
        <Link href="/services" className="text-red-600 hover:underline">Services →</Link>
      </div>

    </div>
  );
}
