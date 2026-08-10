/**
 * ============================================================================
 * REPOSITORY CARD COMPONENT (components/RepositoryCard.tsx)
 * ============================================================================
 * Clean light-theme project repository card with image, stats, and links.
 */

import Image from 'next/image';

export interface RepositoryCardData {
  github_id?: number;
  name: string;
  full_name?: string;
  html_url: string;
  demo_url?: string;
  description: string;
  language?: string;
  stargazers_count?: number;
  forks_count?: number;
  topics?: string[];
  is_fork?: boolean;
  updated_at?: string;
  image_url?: string;
  image_alt?: string;
}

interface RepositoryCardProps {
  repo: RepositoryCardData;
}

export default function RepositoryCard({ repo }: RepositoryCardProps) {
  const imageUrl = repo.image_url;
  const imageAlt = repo.image_alt || `${repo.name} project preview`;

  return (
    <article className="flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
      
      {/* Top Banner Image (Only rendered if WebP image exists) */}
      {imageUrl && (
        <div className="relative h-48 w-full overflow-hidden bg-gray-100 border-b border-gray-200">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
      )}

      {/* Content Body */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        
        <div className="space-y-2">
          {/* Header Badge & Stats */}
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-md bg-red-50 px-2.5 py-0.5 text-[11px] font-semibold text-red-600 border border-red-200">
              {repo.language || 'Software/AI'}
            </span>

            {/* Stars & Forks */}
            <div className="flex items-center space-x-3 text-xs text-gray-400 font-mono">
              <span title="Stars">⭐ {repo.stargazers_count || 0}</span>
              <span title="Forks">🔀 {repo.forks_count || 0}</span>
            </div>
          </div>

          {/* Project Title */}
          <h3 className="text-lg font-bold text-gray-900 hover:text-red-600 transition-colors pt-1">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center group"
            >
              <span className="truncate">{repo.name}</span>
              <svg className="ml-1.5 h-4 w-4 text-gray-400 group-hover:text-red-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </h3>

          {/* Description */}
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
            {repo.description}
          </p>
        </div>

        {/* Topics & Footer Actions */}
        <div className="space-y-4 pt-3 border-t border-gray-100">
          
          {/* Topics Pills */}
          {repo.topics && repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {repo.topics.slice(0, 4).map((topic) => (
                <span
                  key={topic}
                  className="rounded bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600 border border-gray-200"
                >
                  #{topic}
                </span>
              ))}
            </div>
          )}

          {/* Action Links */}
          <div className="flex items-center justify-between text-[11px] pt-1">
            <div className="flex items-center space-x-3">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-red-600 hover:text-red-700 transition-colors"
              >
                GitHub Code ↗
              </a>
              {repo.demo_url && (
                <a
                  href={repo.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Live Demo ↗
                </a>
              )}
            </div>

            {repo.updated_at && (
              <span className="text-[10px] text-gray-400">
                {new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
            )}
          </div>

        </div>

      </div>
    </article>
  );
}
