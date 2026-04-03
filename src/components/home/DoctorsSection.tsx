import { getTranslations } from "next-intl/server";
import { CLINIC } from "@/lib/clinic";
import DoctorsGrid from "@/components/home/DoctorsGrid";

export default async function DoctorsSection() {
  const t = await getTranslations("doctors");
  const { meryem, amr } = CLINIC.doctors;

  const doctors = [
    {
      ...meryem,
      category: t("category_aesthetic"),
      meetLabel: t("meet"),
    },
    {
      ...amr,
      category: t("category_surgery"),
      meetLabel: t("meet"),
    },
  ];

  const stats = [
    { value: t("stat1_value"), label: t("stat1_label") },
    { value: t("stat2_value"), label: t("stat2_label") },
    { value: t("stat3_value"), label: t("stat3_label") },
  ];

  return (
    <section className="py-24 lg:py-32 px-6 bg-neutral-dark">
      <div className="mx-auto" style={{ maxWidth: "var(--max-content)" }}>
        <DoctorsGrid
          doctors={doctors}
          eyebrow={t("title")}
          headline={t("headline")}
          headlineAccent={t("headline_accent")}
          calloutEyebrow={t("callout_eyebrow")}
          calloutHeadline={t("callout_headline")}
          calloutAccent={t("callout_accent")}
          calloutText={t("couple_text")}
          stats={stats}
        />
      </div>
    </section>
  );
}
