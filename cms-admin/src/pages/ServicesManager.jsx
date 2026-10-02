import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, CheckCircle2, Loader2 } from 'lucide-react';
import { api } from '../services/api';

export default function ServicesManager() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: '', description: '', icon: 'Layers',
    deliverables: 'Architecture, Clean Code, Unit Tests', pricing: 'From $1,500', order: 0,
  });

  useEffect(() => { loadServices(); }, []);

  const loadServices = async () => {
    try {
      const data = await api.getServices();
      setServices(data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleOpenAdd = () => {
    setEditingService(null);
    setForm({
      title: '', description: '', icon: 'Layers',
      deliverables: 'Responsive Design, API Integration, Production Deployment',
      pricing: 'From $2,000', order: services.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s) => {
    setEditingService(s);
    setForm({
      title: s.title, description: s.description, icon: s.icon || 'Layers',
      deliverables: Array.isArray(s.deliverables) ? s.deliverables.join(', ') : (s.deliverables || ''),
      pricing: s.pricing || '', order: s.order || 0,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service offering?')) return;
    try {
      await api.deleteService(id);
      setServices(services.filter((s) => s.id !== id));
    } catch (err) { alert(err.message || 'Failed to delete'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      deliverables: form.deliverables.split(',').map((d) => d.trim()).filter(Boolean),
    };
    try {
      if (editingService) {
        const res = await api.updateService(editingService.id, payload);
        setServices(services.map((s) => (s.id === editingService.id ? res.data : s)));
      } else {
        const res = await api.createService(payload);
        setServices([...services, res.data]);
      }
      setIsModalOpen(false);
    } catch (err) { alert(err.message || 'Failed to save'); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Service Offerings</h2>
          <p className="text-xs text-slate-400 mt-0.5">Engineering consultancy, custom builds, and development packages</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-semibold rounded-lg transition shadow-lg shadow-sky-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {loading ? (
        <div className="text-xs text-slate-400 py-8 flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Loading services...</div>
      ) : services.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/40 rounded-xl border border-slate-800 text-xs text-slate-500">
          No services defined yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((svc) => (
            <div key={svc.id} className="bg-slate-900/70 border border-slate-800 hover:border-slate-700 rounded-xl p-5 flex flex-col justify-between transition group">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    {svc.pricing && (
                      <span className="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
                        {svc.pricing}
                      </span>
                    )}
                    <h3 className="font-bold text-sm text-slate-100 mt-2">{svc.title}</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleOpenEdit(svc)} className="p-1.5 text-slate-400 hover:text-sky-400 rounded transition"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDelete(svc.id)} className="p-1.5 text-slate-400 hover:text-rose-400 rounded transition"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                <p className="text-xs text-slate-300 mt-2">{svc.description}</p>
                <div className="mt-4 space-y-1.5">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Deliverables:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {(Array.isArray(svc.deliverables) ? svc.deliverables : []).map((d, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-sky-400 flex-shrink-0" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-white">{editingService ? 'Edit Service' : 'Add Service Offering'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-200 transition"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Service Title</label>
                <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                <textarea rows={3} required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Deliverables (comma separated)</label>
                <input type="text" value={form.deliverables} onChange={(e) => setForm({ ...form, deliverables: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Pricing Tag</label>
                  <input type="text" value={form.pricing} onChange={(e) => setForm({ ...form, pricing: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Order</label>
                  <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100" />
                </div>
              </div>
              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs font-medium">Cancel</button>
                <button type="submit" disabled={saving} className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold rounded-lg text-xs disabled:opacity-50">{saving ? 'Saving...' : editingService ? 'Update Service' : 'Create Service'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
