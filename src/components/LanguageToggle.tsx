import { Globe } from "lucide-react";
import { useLanguage, type Language } from "../i18n/LanguageContext";

const OPTIONS: { code: Language; label: string; name: string }[] = [
  { code: "en", label: "EN", name: "English" },
  { code: "rw", label: "RW", name: "Kinyarwanda" },
];

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language switcher"
      className="inline-flex items-center gap-0.5 p-0.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shrink-0"
    >
      <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 ml-1.5 mr-0.5 hidden xl:block shrink-0" aria-hidden="true" />
      {OPTIONS.map((option) => {
        const active = lang === option.code;
        return (
          <button
            key={option.code}
            type="button"
            onClick={() => setLang(option.code)}
            aria-pressed={active}
            aria-label={`Switch language to ${option.name}`}
            className={`px-2 py-1 rounded-md text-[11px] font-mono font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              active
                ? "bg-[#0B1120] dark:bg-[#2563EB] text-white"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
