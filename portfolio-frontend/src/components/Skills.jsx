import React, { useState } from 'react';
import { Layers, Code2, Database, Box, Terminal, Sparkles } from 'lucide-react';

export default function Skills({ skills = [] }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps'];

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter((s) => s.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-sky-400 tracking-wider uppercase bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
            Technical Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            Core Competencies &amp; Tools
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            A comprehensive overview of languages, frameworks, cloud infra, and tools I use on a daily basis.
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={
                "px-4 py-2 rounded-xl text-xs font-semibold transition " +
                (activeCategory === cat
                  ? "bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20"
                  : "bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700")
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="bg-slate-900/60 border border-slate-800 hover:border-sky-500/30 rounded-2xl p-5 transition group transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-sky-400">
                  {skill.category}
                </span>
                <span className="text-xs font-bold text-slate-200">{skill.proficiency}%</span>
              </div>

              <h3 className="font-bold text-sm text-white mb-3 group-hover:text-sky-300 transition">
                {skill.name}
              </h3>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full transition-all duration-700"
                  style={{ width: skill.proficiency + "%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
