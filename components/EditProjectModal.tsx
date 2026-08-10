'use client';

/**
 * ============================================================================
 * EDIT PROJECT MODAL (components/EditProjectModal.tsx) — Clean Light Theme
 * ============================================================================
 * Reusable modal for editing project metadata.
 */

import { useState, useEffect, FormEvent } from 'react';

interface EditProjectModalProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (projectData: any) => Promise<void>;
}

export default function EditProjectModal({ project, isOpen, onClose, onSave }: EditProjectModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    short_description: '',
    demo_url: '',
    topicsStr: '',
    featured: false,
    published: false,
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || project.name || '',
        slug: project.slug || project.name?.toLowerCase() || '',
        short_description: project.short_description || project.description || '',
        demo_url: project.demo_url || project.demoUrl || '',
        topicsStr: Array.isArray(project.topics) ? project.topics.join(', ') : '',
        featured: Boolean(project.featured),
        published: Boolean(project.published),
      });
    }
  }, [project]);

  if (!isOpen || !project) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const topicsArray = formData.topicsStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    await onSave({
      id: project._id || project.id,
      title: formData.title,
      slug: formData.slug,
      short_description: formData.short_description,
      description: formData.short_description,
      demo_url: formData.demo_url,
      topics: topicsArray,
      featured: formData.featured,
      published: formData.published,
    });

    setSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 space-y-6 shadow-xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Edit Project Details</h3>
            <p className="text-xs text-gray-500">Modify project title, demo URL, visibility flags, and topics.</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900"
          >
            ✕
          </button>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Title */}
          <div>
            <label className="block font-semibold uppercase text-gray-700 mb-1">
              Project Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-red-500 focus:outline-none"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block font-semibold uppercase text-gray-700 mb-1">
              URL Slug
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-red-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold uppercase text-gray-700 mb-1">
              Short Description
            </label>
            <textarea
              rows={3}
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-red-500 focus:outline-none"
            />
          </div>

          {/* Demo URL */}
          <div>
            <label className="block font-semibold uppercase text-gray-700 mb-1">
              Live Demo URL
            </label>
            <input
              type="url"
              placeholder="e.g. https://demo.example.com"
              value={formData.demo_url}
              onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-red-500 focus:outline-none"
            />
          </div>

          {/* Topics / Technologies */}
          <div>
            <label className="block font-semibold uppercase text-gray-700 mb-1">
              Topics / Technologies (comma separated)
            </label>
            <input
              type="text"
              placeholder="python, pytorch, computer-vision"
              value={formData.topicsStr}
              onChange={(e) => setFormData({ ...formData, topicsStr: e.target.value })}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-red-500 focus:outline-none"
            />
          </div>

          {/* Toggles: Featured & Published */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="font-semibold text-gray-700">Published on Portfolio</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="font-semibold text-gray-700">Featured Spotlight</span>
            </label>
          </div>

          {/* Form Action Buttons */}
          <div className="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
            >
              {saving ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
