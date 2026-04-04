import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Script from "next/script";
import { Link } from "@/lib/navigation";
import { CheckCircle, Clock, ArrowLeft } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import FAQAccordion from "@/components/ui/FAQAccordion";
import SectionReveal from "@/components/ui/SectionReveal";
import { CLINIC } from "@/lib/clinic";

type ServiceKey =
  | "botox" | "fillers" | "threads"
  | "laser" | "face" | "peeling" | "meso" | "cellulite" | "body"
  | "liposuccion" | "abdominoplastie" | "brachioplastie" | "lifting_cuisses"
  | "gynecomastie" | "otoplastie" | "blepharoplastie" | "mammoplastie";

const SLUG_TO_KEY: Record<string, ServiceKey> = {
  // Aesthetic Medicine
  "botox": "botox",
  "fillers": "fillers",
  "fils-tenseurs": "threads",
  "epilation-laser": "laser",
  "soin-visage": "face",
  "peeling-chimique": "peeling",
  "mesotherapie": "meso",
  "traitement-cellulite": "cellulite",
  "soin-corps": "body",
  // Plastic Surgery
  "liposuccion": "liposuccion",
  "abdominoplastie": "abdominoplastie",
  "brachioplastie": "brachioplastie",
  "lifting-cuisses": "lifting_cuisses",
  "gynecomastie": "gynecomastie",
  "otoplastie": "otoplastie",
  "blepharoplastie": "blepharoplastie",
  "mammoplastie": "mammoplastie",
};

export const dynamic = "force-dynamic";

interface ServicePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const key = SLUG_TO_KEY[slug];
  if (!key) return {};
  const t = await getTranslations("services");
  const name = t(`${key}.name`);
  const description = t(`${key}.description`);
  return {
    title: `${name} | Refine Clinic Tanger`,
    description,
    openGraph: {
      title: `${name} | Refine Clinic Tanger`,
      description,
      url: `https://refineclinic.ma/${locale}/services/${slug}`,
      siteName: "Refine Clinic",
      type: "website",
    },
    alternates: {
      canonical: `https://refineclinic.ma/${locale}/services/${slug}`,
      languages: {
        fr: `https://refineclinic.ma/fr/services/${slug}`,
        ar: `https://refineclinic.ma/ar/services/${slug}`,
        en: `https://refineclinic.ma/en/services/${slug}`,
      },
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const key = SLUG_TO_KEY[slug];
  if (!key) notFound();

  const t = await getTranslations("services");
  const tSp = await getTranslations("servicePage");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: t(`${key}.name`),
    description: t(`${key}.description`),
    procedureType: "https://schema.org/NonInvasiveProcedure",
    howPerformed: t(`${key}.process`),
    followup: t(`${key}.sessions`),
    provider: {
      "@type": "MedicalClinic",
      name: "Refine Clinic",
      url: "https://refineclinic.ma",
      address: {
        "@type": "PostalAddress",
        streetAddress: CLINIC.address.street,
        addressLocality: CLINIC.address.city,
        addressCountry: "MA",
      },
    },
  };

  const faqItems = [
    { q: t(`${key}.faq1_q`), a: t(`${key}.faq1_a`) },
    { q: t(`${key}.faq2_q`), a: t(`${key}.faq2_a`) },
    { q: t(`${key}.faq3_q`), a: t(`${key}.faq3_a`) },
    { q: t(`${key}.faq4_q`), a: t(`${key}.faq4_a`) },
  ];

  const steps = [
    { title: t(`${key}.step1_title`), desc: t(`${key}.step1_desc`) },
    { title: t(`${key}.step2_title`), desc: t(`${key}.step2_desc`) },
    { title: t(`${key}.step3_title`), desc: t(`${key}.step3_desc`) },
    { title: t(`${key}.step4_title`), desc: t(`${key}.step4_desc`) },
  ];

  const benefits = [
    t(`${key}.benefit1`),
    t(`${key}.benefit2`),
    t(`${key}.benefit3`),
    t(`${key}.benefit4`),
  ];

  return (
    <>
      <Script
        id={`json-ld-service-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        title={t(`${key}.name`)}
        subtitle={t(`${key}.page_subtitle`)}
        breadcrumbs={[
          { label: t("title"), href: "/services" },
          { label: t(`${key}.name`) },
        ]}
        size="large"
      />

      <div className="px-6 py-16 lg:py-24" style={{ background: "var(--color-neutral)" }}>
        <div className="mx-auto" style={{ maxWidth: "var(--max-content)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Main content */}
            <div className="lg:col-span-2 space-y-16">

              {/* What is it */}
              <SectionReveal>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-text mb-5">
                  {tSp("whatIsIt")}
                </h2>
                <div className="w-10 h-px bg-primary mb-6" />
                <p className="font-sans text-base text-text-soft leading-relaxed">
                  {t(`${key}.description`)}
                </p>
              </SectionReveal>

              {/* How it works */}
              <SectionReveal>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-text mb-5">
                  {tSp("howItWorks")}
                </h2>
                <div className="w-10 h-px bg-primary mb-8" />
                <div className="space-y-6">
                  {steps.map(({ title, desc }, i) => (
                    <div key={i} className="flex gap-5">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-sans text-xs font-bold shrink-0">
                          {i + 1}
                        </div>
                        {i < steps.length - 1 && (
                          <div className="w-px flex-1 bg-primary/20 mt-2" />
                        )}
                      </div>
                      <div className="pb-6">
                        <h3 className="font-sans text-sm font-semibold text-text mb-1.5">
                          {title}
                        </h3>
                        <p className="font-sans text-sm text-text-soft leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionReveal>

              {/* Benefits */}
              <SectionReveal>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-text mb-5">
                  {tSp("benefits")}
                </h2>
                <div className="w-10 h-px bg-primary mb-7" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-dark">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0" aria-hidden />
                      <span className="font-sans text-sm font-medium text-text">{b}</span>
                    </div>
                  ))}
                </div>
              </SectionReveal>

              {/* For who */}
              <SectionReveal>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-text mb-5">
                  {tSp("forWho")}
                </h2>
                <div className="w-10 h-px bg-primary mb-6" />
                <p className="font-sans text-base text-text-soft leading-relaxed">
                  {t(`${key}.forWho`)}
                </p>
              </SectionReveal>

              {/* FAQ */}
              <SectionReveal>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-text mb-5">
                  {tSp("faqTitle")}
                </h2>
                <div className="w-10 h-px bg-primary mb-7" />
                <FAQAccordion items={faqItems} />
              </SectionReveal>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">

                {/* Sessions info */}
                <SectionReveal>
                  <div className="bg-white rounded-2xl p-6 border border-neutral-dark shadow-brand">
                    <div className="flex items-center gap-2 mb-4">
                      <Clock className="w-4 h-4 text-primary" aria-hidden />
                      <span className="font-sans text-xs font-semibold uppercase tracking-widest text-primary">
                        {tSp("sessions_label")}
                      </span>
                    </div>
                    <p className="font-sans text-sm text-text-soft leading-relaxed">
                      {t(`${key}.sessions`)}
                    </p>
                  </div>
                </SectionReveal>

                {/* Book CTA */}
                <SectionReveal delay={0.1}>
                  <div
                    className="rounded-2xl p-6 text-center"
                    style={{
                      background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)",
                    }}
                  >
                    <h3 className="font-serif text-lg font-light text-white mb-2">
                      Intéressé(e) ?
                    </h3>
                    <p className="font-sans text-xs text-white/75 mb-5 leading-relaxed">
                      Prenez rendez-vous pour une consultation personnalisée.
                    </p>
                    <Link
                      href="/consultation"
                      className="block font-sans text-sm font-semibold px-6 py-3 rounded-full bg-white text-primary hover:bg-neutral transition-colors mb-3"
                    >
                      {tSp("bookCta")}
                    </Link>
                    <a
                      href={`${CLINIC.whatsappLink}?text=${CLINIC.whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-sans text-xs text-white/70 hover:text-white transition-colors"
                    >
                      {tSp("whatsappCta")}
                    </a>
                  </div>
                </SectionReveal>

                {/* Back link */}
                <SectionReveal delay={0.2}>
                  <Link
                    href="/services"
                    className="flex items-center gap-2 font-sans text-sm text-text-soft hover:text-primary transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                    {tSp("backToServices")}
                  </Link>
                </SectionReveal>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
