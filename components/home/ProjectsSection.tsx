'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from '@/types/api';

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-20 bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              Featured Projects
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              A selection of intelligent systems, full-stack applications, and machine learning models I&apos;ve built.
            </p>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.article 
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Top Banner Image (Only rendered if WebP image exists) */}
              {project.image && project.image.url && (
                <div className="relative h-48 w-full overflow-hidden bg-gray-100 border-b border-gray-200">
                  <Image
                    src={project.image.url}
                    alt={project.image.alt || project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {project.languages && project.languages.length > 0 && (
                    <span className="absolute top-3 left-3 rounded-md bg-white/90 px-2.5 py-1 text-xs font-semibold text-red-600 border border-gray-200 backdrop-blur-sm shadow-sm">
                      {project.languages[0]}
                    </span>
                  )}
                </div>
              )}

              {/* Card Content */}
              <div className="flex flex-1 flex-col p-6">
                
                {!project.image && project.languages && project.languages.length > 0 && (
                  <span className="w-fit mb-3 rounded-md bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-600 border border-red-200">
                    {project.languages[0]}
                  </span>
                )}

                <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                  <Link href={`/projects/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>
                
                <p className="mt-3 flex-1 text-sm text-gray-500 line-clamp-3 leading-relaxed">
                  {project.short_description || project.description}
                </p>

                {/* Tech Stack Tags */}
                {project.technologies && project.technologies.length > 0 && (
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
                )}

                {/* Action Links */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold">
                  <div className="flex space-x-3">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        GitHub ↗
                      </a>
                    )}
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        Demo ↗
                      </a>
                    )}
                  </div>
                  
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors"
                  >
                    View Project
                    <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Explore More Button */}
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center rounded-full bg-white px-8 py-3.5 text-sm font-bold text-gray-900 border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
          >
            Explore More Projects
            <svg className="ml-2 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
