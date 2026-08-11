'use client';

/**
 * ============================================================================
 * ADMIN SEO DASHBOARD & AUTOMATION (app/admin/seo/page.tsx) — Phase 7
 * ============================================================================
 * Student Note:
 * Human-in-the-loop SEO management control center.
 * Displays diagnostic SEO Health Scores, automated audit warnings, AI SEO draft
 * assistant with editable recommendations, Search Console / Analytics status,
 * and operation logs.
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { runFullSeoAudit, generateAiSeoSuggestions, SeoAuditWarning, SeoLogItem } from '@/lib/seo';

export default function AdminSeoDashboardPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [auditData, setAuditData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'pages' | 'warnings' | 'suggestions' | 'logs'>('overview');
  
  // AI Assistant Modal State
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [editedDescription, setEditedDescription] = useState<string>('');
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [actionNotice, setActionNotice] = useState<string>('');

  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    async function loadSeoData() {
      setLoading(true);
      let loadedProjects: any[] = [];
      try {
        const res = await fetch(`${backendUrl}/api/projects`, { cache: 'no-store' });
        if (res.ok) {
          loadedProjects = await res.json();
        }
      } catch (err) {
        console.warn('Backend API offline, loading fallback repos for SEO audit:', err);
      }

      // If backend was empty or offline, fetch fallback repos from GitHub API
      if (!Array.isArray(loadedProjects) || loadedProjects.length === 0) {
        try {
          const ghRes = await fetch('https://api.github.com/users/bzwaqar/repos?sort=updated&per_page=100');
          if (ghRes.ok) {
            const rawRepos = await ghRes.json();
            loadedProjects = rawRepos
              .filter((r: any) => !r.fork && r.name.toLowerCase() !== 'portfolio')
              .map((r: any) => ({
                github_id: r.id,
                name: r.name,
                title: r.name,
                slug: r.name.toLowerCase(),
                short_description: r.description,
                description: r.description,
                topics: r.topics || [],
                languages: [r.language || 'Python'],
                published: true,
                image: { url: `/images/projects/${r.name.toLowerCase()}.webp`, alt: `${r.name} visual` },
              }));
          }
        } catch (e) {
          console.warn('GitHub API fallback failed during SEO audit:', e);
        }
      }

      setProjects(loadedProjects);
      const audit = runFullSeoAudit(loadedProjects);
      setAuditData(audit);
      setLoading(false);
    }

    loadSeoData();
  }, [backendUrl]);

  // Open AI Assistant Modal for a project
  const handleOpenAiAssistant = (project: any) => {
    setSelectedProject(project);
    const suggestions = generateAiSeoSuggestions(project);
    setAiSuggestions(suggestions);
    setEditedTitle(suggestions.suggestedTitle);
    setEditedDescription(suggestions.suggestedDescription);
    setIsAiModalOpen(true);
  };

  // Approve AI suggestion
  const handleApproveSuggestion = () => {
    if (!selectedProject || !auditData) return;
    
    const newLogItem: SeoLogItem = {
      id: `log-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      target: selectedProject.title || selectedProject.name || selectedProject.slug,
      issue: 'AI SEO Assistant Title & Meta Description Optimization',
      suggestion: `Applied title: "${editedTitle}"`,
      status: 'Approved',
    };

    setAuditData({
      ...auditData,
      logs: [newLogItem, ...auditData.logs],
    });

    setActionNotice(`✓ Approved & Applied SEO Metadata for '${selectedProject.title || selectedProject.name}'!`);
    setIsAiModalOpen(false);
    setTimeout(() => setActionNotice(''), 4000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      
      {/* Header section */}
      <div className="space-y-4 border-b border-gray-200 pb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 border border-red-200">
              Phase 7 SEO Automation
            </span>
            <span className="text-xs text-gray-400">Human-in-the-Loop Control Center</span>
          </div>
          
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            SEO Dashboard & Automation System
          </h1>
          <p className="text-base text-gray-500 max-w-2xl">
            Automated SEO health scoring, audit warnings, broken link detection, AI draft suggestions, and search console placeholders.
          </p>
        </div>

        <div className="flex space-x-3">
          <Link
            href="/admin/projects"
            className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            ← Project Manager
          </Link>
          <Link
            href="/sitemap.xml"
            target="_blank"
            className="inline-flex items-center rounded-xl bg-red-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-red-700 transition-colors shadow-sm"
          >
            View Sitemap ↗
          </Link>
        </div>
      </div>

      {actionNotice && (
        <div className="rounded-xl bg-green-50 p-4 text-xs font-semibold text-green-700 border border-green-200 shadow-sm animate-fade-in">
          {actionNotice}
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="py-20 text-center text-gray-400 space-y-3">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
          <p className="text-xs font-medium">Running diagnostic SEO audit across pages & repositories...</p>
        </div>
      ) : auditData && (
        <>
          {/* Quick Metric Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            
            <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-2 shadow-sm">
              <span className="text-xs text-gray-400 font-semibold uppercase">Total Tracked Pages</span>
              <div className="text-3xl font-extrabold text-gray-900">{auditData.totalPages}</div>
              <p className="text-xs text-gray-500">Static routes & project pages</p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-2 shadow-sm">
              <span className="text-xs text-gray-400 font-semibold uppercase">Indexed Pages</span>
              <div className="text-3xl font-extrabold text-green-600">{auditData.indexedPages}</div>
              <p className="text-xs text-green-700">Publicly indexable by crawlers</p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-2 shadow-sm">
              <span className="text-xs text-gray-400 font-semibold uppercase">SEO Health Score</span>
              <div className="text-3xl font-extrabold text-red-600">{auditData.avgHealth} / 100</div>
              <p className="text-xs text-red-600 font-medium">Diagnostic site rating</p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-2 shadow-sm">
              <span className="text-xs text-gray-400 font-semibold uppercase">Audit Warnings</span>
              <div className="text-3xl font-extrabold text-amber-600">{auditData.warnings.length}</div>
              <p className="text-xs text-amber-700">Actionable improvements</p>
            </div>

          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 flex space-x-4">
            {[
              { id: 'overview', label: '📊 Overview & Integrations' },
              { id: 'pages', label: '📄 SEO Health Scores' },
              { id: 'warnings', label: `⚠️ Audit Warnings (${auditData.warnings.length})` },
              { id: 'suggestions', label: '🔗 Link Suggestions' },
              { id: 'logs', label: '📜 Automation Log' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 text-xs font-bold transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Overview & Integrations */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Google Search Console Status */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                      <span>🔍</span> Google Search Console
                    </h3>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-semibold text-gray-600 border border-gray-200">
                      Search Console not connected
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Search Console API integration placeholder prepared. Once verification credentials are configured in your environment variable (<code className="text-red-600 bg-gray-50 px-1 rounded">NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION</code>), impressions, clicks, CTR, and search queries will appear here automatically.
                  </p>
                  <div className="pt-2 text-[11px] text-gray-400 font-mono">
                    Status: Environment variable ready
                  </div>
                </div>

                {/* Google Analytics 4 Status */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                      <span>📈</span> Google Analytics (GA4)
                    </h3>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-semibold text-gray-600 border border-gray-200">
                      Analytics not connected
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    GA4 analytics telemetry placeholder prepared. To start tracking real-time user visitors and traffic flows, define <code className="text-red-600 bg-gray-50 px-1 rounded">NEXT_PUBLIC_GA_MEASUREMENT_ID</code> in <code className="text-gray-700 bg-gray-50 px-1 rounded">.env.local</code>.
                  </p>
                  <div className="pt-2 text-[11px] text-gray-400 font-mono">
                    Status: Tracking ID pending configuration
                  </div>
                </div>

              </div>

              {/* Quick AI Assistant Banner */}
              <div className="rounded-2xl border border-red-200 bg-red-50/50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-gray-900">🤖 AI SEO Draft Assistant</h4>
                  <p className="text-xs text-gray-600">
                    Generate optimized titles, descriptions, and keywords for any project with 1-click human approval.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('pages')}
                  className="rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700 transition-colors shrink-0 shadow-sm"
                >
                  Select Project to Optimize →
                </button>
              </div>

            </div>
          )}

          {/* Tab 2: SEO Health Scores Table */}
          {activeTab === 'pages' && (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3.5">Page Route</th>
                    <th className="px-6 py-3.5">SEO Health Score</th>
                    <th className="px-6 py-3.5">Title Check</th>
                    <th className="px-6 py-3.5">Meta Description</th>
                    <th className="px-6 py-3.5">Image Alt</th>
                    <th className="px-6 py-3.5">Indexability</th>
                    <th className="px-6 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-600">
                  {auditData.healthScores.map((item: any, idx: number) => {
                    const h = item.health;
                    const origProject = projects.find((p) => `/projects/${p.slug || p.name}` === item.page || p.slug === item.page);

                    return (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-mono font-medium text-gray-900">
                          {item.page}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
                            h.score >= 80 ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                            {h.score} / 100
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {h.titleOk ? (
                            <span className="text-green-600 font-bold">✓ Valid</span>
                          ) : (
                            <span className="text-amber-600 font-bold">⚠️ Warning</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {h.descriptionOk ? (
                            <span className="text-green-600 font-bold">✓ Valid</span>
                          ) : (
                            <span className="text-amber-600 font-bold">⚠️ Warning</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {h.imageAltOk ? (
                            <span className="text-green-600 font-bold">✓ Valid</span>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {h.isIndexable ? (
                            <span className="rounded bg-green-50 px-2 py-0.5 text-[10px] text-green-700 font-bold">Indexable</span>
                          ) : (
                            <span className="rounded bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500 font-bold">NoIndex</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {origProject ? (
                            <button
                              onClick={() => handleOpenAiAssistant(origProject)}
                              className="rounded-lg bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-100 transition-colors border border-red-200"
                            >
                              AI Optimize 🤖
                            </button>
                          ) : (
                            <span className="text-gray-400">Core Page</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Tab 3: Audit Warnings */}
          {activeTab === 'warnings' && (
            <div className="space-y-4">
              {auditData.warnings.length === 0 ? (
                <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
                  🎉 Excellent! No diagnostic SEO audit warnings detected.
                </div>
              ) : (
                auditData.warnings.map((w: SeoAuditWarning) => (
                  <div key={w.id} className="rounded-2xl border border-gray-200 bg-white p-6 space-y-2 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase ${
                          w.severity === 'critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {w.severity}
                        </span>
                        <span className="text-xs font-mono text-gray-400">{w.pageUrl}</span>
                      </div>
                      <h4 className="text-sm font-bold text-gray-900">{w.title}</h4>
                      <p className="text-xs text-gray-500">{w.message}</p>
                      <p className="text-xs text-red-600 font-medium">Suggestion: {w.suggestion}</p>
                    </div>

                    <Link
                      href="/admin/projects"
                      className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors shrink-0 text-center"
                    >
                      Resolve Issue →
                    </Link>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 4: Internal Link Suggestions */}
          {activeTab === 'suggestions' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-4 shadow-sm">
                <h3 className="text-base font-bold text-gray-900">Contextual Internal Link Opportunities</h3>
                <p className="text-xs text-gray-500">
                  The SEO engine analyzes published repository topics and suggests contextual cross-links to improve crawlability and topical authority.
                </p>

                <div className="divide-y divide-gray-200">
                  {auditData.internalLinkSuggestions.map((s: any, idx: number) => (
                    <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                      <div>
                        <span className="font-bold text-gray-900">{s.sourceTitle}</span>
                        <span className="text-gray-400 mx-2">→</span>
                        <span className="font-bold text-red-600">{s.targetTitle}</span>
                        <span className="ml-3 rounded bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600">
                          Matched Topic: #{s.topicMatch}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-gray-500 bg-gray-50 px-2.5 py-1 rounded border border-gray-200">
                        {s.anchorTextSuggestion}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Automation Operations Log */}
          {activeTab === 'logs' && (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3.5">Date</th>
                    <th className="px-6 py-3.5">Target Component / Page</th>
                    <th className="px-6 py-3.5">Detected Operation / Issue</th>
                    <th className="px-6 py-3.5">Actionable Suggestion</th>
                    <th className="px-6 py-3.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-600">
                  {auditData.logs.map((log: SeoLogItem) => (
                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-gray-400">{log.date}</td>
                      <td className="px-6 py-4 font-bold text-gray-900">{log.target}</td>
                      <td className="px-6 py-4">{log.issue}</td>
                      <td className="px-6 py-4 text-gray-500">{log.suggestion}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold ${
                          log.status === 'Approved' || log.status === 'Applied'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </>
      )}

      {/* AI SEO Assistant Modal */}
      {isAiModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 space-y-6 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  🤖 AI SEO Assistant: {selectedProject.title || selectedProject.name}
                </h3>
                <p className="text-xs text-gray-500">
                  Human-in-the-loop review. Edit suggestions below before approving.
                </p>
              </div>
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Suggested SEO Title</label>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs text-gray-900 focus:border-red-500 focus:outline-none"
                />
                <span className="text-[10px] text-gray-400 mt-1 block">Length: {editedTitle.length} characters</span>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Suggested Meta Description</label>
                <textarea
                  rows={3}
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3.5 py-2 text-xs text-gray-900 focus:border-red-500 focus:outline-none"
                />
                <span className="text-[10px] text-gray-400 mt-1 block">Length: {editedDescription.length} characters</span>
              </div>

              {aiSuggestions && aiSuggestions.contentTips && (
                <div className="rounded-xl bg-gray-50 p-4 border border-gray-200 space-y-2">
                  <span className="font-bold text-gray-900">Content Improvement Tips:</span>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {aiSuggestions.contentTips.map((tip: string, idx: number) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                Reject / Cancel
              </button>
              <button
                onClick={handleApproveSuggestion}
                className="rounded-xl bg-red-600 px-5 py-2 text-xs font-bold text-white hover:bg-red-700"
              >
                Approve & Apply Metadata ✓
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
