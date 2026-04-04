import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Script from "next/script";
import { Link } from "@/lib/navigation";

interface DrMeryemPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: DrMeryemPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Dr. El Boujadaini Meryem — Médecine Esthétique | Refine Clinic",
    description: "Dr. Meryem, spécialiste en médecine esthétique, anti-âge et lasers médicaux à Tanger. Fillers, Botox, thread lift, épilation laser, PRP.",
    openGraph: {
      title: "Dr. Meryem — Médecine Esthétique | Refine Clinic Tanger",
      description: "Spécialiste en médecine esthétique et anti-âge à Tanger. Approche naturelle et personnalisée.",
      url: `https://refineclinic.ma/${locale}/doctors/dr-meryem`,
      siteName: "Refine Clinic",
      type: "profile",
    },
    alternates: {
      canonical: `https://refineclinic.ma/${locale}/doctors/dr-meryem`,
      languages: {
        fr: "https://refineclinic.ma/fr/doctors/dr-meryem",
        ar: "https://refineclinic.ma/ar/doctors/dr-meryem",
        en: "https://refineclinic.ma/en/doctors/dr-meryem",
      },
    },
  };
}
import { ArrowRight, Sparkles, Zap, Activity, Heart } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SectionReveal from "@/components/ui/SectionReveal";
import BookingCTA from "@/components/home/BookingCTA";
import { CLINIC } from "@/lib/clinic";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: "Dr. El Boujadaini Meryem",
  description: "Médecin spécialisée en médecine esthétique, anti-âge et lasers médicaux à Refine Clinic, Tanger.",
  medicalSpecialty: "Aesthetic Medicine",
  url: "https://refineclinic.ma/fr/doctors/dr-meryem",
  worksFor: {
    "@type": "MedicalClinic",
    name: "Refine Clinic",
    url: "https://refineclinic.ma",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Avenue Abi Al Hassan Echadli, Centre Business Salman, 4ème étage, App.16",
      addressLocality: "Tanger",
      addressCountry: "MA",
    },
  },
  knowsAbout: ["Fillers", "Botox", "Thread lift", "Épilation laser", "PRP", "Mésothérapie"],
};

export default async function DrMeryemPage() {
  const t = await getTranslations("doctors");
  const { meryem } = CLINIC.doctors;

  const specialties = [
    { icon: Sparkles, label: t("meryem_spec1") },
    { icon: Zap, label: t("meryem_spec2") },
    { icon: Activity, label: t("meryem_spec3") },
    { icon: Heart, label: t("meryem_spec4") },
  ];

  return (
    <>
      <Script
        id="json-ld-dr-meryem"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        title={meryem.name}
        subtitle={meryem.title}
        breadcrumbs={[
          { label: t("title"), href: "/doctors" },
          { label: meryem.name },
        ]}
        size="default"
      />

      <section className="py-24 lg:py-32 px-6 bg-neutral">
        <div className="mx-auto" style={{ maxWidth: "var(--max-content)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Profile sidebar */}
            <SectionReveal className="lg:col-span-1">
              <div className="bg-white rounded-2xl overflow-hidden shadow-brand sticky top-28">
                {meryem.image ? (
                  <div className="relative h-72 overflow-hidden">
                    <Image src={meryem.image} alt={meryem.name} fill className="object-cover object-top" sizes="400px" />
                  </div>
                ) : (
                  <div
                    className="h-72 flex items-center justify-center relative"
                    style={{ background: "linear-gradient(135deg, var(--color-tertiary) 0%, var(--color-neutral-dark) 100%)" }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-36 h-36 rounded-full border-2 opacity-20" style={{ borderColor: "var(--color-primary)" }} />
                    </div>
                    <div
                      className="relative w-24 h-24 rounded-full flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)" }}
                    >
                      <span className="font-serif text-3xl font-light text-white">{meryem.initials}</span>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <h1 className="font-serif text-lg font-semibold text-text mb-1">{meryem.name}</h1>
                  <p className="font-sans text-xs text-primary font-medium mb-5">{meryem.title}</p>

                  {/* Specialties */}
                  <div className="flex flex-col gap-2.5 mb-6">
                    {specialties.map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-primary shrink-0" aria-hidden />
                        <span className="font-sans text-xs text-text-soft">{label}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/consultation"
                    className="block text-center font-sans text-sm font-semibold px-5 py-3 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors"
                  >
                    {t("bookAppt")}
                  </Link>
                </div>
              </div>
            </SectionReveal>

            {/* Bio & treatments */}
            <div className="lg:col-span-2 space-y-12">
              <SectionReveal>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-text mb-5">{t("aboutDoctor")}</h2>
                <div className="w-10 h-px bg-primary mb-6" />
                <p className="font-sans text-base text-text-soft leading-relaxed">{t("meryem_bio")}</p>
              </SectionReveal>

              <SectionReveal>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-text mb-5">{t("meryem_treatments_title")}</h2>
                <div className="w-10 h-px bg-primary mb-6" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {meryem.treatments.map((tr) => (
                    <div key={tr} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-dark">
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      <span className="font-sans text-sm text-text">{tr}</span>
                    </div>
                  ))}
                </div>
              </SectionReveal>

              <SectionReveal>
                <div
                  className="rounded-2xl p-8 text-white"
                  style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)" }}
                >
                  <h3 className="font-serif text-xl font-light mb-3">{t("meryem_philosophy_title")}</h3>
                  <p className="font-sans text-sm text-white/85 leading-relaxed mb-5">
                    {t("meryem_philosophy")}
                  </p>
                  <Link
                    href="/consultation"
                    className="inline-flex items-center gap-2 font-sans text-sm font-semibold px-6 py-2.5 rounded-full bg-white text-primary hover:bg-neutral transition-colors"
                  >
                    {t("consultMeryem")}
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </Link>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
