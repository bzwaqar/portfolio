'use client';

/**
 * ============================================================================
 * AI GENERATE DRAFT MODAL (components/AIGenerateModal.tsx) — Clean Light Theme
 * ============================================================================
 * Human-in-the-Loop review interface for AI-generated project content.
 */

import { useState, useEffect } from 'react';

interface AIGenerateModalProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
  onAccept: (updatedFields: any) => Promise<void>;
  onRegenerate: (projectId: string) => Promise<any>;
}

export default function AIGenerateModal({
  project,
  isOpen,
  onClose,
  onAccept,
  onRegenerate,
}: AIGenerateModalProps) {
  const [draft, setDraft] = useState({
    title: '',
    slug: '',
    short_description: '',
    description: '',
    problem_statement: '',
    solution_statement: '',
    featuresStr: '',
    technologiesStr: '',
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (project && isOpen) {
      handleInitialGenerate();
    }
  }, [project, isOpen]);

  const handleInitialGenerate = async () => {
    if (!project) return;
    setLoading(true);
    const projectId = project._id || project.id || project.slug;
    const result = await onRegenerate(projectId);
    
    if (result && result.draft) {
      populateDraftState(result.draft);
    }
    setLoading(false);
  };

  const populateDraftState = (d: any) => {
    setDraft({
      title: d.title || project.title || project.name || '',
      slug: d.slug || project.slug || '',
      short_description: d.short_description || '',
      description: d.description || '',
      problem_statement: d.problem_statement || '',
      solution_statement: d.solution_statement || '',
      featuresStr: Array.isArray(d.features) ? d.features.join('\n') : '',
      technologiesStr: Array.isArray(d.technologies) ? d.technologies.join(', ') : '',
    });
  };

  const handleRegenerateClick = async () => {
    setLoading(true);
    const projectId = project._id || project.id || project.slug;
    const result = await onRegenerate(projectId);
    if (result && result.draft) {
      populateDraftState(result.draft);
    }
    setLoading(false);
  };

  const handleAcceptClick = async () => {
    setSaving(true);
    const featuresList = draft.featuresStr.split('\n').map((f) => f.trim()).filter(Boolean);
    const techList = draft.technologiesStr.split(',').map((t) => t.trim()).filter(Boolean);

    await onAccept({
      id: project._id || project.id || project.slug,
      title: draft.title,
      slug: draft.slug,
      short_description: draft.short_description,
      description: draft.description,
      problem_statement: draft.problem_statement,
      solution_statement: draft.solution_statement,
      features: featuresList,
      technologies: techList,
    });

    setSaving(false);
    onClose();
  };

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-2xl my-8 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 space-y-6 shadow-xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-[11px] font-semibold text-red-600 border border-red-200">
                ✨ AI Content Synthesizer (Draft)
              </span>
              <span className="text-xs text-gray-400">Non-Hallucinating</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mt-1">Review AI Draft for &apos;{project.title || project.name}&apos;</h3>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900">
            ✕
          </button>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="py-12 text-center text-xs text-gray-500 space-y-3">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
            <p>Analyzing repository metadata & README content...</p>
          </div>
        ) : (
          /* Draft Review & Editing Fields */
          <div className="space-y-4 text-xs max-h-[60vh] overflow-y-auto pr-2">
            
            {/* Short Description */}
            <div>
              <label className="block font-semibold uppercase text-gray-700 mb-1">
                Short Description (Draft)
              </label>
              <textarea
                rows={2}
                value={draft.short_description}
                onChange={(e) => setDraft({ ...draft, short_description: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-xs text-gray-900 focus:border-red-500 focus:outline-none"
              />
            </div>

            {/* Detailed Description */}
            <div>
              <label className="block font-semibold uppercase text-gray-700 mb-1">
                Detailed Narrative Description
              </label>
              <textarea
                rows={3}
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-xs text-gray-900 focus:border-red-500 focus:outline-none"
              />
            </div>

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold uppercase text-red-600 mb-1">
                  Problem Statement
                </label>
                <textarea
                  rows={3}
                  value={draft.problem_statement}
                  onChange={(e) => setDraft({ ...draft, problem_statement: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase text-green-600 mb-1">
                  Solution Statement
                </label>
                <textarea
                  rows={3}
                  value={draft.solution_statement}
                  onChange={(e) => setDraft({ ...draft, solution_statement: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs text-gray-900 focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Key Features (line by line) */}
            <div>
              <label className="block font-semibold uppercase text-gray-700 mb-1">
                Key Features (one bullet per line)
              </label>
              <textarea
                rows={4}
                value={draft.featuresStr}
                onChange={(e) => setDraft({ ...draft, featuresStr: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-xs text-gray-900 font-mono focus:border-red-500 focus:outline-none"
              />
            </div>

            {/* Technologies Used */}
            <div>
              <label className="block font-semibold uppercase text-gray-700 mb-1">
                Technologies Used (comma separated)
              </label>
              <input
                type="text"
                value={draft.technologiesStr}
                onChange={(e) => setDraft({ ...draft, technologiesStr: e.target.value })}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-xs text-gray-900 focus:border-red-500 focus:outline-none"
              />
            </div>

          </div>
        )}

        {/* Modal Action Buttons */}
        <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 font-semibold text-red-600 hover:bg-red-100"
          >
            🚫 Reject / Discard Draft
          </button>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleRegenerateClick}
              disabled={loading || saving}
              className="rounded-xl border border-gray-300 bg-gray-100 px-4 py-2.5 font-semibold text-gray-700 hover:bg-gray-200 disabled:opacity-50"
            >
              🔄 Regenerate
            </button>

            <button
              type="button"
              onClick={handleAcceptClick}
              disabled={loading || saving}
              className="rounded-xl bg-red-600 px-5 py-2.5 font-bold text-white hover:bg-red-700 disabled:opacity-50"
            >
              {saving ? 'Saving Draft...' : '✓ Accept & Save to MongoDB'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
