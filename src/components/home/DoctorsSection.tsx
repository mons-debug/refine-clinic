import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";
import { ArrowRight, Heart } from "lucide-react";
import { CLINIC } from "@/lib/clinic";
import SectionReveal from "@/components/ui/SectionReveal";

export default async function DoctorsSection() {
  const t = await getTranslations("doctors");
  const { meryem, amr } = CLINIC.doctors;

  const doctors = [meryem, amr];

  return (
    <section className="py-24 lg:py-32 px-6 bg-neutral-dark">
      <div className="mx-auto" style={{ maxWidth: "var(--max-content)" }}>
        {/* Header */}
        <SectionReveal className="text-center mb-16">
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-primary font-semibold mb-4">
            {t("title")}
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-text mb-5">
            {t("title")}
          </h2>
          <p className="font-sans text-base text-text-soft max-w-lg mx-auto">
            {t("subtitle")}
          </p>
        </SectionReveal>

        {/* Doctor cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {doctors.map((doc, i) => (
            <SectionReveal key={doc.slug} delay={i * 0.15}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-brand hover:shadow-brand-md hover:-translate-y-1 transition-all duration-300">
                {/* Monogram placeholder */}
                <div
                  className="relative h-64 flex items-center justify-center"
                  style={{
                    background:
                      i === 0
                        ? "linear-gradient(135deg, var(--color-tertiary) 0%, var(--color-neutral-dark) 100%)"
                        : "linear-gradient(135deg, var(--color-neutral-dark) 0%, var(--color-secondary) 100%)",
                  }}
                >
                  {/* Decorative ring */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-40 h-40 rounded-full border-2 opacity-20"
                      style={{ borderColor: "var(--color-primary)" }}
                    />
                    <div
                      className="absolute w-52 h-52 rounded-full border opacity-10"
                      style={{ borderColor: "var(--color-primary)" }}
                    />
                  </div>
                  {/* Initials */}
                  <div
                    className="relative z-10 w-28 h-28 rounded-full flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)",
                    }}
                  >
                    <span className="font-serif text-3xl font-light text-white">
                      {doc.initials}
                    </span>
                  </div>
                  {/* Photo slot label */}
                  <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-sans text-[10px] tracking-widest uppercase text-text-soft/50">
                    Photo à venir
                  </p>
                </div>

                {/* Info */}
                <div className="p-7">
                  <h3 className="font-serif text-xl font-semibold text-text mb-1">
                    {doc.name}
                  </h3>
                  <p className="font-sans text-sm text-primary font-medium mb-5">
                    {doc.title}
                  </p>

                  {/* Treatment tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {doc.treatments.slice(0, 4).map((tr) => (
                      <span
                        key={tr}
                        className="font-sans text-xs px-3 py-1 rounded-full bg-neutral text-text-soft border border-neutral-dark"
                      >
                        {tr}
                      </span>
                    ))}
                    {doc.treatments.length > 4 && (
                      <span className="font-sans text-xs px-3 py-1 rounded-full bg-neutral text-primary border border-tertiary">
                        +{doc.treatments.length - 4}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/doctors/${doc.slug}`}
                    className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-primary hover:gap-2.5 transition-all duration-200"
                  >
                    {t("meet")}
                    <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform" />
                  </Link>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Power Couple callout */}
        <SectionReveal>
          <div
            className="rounded-2xl p-8 sm:p-10 text-center text-white"
            style={{
              background:
                "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)",
            }}
          >
            <Heart className="w-6 h-6 text-white/60 mx-auto mb-4" aria-hidden />
            <h3 className="font-serif text-2xl sm:text-3xl font-light mb-4 leading-snug">
              {t("couple_headline")}
            </h3>
            <p className="font-sans text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
              {t("couple_text")}
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
