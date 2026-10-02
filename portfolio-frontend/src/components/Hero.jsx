import React from 'react';
import { ArrowRight, Download, Sparkles, FolderGit2, CheckCircle2 } from 'lucide-react';

export default function Hero({ about }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          {/* Left Text */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-sky-400 text-xs font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Available for New Projects & Architectural Roles</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Hi, I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400">{about?.name || 'Alex Rivera'}</span>
            </h1>

            <p className="text-lg sm:text-xl font-medium text-slate-300 max-w-2xl mx-auto lg:mx-0">
              {about?.title || 'Senior Full-Stack Engineer & Cloud Solutions Architect'}
            </p>

            <p className="text-sm text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {about?.bio || 'Building reliable, high-speed web platforms with custom headless architectures, resilient APIs, and sleek interfaces.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transform hover:-translate-y-0.5"
              >
                <span>View Portfolio Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold text-sm transition hover:border-slate-700"
              >
                <span>Get In Touch</span>
              </a>
            </div>

            {/* Micro stats banner */}
            <div className="grid grid-cols-3 gap-4 pt-6 max-w-lg mx-auto lg:mx-0 border-t border-slate-800/80">
              <div>
                <p className="text-2xl font-black text-white">{about?.years_experience || 6}+</p>
                <p className="text-xs text-slate-400 mt-0.5">Years Experience</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">{about?.projects_completed || 35}+</p>
                <p className="text-xs text-slate-400 mt-0.5">Projects Delivered</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">{about?.satisfied_clients || 20}+</p>
                <p className="text-xs text-slate-400 mt-0.5">Satisfied Clients</p>
              </div>
            </div>
          </div>

          {/* Right Avatar Card */}
          <div className="relative">
            <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-3xl p-2 bg-gradient-to-tr from-sky-500/40 via-indigo-500/20 to-transparent border border-white/10 shadow-2xl backdrop-blur-xl relative group">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-slate-950">
                <img
                  src={about?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
                  alt={about?.name || 'Developer'}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>

              {/* Floating Pill */}
              <div className="absolute -bottom-4 -left-4 bg-slate-900/95 border border-slate-800 rounded-xl p-3 shadow-xl flex items-center gap-3 backdrop-blur">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Full-Stack &amp; Custom CMS</p>
                  <p className="text-[10px] text-slate-400">Production Ready</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
