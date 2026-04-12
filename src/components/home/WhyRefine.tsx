import { getTranslations } from "next-intl/server";
import WhyRefineGrid from "@/components/home/WhyRefineGrid";

export default async function WhyRefine() {
  const t = await getTranslations("why");

  const items = [
    { title: t("item1_title"), desc: t("item1_desc"), index: 0 },
    { title: t("item2_title"), desc: t("item2_desc"), index: 1 },
    { title: t("item3_title"), desc: t("item3_desc"), index: 2 },
    { title: t("item4_title"), desc: t("item4_desc"), index: 3 },
    { title: t("item5_title"), desc: t("item5_desc"), index: 4 },
  ];

  return (
    <section className="pt-8 lg:pt-12 pb-24 lg:pb-28 px-6" style={{ background: "var(--color-neutral)" }}>
      <div className="mx-auto" style={{ maxWidth: "var(--max-content)" }}>
        <WhyRefineGrid
          items={items}
          eyebrow={t("eyebrow")}
          pullquote={t("pullquote")}
          pullquoteAccent={t("pullquote_accent")}
        />
      </div>
    </section>
  );
}
