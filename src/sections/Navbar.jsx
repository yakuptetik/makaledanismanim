import { useEffect, useState } from "react";
import { BookOpen, Languages } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslate } from "../LanguageContext";

const links = [
  { key: "nav.services", href: "#hizmetler" },
  { key: "nav.process", href: "#surec" },
  { key: "nav.about", href: "#hakkimizda" },
  { key: "nav.contact", href: "#iletisim" },
];

export function Navbar() {
  const { lang, setLang, t } = useTranslate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "left-0 right-0 top-0 z-50 transition-all duration-300 motion-safe:duration-500",
        scrolled
          ? "fixed border-b border-border/60 bg-background/85 shadow-sm backdrop-blur-2xl backdrop-saturate-150"
          : "absolute border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2.5 text-foreground transition-opacity hover:opacity-80">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <BookOpen className="size-4" aria-hidden />
          </span>
          <span className="text-base font-semibold tracking-tight sm:text-lg">Makale Danışmanım</span>
        </a>

        <div className="hidden items-center gap-0.5 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground"
            >
              {t(link.key)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="default"
            onClick={() => setLang(lang === "tr" ? "en" : "tr")}
            className="rounded-full gap-1.5"
          >
            <Languages className="size-4" aria-hidden />
            {lang === "tr" ? "EN" : "TR"}
          </Button>
          <a href="#iletisim" className={cn(buttonVariants({ size: "default" }), "hidden rounded-full sm:inline-flex")}>
            {t("nav.cta")}
          </a>
        </div>
      </nav>
    </header>
  );
}
