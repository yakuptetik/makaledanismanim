import { BadgeCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";
import { useTranslate } from "../LanguageContext";

export function Guarantee() {
  const { t } = useTranslate();

  return (
    <section className="relative py-14 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.75rem] border border-emerald-500/20 bg-emerald-500/[0.08] px-6 py-12 text-center shadow-sm backdrop-blur-xl sm:px-10 sm:py-14">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,oklch(0.78_0.12_75/0.12),transparent_45%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_80%,oklch(0.62_0.12_160/0.1),transparent_40%)]"
              aria-hidden
            />

            <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-5">
              <div className="inline-flex size-14 items-center justify-center rounded-2xl border border-emerald-500/25 bg-emerald-500/15 text-emerald-800">
                <BadgeCheck className="size-7" aria-hidden />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-4xl">{t("guarantee.title")}</h2>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{t("guarantee.description")}</p>
              <a
                href="#iletisim"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-1 rounded-full border border-emerald-600/20 bg-emerald-600/90 px-8 text-white hover:bg-emerald-600",
                )}
              >
                {t("guarantee.cta")}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
