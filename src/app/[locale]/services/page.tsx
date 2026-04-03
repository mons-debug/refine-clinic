import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Nos Soins | Refine Clinic Tanger",
  description: "Découvrez tous nos soins médicaux et esthétiques à Tanger : épilation laser, soin visage, peeling chimique, mésothérapie PRP, traitement cellulite et soin corps.",
  openGraph: {
    title: "Nos Soins | Refine Clinic Tanger",
    description: "Protocoles médicaux et esthétiques personnalisés à Tanger. Dr. Meryem & Dr. Amr.",
    url: "https://refineclinic.ma/fr/services",
    siteName: "Refine Clinic",
    type: "website",
  },
  alternates: {
    canonical: "https://refineclinic.ma/fr/services",
    languages: {
      fr: "https://refineclinic.ma/fr/services",
      ar: "https://refineclinic.ma/ar/services",
      en: "https://refineclinic.ma/en/services",
    },
  },
};
import { Zap, Sparkles, Droplets, Activity, Layers, Heart, ArrowRight, Clock, CheckCircle } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SectionReveal from "@/components/ui/SectionReveal";
import BookingCTA from "@/components/home/BookingCTA";

const ICON_MAP: Record<string, React.ElementType> = {
  Zap, Sparkles, Droplets, Activity, Layers, Heart,
};

const SERVICES = [
  { slug: "epilation-laser", icon: "Zap", color: "#A65D46", key: "laser" },
  { slug: "soin-visage", icon: "Sparkles", color: "#8C736A", key: "face" },
  { slug: "peeling-chimique", icon: "Droplets", color: "#D9BBA9", key: "peeling" },
  { slug: "mesotherapie", icon: "Activity", color: "#A65D46", key: "meso" },
  { slug: "traitement-cellulite", icon: "Layers", color: "#8C736A", key: "cellulite" },
  { slug: "soin-corps", icon: "Heart", color: "#D9BBA9", key: "body" },
] as const;

export default async function ServicesPage() {
  const t = await getTranslations("services");
  const tSp = await getTranslations("servicePage");

  return (
    <>
      <PageHeader
        title={t("overview_title")}
        subtitle={t("overview_subtitle")}
        breadcrumbs={[{ label: t("title") }]}
        size="default"
      />

      <section className="py-24 lg:py-32 px-6 bg-neutral">
        <div className="mx-auto" style={{ maxWidth: "var(--max-content)" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map(({ slug, icon, color, key }, i) => {
              const Icon = ICON_MAP[icon] ?? Zap;
              return (
                <SectionReveal key={slug} delay={i * 0.08}>
                  <Link
                    href={`/services/${slug}`}
                    className="group relative flex flex-col gap-6 p-8 bg-white rounded-2xl border border-transparent hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 shadow-brand hover:shadow-brand-md overflow-hidden"
                  >
                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `linear-gradient(135deg, ${color}18 0%, ${color}30 100%)` }}
                    >
                      <Icon className="w-6 h-6" style={{ color }} aria-hidden />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h2 className="font-serif text-xl font-semibold text-text mb-2 group-hover:text-primary transition-colors">
                        {t(`${key}.name`)}
                      </h2>
                      <p className="font-sans text-sm text-text-soft leading-relaxed mb-4">
                        {t(`${key}.description`)}
                      </p>

                      {/* Sessions badge */}
                      <div className="flex items-center gap-1.5 font-sans text-xs text-text-soft/70">
                        <Clock className="w-3.5 h-3.5 text-primary/60" aria-hidden />
                        <span>{t(`${key}.sessions`)}</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-1.5 font-sans text-sm font-semibold text-primary">
                      {t("learnMore")}
                      <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                    </div>

                    {/* Hover accent */}
                    <div className="absolute bottom-0 start-0 h-0.5 w-0 group-hover:w-full bg-primary rounded-b-2xl transition-all duration-300" />
                  </Link>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Refine for services */}
      <section className="py-20 px-6 bg-neutral-dark">
        <div className="mx-auto max-w-3xl text-center" style={{ maxWidth: "var(--max-content)" }}>
          <SectionReveal>
            <div className="flex flex-col items-center gap-4">
              <CheckCircle className="w-8 h-8 text-primary" aria-hidden />
              <h2 className="font-serif text-3xl font-light text-text">
                {tSp("bookCta")}
              </h2>
              <p className="font-sans text-base text-text-soft max-w-lg leading-relaxed">
                Chaque soin commence par une consultation médicale personnalisée. Nos médecins évaluent votre peau, vos besoins et vos attentes pour vous proposer le protocole le plus adapté.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link
                  href="/consultation"
                  className="inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold px-8 py-3.5 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors shadow-brand"
                >
                  {tSp("bookCta")}
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold px-8 py-3.5 rounded-full border-2 border-primary/60 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
