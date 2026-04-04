import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";
import { CLINIC } from "@/lib/clinic";
import BeforeAfterCards from "@/components/home/BeforeAfterCards";
import BeforeAfterHeader from "@/components/home/BeforeAfterHeader";

export default async function BeforeAfterSection() {
  const t = await getTranslations("beforeAfter");

  const cards = [
    {
      label: "Épilation Laser",
      note: t("result_laser_note"),
      doctor: CLINIC.doctors.meryem.name,
      color: "#A65D46",
      beforeLabel: t("before"),
      afterLabel: t("after"),
      beforeImage: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1280&h=720&fit=crop&q=80",
      afterImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1280&h=720&fit=crop&q=80",
    },
    {
      label: "Soin Visage",
      note: t("result_visage_note"),
      doctor: CLINIC.doctors.meryem.name,
      color: "#8C736A",
      beforeLabel: t("before"),
      afterLabel: t("after"),
      beforeImage: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1280&h=720&fit=crop&q=80",
      afterImage: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1280&h=720&fit=crop&q=80",
    },
    {
      label: "Peeling Chimique",
      note: t("result_peeling_note"),
      doctor: CLINIC.doctors.meryem.name,
      color: "#D9BBA9",
      beforeLabel: t("before"),
      afterLabel: t("after"),
      beforeImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1280&h=720&fit=crop&q=80",
      afterImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1280&h=720&fit=crop&q=80",
    },
    {
      label: "Liposuccion 4D",
      note: t("result_lipo_note"),
      doctor: CLINIC.doctors.amr.name,
      color: "#A65D46",
      beforeLabel: t("before"),
      afterLabel: t("after"),
      beforeImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1280&h=720&fit=crop&q=80",
      afterImage: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1280&h=720&fit=crop&q=80",
    },
  ];

  return (
    <section className="py-24 lg:py-32 px-6 bg-neutral-dark">
      <div className="mx-auto" style={{ maxWidth: "var(--max-content)" }}>
        <BeforeAfterHeader
          eyebrow={t("eyebrow")}
          headline={t("headline")}
          headlineAccent={t("headline_accent")}
          instruction={t("instruction")}
        />

        <BeforeAfterCards cards={cards} />

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-neutral-dark">
          <p className="font-sans text-[12px] text-text-soft/60 italic">
            * {t("disclaimer")}
          </p>
          <Link
            href="/resultats"
            className="font-sans text-[11px] font-semibold tracking-[0.12em] uppercase text-primary border border-primary px-6 py-2.5 hover:bg-primary hover:text-white transition-colors"
          >
            {t("viewAll")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
