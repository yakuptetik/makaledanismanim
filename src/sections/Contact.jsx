import { useCallback, useState } from "react";
import { Loader2 } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { AmbientLights } from "@/components/AmbientLights";
import { FormNotice } from "@/components/FormNotice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/Reveal";
import { submitContactLead } from "@/lib/submitContact";
import { useTranslate } from "../LanguageContext";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  institution: "",
  thesisTopic: "",
  message: "",
};

const fieldClassName =
  "h-12 border-border/70 bg-background/75 px-4 text-base shadow-inner shadow-primary/5 backdrop-blur-sm";

export function Contact() {
  const { lang, t } = useTranslate();
  const placeholders = t("contact.placeholders");

  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const closeNotice = useCallback(() => setStatus(""), []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue = name === "phone" ? value.replace(/\D/g, "") : value;
    setForm((prev) => ({ ...prev, [name]: nextValue }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");

    const requiredFields = ["name", "email", "phone", "institution", "thesisTopic", "message"];
    const hasEmpty = requiredFields.some((field) => !form[field]?.trim());

    if (hasEmpty) {
      setStatus("error");
      return;
    }

    setIsSubmitting(true);

    try {
      await submitContactLead({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        institution: form.institution.trim(),
        thesis_topic: form.thesisTopic.trim(),
        message: form.message.trim(),
        locale: lang,
      });
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("serverError");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="iletisim" className="relative scroll-mt-24 overflow-hidden py-16 sm:py-24">
      <AmbientLights />

      {status && (
        <FormNotice
          type={status}
          message={t(`contact.${status}`)}
          onClose={closeNotice}
        />
      )}

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <p className="text-sm font-medium tracking-wide text-primary">{t("contact.eyebrow")}</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {t("contact.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{t("contact.description")}</p>

            <div className="mt-6 flex justify-center">
              <a
                href="https://www.instagram.com/makaledanismanim/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <InstagramIcon className="size-4 text-primary" />
                @makaledanismanim
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100} className="mt-10">
          <div className="rounded-[1.75rem] border border-primary/15 bg-gradient-to-br from-primary/[0.06] via-muted/50 to-emerald-500/[0.08] p-6 shadow-xl shadow-primary/10 sm:p-8">
            <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="name">{placeholders.name}</Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={placeholders.name}
                  className={fieldClassName}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{placeholders.email}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={placeholders.email}
                  className={fieldClassName}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{placeholders.phone}</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder={placeholders.phone}
                  className={fieldClassName}
                  required
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="institution">{placeholders.institution}</Label>
                <Input
                  id="institution"
                  name="institution"
                  value={form.institution}
                  onChange={handleChange}
                  placeholder={placeholders.institution}
                  className={fieldClassName}
                  required
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="thesisTopic">{placeholders.thesisTopic}</Label>
                <Input
                  id="thesisTopic"
                  name="thesisTopic"
                  value={form.thesisTopic}
                  onChange={handleChange}
                  placeholder={placeholders.thesisTopic}
                  className={fieldClassName}
                  required
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="message">{placeholders.message}</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={placeholders.message}
                  rows={6}
                  className="min-h-36 border-border/70 bg-background/75 px-4 py-3 text-base shadow-inner shadow-primary/5 backdrop-blur-sm"
                  required
                />
              </div>
              <div className="flex justify-center pt-1 sm:col-span-2">
                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full rounded-full sm:w-auto sm:min-w-64">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden />
                      {t("contact.sending")}
                    </>
                  ) : (
                    t("contact.button")
                  )}
                </Button>
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
