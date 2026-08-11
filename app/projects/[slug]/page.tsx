/**
 * ============================================================================
 * SINGLE DYNAMIC PROJECT PAGE (app/projects/[slug]/page.tsx) - PHASE 6 SEO
 * ============================================================================
 * Student Note:
 * - Dynamic SEO Metadata: Generates project-specific title, description, canonical URL,
 *   Open Graph image, and Twitter Card.
 * - JSON-LD Structured Data: Renders BreadcrumbList and SoftwareSourceCode schemas.
 * - Static Pre-rendering: Pre-renders published projects at build time via `generateStaticParams`.
 * - 404 & Noindex: Calls `notFound()` for invalid or unpublished project requests.
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projectsData } from '@/lib/data';
import { fetchGitHubUserRepos, getProjectImage } from '@/lib/github';
import { BreadcrumbJsonLd, SoftwareProjectJsonLd } from '@/components/JsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqarkhan.dev';

interface DynamicProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Fetch single project helper from MongoDB API or local/GitHub fallback
async function getProjectBySlug(slug: string) {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  try {
    const res = await fetch(`${backendUrl}/api/projects/${slug}`, { next: { revalidate: 3600 } });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`Backend fetch failed for project slug '${slug}', checking fallback:`, err);
  }

  // Local data fallback
  const localProj = projectsData.find((p) => p.slug === slug);
  if (localProj) {
    return {
      title: localProj.title,
      slug: localProj.slug,
      short_description: localProj.shortDescription,
      description: localProj.fullDescription,
      problem_statement: localProj.problemStatement,
      solution_statement: localProj.solution,
      github_url: localProj.githubUrl,
      demo_url: localProj.liveUrl,
      features: localProj.features,
      technologies: localProj.technologies,
      languages: [localProj.category],
      image: { url: localProj.image, alt: `${localProj.title} visual` },
      published: true,
    };
  }

  // GitHub API / local fallback map fallback
  try {
    const repos = await fetchGitHubUserRepos('bzwaqar');
    const matchedRepo = repos.find(
      (r) =>
        r.name.toLowerCase() === slug.toLowerCase() ||
        (r.full_name && r.full_name.toLowerCase().endsWith(`/${slug.toLowerCase()}`))
    );
    if (matchedRepo) {
      return {
        title: matchedRepo.name,
        slug: slug,
        short_description: matchedRepo.description,
        description: matchedRepo.description,
        github_url: matchedRepo.html_url,
        demo_url: matchedRepo.demo_url,
        languages: [matchedRepo.language],
        technologies: matchedRepo.topics,
        image: matchedRepo.image_url ? { url: matchedRepo.image_url, alt: matchedRepo.image_alt } : null,
        published: true,
      };
    }
  } catch (ghErr) {
    console.warn('GitHub fallback load failed for single project:', ghErr);
  }

  return null;
}

// Generate static params for build pre-rendering
export async function generateStaticParams() {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  try {
    const res = await fetch(`${backendUrl}/api/projects?published_only=true`, { cache: 'no-store' });
    if (res.ok) {
      const projects = await res.json();
      return projects.map((p: any) => ({ slug: p.slug }));
    }
  } catch (err) {
    // Fallback
  }

  try {
    const repos = await fetchGitHubUserRepos('bzwaqar');
    if (repos.length > 0) {
      return repos.map((r) => ({ slug: r.name.toLowerCase() }));
    }
  } catch (err) {
    // Fallback to local
  }

  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

// Dynamic SEO Metadata Generator
export async function generateMetadata({ params }: DynamicProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project || !project.published) {
    return {
      title: 'Project Not Found | Waqar Khan',
      description: 'The requested project could not be found or is not published.',
      robots: { index: false, follow: false },
    };
  }

  const title = `${project.title || project.name} — AI & Full Stack Project | Waqar Khan`;
  const description = project.short_description || project.description || `Software project built by Waqar Khan.`;
  const canonicalUrl = `${SITE_URL}/projects/${project.slug}`;

  const imgObj = project.image || (Array.isArray(project.images) && project.images[0] ? project.images[0] : null);
  const imageUrl = typeof imgObj === 'string' ? imgObj : imgObj?.url ? `${SITE_URL}${imgObj.url}` : `${SITE_URL}/avatar-placeholder.svg`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
      images: [
        {
          url: imageUrl,
          alt: project.title || project.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function SingleProjectPage({ params }: DynamicProjectPageProps) {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project || !project.published) {
    notFound();
  }

  const imgObj = project.image || (Array.isArray(project.images) && project.images[0] ? project.images[0] : null);
  const imageUrl = typeof imgObj === 'string' ? imgObj : imgObj?.url || null;
  const imageAlt = typeof imgObj === 'object' ? imgObj?.alt : `${project.title || project.name} visual preview`;

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Projects', url: '/projects' },
    { name: project.title || project.name, url: `/projects/${project.slug}` },
  ];

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">

      {/* Schema.org Structured Data */}
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <SoftwareProjectJsonLd
        title={project.title || project.name}
        description={project.short_description || project.description || ''}
        url={`/projects/${project.slug}`}
        codeRepository={project.github_url}
        programmingLanguage={project.technologies || project.languages}
      />

      {/* Semantic Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/projects" className="hover:text-indigo-400 transition-colors">Projects</Link>
          </li>
          <li>/</li>
          <li className="text-slate-200 font-semibold truncate max-w-[200px]">{project.title || project.name}</li>
        </ol>
      </nav>

      {/* Header section with H1 */}
      <div className="space-y-4 border-b border-slate-800 pb-8">
        <div className="flex items-center space-x-3">
          <span className="rounded-md bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
            {(project.languages && project.languages[0]) || 'AI/Software'}
          </span>
          {project.updated_at && (
            <span className="text-xs text-slate-500">
              Updated {new Date(project.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </span>
          )}
        </div>

        {/* MANDATORY EXACTLY ONE H1 FOR SINGLE PROJECT PAGE */}
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          {project.title || project.name}
        </h1>

        <p className="text-lg text-indigo-300 font-medium leading-relaxed">
          {project.short_description || project.description}
        </p>

        {/* Action Links */}
        <div className="pt-2 flex flex-wrap gap-4">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl bg-slate-800 px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-700 transition-colors border border-slate-700"
            >
              🐙 GitHub Source Code ↗
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors shadow-md"
            >
              🚀 Live Demo ↗
            </a>
          )}
        </div>
      </div>

      {/* Project Cover Image (Only rendered if WebP image exists) */}
      {imageUrl && (
        <div className="relative h-64 sm:h-96 w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 900px"
            className="object-cover"
          />
        </div>
      )}

      {/* Main Content Sections */}
      <div className="space-y-8 text-slate-300">

        {/* Overview */}
        <section className="glass-card rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 space-y-3">
          <h2 className="text-xl font-bold text-white border-l-4 border-indigo-500 pl-3">
            Project Overview
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            {project.description || project.short_description}
          </p>
        </section>

        {/* Problem & Solution Grid */}
        {(project.problem_statement || project.solution_statement) && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {project.problem_statement && (
              <section className="glass-card rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-2">
                <h2 className="text-lg font-bold text-rose-400">
                  ⚠️ The Problem
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.problem_statement}
                </p>
              </section>
            )}

            {project.solution_statement && (
              <section className="glass-card rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-2">
                <h2 className="text-lg font-bold text-emerald-400">
                  💡 The Solution
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {project.solution_statement}
                </p>
              </section>
            )}
          </div>
        )}

        {/* Key Features */}
        {project.features && project.features.length > 0 && (
          <section className="glass-card rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-white border-l-4 border-cyan-500 pl-3">
              Key Engineering Features
            </h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {project.features.map((feature: string, idx: number) => (
                <li key={idx} className="flex items-start space-x-2 text-sm text-slate-300">
                  <span className="text-indigo-400 font-bold">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Technologies Used */}
        {(project.technologies || project.languages) && (
          <section className="space-y-4 pt-4 border-t border-slate-800/80">
            <h2 className="text-lg font-bold text-white">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {(project.technologies && project.technologies.length > 0 ? project.technologies : project.languages || []).map((tech: string) => (
                <span
                  key={tech}
                  className="rounded-lg bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Back Link Footer */}
      <div className="pt-8 border-t border-slate-800/80 flex items-center justify-between">
        <Link
          href="/projects"
          className="inline-flex items-center text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          ← View All Published Projects
        </Link>
        <Link
          href="/contact"
          className="text-xs font-semibold text-slate-400 hover:text-white"
        >
          Contact Waqar Khan →
        </Link>
      </div>

    </article>
  );
}
