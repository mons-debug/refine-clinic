import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/lib/navigation";
import BookingCTA from "@/components/home/BookingCTA";
import SectionReveal from "@/components/ui/SectionReveal";
import BrowseModeToggle from "@/components/services/BrowseModeToggle";
import { ZONES, servicesForZone } from "@/lib/zones";
import { AREA_ICONS } from "@/lib/area-icons";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Zones — Explorer par partie du corps | Refine Clinic Tanger",
    description:
      "Toutes nos expertises organisées par zone du corps : mains, aisselles, pieds, tempes, glabelle et plus — chaque zone rassemble ses traitements disponibles.",
    openGraph: {
      title: "Zones — Refine Clinic Tanger",
      description: "Explorez nos traitements par partie du corps.",
      url: "https://refineclinic.ma/fr/zones",
      siteName: "Refine Clinic",
      type: "website",
    },
    alternates: {
      canonical: "https://refineclinic.ma/fr/zones",
      languages: {
        fr: "https://refineclinic.ma/fr/zones",
        ar: "https://refineclinic.ma/ar/zones",
        en: "https://refineclinic.ma/en/zones",
      },
    },
  };
}

export default async function ZonesIndexPage() {
  const tAreas = await getTranslations("areas");
  const tZp = await getTranslations("zonePage");

  const featured = ZONES.filter((z) => z.priority === 1);
  const secondary = ZONES.filter((z) => z.priority === 2);
  const tertiary = ZONES.filter((z) => z.priority === 3);

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-28 pb-14 sm:pt-32 sm:pb-16 px-6 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, var(--color-neutral) 0%, var(--color-neutral-dark) 50%, var(--color-tertiary) 100%)",
        }}
      >
        <div className="mx-auto" style={{ maxWidth: "var(--max-content)" }}>
          <p className="font-sans text-[11px] tracking-[0.35em] uppercase text-primary font-semibold mb-4">
            {tZp("indexEyebrow")}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-text leading-[1.05] tracking-[-0.02em] max-w-3xl mb-5">
            {tZp("indexTitle")}
          </h1>
          <div className="w-10 h-[2px] rounded-full mb-5" style={{ background: "var(--color-tertiary)" }} />
          <p className="font-sans text-base sm:text-lg text-text-soft max-w-xl leading-relaxed">
            {tZp("indexSubtitle")}
          </p>
        </div>
        <div
          className="absolute bottom-0 inset-x-0 h-20"
          style={{ background: "linear-gradient(to bottom, transparent 0%, var(--color-neutral) 100%)" }}
        />
      </section>

      {/* Featured zones — large photo tiles */}
      <section className="px-6 pt-12 pb-6" style={{ background: "var(--color-neutral)" }}>
        <div className="mx-auto" style={{ maxWidth: "var(--max-content)" }}>
          <BrowseModeToggle active="zones" />
          <SectionReveal>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-text mb-2">
              {tZp("featuredTitle")}
            </h2>
            <div className="w-10 h-[2px] rounded-full bg-tertiary mb-8" />
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((z) => {
              const count = servicesForZone(z.slug).length;
              return (
                <SectionReveal key={z.slug}>
                  <Link
                    href={`/zones/${z.slug}`}
                    className="group relative block rounded-2xl overflow-hidden aspect-[4/5] shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_48px_rgba(166,93,70,0.15)] hover:-translate-y-1 transition-all duration-400"
                  >
                    {z.image && (
                      <Image
                        src={z.image}
                        alt={tAreas(z.slug)}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/80 font-semibold mb-2">
                        {count} {count > 1 ? tZp("treatmentsPlural") : tZp("treatmentsSingular")}
                      </p>
                      <h3 className="font-serif text-white text-3xl font-light tracking-[-0.01em]">
                        {tAreas(z.slug)}
                      </h3>
                    </div>
                  </Link>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Secondary + tertiary zones — compact cards */}
      <section className="px-6 py-16 lg:py-20" style={{ background: "var(--color-neutral)" }}>
        <div className="mx-auto" style={{ maxWidth: "var(--max-content)" }}>
          <SectionReveal>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-text mb-2">
              {tZp("otherZonesTitle")}
            </h2>
            <div className="w-10 h-[2px] rounded-full bg-tertiary mb-8" />
          </SectionReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...secondary, ...tertiary].map((z) => {
              const count = servicesForZone(z.slug).length;
              const Icon = AREA_ICONS[z.slug];
              if (count === 0) return null;
              return (
                <Link
                  key={z.slug}
                  href={`/zones/${z.slug}`}
                  className="group flex items-center gap-3 px-4 py-4 rounded-xl bg-white/70 backdrop-blur-sm border border-white/60 hover:border-primary/30 hover:bg-white hover:shadow-[0_4px_20px_rgba(166,93,70,0.08)] transition-all duration-200"
                >
                  {Icon && (
                    <span
                      className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0 group-hover:text-primary transition-colors"
                      style={{ background: "rgba(166,93,70,0.06)", color: "var(--color-primary)" }}
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-base font-medium text-text group-hover:text-primary transition-colors">
                      {tAreas(z.slug)}
                    </p>
                    <p className="font-sans text-[11px] text-text-soft">
                      {count} {count > 1 ? tZp("treatmentsPlural") : tZp("treatmentsSingular")}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
