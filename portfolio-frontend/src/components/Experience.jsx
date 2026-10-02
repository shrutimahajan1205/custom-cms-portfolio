import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

export default function Experience({ experience = [] }) {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-sky-400 tracking-wider uppercase bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
            Career Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            Professional Experience
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Track record of driving architectural initiatives, mentoring teams, and delivering mission-critical software.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-slate-800 ml-4 sm:ml-8 space-y-10">
          {experience.map((exp, idx) => (
            <div key={exp.id || idx} className="relative pl-6 sm:pl-8 group">
              {/* Bullet Node */}
              <div className="absolute -left-2.5 top-1.5 w-5 h-5 rounded-full bg-slate-900 border-2 border-sky-500 group-hover:scale-125 transition duration-300" />

              <div className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-base font-bold text-white">{exp.role}</h3>
                    <p className="text-xs font-semibold text-sky-400 mt-0.5">{exp.company}</p>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" /> {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" /> {exp.location}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
                  {exp.description}
                </p>

                {/* Tech Pills */}
                {exp.technologies && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {(Array.isArray(exp.technologies) ? exp.technologies : []).map((t, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
