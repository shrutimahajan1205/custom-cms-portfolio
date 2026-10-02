import React from 'react';
import { Star, MessageSquareQuote } from 'lucide-react';

export default function Testimonials({ testimonials = [] }) {
  return (
    <section id="testimonials" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-sky-400 tracking-wider uppercase bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
            Endorsements
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            What Clients &amp; Colleagues Say
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Feedback on execution quality, architectural decision-making, and communication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 flex flex-col justify-between transition group"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                  &quot;{t.quote}&quot;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-800/80">
                <img
                  src={t.avatar_url || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'}
                  alt={t.client_name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <h4 className="font-bold text-xs text-white">{t.client_name}</h4>
                  <p className="text-[10px] text-slate-400">
                    {t.position} {t.company ? ("at " + t.company) : ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
