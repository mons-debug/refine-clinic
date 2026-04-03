import { getTranslations } from "next-intl/server";
import ServicesGrid from "@/components/home/ServicesGrid";
import type { ServiceCardData } from "@/components/home/ServicesGrid";
import ServicesHeader from "@/components/home/ServicesHeader";
import { CLINIC } from "@/lib/clinic";

export default async function ServicesOverview() {
  const t = await getTranslations("services");

  const buildServiceList = (category: "aesthetic" | "surgery"): ServiceCardData[] =>
    CLINIC.services
      .filter((s) => s.category === category)
      .map((s) => {
        const tagsRaw = t(`${s.nameKey}.tags`);
        return {
          slug: s.slug,
          icon: s.icon,
          color: s.color,
          name: t(`${s.nameKey}.name`),
          desc: t(`${s.nameKey}.desc`),
          description: t(`${s.nameKey}.description`),
          tags: tagsRaw ? tagsRaw.split(",").map((tag: string) => tag.trim()) : [],
          learnMore: t("learnMore"),
          doctorName:
            s.doctor === "meryem"
              ? CLINIC.doctors.meryem.name
              : CLINIC.doctors.amr.name,
          category: s.category,
          image: s.image,
        };
      });

  const aesthetic = buildServiceList("aesthetic");
  const surgery = buildServiceList("surgery");

  return (
    <section className="relative py-24 lg:py-32 px-6 bg-neutral overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-[0.07] blur-[100px] pointer-events-none"
        style={{ background: "var(--color-primary)" }}
      />
      <div className="relative mx-auto" style={{ maxWidth: "var(--max-content)" }}>
        <ServicesHeader
          eyebrow={t("tab_aesthetic")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <ServicesGrid
          aesthetic={aesthetic}
          surgery={surgery}
          tabAesthetic={t("tab_aesthetic")}
          tabSurgery={t("tab_surgery")}
          featuredLabel={t("featured_label")}
          ctaPhoneLabel={t("cta_phone_label")}
          ctaButton={t("cta_button")}
          phone={CLINIC.phone1}
          bookingHref="/consultation"
          viewAllLabel={t("overview_title")}
        />
      </div>
    </section>
  );
}
