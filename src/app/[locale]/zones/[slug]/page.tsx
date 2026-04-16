import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Script from "next/script";
import Image from "next/image";
import { CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@/lib/navigation";
import PageHeader from "@/components/ui/PageHeader";
import FAQAccordion from "@/components/ui/FAQAccordion";
import SectionReveal from "@/components/ui/SectionReveal";
import BookingCTA from "@/components/home/BookingCTA";
import { CLINIC } from "@/lib/clinic";
import { ZONES, getZone, servicesForZone, relatedZones } from "@/lib/zones";
import { indicationsForZone } from "@/lib/indications";
import { AREA_ICONS, type AreaKey } from "@/lib/area-icons";

export const dynamic = "force-dynamic";

interface ZonePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return ZONES.map((z) => ({ slug: z.slug }));
}

export async function generateMetadata({ params }: ZonePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const zone = getZone(slug);
  if (!zone) return {};
  const tAreas = await getTranslations("areas");
  const tZones = await getTranslations("zones");
  const areaName = tAreas(slug);
  let seoTitle = `${areaName} — Refine Clinic Tanger`;
  let description = `Tous les traitements esthétiques pour ${areaName.toLowerCase()} à la clinique Refine de Tanger — Botox, fillers, laser, soins.`;
  try {
    seoTitle = tZones(`${slug}.seoTitle`);
  } catch { /* fallback */ }
  try {
    description = tZones(`${slug}.metaDescription`);
  } catch { /* fallback */ }
  return {
    title: seoTitle,
    description,
    openGraph: {
      title: seoTitle,
      description,
      url: `https://refineclinic.ma/${locale}/zones/${slug}`,
      siteName: "Refine Clinic",
      type: "website",
      ...(zone.image ? { images: [{ url: `https://refineclinic.ma${zone.image}` }] } : {}),
    },
    alternates: {
      canonical: `https://refineclinic.ma/${locale}/zones/${slug}`,
      languages: {
        fr: `https://refineclinic.ma/fr/zones/${slug}`,
        ar: `https://refineclinic.ma/ar/zones/${slug}`,
        en: `https://refineclinic.ma/en/zones/${slug}`,
      },
    },
  };
}

export default async function ZonePage({ params }: ZonePageProps) {
  const { slug } = await params;
  const zone = getZone(slug);
  if (!zone) notFound();

  const t = await getTranslations("services");
  const tAreas = await getTranslations("areas");
  const tZones = await getTranslations("zones");
  const tSp = await getTranslations("servicePage");
  const tInd = await getTranslations("services.indications");
  const tZp = await getTranslations("zonePage");

  const areaName = tAreas(slug);
  const services = servicesForZone(slug);
  const indicationKeys = indicationsForZone(slug);
  const related = relatedZones(slug);
  const Icon = AREA_ICONS[slug as AreaKey];

  const safeT = (key: string, fallback = ""): string => {
    try {
      return tZones(`${slug}.${key}`);
    } catch {
      return fallback;
    }
  };

  const tagline = safeT("tagline", `Traitements ciblés pour ${areaName.toLowerCase()}`);
  const intro = safeT(
    "intro",
    `Découvrez tous les soins et traitements que nous proposons pour ${areaName.toLowerCase()} à la clinique Refine de Tanger. Chaque protocole est adapté à votre morphologie et vos objectifs lors d'une consultation personnalisée.`,
  );

  // FAQ only rendered if at least faq1_q exists
  let faqItems: { q: string; a: string }[] = [];
  try {
    const q1 = tZones(`${slug}.faq1_q`);
    const a1 = tZones(`${slug}.faq1_a`);
    faqItems.push({ q: q1, a: a1 });
    for (const i of [2, 3, 4]) {
      try {
        faqItems.push({
          q: tZones(`${slug}.faq${i}_q`),
          a: tZones(`${slug}.faq${i}_a`),
        });
      } catch { break; }
    }
  } catch { /* no FAQ for this zone */ }

  const indications = indicationKeys.map((k) => {
    try { return { key: k, label: tInd(k) }; } catch { return { key: k, label: k }; }
  });

  // Schema.org: MedicalClinic with hasOfferCatalog
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: "Refine Clinic",
    url: `https://refineclinic.ma`,
    address: {
      "@type": "PostalAddress",
      streetAddress: CLINIC.address.street,
      addressLocality: CLINIC.address.city,
      addressCountry: "MA",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${areaName} — Traitements`,
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "MedicalProcedure",
          name: t(`${s.nameKey}.name`),
          url: `https://refineclinic.ma/services/${s.slug}`,
        },
      })),
    },
  };

  return (
    <>
      <Script
        id={`json-ld-zone-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ── */}
      {zone.image ? (
        <section className="relative h-[60vh] min-h-[420px] max-h-[640px] overflow-hidden">
          <Image
            src={zone.image}
            alt={areaName}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 px-6 pb-12 sm:pb-16">
            <div className="mx-auto" style={{ maxWidth: "var(--max-content)" }}>
              <Link
                href="/zones"
                className="inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.3em] uppercase text-white/80 hover:text-white mb-4"
              >
                <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                {tZp("backToZones")}
              </Link>
              <p className="font-sans text-[11px] tracking-[0.35em] uppercase text-white/75 font-semibold mb-3">
                {tZp("zone")} · Refine Clinic Tanger
              </p>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-white tracking-[-0.02em] leading-[0.95] mb-4">
                {areaName}
              </h1>
              <p className="font-sans text-base sm:text-lg text-white/90 max-w-lg">
                {tagline}
              </p>
            </div>
          </div>
        </section>
      ) : (
        <PageHeader
          title={areaName}
          subtitle={tagline}
          breadcrumbs={[
            { label: tZp("breadcrumb"), href: "/zones" },
            { label: areaName },
          ]}
          size="large"
        />
      )}

      {/* ── INTRO + TREATMENTS ── */}
      <section className="px-6 py-16 lg:py-24" style={{ background: "var(--color-neutral)" }}>
        <div className="mx-auto" style={{ maxWidth: "var(--max-content)" }}>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-20">
            {/* Intro */}
            <div className="lg:col-span-2">
              <SectionReveal>
                {Icon && !zone.image && (
                  <div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
                    style={{ background: "rgba(166,93,70,0.08)", color: "var(--color-primary)" }}
                    aria-hidden
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                )}
                <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-primary font-semibold mb-4">
                  {tZp("introEyebrow")}
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-text leading-tight mb-5 tracking-[-0.015em]">
                  {tZp("introTitle", { zone: areaName.toLowerCase() })}
                </h2>
                <div className="w-10 h-[2px] rounded-full bg-tertiary mb-6" />
                <p className="font-sans text-base text-text-soft leading-relaxed">
                  {intro}
                </p>
              </SectionReveal>
            </div>

            {/* Quick facts card */}
            <div className="lg:col-span-1">
              <SectionReveal delay={0.1}>
                <div className="rounded-2xl p-6 bg-white/80 backdrop-blur-sm border border-white/50 shadow-brand space-y-4">
                  <div>
                    <p className="font-sans text-[10px] tracking-[0.2em] uppercase font-semibold text-primary mb-1">
                      {tZp("treatmentsAvailable")}
                    </p>
                    <p className="font-serif text-3xl font-light text-text">
                      {services.length}
                    </p>
                  </div>
                  {indications.length > 0 && (
                    <div>
                      <p className="font-sans text-[10px] tracking-[0.2em] uppercase font-semibold text-primary mb-1">
                        {tZp("concernsCovered")}
                      </p>
                      <p className="font-serif text-3xl font-light text-text">
                        {indications.length}
                      </p>
                    </div>
                  )}
                  <div className="h-px" style={{ background: "rgba(31,26,20,0.08)" }} />
                  <p className="font-sans text-xs text-text-soft leading-relaxed">
                    {tZp("sidebarNote")}
                  </p>
                </div>
              </SectionReveal>
            </div>
          </div>

          {/* ── Treatments grid ── */}
          {services.length > 0 && (
            <SectionReveal>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-text mb-2">
                {tZp("treatmentsTitle")}
              </h2>
              <div className="w-10 h-[2px] rounded-full bg-tertiary mb-8" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {services.map((s) => {
                  const doctorName =
                    s.doctor === "meryem"
                      ? CLINIC.doctors.meryem.name
                      : CLINIC.doctors.amr.name;
                  return (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="group block rounded-2xl overflow-hidden bg-white/55 backdrop-blur-xl border border-white/50 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(166,93,70,0.10)] hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={s.image}
                          alt={t(`${s.nameKey}.name`)}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
                          <span className="font-sans text-[10px] font-medium text-text">
                            {doctorName}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-serif text-[18px] font-semibold text-text mb-1.5 group-hover:text-primary transition-colors">
                          {t(`${s.nameKey}.name`)}
                        </h3>
                        <p className="font-sans text-[13px] text-text-soft leading-relaxed line-clamp-2 mb-4">
                          {t(`${s.nameKey}.desc`)}
                        </p>
                        <span className="inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold tracking-[0.1em] uppercase text-primary">
                          {t("learnMore")}
                          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </SectionReveal>
          )}

          {/* ── Indications ── */}
          {indications.length > 0 && (
            <SectionReveal className="mt-20">
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-text mb-2">
                {tZp("concernsTitle")}
              </h2>
              <div className="w-10 h-[2px] rounded-full bg-tertiary mb-7" />
              <div className="flex flex-wrap gap-2.5">
                {indications.map((ind) => (
                  <Link
                    key={ind.key}
                    href={`/services?indication=${ind.key}`}
                    className="inline-flex items-center gap-1.5 font-sans text-sm px-4 py-2 rounded-full border border-white/50 bg-white/60 text-text-soft hover:border-primary/40 hover:text-primary hover:bg-white transition-all duration-200"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden />
                    {ind.label}
                  </Link>
                ))}
              </div>
            </SectionReveal>
          )}

          {/* ── FAQ ── */}
          {faqItems.length > 0 && (
            <SectionReveal className="mt-20">
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-text mb-2">
                {tSp("faqTitle")}
              </h2>
              <div className="w-10 h-[2px] rounded-full bg-tertiary mb-7" />
              <FAQAccordion items={faqItems} />
            </SectionReveal>
          )}

          {/* ── Related zones ── */}
          {related.length > 0 && (
            <SectionReveal className="mt-20">
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-text mb-2">
                {tZp("relatedTitle")}
              </h2>
              <div className="w-10 h-[2px] rounded-full bg-tertiary mb-7" />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {related.map((rz) => {
                  const RzIcon = AREA_ICONS[rz.slug];
                  return (
                    <Link
                      key={rz.slug}
                      href={`/zones/${rz.slug}`}
                      className="group relative rounded-2xl overflow-hidden block aspect-[4/3] bg-white/60 border border-white/50 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(166,93,70,0.10)] hover:-translate-y-1 transition-all duration-300"
                    >
                      {rz.image ? (
                        <Image
                          src={rz.image}
                          alt={tAreas(rz.slug)}
                          fill
                          sizes="(max-width: 640px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--color-neutral-dark) 0%, var(--color-tertiary) 100%)" }}>
                          {RzIcon && <RzIcon className="w-12 h-12 text-primary/60" />}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <p className="font-serif text-white text-lg font-medium">{tAreas(rz.slug)}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </SectionReveal>
          )}
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
