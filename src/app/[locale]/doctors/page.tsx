import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Notre Équipe Médicale | Refine Clinic Tanger",
  description: "Rencontrez Dr. El Boujadaini Meryem (médecine esthétique) et Dr. Amr Ismail (chirurgie plastique) — un duo médical unique à Tanger.",
  openGraph: {
    title: "Notre Équipe Médicale | Refine Clinic",
    description: "Chirurgie & médecine esthétique sous le même toit. Dr. Meryem & Dr. Amr, Tanger.",
    url: "https://refineclinic.ma/fr/doctors",
    siteName: "Refine Clinic",
    type: "website",
  },
  alternates: {
    canonical: "https://refineclinic.ma/fr/doctors",
    languages: {
      fr: "https://refineclinic.ma/fr/doctors",
      ar: "https://refineclinic.ma/ar/doctors",
      en: "https://refineclinic.ma/en/doctors",
    },
  },
};
import { Link } from "@/lib/navigation";
import { ArrowRight, Heart } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SectionReveal from "@/components/ui/SectionReveal";
import BookingCTA from "@/components/home/BookingCTA";
import { CLINIC } from "@/lib/clinic";

export default async function DoctorsPage() {
  const t = await getTranslations("doctors");
  const { meryem, amr } = CLINIC.doctors;
  const doctors = [meryem, amr];

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbs={[{ label: t("title") }]}
        size="default"
      />

      {/* Doctor cards */}
      <section className="py-24 lg:py-32 px-6 bg-neutral">
        <div className="mx-auto" style={{ maxWidth: "var(--max-content)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
            {doctors.map((doc, i) => (
              <SectionReveal key={doc.slug} delay={i * 0.15}>
                <div className="bg-white/55 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/50 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(166,93,70,0.1)] hover:-translate-y-1 transition-all duration-300">
                  {/* Photo */}
                  {doc.image ? (
                    <div className="relative h-80 overflow-hidden">
                      <Image src={doc.image} alt={doc.name} fill className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 640px" />
                    </div>
                  ) : (
                    <div
                      className="relative h-80 flex items-center justify-center"
                      style={{
                        background: i === 0
                          ? "linear-gradient(135deg, var(--color-tertiary) 0%, var(--color-neutral-dark) 100%)"
                          : "linear-gradient(135deg, var(--color-neutral-dark) 0%, var(--color-secondary) 100%)",
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 rounded-full border-2 opacity-20" style={{ borderColor: "var(--color-primary)" }} />
                        <div className="absolute w-64 h-64 rounded-full border opacity-10" style={{ borderColor: "var(--color-primary)" }} />
                      </div>
                      <div
                        className="relative z-10 w-32 h-32 rounded-full flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)" }}
                      >
                        <span className="font-serif text-4xl font-light text-white">{doc.initials}</span>
                      </div>
                      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-sans text-[10px] tracking-widest uppercase text-text-soft/50">
                        Photo à venir
                      </p>
                    </div>
                  )}

                  {/* Info */}
                  <div className="p-8">
                    <h2 className="font-serif text-2xl font-semibold text-text mb-1.5">{doc.name}</h2>
                    <p className="font-sans text-sm text-primary font-medium mb-3">{doc.title}</p>

                    {/* Bio */}
                    <p className="font-sans text-sm text-text-soft leading-relaxed mb-6">
                      {i === 0 ? t("meryem_bio") : t("amr_bio")}
                    </p>

                    {/* Treatment tags */}
                    <div className="flex flex-wrap gap-2 mb-7">
                      {doc.treatments.map((tr) => (
                        <span
                          key={tr}
                          className="font-sans text-xs px-3 py-1.5 rounded-full bg-white/50 text-text-soft border border-white/50"
                        >
                          {tr}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/doctors/${doc.slug}`}
                      className="inline-flex items-center gap-2 font-sans text-sm font-semibold px-6 py-3 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors shadow-brand"
                    >
                      {t("meet")}
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </Link>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Power Couple callout */}
          <SectionReveal>
            <div
              className="rounded-2xl p-10 sm:p-14 text-center text-white relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 60%, #2B2B2B 100%)" }}
            >
              <Heart className="w-8 h-8 text-white/60 mx-auto mb-5" aria-hidden />
              <h2 className="font-serif text-3xl sm:text-4xl font-light mb-5 leading-snug">
                {t("couple_headline")}
              </h2>
              <p className="font-sans text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
                {t("couple_text")}
              </p>
            </div>
          </SectionReveal>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
