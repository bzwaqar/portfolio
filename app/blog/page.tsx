'use client';

/**
 * ============================================================================
 * BLOG LISTING PAGE (app/blog/page.tsx) — Clean Light Theme
 * ============================================================================
 * Single H1. Client-side search and category filter.
 */

import { useState } from 'react';
import BlogCard from '@/components/BlogCard';
import { blogPostsData } from '@/lib/data';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Artificial Intelligence', 'Web Development', 'Machine Learning Ops'];

  // Filter blog posts by category and search string
  const filteredPosts = blogPostsData.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;

    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header section */}
      <div className="space-y-4 border-b border-gray-200 pb-8">
        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 border border-red-200">
          Engineering Journal
        </span>
        {/* MANDATORY EXACTLY ONE H1 FOR BLOG PAGE */}
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Blog & Technical Writing
        </h1>
        <p className="text-base text-gray-500 max-w-2xl">
          Tutorials, architectural breakdowns, fine-tuning benchmarks, and Next.js guides written for developers and researchers.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Category Pill Buttons */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Real-time Search Box */}
        <div className="w-full sm:w-72">
          <label htmlFor="blog-search" className="sr-only">Search blog articles</label>
          <input
            id="blog-search"
            type="text"
            placeholder="Search articles or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs text-gray-900 placeholder-gray-400 focus:border-red-500 focus:outline-none"
          />
        </div>

      </div>

      {/* Blog Cards Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center text-gray-500">
          <p className="text-base font-semibold text-gray-900">No blog posts found matching your search.</p>
          <p className="text-xs mt-1">Try searching for keywords like &quot;PyTorch&quot;, &quot;Next.js&quot;, or &quot;LLM&quot;.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="mt-4 rounded-lg bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-200"
          >
            Reset Search Filters
          </button>
        </div>
      )}

    </div>
  );
}
