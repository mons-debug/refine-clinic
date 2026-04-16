import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Avant / Après | Refine Clinic Tanger",
  description: "Découvrez les résultats avant/après de nos soins esthétiques à Tanger : épilation laser, peeling, mésothérapie, traitement cellulite et plus.",
  openGraph: {
    title: "Résultats Avant / Après | Refine Clinic Tanger",
    description: "Résultats réels de nos soins médicaux et esthétiques. Refine Clinic, Tanger.",
    url: "https://refineclinic.ma/fr/avant-apres",
    siteName: "Refine Clinic",
    type: "website",
  },
  alternates: {
    canonical: "https://refineclinic.ma/fr/avant-apres",
    languages: {
      fr: "https://refineclinic.ma/fr/avant-apres",
      ar: "https://refineclinic.ma/ar/avant-apres",
      en: "https://refineclinic.ma/en/avant-apres",
    },
  },
};

import { Link } from "@/lib/navigation";
import { ArrowRight, Shield } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SectionReveal from "@/components/ui/SectionReveal";
import BookingCTA from "@/components/home/BookingCTA";
import AvantApresGrid from "@/components/home/AvantApresGrid";
import { CLINIC } from "@/lib/clinic";

export default async function AvantApresPage() {
  const t = await getTranslations("beforeAfter");
  const tServices = await getTranslations("services");

  const BEFORE_AFTER_ITEMS = CLINIC.services.map((s) => ({
    service: tServices(`${s.nameKey}.name`),
    zone: tServices(`${s.nameKey}.desc`),
    color: s.color,
    slug: s.slug,
  }));

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("disclaimer")}
        breadcrumbs={[{ label: t("title") }]}
        size="default"
      />

      <section className="py-24 lg:py-32 px-6 bg-neutral">
        <div className="mx-auto" style={{ maxWidth: "var(--max-content)" }}>

          {/* Disclaimer banner */}
          <SectionReveal>
            <div className="flex items-start gap-3 p-5 mb-14 bg-white/55 backdrop-blur-xl rounded-xl border border-white/50 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden />
              <p className="font-sans text-sm text-text-soft leading-relaxed">
                <strong className="text-text font-semibold">{t("note")}</strong> {t("disclaimer")} {t("noteDesc")}
              </p>
            </div>
          </SectionReveal>

          {/* Interactive comparison grid */}
          <AvantApresGrid items={BEFORE_AFTER_ITEMS} />

          {/* CTA block */}
          <SectionReveal className="mt-16 text-center">
            <p className="font-sans text-base text-text-soft mb-6 max-w-lg mx-auto leading-relaxed">
              {t("ctaText")}
            </p>
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold px-8 py-3.5 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors shadow-brand"
            >
              {t("bookAppt")}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </SectionReveal>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
