import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Eye, Loader2, Clock } from 'lucide-react';
import { api } from '../services/api';
import ImageUploader from '../components/ImageUploader';

export default function BlogsManager() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: '', slug: '', excerpt: '', content: '',
    cover_image: '', tags: '', read_time: '5 min read', published: true,
  });

  useEffect(() => { loadBlogs(); }, []);

  const loadBlogs = async () => {
    try {
      const data = await api.getBlogs();
      setBlogs(data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleOpenAdd = () => {
    setEditingBlog(null);
    setForm({
      title: '', slug: '', excerpt: '', content: '',
      cover_image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80',
      tags: 'Python, React, CMS', read_time: '5 min read', published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (b) => {
    setEditingBlog(b);
    setForm({
      title: b.title, slug: b.slug, excerpt: b.excerpt || '',
      content: b.content || '', cover_image: b.cover_image || '',
      tags: Array.isArray(b.tags) ? b.tags.join(', ') : (b.tags || ''),
      read_time: b.read_time || '5 min read', published: Boolean(b.published),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this article?')) return;
    try {
      await api.deleteBlog(id);
      setBlogs(blogs.filter((b) => b.id !== id));
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
      if (editingBlog) {
        const res = await api.updateBlog(editingBlog.id, payload);
        setBlogs(blogs.map((b) => (b.id === editingBlog.id ? res.data : b)));
      } else {
        const res = await api.createBlog(payload);
        setBlogs([res.data, ...blogs]);
      }
      setIsModalOpen(false);
    } catch (err) { alert(err.message || 'Failed to save'); }
    finally { setSaving(false); }
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    if (!editingBlog) {
      const generatedSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      setForm((prev) => ({ ...prev, title, slug: generatedSlug }));
    } else {
      setForm((prev) => ({ ...prev, title }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Articles & Blog Posts</h2>
          <p className="text-xs text-slate-400 mt-0.5">Author technical publications and tutorials</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-semibold rounded-lg transition shadow-lg shadow-sky-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Write Article</span>
        </button>
      </div>

      {loading ? (
        <div className="text-xs text-slate-400 py-8 flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Loading blogs...</div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/40 rounded-xl border border-slate-800 text-xs text-slate-500">
          No articles written yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-xl overflow-hidden flex flex-col group transition">
              <div className="h-40 w-full bg-slate-950 overflow-hidden relative">
                <img src={blog.cover_image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80'} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute bottom-2 left-2 flex gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur text-slate-300 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {blog.read_time}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur text-slate-300 flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {blog.views || 0}
                  </span>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={
                      "text-[10px] font-semibold px-2 py-0.5 rounded-full " +
                      (blog.published ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-slate-800 text-slate-400")
                    }>
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">/{blog.slug}</span>
                  </div>
                  <h3 className="font-semibold text-sm text-slate-100 line-clamp-2 mt-1">{blog.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{blog.excerpt}</p>
                </div>
                <div className="pt-3 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">{blog.created_at ? new Date(blog.created_at).toLocaleDateString() : 'Recent'}</span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleOpenEdit(blog)} className="p-1.5 text-slate-400 hover:text-sky-400 rounded transition"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDelete(blog.id)} className="p-1.5 text-slate-400 hover:text-rose-400 rounded transition"><Trash2 className="w-3.5 h-3.5" /></button>
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
              <h3 className="text-base font-bold text-white">{editingBlog ? 'Edit Article' : 'Write New Article'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-200 transition"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Article Title</label>
                <input type="text" required value={form.title} onChange={handleTitleChange} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-sky-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Slug</label>
                  <input type="text" required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Read Time</label>
                  <input type="text" value={form.read_time} onChange={(e) => setForm({ ...form, read_time: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Excerpt</label>
                <textarea rows={2} required value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Content (Markdown/Text)</label>
                <textarea rows={6} required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 font-mono text-xs" />
              </div>
              <ImageUploader label="Cover Image" value={form.cover_image} onChange={(url) => setForm({ ...form, cover_image: url })} />
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tags (comma separated)</label>
                <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="pub_chk" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="w-4 h-4 rounded text-sky-500 bg-slate-950 border-slate-800" />
                <label htmlFor="pub_chk" className="text-xs text-slate-300 cursor-pointer">Publish immediately to portfolio</label>
              </div>
              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs font-medium">Cancel</button>
                <button type="submit" disabled={saving} className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold rounded-lg text-xs disabled:opacity-50">{saving ? 'Saving...' : editingBlog ? 'Update Article' : 'Publish Article'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
