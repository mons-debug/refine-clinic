import { getTranslations } from "next-intl/server";
import ServicesExplorer from "./ServicesExplorer";

export default async function ServicesExplorerSection() {
  const t = await getTranslations("services");

  return (
    <ServicesExplorer
      headline={t("explorer_headline")}
      subtitle={t("explorer_subtitle")}
    />
  );
}
