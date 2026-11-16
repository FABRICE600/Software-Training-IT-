import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";
import { NavbarSearch, type SearchResult } from "./NavbarSearch";

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onSelectSearchResult: (result: SearchResult) => void;
}

export function Navbar({
  activeSection,
  onNavigate,
  onSelectSearchResult,
}: NavbarProps) {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.001,
  });

  const navLinks = [
    { id: "about", label: t.nav.about },
    { id: "services", label: t.nav.services },
    { id: "projects", label: t.nav.projects },
    { id: "training", label: t.nav.training },
    { id: "pricing", label: t.nav.pricing },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs"
          : "bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm border-b border-slate-200/70 dark:border-slate-800/80"
      }`}
    >
      {/* Top-edge reading progress bar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-[3px] bg-slate-200/50 dark:bg-slate-800/80 overflow-hidden z-10"
      >
        <motion.div
          className="h-full w-full origin-left bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#38BDF8]"
          style={{ scaleX: shouldReduceMotion ? scrollYProgress : smoothProgress }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2.5 xl:gap-6">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("hero");
          }}
          className="font-display text-lg font-extrabold tracking-tight text-slate-950 dark:text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB]"
        >
          fabu<span className="text-[#2563EB]">001</span>
        </a>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-3.5 xl:gap-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.id);
                }}
                className={`text-xs font-semibold tracking-wide transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                  isActive
                    ? "text-[#2563EB] dark:text-blue-400 border-[#2563EB] dark:border-blue-400"
                    : "text-slate-600 dark:text-slate-300 border-transparent hover:text-slate-950 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Search bar + theme toggle + language toggle + primary action + mobile menu trigger */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <NavbarSearch
            onSelectResult={(result) => {
              setMobileOpen(false);
              onSelectSearchResult(result);
            }}
          />
          <ThemeToggle />
          <LanguageToggle />
          <button
            type="button"
            onClick={() => handleLinkClick("contact")}
            className="hidden sm:inline-flex items-center justify-center px-3.5 xl:px-5 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold tracking-wide transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t.nav.requestService}
          </button>
          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-6 py-5 space-y-3 animate-fade-in">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.id);
                  }}
                  className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#2563EB] dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/50"
                      : "text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => handleLinkClick("contact")}
              className="w-full py-3 px-4 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold tracking-wide transition-colors cursor-pointer"
            >
              {t.nav.requestService}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
