import React, { useState } from 'react';
import { Clock, Eye, ArrowRight, X, Calendar } from 'lucide-react';

export default function Blog({ blogs = [] }) {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const publishedBlogs = blogs.filter((b) => b.published !== false);

  return (
    <section id="blog" className="py-20 bg-slate-950/60 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-sky-400 tracking-wider uppercase bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
            Insights &amp; Articles
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            Engineering Publications
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Deep-dives into headless architecture, database performance, and distributed backend design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedBlogs.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedArticle(post)}
              className="bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 rounded-3xl overflow-hidden flex flex-col justify-between cursor-pointer group transition duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="h-44 w-full bg-slate-950 overflow-hidden relative">
                  <img
                    src={post.cover_image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80'}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute bottom-2 left-3 flex gap-2">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur text-slate-300 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" /> {post.read_time || '5 min read'}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-base text-white group-hover:text-sky-300 transition line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {post.created_at ? new Date(post.created_at).toLocaleDateString() : 'Recent'}
                </span>
                <span className="text-xs font-semibold text-sky-400 group-hover:translate-x-1 transition flex items-center gap-1">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-56 rounded-2xl overflow-hidden mb-6 bg-slate-950">
              <img
                src={selectedArticle.cover_image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80'}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400 mb-3 font-mono">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {selectedArticle.created_at ? new Date(selectedArticle.created_at).toLocaleDateString() : 'Published'}</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {selectedArticle.read_time}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white">{selectedArticle.title}</h3>

            <div className="mt-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
              {selectedArticle.content || selectedArticle.excerpt}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
