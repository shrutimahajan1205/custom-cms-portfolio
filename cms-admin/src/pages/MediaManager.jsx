import React, { useEffect, useState } from 'react';
import { UploadCloud, Trash2, Copy, Check, Loader2, RefreshCw } from 'lucide-react';
import { api } from '../services/api';

export default function MediaManager() {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => { loadMedia(); }, []);

  const loadMedia = async () => {
    setLoading(true);
    try {
      const data = await api.getMedia();
      setMediaList(data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await api.uploadImage(file);
      setMediaList([res.media, ...mediaList]);
    } catch (err) {
      alert(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleCopyUrl = (item) => {
    const fullUrl = item.url.startsWith('http') ? item.url : "http://127.0.0.1:5000" + item.url;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this media asset?')) return;
    try {
      await api.deleteMedia(id);
      setMediaList(mediaList.filter((m) => m.id !== id));
    } catch (err) { alert(err.message || 'Failed to delete'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Media Library & Asset CDN</h2>
          <p className="text-xs text-slate-400 mt-0.5">Upload and manage static portfolio assets, banners, and screenshots</p>
        </div>
        <button onClick={loadMedia} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium rounded-lg border border-slate-800 transition">
          <RefreshCw className={"w-3.5 h-3.5 " + (loading ? "animate-spin" : "")} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="bg-slate-900/60 border-2 border-dashed border-slate-800 hover:border-sky-500/40 rounded-2xl p-8 text-center transition">
        <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mx-auto mb-3">
          {uploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <UploadCloud className="w-6 h-6" />}
        </div>
        <h3 className="text-sm font-semibold text-slate-200">Upload New Media File</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
          PNG, JPG, WEBP, SVG or GIF up to 16MB. Assets are stored in the local backend directory and served directly.
        </p>

        <label className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs rounded-lg cursor-pointer transition shadow-lg shadow-sky-500/20">
          <span>Select File from Computer</span>
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" disabled={uploading} />
        </label>
      </div>

      {loading ? (
        <div className="text-xs text-slate-400 py-8 flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Loading media library...</div>
      ) : mediaList.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/40 rounded-xl border border-slate-800 text-xs text-slate-500">
          No media uploaded yet. Use the upload box above.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {mediaList.map((m) => {
            const fullUrl = m.url.startsWith('http') ? m.url : "http://127.0.0.1:5000" + m.url;
            return (
              <div key={m.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group transition flex flex-col justify-between">
                <div className="h-32 bg-slate-950 flex items-center justify-center overflow-hidden relative">
                  <img src={fullUrl} alt={m.filename} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </div>
                <div className="p-3 space-y-2">
                  <p className="text-xs font-medium text-slate-200 truncate" title={m.filename}>{m.filename}</p>
                  <p className="text-[10px] text-slate-500">{(m.size / 1024).toFixed(1)} KB</p>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                    <button
                      onClick={() => handleCopyUrl(m)}
                      className="flex items-center gap-1 text-[11px] text-sky-400 hover:text-sky-300"
                    >
                      {copiedId === m.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === m.id ? 'Copied' : 'Copy URL'}</span>
                    </button>
                    <button
                      onClick={() => handleDelete(m.id)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                      title="Delete"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
