/**
 * ============================================================================
 * ABOUT PAGE (app/about/page.tsx) — Clean Light Theme
 * ============================================================================
 * Single H1. Consumes personalInfo, educationData, certificationsData.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { personalInfo, educationData, certificationsData } from '@/lib/data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqarkhan.dev';

export const metadata: Metadata = {
  title: 'About Waqar Khan — AI & Machine Learning Engineer',
  description: 'Learn about Waqar Khan, Machine Learning Engineer & Full Stack Developer. Artificial Intelligence background at COMSATS University Islamabad, computer vision specialization, and software engineering experience.',
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: 'About Waqar Khan — AI & Machine Learning Engineer',
    description: 'Learn about Waqar Khan, Machine Learning Engineer & Full Stack Developer. Artificial Intelligence background at COMSATS University Islamabad, computer vision specialization, and software engineering experience.',
    url: `${SITE_URL}/about`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Waqar Khan — AI & Machine Learning Engineer',
    description: 'Learn about Waqar Khan, Machine Learning Engineer & Full Stack Developer. Artificial Intelligence background at COMSATS University Islamabad.',
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      
      {/* Page Header */}
      <section className="space-y-4 border-b border-gray-200 pb-8">
        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 border border-red-200">
          Professional Background
        </span>
        {/* MANDATORY EXACTLY ONE H1 FOR ABOUT PAGE */}
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          About {personalInfo.name}
        </h1>
        <p className="text-lg text-red-600 font-medium">
          {personalInfo.primaryTitle} | {personalInfo.secondaryTitle} • {personalInfo.specialization}
        </p>
      </section>

      {/* Main Biography Narrative */}
      <article className="space-y-6 text-gray-600 leading-relaxed">
        <h2 className="text-xl font-bold text-gray-900 border-l-4 border-red-600 pl-3">
          Engineering & Research Positioning
        </h2>

        {personalInfo.longBio.map((paragraph, index) => (
          <p key={index} className="text-base text-gray-600 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </article>

      {/* Technical Focus Areas */}
      <section className="space-y-6 pt-4">
        <h2 className="text-xl font-bold text-gray-900 border-l-4 border-red-600 pl-3">
          Technical Focus Areas
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          
          <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-2 shadow-sm">
            <h3 className="text-base font-bold text-gray-900">AI & Machine Learning</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Machine Learning algorithms, Deep Learning models, Feature Engineering, Predictive Analytics, and Data Analysis.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-2 shadow-sm">
            <h3 className="text-base font-bold text-gray-900">Computer Vision</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Image processing, object recognition, visual feature extraction, and real-time computer vision models using OpenCV and PyTorch/TensorFlow.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-2 shadow-sm">
            <h3 className="text-base font-bold text-gray-900">Generative AI & LLMs</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Large Language Model fine-tuning, prompt engineering, and Retrieval-Augmented Generation (RAG) architecture development.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-2 shadow-sm">
            <h3 className="text-base font-bold text-gray-900">Full-Stack Web Development</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Modern web application engineering using React.js, Node.js, Express.js, REST APIs, HTML/CSS, JavaScript, and database backends.
            </p>
          </div>

        </div>
      </section>

      {/* Education Credentials */}
      <section className="space-y-6 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 border-l-4 border-red-600 pl-3">
          Education Credentials
        </h2>

        {educationData.map((edu) => (
          <div key={edu.id} className="rounded-2xl border border-gray-200 bg-white p-6 space-y-2 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-base font-bold text-gray-900">{edu.degree}</h3>
              <span className="text-xs text-red-600 font-semibold">{edu.duration}</span>
            </div>
            <p className="text-xs text-gray-600 font-medium">{edu.institution} • {edu.location}</p>
            <p className="text-xs text-gray-500 pt-2 leading-relaxed">{edu.details}</p>
          </div>
        ))}
      </section>

      {/* Certifications List */}
      <section className="space-y-6 pt-4 border-t border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 border-l-4 border-red-600 pl-3">
          Certifications & Professional Training
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {certificationsData.map((cert) => (
            <div key={cert.id} className="rounded-2xl border border-gray-200 bg-white p-5 space-y-1 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900">{cert.title}</h3>
              <p className="text-xs text-red-600 font-medium">
                {cert.issuer} {cert.platform ? `(${cert.platform})` : ''}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="pt-4 flex justify-between text-xs text-gray-400 border-t border-gray-200">
        <Link href="/experience" className="text-red-600 hover:underline">← Work Experience</Link>
        <Link href="/skills" className="text-red-600 hover:underline">Technical Skills →</Link>
      </div>

    </div>
  );
}
