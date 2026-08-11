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

import { fetchGitHubUserRepos } from '@/lib/github';

async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const repos = await fetchGitHubUserRepos('bzwaqar');
    const filteredRepos = repos.filter((r) => r.name.toLowerCase() !== 'portfolio');

    const repoMap = new Map<string, typeof filteredRepos[0]>();
    for (const r of filteredRepos) {
      repoMap.set(r.name.toLowerCase(), r);
    }

    const preferredSlugs = [
      'fifa-match-predictor-ai',
      'pixsearch',
      'supportdesk',
      'ai-tech-stack-recommender',
      'amazon-review-intelligence',
      'breast_cancer_prediction',
    ];

    const selected: typeof filteredRepos = [];

    for (const slug of preferredSlugs) {
      const matchKey = Array.from(repoMap.keys()).find((k) => k.includes(slug) || slug.includes(k));
      if (matchKey) {
        selected.push(repoMap.get(matchKey)!);
        repoMap.delete(matchKey);
      }
    }

    for (const r of repoMap.values()) {
      if (selected.length >= 6) break;
      const name = r.name.toLowerCase();
      if (!name.includes('artwork') && !name.includes('bookstore')) {
        selected.push(r);
      }
    }

    return selected.map((r) => ({
      _id: String(r.github_id),
      name: r.name,
      title: r.name,
      slug: r.name.toLowerCase(),
      short_description: r.description,
      description: r.description,
      github_url: r.html_url,
      demo_url: r.demo_url,
      languages: [r.language],
      technologies: r.topics,
      image: r.image_url ? { url: r.image_url, alt: r.image_alt || r.name } : undefined,
      featured: true,
      published: true,
    })) as unknown as Project[];
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero Section (Includes Book Appointment & Animations) */}
      <HeroSection />

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
