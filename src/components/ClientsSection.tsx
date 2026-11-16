import { PARTNER_ORGS } from "../data/siteData";
import { useLanguage } from "../i18n/LanguageContext";

function OrgEmblem({ id, monogram }: { id: string; monogram: string }) {
  return (
    <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 group-hover:border-[#2563EB]/40 transition-colors">
      <svg
        width="24"
        height="24"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
        className="text-slate-700 dark:text-slate-300 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors"
      >
        {id === "techstart" && (
          <>
            <rect x="3" y="3" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="1.6" />
            <path d="M9 17L14 9L19 17H9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </>
        )}
        {id === "dione" && (
          <>
            <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.6" />
            <path d="M10 14C10 11.8 11.8 10 14 10C16.2 10 18 11.8 18 14C18 16.2 16.2 18 14 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </>
        )}
        {id === "kigali-hub" && (
          <>
            <polygon points="14,3 24,9 24,19 14,25 4,19 4,9" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="14" cy="14" r="3" fill="currentColor" />
          </>
        )}
        {id === "ict-chamber" && (
          <>
            <rect x="4" y="6" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <path d="M10 23H18M14 20V23" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </>
        )}
        {id === "ur" && (
          <>
            <path d="M4 10L14 5L24 10L14 15L4 10Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M8 13V19C8 20.5 10.7 22 14 22C17.3 22 20 20.5 20 19V13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </>
        )}
        {id === "bnr" && (
          <>
            <path d="M4 10H24L14 4L4 10Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M7 13V20M14 13V20M21 13V20M4 22H24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </>
        )}
      </svg>
      <span className="sr-only">{monogram}</span>
    </div>
  );
}

export function ClientsSection() {
  const { t } = useLanguage();

  return (
    <section
      id="clients"
      className="py-16 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-[#2563EB] dark:text-blue-400 mb-1.5">
              {t.clients.eyebrow}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white tracking-tight">
              {t.clients.title}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm">
            {t.clients.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950">
          {PARTNER_ORGS.map((org) => (
            <div
              key={org.id}
              className="p-5 flex flex-col items-start justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-900/70 transition-colors group"
            >
              <OrgEmblem id={org.id} monogram={org.monogram} />
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors leading-snug">
                  {org.name}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{org.sector}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
