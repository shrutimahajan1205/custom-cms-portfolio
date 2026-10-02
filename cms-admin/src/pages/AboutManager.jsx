import React, { useEffect, useState } from 'react';
import { Save, CheckCircle, Loader2 } from 'lucide-react';
import { api } from '../services/api';
import ImageUploader from '../components/ImageUploader';

export default function AboutManager() {
  const [form, setForm] = useState({
    name: '', title: '', bio: '', avatar_url: '', resume_url: '',
    location: '', email: '', phone: '', github: '', linkedin: '',
    twitter: '', website: '', years_experience: 3, projects_completed: 20,
    satisfied_clients: 15,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => { loadAbout(); }, []);

  const loadAbout = async () => {
    try {
      const data = await api.getAbout();
      if (data) setForm(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setToast('');
    try {
      await api.updateAbout(form);
      setToast('About profile saved successfully!');
      setTimeout(() => setToast(''), 4000);
    } catch (err) {
      alert(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-xs text-slate-400 p-8 flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Loading profile...</div>;
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">About & Profile Settings</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage personal bio, titles, social accounts, and metrics</p>
        </div>

        {toast && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{toast}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900/70 border border-slate-800 rounded-xl p-6 space-y-6">
        <div>
          <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-3">Core Identity</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={form.name || ''}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Professional Title</label>
              <input
                type="text"
                value={form.title || ''}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Professional Bio</label>
          <textarea
            rows={4}
            value={form.bio || ''}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            required
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-100 focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-800/80">
          <ImageUploader
            label="Profile Avatar Image"
            value={form.avatar_url || ''}
            onChange={(url) => setForm({ ...form, avatar_url: url })}
          />
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Resume Link</label>
            <input
              type="text"
              value={form.resume_url || ''}
              onChange={(e) => setForm({ ...form, resume_url: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-sky-500"
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800/80">
          <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-3">Key Metrics</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Years Experience</label>
              <input
                type="number"
                value={form.years_experience}
                onChange={(e) => setForm({ ...form, years_experience: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Projects Built</label>
              <input
                type="number"
                value={form.projects_completed}
                onChange={(e) => setForm({ ...form, projects_completed: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Happy Clients</label>
              <input
                type="number"
                value={form.satisfied_clients}
                onChange={(e) => setForm({ ...form, satisfied_clients: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800/80">
          <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-3">Contact & Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Email</label>
              <input
                type="email"
                value={form.email || ''}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Location</label>
              <input
                type="text"
                value={form.location || ''}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">GitHub URL</label>
              <input
                type="text"
                value={form.github || ''}
                onChange={(e) => setForm({ ...form, github: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">LinkedIn URL</label>
              <input
                type="text"
                value={form.linkedin || ''}
                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold rounded-lg text-sm transition shadow-lg shadow-sky-500/20 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
}
