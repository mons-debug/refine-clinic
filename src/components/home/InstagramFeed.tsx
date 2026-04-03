import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { CLINIC } from "@/lib/clinic";
import SectionReveal from "@/components/ui/SectionReveal";

const PLACEHOLDER_GRADIENTS = [
  "linear-gradient(135deg, #A65D46 0%, #D9BBA9 100%)",
  "linear-gradient(135deg, #8C736A 0%, #F5F0E6 100%)",
  "linear-gradient(135deg, #D9BBA9 0%, #A65D46 100%)",
  "linear-gradient(135deg, #EDE7D9 0%, #8C736A 100%)",
  "linear-gradient(135deg, #A65D46 0%, #8C736A 100%)",
  "linear-gradient(135deg, #F5F0E6 0%, #D9BBA9 100%)",
];

export default async function InstagramFeed() {
  const t = await getTranslations("instagram");

  return (
    <section className="py-24 lg:py-32 px-6 bg-neutral-dark">
      <div className="mx-auto" style={{ maxWidth: "var(--max-content)" }}>
        <SectionReveal className="text-center mb-12">
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-primary font-semibold mb-3">
            Instagram
          </p>
          <h2 className="font-serif text-4xl font-light text-text mb-2">
            {t("title")}
          </h2>
          <p className="font-sans text-sm text-text-soft">
            {CLINIC.instagram}
          </p>
        </SectionReveal>

        {/* 6-image grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
          {PLACEHOLDER_GRADIENTS.map((bg, i) => (
            <SectionReveal key={i} delay={i * 0.08}>
              <a
                href={CLINIC.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Post Instagram ${i + 1}`}
                className="block aspect-square rounded-xl overflow-hidden group relative"
              >
                <div
                  className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                  style={{ background: bg }}
                />
                <div className="absolute inset-0 bg-text/0 group-hover:bg-text/20 transition-colors duration-300 rounded-xl" />
                {/* Placeholder text */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-sans text-[10px] tracking-widest uppercase text-white font-medium">
                    Voir
                  </span>
                </div>
              </a>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal className="flex justify-center">
          <a
            href={CLINIC.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold px-7 py-3 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200"
          >
            {t("cta")}
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </a>
        </SectionReveal>
      </div>
    </section>
  );
}
