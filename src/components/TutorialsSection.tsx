import { useState } from "react";
import { Play, Clock, CheckCircle2, X, ArrowRight } from "lucide-react";
import {
  TUTORIALS,
  TUTORIAL_CATEGORIES,
  type TutorialItem,
} from "../data/siteData";
import { useLanguage } from "../i18n/LanguageContext";
import { ImageWithFallback } from "./ImageWithFallback";

interface TutorialsSectionProps {
  onAskQuestion: (topic: string) => void;
}

export function TutorialsSection({ onAskQuestion }: TutorialsSectionProps) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeTutorial, setActiveTutorial] = useState<TutorialItem | null>(null);
  const [completedChapters, setCompletedChapters] = useState<Record<string, boolean>>({});

  const visibleTutorials =
    activeCategory === "All"
      ? TUTORIALS
      : TUTORIALS.filter((item) => item.category === activeCategory);

  const toggleChapter = (tutorialId: number, idx: number) => {
    const key = `${tutorialId}-${idx}`;
    setCompletedChapters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section
      id="tutorials"
      className="py-24 bg-[#F4F6F9] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-[#2563EB] dark:text-blue-400 mb-2">
              {t.tutorials.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white tracking-tight">
              {t.tutorials.title}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            {TUTORIAL_CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isSelected
                      ? "bg-[#2563EB] text-white"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {category === "All" ? t.tutorials.allCategory : category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleTutorials.map((tutorial) => (
            <button
              key={tutorial.id}
              type="button"
              onClick={() => setActiveTutorial(tutorial)}
              className="text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#2563EB]/40 rounded-2xl overflow-hidden transition-colors group cursor-pointer flex flex-col"
            >
              <div className="aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800 relative">
                <ImageWithFallback
                  src={tutorial.thumbnail}
                  alt={tutorial.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/15 to-transparent flex items-center justify-center">
                  <div className="w-11 h-11 rounded-lg bg-white/95 text-slate-950 flex items-center justify-center shadow-lg group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1 w-full">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono mb-2">
                  <span className="font-semibold text-[#2563EB] dark:text-blue-400">{tutorial.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1 tabular-nums">
                    <Clock className="w-3 h-3" />
                    {tutorial.duration}
                  </span>
                </div>

                <h3 className="font-display font-bold text-slate-950 dark:text-white text-lg mb-2 leading-snug group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors">
                  {tutorial.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
                  {tutorial.description}
                </p>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors">
                  <span>{t.tutorials.openGuide}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Tutorial Walkthrough Modal */}
      {activeTutorial && (
        <div
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setActiveTutorial(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-2xl w-full overflow-hidden shadow-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video w-full bg-slate-900 relative overflow-hidden">
              <ImageWithFallback
                src={activeTutorial.thumbnail}
                alt={activeTutorial.title}
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <button
                type="button"
                aria-label="Close guide"
                onClick={() => setActiveTutorial(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-100 hover:text-slate-950 dark:hover:text-white flex items-center justify-center shadow-sm cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-5 left-6 right-6 text-white">
                <p className="text-xs font-mono text-blue-300 mb-1 tabular-nums">
                  {activeTutorial.category} · {activeTutorial.duration}
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-bold leading-snug">
                  {activeTutorial.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeTutorial.description}
              </p>

              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 mb-3">
                  {t.tutorials.checklistTitle}
                </h4>
                <div className="space-y-2">
                  {activeTutorial.chapters.map((chapter, idx) => {
                    const checked = Boolean(completedChapters[`${activeTutorial.id}-${idx}`]);
                    return (
                      <button
                        key={chapter}
                        type="button"
                        onClick={() => toggleChapter(activeTutorial.id, idx)}
                        className={`w-full flex items-center gap-3 p-3.5 rounded-lg border text-left transition-colors cursor-pointer ${
                          checked
                            ? "bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                            : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-[#2563EB]/40"
                        }`}
                      >
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 ${
                            checked ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 dark:text-slate-500"
                          }`}
                        />
                        <span className="text-xs sm:text-sm font-medium">
                          {idx + 1}. {chapter}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const title = activeTutorial.title;
                    setActiveTutorial(null);
                    onAskQuestion(`Question about guide: ${title}`);
                  }}
                  className="flex-1 py-3 px-4 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold tracking-wide transition-colors cursor-pointer"
                >
                  {t.tutorials.askTeam}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTutorial(null)}
                  className="py-3 px-5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white text-xs font-semibold cursor-pointer"
                >
                  {t.tutorials.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
