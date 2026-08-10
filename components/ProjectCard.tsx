/**
 * ============================================================================
 * PROJECT CARD COMPONENT (components/ProjectCard.tsx) — Clean Light Theme
 * ============================================================================
 * Semantic <article> tag for independent portfolio items with image optimization.
 */

import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/data';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      
      {/* Project Cover Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <Image
          src={project.image}
          alt={`Thumbnail preview for ${project.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Category Badge */}
        <span className="absolute top-3 left-3 rounded-md bg-white/90 px-2.5 py-1 text-xs font-semibold text-red-600 border border-gray-200 backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
          <Link href={`/projects/${project.slug}`}>
            {project.title}
          </Link>
        </h3>
        
        <p className="mt-1 text-xs text-red-600 font-medium">
          {project.subtitle}
        </p>

        <p className="mt-3 flex-1 text-sm text-gray-500 line-clamp-3 leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Tech Stack Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 border border-gray-200"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="rounded bg-gray-50 px-2 py-0.5 text-xs text-gray-400">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Action Link */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors"
          >
            View Project Details
            <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <span className="text-gray-400">{project.date}</span>
        </div>
      </div>
    </article>
  );
}
