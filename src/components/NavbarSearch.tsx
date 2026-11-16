import {
  useState,
  useEffect,
  useRef,
  useMemo,
  type ReactNode,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  Search,
  X,
  Briefcase,
  GraduationCap,
  FileText,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { BLOG_POSTS, SERVICES, COURSES, PROJECTS } from "../data/siteData";
import { useLanguage } from "../i18n/LanguageContext";
import { calculateReadingStats } from "./BlogSection";
import { ImageWithFallback } from "./ImageWithFallback";

export type SearchResultType = "service" | "training" | "blog" | "project";
type DropdownCategoryFilter = "all" | SearchResultType;

export interface SearchResult {
  type: SearchResultType;
  id: number;
  title: string;
  subtitle: string;
  meta: string;
  searchable: string;
  thumbnail?: string;
  codeTag?: string;
}

function highlightMatch(text: string, query: string): ReactNode {
  const trimmed = query.trim();
  if (!trimmed) return text;
  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "ig");
  const parts = text.split(regex);
  if (parts.length === 1) return text;
  return parts.map((part, idx) =>
    part.toLowerCase() === trimmed.toLowerCase() ? (
      <mark
        key={idx}
        className="bg-blue-100 dark:bg-blue-950/90 text-[#1D4ED8] dark:text-blue-300 font-semibold rounded-xs px-0.5"
      >
        {part}
      </mark>
    ) : (
      <span key={idx}>{part}</span>
    )
  );
}

interface NavbarSearchProps {
  onSelectResult: (result: SearchResult) => void;
}

export function NavbarSearch({ onSelectResult }: NavbarSearchProps) {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<DropdownCategoryFilter>("all");
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const indexItems = useMemo<SearchResult[]>(() => {
    const serviceResults: SearchResult[] = t.services.items.map((svc, idx) => {
      const enSvc = SERVICES[idx];
      const localizedCat = t.services.categories[svc.category];
      return {
        type: "service",
        id: svc.id,
        title: svc.title,
        subtitle: svc.description,
        meta: `${localizedCat} · ${svc.items.join(" · ")}`,
        codeTag: svc.code,
        searchable: [
          svc.title,
          svc.description,
          svc.category,
          localizedCat,
          ...svc.items,
          enSvc?.title ?? "",
          enSvc?.description ?? "",
          enSvc?.category ?? "",
          ...(enSvc?.items ?? []),
          "service",
          "services",
          "serivisi",
        ]
          .join(" ")
          .toLowerCase(),
      };
    });

    const trainingResults: SearchResult[] = t.training.courses.map((course, idx) => {
      const enCourse = COURSES[idx];
      return {
        type: "training",
        id: course.id,
        title: course.title,
        subtitle: course.desc,
        meta: `${course.duration} · ${course.difficulty} · ${course.topics.join(" / ")}`,
        searchable: [
          course.title,
          course.desc,
          course.duration,
          course.difficulty,
          course.projects,
          ...course.topics,
          enCourse?.title ?? "",
          enCourse?.desc ?? "",
          ...(enCourse?.topics ?? []),
          "training",
          "course",
          "cohort",
          "amahugurwa",
          "amasomo",
        ]
          .join(" ")
          .toLowerCase(),
      };
    });

    const blogResults: SearchResult[] = BLOG_POSTS.map((post) => {
      const { minutes } = calculateReadingStats(post);
      return {
        type: "blog",
        id: post.id,
        title: post.title,
        subtitle: post.excerpt,
        meta: `${post.category} · ${post.date} · ${t.blog.minRead(minutes)}`,
        thumbnail: post.image,
        searchable: [
          post.title,
          post.excerpt,
          post.category,
          post.author,
          post.date,
          ...post.body,
          "blog",
          "article",
          "news",
          "amakuru",
          "inyandiko",
        ]
          .join(" ")
          .toLowerCase(),
      };
    });

    const projectResults: SearchResult[] = PROJECTS.map((project) => ({
      type: "project",
      id: project.id,
      title: project.title,
      subtitle: project.description,
      meta: `${project.category} · ${project.tech.slice(0, 3).join(" / ")}`,
      thumbnail: project.image,
      searchable: [
        project.title,
        project.description,
        project.details,
        project.category,
        project.outcome,
        ...project.tech,
        "project",
        "projects",
        "portfolio",
        "umushinga",
        "imishinga",
      ]
        .join(" ")
        .toLowerCase(),
    }));

    return [...serviceResults, ...trainingResults, ...blogResults, ...projectResults];
  }, [t]);

  const trimmedQuery = query.trim().toLowerCase();

  const groupedByQuery = useMemo(() => {
    if (!trimmedQuery) {
      return {
        service: indexItems.filter((item) => item.type === "service").slice(0, 2),
        training: indexItems.filter((item) => item.type === "training").slice(0, 2),
        blog: indexItems.filter((item) => item.type === "blog").slice(0, 2),
        project: indexItems.filter((item) => item.type === "project").slice(0, 2),
      };
    }

    const terms = trimmedQuery.split(/\s+/).filter(Boolean);
    const matches = indexItems.filter((item) =>
      terms.every((term) => item.searchable.includes(term))
    );

    return {
      service: matches.filter((item) => item.type === "service"),
      training: matches.filter((item) => item.type === "training"),
      blog: matches.filter((item) => item.type === "blog"),
      project: matches.filter((item) => item.type === "project"),
    };
  }, [indexItems, trimmedQuery]);

  const totalMatchCount =
    groupedByQuery.service.length +
    groupedByQuery.training.length +
    groupedByQuery.blog.length +
    groupedByQuery.project.length;

  const visibleGroups = useMemo(
    () => ({
      service:
        activeTab === "all" || activeTab === "service"
          ? groupedByQuery.service
          : [],
      training:
        activeTab === "all" || activeTab === "training"
          ? groupedByQuery.training
          : [],
      blog:
        activeTab === "all" || activeTab === "blog" ? groupedByQuery.blog : [],
      project:
        activeTab === "all" || activeTab === "project"
          ? groupedByQuery.project
          : [],
    }),
    [activeTab, groupedByQuery]
  );

  const flatResults = useMemo(
    () => [
      ...visibleGroups.service,
      ...visibleGroups.training,
      ...visibleGroups.blog,
      ...visibleGroups.project,
    ],
    [visibleGroups]
  );

  // Scroll highlighted option into view during arrow-key navigation
  useEffect(() => {
    if (activeIndex >= 0 && optionRefs.current[activeIndex]) {
      optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  // Reset category filter tab cleanly if user clears query
  useEffect(() => {
    if (!trimmedQuery) {
      setActiveTab("all");
    }
  }, [trimmedQuery]);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handlePointerDown = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setDesktopOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  // Global keyboard shortcut: Cmd/Ctrl + K or "/" when not typing
  useEffect(() => {
    const handleGlobalKey = (e: globalThis.KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTypingTarget =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable);

      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      const isSlash =
        !isTypingTarget && e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey;

      if (isCmdK || isSlash) {
        e.preventDefault();
        if (desktopInputRef.current && desktopInputRef.current.offsetParent !== null) {
          desktopInputRef.current.focus();
          setDesktopOpen(true);
        } else {
          setMobileOpen(true);
          window.setTimeout(() => {
            mobileInputRef.current?.focus();
          }, 20);
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, []);

  const chooseResult = (result: SearchResult) => {
    setDesktopOpen(false);
    setMobileOpen(false);
    setActiveIndex(-1);
    onSelectResult(result);
  };

  const handleInputKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setDesktopOpen(false);
      setMobileOpen(false);
      setActiveIndex(-1);
      e.currentTarget.blur();
      return;
    }

    if (flatResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setDesktopOpen(true);
      setActiveIndex((prev) => (prev + 1) % flatResults.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setDesktopOpen(true);
      setActiveIndex((prev) => (prev <= 0 ? flatResults.length - 1 : prev - 1));
    } else if (e.key === "Enter" && activeIndex >= 0 && flatResults[activeIndex]) {
      e.preventDefault();
      chooseResult(flatResults[activeIndex]);
    } else if (e.key === "Enter" && flatResults.length > 0 && trimmedQuery) {
      e.preventDefault();
      chooseResult(flatResults[0]);
    }
  };

  const categoryTabs: { id: DropdownCategoryFilter; label: string; count: number }[] = [
    { id: "all", label: t.search.allTab, count: totalMatchCount },
    { id: "service", label: t.search.servicesGroup, count: groupedByQuery.service.length },
    { id: "training", label: t.search.trainingGroup, count: groupedByQuery.training.length },
    { id: "blog", label: t.search.blogGroup, count: groupedByQuery.blog.length },
    { id: "project", label: t.search.projectsGroup, count: groupedByQuery.project.length },
  ];

  const renderGroup = (
    label: string,
    items: SearchResult[],
    Icon: typeof Briefcase,
    offset: number
  ) => {
    if (items.length === 0) return null;
    return (
      <div className="py-2 first:pt-1">
        <div className="px-3.5 py-1.5 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <Icon className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" aria-hidden="true" />
            <span>{label}</span>
          </span>
          <span className="tabular-nums text-slate-400 dark:text-slate-500">
            {items.length}
          </span>
        </div>
        <div className="space-y-0.5 px-1.5">
          {items.map((item, localIdx) => {
            const globalIdx = offset + localIdx;
            const isHighlighted = globalIdx === activeIndex;
            return (
              <button
                key={`${item.type}-${item.id}`}
                ref={(el) => {
                  optionRefs.current[globalIdx] = el;
                }}
                type="button"
                role="option"
                aria-selected={isHighlighted}
                onMouseEnter={() => setActiveIndex(globalIdx)}
                onClick={() => chooseResult(item)}
                className={`w-full text-left px-2.5 py-2.5 rounded-lg flex items-center gap-3 transition-colors cursor-pointer group ${
                  isHighlighted
                    ? "bg-blue-50/90 dark:bg-blue-950/60 text-slate-950 dark:text-white"
                    : "hover:bg-slate-50 dark:hover:bg-slate-800/70 text-slate-800 dark:text-slate-200"
                }`}
              >
                {item.thumbnail ? (
                  <div className="w-12 h-9 rounded-md overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 shrink-0">
                    <ImageWithFallback
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className={`w-10 h-9 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                      isHighlighted
                        ? "bg-white dark:bg-slate-950 border-[#2563EB]/40 text-[#2563EB] dark:text-blue-400"
                        : "bg-[#F4F6F9] dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 group-hover:text-[#2563EB] dark:group-hover:text-blue-400"
                    }`}
                  >
                    {item.codeTag ? (
                      <span className="font-mono text-[11px] font-bold tabular-nums">
                        {item.codeTag}
                      </span>
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-display text-sm font-bold text-slate-950 dark:text-white truncate">
                      {highlightMatch(item.title, query)}
                    </p>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 shrink-0" />
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {highlightMatch(item.subtitle, query)}
                  </p>
                  <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500 truncate mt-0.5">
                    {item.meta}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderResultsBody = () => {
    const servicesOffset = 0;
    const trainingOffset = visibleGroups.service.length;
    const blogOffset = trainingOffset + visibleGroups.training.length;
    const projectOffset = blogOffset + visibleGroups.blog.length;

    return (
      <>
        {/* Top Summary & Interactive Category Filter Bar */}
        <div className="px-3 pt-2.5 pb-2 border-b border-slate-200 dark:border-slate-800 bg-[#F4F6F9]/70 dark:bg-slate-950/60 space-y-2">
          <div className="flex items-center justify-between gap-2 px-0.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-[#2563EB] dark:text-blue-400">
              {trimmedQuery
                ? t.search.matchesCount(totalMatchCount)
                : t.search.quickJump}
            </span>
            {trimmedQuery && (
              <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 truncate max-w-[180px]">
                “{query.trim()}”
              </span>
            )}
          </div>

          <div
            role="tablist"
            aria-label="Filter search results by category"
            className="flex items-center gap-1 overflow-x-auto pb-0.5"
          >
            {categoryTabs.map((tab) => {
              const isTabActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isTabActive}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setActiveIndex(-1);
                  }}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isTabActive
                      ? "bg-[#0B1120] dark:bg-[#2563EB] text-white"
                      : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`font-mono text-[10px] tabular-nums ${
                      isTabActive
                        ? "text-slate-300 dark:text-blue-100"
                        : "text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {flatResults.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <p className="font-display text-sm font-bold text-slate-900 dark:text-white mb-1">
              {t.search.emptyTitle(query.trim())}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              {t.search.emptyHint}
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveTab("all");
                setActiveIndex(-1);
              }}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-[#2563EB] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-[#2563EB] transition-colors cursor-pointer"
            >
              {t.search.reset}
            </button>
          </div>
        ) : (
          <div
            role="listbox"
            aria-label={t.search.resultsLabel}
            className="max-h-[55vh] sm:max-h-[400px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 py-1"
          >
            {renderGroup(
              t.search.servicesGroup,
              visibleGroups.service,
              Briefcase,
              servicesOffset
            )}
            {renderGroup(
              t.search.trainingGroup,
              visibleGroups.training,
              GraduationCap,
              trainingOffset
            )}
            {renderGroup(
              t.search.blogGroup,
              visibleGroups.blog,
              FileText,
              blogOffset
            )}
            {renderGroup(
              t.search.projectsGroup,
              visibleGroups.project,
              Layers,
              projectOffset
            )}
          </div>
        )}

        <div className="px-3.5 py-2 bg-[#F4F6F9] dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
          <span className="truncate">{t.search.keyboardHint}</span>
        </div>
      </>
    );
  };

  return (
    <div ref={containerRef} className="relative flex items-center shrink-0">
      {/* Desktop & Tablet Inline Search Bar */}
      <div className="hidden md:flex items-center relative w-44 lg:w-36 xl:w-52">
        <Search
          className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute left-3 pointer-events-none"
          aria-hidden="true"
        />
        <input
          ref={desktopInputRef}
          type="search"
          value={query}
          onFocus={() => setDesktopOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setDesktopOpen(true);
            setActiveIndex(-1);
          }}
          onKeyDown={handleInputKeyDown}
          placeholder={t.search.placeholder}
          aria-label={t.search.ariaLabel}
          aria-expanded={desktopOpen}
          className="w-full h-9 pl-8 pr-10 rounded-lg bg-[#F4F6F9] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-950 focus:border-[#2563EB] outline-none text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors [&::-webkit-search-cancel-button]:hidden"
        />
        {query ? (
          <button
            type="button"
            aria-label={t.search.clear}
            onClick={() => {
              setQuery("");
              setActiveTab("all");
              setActiveIndex(-1);
              desktopInputRef.current?.focus();
            }}
            className="absolute right-2 p-1 rounded text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <kbd className="hidden xl:inline-block absolute right-2.5 text-[10px] font-mono text-slate-400 dark:text-slate-500 pointer-events-none">
            /
          </kbd>
        )}

        {desktopOpen && (
          <div className="absolute top-[calc(100%+8px)] right-0 w-[420px] lg:w-[460px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50 animate-fade-in">
            {renderResultsBody()}
          </div>
        )}
      </div>

      {/* Mobile Search Trigger Button (< md) */}
      <button
        type="button"
        aria-label={t.search.openSearch}
        aria-expanded={mobileOpen}
        onClick={() => {
          setMobileOpen((prev) => {
            const next = !prev;
            if (next) {
              window.setTimeout(() => mobileInputRef.current?.focus(), 20);
            }
            return next;
          });
        }}
        className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
      >
        {mobileOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
      </button>

      {/* Mobile Search Panel */}
      {mobileOpen && (
        <div className="md:hidden fixed top-16 inset-x-0 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-2xl z-50 px-4 py-3 animate-fade-in">
          <div className="relative flex items-center mb-2">
            <Search
              className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 pointer-events-none"
              aria-hidden="true"
            />
            <input
              ref={mobileInputRef}
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(-1);
              }}
              onKeyDown={handleInputKeyDown}
              placeholder={t.search.placeholder}
              aria-label={t.search.ariaLabel}
              className="w-full h-11 pl-9 pr-9 rounded-lg bg-[#F4F6F9] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:border-[#2563EB] outline-none text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                aria-label={t.search.clear}
                onClick={() => {
                  setQuery("");
                  setActiveTab("all");
                  setActiveIndex(-1);
                  mobileInputRef.current?.focus();
                }}
                className="absolute right-2.5 p-1 rounded text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900">
            {renderResultsBody()}
          </div>
        </div>
      )}
    </div>
  );
}
