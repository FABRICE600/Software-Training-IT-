import { useState, useEffect, type FormEvent } from "react";
import { Calendar, Mail, Phone, CheckCircle2, Send, MessageCircle, Sparkles, Loader2 } from "lucide-react";
import {
  buildWhatsAppUrl,
  STUDIO_PHONE_DISPLAY,
  STUDIO_PHONE_TEL,
} from "../data/siteData";
import { useLanguage } from "../i18n/LanguageContext";
import { useToast } from "./SuccessToast";
import { requestDraftBrief } from "../services/aiClient";

interface ContactSectionProps {
  prefillMessage: string;
}

export function ContactSection({ prefillMessage }: ContactSectionProps) {
  const { lang, t } = useLanguage();
  const { showSuccessToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [draftingBrief, setDraftingBrief] = useState(false);

  useEffect(() => {
    if (prefillMessage) {
      setFormData((prev) => ({ ...prev, message: prefillMessage }));
      setSubmitted(false);
    }
  }, [prefillMessage]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
    if (!formData.name.trim()) {
      setError(t.contact.errName);
      return;
    }
    if (!emailOk) {
      setError(t.contact.errEmail);
      return;
    }
    if (formData.message.trim().length < 8) {
      setError(t.contact.errMsg);
      return;
    }
    setError("");
    setSubmitted(true);
    showSuccessToast(
      t.toast.contactTitle,
      t.toast.contactDesc(formData.name.trim())
    );
  };

  const handleBookMeeting = () => {
    setFormData((prev) => ({
      ...prev,
      message:
        prev.message ||
        "Hi fabu001, I would like to schedule a 30-minute discovery call this week to discuss a project.",
    }));
    setSubmitted(false);
  };

  return (
    <section
      id="contact"
      className="py-24 bg-[#F4F6F9] dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-[#2563EB] dark:text-blue-400 mb-2">
              {t.contact.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white tracking-tight">
              {t.contact.title}
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Dark Studio Info Card */}
          <div className="lg:col-span-5 bg-[#0B1120] text-slate-100 rounded-2xl p-8 sm:p-10 flex flex-col justify-between border border-slate-800">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-blue-400 mb-3">
                {t.contact.deskEyebrow}
              </p>
              <h3 className="font-display text-2xl font-bold text-white mb-4">
                {t.contact.deskTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-8">
                {t.contact.deskDesc}
              </p>

              <div className="space-y-5 mb-8">
                <a
                  href={STUDIO_PHONE_TEL}
                  className="flex items-start gap-3.5 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-blue-400 block mb-0.5">
                      {t.contact.directLine}
                    </span>
                    <span className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors tabular-nums">
                      {STUDIO_PHONE_DISPLAY}
                    </span>
                  </div>
                </a>

                <a
                  href="mailto:hello@fabu001.dev"
                  className="flex items-start gap-3.5 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-blue-400 block mb-0.5">
                      {t.contact.emailLabel}
                    </span>
                    <span className="text-sm font-mono text-slate-300 group-hover:text-white break-all transition-colors">
                      hello@fabu001.dev
                    </span>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 space-y-4">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                  {t.contact.availabilityLabel}
                </p>
                <p className="text-sm font-bold text-white">
                  {t.contact.availabilityValue}
                </p>
                <p className="text-xs text-emerald-400 mt-1">
                  {t.contact.availabilityNote}
                </p>
              </div>

              <button
                type="button"
                onClick={handleBookMeeting}
                className="w-full py-3 px-4 rounded-lg border border-slate-700 hover:border-blue-400 text-slate-200 hover:text-white text-xs font-bold tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>{t.contact.bookCall}</span>
              </button>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-7 sm:p-10 flex flex-col justify-between transition-colors duration-200">
            {submitted ? (
              <div className="my-auto text-center py-10 space-y-4 animate-fade-in">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-950 dark:text-white">
                  {t.contact.dispatchedTitle}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                  {t.contact.dispatchedDesc(formData.name, formData.email)}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={buildWhatsAppUrl(
                      `Hi fabu001, my name is ${formData.name} (${formData.email}). ${formData.message}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.contact.continueWhatsapp}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", message: "" });
                    }}
                    className="px-5 py-3 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white dark:hover:bg-slate-900 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    {t.contact.sendAnother}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 flex flex-col justify-between h-full">
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        {t.contact.fullName}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder={t.contact.fullName}
                        className="w-full p-3.5 border border-slate-200 dark:border-slate-800 bg-[#F4F6F9] dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none rounded-lg focus:border-[#2563EB] dark:focus:border-blue-500 focus:bg-white dark:focus:bg-slate-950 text-sm transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                      >
                        {t.contact.emailAddress}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="name@email.com"
                        className="w-full p-3.5 border border-slate-200 dark:border-slate-800 bg-[#F4F6F9] dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none rounded-lg focus:border-[#2563EB] dark:focus:border-blue-500 focus:bg-white dark:focus:bg-slate-950 text-sm transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                      >
                        {t.contact.projectBrief}
                      </label>
                      <button
                        type="button"
                        disabled={draftingBrief}
                        onClick={async () => {
                          if (!formData.message.trim()) {
                            setError(t.ai.draftBriefHint);
                            return;
                          }
                          setError("");
                          setDraftingBrief(true);
                          try {
                            const result = await requestDraftBrief({
                              roughIdea: formData.message,
                              lang,
                            });
                            setFormData((prev) => ({
                              ...prev,
                              message: result.refinedBrief,
                            }));
                          } catch (err) {
                            setError(
                              err instanceof Error
                                ? err.message
                                : "Could not polish brief."
                            );
                          } finally {
                            setDraftingBrief(false);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-[11px] font-bold transition-colors cursor-pointer disabled:opacity-50"
                      >
                        {draftingBrief ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <Sparkles className="w-3 h-3" />
                        )}
                        <span>
                          {draftingBrief
                            ? t.ai.draftBriefWorking
                            : t.ai.draftBriefBtn}
                        </span>
                      </button>
                    </div>
                    <textarea
                      id="contact-message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder={t.contact.briefPlaceholder}
                      className="w-full p-3.5 border border-slate-200 dark:border-slate-800 bg-[#F4F6F9] dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none rounded-lg focus:border-[#2563EB] dark:focus:border-blue-500 focus:bg-white dark:focus:bg-slate-950 text-sm transition-colors resize-none"
                    />
                  </div>

                  {error && (
                    <p className="text-xs font-medium text-red-600 dark:text-red-400">{error}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t.contact.sendBrief}</span>
                  </button>

                  <a
                    href={buildWhatsAppUrl(
                      formData.message
                        ? `Hi fabu001, ${formData.message}`
                        : "Hi fabu001, I would like to discuss a software or training project."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-lg border border-emerald-600 dark:border-emerald-500/60 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 bg-white dark:bg-slate-900 font-bold text-xs tracking-wide transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.contact.chatWhatsapp}</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
