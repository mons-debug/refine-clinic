import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { CLINIC } from "@/lib/clinic";
import PageHeader from "@/components/ui/PageHeader";
import BookingCTA from "@/components/home/BookingCTA";
import ServicesFilterGrid from "@/components/services/ServicesFilterGrid";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nos Soins | Refine Clinic Tanger",
  description:
    "Découvrez tous nos soins médicaux et esthétiques à Tanger : Botox, fillers, fils tenseurs, épilation laser, chirurgie plastique et plus encore.",
  openGraph: {
    title: "Nos Soins | Refine Clinic Tanger",
    description:
      "Protocoles médicaux et esthétiques personnalisés à Tanger. Dr. Meryem & Dr. Amr.",
    url: "https://refineclinic.ma/fr/services",
    siteName: "Refine Clinic",
    type: "website",
  },
  alternates: {
    canonical: "https://refineclinic.ma/fr/services",
    languages: {
      fr: "https://refineclinic.ma/fr/services",
      ar: "https://refineclinic.ma/ar/services",
      en: "https://refineclinic.ma/en/services",
    },
  },
};

export default async function ServicesPage() {
  const t = await getTranslations("services");

  const services = CLINIC.services.map((s) => ({
    slug: s.slug,
    name: t(`${s.nameKey}.name`),
    desc: t(`${s.nameKey}.description`),
    image: s.image,
    color: s.color,
    filterType: s.filterType,
    area: [...s.area],
    doctorName:
      s.doctor === "meryem"
        ? CLINIC.doctors.meryem.name
        : CLINIC.doctors.amr.name,
    learnMore: t("learnMore"),
  }));

  const typeTabs = [
    { key: "all", label: t("filter_all") },
    { key: "injectable", label: t("filter_injectable") },
    { key: "soins", label: t("filter_soins") },
    { key: "chirurgie", label: t("filter_chirurgie") },
  ];

  const areaTabs = [
    { key: "all", label: t("filter_all") },
    { key: "visage", label: t("filter_visage") },
    { key: "corps", label: t("filter_corps") },
  ];

  return (
    <>
      <PageHeader
        title={t("overview_title")}
        subtitle={t("overview_subtitle")}
        breadcrumbs={[{ label: t("title") }]}
        size="default"
      />

      <section className="py-20 lg:py-28 px-6 bg-neutral">
        <div className="mx-auto" style={{ maxWidth: "var(--max-content)" }}>
          <Suspense>
            <ServicesFilterGrid
              services={services}
              typeTabs={typeTabs}
              areaTabs={areaTabs}
              noResults={t("no_results")}
            />
          </Suspense>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
