import { useState, useEffect, type FormEvent } from "react";
import { X, Mail, Check, AlertCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";
import { useToast } from "./SuccessToast";
import {
  subscribeNewsletterEmail,
  getStoredNewsletterEmails,
} from "./NewsletterForm";

const EXIT_INTENT_SESSION_KEY = "fabu001_exit_newsletter_session_shown";

function hasShownExitIntentThisSession(): boolean {
  try {
    return window.localStorage.getItem(EXIT_INTENT_SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function markExitIntentShown(): void {
  try {
    window.localStorage.setItem(EXIT_INTENT_SESSION_KEY, "true");
  } catch {
    // Ignore storage quota errors cleanly
  }
}

export function ExitIntentNewsletterModal() {
  const { t } = useLanguage();
  const { showSuccessToast } = useToast();
  const shouldReduceMotion = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Skip attaching listeners if already shown in this session or user already subscribed
    if (
      hasShownExitIntentThisSession() ||
      getStoredNewsletterEmails().length > 0
    ) {
      return;
    }

    let ready = false;
    const dwellTimer = window.setTimeout(() => {
      ready = true;
    }, 3000);

    const handleMouseLeave = (e: MouseEvent) => {
      if (!ready) return;
      if (hasShownExitIntentThisSession()) return;
      if (getStoredNewsletterEmails().length > 0) return;

      // Trigger when pointer exits through the top browser chrome
      if (e.clientY <= 12 && !e.relatedTarget) {
        markExitIntentShown();
        setOpen(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.clearTimeout(dwellTimer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const handleClose = () => {
    markExitIntentShown();
    setOpen(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = subscribeNewsletterEmail(email);

    if (result.status === "empty") {
      setError(t.footer.newsletterEmptyErr);
      return;
    }

    if (result.status === "invalid") {
      setError(t.footer.newsletterInvalidErr);
      return;
    }

    markExitIntentShown();
    setError("");
    setEmail("");
    setOpen(false);

    if (result.status === "subscribed") {
      showSuccessToast(t.toast.newsletterTitle, t.footer.newsletterSuccess);
    } else {
      showSuccessToast(
        t.toast.newsletterDuplicateTitle,
        t.footer.newsletterDuplicate
      );
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-newsletter-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={
              shouldReduceMotion ? false : { opacity: 0, scale: 0.96, y: 10 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96, y: 8 }
            }
            transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close newsletter modal"
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-5">
              <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-[#2563EB] dark:text-blue-400 flex items-center justify-center mb-4">
                <Mail className="w-5 h-5" aria-hidden="true" />
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-[#2563EB] dark:text-blue-400 mb-1.5">
                {t.exitModal.eyebrow}
              </p>
              <h3
                id="exit-newsletter-title"
                className="font-display text-2xl font-bold text-slate-950 dark:text-white tracking-tight leading-snug mb-2"
              >
                {t.exitModal.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.exitModal.desc}
              </p>
            </div>

            <ul className="space-y-2 mb-6 bg-[#F4F6F9] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
              {t.exitModal.perks.map((perk) => (
                <li
                  key={perk}
                  className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300"
                >
                  <Check
                    className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>

            <form onSubmit={handleSubmit} noValidate className="space-y-3">
              <div>
                <label htmlFor="exit-intent-email" className="sr-only">
                  {t.exitModal.emailPlaceholder}
                </label>
                <input
                  id="exit-intent-email"
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder={t.exitModal.emailPlaceholder}
                  aria-invalid={Boolean(error)}
                  className="w-full px-3.5 py-3 rounded-lg bg-[#F4F6F9] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-[#2563EB] focus:bg-white dark:focus:bg-slate-950 transition-colors"
                />
              </div>

              {error && (
                <p
                  role="alert"
                  className="flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{error}</span>
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.exitModal.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <button
              type="button"
              onClick={handleClose}
              className="w-full mt-3 py-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer text-center"
            >
              {t.exitModal.dismiss}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
