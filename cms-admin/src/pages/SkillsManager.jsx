import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Loader2 } from 'lucide-react';
import { api } from '../services/api';

export default function SkillsManager() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [saving, setSaving] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');

  const [form, setForm] = useState({
    name: '', category: 'Frontend', proficiency: 85, icon: 'Code', order: 0,
  });

  const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools'];

  useEffect(() => { loadSkills(); }, []);

  const loadSkills = async () => {
    try {
      const data = await api.getSkills();
      setSkills(data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleOpenAdd = () => {
    setEditingSkill(null);
    setForm({ name: '', category: 'Frontend', proficiency: 85, icon: 'Code', order: skills.length + 1 });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (skill) => {
    setEditingSkill(skill);
    setForm({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      icon: skill.icon || 'Code',
      order: skill.order || 0,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      await api.deleteSkill(id);
      setSkills(skills.filter((s) => s.id !== id));
    } catch (err) { alert(err.message || 'Failed to delete'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingSkill) {
        const res = await api.updateSkill(editingSkill.id, form);
        setSkills(skills.map((s) => (s.id === editingSkill.id ? res.data : s)));
      } else {
        const res = await api.createSkill(form);
        setSkills([...skills, res.data]);
      }
      setIsModalOpen(false);
    } catch (err) { alert(err.message || 'Failed to save'); }
    finally { setSaving(false); }
  };

  const filteredSkills = filterCategory === 'All' 
    ? skills 
    : skills.filter((s) => s.category.toLowerCase() === filterCategory.toLowerCase());

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Skills & Tech Stack</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage languages, frameworks, cloud tooling, and ratings</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-semibold rounded-lg transition shadow-lg shadow-sky-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill</span>
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['All', ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={
              "px-3 py-1.5 rounded-lg text-xs font-medium transition " +
              (filterCategory === cat
                ? "bg-sky-500/10 text-sky-400 border border-sky-500/30"
                : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200")
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-xs text-slate-400 py-8 flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Loading skills...</div>
      ) : filteredSkills.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/40 rounded-xl border border-slate-800 text-xs text-slate-500">
          No skills found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="bg-slate-900/70 border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex flex-col justify-between group transition"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-md border border-sky-500/20">
                      {skill.category}
                    </span>
                    <h3 className="font-semibold text-sm text-slate-100 mt-2">{skill.name}</h3>
                  </div>
                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition">
                    <button onClick={() => handleOpenEdit(skill)} className="p-1 hover:text-sky-400 text-slate-500 transition"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDelete(skill.id)} className="p-1 hover:text-rose-400 text-slate-500 transition"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-slate-400">Proficiency</span>
                    <span className="text-slate-200 font-semibold">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-white">{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-200 transition"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Skill Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next.js, Docker, Python"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-sky-500"
                  >
                    {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Proficiency ({form.proficiency}%)</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={form.proficiency}
                    onChange={(e) => setForm({ ...form, proficiency: Number(e.target.value) })}
                    className="w-full accent-sky-500 mt-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Order</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs font-medium">Cancel</button>
                <button type="submit" disabled={saving} className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold rounded-lg text-xs disabled:opacity-50">
                  {saving ? 'Saving...' : editingSkill ? 'Update Skill' : 'Create Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
