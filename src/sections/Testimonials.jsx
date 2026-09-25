import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/Reveal";
import { useTranslate } from "../LanguageContext";

export function Testimonials() {
  const { t } = useTranslate();
  const items = t("testimonials.items");

  return (
    <section id="referanslar" className="scroll-mt-24 bg-muted/35 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-medium tracking-wide text-primary">{t("testimonials.eyebrow")}</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {t("testimonials.title")}
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.name} delay={index * 100}>
              <Card className="h-full rounded-3xl border-border/70 bg-card/90 shadow-sm">
                <CardContent className="space-y-5 pt-6">
                  <Quote className="size-7 text-primary/25" aria-hidden />
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    “{item.text}”
                  </p>
                  <div className="border-t border-border/70 pt-4">
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.position}</p>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
