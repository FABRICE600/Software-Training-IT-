import { ArrowUp, Github, Linkedin, Twitter } from "lucide-react";
import { NewsletterForm } from "./NewsletterForm";
import { useLanguage } from "../i18n/LanguageContext";

interface FooterProps {
  onScrollToTop: () => void;
  onNavigate: (id: string) => void;
}

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/fabu001", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/fabu001", icon: Linkedin },
  { label: "X / Twitter", href: "https://x.com/fabu001", icon: Twitter },
];

export function Footer({ onScrollToTop, onNavigate }: FooterProps) {
  const { lang, t } = useLanguage();
  const year = new Date().getFullYear();

  const navLinks = [
    { id: "about", label: t.nav.about },
    { id: "services", label: t.nav.services },
    { id: "projects", label: t.nav.projects },
    { id: "training", label: t.nav.training },
    { id: "contact", label: lang === "rw" ? "Vugana Natwe" : "Contact" },
  ];

  return (
    <footer className="bg-[#0B1120] dark:bg-slate-950 text-slate-300 pt-16 pb-10 px-6 border-t border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pb-12 border-b border-slate-800">
          <div className="lg:col-span-5 text-center lg:text-left">
            <p className="font-display text-2xl font-extrabold text-white tracking-tight mb-2">
              fabu<span className="text-[#2563EB]">001</span>
            </p>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md leading-relaxed mx-auto lg:mx-0 mb-6">
              {t.footer.bio}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs font-medium text-slate-400 mb-6">
              {navLinks.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.id);
                  }}
                  className="hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-2.5">
              {SOCIALS.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 bg-slate-900 border border-slate-800 hover:border-[#2563EB] hover:text-blue-400 rounded-lg flex items-center justify-center text-slate-400 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7">
            <NewsletterForm />
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {year} fabu001. {t.footer.rights}</p>
          <p className="font-mono">{t.footer.location}</p>
          <button
            type="button"
            onClick={onScrollToTop}
            aria-label={lang === "rw" ? "Subira hejuru" : "Scroll to top"}
            className="p-2.5 bg-slate-900 border border-slate-800 hover:border-[#2563EB] text-slate-400 hover:text-blue-400 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
