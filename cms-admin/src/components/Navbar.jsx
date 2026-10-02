import React from 'react';
import { ExternalLink, LogOut } from 'lucide-react';
import { getCurrentUser } from '../services/api';

export default function Navbar({ onLogout }) {
  const user = getCurrentUser();

  return (
    <header className="h-16 bg-slate-900/90 backdrop-blur border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          API Connected
        </span>
        <span className="hidden sm:inline text-xs text-slate-400">
          Python Flask REST Backend &bull; SQLite Schema
        </span>
      </div>

      <div className="flex items-center gap-4">
        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-sky-400 transition bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-sky-500/40"
        >
          <span>Live Portfolio</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
          <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs border border-sky-500/30">
            {user?.username ? user.username.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-semibold text-slate-200">{user?.username || 'Admin'}</p>
            <p className="text-[10px] text-slate-400">{user?.email || 'admin@example.com'}</p>
          </div>
          
          <button
            onClick={onLogout}
            title="Log Out"
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition ml-1"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
