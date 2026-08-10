/**
 * ============================================================================
 * SINGLE DYNAMIC BLOG POST PAGE (app/blog/[slug]/page.tsx) — Clean Light Theme
 * ============================================================================
 * Dynamic Route: [slug] renders single post view.
 * SEO Ready: Exports generateMetadata.
 * Semantic Article: Wrapped in semantic <article> and <time> tags.
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPostsData } from '@/lib/data';

interface DynamicBlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Pre-render static paths for blog posts
export async function generateStaticParams() {
  return blogPostsData.map((post) => ({
    slug: post.slug,
  }));
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://waqarkhan.dev';

// Dynamic SEO Metadata Generator
export async function generateMetadata({ params }: DynamicBlogPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogPostsData.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    return {
      title: 'Article Not Found | Waqar Khan',
      description: 'The requested blog post could not be found.',
      robots: { index: false, follow: false },
    };
  }

  const title = `${post.title} — Waqar Khan Blog`;
  const description = post.excerpt;
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`;

  return {
    title,
    description,
    authors: [{ name: post.author.name }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      images: [
        {
          url: imageUrl,
          alt: post.title,
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

export default async function SingleBlogPage({ params }: DynamicBlogPageProps) {
  const resolvedParams = await params;
  const post = blogPostsData.find((p) => p.slug === resolvedParams.slug);

  // If blog post slug is invalid, render Next.js 404
  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-xs text-gray-400">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/blog" className="hover:text-red-600 transition-colors">Blog</Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-semibold truncate max-w-[200px]">{post.title}</li>
        </ol>
      </nav>

      {/* Article Metadata Header */}
      <div className="space-y-4 border-b border-gray-200 pb-8">
        <div className="flex items-center space-x-3 text-xs">
          <span className="rounded-md bg-red-50 px-2.5 py-1 font-semibold text-red-600 border border-red-200">
            {post.category}
          </span>
          <time dateTime={post.date} className="text-gray-400">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span className="text-gray-300">•</span>
          <span className="text-gray-400">{post.readTime}</span>
        </div>

        {/* MANDATORY EXACTLY ONE H1 FOR SINGLE BLOG POST */}
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl leading-tight">
          {post.title}
        </h1>

        {/* Author Bio Box */}
        <div className="flex items-center space-x-3 pt-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 font-bold text-white text-xs">
            WK
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">{post.author.name}</div>
            <div className="text-xs text-red-600">{post.author.role}</div>
          </div>
        </div>
      </div>

      {/* Article Cover Image */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
        <Image
          src={post.image}
          alt={`Featured header image for ${post.title}`}
          fill
          priority
          sizes="(max-width: 1000px) 100vw, 800px"
          className="object-cover"
        />
      </div>

      {/* Article Body Content */}
      <div className="space-y-8 text-gray-600 leading-relaxed text-base">
        {post.content.map((section, idx) => (
          <section key={idx} className="space-y-3">
            <h2 className="text-xl font-bold text-gray-900 border-l-4 border-red-600 pl-3">
              {section.heading}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {section.paragraph}
            </p>
          </section>
        ))}
      </div>

      {/* Article Tags */}
      <div className="pt-6 border-t border-gray-200 space-y-3">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Article Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg bg-gray-100 px-3 py-1 text-xs text-gray-600 border border-gray-200"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Back Navigation Footer */}
      <div className="pt-8 border-t border-gray-200 flex items-center justify-between">
        <Link
          href="/blog"
          className="inline-flex items-center text-xs font-semibold text-red-600 hover:text-red-700 transition-colors"
        >
          ← Back to All Articles
        </Link>
        <Link
          href="/contact"
          className="text-xs font-semibold text-gray-400 hover:text-gray-900"
        >
          Suggest a Topic →
        </Link>
      </div>

    </article>
  );
}
