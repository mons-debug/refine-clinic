import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Avant / Après | Refine Clinic Tanger",
  description: "Découvrez les résultats avant/après de nos soins esthétiques à Tanger : épilation laser, peeling, mésothérapie, traitement cellulite et plus.",
  openGraph: {
    title: "Résultats Avant / Après | Refine Clinic Tanger",
    description: "Résultats réels de nos soins médicaux et esthétiques. Refine Clinic, Tanger.",
    url: "https://refineclinic.ma/fr/avant-apres",
    siteName: "Refine Clinic",
    type: "website",
  },
  alternates: {
    canonical: "https://refineclinic.ma/fr/avant-apres",
    languages: {
      fr: "https://refineclinic.ma/fr/avant-apres",
      ar: "https://refineclinic.ma/ar/avant-apres",
      en: "https://refineclinic.ma/en/avant-apres",
    },
  },
};
import { Link } from "@/lib/navigation";
import { ArrowRight, Shield } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SectionReveal from "@/components/ui/SectionReveal";
import BookingCTA from "@/components/home/BookingCTA";

const BEFORE_AFTER_ITEMS = [
  { service: "Épilation Laser", zone: "Jambes complètes" },
  { service: "Peeling Chimique", zone: "Visage — taches & texture" },
  { service: "Mésothérapie PRP", zone: "Visage — éclat & fermeté" },
  { service: "Soin Visage", zone: "Teint & hydratation" },
  { service: "Traitement Cellulite", zone: "Cuisses & abdomen" },
  { service: "Soin Corps", zone: "Peau du corps" },
];

function BeforeAfterCard({ service, zone, index }: { service: string; zone: string; index: number }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-brand hover:shadow-brand-md hover:-translate-y-1 transition-all duration-300">
      {/* Images placeholder */}
      <div className="grid grid-cols-2 h-56">
        <div
          className="flex flex-col items-center justify-center gap-2 border-r border-neutral-dark"
          style={{ background: "linear-gradient(135deg, var(--color-neutral-dark) 0%, var(--color-neutral) 100%)" }}
        >
          <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-text-soft/50">Avant</span>
          <div
            className="w-16 h-16 rounded-full opacity-20"
            style={{ background: "var(--color-secondary)" }}
          />
        </div>
        <div
          className="flex flex-col items-center justify-center gap-2"
          style={{ background: "linear-gradient(135deg, var(--color-neutral) 0%, var(--color-tertiary) 100%)" }}
        >
          <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-text-soft/50">Après</span>
          <div
            className="w-16 h-16 rounded-full opacity-30"
            style={{ background: "var(--color-primary)" }}
          />
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="font-sans text-[10px] tracking-widest uppercase text-primary font-semibold mb-1">
          {service}
        </p>
        <p className="font-sans text-sm text-text-soft">{zone}</p>
      </div>
    </div>
  );
}

export default async function AvantApresPage() {
  const t = await getTranslations("beforeAfter");

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("disclaimer")}
        breadcrumbs={[{ label: t("title") }]}
        size="default"
      />

      <section className="py-24 lg:py-32 px-6 bg-neutral">
        <div className="mx-auto" style={{ maxWidth: "var(--max-content)" }}>

          {/* Disclaimer banner */}
          <SectionReveal>
            <div className="flex items-start gap-3 p-5 mb-14 bg-white rounded-xl border border-neutral-dark shadow-brand">
              <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden />
              <p className="font-sans text-sm text-text-soft leading-relaxed">
                <strong className="text-text font-semibold">Note :</strong> {t("disclaimer")} Les photos présentées sont des illustrations représentatives. Les résultats réels sont discutés lors de votre consultation médicale personnalisée.
              </p>
            </div>
          </SectionReveal>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {BEFORE_AFTER_ITEMS.map(({ service, zone }, i) => (
              <SectionReveal key={i} delay={i * 0.08}>
                <BeforeAfterCard service={service} zone={zone} index={i} />
              </SectionReveal>
            ))}
          </div>

          {/* CTA block */}
          <SectionReveal className="mt-16 text-center">
            <p className="font-sans text-base text-text-soft mb-6 max-w-lg mx-auto leading-relaxed">
              Vous souhaitez voir des résultats pour un soin spécifique ? Consultez-nous — nous répondons à toutes vos questions lors d'une consultation personnalisée.
            </p>
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold px-8 py-3.5 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors shadow-brand"
            >
              Prendre rendez-vous
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </SectionReveal>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
