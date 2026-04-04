import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PageHeader from "@/components/ui/PageHeader";
import SectionReveal from "@/components/ui/SectionReveal";
import { CLINIC } from "@/lib/clinic";
import { Link } from "@/lib/navigation";
import { ArrowRight } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal");
  return {
    title: `${t("title")} | Refine Clinic Tanger`,
    description: t("subtitle"),
  };
}

export default async function MentionsLegalesPage() {
  const t = await getTranslations("legal");

  const sections = [
    {
      title: t("clinicInfo"),
      content: (
        <div className="space-y-2 font-sans text-sm text-text-soft leading-relaxed">
          <p><strong className="text-text">{t("clinicName")}:</strong> {CLINIC.name}</p>
          <p><strong className="text-text">{t("clinicAddress")}:</strong> {CLINIC.address.full}</p>
          <p><strong className="text-text">{t("clinicPhone")}:</strong> {CLINIC.phone1} / {CLINIC.phone2}</p>
          <p><strong className="text-text">{t("clinicEmail")}:</strong> {CLINIC.email}</p>
        </div>
      ),
    },
    {
      title: t("privacyTitle"),
      content: <p className="font-sans text-sm text-text-soft leading-relaxed">{t("privacyDesc")}</p>,
    },
    {
      title: t("dataTitle"),
      content: <p className="font-sans text-sm text-text-soft leading-relaxed">{t("dataDesc")}</p>,
    },
    {
      title: t("cookiesTitle"),
      content: <p className="font-sans text-sm text-text-soft leading-relaxed">{t("cookiesDesc")}</p>,
    },
    {
      title: t("rightsTitle"),
      content: <p className="font-sans text-sm text-text-soft leading-relaxed">{t("rightsDesc")}</p>,
    },
    {
      title: t("contactTitle"),
      content: (
        <div className="space-y-2 font-sans text-sm text-text-soft leading-relaxed">
          <p>{t("contactDesc")}</p>
          <p>
            <strong className="text-text">{t("clinicEmail")}:</strong>{" "}
            <a href={`mailto:${CLINIC.email}`} className="text-primary hover:underline">{CLINIC.email}</a>
          </p>
          <p>
            <strong className="text-text">{t("clinicPhone")}:</strong> {CLINIC.phone1}
          </p>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbs={[{ label: t("title") }]}
        size="default"
      />

      <section className="py-24 lg:py-32 px-6 bg-neutral">
        <div className="mx-auto max-w-3xl" style={{ maxWidth: "var(--max-content)" }}>
          <div className="max-w-3xl mx-auto space-y-10">
            {sections.map(({ title, content }, i) => (
              <SectionReveal key={i} delay={i * 0.05}>
                <div className="bg-white rounded-2xl p-8 shadow-brand">
                  <h2 className="font-serif text-xl sm:text-2xl font-light text-text mb-5">{title}</h2>
                  <div className="w-10 h-px bg-primary mb-6" />
                  {content}
                </div>
              </SectionReveal>
            ))}

            <SectionReveal className="text-center mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 font-sans text-sm font-semibold px-8 py-3.5 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors shadow-brand"
              >
                {t("contactTitle")}
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </SectionReveal>
          </div>
        </div>
      </section>
    </>
  );
}
