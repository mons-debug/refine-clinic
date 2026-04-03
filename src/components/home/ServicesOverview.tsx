import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";
import { Zap, Sparkles, Droplets, Activity, Layers, Heart, ArrowRight } from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";

const ICON_MAP: Record<string, React.ElementType> = {
  Zap,
  Sparkles,
  Droplets,
  Activity,
  Layers,
  Heart,
};

interface ServiceItem {
  slug: string;
  icon: string;
  color: string;
  nameKey: "laser" | "face" | "peeling" | "meso" | "cellulite" | "body";
}

const SERVICES: ServiceItem[] = [
  { slug: "epilation-laser", icon: "Zap", color: "#A65D46", nameKey: "laser" },
  { slug: "soin-visage", icon: "Sparkles", color: "#8C736A", nameKey: "face" },
  { slug: "peeling-chimique", icon: "Droplets", color: "#D9BBA9", nameKey: "peeling" },
  { slug: "mesotherapie", icon: "Activity", color: "#A65D46", nameKey: "meso" },
  { slug: "traitement-cellulite", icon: "Layers", color: "#8C736A", nameKey: "cellulite" },
  { slug: "soin-corps", icon: "Heart", color: "#D9BBA9", nameKey: "body" },
];

export default async function ServicesOverview() {
  const t = await getTranslations("services");

  return (
    <section className="py-24 lg:py-32 px-6 bg-neutral">
      <div className="mx-auto" style={{ maxWidth: "var(--max-content)" }}>
        {/* Header */}
        <SectionReveal className="text-center mb-16">
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-primary font-semibold mb-4">
            {t("title")}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-text mb-5">
            {t("title")}
          </h2>
          <p className="font-sans text-base text-text-soft max-w-lg mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </SectionReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(({ slug, icon, color, nameKey }, i) => {
            const Icon = ICON_MAP[icon] ?? Zap;
            return (
              <SectionReveal key={slug} delay={i * 0.1}>
                <Link
                  href={`/services/${slug}`}
                  className="group flex flex-col gap-5 p-7 bg-white rounded-2xl border border-transparent hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 shadow-brand hover:shadow-brand-md"
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${color}18 0%, ${color}30 100%)`,
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color }}
                      aria-hidden
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="font-serif text-lg font-semibold text-text mb-2 group-hover:text-primary transition-colors">
                      {t(`${nameKey}.name`)}
                    </h3>
                    <p className="font-sans text-sm text-text-soft leading-relaxed">
                      {t(`${nameKey}.desc`)}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center gap-1.5 font-sans text-xs font-semibold text-primary">
                    {t("learnMore")}
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 start-0 h-0.5 w-0 group-hover:w-full bg-primary rounded-b-2xl transition-all duration-300" />
                </Link>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
