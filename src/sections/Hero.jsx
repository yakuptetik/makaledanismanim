import { ArrowRight, CheckCircle2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslate } from "../LanguageContext";

export function Hero() {
  const { t } = useTranslate();
  const highlights = t("hero.highlights");

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden pb-8 pt-[4.25rem] lg:pb-10">
      <div className="relative mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-10 lg:px-8">
        <div className="mx-auto flex max-w-xl flex-col items-center space-y-6 text-center motion-safe:animate-[fade-up_1s_cubic-bezier(0.16,1,0.3,1)_both] lg:mx-0 lg:max-w-none lg:items-start lg:space-y-7 lg:text-left">
          <div className="space-y-4">
            <h1 className="text-[1.85rem] font-semibold tracking-[-0.03em] text-foreground sm:text-5xl sm:leading-[1.08] lg:text-[3rem]">
              {t("hero.title")}
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("hero.subtitle")}
            </p>
          </div>

          <ul className="w-full space-y-3 text-left lg:max-w-lg">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-foreground sm:text-base">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <a
              href="#iletisim"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full px-8 shadow-lg shadow-primary/15 motion-safe:hover:scale-[1.02]",
              )}
            >
              {t("hero.button")}
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <a
              href="#hizmetler"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full border-border/80 bg-card/60 px-8 backdrop-blur-xl motion-safe:hover:scale-[1.02]",
              )}
            >
              {t("hero.secondaryButton")}
            </a>
          </div>
        </div>

        <div className="relative hidden motion-safe:animate-[fade-up_1.1s_cubic-bezier(0.16,1,0.3,1)_0.12s_both] lg:block lg:-mr-2 xl:-mr-6">
          <div className="overflow-hidden rounded-[1.75rem] border border-border/70 bg-card/90 p-2.5 shadow-2xl shadow-primary/10 backdrop-blur-xl lg:p-3">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="aspect-video w-full rounded-[1.35rem] object-cover lg:min-h-[min(52vh,28rem)] lg:aspect-auto"
              src="/hero.mp4"
              poster="/og.png"
            />
          </div>

          <div className="absolute -top-3 right-2 rounded-2xl border border-border/80 bg-card/90 px-4 py-2.5 shadow-xl backdrop-blur-xl sm:right-4">
            <p className="text-xs font-semibold text-emerald-700 sm:text-sm">{t("guarantee.short")}</p>
          </div>

          <div className="absolute -bottom-4 -left-2 rounded-2xl border border-border/80 bg-card/90 px-4 py-3 shadow-xl backdrop-blur-xl sm:-left-5">
            <p className="text-2xl font-semibold tracking-tight text-foreground">{t("hero.statValue")}</p>
            <p className="text-xs text-muted-foreground sm:text-sm">{t("hero.statLabel")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
