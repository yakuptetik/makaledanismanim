import {
  BookMarked,
  BookOpen,
  ClipboardList,
  FileText,
  PenLine,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/Reveal";
import { useTranslate } from "../LanguageContext";

const icons = [BookOpen, FileText, BookMarked, ClipboardList, PenLine, ShieldCheck];

export function Services() {
  const { t } = useTranslate();
  const items = t("services.items");

  return (
    <section id="hizmetler" className="scroll-mt-24 bg-muted/35 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-medium tracking-wide text-primary">{t("services.eyebrow")}</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {t("services.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("services.description")}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const Icon = icons[index] ?? FileText;
            return (
              <Reveal key={item.title} delay={index * 80}>
                <Card className="h-full rounded-3xl border-border/70 bg-card/90 shadow-sm backdrop-blur-sm transition-all duration-500 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg">
                  <CardHeader className="space-y-2 px-6 pt-6 pb-2">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <CardTitle className="text-lg tracking-tight">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 pt-1">
                    <CardDescription className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
