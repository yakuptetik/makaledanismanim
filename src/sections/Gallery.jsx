import { Reveal } from "@/components/Reveal";
import { useTranslate } from "../LanguageContext";

const images = [
  { src: "/image-1.webp", alt: "Akademik çalışma 1" },
  { src: "/image-2.webp", alt: "Akademik çalışma 2" },
  { src: "/image-3.webp", alt: "Akademik çalışma 3" },
];

export function Gallery() {
  const { t } = useTranslate();

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-sm font-medium tracking-wide text-primary">{t("gallery.eyebrow")}</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {t("gallery.title")}
            </h2>
            <p className="mt-4 text-muted-foreground">{t("gallery.description")}</p>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
          {images.map((image, index) => (
            <Reveal key={image.src} delay={index * 120}>
              <div className="group overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm transition-transform duration-500 motion-safe:group-hover:scale-[1.02]">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
