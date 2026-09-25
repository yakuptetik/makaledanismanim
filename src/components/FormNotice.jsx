import { useEffect } from "react";
import { CheckCircle2, TriangleAlert, X } from "lucide-react";
import { cn } from "@/lib/utils";

const styles = {
  success: {
    wrap: "border-emerald-500/30 bg-emerald-50/95 text-emerald-900",
    icon: CheckCircle2,
  },
  error: {
    wrap: "border-destructive/30 bg-destructive/10 text-destructive",
    icon: TriangleAlert,
  },
  serverError: {
    wrap: "border-destructive/30 bg-destructive/10 text-destructive",
    icon: TriangleAlert,
  },
};

export function FormNotice({ type, message, onClose }) {
  const config = styles[type] ?? styles.error;
  const Icon = config.icon;

  useEffect(() => {
    const timer = window.setTimeout(onClose, 5200);
    return () => window.clearTimeout(timer);
  }, [onClose, type]);

  return (
    <div
      role={type === "success" ? "status" : "alert"}
      className={cn(
        "fixed inset-x-4 top-24 z-[120] mx-auto flex max-w-md items-start gap-3 rounded-2xl border px-4 py-4 shadow-2xl backdrop-blur-xl motion-safe:animate-[fade-up_0.35s_cubic-bezier(0.16,1,0.3,1)_both] sm:right-6 sm:left-auto sm:mx-0",
        config.wrap,
      )}
    >
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden />
      <p className="flex-1 text-sm leading-relaxed sm:text-base">{message}</p>
      <button
        type="button"
        onClick={onClose}
        className="rounded-md p-1 opacity-70 transition-opacity hover:opacity-100"
        aria-label="Kapat"
      >
        <X className="size-4" aria-hidden />
      </button>
    </div>
  );
}
