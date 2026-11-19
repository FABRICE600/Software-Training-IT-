import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

interface ToastItem {
  id: number;
  title: string;
  description?: string;
}

interface ToastContextValue {
  showSuccessToast: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_DURATION_MS = 4500;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextIdRef = useRef(1);
  const shouldReduceMotion = useReducedMotion();

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const showSuccessToast = useCallback(
    (title: string, description?: string) => {
      const id = nextIdRef.current++;
      setToasts((prev) => [...prev.slice(-2), { id, title, description }]);

      window.setTimeout(() => {
        dismissToast(id);
      }, TOAST_DURATION_MS);
    },
    [dismissToast]
  );

  return (
    <ToastContext.Provider value={{ showSuccessToast }}>
      {children}

      {/* Animated Toast Viewport */}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="fixed top-20 right-4 sm:right-6 z-50 flex flex-col gap-2.5 w-[calc(100vw-2rem)] sm:w-96 pointer-events-none"
      >
        <AnimatePresence initial={false}>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              role="status"
              layout={!shouldReduceMotion}
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -16, scale: 0.96 }
              }
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, scale: 1 }
              }
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -12, scale: 0.96 }
              }
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto relative overflow-hidden bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/80 rounded-xl shadow-2xl p-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-display text-sm font-bold text-slate-950 dark:text-white leading-snug">
                    {toast.title}
                  </p>
                  {toast.description && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {toast.description}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => dismissToast(toast.id)}
                  aria-label="Dismiss notification"
                  className="p-1 rounded-md text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {!shouldReduceMotion && (
                <motion.div
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-emerald-500 dark:bg-emerald-400"
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{
                    duration: TOAST_DURATION_MS / 1000,
                    ease: "linear",
                  }}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}
