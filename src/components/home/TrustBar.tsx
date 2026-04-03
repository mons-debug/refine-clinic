import { getTranslations } from "next-intl/server";
import { Award, Zap, Leaf, Sparkles } from "lucide-react";

const ICONS = [Award, Zap, Leaf, Sparkles];

export default async function TrustBar() {
  const t = await getTranslations("trust");

  const items = [
    { titleKey: "item1_title", descKey: "item1_desc", Icon: ICONS[0] },
    { titleKey: "item2_title", descKey: "item2_desc", Icon: ICONS[1] },
    { titleKey: "item3_title", descKey: "item3_desc", Icon: ICONS[2] },
    { titleKey: "item4_title", descKey: "item4_desc", Icon: ICONS[3] },
  ] as const;

  return (
    <section className="bg-primary py-10 px-6">
      <div
        className="mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8"
        style={{ maxWidth: "var(--max-content)" }}
      >
        {items.map(({ titleKey, descKey, Icon }) => (
          <div key={titleKey} className="flex flex-col items-center text-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
              <Icon className="w-5 h-5 text-white" aria-hidden />
            </div>
            <div>
              <p className="font-sans text-sm font-semibold text-white leading-tight">
                {t(titleKey)}
              </p>
              <p className="font-sans text-xs text-white/70 mt-1 leading-snug">
                {t(descKey)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
