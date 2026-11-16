import { TECH_STACK } from "../data/siteData";
import { useLanguage } from "../i18n/LanguageContext";

export function TechStackSection() {
  const { t } = useLanguage();

  return (
    <section
      id="tech"
      className="py-20 bg-[#F4F6F9] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-[#2563EB] dark:text-blue-400 mb-1.5">
              {t.tech.eyebrow}
            </p>
            <h2 className="font-display text-3xl font-bold text-slate-950 dark:text-white tracking-tight">
              {t.tech.title}
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md">
            {t.tech.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {TECH_STACK.map((tech) => (
            <div
              key={tech.name}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#2563EB]/40 rounded-xl p-4 flex items-center gap-3 transition-colors group"
            >
              <span className="w-9 h-9 rounded-lg bg-[#F4F6F9] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center font-mono text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:bg-[#2563EB] group-hover:text-white group-hover:border-[#2563EB] transition-colors shrink-0">
                {tech.mark}
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-slate-950 dark:group-hover:text-white truncate transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
