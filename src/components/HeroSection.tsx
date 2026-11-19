import { useState, useEffect } from "react";
import { ArrowRight, ShoppingBag, UserCheck, Sparkles } from "lucide-react";
import { IMAGES } from "../data/siteData";
import { useLanguage } from "../i18n/LanguageContext";
import { ImageWithFallback } from "./ImageWithFallback";

interface HeroSectionProps {
  onGetStarted: () => void;
  onExploreCourses: () => void;
  onOpenShop: () => void;
  onOpenPortal: () => void;
  onOpenAi: () => void;
}

export function HeroSection({
  onGetStarted,
  onExploreCourses,
  onOpenShop,
  onOpenPortal,
  onOpenAi,
}: HeroSectionProps) {
  const { t } = useLanguage();
  const [portraitIndex, setPortraitIndex] = useState(0);

  const portraits = [
    { src: IMAGES.founderOne, label: t.hero.studioView },
    { src: IMAGES.founderTwo, label: t.hero.deskView },
  ];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPortraitIndex((prev) => (prev + 1) % 2);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative bg-[#F4F6F9] dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-28 pb-20 px-6 sm:px-8 lg:px-12 border-b border-slate-200 dark:border-slate-800 arch-grid-bg transition-colors"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Architectural Proposition */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 sm:p-12 flex flex-col justify-between transition-colors">
            <div>
              <p className="font-mono text-xs font-medium tracking-wider uppercase text-[#2563EB] dark:text-blue-400 mb-5">
                {t.hero.eyebrow}
              </p>

              <h1 className="font-display text-5xl sm:text-7xl lg:text-[78px] leading-[0.98] font-extrabold tracking-tight text-slate-950 dark:text-white mb-6">
                fabu<span className="text-[#2563EB] dark:text-blue-400">001</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mb-8">
                {t.hero.lead}
              </p>
            </div>

            <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={onGetStarted}
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-7 py-3.5 rounded-lg font-bold text-xs tracking-wide transition-colors inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>{t.hero.startProject}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onExploreCourses}
                  className="border border-slate-300 dark:border-slate-700 hover:border-slate-900 dark:hover:border-slate-500 text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white px-7 py-3.5 rounded-lg font-bold text-xs tracking-wide transition-colors cursor-pointer bg-white dark:bg-slate-950 whitespace-nowrap shrink-0"
                >
                  {t.hero.exploreCourses}
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <button
                  type="button"
                  onClick={onOpenShop}
                  className="inline-flex items-center gap-1.5 hover:text-[#2563EB] dark:hover:text-blue-400 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{t.hero.digitalShop}</span>
                </button>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">/</span>
                <button
                  type="button"
                  onClick={onOpenPortal}
                  className="inline-flex items-center gap-1.5 hover:text-[#2563EB] dark:hover:text-blue-400 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{t.hero.clientPortal}</span>
                </button>
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">/</span>
                <button
                  type="button"
                  onClick={onOpenAi}
                  className="inline-flex items-center gap-1.5 text-[#2563EB] dark:text-blue-400 hover:underline transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.ai.openAssistant}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right High-Contrast Studio Portrait Frame */}
          <div className="lg:col-span-5 bg-[#0B1120] text-white rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between">
            <div className="relative flex-1 min-h-[320px] bg-slate-900 overflow-hidden">
              <ImageWithFallback
                src={portraits[portraitIndex].src}
                alt={`fabu001 — ${portraits[portraitIndex].label}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/60 to-transparent" />
              <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#0B1120]/85 backdrop-blur-sm p-1 rounded-lg border border-slate-700/70">
                {portraits.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={p.label}
                    onClick={() => setPortraitIndex(idx)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                      portraitIndex === idx
                        ? "bg-[#2563EB] text-white"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-8 border-t border-slate-800">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue-400 mb-1.5">
                {t.hero.founderRole}
              </p>
              <h2 className="font-display text-2xl font-bold text-white mb-2">
                {t.hero.studioName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t.hero.quote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
