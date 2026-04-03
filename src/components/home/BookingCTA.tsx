import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";
import { CLINIC } from "@/lib/clinic";
import SectionReveal from "@/components/ui/SectionReveal";

export default async function BookingCTA() {
  const t = await getTranslations("booking");

  return (
    <section className="py-24 lg:py-28 px-6 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)",
        }}
      />
      {/* Decorative circles */}
      <div className="absolute -top-24 -end-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-32 -start-16 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />

      <div
        className="relative mx-auto text-center"
        style={{ maxWidth: "var(--max-content)" }}
      >
        <SectionReveal>
          <p className="font-sans text-[11px] tracking-[0.35em] uppercase text-white/60 font-semibold mb-5">
            Refine Clinic
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-4 leading-tight">
            {t("title")}
          </h2>
          <p className="font-sans text-base sm:text-lg text-white/75 mb-10 max-w-lg mx-auto leading-relaxed">
            {t("subtitle")}
          </p>

          {/* Main CTA */}
          <Link
            href="/consultation"
            className="inline-block font-sans text-sm font-semibold px-10 py-4 rounded-full bg-white text-primary hover:bg-neutral transition-colors duration-200 shadow-lg mb-8"
          >
            {t("cta")}
          </Link>

          {/* WhatsApp secondary */}
          <p className="font-sans text-sm text-white/60">
            {t("whatsapp")}
            {" — "}
            <a
              href={`${CLINIC.whatsappLink}?text=${CLINIC.whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-2 hover:text-white/80 transition-colors"
            >
              {CLINIC.whatsapp}
            </a>
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
