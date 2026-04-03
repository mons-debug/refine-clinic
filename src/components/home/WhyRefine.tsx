import { getTranslations } from "next-intl/server";
import { Users, Fingerprint, Cpu, Feather, ClipboardCheck } from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";

const ICONS = [Users, Fingerprint, Cpu, Feather, ClipboardCheck];

export default async function WhyRefine() {
  const t = await getTranslations("why");

  const items = [
    { titleKey: "item1_title", descKey: "item1_desc" },
    { titleKey: "item2_title", descKey: "item2_desc" },
    { titleKey: "item3_title", descKey: "item3_desc" },
    { titleKey: "item4_title", descKey: "item4_desc" },
    { titleKey: "item5_title", descKey: "item5_desc" },
  ] as const;

  return (
    <section className="py-24 lg:py-32 px-6 bg-neutral">
      <div className="mx-auto" style={{ maxWidth: "var(--max-content)" }}>
        <SectionReveal className="text-center mb-16">
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-primary font-semibold mb-4">
            Notre différence
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-text">
            {t("title")}
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {items.map(({ titleKey, descKey }, i) => {
            const Icon = ICONS[i];
            return (
              <SectionReveal key={titleKey} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-white shadow-brand hover:shadow-brand-md hover:-translate-y-1 transition-all duration-300">
                  {/* Number + Icon */}
                  <div className="relative">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--color-tertiary) 0%, var(--color-neutral-dark) 100%)",
                      }}
                    >
                      <Icon className="w-6 h-6 text-primary" aria-hidden />
                    </div>
                    <span
                      className="absolute -top-1 -end-1 w-5 h-5 rounded-full bg-primary text-white font-sans text-[10px] font-bold flex items-center justify-center"
                    >
                      {i + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-sans text-sm font-semibold text-text mb-2">
                      {t(titleKey)}
                    </h3>
                    <p className="font-sans text-xs text-text-soft leading-relaxed">
                      {t(descKey)}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
