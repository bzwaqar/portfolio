'use client';

/**
 * ============================================================================
 * ADMIN PROJECT MANAGEMENT (app/admin/projects/page.tsx) — Clean Light Theme
 * ============================================================================
 * Includes AI Project Content Generator and human-in-the-loop review modal.
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import EditProjectModal from '@/components/EditProjectModal';
import AIGenerateModal from '@/components/AIGenerateModal';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'drafts' | 'featured'>('all');
  
  // Edit Modal State
  const [editingProject, setEditingProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // AI Modal State
  const [aiProject, setAiProject] = useState<any>(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);

  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  // Load all projects from MongoDB backend API
  const loadProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/api/projects`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      } else {
        setStatusMessage('Error loading projects from backend API.');
      }
    } catch (err) {
      console.warn('Backend API offline, loading cached projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Sync from GitHub trigger
  const handleSyncGitHub = async () => {
    setSyncing(true);
    setStatusMessage('Syncing repositories & READMEs from GitHub...');
    try {
      const res = await fetch(`${backendUrl}/api/github/sync`, { method: 'POST' });
      if (res.ok) {
        const result = await res.json();
        setStatusMessage(`✓ ${result.message || 'GitHub repositories synced successfully!'}`);
        await loadProjects();
      } else {
        setStatusMessage('❌ Sync failed. Please check backend logs.');
      }
    } catch (err) {
      setStatusMessage('❌ Could not connect to FastAPI backend server.');
    } finally {
      setSyncing(false);
    }
  };

  // Toggle Published status
  const handleTogglePublish = async (project: any) => {
    const project_id = project._id || project.id || project.slug;
    const newStatus = !project.published;
    
    try {
      const res = await fetch(`${backendUrl}/api/projects/${project_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: newStatus }),
      });

      if (res.ok) {
        setProjects(projects.map((p) => (p._id === project._id || p.slug === project.slug ? { ...p, published: newStatus } : p)));
        setStatusMessage(`✓ Project '${project.title || project.name}' ${newStatus ? 'Published' : 'Unpublished'}.`);
      }
    } catch (err) {
      setStatusMessage('❌ Failed to update publish status.');
    }
  };

  // Toggle Featured status
  const handleToggleFeature = async (project: any) => {
    const project_id = project._id || project.id || project.slug;
    const newStatus = !project.featured;

    try {
      const res = await fetch(`${backendUrl}/api/projects/${project_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: newStatus }),
      });

      if (res.ok) {
        setProjects(projects.map((p) => (p._id === project._id || p.slug === project.slug ? { ...p, featured: newStatus } : p)));
        setStatusMessage(`✓ Project '${project.title || project.name}' ${newStatus ? 'Featured' : 'Unfeatured'}.`);
      }
    } catch (err) {
      setStatusMessage('❌ Failed to update featured status.');
    }
  };

  // Save changes from Edit Modal
  const handleSaveModal = async (updatedData: any) => {
    const project_id = updatedData.id;
    try {
      const res = await fetch(`${backendUrl}/api/projects/${project_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: updatedData.title,
          slug: updatedData.slug,
          short_description: updatedData.short_description,
          description: updatedData.short_description,
          demo_url: updatedData.demo_url,
          topics: updatedData.topics,
          featured: updatedData.featured,
          published: updatedData.published,
        }),
      });

      if (res.ok) {
        const savedProject = await res.json();
        setProjects(projects.map((p) => (p._id === project_id || p.slug === project_id ? savedProject : p)));
        setStatusMessage(`✓ Updated project '${savedProject.title}'.`);
      }
    } catch (err) {
      setStatusMessage('❌ Failed to save project edits.');
    }
  };

  // AI Generation trigger handlers
  const handleRegenerateAIDraft = async (projectId: string) => {
    try {
      const res = await fetch(`${backendUrl}/api/projects/${projectId}/generate-ai`, { method: 'POST' });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('AI generation error:', err);
    }
    return null;
  };

  const handleAcceptAIDraft = async (updatedFields: any) => {
    const project_id = updatedFields.id;
    try {
      const res = await fetch(`${backendUrl}/api/projects/${project_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: updatedFields.title,
          slug: updatedFields.slug,
          short_description: updatedFields.short_description,
          description: updatedFields.description,
          problem_statement: updatedFields.problem_statement,
          solution_statement: updatedFields.solution_statement,
          features: updatedFields.features,
          technologies: updatedFields.technologies,
        }),
      });

      if (res.ok) {
        const savedProject = await res.json();
        setProjects(projects.map((p) => (p._id === project_id || p.slug === project_id ? savedProject : p)));
        setStatusMessage(`✓ AI Draft accepted and saved for '${savedProject.title}'.`);
      }
    } catch (err) {
      setStatusMessage('❌ Failed to save AI draft to MongoDB.');
    }
  };

  // Delete project
  const handleDelete = async (project: any) => {
    const project_id = project._id || project.id || project.slug;
    if (!confirm(`Are you sure you want to delete '${project.title || project.name}'?`)) return;

    try {
      const res = await fetch(`${backendUrl}/api/projects/${project_id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects(projects.filter((p) => (p._id !== project._id && p.slug !== project.slug)));
        setStatusMessage(`✓ Project '${project.title || project.name}' deleted.`);
      }
    } catch (err) {
      setStatusMessage('❌ Failed to delete project.');
    }
  };

  // Filter projects by active tab
  const filteredProjects = projects.filter((p) => {
    if (activeTab === 'published') return p.published;
    if (activeTab === 'drafts') return !p.published;
    if (activeTab === 'featured') return p.featured;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center space-x-2">
          <Link href="/admin" className="hover:text-red-600 transition-colors">Admin Dashboard</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Project Management</span>
        </div>
        <Link href="/projects" target="_blank" className="text-red-600 hover:underline">
          View Public Portfolio Page ↗
        </Link>
      </div>

      {/* Header section with Sync Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Project Management & AI Content Generator
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Control public visibility, edit metadata, or generate AI portfolio drafts from repository READMEs.
          </p>
        </div>

        {/* Sync from GitHub Trigger Button */}
        <button
          onClick={handleSyncGitHub}
          disabled={syncing}
          className="inline-flex items-center rounded-xl bg-red-600 px-5 py-3 text-xs font-bold text-white hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          {syncing ? '🔄 Syncing Repos...' : '📥 Sync from GitHub (@bzwaqar)'}
        </button>
      </div>

      {/* Notification Status Banner */}
      {statusMessage && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700 flex items-center justify-between">
          <span>{statusMessage}</span>
          <button onClick={() => setStatusMessage('')} className="text-gray-400 hover:text-gray-900">✕</button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 text-xs">
        <button
          onClick={() => setActiveTab('all')}
          className={`rounded-xl px-4 py-2 font-semibold transition-colors ${
            activeTab === 'all' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          All Projects ({projects.length})
        </button>
        <button
          onClick={() => setActiveTab('published')}
          className={`rounded-xl px-4 py-2 font-semibold transition-colors ${
            activeTab === 'published' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          Published ({projects.filter((p) => p.published).length})
        </button>
        <button
          onClick={() => setActiveTab('drafts')}
          className={`rounded-xl px-4 py-2 font-semibold transition-colors ${
            activeTab === 'drafts' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          Unpublished / Drafts ({projects.filter((p) => !p.published).length})
        </button>
        <button
          onClick={() => setActiveTab('featured')}
          className={`rounded-xl px-4 py-2 font-semibold transition-colors ${
            activeTab === 'featured' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          Featured Spotlight ({projects.filter((p) => p.featured).length})
        </button>
      </div>

      {/* Projects Management Table */}
      {loading ? (
        <div className="p-12 text-center text-xs text-gray-400 animate-pulse">Loading project data from MongoDB Atlas...</div>
      ) : filteredProjects.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="border-b border-gray-200 bg-gray-50 text-[11px] font-semibold uppercase text-gray-400">
              <tr>
                <th className="px-6 py-4">Project / Title</th>
                <th className="px-6 py-4">Status & Spotlight</th>
                <th className="px-6 py-4">AI Content Draft</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProjects.map((project) => (
                <tr key={project._id || project.slug} className="hover:bg-gray-50 transition-colors">
                  
                  {/* Title & Description */}
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900 text-sm">{project.title || project.name}</div>
                    <div className="text-gray-500 line-clamp-1 max-w-sm">{project.short_description || project.description}</div>
                    <div className="mt-1 flex items-center space-x-3 text-[11px]">
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">
                        GitHub ↗
                      </a>
                      {project.demo_url && (
                        <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:underline">
                          Demo ↗
                        </a>
                      )}
                    </div>
                  </td>

                  {/* Status Badges & Toggles */}
                  <td className="px-6 py-4 space-y-1">
                    <div>
                      <button
                        onClick={() => handleTogglePublish(project)}
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border transition-colors ${
                          project.published
                            ? 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100'
                            : 'bg-gray-100 text-gray-400 border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        {project.published ? '✓ Published' : '○ Draft'}
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => handleToggleFeature(project)}
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border transition-colors ${
                          project.featured
                            ? 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
                            : 'bg-gray-100 text-gray-400 border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        {project.featured ? '★ Featured' : '☆ Standard'}
                      </button>
                    </div>
                  </td>

                  {/* AI Generation Trigger */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setAiProject(project);
                        setIsAIModalOpen(true);
                      }}
                      className="inline-flex items-center space-x-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 border border-red-200 hover:bg-red-100 transition-colors"
                    >
                      <span>✨ AI Draft Review</span>
                    </button>
                  </td>

                  {/* Manual Edit & Delete Actions */}
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditingProject(project);
                        setIsModalOpen(true);
                      }}
                      className="rounded-lg bg-gray-100 px-3 py-1.5 font-semibold text-gray-700 hover:bg-gray-200 border border-gray-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project)}
                      className="rounded-lg bg-red-50 px-3 py-1.5 font-semibold text-red-600 hover:bg-red-100 border border-red-200"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center text-gray-500">
          <p className="text-base font-semibold">No projects found for this category.</p>
        </div>
      )}

      {/* Manual Edit Modal */}
      <EditProjectModal
        project={editingProject}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSaveModal}
      />

      {/* AI Generate Draft Modal */}
      <AIGenerateModal
        project={aiProject}
        isOpen={isAIModalOpen}
        onClose={() => {
          setIsAIModalOpen(false);
          setAiProject(null);
        }}
        onAccept={handleAcceptAIDraft}
        onRegenerate={handleRegenerateAIDraft}
      />

    </div>
  );
}
