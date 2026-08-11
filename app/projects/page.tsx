'use client';

/**
 * ============================================================================
 * PUBLIC PROJECTS PAGE (app/projects/page.tsx) — Clean Light Theme
 * ============================================================================
 * Single H1. Fetches from backend or GitHub API fallback.
 */

import { useState, useEffect } from 'react';
import RepositoryCard from '@/components/RepositoryCard';
import { getProjectImage, getProjectDescription } from '@/lib/github';
import Link from 'next/link';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const backendUrl = process.env.NEXT_PUBLIC_API_URL || '';

  useEffect(() => {
    async function loadPublishedProjects() {
      setLoading(true);
      try {
        // Query backend for published projects only
        const res = await fetch(`${backendUrl}/api/projects?published_only=true`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const filteredData = data.filter((p: any) => (p.slug || p.name || '').toLowerCase() !== 'portfolio');
            setProjects(filteredData);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Backend API connection failed, executing fallback repo load:', err);
      }

      // Direct GitHub REST API fallback if backend unavailable
      try {
        const githubRes = await fetch(`https://api.github.com/users/bzwaqar/repos?sort=updated&per_page=100`);
        if (githubRes.ok) {
          const rawRepos = await githubRes.json();
          const normalized = rawRepos
            .filter((r: any) => !r.fork && r.name.toLowerCase() !== 'portfolio')
            .map((r: any) => {
              const img = getProjectImage(r);
              const desc = getProjectDescription(r);
              return {
                github_id: r.id,
                name: r.name,
                title: r.name.replace(/-/g, ' ').toUpperCase(),
                slug: r.name.toLowerCase(),
                github_url: r.html_url,
                short_description: desc,
                description: desc,
                languages: [r.language || 'Python'],
                stars: r.stargazers_count || 0,
                forks: r.forks_count || 0,
                topics: r.topics || [],
                updated_at: r.updated_at,
                image: img,
                published: true,
              };
            });
          setProjects(normalized);
        }
      } catch (ghErr) {
        console.warn('GitHub API fallback failed:', ghErr);
      } finally {
        setLoading(false);
      }
    }

    loadPublishedProjects();
  }, []);

  const CATEGORIES = ['All', 'Machine Learning', 'Deep Learning', 'Computer Vision', 'JavaScript'];

  // Filter projects by classification category and search query
  const filteredProjects = projects.filter((project) => {
    const text = [
      project.category || '',
      project.name || '',
      project.title || '',
      project.slug || '',
      project.description || '',
      project.short_description || '',
      ...(project.languages || [project.language || '']),
      ...(project.topics || []),
      ...(project.technologies || []),
    ].join(' ').toLowerCase();

    let matchesCategory = true;
    if (selectedLanguage === 'Computer Vision') {
      matchesCategory = text.includes('vision') || text.includes('opencv') || text.includes('ocr') || text.includes('facial') || text.includes('image-search') || text.includes('pixsearch');
    } else if (selectedLanguage === 'Deep Learning') {
      matchesCategory = text.includes('deep-learning') || text.includes('nlp') || text.includes('pytorch') || text.includes('tensorflow') || text.includes('sentiment') || text.includes('artwork');
    } else if (selectedLanguage === 'Machine Learning') {
      matchesCategory = text.includes('machine-learning') || text.includes('scikit-learn') || text.includes('xgboost') || text.includes('prediction') || text.includes('classification') || text.includes('clustering') || text.includes('fraud') || text.includes('fifa') || text.includes('supportdesk') || text.includes('recommender') || text.includes('eda') || text.includes('kmeans') || text.includes('knn') || text.includes('energy');
    } else if (selectedLanguage === 'JavaScript') {
      matchesCategory = text.includes('javascript') || text.includes('typescript') || text.includes('react') || text.includes('next') || text.includes('fullstack') || text.includes('bookstore') || text.includes('web');
    }

    const matchesSearch =
      (project.title || project.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.short_description || project.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.topics && project.topics.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 pt-32 pb-20 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header section */}
      <div className="space-y-4 border-b border-gray-200 pb-8">
        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 border border-red-200">
          Open-Source & AI Projects
        </span>
        {/* MANDATORY EXACTLY ONE H1 FOR PROJECTS PAGE */}
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Published Engineering Projects
        </h1>
        <p className="text-base text-gray-500 max-w-2xl">
          Explore machine learning models, deep learning systems, computer vision applications, and full-stack JavaScript solutions built by Waqar Khan.
        </p>
      </div>

      {/* Filter Category Tabs and Search Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-6">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedLanguage(cat)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-colors ${
                selectedLanguage === cat
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-72">
          <label htmlFor="public-repo-search" className="sr-only">Search projects</label>
          <input
            id="public-repo-search"
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs text-gray-900 placeholder-gray-400 focus:border-red-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Projects Grid or Loading / Empty state */}
      {loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="rounded-2xl border border-gray-200 bg-white p-6 space-y-4 animate-pulse">
              <div className="h-40 bg-gray-100 rounded-xl w-full" />
              <div className="h-6 bg-gray-100 rounded w-2/3" />
              <div className="h-12 bg-gray-50 rounded" />
            </div>
          ))}
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const img = getProjectImage(project);
            const desc = getProjectDescription(project);

            return (
              <RepositoryCard
                key={project._id || project.github_id || project.slug}
                repo={{
                  github_id: project.github_id || 0,
                  name: project.title || project.name,
                  full_name: `bzwaqar/${project.slug || project.name}`,
                  html_url: project.github_url || `https://github.com/bzwaqar/${project.slug}`,
                  demo_url: project.demo_url || '',
                  description: desc,
                  language: (project.languages && project.languages[0]) || project.language || 'Python',
                  stargazers_count: project.stars || 0,
                  forks_count: project.forks || 0,
                  topics: project.topics || [],
                  is_fork: false,
                  updated_at: project.updated_at || new Date().toISOString(),
                  image_url: img?.url,
                  image_alt: img?.alt,
                }}
              />
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center text-gray-500 space-y-3">
          <p className="text-base font-semibold text-gray-900">No published projects found matching your query.</p>
          <p className="text-xs text-gray-500">
            Check back soon for new projects or try adjusting your search filters.
          </p>
        </div>
      )}

    </div>
  );
}
