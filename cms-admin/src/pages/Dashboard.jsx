import React, { useEffect, useState } from 'react';
import { 
  FolderGit2, Wrench, BookOpen, Layers, Briefcase, 
  MessageSquareQuote, Mail, ArrowUpRight, Plus, RefreshCw
} from 'lucide-react';
import { api } from '../services/api';

export default function Dashboard({ setActiveTab }) {
  const [stats, setStats] = useState(null);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsData, msgsData] = await Promise.all([
        api.getStats(),
        api.getMessages()
      ]);
      setStats(statsData);
      setRecentMessages((msgsData || []).slice(0, 3));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const statCards = [
    { title: 'Projects', count: stats?.total_projects ?? 0, icon: FolderGit2, tab: 'projects' },
    { title: 'Skills', count: stats?.total_skills ?? 0, icon: Wrench, tab: 'skills' },
    { title: 'Articles', count: stats?.total_blogs ?? 0, icon: BookOpen, tab: 'blogs' },
    { title: 'Services', count: stats?.total_services ?? 0, icon: Layers, tab: 'services' },
    { title: 'Experience', count: stats?.total_experience ?? 0, icon: Briefcase, tab: 'experience' },
    { title: 'Testimonials', count: stats?.total_testimonials ?? 0, icon: MessageSquareQuote, tab: 'testimonials' },
    { title: 'Inquiries', count: stats?.total_messages ?? 0, unread: stats?.unread_messages ?? 0, icon: Mail, tab: 'messages' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Overview & Content Hub</h2>
          <p className="text-xs text-slate-400 mt-0.5">Real-time status of your custom portfolio models</p>
        </div>

        <button
          onClick={loadData}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium rounded-lg border border-slate-800 transition"
        >
          <RefreshCw className={"w-3.5 h-3.5 " + (loading ? "animate-spin" : "")} />
          <span>Refresh Stats</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              onClick={() => setActiveTab(card.tab)}
              className="bg-slate-900/80 border border-slate-800/80 hover:border-sky-500/30 rounded-xl p-4 cursor-pointer transition transform hover:-translate-y-0.5 group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-sky-400 group-hover:bg-sky-500/10 group-hover:text-sky-300 transition">
                  <Icon className="w-4 h-4" />
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-sky-400 transition" />
              </div>
              <p className="text-xl font-bold text-white">{card.count}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-[11px] text-slate-400">{card.title}</span>
                {card.unread > 0 && (
                  <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.2 rounded-full font-bold">
                    {card.unread} new
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-400" />
              <span>Recent Contact Inquiries</span>
            </h3>
            <button
              onClick={() => setActiveTab('messages')}
              className="text-xs text-sky-400 hover:text-sky-300 transition font-medium"
            >
              View All &rarr;
            </button>
          </div>

          {recentMessages.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No messages received yet.</p>
          ) : (
            <div className="space-y-3">
              {recentMessages.map((m) => (
                <div
                  key={m.id}
                  className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-200">{m.name}</span>
                      <span className="text-[11px] text-slate-500">&lt;{m.email}&gt;</span>
                      {!m.is_read && (
                        <span className="px-1.5 py-0.2 bg-rose-500/20 text-rose-300 text-[10px] rounded-full font-semibold">
                          NEW
                        </span>
                      )}
                    </div>
                    <p className="font-medium text-slate-300">{m.subject}</p>
                    <p className="text-slate-400 line-clamp-1">{m.message}</p>
                  </div>
                  <span className="text-[10px] text-slate-500 whitespace-nowrap">
                    {m.created_at ? new Date(m.created_at).toLocaleDateString() : 'Recent'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white">Quick Shortcuts</h3>
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab('projects')}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-xs text-slate-200 transition"
            >
              <div className="flex items-center gap-2">
                <Plus className="w-3.5 h-3.5 text-sky-400" />
                <span>Add New Project</span>
              </div>
              <span className="text-slate-500">&rarr;</span>
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-xs text-slate-200 transition"
            >
              <div className="flex items-center gap-2">
                <Plus className="w-3.5 h-3.5 text-indigo-400" />
                <span>Manage Tech Stack</span>
              </div>
              <span className="text-slate-500">&rarr;</span>
            </button>
            <button
              onClick={() => setActiveTab('blogs')}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-xs text-slate-200 transition"
            >
              <div className="flex items-center gap-2">
                <Plus className="w-3.5 h-3.5 text-emerald-400" />
                <span>Create Blog Article</span>
              </div>
              <span className="text-slate-500">&rarr;</span>
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-xs text-slate-200 transition"
            >
              <div className="flex items-center gap-2">
                <Plus className="w-3.5 h-3.5 text-amber-400" />
                <span>Update Bio & Stats</span>
              </div>
              <span className="text-slate-500">&rarr;</span>
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1.5">
            <div className="flex items-center justify-between">
              <span>Database Engine:</span>
              <span className="text-slate-200 font-mono">SQLite (SQLAlchemy)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Auth Strategy:</span>
              <span className="text-slate-200 font-mono">JWT Bearer Token</span>
            </div>
            <div className="flex items-center justify-between">
              <span>File Storage:</span>
              <span className="text-slate-200 font-mono">/uploads/ static CDN</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
