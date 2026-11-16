import { useState, useMemo } from "react";
import { ArrowRight, X, User, Calendar, Clock } from "lucide-react";
import { BLOG_POSTS, type BlogPost } from "../data/siteData";
import { useLanguage } from "../i18n/LanguageContext";
import { ImageWithFallback } from "./ImageWithFallback";

const WORDS_PER_MINUTE = 200;

export function calculateReadingStats(
  post: Pick<BlogPost, "title" | "excerpt" | "body">
): { wordCount: number; minutes: number } {
  const fullText = [post.title, post.excerpt, ...post.body].join(" ").trim();
  const wordCount = fullText ? fullText.split(/\s+/).filter(Boolean).length : 0;
  const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
  return { wordCount, minutes };
}

interface BlogSectionProps {
  selectedPostId?: number | null;
  onSelectPostId?: (id: number | null) => void;
}

export function BlogSection({
  selectedPostId,
  onSelectPostId,
}: BlogSectionProps) {
  const { t } = useLanguage();
  const [internalPostId, setInternalPostId] = useState<number | null>(null);

  const postsWithStats = useMemo(
    () =>
      BLOG_POSTS.map((post) => ({
        post,
        stats: calculateReadingStats(post),
      })),
    []
  );

  const activePostId =
    selectedPostId !== undefined ? selectedPostId : internalPostId;
  const setActivePostId = (id: number | null) => {
    if (onSelectPostId) {
      onSelectPostId(id);
    } else {
      setInternalPostId(id);
    }
  };

  const selectedEntry =
    postsWithStats.find((entry) => entry.post.id === activePostId) ?? null;

  return (
    <section
      id="blog"
      className="py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-[#2563EB] dark:text-blue-400 mb-2">
              {t.blog.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white tracking-tight">
              {t.blog.title}
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md">
            {t.blog.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {postsWithStats.map(({ post, stats }) => (
            <button
              key={post.id}
              type="button"
              onClick={() => setActivePostId(post.id)}
              className="text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#2563EB]/50 rounded-2xl overflow-hidden transition-colors group cursor-pointer flex flex-col"
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
              </div>

              <div className="p-6 flex flex-col flex-1 w-full">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono mb-2.5">
                  <span className="font-semibold text-[#2563EB] dark:text-blue-400">
                    {post.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{post.date}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1 tabular-nums">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    {t.blog.minRead(stats.minutes)}
                  </span>
                </div>

                <h3 className="font-display font-bold text-slate-950 dark:text-white text-lg mb-2 leading-snug group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="text-slate-500 dark:text-slate-400 inline-flex items-center gap-1.5 font-medium">
                    <User className="w-3.5 h-3.5" aria-hidden="true" />
                    {post.author}
                  </span>
                  <span className="font-bold text-slate-500 dark:text-slate-400 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 inline-flex items-center gap-1 transition-colors">
                    {t.blog.readArticle}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedEntry && (
        <div
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setActivePostId(null)}
        >
          <article
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border-b border-slate-200 dark:border-slate-800">
              <ImageWithFallback
                src={selectedEntry.post.image}
                alt={selectedEntry.post.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                aria-label="Close article"
                onClick={() => setActivePostId(null)}
                className="absolute top-4 right-4 p-2 bg-white/95 dark:bg-slate-900/95 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-[#2563EB] dark:text-blue-400">
                  {selectedEntry.post.category}
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3 h-3" aria-hidden="true" />
                  {selectedEntry.post.date}
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 tabular-nums">
                  <Clock className="w-3 h-3" aria-hidden="true" />
                  {t.blog.minRead(selectedEntry.stats.minutes)}
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">
                  {t.blog.wordsCount(selectedEntry.stats.wordCount)}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white leading-snug">
                {selectedEntry.post.title}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 pb-3 border-b border-slate-200 dark:border-slate-800 font-mono">
                {t.blog.by} {selectedEntry.post.author}
              </p>

              <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedEntry.post.body.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-[#F4F6F9] dark:bg-slate-950 flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => setActivePostId(null)}
                className="px-5 py-2.5 rounded-lg bg-[#0B1120] dark:bg-[#2563EB] hover:bg-slate-800 dark:hover:bg-[#1D4ED8] text-white text-xs font-bold cursor-pointer"
              >
                {t.blog.closeArticle}
              </button>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
