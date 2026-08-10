/**
 * ============================================================================
 * NOT FOUND PAGE (app/not-found.tsx) — Clean Light Theme
 * ============================================================================
 * Custom 404 page with friendly error message and helpful navigation links.
 */

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <div className="rounded-full bg-red-50 p-4 text-red-600 border border-red-200 mb-6">
        <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
        404 — Page Not Found
      </h1>

      <p className="mt-4 text-base text-gray-500 leading-relaxed">
        Oops! The page or project resource you are looking for does not exist or may have been moved.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
        >
          Return to Home Page
        </Link>
        <Link
          href="/projects"
          className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          Browse Published Projects
        </Link>
      </div>
    </div>
  );
}
