import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Questions Fréquentes | Refine Clinic Tanger",
  description: "Toutes vos questions sur nos soins esthétiques, l'épilation laser, les injections, la chirurgie plastique et le fonctionnement de Refine Clinic à Tanger.",
  openGraph: {
    title: "FAQ | Refine Clinic Tanger",
    description: "Réponses à vos questions sur nos soins médicaux et esthétiques.",
    url: "https://refineclinic.ma/fr/faq",
    siteName: "Refine Clinic",
    type: "website",
  },
  alternates: {
    canonical: "https://refineclinic.ma/fr/faq",
    languages: {
      fr: "https://refineclinic.ma/fr/faq",
      ar: "https://refineclinic.ma/ar/faq",
      en: "https://refineclinic.ma/en/faq",
    },
  },
};
import PageHeader from "@/components/ui/PageHeader";
import FAQAccordion from "@/components/ui/FAQAccordion";
import SectionReveal from "@/components/ui/SectionReveal";
import BookingCTA from "@/components/home/BookingCTA";
import { Link } from "@/lib/navigation";
import { ArrowRight } from "lucide-react";

export default async function FAQPage() {
  const t = await getTranslations("faq");

  const FAQ_DATA = [
    {
      category: t("cat_general"),
      items: [
        { q: t("general_q1"), a: t("general_a1") },
        { q: t("general_q2"), a: t("general_a2") },
        { q: t("general_q3"), a: t("general_a3") },
        { q: t("general_q4"), a: t("general_a4") },
      ],
    },
    {
      category: t("cat_aesthetic"),
      items: [
        { q: t("aesthetic_q1"), a: t("aesthetic_a1") },
        { q: t("aesthetic_q2"), a: t("aesthetic_a2") },
        { q: t("aesthetic_q3"), a: t("aesthetic_a3") },
      ],
    },
    {
      category: t("cat_laser"),
      items: [
        { q: t("laser_q1"), a: t("laser_a1") },
        { q: t("laser_q2"), a: t("laser_a2") },
        { q: t("laser_q3"), a: t("laser_a3") },
      ],
    },
    {
      category: t("cat_surgery"),
      items: [
        { q: t("surgery_q1"), a: t("surgery_a1") },
        { q: t("surgery_q2"), a: t("surgery_a2") },
        { q: t("surgery_q3"), a: t("surgery_a3") },
      ],
    },
    {
      category: t("cat_safety"),
      items: [
        { q: t("safety_q1"), a: t("safety_a1") },
        { q: t("safety_q2"), a: t("safety_a2") },
      ],
    },
  ];

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbs={[{ label: t("title") }]}
        size="default"
      />

      <section className="py-24 lg:py-32 px-6 bg-neutral">
        <div className="mx-auto max-w-3xl" style={{ maxWidth: "var(--max-content)" }}>
          <div className="max-w-3xl mx-auto space-y-12">
            {FAQ_DATA.map(({ category, items }, ci) => (
              <SectionReveal key={ci} delay={ci * 0.05}>
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <h2 className="font-serif text-xl sm:text-2xl font-light text-text">
                      {category}
                    </h2>
                  </div>
                  <div className="bg-white/55 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                    <FAQAccordion items={items} />
                  </div>
                </div>
              </SectionReveal>
            ))}

            {/* Still have questions */}
            <SectionReveal>
              <div
                className="rounded-2xl p-8 text-center text-white mt-8"
                style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)" }}
              >
                <h3 className="font-serif text-2xl font-light mb-3">{t("notListed")}</h3>
                <p className="font-sans text-sm text-white/80 mb-6 leading-relaxed">
                  {t("notListedDesc")}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/consultation"
                    className="inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold px-6 py-3 rounded-full bg-white text-primary hover:bg-neutral transition-colors"
                  >
                    {t("bookAppt")}
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold px-6 py-3 rounded-full border border-white/40 text-white hover:bg-white/10 transition-colors"
                  >
                    {t("contactLink")}
                  </Link>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </>
  );
}
