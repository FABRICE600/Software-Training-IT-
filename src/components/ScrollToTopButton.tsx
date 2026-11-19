import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export function ScrollToTopButton() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      const heroEl = document.getElementById("hero");
      const threshold = heroEl
        ? heroEl.offsetTop + heroEl.offsetHeight - 80
        : 560;
      setVisible(window.scrollY > threshold);
    };

    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const label = lang === "rw" ? "Subira hejuru" : "Back to top";

  return (
    <button
      type="button"
      onClick={handleScrollTop}
      aria-label={label}
      title={label}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed bottom-20 right-5 z-40 w-12 h-12 rounded-full bg-[#0B1120] dark:bg-[#2563EB] hover:bg-[#2563EB] dark:hover:bg-[#1D4ED8] text-white border border-slate-700 dark:border-blue-400/40 shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
        visible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-3 scale-90 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
}
