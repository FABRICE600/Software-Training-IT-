import { useState, type FormEvent } from "react";
import {
  Users,
  GraduationCap,
  Briefcase,
  Calendar,
  Cloud,
  Wrench,
  Code2,
  Monitor,
  FileText,
  X,
  CheckCircle2,
  Download,
} from "lucide-react";
import {
  IMAGES,
  TECHNICAL_SKILLS,
  IMPACT_METRICS,
  CREDENTIALS,
  buildWhatsAppUrl,
} from "../data/siteData";
import { useLanguage } from "../i18n/LanguageContext";
import { ImageWithFallback } from "./ImageWithFallback";

const METRIC_ICONS = {
  clients: Users,
  students: GraduationCap,
  projects: Briefcase,
  years: Calendar,
};

const CRED_ICONS = {
  cloud: Cloud,
  wrench: Wrench,
  code: Code2,
  monitor: Monitor,
};

export function AboutSection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"bio" | "certs">("bio");
  const [modalOpen, setModalOpen] = useState(false);
  const [cvUnlocked, setCvUnlocked] = useState(false);
  const [formState, setFormState] = useState({ requesterName: "", reason: "" });
  const [formError, setFormError] = useState("");

  const handleCvSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formState.requesterName.trim() || !formState.reason.trim()) {
      setFormError(t.about.cvValidationError);
      return;
    }
    setFormError("");
    setCvUnlocked(true);
    setModalOpen(false);
  };

  const handleDownloadSummaryCv = () => {
    const cvText = [
      "FABU001 — SOFTWARE ENGINEER & IT INSTRUCTOR",
      "Studio: fabu001 · Nyange, Rwanda",
      "Email: hello@fabu001.dev | Direct: +250 795 547 233",
      "",
      "CORE EXPERIENCE",
      "- Founder & Lead Engineer, fabu001 Studio (2021 — Present)",
      "- Software Development Instructor, EAV Kivumu TSS L4SWD (2024 — Present)",
      "- IT Support Specialist, Dione Coaching Center (2023 — 2024)",
      "",
      "CERTIFICATIONS",
      "- AWS Cloud Practitioner (Amazon Web Services, 2025)",
      "- CompTIA A+ (CompTIA, 2024)",
      "- Laravel Certification (Laravel, 2023)",
      "- Google IT Support (Google, 2022)",
    ].join("\n");

    const blob = new Blob([cvText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "fabu001_CV_Summary.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="about"
      className="py-24 bg-[#F4F6F9] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-[#2563EB] dark:text-blue-400 mb-2">
              {t.about.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white tracking-tight">
              {t.about.title}
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md">
            {t.about.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Sticky Left Profile & Mastery Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-7 sm:p-8">
              <div className="flex items-center gap-5 pb-6 mb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="w-20 h-20 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shrink-0">
                  <ImageWithFallback
                    src={IMAGES.founderTwo}
                    alt="fabu001 lead engineer at workstation"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-slate-950 dark:text-white">
                    fabu001
                  </h3>
                  <p className="font-mono text-xs text-[#2563EB] dark:text-blue-400 font-medium mt-0.5">
                    {t.about.role}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {t.about.location}
                  </p>
                </div>
              </div>

              <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] font-semibold text-slate-500 dark:text-slate-400 mb-4">
                {t.about.mastery}
              </h4>
              <div className="space-y-4 font-mono">
                {TECHNICAL_SKILLS.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1.5 text-xs">
                      <span className="text-slate-800 dark:text-slate-200 font-medium">{skill.name}</span>
                      <span className="text-slate-500 dark:text-slate-400 tabular-nums">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${skill.level}%`,
                          backgroundColor: skill.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Narrative, Metrics & Credentials */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-7 sm:p-10">
            <div
              role="tablist"
              aria-label="About tabs"
              className="flex gap-8 mb-8 border-b border-slate-200 dark:border-slate-800"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "bio"}
                onClick={() => setActiveTab("bio")}
                className={`pb-3 font-semibold text-xs uppercase tracking-[0.18em] transition-colors border-b-2 -mb-px cursor-pointer ${
                  activeTab === "bio"
                    ? "text-[#2563EB] dark:text-blue-400 border-[#2563EB] dark:border-blue-400"
                    : "text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {t.about.tabExperience}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "certs"}
                onClick={() => setActiveTab("certs")}
                className={`pb-3 font-semibold text-xs uppercase tracking-[0.18em] transition-colors border-b-2 -mb-px cursor-pointer ${
                  activeTab === "certs"
                    ? "text-[#2563EB] dark:text-blue-400 border-[#2563EB] dark:border-blue-400"
                    : "text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {t.about.tabCredentials}
              </button>
            </div>

            {activeTab === "bio" ? (
              <div className="animate-fade-in">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-950 dark:text-white mb-4">
                  {t.about.headlineStart}
                  <span className="text-[#2563EB] dark:text-blue-400">{t.about.headlineAccent}</span>
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
                  {t.about.bio}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800 mb-8 bg-slate-50/50 dark:bg-slate-950/60">
                  {IMPACT_METRICS.map((metric) => {
                    const Icon = METRIC_ICONS[metric.key];
                    return (
                      <div
                        key={metric.key}
                        className="p-5 flex flex-col items-start justify-between gap-2"
                      >
                        <Icon className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
                        <span className="font-display text-2xl font-bold text-slate-950 dark:text-white tabular-nums">
                          {metric.value}
                        </span>
                        <span className="text-slate-600 dark:text-slate-400 text-xs font-medium">
                          {t.about.metrics[metric.key]}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-[#0B1120] text-white p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <h4 className="font-display font-bold text-white text-base mb-1">
                      {t.about.cvTitle}
                    </h4>
                    <p className="text-slate-400 text-xs">
                      {cvUnlocked
                        ? t.about.cvUnlockedDesc(formState.requesterName)
                        : t.about.cvLockedDesc}
                    </p>
                  </div>

                  {cvUnlocked ? (
                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        type="button"
                        onClick={handleDownloadSummaryCv}
                        className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs tracking-wide px-5 py-2.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <Download className="w-4 h-4" />
                        <span>{t.about.downloadCv}</span>
                      </button>
                      <a
                        href={buildWhatsAppUrl(
                          `Hi fabu001, I just unlocked your CV as ${formState.requesterName} (${formState.reason}) and would like to connect.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-slate-700 hover:border-white text-slate-200 font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap shrink-0"
                      >
                        {t.about.messageWhatsapp}
                      </a>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setModalOpen(true)}
                      className="w-full sm:w-auto bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs tracking-wide px-5 py-2.5 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      {t.about.requestDownload}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
                {CREDENTIALS.map((cred) => {
                  const Icon = CRED_ICONS[cred.icon];
                  return (
                    <div
                      key={cred.name}
                      className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-[#2563EB]/40 rounded-xl transition-colors"
                    >
                      <div className="w-11 h-11 rounded-lg bg-white dark:bg-slate-900 text-[#2563EB] dark:text-blue-400 flex items-center justify-center border border-slate-200 dark:border-slate-800 shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm mb-1">
                          {cred.name}
                        </h4>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-mono tabular-nums">
                          {cred.issuer} · {cred.year}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CV Request Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 sm:p-8 relative shadow-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close modal"
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-6">
              <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-[#2563EB] dark:text-blue-400 flex items-center justify-center mx-auto mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-slate-950 dark:text-white mb-1">
                {t.about.cvModalTitle}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                {t.about.cvModalDesc}
              </p>
            </div>

            <form onSubmit={handleCvSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t.about.yourName}
                </label>
                <input
                  type="text"
                  required
                  value={formState.requesterName}
                  onChange={(e) =>
                    setFormState({ ...formState, requesterName: e.target.value })
                  }
                  placeholder={t.about.yourName}
                  className="w-full border border-slate-200 dark:border-slate-800 p-3 rounded-lg bg-white dark:bg-slate-950 outline-none focus:border-[#2563EB] text-sm text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t.about.inquiryReason}
                </label>
                <textarea
                  required
                  rows={3}
                  value={formState.reason}
                  onChange={(e) =>
                    setFormState({ ...formState, reason: e.target.value })
                  }
                  placeholder={t.about.inquiryReason}
                  className="w-full border border-slate-200 dark:border-slate-800 p-3 rounded-lg bg-white dark:bg-slate-950 outline-none focus:border-[#2563EB] text-sm text-slate-900 dark:text-slate-100 resize-none"
                />
              </div>

              {formError && (
                <p className="text-xs text-red-600 dark:text-red-400 font-medium">{formError}</p>
              )}

              <button
                type="submit"
                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs tracking-wide py-3.5 px-4 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.about.unlockNow}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
