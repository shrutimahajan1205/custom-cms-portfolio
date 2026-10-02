import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Calendar, MapPin, Loader2 } from 'lucide-react';
import { api } from '../services/api';

export default function ExperienceManager() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    role: '', company: '', location: 'Remote', period: '2023 - Present',
    description: '', technologies: 'React, Python, AWS', is_current: false, order: 0,
  });

  useEffect(() => { loadExperience(); }, []);

  const loadExperience = async () => {
    try {
      const data = await api.getExperience();
      setExperiences(data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleOpenAdd = () => {
    setEditingExp(null);
    setForm({
      role: '', company: '', location: 'Remote', period: '2023 - Present',
      description: '', technologies: 'React, Python, AWS', is_current: false,
      order: experiences.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (exp) => {
    setEditingExp(exp);
    setForm({
      role: exp.role, company: exp.company, location: exp.location || 'Remote',
      period: exp.period, description: exp.description || '',
      technologies: Array.isArray(exp.technologies) ? exp.technologies.join(', ') : (exp.technologies || ''),
      is_current: Boolean(exp.is_current), order: exp.order || 0,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this career milestone?')) return;
    try {
      await api.deleteExperience(id);
      setExperiences(experiences.filter((e) => e.id !== id));
    } catch (err) { alert(err.message || 'Failed to delete'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      technologies: form.technologies.split(',').map((t) => t.trim()).filter(Boolean),
    };
    try {
      if (editingExp) {
        const res = await api.updateExperience(editingExp.id, payload);
        setExperiences(experiences.map((e) => (e.id === editingExp.id ? res.data : e)));
      } else {
        const res = await api.createExperience(payload);
        setExperiences([...experiences, res.data]);
      }
      setIsModalOpen(false);
    } catch (err) { alert(err.message || 'Failed to save'); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Work Experience & Timeline</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage career history, company roles, and milestones</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-semibold rounded-lg transition shadow-lg shadow-sky-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {loading ? (
        <div className="text-xs text-slate-400 py-8 flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Loading experience...</div>
      ) : experiences.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/40 rounded-xl border border-slate-800 text-xs text-slate-500">
          No experience records added yet.
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="bg-slate-900/70 border border-slate-800 hover:border-slate-700 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition group">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-100">{exp.role}</h3>
                  <span className="text-xs text-sky-400 font-semibold">&bull; {exp.company}</span>
                  {exp.is_current && (
                    <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">Current</span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {exp.period}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {exp.location}</span>
                </div>
                <p className="text-xs text-slate-300 mt-2">{exp.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {(Array.isArray(exp.technologies) ? exp.technologies : []).map((t, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => handleOpenEdit(exp)} className="p-2 text-slate-400 hover:text-sky-400 rounded-lg transition"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(exp.id)} className="p-2 text-slate-400 hover:text-rose-400 rounded-lg transition"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-white">{editingExp ? 'Edit Experience' : 'Add Experience Entry'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-200 transition"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Job Role</label>
                  <input type="text" required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Company</label>
                  <input type="text" required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Period</label>
                  <input type="text" value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
                  <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea rows={3} required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Technologies (comma separated)</label>
                <input type="text" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="curr_chk" checked={form.is_current} onChange={(e) => setForm({ ...form, is_current: e.target.checked })} className="w-4 h-4 rounded text-sky-500 bg-slate-950 border-slate-800" />
                <label htmlFor="curr_chk" className="text-xs text-slate-300 cursor-pointer">I currently work here</label>
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs font-medium">Cancel</button>
                <button type="submit" disabled={saving} className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold rounded-lg text-xs disabled:opacity-50">{saving ? 'Saving...' : editingExp ? 'Update Entry' : 'Create Entry'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
