import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Star, Loader2 } from 'lucide-react';
import { api } from '../services/api';
import ImageUploader from '../components/ImageUploader';

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    client_name: '', company: '', position: '', quote: '',
    avatar_url: '', rating: 5, order: 0,
  });

  useEffect(() => { loadTestimonials(); }, []);

  const loadTestimonials = async () => {
    try {
      const data = await api.getTestimonials();
      setTestimonials(data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleOpenAdd = () => {
    setEditingTest(null);
    setForm({
      client_name: '', company: '', position: '', quote: '',
      avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      rating: 5, order: testimonials.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t) => {
    setEditingTest(t);
    setForm({
      client_name: t.client_name, company: t.company || '', position: t.position || '',
      quote: t.quote, avatar_url: t.avatar_url || '', rating: t.rating || 5, order: t.order || 0,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this client testimonial?')) return;
    try {
      await api.deleteTestimonial(id);
      setTestimonials(testimonials.filter((t) => t.id !== id));
    } catch (err) { alert(err.message || 'Failed to delete'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingTest) {
        const res = await api.updateTestimonial(editingTest.id, form);
        setTestimonials(testimonials.map((t) => (t.id === editingTest.id ? res.data : t)));
      } else {
        const res = await api.createTestimonial(form);
        setTestimonials([...testimonials, res.data]);
      }
      setIsModalOpen(false);
    } catch (err) { alert(err.message || 'Failed to save'); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Client Testimonials</h2>
          <p className="text-xs text-slate-400 mt-0.5">Client endorsements and reviews</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-semibold rounded-lg transition shadow-lg shadow-sky-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {loading ? (
        <div className="text-xs text-slate-400 py-8 flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Loading testimonials...</div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/40 rounded-xl border border-slate-800 text-xs text-slate-500">
          No testimonials added yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-slate-900/70 border border-slate-800 hover:border-slate-700 rounded-xl p-5 flex flex-col justify-between transition group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleOpenEdit(t)} className="p-1 text-slate-400 hover:text-sky-400 transition"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDelete(t.id)} className="p-1 text-slate-400 hover:text-rose-400 transition"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                <p className="text-xs text-slate-300 italic line-clamp-4">&quot;{t.quote}&quot;</p>
              </div>
              <div className="flex items-center gap-3 pt-4 mt-4 border-t border-slate-800/80">
                <img src={t.avatar_url || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80'} alt={t.client_name} className="w-9 h-9 rounded-full object-cover border border-slate-700" />
                <div>
                  <h4 className="font-semibold text-xs text-slate-100">{t.client_name}</h4>
                  <p className="text-[10px] text-slate-400">{t.position} {t.company ? "at " + t.company : ""}</p>
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
              <h3 className="text-base font-bold text-white">{editingTest ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-200 transition"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Client Name</label>
                <input type="text" required value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Role</label>
                  <input type="text" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Company</label>
                  <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Quote</label>
                <textarea rows={3} required value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100" />
              </div>
              <ImageUploader label="Avatar Image" value={form.avatar_url} onChange={(url) => setForm({ ...form, avatar_url: url })} />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Rating</label>
                  <select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100">
                    {[5, 4, 3, 2, 1].map((r) => (<option key={r} value={r}>{r} Stars</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Order</label>
                  <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100" />
                </div>
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs font-medium">Cancel</button>
                <button type="submit" disabled={saving} className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold rounded-lg text-xs disabled:opacity-50">{saving ? 'Saving...' : editingTest ? 'Update Testimonial' : 'Create Testimonial'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
