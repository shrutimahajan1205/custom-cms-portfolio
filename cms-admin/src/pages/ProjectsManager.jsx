import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, ExternalLink, Code2, Loader2, Star } from 'lucide-react';
import { api } from '../services/api';
import ImageUploader from '../components/ImageUploader';

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: '', description: '', content: '', tags: '',
    image_url: '', demo_url: '', github_url: '', featured: false, order: 0,
  });

  useEffect(() => { loadProjects(); }, []);

  const loadProjects = async () => {
    try {
      const data = await api.getProjects();
      setProjects(data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleOpenAdd = () => {
    setEditingProject(null);
    setForm({
      title: '', description: '', content: '',
      tags: 'React, Node.js, TailwindCSS',
      image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
      demo_url: 'https://example.com', github_url: 'https://github.com',
      featured: false, order: projects.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditingProject(p);
    setForm({
      title: p.title, description: p.description, content: p.content || '',
      tags: Array.isArray(p.tags) ? p.tags.join(', ') : (p.tags || ''),
      image_url: p.image_url || '', demo_url: p.demo_url || '',
      github_url: p.github_url || '', featured: Boolean(p.featured), order: p.order || 0,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await api.deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err) { alert(err.message || 'Failed to delete'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };
    try {
      if (editingProject) {
        const res = await api.updateProject(editingProject.id, payload);
        setProjects(projects.map((p) => (p.id === editingProject.id ? res.data : p)));
      } else {
        const res = await api.createProject(payload);
        setProjects([res.data, ...projects]);
      }
      setIsModalOpen(false);
    } catch (err) { alert(err.message || 'Failed to save'); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Portfolio Projects</h2>
          <p className="text-xs text-slate-400 mt-0.5">Showcase completed applications, architecture, and live links</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-semibold rounded-lg transition shadow-lg shadow-sky-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {loading ? (
        <div className="text-xs text-slate-400 py-8 flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/40 rounded-xl border border-slate-800 text-xs text-slate-500">
          No projects found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden flex flex-col group transition"
            >
              <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                <img
                  src={proj.image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80'}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                {proj.featured && (
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/90 text-slate-950 flex items-center gap-1 shadow">
                      <Star className="w-3 h-3 fill-current" /> Featured
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-sm text-slate-100 line-clamp-1">{proj.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{proj.description}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {(Array.isArray(proj.tags) ? proj.tags : []).slice(0, 4).map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {proj.demo_url && (
                      <a href={proj.demo_url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-sky-400 text-xs flex items-center gap-1">
                        <ExternalLink className="w-3.5 h-3.5" /> Demo
                      </a>
                    )}
                    {proj.github_url && (
                      <a href={proj.github_url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-200 text-xs flex items-center gap-1">
                        <Code2 className="w-3.5 h-3.5" /> Code
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleOpenEdit(proj)} className="p-1.5 text-slate-400 hover:text-sky-400 rounded-lg transition"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDelete(proj.id)} className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg transition"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-white">{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-200 transition"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. OmniSync"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Case Study (Markdown/HTML)</label>
                <textarea
                  rows={4}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 font-mono text-xs focus:outline-none focus:border-sky-500"
                />
              </div>

              <ImageUploader label="Cover Image" value={form.image_url} onChange={(url) => setForm({ ...form, image_url: url })} />

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="React, Python, Flask, Redis"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Demo URL</label>
                  <input
                    type="text"
                    value={form.demo_url}
                    onChange={(e) => setForm({ ...form, demo_url: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={form.github_url}
                    onChange={(e) => setForm({ ...form, github_url: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-sky-500 bg-slate-950 border-slate-800 focus:ring-0"
                  />
                  <span>Mark as Featured</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Order:</span>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                    className="w-16 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-100 text-center"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs font-medium">Cancel</button>
                <button type="submit" disabled={saving} className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold rounded-lg text-xs disabled:opacity-50">
                  {saving ? 'Saving...' : editingProject ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
