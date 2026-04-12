import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { CLINIC } from "@/lib/clinic";
import SectionReveal from "@/components/ui/SectionReveal";
import InstagramGrid from "@/components/home/InstagramGrid";

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
    <section className="pt-8 lg:pt-12 pb-24 lg:pb-28 px-6" style={{ background: "var(--color-neutral)" }}>
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

        {/* Animated grid */}
        <InstagramGrid gradients={PLACEHOLDER_GRADIENTS} instagramUrl={CLINIC.instagramUrl} />

        <SectionReveal className="flex justify-center mt-10">
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
