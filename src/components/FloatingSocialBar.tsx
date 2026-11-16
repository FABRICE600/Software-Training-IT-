import { Linkedin, Github, Twitter } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const SOCIAL_LINKS = [
  {
    id: "linkedin",
    name: "LinkedIn",
    href: "https://linkedin.com/in/fabu001",
    icon: Linkedin,
  },
  {
    id: "github",
    name: "GitHub",
    href: "https://github.com/fabu001",
    icon: Github,
  },
  {
    id: "twitter",
    name: "Twitter",
    href: "https://x.com/fabu001",
    icon: Twitter,
  },
] as const;

export function FloatingSocialBar() {
  const { lang } = useLanguage();

  return (
    <aside
      aria-label={lang === "rw" ? "Imbuga nkoranyambaga" : "Social media links"}
      className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-30 flex-col gap-1 p-1.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm"
    >
      {SOCIAL_LINKS.map((item) => {
        const Icon = item.icon;
        const label =
          lang === "rw"
            ? `Kurikira fabu001 kuri ${item.name}`
            : `Follow fabu001 on ${item.name}`;

        return (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="group relative w-10 h-10 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-[#2563EB] dark:hover:text-blue-400 hover:bg-[#F4F6F9] dark:hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] transition-colors"
          >
            <Icon className="w-4 h-4" aria-hidden="true" />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-[calc(100%+10px)] px-2.5 py-1 rounded-md bg-[#0B1120] dark:bg-slate-800 text-white text-[11px] font-mono font-medium whitespace-nowrap shadow-md opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 transition-all duration-150"
            >
              {item.name}
            </span>
          </a>
        );
      })}
    </aside>
  );
}
