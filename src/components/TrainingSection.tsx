import { useState, type FormEvent } from "react";
import {
  Code,
  Layers,
  ShieldCheck,
  GraduationCap,
  X,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { STUDENT_STORIES, buildWhatsAppUrl } from "../data/siteData";
import { useLanguage } from "../i18n/LanguageContext";

const COURSE_ICONS = {
  code: Code,
  layers: Layers,
  shield: ShieldCheck,
};

interface TrainingSectionProps {
  highlightedCourseId?: number | null;
}

export function TrainingSection({ highlightedCourseId }: TrainingSectionProps) {
  const { t } = useLanguage();
  const [selectedCourseTitle, setSelectedCourseTitle] = useState<string | null>(null);
  const [selectedCourseDuration, setSelectedCourseDuration] = useState<string>("");
  const [studentForm, setStudentForm] = useState({ name: "", phone: "" });
  const [submittedCourse, setSubmittedCourse] = useState<string | null>(null);

  const handleEnrollSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedCourseTitle || !studentForm.name.trim() || !studentForm.phone.trim()) {
      return;
    }
    setSubmittedCourse(selectedCourseTitle);
  };

  const resetModal = () => {
    setSelectedCourseTitle(null);
    setSelectedCourseDuration("");
    setSubmittedCourse(null);
    setStudentForm({ name: "", phone: "" });
  };

  return (
    <section
      id="training"
      className="py-24 bg-[#F4F6F9] dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-[#2563EB] dark:text-blue-400 mb-2">
              {t.training.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white tracking-tight">
              {t.training.title}
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md">
            {t.training.subtitle}
          </p>
        </div>

        {/* 3 Course Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {t.training.courses.map((course) => {
            const Icon = COURSE_ICONS[course.icon];
            const isHighlighted = highlightedCourseId === course.id;
            return (
              <div
                key={course.id}
                className={`bg-white dark:bg-slate-900 border rounded-2xl p-8 flex flex-col justify-between transition-all group ${
                  isHighlighted
                    ? "border-[#2563EB] ring-2 ring-[#2563EB]/30"
                    : "border-slate-200 dark:border-slate-800 hover:border-[#2563EB]/40"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="w-11 h-11 rounded-lg bg-[#F4F6F9] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 group-hover:border-[#2563EB]/30 transition-colors flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-right text-xs text-slate-500 dark:text-slate-400 font-mono">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{course.duration}</span>
                      <span aria-hidden="true"> · </span>
                      <span>{course.difficulty}</span>
                      <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{course.projects}</div>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-slate-950 dark:text-white text-xl mb-2 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                    {course.desc}
                  </p>

                  <div className="mb-8 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                      {t.training.coreSyllabus}
                    </h4>
                    <p className="text-xs font-mono text-slate-700 dark:text-slate-300">
                      {course.topics.join(" / ")}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCourseTitle(course.title);
                    setSelectedCourseDuration(course.duration);
                  }}
                  className="w-full py-3 px-4 rounded-lg border border-[#2563EB]/40 dark:border-blue-500/40 hover:bg-[#2563EB] text-[#2563EB] dark:text-blue-400 hover:text-white font-bold text-xs tracking-wide transition-colors cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                >
                  <span>{t.training.enrollBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Cohort Outcomes */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-14">
          <div className="mb-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-[#2563EB] dark:text-blue-400 mb-1">
              {t.training.outcomesEyebrow}
            </p>
            <h3 className="font-display text-2xl font-bold text-slate-950 dark:text-white">
              {t.training.outcomesTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
            {STUDENT_STORIES.map((story) => (
              <div
                key={story.name}
                className="p-6 sm:p-7 flex flex-col justify-between"
              >
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  “{story.text}”
                </p>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-sm font-bold text-slate-950 dark:text-white">{story.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {story.role} · {story.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enrollment Modal */}
      {selectedCourseTitle && (
        <div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={resetModal}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 sm:p-8 relative shadow-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close enrollment dialog"
              onClick={resetModal}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {submittedCourse ? (
              <div className="text-center py-4 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-950 dark:text-white">
                  {t.training.receivedTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t.training.receivedDesc(studentForm.name, submittedCourse)}
                </p>
                <div className="flex flex-col gap-2 pt-2">
                  <a
                    href={buildWhatsAppUrl(
                      `NEW STUDENT ENROLLMENT (fabu001)\nCourse: ${submittedCourse}\nName: ${studentForm.name}\nPhone: ${studentForm.phone}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold tracking-wide transition-colors text-center"
                  >
                    {t.training.confirmWhatsapp}
                  </a>
                  <button
                    type="button"
                    onClick={resetModal}
                    className="w-full py-2.5 px-4 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white text-xs font-semibold cursor-pointer"
                  >
                    {t.training.done}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-[#2563EB] dark:text-blue-400 flex items-center justify-center mx-auto mb-3">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-950 dark:text-white mb-1">
                    {t.training.deskTitle}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                    {t.training.deskDescStart}
                    <strong className="text-slate-900 dark:text-white">{selectedCourseTitle}</strong> ({selectedCourseDuration}).
                  </p>
                </div>

                <form onSubmit={handleEnrollSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      {t.training.fullName}
                    </label>
                    <input
                      type="text"
                      required
                      value={studentForm.name}
                      onChange={(e) =>
                        setStudentForm({ ...studentForm, name: e.target.value })
                      }
                      placeholder={t.training.fullName}
                      className="w-full border border-slate-200 dark:border-slate-800 p-3 rounded-lg bg-white dark:bg-slate-950 outline-none focus:border-[#2563EB] text-sm text-slate-900 dark:text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      {t.training.phoneWhatsapp}
                    </label>
                    <input
                      type="tel"
                      required
                      value={studentForm.phone}
                      onChange={(e) =>
                        setStudentForm({ ...studentForm, phone: e.target.value })
                      }
                      placeholder="E.g., +250 788 000 000"
                      className="w-full border border-slate-200 dark:border-slate-800 p-3 rounded-lg bg-white dark:bg-slate-950 outline-none focus:border-[#2563EB] text-sm text-slate-900 dark:text-slate-100"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs tracking-wide py-3.5 px-4 rounded-lg transition-colors cursor-pointer"
                  >
                    {t.training.submitEnroll}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
