/**
 * ============================================================================
 * GITHUB API CLIENT HELPER & IMAGE MAPPER (lib/github.ts) - PHASE 3.5 FIX
 * ============================================================================
 * Student Note:
 * Provides bulletproof image matching for public projects whether loaded from
 * FastAPI MongoDB backend, GitHub REST API, or offline fallback.
 */

export interface GitHubRepository {
  github_id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  is_fork: boolean;
  updated_at: string;
  image_url?: string;
  image_alt?: string;
}

export const PROJECT_IMAGE_MAP: Record<string, { url: string; alt: string }> = {
  'pixsearch': {
    url: '/images/projects/artificial-intelligence-computer-vision-image-search.webp',
    alt: 'AI image search and computer vision project',
  },
  'credit-card-fraud-detection': {
    url: '/images/projects/credit-card-fraud-cybersecurity-digital-payment.webp',
    alt: 'Credit card fraud detection and cybersecurity concept',
  },
  'fifa-match-predictor-ai': {
    url: '/images/projects/fifa-match-prediction.webp',
    alt: 'Football match analytics and prediction project',
  },
  'facial_recognition_attendance': {
    url: '/images/projects/facial-recognition-security-camera-technology.webp',
    alt: 'Facial recognition and biometric security technology',
  },
  'ai-bookstore-fullstack': {
    url: '/images/projects/online-bookstore-technology-books-computer.webp',
    alt: 'Online bookstore software application concept',
  },
  'books-toscrape-web-scraper': {
    url: '/images/projects/web-scraping-programming-data-extraction.webp',
    alt: 'Web scraping and automated data extraction project',
  },
  'retailpulse-exploratory-data-analysis-business-insights': {
    url: '/images/projects/business-analytics-dashboard-data-visualization.webp',
    alt: 'Retail business data analytics and visualization',
  },
  'kmeans-hierarchical-customer-segmentation': {
    url: '/images/projects/customer-analytics-business-data-segmentation.webp',
    alt: 'Customer analytics and business data segmentation',
  },
  'social-media-engagement-clustering-application': {
    url: '/images/projects/social-media-analytics-data-visualization.webp',
    alt: 'Social media engagement analytics and data clustering',
  },
  'bbc-news-advanced-nlp': {
    url: '/images/projects/news-media-artificial-intelligence-natural-language-processing.webp',
    alt: 'Natural language processing and news media analytics',
  },
  'knn-data-classification-pipeline': {
    url: '/images/projects/software-developer-technology-programming-artificial-intelligence.webp',
    alt: 'Machine learning data classification pipeline',
  },
  'supportdesk': {
    url: '/images/projects/document-fraud-detection-scanning-documents.webp',
    alt: 'Support desk and automated document processing system',
  },
  'business-data-semantic-intelligence-pipeline': {
    url: '/images/projects/business-intelligence-data-analytics-artificial-intelligence.webp',
    alt: 'Business intelligence and semantic data analytics',
  },
  'steel-energy-fastapi-pca': {
    url: '/images/projects/traffic-surveillance-camera-road-safety.webp',
    alt: 'Industrial data analytics and energy consumption analysis',
  },
  'steel-industry-energy-consumption-analysis-and-modeling': {
    url: '/images/projects/traffic-surveillance-camera-road-safety.webp',
    alt: 'Industrial data analytics and energy consumption analysis',
  },
  'diabetes-risk-prediction-system-': {
    url: '/images/projects/healthcare-data-analysis-artificial-intelligence.webp',
    alt: 'Healthcare data analysis and medical artificial intelligence',
  },
};

export function getProjectImage(project: any): { url: string; alt: string } | null {
  if (!project) return null;

  // 1. Check direct image object
  if (project.image && typeof project.image === 'object' && project.image.url) {
    return { url: project.image.url, alt: project.image.alt || `${project.title || project.name} project` };
  }
  if (project.image && typeof project.image === 'string') {
    return { url: project.image, alt: `${project.title || project.name} project` };
  }

  // 2. Check images array
  if (Array.isArray(project.images) && project.images.length > 0) {
    const first = project.images[0];
    if (typeof first === 'string') return { url: first, alt: `${project.title || project.name} project` };
    if (typeof first === 'object' && first.url) return { url: first.url, alt: first.alt || `${project.title || project.name} project` };
  }

  // 3. Match by slug / name in fallback map
  const slug = (project.slug || project.name || '').toLowerCase().trim();
  if (PROJECT_IMAGE_MAP[slug]) {
    return PROJECT_IMAGE_MAP[slug];
  }

  for (const [key, val] of Object.entries(PROJECT_IMAGE_MAP)) {
    if (slug === key || slug.includes(key) || key.includes(slug)) {
      return val;
    }
  }

  return null;
}

export async function fetchGitHubUserRepos(username: string = 'bzwaqar'): Promise<GitHubRepository[]> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const backendResponse = await fetch(`${backendUrl}/api/projects?published_only=true`, {
      next: { revalidate: 3600 },
    }).catch(() => null);

    if (backendResponse && backendResponse.ok) {
      const data = await backendResponse.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map((p: any) => {
          const img = getProjectImage(p);
          return {
            github_id: p.github_id || 0,
            name: p.title || p.name,
            full_name: `bzwaqar/${p.slug || p.name}`,
            html_url: p.github_url || `https://github.com/bzwaqar/${p.slug}`,
            description: p.short_description || p.description || 'GitHub project.',
            language: (p.languages && p.languages[0]) || p.language || 'Python',
            stargazers_count: p.stars || 0,
            forks_count: p.forks || 0,
            topics: p.topics || [],
            is_fork: false,
            updated_at: p.updated_at || new Date().toISOString(),
            image_url: img?.url,
            image_alt: img?.alt,
          };
        });
      }
    }

    // Direct GitHub REST API fallback
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      next: { revalidate: 3600 },
      headers: {
        'Accept': 'application/vnd.github+json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API HTTP status: ${response.status}`);
    }

    const rawRepos = await response.json();

    if (!Array.isArray(rawRepos)) {
      return getFallbackRepositories(username);
    }

    return rawRepos
      .filter((repo: any) => !repo.fork)
      .map((repo: any) => {
        const img = getProjectImage(repo);
        return {
          github_id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          html_url: repo.html_url,
          description: repo.description || 'No description provided.',
          language: repo.language || 'Python / Code',
          stargazers_count: repo.stargazers_count || 0,
          forks_count: repo.forks_count || 0,
          topics: repo.topics || [],
          is_fork: repo.fork || false,
          updated_at: repo.updated_at || '',
          image_url: img?.url,
          image_alt: img?.alt,
        };
      });

  } catch (error) {
    console.warn('Failed to fetch live GitHub repositories, using fallback data:', error);
    return getFallbackRepositories(username);
  }
}

function getFallbackRepositories(username: string): GitHubRepository[] {
  return [
    {
      github_id: 101,
      name: 'pixsearch',
      full_name: `${username}/pixsearch`,
      html_url: `https://github.com/${username}/pixsearch`,
      description: 'Real-time image search and computer vision segmentation pipeline built with OpenCV and PyTorch.',
      language: 'Python',
      stargazers_count: 8,
      forks_count: 2,
      topics: ['computer-vision', 'opencv', 'pytorch', 'python'],
      is_fork: false,
      updated_at: new Date().toISOString(),
      image_url: '/images/projects/artificial-intelligence-computer-vision-image-search.webp',
      image_alt: 'AI image search and computer vision project',
    },
    {
      github_id: 102,
      name: 'ai-bookstore-fullstack',
      full_name: `${username}/ai-bookstore-fullstack`,
      html_url: `https://github.com/${username}/ai-bookstore-fullstack`,
      description: 'Full-stack online bookstore web application with recommendation system.',
      language: 'TypeScript',
      stargazers_count: 14,
      forks_count: 3,
      topics: ['nextjs', 'fastapi', 'fullstack'],
      is_fork: false,
      updated_at: new Date().toISOString(),
      image_url: '/images/projects/online-bookstore-technology-books-computer.webp',
      image_alt: 'Online bookstore software application concept',
    },
  ];
}
