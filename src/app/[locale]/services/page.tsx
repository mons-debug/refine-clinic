import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { CLINIC } from "@/lib/clinic";
import BookingCTA from "@/components/home/BookingCTA";
import ServicesFilterGrid from "@/components/services/ServicesFilterGrid";
import BrowseModeToggle from "@/components/services/BrowseModeToggle";
import { AREA_KEYS } from "@/lib/area-icons";

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

    const indications = s.indications.map((ind) => {
      try { return tInd(ind); } catch { return ind; }
    });

    return {
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
  for (const key of AREA_KEYS) {
    areaLabels[key] = tAreas(key);
  }

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
      {/* Hero — custom, no PageHeader */}
      <section
        className="relative pt-28 pb-14 sm:pt-32 sm:pb-16 px-6 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, var(--color-neutral) 0%, var(--color-neutral-dark) 50%, var(--color-tertiary) 100%)",
        }}
      >
        <div className="mx-auto flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6" style={{ maxWidth: "var(--max-content)" }}>
          <div className="lg:max-w-xl">
            <p className="font-sans text-[11px] tracking-[0.35em] uppercase text-primary font-semibold mb-4">
              {t("title")}
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-light text-text leading-tight mb-4">
              {t("overview_title")}
            </h1>
            <div className="w-10 h-[2px] rounded-full mb-4" style={{ background: "var(--color-tertiary)" }} />
            <p className="font-sans text-base text-text-soft leading-relaxed max-w-lg">
              {t("overview_subtitle")}
            </p>
          </div>
          <div className="hidden lg:block">
            <p className="font-sans text-sm text-text-soft">
              {services.length} {services.length === 1 ? "soin" : "soins"}
            </p>
          </div>
        </div>
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 inset-x-0 h-20"
          style={{ background: "linear-gradient(to bottom, transparent 0%, var(--color-neutral) 100%)" }}
        />
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16 px-6" style={{ background: "var(--color-neutral)" }}>
        <div className="mx-auto" style={{ maxWidth: "var(--max-content)" }}>
          <BrowseModeToggle active="services" />
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
