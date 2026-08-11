/**
 * ============================================================================
 * ADMIN DASHBOARD OVERVIEW (app/admin/page.tsx) — Clean Light Theme
 * ============================================================================
 * Control center overview with system metrics and project management links.
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { personalInfo, experienceData, skillCategoriesData, certificationsData } from '@/lib/data';

export const metadata: Metadata = {
  title: `Admin Dashboard | ${personalInfo.name}`,
  description: 'Admin Control Center for Waqar Khan portfolio.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header section */}
      <div className="space-y-4 border-b border-gray-200 pb-8">
        <div className="flex items-center space-x-2">
          <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 border border-red-200">
            Admin Dashboard
          </span>
          <span className="text-xs text-gray-400">Authenticated Control Center</span>
        </div>
        
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Portfolio Control Center
        </h1>
        <p className="text-base text-gray-500 max-w-2xl">
          Manage your GitHub projects, visibility flags, experience, skills, and contact form submissions.
        </p>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        
        <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-2 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold uppercase">GitHub Integration</span>
          <div className="text-3xl font-extrabold text-gray-900">21 Repos</div>
          <p className="text-xs text-red-600">Synced to MongoDB Atlas</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-2 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold uppercase">Work Experience</span>
          <div className="text-3xl font-extrabold text-gray-900">{experienceData.length} Roles</div>
          <p className="text-xs text-red-600">Software & ML Internships</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-2 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold uppercase">Skills Matrix</span>
          <div className="text-3xl font-extrabold text-gray-900">{skillCategoriesData.length} Categories</div>
          <p className="text-xs text-red-600">35+ Technical Skills</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-2 shadow-sm">
          <span className="text-xs text-gray-400 font-semibold uppercase">Certifications</span>
          <div className="text-3xl font-extrabold text-gray-900">{certificationsData.length} Verified</div>
          <p className="text-xs text-red-600">Bootcamps & Credentials</p>
        </div>

      </div>

      {/* Admin Quick Modules Navigation */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        
        {/* Project Management Module Card */}
        <div className="rounded-2xl border-2 border-red-200 bg-white p-8 space-y-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 text-2xl font-bold">
              🛠️
            </div>
            <h2 className="text-xl font-bold text-gray-900">Project Manager</h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              Sync repositories from GitHub, control public visibility (`published` toggle), highlight top projects (`featured` toggle), and edit metadata.
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <Link
              href="/admin/projects"
              className="inline-block rounded-xl bg-red-600 px-5 py-3 text-xs font-bold text-white hover:bg-red-700 transition-colors"
            >
              Open Project Manager →
            </Link>
          </div>
        </div>

        {/* SEO Automation Dashboard Card */}
        <div className="rounded-2xl border-2 border-red-200 bg-white p-8 space-y-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 text-2xl font-bold">
              🤖
            </div>
            <h2 className="text-xl font-bold text-gray-900">SEO Automation System</h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              Diagnostic SEO Health Scores, audit warnings, broken link checks, AI SEO Assistant draft review, Search Console / Analytics placeholders, and logs.
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <Link
              href="/admin/seo"
              className="inline-block rounded-xl bg-red-600 px-5 py-3 text-xs font-bold text-white hover:bg-red-700 transition-colors"
            >
              Open SEO Dashboard →
            </Link>
          </div>
        </div>

        {/* System Settings & MongoDB Status */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 space-y-4 flex flex-col justify-between shadow-sm">
          <div className="space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 text-2xl font-bold">
              ⚡
            </div>
            <h2 className="text-xl font-bold text-gray-900">Database & API Status</h2>
            <div className="space-y-2 text-xs text-gray-600 font-mono">
              <div>Database: <span className="text-green-600 font-bold">My_portfolio_data (Atlas)</span></div>
              <div>Backend Endpoint: <span className="text-red-600">http://localhost:8000</span></div>
              <div>GitHub User: <span className="text-red-600">@bzwaqar</span></div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 text-xs text-gray-400">
            ✓ MongoDB connection pool active
          </div>
        </div>

      </div>

    </div>
  );
}
