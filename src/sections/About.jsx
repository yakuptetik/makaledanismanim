import { Bot, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useTranslate } from "../LanguageContext";

const featureIcons = [Bot, ShieldCheck, Sparkles];

export function About() {
  const { t } = useTranslate();
  const features = t("about.features");

  return (
    <section id="hakkimizda" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
        <Reveal className="relative order-2 lg:order-1">
          <div className="overflow-hidden rounded-[1.75rem] border border-border/70 bg-card shadow-xl">
            <img
              src="/features.webp"
              alt=""
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
            />
          </div>
        </Reveal>

        <div className="order-1 space-y-6 lg:order-2">
          <Reveal>
            <div>
              <p className="text-sm font-medium tracking-wide text-primary">{t("about.eyebrow")}</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {t("about.title")}
              </h2>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{t("about.content")}</p>
          </Reveal>

          <Reveal delay={140}>
            <p className="rounded-2xl border border-border/80 bg-secondary/50 px-4 py-3 text-sm font-medium text-foreground sm:text-base">
              {t("about.highlight")}
            </p>
          </Reveal>

          <ul className="grid gap-3">
            {features.map((feature, index) => {
              const Icon = featureIcons[index] ?? ShieldCheck;
              return (
                <Reveal key={feature.title} delay={180 + index * 70}>
                  <li className="flex gap-3 rounded-2xl border border-border/70 bg-card/90 p-4 backdrop-blur-sm">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-4" aria-hidden />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{feature.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
