import { useState, useEffect } from "react";
import {
  Code,
  GraduationCap,
  Laptop,
  Settings,
  Server,
  Cloud,
  ArrowUpRight,
} from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import type { ServiceCategory } from "../data/siteData";

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
  highlightedServiceId?: number | null;
}

const SERVICE_ICONS = {
  code: Code,
  graduation: GraduationCap,
  laptop: Laptop,
  cog: Settings,
  server: Server,
  cloud: Cloud,
};

type ServiceFilter = "All" | ServiceCategory;

const FILTER_OPTIONS: ServiceFilter[] = [
  "All",
  "Development",
  "Consulting",
  "Infrastructure",
];

export function ServicesSection({
  onSelectService,
  highlightedServiceId,
}: ServicesSectionProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<ServiceFilter>("All");

  // Ensure a service targeted from NavbarSearch is always visible
  useEffect(() => {
    if (highlightedServiceId == null) return;
    const match = t.services.items.find((s) => s.id === highlightedServiceId);
    if (match && selectedCategory !== "All" && match.category !== selectedCategory) {
      setSelectedCategory("All");
    }
  }, [highlightedServiceId, selectedCategory, t.services.items]);

  const filteredServices =
    selectedCategory === "All"
      ? t.services.items
      : t.services.items.filter((service) => service.category === selectedCategory);

  const getCategoryLabel = (cat: ServiceFilter) =>
    cat === "All" ? t.services.categories.all : t.services.categories[cat];

  return (
    <section
      id="services"
      className="py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-[#2563EB] dark:text-blue-400 mb-2">
              {t.services.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white tracking-tight">
              {t.services.title}
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md">
            {t.services.subtitle}
          </p>
        </div>

        {/* Category Filter Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div
            role="group"
            aria-label="Filter services by category"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F4F6F9] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl w-fit"
          >
            {FILTER_OPTIONS.map((category) => {
              const isSelected = selectedCategory === category;
              const count =
                category === "All"
                  ? t.services.items.length
                  : t.services.items.filter((item) => item.category === category).length;

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedCategory(category)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
                    isSelected
                      ? "bg-[#0B1120] dark:bg-[#2563EB] text-white"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-white dark:hover:bg-slate-900"
                  }`}
                >
                  <span>{getCategoryLabel(category)}</span>
                  <span
                    className={`font-mono text-[11px] tabular-nums ${
                      isSelected
                        ? "text-slate-300 dark:text-blue-100"
                        : "text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="font-mono text-xs text-slate-500 dark:text-slate-400 tabular-nums">
            {t.services.showingCount(filteredServices.length, t.services.items.length)}
          </p>
        </div>

        {/* Hairline Service Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${
            filteredServices.length > 2 ? "lg:grid-cols-3" : "lg:grid-cols-2"
          } gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden mb-16`}
        >
          {filteredServices.map((service) => {
            const Icon = SERVICE_ICONS[service.icon];
            const isHighlighted = highlightedServiceId === service.id;
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => onSelectService(service.title)}
                className={`text-left p-7 flex flex-col justify-between group cursor-pointer transition-colors ${
                  isHighlighted
                    ? "bg-blue-50/90 dark:bg-blue-950/60 ring-2 ring-inset ring-[#2563EB]"
                    : "bg-white dark:bg-slate-950 hover:bg-[#F4F6F9] dark:hover:bg-slate-900"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-400 dark:text-slate-500 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors">
                      <span className="tabular-nums">{service.code}</span>
                      <span aria-hidden="true">·</span>
                      <span>{t.services.categories[service.category]}</span>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 group-hover:border-[#2563EB]/30 transition-colors shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-slate-950 dark:text-white text-lg mb-2 leading-snug group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors flex items-center justify-between gap-2">
                    <span>{service.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 shrink-0" />
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 pt-4 mt-auto w-full">
                  <ul className="space-y-1.5">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="text-xs font-mono text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors"
                      >
                        / {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </button>
            );
          })}
        </div>

        {/* Delivery Process Strip */}
        <div className="bg-[#0B1120] dark:bg-slate-950 dark:border dark:border-slate-800 text-white rounded-2xl p-8 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 pb-6 border-b border-slate-800">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-blue-400 mb-1.5">
                {t.services.workflowEyebrow}
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                {t.services.workflowTitle}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md">
              {t.services.workflowSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.services.steps.map((item) => (
              <div key={item.step} className="space-y-2">
                <span className="font-mono text-xs font-bold text-blue-400 tabular-nums block">
                  {item.step}.
                </span>
                <h4 className="font-display font-bold text-lg text-white">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
