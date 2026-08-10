/**
 * ============================================================================
 * BLOG CARD COMPONENT (components/BlogCard.tsx)
 * ============================================================================
 * Clean light-theme blog article card with image, metadata, and excerpt.
 */

import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/lib/data';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      
      {/* Article Cover Image */}
      <div className="relative h-44 w-full overflow-hidden bg-gray-100">
        <Image
          src={post.image}
          alt={`Cover illustration for ${post.title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <span className="absolute top-3 left-3 rounded-md bg-white/90 px-2.5 py-1 text-xs font-semibold text-red-600 border border-gray-200 backdrop-blur-sm">
          {post.category}
        </span>
      </div>

      {/* Article Metadata & Excerpt */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center space-x-3 text-xs text-gray-400">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </time>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <h3 className="mt-3 text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors leading-snug">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>

        <p className="mt-3 flex-1 text-sm text-gray-500 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Tags list */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 border border-gray-200"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Read More Link */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors"
          >
            Read Full Article
            <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <span className="text-gray-400">By {post.author.name}</span>
        </div>
      </div>
    </article>
  );
}
