import { Check, ArrowRight } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

export function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const { t } = useLanguage();

  return (
    <section
      id="pricing"
      className="py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] font-semibold text-[#2563EB] dark:text-blue-400 mb-2">
              {t.pricing.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-950 dark:text-white tracking-tight">
              {t.pricing.title}
            </h2>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md leading-relaxed">
            {t.pricing.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {t.pricing.plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-8 flex flex-col justify-between transition-colors ${
                plan.popular
                  ? "bg-[#0B1120] text-white border-[#0B1120] dark:border-blue-500/40"
                  : "bg-[#F4F6F9] dark:bg-slate-950 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className={`font-mono text-xs font-bold uppercase tracking-[0.18em] ${
                      plan.popular ? "text-blue-400" : "text-[#2563EB] dark:text-blue-400"
                    }`}
                  >
                    {plan.name}
                  </span>
                  {plan.popular && (
                    <span className="font-mono text-[11px] text-blue-300">
                      {t.pricing.recommended}
                    </span>
                  )}
                </div>

                <div className="mb-3">
                  <span className="font-display text-3xl font-extrabold">
                    {plan.price}
                  </span>
                  <span
                    className={`ml-2 text-xs font-mono ${
                      plan.popular ? "text-slate-400" : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    / {plan.cadence}
                  </span>
                </div>

                <p
                  className={`text-sm leading-relaxed mb-6 ${
                    plan.popular ? "text-slate-300" : "text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {plan.desc}
                </p>

                <div
                  className={`border-t pt-6 mb-8 ${
                    plan.popular ? "border-slate-800" : "border-slate-200 dark:border-slate-800"
                  }`}
                >
                  <ul className="space-y-3">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            plan.popular ? "text-blue-400" : "text-[#2563EB] dark:text-blue-400"
                          }`}
                        />
                        <span
                          className={`text-xs sm:text-sm ${
                            plan.popular ? "text-slate-200" : "text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectPlan(plan.name)}
                className={`w-full py-3.5 px-4 rounded-lg font-bold text-xs tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0 ${
                  plan.popular
                    ? "bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
                    : "bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-[#2563EB] dark:hover:border-blue-400 text-slate-900 dark:text-white hover:text-[#2563EB] dark:hover:text-blue-400"
                }`}
              >
                <span>{plan.action}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
