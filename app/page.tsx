/**
 * ============================================================================
 * HOME PAGE (app/page.tsx) — Full Single Page Portfolio
 * ============================================================================
 */

import type { Metadata } from 'next';
import { getDb } from '@/lib/mongodb';
import { Project } from '@/types/api';

// Components
import HeroSection from '@/components/home/HeroSection';
import SkillsSection from '@/components/home/SkillsSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import CertificationsSection from '@/components/home/CertificationsSection';
import ServicesSection from '@/components/home/ServicesSection';
import ContactSection from '@/components/home/ContactSection';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqarkhan.dev';

export const metadata: Metadata = {
  title: 'Waqar Khan — Machine Learning Engineer | Full Stack Engineer',
  description: 'Official portfolio of Waqar Khan, Machine Learning Engineer & Full Stack Developer specializing in Computer Vision, Generative AI, PyTorch, Next.js, and FastAPI.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Waqar Khan — Machine Learning Engineer | Full Stack Engineer',
    description: 'Official portfolio of Waqar Khan, Machine Learning Engineer & Full Stack Developer specializing in Computer Vision, Generative AI, PyTorch, Next.js, and FastAPI.',
    url: SITE_URL,
    type: 'website',
    images: [`${SITE_URL}/avatar-placeholder.svg`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Waqar Khan — Machine Learning Engineer | Full Stack Engineer',
    description: 'Official portfolio of Waqar Khan, Machine Learning Engineer & Full Stack Developer specializing in Computer Vision, Generative AI, PyTorch, Next.js, and FastAPI.',
    images: [`${SITE_URL}/avatar-placeholder.svg`],
  },
};

// Revalidate occasionally so new projects show up
export const revalidate = 3600;

async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const db = await getDb();
    
    // First, try to specifically get the FIFA project
    const fifaProject = await db.collection('projects').findOne({ 
      slug: { $regex: /fifa/i } 
    });

    // Then get top projects by stars or recency, excluding the FIFA project if we found it
    const excludeIds = fifaProject ? [fifaProject._id] : [];
    
    const otherProjectsCursor = db.collection('projects')
      .find({ _id: { $nin: excludeIds } })
      .sort({ stars: -1, updated_at: -1 })
      .limit(fifaProject ? 5 : 6);
      
    const otherProjects = await otherProjectsCursor.toArray();

    // Combine them, putting FIFA first or mixed in (we'll just put it first)
    const combined = fifaProject ? [fifaProject, ...otherProjects] : otherProjects;
    
    // Map _id to string to avoid serialization issues
    return combined.map(p => ({
      ...p,
      _id: p._id.toString()
    })) as unknown as Project[];
  } catch (error) {
    console.error('Failed to fetch featured projects:', error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero Section (Includes Book Appointment & Animations) */}
      <HeroSection />

      {/* Trust / Logo Strip */}
      <section className="border-t border-gray-200 bg-gray-50 py-8 relative z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16">
            <span className="text-sm font-medium text-gray-400 tracking-wide">Python</span>
            <span className="text-sm font-medium text-gray-400 tracking-wide">FastAPI</span>
            <span className="text-sm font-medium text-gray-400 tracking-wide">Next.js</span>
            <span className="text-sm font-medium text-gray-400 tracking-wide">MongoDB</span>
          </div>
        </div>
      </section>

      {/* 2. Skills Section */}
      <SkillsSection />

      {/* 3. Featured Projects (Top 6) */}
      <ProjectsSection projects={featuredProjects} />

      {/* 4. Experience Section */}
      <ExperienceSection />

      {/* 5. Certifications Section */}
      <CertificationsSection />

      {/* 6. Services Section */}
      <ServicesSection />

      {/* 7. Contact Section */}
      <ContactSection />

    </div>
  );
}
