import React, { useState } from 'react';
import { ExternalLink, Code2, Star, X, ArrowUpRight } from 'lucide-react';

export default function Projects({ projects = [] }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Featured'];

  const filteredProjects = activeFilter === 'Featured'
    ? projects.filter((p) => p.featured)
    : projects;

  return (
    <section id="projects" className="py-20 bg-slate-950/40 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-sky-400 tracking-wider uppercase bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
              Work &amp; Case Studies
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
              Featured Portfolio Projects
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Applications, systems architecture, and live projects deployed in production.
            </p>
          </div>

          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={
                  "px-3.5 py-1.5 rounded-lg text-xs font-semibold transition " +
                  (activeFilter === f
                    ? "bg-sky-500 text-slate-950"
                    : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white")
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-slate-900/70 border border-slate-800 hover:border-sky-500/40 rounded-2xl overflow-hidden flex flex-col group transition duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              {/* Image Banner */}
              <div
                onClick={() => setSelectedProject(proj)}
                className="relative h-48 w-full bg-slate-950 overflow-hidden cursor-pointer"
              >
                <img
                  src={proj.image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80'}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition" />
                
                {proj.featured && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 flex items-center gap-1 shadow">
                    <Star className="w-3 h-3 fill-current" /> Featured
                  </span>
                )}
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => setSelectedProject(proj)}
                    className="font-bold text-base text-white group-hover:text-sky-300 transition cursor-pointer"
                  >
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {(Array.isArray(proj.tags) ? proj.tags : []).map((t, i) => (
                      <span key={i} className="text-[10px] px-2.5 py-0.5 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/50">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer Links */}
                <div className="pt-4 mt-5 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
                  >
                    <span>Read Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-3">
                    {proj.demo_url && (
                      <a
                        href={proj.demo_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-white text-xs flex items-center gap-1 transition"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Demo
                      </a>
                    )}
                    {proj.github_url && (
                      <a
                        href={proj.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-white text-xs flex items-center gap-1 transition"
                      >
                        <Code2 className="w-3.5 h-3.5" /> Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-56 rounded-2xl overflow-hidden mb-6 bg-slate-950">
              <img
                src={selectedProject.image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80'}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-2 mb-2">
              {selectedProject.featured && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950">
                  Featured Project
                </span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white">{selectedProject.title}</h3>

            <div className="flex flex-wrap gap-1.5 my-3">
              {(Array.isArray(selectedProject.tags) ? selectedProject.tags : []).map((t, idx) => (
                <span key={idx} className="text-xs px-2.5 py-1 rounded bg-slate-800 text-sky-300 font-mono">
                  {t}
                </span>
              ))}
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mt-4">
              {selectedProject.description}
            </p>

            {selectedProject.content && (
              <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                {selectedProject.content}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-800">
              {selectedProject.demo_url && (
                <a
                  href={selectedProject.demo_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg text-xs transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Launch Live App</span>
                </a>
              )}
              {selectedProject.github_url && (
                <a
                  href={selectedProject.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg text-xs transition"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
