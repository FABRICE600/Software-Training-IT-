import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, ArrowRight } from "lucide-react";
import { TESTIMONIALS } from "../data/siteData";
import { useLanguage } from "../i18n/LanguageContext";

interface TestimonialsSectionProps {
  onPartnerClick: () => void;
}

export function TestimonialsSection({ onPartnerClick }: TestimonialsSectionProps) {
  const { t } = useLanguage();
  const [pageIndex, setPageIndex] = useState(0);
  const totalPages = Math.ceil(TESTIMONIALS.length / 2);

  const visibleItems = TESTIMONIALS.slice(pageIndex * 2, pageIndex * 2 + 2);

  const handlePrev = () =>
    setPageIndex((prev) => (prev - 1 + totalPages) % totalPages);
  const handleNext = () =>
    setPageIndex((prev) => (prev + 1) % totalPages);

  return (
    <section
      id="testimonials"
      className="py-24 bg-[#0B1120] dark:bg-slate-950 border-b border-slate-800 text-slate-100 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-blue-400 mb-2">
              {t.testimonials.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {t.testimonials.title}
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            {t.testimonials.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {visibleItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900/70 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#2563EB] mb-5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-8">
                  “{item.quote}”
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-5 border-t border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-[#2563EB]/15 border border-[#2563EB]/30 text-blue-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  {item.initials}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{item.name}</h3>
                  <p className="text-xs text-slate-400">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination & Partnership CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous testimonials"
              onClick={handlePrev}
              className="w-10 h-10 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Show testimonial page ${idx + 1}`}
                  onClick={() => setPageIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    pageIndex === idx
                      ? "w-6 bg-[#2563EB]"
                      : "w-2 bg-slate-700 hover:bg-slate-500"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next testimonials"
              onClick={handleNext}
              className="w-10 h-10 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={onPartnerClick}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold tracking-wide transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>{t.testimonials.cta}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
