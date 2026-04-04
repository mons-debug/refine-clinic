import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";
import { ArrowRight, Shield, Star, Users, Award } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SectionReveal from "@/components/ui/SectionReveal";
import BookingCTA from "@/components/home/BookingCTA";
import ResultsGrid from "@/components/results/ResultsGrid";
import { CLINIC } from "@/lib/clinic";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Résultats | Refine Clinic Tanger",
  description:
    "Découvrez les résultats et transformations de nos patients à Refine Clinic Tanger. Avant/après, témoignages et cas réels.",
  openGraph: {
    title: "Résultats | Refine Clinic Tanger",
    description:
      "Résultats réels de nos soins médicaux et esthétiques. Refine Clinic, Tanger.",
    url: "https://refineclinic.ma/fr/resultats",
    siteName: "Refine Clinic",
    type: "website",
  },
  alternates: {
    canonical: "https://refineclinic.ma/fr/resultats",
    languages: {
      fr: "https://refineclinic.ma/fr/resultats",
      ar: "https://refineclinic.ma/ar/resultats",
      en: "https://refineclinic.ma/en/resultats",
    },
  },
};

export default async function ResultatsPage() {
  const t = await getTranslations("results");
  const tServices = await getTranslations("services");

  const resultItems = CLINIC.services.map((s) => ({
    slug: s.slug,
    serviceName: tServices(`${s.nameKey}.name`),
    serviceDesc: tServices(`${s.nameKey}.desc`),
    filterType: s.filterType,
    category: s.category,
    color: s.color,
    doctor:
      s.doctor === "meryem"
        ? CLINIC.doctors.meryem.name
        : CLINIC.doctors.amr.name,
  }));

  const filterTabs = [
    { key: "all", label: t("filter_all") },
    { key: "injectable", label: t("filter_injectable") },
    { key: "soins", label: t("filter_soins") },
    { key: "chirurgie", label: t("filter_chirurgie") },
  ];

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbs={[{ label: t("title") }]}
        size="default"
      />

      {/* Trust indicators */}
      <section className="py-10 px-6 bg-white border-b border-neutral-dark">
        <div
          className="mx-auto flex flex-wrap justify-center gap-10 sm:gap-16"
          style={{ maxWidth: "var(--max-content)" }}
        >
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-primary" />
            <div>
              <p className="font-sans text-lg font-bold text-text">500+</p>
              <p className="font-sans text-xs text-text-soft">{t("trust_patients")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Star className="w-5 h-5 text-primary" />
            <div>
              <p className="font-sans text-lg font-bold text-text">4.9/5</p>
              <p className="font-sans text-xs text-text-soft">{t("trust_rating")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-primary" />
            <div>
              <p className="font-sans text-lg font-bold text-text">18</p>
              <p className="font-sans text-xs text-text-soft">{t("trust_treatments")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 px-6 bg-neutral">
        <div className="mx-auto" style={{ maxWidth: "var(--max-content)" }}>
          <SectionReveal>
            <div className="flex items-start gap-3 p-5 bg-white rounded-xl border border-neutral-dark shadow-brand">
              <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden />
              <p className="font-sans text-sm text-text-soft leading-relaxed">
                <strong className="text-text font-semibold">{t("disclaimer_title")}</strong>{" "}
                {t("disclaimer_text")}
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Results grid with filters */}
      <section className="py-16 lg:py-24 px-6 bg-neutral">
        <div className="mx-auto" style={{ maxWidth: "var(--max-content)" }}>
          <ResultsGrid
            items={resultItems}
            filterTabs={filterTabs}
            beforeLabel={t("before")}
            afterLabel={t("after")}
            ctaLabel={t("cta_want")}
            storyPlaceholder={t("story_placeholder")}
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 bg-neutral-dark">
        <div className="mx-auto text-center" style={{ maxWidth: "600px" }}>
          <SectionReveal>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-text mb-4">
              {t("bottom_headline")}
            </h2>
            <p className="font-sans text-base text-text-soft mb-8 leading-relaxed">
              {t("bottom_text")}
            </p>
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold px-8 py-3.5 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors shadow-brand"
            >
              {t("bottom_cta")}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </SectionReveal>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
