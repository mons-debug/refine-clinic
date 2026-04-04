import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "À Propos | Refine Clinic Tanger",
  description: "Découvrez l'histoire de Refine Clinic à Tanger — fondée par Dr. Meryem et Dr. Amr, la seule clinique alliant chirurgie plastique et médecine esthétique sous un même toit.",
  openGraph: {
    title: "À Propos de Refine Clinic | Tanger",
    description: "La clinique esthétique de référence à Tanger. Un duo médical unique, des résultats naturels.",
    url: "https://refineclinic.ma/fr/a-propos",
    siteName: "Refine Clinic",
    type: "website",
  },
  alternates: {
    canonical: "https://refineclinic.ma/fr/a-propos",
    languages: {
      fr: "https://refineclinic.ma/fr/a-propos",
      ar: "https://refineclinic.ma/ar/a-propos",
      en: "https://refineclinic.ma/en/a-propos",
    },
  },
};
import { Link } from "@/lib/navigation";
import { Heart, Star, Shield, Users, ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SectionReveal from "@/components/ui/SectionReveal";
import BookingCTA from "@/components/home/BookingCTA";
import { CLINIC } from "@/lib/clinic";

export default async function AProposPage() {
  const t = await getTranslations("about");
  const tWhy = await getTranslations("why");

  const values = [
    {
      icon: Heart,
      title: tWhy("item1_title"),
      desc: tWhy("item1_desc"),
    },
    {
      icon: Star,
      title: tWhy("item2_title"),
      desc: tWhy("item2_desc"),
    },
    {
      icon: Shield,
      title: tWhy("item3_title"),
      desc: tWhy("item3_desc"),
    },
    {
      icon: Users,
      title: tWhy("item4_title"),
      desc: tWhy("item4_desc"),
    },
  ];

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbs={[{ label: t("title") }]}
        size="large"
      />

      {/* Story section */}
      <section className="py-24 lg:py-32 px-6 bg-neutral">
        <div className="mx-auto" style={{ maxWidth: "var(--max-content)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            {/* Text */}
            <SectionReveal>
              <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-primary font-semibold mb-5">
                {t("storyEyebrow")}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-text mb-6 leading-snug">
                {t("storyTitle")}
              </h2>
              <div className="w-12 h-px bg-primary mb-7" />
              <div className="space-y-4 font-sans text-base text-text-soft leading-relaxed">
                <p>{t("storyP1")}</p>
                <p>{t("storyP2")}</p>
                <p>{t("storyP3")}</p>
              </div>
            </SectionReveal>

            {/* Visual */}
            <SectionReveal delay={0.2}>
              <div
                className="rounded-2xl h-96 flex items-center justify-center relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, var(--color-tertiary) 0%, var(--color-neutral-dark) 50%, var(--color-secondary) 100%)" }}
              >
                <div className="absolute inset-0 flex items-center justify-center gap-6">
                  <div
                    className="w-32 h-32 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)" }}
                  >
                    <span className="font-serif text-3xl font-light text-white">MB</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Heart className="w-5 h-5 text-white/60" />
                    <div className="w-px h-8 bg-white/30" />
                  </div>
                  <div
                    className="w-32 h-32 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)" }}
                  >
                    <span className="font-serif text-3xl font-light text-white">AI</span>
                  </div>
                </div>
                <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-[10px] tracking-widest uppercase text-white/50 whitespace-nowrap">
                  {t("doctorsCaption")}
                </p>
              </div>
            </SectionReveal>
          </div>

          {/* Values */}
          <SectionReveal className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-text mb-4">
              {tWhy("title")}
            </h2>
            <div className="w-12 h-px bg-primary mx-auto" />
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-7 text-center shadow-brand hover:shadow-brand-md hover:-translate-y-1 transition-all duration-300">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: "linear-gradient(135deg, var(--color-primary)18 0%, var(--color-primary)30 100%)" }}
                  >
                    <Icon className="w-5 h-5 text-primary" aria-hidden />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-text mb-2">{title}</h3>
                  <p className="font-sans text-xs text-text-soft leading-relaxed">{desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Clinic info */}
          <SectionReveal>
            <div
              className="rounded-2xl p-10 sm:p-14"
              style={{ background: "linear-gradient(135deg, var(--color-neutral-dark) 0%, var(--color-tertiary) 100%)" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                  <p className="font-sans text-[10px] tracking-widest uppercase text-primary font-semibold mb-3">{t("address")}</p>
                  <p className="font-sans text-sm text-text-soft leading-relaxed">{CLINIC.address.full}</p>
                </div>
                <div>
                  <p className="font-sans text-[10px] tracking-widest uppercase text-primary font-semibold mb-3">{t("hours")}</p>
                  <p className="font-sans text-sm text-text-soft">{CLINIC.hours}</p>
                </div>
                <div>
                  <p className="font-sans text-[10px] tracking-widest uppercase text-primary font-semibold mb-3">{t("contact")}</p>
                  <div className="flex flex-col gap-1 font-sans text-sm text-text-soft">
                    <span>{CLINIC.phone1}</span>
                    <span>{CLINIC.phone2}</span>
                    <span>{CLINIC.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal className="mt-12 text-center">
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold px-8 py-3.5 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors shadow-brand"
            >
              {t("bookAppt")}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </SectionReveal>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
