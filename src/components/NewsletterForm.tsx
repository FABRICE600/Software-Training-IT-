import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const STORAGE_KEY = "fabu001_newsletter_emails";

function getStoredEmails(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function NewsletterForm() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "subscribed">("idle");
  const [feedback, setFeedback] = useState("");
  const [subscribedEmail, setSubscribedEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const normalized = email.trim().toLowerCase();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);

    if (!normalized) {
      setStatus("error");
      setFeedback(t.footer.newsletterEmptyErr);
      return;
    }

    if (!isValidEmail) {
      setStatus("error");
      setFeedback(t.footer.newsletterInvalidErr);
      return;
    }

    const existing = getStoredEmails();
    if (!existing.includes(normalized)) {
      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify([...existing, normalized])
        );
      } catch {
        // Ignore storage quota errors cleanly
      }
      setFeedback(t.footer.newsletterSuccess);
    } else {
      setFeedback(t.footer.newsletterDuplicate);
    }

    setSubscribedEmail(normalized);
    setEmail("");
    setStatus("subscribed");
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 sm:p-6">
      <div className="mb-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] font-semibold text-blue-400 mb-1">
          {t.footer.newsletterEyebrow}
        </p>
        <h3 className="font-display text-base font-bold text-white">
          {t.footer.newsletterTitle}
        </h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          {t.footer.newsletterDesc}
        </p>
      </div>

      {status === "subscribed" ? (
        <div className="bg-slate-950/70 border border-emerald-500/30 rounded-lg p-3.5 space-y-2 animate-fade-in">
          <div className="flex items-start gap-2.5 text-emerald-400">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <p className="font-semibold text-white">{feedback}</p>
              <p className="font-mono text-slate-400 mt-0.5 break-all">
                {subscribedEmail}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setFeedback("");
            }}
            className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
          >
            {t.footer.subscribeAnother}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-2.5">
          <div className="flex flex-col sm:flex-row gap-2">
            <label htmlFor="footer-newsletter-email" className="sr-only">
              {t.footer.newsletterTitle}
            </label>
            <input
              id="footer-newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") {
                  setStatus("idle");
                  setFeedback("");
                }
              }}
              placeholder={t.footer.newsletterPlaceholder}
              aria-invalid={status === "error"}
              className="flex-1 min-w-0 px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 outline-none focus:border-[#2563EB] transition-colors"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold tracking-wide transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>{t.footer.subscribe}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {status === "error" && (
            <p
              role="alert"
              className="flex items-center gap-1.5 text-xs text-red-400 font-medium"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{feedback}</span>
            </p>
          )}
        </form>
      )}
    </div>
  );
}
