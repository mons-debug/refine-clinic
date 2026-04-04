import { getTranslations } from "next-intl/server";
import ServicesHeader from "@/components/home/ServicesHeader";
import ServicesFocusCards from "@/components/home/ServicesFocusCards";
import { CLINIC } from "@/lib/clinic";

export default async function ServicesOverview() {
  const t = await getTranslations("services");

  const categories = [
    {
      title: t("category_injectables"),
      subtitle: t("category_injectables_subtitle"),
      services: CLINIC.services
        .filter((s) => s.filterType === "injectable")
        .map((s) => t(`${s.nameKey}.name`)),
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=600&fit=crop&q=80",
      href: "/services?type=injectable",
      ctaLabel: t("category_cta"),
    },
    {
      title: t("category_soins"),
      subtitle: t("category_soins_subtitle"),
      services: CLINIC.services
        .filter((s) => s.filterType === "soins")
        .map((s) => t(`${s.nameKey}.name`)),
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop&q=80",
      href: "/services?type=soins",
      ctaLabel: t("category_cta"),
    },
    {
      title: t("category_chirurgie"),
      subtitle: t("category_chirurgie_subtitle"),
      services: CLINIC.services
        .filter((s) => s.filterType === "chirurgie")
        .slice(0, 4)
        .map((s) => t(`${s.nameKey}.name`)),
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop&q=80",
      href: "/services?type=chirurgie",
      ctaLabel: t("category_cta"),
    },
  ];

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
        <ServicesFocusCards categories={categories} />
      </div>
    </section>
  );
}
