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
  const tSp = await getTranslations("servicePage");
  const tInd = await getTranslations("services.indications");
  const tAreas = await getTranslations("areas");

  const services = CLINIC.services.map((s) => {
    const key = s.nameKey;
    const doctorData = s.doctor === "meryem" ? CLINIC.doctors.meryem : CLINIC.doctors.amr;

    // Translate indications
    const indications = s.indications.map((ind) => {
      try { return tInd(ind); } catch { return ind; }
    });

    return {
      // Card data (existing)
      slug: s.slug,
      name: t(`${key}.name`),
      shortDesc: t(`${key}.desc`),
      image: s.image,
      color: s.color,
      filterType: s.filterType,
      category: s.category,
      area: [...s.area],
      doctorName: doctorData.name,
      learnMore: t("learnMore"),
      // Detail data (new — for expand-in-place)
      description: t(`${key}.description`),
      pageSubtitle: t(`${key}.page_subtitle`),
      doctorTitle: doctorData.title,
      sessions: t(`${key}.sessions`),
      forWho: t(`${key}.forWho`),
      indications,
      steps: [
        { title: t(`${key}.step1_title`), desc: t(`${key}.step1_desc`) },
        { title: t(`${key}.step2_title`), desc: t(`${key}.step2_desc`) },
        { title: t(`${key}.step3_title`), desc: t(`${key}.step3_desc`) },
        { title: t(`${key}.step4_title`), desc: t(`${key}.step4_desc`) },
      ],
      benefits: [
        t(`${key}.benefit1`),
        t(`${key}.benefit2`),
        t(`${key}.benefit3`),
        t(`${key}.benefit4`),
      ],
      faq: [
        { q: t(`${key}.faq1_q`), a: t(`${key}.faq1_a`) },
        { q: t(`${key}.faq2_q`), a: t(`${key}.faq2_a`) },
        { q: t(`${key}.faq3_q`), a: t(`${key}.faq3_a`) },
        { q: t(`${key}.faq4_q`), a: t(`${key}.faq4_a`) },
      ],
      beforeImage: (s as any).beforeAfter?.before,
      afterImage: (s as any).beforeAfter?.after,
    };
  });

  const typeTabs = [
    { key: "all", label: t("filter_all") },
    { key: "injectable", label: t("filter_injectable") },
    { key: "soins", label: t("filter_soins") },
    { key: "chirurgie", label: t("filter_chirurgie") },
  ];

  const areaLabels: Record<string, string> = {};
  for (const key of ["front","yeux","nez","levres","cou","machoire","corps","ventre","bras","cuisses","cheveux","poitrine"]) {
    areaLabels[key] = tAreas(key);
  }

  // UI labels for expanded detail
  const detailLabels = {
    whatIsIt: tSp("whatIsIt"),
    howItWorks: tSp("howItWorks"),
    benefits: tSp("benefits"),
    forWho: tSp("forWho"),
    faqTitle: tSp("faqTitle"),
    sessionsLabel: tSp("sessions_label"),
    indicationsTitle: tInd("title"),
    beforeAfterTitle: tSp("beforeAfterTitle"),
    bookCta: tSp("bookCta"),
    whatsappCta: tSp("whatsappCta"),
    interested: tSp("interested"),
    interestedDesc: tSp("interestedDesc"),
    performedBy: tSp("performedBy"),
    viewFullPage: tSp("viewAllResults"),
  };

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
              areaLabels={areaLabels}
              noResults={t("no_results")}
              detailLabels={detailLabels}
            />
          </Suspense>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
