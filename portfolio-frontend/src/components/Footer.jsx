import React from 'react';
import { ExternalLink, Terminal } from 'lucide-react';

export default function Footer({ about }) {
  return (
    <footer className="py-12 bg-slate-950 border-t border-slate-900 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">
            <Terminal className="w-4 h-4" />
          </div>
          <span>&copy; {new Date().getFullYear()} {about?.name || 'Alex Rivera'}. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#projects" className="hover:text-white transition">Projects</a>
          <a href="#blog" className="hover:text-white transition">Blog</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
          <a
            href="http://localhost:5174"
            target="_blank"
            rel="noreferrer"
            className="text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
          >
            <span>Custom CMS Admin</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
