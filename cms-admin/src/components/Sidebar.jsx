import React from 'react';
import { 
  LayoutDashboard, User, Wrench, FolderGit2, BookOpen, 
  Briefcase, MessageSquareQuote, Layers, Mail, Image, Sparkles
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, unreadMessages = 0 }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'about', label: 'About Profile', icon: User },
    { id: 'skills', label: 'Skills', icon: Wrench },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'blogs', label: 'Blog Posts', icon: BookOpen },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'messages', label: 'Contact Inbox', icon: Mail, badge: unreadMessages },
    { id: 'media', label: 'Media Manager', icon: Image },
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col flex-shrink-0 min-h-screen">
      <div className="h-16 px-6 flex items-center gap-2 border-b border-slate-800">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-sky-500/20">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-slate-100 tracking-wide">Custom CMS</h1>
          <p className="text-[10px] text-sky-400 font-medium">Headless Admin Panel</p>
        </div>
      </div>

      <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
          Content Models
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={
                "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition " +
                (isActive
                  ? "bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900")
              }
            >
              <div className="flex items-center gap-3">
                <Icon className={"w-4 h-4 " + (isActive ? "text-sky-400" : "text-slate-400")} />
                <span>{item.label}</span>
              </div>
              {item.badge > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800/80 bg-slate-900/40 m-3 rounded-xl">
        <p className="text-[11px] font-medium text-slate-300">Custom Architecture</p>
        <p className="text-[10px] text-slate-500 mt-0.5">Zero third-party CMS lock-in. 100% custom-built Flask API + React UI.</p>
      </div>
    </aside>
  );
}
