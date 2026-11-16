import { useState } from "react";
import {
  Briefcase,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MapPin,
  Check,
  FolderGit2,
  X,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useLanguage } from "../i18n/LanguageContext";

export function ExperienceSection() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const milestones = t.experience.milestones;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [expandedId, setExpandedId] = useState<number | null>(
    milestones[0]?.id ?? null
  );

  const selectedMilestone = milestones[selectedIndex] ?? milestones[0];
  const expandedMilestone =
    milestones.find((m) => m.id === expandedId) ?? null;

  const handleMilestoneClick = (idx: number, id: number) => {
    if (selectedIndex === idx) {
      setExpandedId((prev) => (prev === id ? null : id));
    } else {
      setSelectedIndex(idx);
      setExpandedId(id);
    }
  };

  const handleStep = (delta: number) => {
    const nextIdx =
      (selectedIndex + delta + milestones.length) % milestones.length;
    setSelectedIndex(nextIdx);
    setExpandedId(milestones[nextIdx].id);
  };

  const progressPercentage =
    milestones.length > 1 ? (selectedIndex / (milestones.length - 1)) * 100 : 0;

  return (
    <section
      id="experience"
      className="py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header & Timeline Step Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-[#2563EB] dark:text-blue-400 mb-2">
              {t.experience.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white tracking-tight mb-3">
              {t.experience.title}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {t.experience.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono text-xs text-slate-500 dark:text-slate-400 tabular-nums mr-1">
              {String(selectedIndex + 1).padStart(2, "0")} /{" "}
              {String(milestones.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => handleStep(-1)}
              aria-label={t.experience.prevMilestone}
              className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-800 bg-[#F4F6F9] dark:bg-slate-950 text-slate-700 dark:text-slate-200 hover:border-[#2563EB] hover:text-[#2563EB] dark:hover:text-blue-400 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleStep(1)}
              aria-label={t.experience.nextMilestone}
              className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-800 bg-[#F4F6F9] dark:bg-slate-950 text-slate-700 dark:text-slate-200 hover:border-[#2563EB] hover:text-[#2563EB] dark:hover:text-blue-400 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Interactive Timeline Track */}
        <div className="overflow-x-auto pb-4 -mx-2 px-2">
          <div className="min-w-[860px] lg:min-w-0 relative pt-2">
            {/* Continuous Horizontal Rail & Active Progress Track */}
            <div
              aria-hidden="true"
              className="absolute top-[42px] left-[10%] right-[10%] h-[2px] bg-slate-200 dark:bg-slate-800"
            >
              <div
                className="h-full bg-[#2563EB] transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <div className="grid grid-cols-5 gap-4 relative">
              {milestones.map((item, idx) => {
                const Icon = item.type === "work" ? Briefcase : GraduationCap;
                const isSelected = idx === selectedIndex;
                const isExpanded = expandedId === item.id;
                const isPastOrActive = idx <= selectedIndex;
                const typeLabel =
                  item.type === "work"
                    ? t.experience.workLabel
                    : t.experience.educationLabel;

                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => handleMilestoneClick(idx, item.id)}
                    className="group flex flex-col items-stretch text-left cursor-pointer focus-visible:outline-none"
                  >
                    {/* Year & Timeline Axis Node */}
                    <div className="flex flex-col items-center mb-4">
                      <span
                        className={`font-mono text-xs font-bold tabular-nums mb-3 transition-colors ${
                          isSelected
                            ? "text-[#2563EB] dark:text-blue-400"
                            : "text-slate-500 dark:text-slate-400 group-hover:text-slate-950 dark:group-hover:text-white"
                        }`}
                      >
                        {item.year}
                      </span>
                      <span
                        className={`relative z-10 w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                          isSelected
                            ? "bg-[#2563EB] border-[#2563EB] ring-4 ring-blue-100 dark:ring-blue-950 scale-110"
                            : isPastOrActive
                              ? "bg-[#2563EB] border-[#2563EB]"
                              : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 group-hover:border-[#2563EB]"
                        }`}
                      />
                    </div>

                    {/* Milestone Summary Card */}
                    <div
                      className={`flex-1 rounded-xl border p-4 flex flex-col justify-between transition-all duration-200 ${
                        isExpanded
                          ? "bg-[#F4F6F9] dark:bg-slate-950 border-[#2563EB] shadow-sm"
                          : isSelected
                            ? "bg-[#F4F6F9]/80 dark:bg-slate-950/90 border-slate-400 dark:border-slate-600"
                            : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-[#2563EB]/50 hover:bg-[#F4F6F9]/50 dark:hover:bg-slate-950/80"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="font-mono text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                            {typeLabel}
                          </span>
                          <div
                            className={`w-7 h-7 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                              isExpanded
                                ? "bg-[#2563EB] border-[#2563EB] text-white"
                                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 group-hover:text-[#2563EB] dark:group-hover:text-blue-400"
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                          </div>
                        </div>

                        <h3 className="font-display font-bold text-sm text-slate-950 dark:text-white leading-snug mb-1 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs font-medium text-[#2563EB] dark:text-blue-400 mb-2 truncate">
                          {item.org}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 mb-3">
                          {item.desc}
                        </p>
                      </div>

                      <div className="pt-2.5 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[11px] font-semibold">
                        <span
                          className={
                            isExpanded
                              ? "text-[#2563EB] dark:text-blue-400"
                              : "text-slate-500 dark:text-slate-400 group-hover:text-slate-950 dark:group-hover:text-white"
                          }
                        >
                          {isExpanded
                            ? t.experience.collapseDetails
                            : t.experience.expandDetails}
                        </span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isExpanded
                              ? "rotate-180 text-[#2563EB] dark:text-blue-400"
                              : "text-slate-400"
                          }`}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Expanded Milestone Details Panel */}
        <AnimatePresence mode="wait">
          {expandedMilestone ? (
            <motion.div
              key={expandedMilestone.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 bg-[#F4F6F9] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">
                    <span className="font-semibold text-[#2563EB] dark:text-blue-400">
                      {expandedMilestone.type === "work"
                        ? t.experience.workLabel
                        : t.experience.educationLabel}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{expandedMilestone.period}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3" aria-hidden="true" />
                      {expandedMilestone.location}
                    </span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-950 dark:text-white">
                    {expandedMilestone.title}
                  </h3>
                  <p className="text-sm font-semibold text-[#2563EB] dark:text-blue-400 mt-0.5">
                    {expandedMilestone.org}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setExpandedId(null)}
                  aria-label={t.experience.collapseDetails}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer"
                >
                  <span>{t.experience.collapseDetails}</span>
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
                <div className="lg:col-span-7 space-y-5">
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                    {expandedMilestone.extendedDetails}
                  </p>

                  <div>
                    <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] font-semibold text-slate-500 dark:text-slate-400 mb-3">
                      {t.experience.highlightsHeading}
                    </h4>
                    <ul className="space-y-2.5">
                      {expandedMilestone.highlights.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300"
                        >
                          <Check
                            className="w-4 h-4 text-[#2563EB] dark:text-blue-400 shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-slate-200 dark:lg:border-slate-800 lg:pl-8">
                  <div>
                    <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] font-semibold text-slate-500 dark:text-slate-400 mb-3">
                      {t.experience.projectsHeading}
                    </h4>
                    <ul className="divide-y divide-slate-200 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 overflow-hidden">
                      {expandedMilestone.relatedProjects.map((project) => (
                        <li
                          key={project}
                          className="px-4 py-3 flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200"
                        >
                          <FolderGit2
                            className="w-4 h-4 text-[#2563EB] dark:text-blue-400 shrink-0"
                            aria-hidden="true"
                          />
                          <span>{project}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] font-semibold text-slate-500 dark:text-slate-400 mb-2">
                      {t.experience.stackHeading}
                    </h4>
                    <p className="font-mono text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {expandedMilestone.stack.join(" · ")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="mt-4 py-3 px-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-center">
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {selectedMilestone.title} · {selectedMilestone.period} —{" "}
                {t.experience.clickHint}
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
