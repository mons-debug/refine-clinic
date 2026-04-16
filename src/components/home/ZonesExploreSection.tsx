import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/lib/navigation";
import SectionReveal from "@/components/ui/SectionReveal";
import { ArrowRight } from "lucide-react";
import { getFeaturedZones, servicesForZone } from "@/lib/zones";

export default async function ZonesExploreSection() {
  const tAreas = await getTranslations("areas");
  const tZp = await getTranslations("zonePage");
  const tHome = await getTranslations("homeZones");

  const zones = getFeaturedZones(5);

  return (
    <section className="relative py-16 lg:py-24 px-6 overflow-hidden" style={{ background: "var(--color-neutral)" }}>
      <div className="relative mx-auto" style={{ maxWidth: "var(--max-content)" }}>
        <div className="text-center mb-12">
          <SectionReveal>
            <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-primary font-semibold mb-6">
              {tHome("eyebrow")}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light leading-tight mb-5 tracking-[-0.02em] text-text">
              {tHome("headline")}
            </h2>
            <div className="w-10 h-[2px] mx-auto mb-5 rounded-full" style={{ background: "var(--color-tertiary)" }} />
            <p className="font-sans text-sm sm:text-base max-w-md mx-auto leading-relaxed text-text-soft">
              {tHome("subtitle")}
            </p>
          </SectionReveal>
        </div>

        {/* Featured zone tiles — asymmetric bento-style grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {zones.map((z, i) => {
            const count = servicesForZone(z.slug).length;
            // First tile spans 2 cols on desktop for asymmetric feel
            const featured = i === 0;
            return (
              <SectionReveal
                key={z.slug}
                delay={i * 0.06}
                className={featured ? "col-span-2 lg:row-span-2" : ""}
              >
                <Link
                  href={`/zones/${z.slug}`}
                  className={`group relative block rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_48px_rgba(166,93,70,0.15)] hover:-translate-y-1 transition-all duration-400 ${
                    featured ? "aspect-[1/1] lg:aspect-auto lg:h-full" : "aspect-square"
                  }`}
                >
                  {z.image && (
                    <Image
                      src={z.image}
                      alt={tAreas(z.slug)}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/80 font-semibold mb-1.5">
                      {count} {count > 1 ? tZp("treatmentsPlural") : tZp("treatmentsSingular")}
                    </p>
                    <h3 className={`font-serif text-white font-light tracking-[-0.01em] ${featured ? "text-4xl sm:text-5xl" : "text-xl sm:text-2xl"}`}>
                      {tAreas(z.slug)}
                    </h3>
                  </div>
                </Link>
              </SectionReveal>
            );
          })}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-10">
          <Link
            href="/zones"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold tracking-wide uppercase group transition-colors duration-200"
            style={{ color: "var(--color-primary-dark)" }}
          >
            {tHome("viewAll")}
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
