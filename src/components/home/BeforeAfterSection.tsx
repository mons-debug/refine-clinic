import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";
import { ArrowRight } from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";

const PAIRS = [
  { label: "Épilation Laser", color: "#A65D46" },
  { label: "Soin Visage", color: "#8C736A" },
  { label: "Peeling Chimique", color: "#D9BBA9" },
];

export default async function BeforeAfterSection() {
  const t = await getTranslations("beforeAfter");

  return (
    <section className="py-24 lg:py-32 px-6 bg-neutral">
      <div className="mx-auto" style={{ maxWidth: "var(--max-content)" }}>
        <SectionReveal className="text-center mb-16">
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-primary font-semibold mb-4">
            {t("title")}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-text">
            {t("title")}
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {PAIRS.map(({ label, color }, i) => (
            <SectionReveal key={label} delay={i * 0.12}>
              <div className="rounded-2xl overflow-hidden shadow-brand">
                {/* Before/After side by side placeholder */}
                <div className="flex h-64">
                  {/* Before */}
                  <div
                    className="flex-1 flex flex-col items-center justify-end pb-4 gap-1"
                    style={{
                      background: `linear-gradient(180deg, ${color}08 0%, ${color}22 100%)`,
                    }}
                  >
                    <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-text-soft/60 bg-white/80 px-2 py-0.5 rounded-full">
                      {t("before")}
                    </span>
                  </div>
                  {/* Divider */}
                  <div className="w-0.5 bg-white/80 relative z-10">
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center"
                    >
                      <div className="w-2 h-px bg-text-soft" />
                    </div>
                  </div>
                  {/* After */}
                  <div
                    className="flex-1 flex flex-col items-center justify-end pb-4"
                    style={{
                      background: `linear-gradient(180deg, ${color}22 0%, ${color}45 100%)`,
                    }}
                  >
                    <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-white/90 bg-primary/80 px-2 py-0.5 rounded-full">
                      {t("after")}
                    </span>
                  </div>
                </div>
                {/* Label */}
                <div className="bg-white px-5 py-3 flex items-center justify-between">
                  <span className="font-sans text-sm font-medium text-text">
                    {label}
                  </span>
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal className="flex flex-col items-center gap-4">
          <p className="font-sans text-xs text-text-soft/60 italic text-center">
            * {t("disclaimer")}
          </p>
          <Link
            href="/avant-apres"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-primary hover:gap-3 transition-all duration-200"
          >
            {t("viewMore")}
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}
