import { MetadataRoute } from 'next';
import { projectsData } from '@/lib/data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqarkhan.dev';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || SITE_URL;
  let publishedProjectRoutes: MetadataRoute.Sitemap = [];

  try {
    const res = await fetch(`${backendUrl}/api/projects?published_only=true`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const projects = await res.json();
      publishedProjectRoutes = projects.map((project: any) => ({
        url: `${SITE_URL}/projects/${project.slug}`,
        lastModified: new Date(project.updated_at || new Date()).toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
    }
  } catch (err) {
    publishedProjectRoutes = projectsData.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/experience`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/education`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/skills`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ];

  return [...staticRoutes, ...publishedProjectRoutes];
}
