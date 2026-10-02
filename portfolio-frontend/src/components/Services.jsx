import React from 'react';
import { Layers, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Services({ services = [] }) {
  return (
    <section id="services" className="py-20 bg-slate-950/60 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-sky-400 tracking-wider uppercase bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
            What I Deliver
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            Services &amp; Solutions
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Tailored engineering capabilities for startups, growth-stage businesses, and enterprise teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="bg-slate-900/70 border border-slate-800 hover:border-sky-500/40 rounded-3xl p-7 flex flex-col justify-between transition group transform hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center group-hover:bg-sky-500/20 group-hover:scale-105 transition">
                    <Layers className="w-6 h-6" />
                  </div>
                  {svc.pricing && (
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                      {svc.pricing}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{svc.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  {svc.description}
                </p>

                <div className="space-y-2 border-t border-slate-800/80 pt-4">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Key Deliverables:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(Array.isArray(svc.deliverables) ? svc.deliverables : []).map((d, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 flex justify-end">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400 hover:text-sky-300 transition"
                >
                  <span>Request Proposal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
