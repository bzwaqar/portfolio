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
    const db = await getDb();
    
    // Get top published projects excluding portfolio repo
    const projectsCursor = db.collection('projects')
      .find({ slug: { $ne: 'portfolio' }, name: { $ne: 'portfolio' } })
      .sort({ featured: -1, stars: -1, updated_at: -1 });
      
    const allDbProjects = await projectsCursor.toArray();

    if (allDbProjects && allDbProjects.length > 0) {
      let top6 = allDbProjects.slice(0, 6);
      
      // 1. Replace bookstore with FIFA project
      const fifaProj = allDbProjects.find((p) => (p.slug || p.name || '').toLowerCase().includes('fifa'));
      if (fifaProj) {
        const bookstoreIdx = top6.findIndex((p) => (p.slug || p.name || '').toLowerCase().includes('bookstore'));
        if (bookstoreIdx !== -1) {
          top6[bookstoreIdx] = fifaProj;
        } else if (!top6.some((p) => (p.slug || p.name || '').toLowerCase().includes('fifa'))) {
          top6[4] = fifaProj;
        }
      }

      // 2. Replace artwork with PixSearch project
      const pixProj = allDbProjects.find((p) => (p.slug || p.name || '').toLowerCase().includes('pixsearch'));
      if (pixProj) {
        const artworkIdx = top6.findIndex((p) => (p.slug || p.name || '').toLowerCase().includes('artwork'));
        if (artworkIdx !== -1) {
          top6[artworkIdx] = pixProj;
        } else if (!top6.some((p) => (p.slug || p.name || '').toLowerCase().includes('pixsearch'))) {
          top6[2] = pixProj;
        }
      }

      return top6.map(p => ({
        ...p,
        _id: p._id.toString()
      })) as unknown as Project[];
    }
  } catch (error) {
    console.warn('MongoDB fetch for featured projects failed, falling back to GitHub API:', error);
  }

  // Fallback: fetch live GitHub repos, excluding portfolio
  try {
    const repos = await fetchGitHubUserRepos('bzwaqar');
    const filteredRepos = repos.filter((r) => r.name.toLowerCase() !== 'portfolio');

    let top6 = filteredRepos.slice(0, 6);

    // 1. Replace bookstore with FIFA repo
    const fifaRepo = filteredRepos.find((r) => r.name.toLowerCase().includes('fifa'));
    if (fifaRepo) {
      const bookstoreIdx = top6.findIndex((r) => r.name.toLowerCase().includes('bookstore'));
      if (bookstoreIdx !== -1) {
        top6[bookstoreIdx] = fifaRepo;
      } else if (!top6.some((r) => r.name.toLowerCase().includes('fifa'))) {
        top6[4] = fifaRepo;
      }
    }

    // 2. Replace artwork with PixSearch repo
    const pixRepo = filteredRepos.find((r) => r.name.toLowerCase().includes('pixsearch'));
    if (pixRepo) {
      const artworkIdx = top6.findIndex((r) => r.name.toLowerCase().includes('artwork'));
      if (artworkIdx !== -1) {
        top6[artworkIdx] = pixRepo;
      } else if (!top6.some((r) => r.name.toLowerCase().includes('pixsearch'))) {
        top6[2] = pixRepo;
      }
    }

    return top6.map((r) => ({
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
  } catch (err) {
    console.error('Failed to load fallback featured projects:', err);
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
