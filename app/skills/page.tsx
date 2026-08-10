/**
 * ============================================================================
 * SKILLS PAGE (app/skills/page.tsx) — Clean Light Theme
 * ============================================================================
 * Single H1. Data-driven from skillCategoriesData.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { skillCategoriesData } from '@/lib/data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqarkhan.dev';

export const metadata: Metadata = {
  title: 'Technical Skills — Waqar Khan | AI & Machine Learning',
  description: 'Explore Waqar Khan\'s technical skills across Programming Languages (Python, TypeScript), AI & Machine Learning (PyTorch, Computer Vision), Web Frameworks (Next.js, FastAPI), and Databases.',
  alternates: {
    canonical: `${SITE_URL}/skills`,
  },
  openGraph: {
    title: 'Technical Skills — Waqar Khan | AI & Machine Learning',
    description: 'Explore Waqar Khan\'s technical skills across Programming Languages (Python, TypeScript), AI & Machine Learning (PyTorch, Computer Vision), Web Frameworks (Next.js, FastAPI), and Databases.',
    url: `${SITE_URL}/skills`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technical Skills — Waqar Khan | AI & Machine Learning',
    description: 'Technical skills matrix of Waqar Khan across AI/ML, Computer Vision, and Full Stack Development.',
  },
};

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header section */}
      <div className="space-y-4 border-b border-gray-200 pb-8">
        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 border border-red-200">
          Data-Driven Technical Matrix
        </span>
        {/* MANDATORY EXACTLY ONE H1 FOR SKILLS PAGE */}
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Technical Skills System
        </h1>
        <p className="text-base text-gray-500 max-w-2xl">
          Categorized technical skills across machine learning engineering, computer vision, full-stack web development, and software tools.
        </p>
      </div>

      {/* 6 Skill Categories Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {skillCategoriesData.map((category) => (
          <section
            key={category.title}
            className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col justify-between shadow-sm"
          >
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-red-600 pl-3">
                {category.title}
              </h2>
              
              <p className="text-xs text-gray-500 leading-relaxed">
                {category.description}
              </p>

              {/* Skill Pills List */}
              <div className="pt-2 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 border border-gray-200 hover:border-red-300 hover:text-red-600 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 text-[11px] text-gray-400 flex items-center justify-between">
              <span>{category.skills.length} Technical Skills</span>
              <span className="text-red-600">✓ Data-Driven</span>
            </div>
          </section>
        ))}
      </div>

      {/* Navigation Footer */}
      <div className="pt-4 flex justify-between text-xs text-gray-400 border-t border-gray-200">
        <Link href="/about" className="text-red-600 hover:underline">← Bio & Education</Link>
        <Link href="/experience" className="text-red-600 hover:underline">Work Experience →</Link>
      </div>

    </div>
  );
}
