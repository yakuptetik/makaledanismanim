import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { useTranslate } from "../LanguageContext";

export function Footer() {
  const { t } = useTranslate();

  return (
    <footer className="border-t border-border/70 bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold tracking-tight text-foreground">Makale Danışmanım</p>
        <p className="max-w-xl text-sm text-muted-foreground">{t("footer.tagline")}</p>
        <a
          href="https://www.instagram.com/makaledanismanim/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card px-4 py-2 text-sm text-foreground transition-colors hover:bg-muted"
        >
          <InstagramIcon className="size-4" />
          @makaledanismanim
        </a>
        <p className="text-xs text-muted-foreground">{t("footer.rights")}</p>
      </div>
    </footer>
  );
}
