import { useState } from "react";
import { Search, X, ArrowRight, FolderSearch } from "lucide-react";
import {
  PROJECTS,
  PROJECT_CATEGORIES,
  buildWhatsAppUrl,
  type ProjectItem,
} from "../data/siteData";
import { useLanguage } from "../i18n/LanguageContext";
import { ImageWithFallback } from "./ImageWithFallback";

interface ProjectsSectionProps {
  onInquireProject: (projectTitle: string) => void;
  selectedProjectId?: number | null;
  onSelectProjectId?: (id: number | null) => void;
}

export function ProjectsSection({
  onInquireProject,
  selectedProjectId,
  onSelectProjectId,
}: ProjectsSectionProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [internalProjectId, setInternalProjectId] = useState<number | null>(null);
  const [modalImageIdx, setModalImageIdx] = useState<0 | 1>(0);

  const activeProjectId =
    selectedProjectId !== undefined ? selectedProjectId : internalProjectId;

  const setActiveProjectId = (id: number | null) => {
    if (onSelectProjectId) {
      onSelectProjectId(id);
    } else {
      setInternalProjectId(id);
    }
  };

  const activeProject: ProjectItem | null =
    PROJECTS.find((p) => p.id === activeProjectId) ?? null;

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return matchesCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(trimmed) ||
      project.description.toLowerCase().includes(trimmed) ||
      project.details.toLowerCase().includes(trimmed) ||
      project.tech.some((techItem) => techItem.toLowerCase().includes(trimmed));
    return matchesCategory && matchesSearch;
  });

  const openModal = (project: ProjectItem) => {
    setActiveProjectId(project.id);
    setModalImageIdx(0);
  };

  return (
    <section
      id="projects"
      className="py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-[#2563EB] dark:text-blue-400 mb-2">
              {t.projects.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              {t.projects.titleStart}
              <span className="text-[#2563EB] dark:text-blue-400">{t.projects.titleAccent}</span>
              {t.projects.titleEnd}
            </h2>
          </div>

          {/* Search Input */}
          <div className="w-full lg:w-80">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.projects.searchPlaceholder}
                aria-label={t.projects.searchPlaceholder}
                className="w-full px-4 py-2.5 pl-10 pr-9 bg-[#F4F6F9] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm rounded-lg outline-none focus:border-[#2563EB] focus:bg-white dark:focus:bg-slate-950 transition-colors"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Segmented Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F4F6F9] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl w-fit mb-12">
          {PROJECT_CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  isSelected
                    ? "bg-[#0B1120] dark:bg-[#2563EB] text-white"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white dark:hover:bg-slate-900"
                }`}
              >
                {category === "All" ? t.tutorials.allCategory : category}
              </button>
            );
          })}
        </div>

        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <button
                key={project.id}
                type="button"
                onClick={() => openModal(project)}
                className="text-left bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[#2563EB]/50 overflow-hidden transition-colors flex flex-col justify-between group cursor-pointer"
              >
                <div className="w-full">
                  <div className="aspect-[16/10] w-full bg-slate-100 dark:bg-slate-800 relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                    <ImageWithFallback
                      src={project.image2}
                      alt={`${project.title} alternate view`}
                      className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">
                      <span className="font-semibold text-[#2563EB] dark:text-blue-400">
                        {project.category}
                      </span>
                      <span aria-hidden="true">/</span>
                      <span className="truncate">{project.tech.slice(0, 3).join(" · ")}</span>
                    </div>

                    <h3 className="font-display font-bold text-slate-950 dark:text-white text-lg mb-2 leading-snug group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    <p className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                      {project.outcome}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 w-full flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors">
                  <span>{t.projects.viewCaseStudy}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#F4F6F9] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 max-w-lg mx-auto">
            <FolderSearch className="w-10 h-10 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mb-2">
              {t.projects.emptyTitle}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mb-5">
              {t.projects.emptyDesc(query)}
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedCategory("All");
              }}
              className="px-5 py-2.5 rounded-lg bg-[#2563EB] text-white text-xs font-bold cursor-pointer"
            >
              {t.projects.resetFilters}
            </button>
          </div>
        )}
      </div>

      {/* Case Study Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setActiveProjectId(null)}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full bg-slate-900 overflow-hidden shrink-0 border-b border-slate-200 dark:border-slate-800">
              <ImageWithFallback
                src={modalImageIdx === 0 ? activeProject.image : activeProject.image2}
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                aria-label="Close case study"
                onClick={() => setActiveProjectId(null)}
                className="absolute top-4 right-4 p-2 bg-white/95 dark:bg-slate-900/95 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-slate-950/85 backdrop-blur-sm p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setModalImageIdx(0)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono cursor-pointer ${
                    modalImageIdx === 0 ? "bg-[#2563EB] text-white" : "text-slate-300 hover:text-white"
                  }`}
                >
                  {t.projects.primaryTab}
                </button>
                <button
                  type="button"
                  onClick={() => setModalImageIdx(1)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono cursor-pointer ${
                    modalImageIdx === 1 ? "bg-[#2563EB] text-white" : "text-slate-300 hover:text-white"
                  }`}
                >
                  {t.projects.archTab}
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-5">
              <div>
                <p className="text-xs font-mono text-[#2563EB] dark:text-blue-400 font-semibold mb-1">
                  {activeProject.category} · {activeProject.tech.join(" / ")}
                </p>
                <h3 className="font-display font-bold text-slate-950 dark:text-white text-2xl mb-2">
                  {activeProject.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              <div className="bg-[#F4F6F9] dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <h4 className="font-display font-bold text-slate-900 dark:text-white text-sm">
                  {t.projects.overviewHeading}
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {activeProject.details}
                </p>
                <p className="text-xs font-semibold text-slate-900 dark:text-white pt-1">
                  {t.projects.measuredOutcome}: {activeProject.outcome}
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-[#F4F6F9] dark:bg-slate-950 flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  const title = activeProject.title;
                  setActiveProjectId(null);
                  onInquireProject(title);
                }}
                className="flex-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs tracking-wide py-3.5 px-4 rounded-lg transition-colors cursor-pointer"
              >
                {t.projects.requestSimilar}
              </button>
              <a
                href={buildWhatsAppUrl(
                  `Hi fabu001, I'm reviewing your portfolio and would like to inquire about: ${activeProject.title} (${activeProject.category}).`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-5 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-slate-500 text-slate-800 dark:text-slate-200 text-xs font-semibold text-center transition-colors bg-white dark:bg-slate-900"
              >
                {t.projects.discussWhatsapp}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
