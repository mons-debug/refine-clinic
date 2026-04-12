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
    <section className="pt-8 lg:pt-12 pb-24 lg:pb-28" style={{ background: "var(--color-neutral)" }}>
      <div className="mx-auto" style={{ maxWidth: "var(--max-content)" }}>
        <div className="px-6">
        <BeforeAfterHeader
          eyebrow={t("eyebrow")}
          headline={t("headline")}
          headlineAccent={t("headline_accent")}
          instruction={t("instruction")}
        />
        </div>

        <div className="px-3 sm:px-6">
          <BeforeAfterCards cards={cards} />
        </div>

        {/* Footer */}
        <div className="px-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6">
          <p className="font-sans text-[11px] italic" style={{ color: "var(--color-secondary)", opacity: 0.5 }}>
            * {t("disclaimer")}
          </p>
          <Link
            href="/resultats"
            className="font-sans text-[11px] font-semibold tracking-[0.12em] uppercase px-6 py-2.5 rounded-full transition-all duration-200 bg-white/70 backdrop-blur-sm border border-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-primary/30 hover:text-text"
            style={{ color: "var(--color-primary)" }}
          >
            {t("viewAll")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
