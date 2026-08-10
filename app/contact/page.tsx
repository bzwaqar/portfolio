/**
 * ============================================================================
 * CONTACT PAGE (app/contact/page.tsx) — Clean Light Theme
 * ============================================================================
 * Single H1. Consumes personalInfo from lib/data.ts.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { personalInfo } from '@/lib/data';
import ContactForm from '@/components/ContactForm';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqarkhan.dev';

export const metadata: Metadata = {
  title: 'Contact Waqar Khan | Machine Learning & Full Stack Engineer',
  description: 'Get in touch with Waqar Khan for machine learning engineering roles, computer vision projects, or full-stack software development opportunities in Islamabad, Pakistan.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: 'Contact Waqar Khan | Machine Learning & Full Stack Engineer',
    description: 'Get in touch with Waqar Khan for machine learning engineering roles, computer vision projects, or full-stack software development opportunities in Islamabad, Pakistan.',
    url: `${SITE_URL}/contact`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Waqar Khan | Machine Learning & Full Stack Engineer',
    description: 'Get in touch with Waqar Khan for machine learning engineering roles, computer vision projects, or full-stack software development.',
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header section */}
      <div className="space-y-4 border-b border-gray-200 pb-8">
        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 border border-red-200">
          Get In Touch
        </span>
        {/* MANDATORY EXACTLY ONE H1 FOR CONTACT PAGE */}
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Contact {personalInfo.name}
        </h1>
        <p className="text-base text-gray-500 max-w-2xl">
          Interested in discussing machine learning models, computer vision solutions, or full-stack software development? Send a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        
        {/* Left Column: Direct Contact Information */}
        <div className="space-y-8 lg:col-span-5">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-red-600 pl-3">
              Direct Contact Details
            </h2>
            
            <div className="space-y-4 text-sm text-gray-600">
              
              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 font-bold text-xs">
                  ✉️
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase">Professional Email</div>
                  <a href={`mailto:${personalInfo.email}`} className="text-gray-900 hover:text-red-600 font-semibold transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 font-bold text-xs">
                  📞
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase">Phone Number</div>
                  <a href={`tel:${personalInfo.phone}`} className="text-gray-900 hover:text-red-600 font-medium">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 font-bold text-xs">
                  📍
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase">Location</div>
                  <div className="text-gray-900 font-medium">{personalInfo.location}</div>
                </div>
              </div>

            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Social Profiles
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-gray-100 px-3 py-2 text-gray-700 hover:bg-gray-200 transition-colors border border-gray-200"
                >
                  GitHub (@bzwaqar) ↗
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-gray-100 px-3 py-2 text-gray-700 hover:bg-gray-200 transition-colors border border-gray-200"
                >
                  LinkedIn Profile ↗
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

      </div>

    </div>
  );
}
