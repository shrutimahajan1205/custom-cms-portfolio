import React from 'react';
import { User, MapPin, Mail, Phone, ExternalLink, Download } from 'lucide-react';

export default function About({ about }) {
  return (
    <section id="about" className="py-20 bg-slate-950/60 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-sky-400 tracking-wider uppercase bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            Passionate About Architecture &amp; Developer Experience
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Engineering scalable systems from database schema design to responsive client interfaces.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5 text-sm text-slate-300 leading-relaxed">
            <p>
              {about?.bio || 'Passionate software engineer with extensive experience designing and building high-performance web applications, scalable distributed APIs, and delightful user experiences.'}
            </p>
            <p className="text-slate-400">
              I specialize in decoupling complex monoliths into modular architectures. Whether developing custom headless content engines, orchestrating real-time state synchronization, or building snappy React user interfaces, I focus on measurable speed and maintainability.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span className="text-slate-300">{about?.location || 'San Francisco, CA'}</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span className="text-slate-300">{about?.email || 'alex.rivera.dev@gmail.com'}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              {about?.resume_url && about.resume_url !== '#' && (
                <a
                  href={about.resume_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Curriculum Vitae</span>
                </a>
              )}
              {about?.github && (
                <a
                  href={about.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium transition"
                >
                  <span>GitHub Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-sky-400">{about?.years_experience || 6}+</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">Years in Tech</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-indigo-400">{about?.projects_completed || 38}+</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">Completed Projects</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400">99.9%</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">Uptime &amp; Reliability</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-amber-400">{about?.satisfied_clients || 24}+</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">Happy Partners</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
