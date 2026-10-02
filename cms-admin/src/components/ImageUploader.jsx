import React, { useState } from 'react';
import { UploadCloud, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../services/api';

export default function ImageUploader({ value, onChange, label = 'Cover / Preview Image' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(value || '');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError('');
    setUploading(true);

    try {
      const res = await api.uploadImage(file);
      const fullUrl = res.url.startsWith('http') ? res.url : `http://127.0.0.1:5000${res.url}`;
      setPreview(fullUrl);
      onChange(fullUrl);
    } catch (err) {
      setError(err.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setPreview(url);
    onChange(url);
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">{label}</label>
      
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="https://... or upload below"
          value={value || ''}
          onChange={handleUrlChange}
          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-500"
        />
        
        <label className="cursor-pointer flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-sky-400 text-xs font-medium rounded-lg border border-slate-700 transition">
          {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
          <span>Upload</span>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={uploading} />
        </label>
      </div>

      {error && (
        <p className="text-xs text-rose-400 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" /> {error}
        </p>
      )}

      {preview && (
        <div className="relative w-28 h-20 rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
}
