import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Prendre Rendez-vous | Refine Clinic Tanger",
  description: "Réservez votre consultation médicale personnalisée à Refine Clinic Tanger. Réponse garantie sous 24h. Dr. Meryem & Dr. Amr.",
  openGraph: {
    title: "Réserver une Consultation | Refine Clinic Tanger",
    description: "Prenez rendez-vous en ligne pour une consultation médicale à Refine Clinic.",
    url: "https://refineclinic.ma/fr/consultation",
    siteName: "Refine Clinic",
    type: "website",
  },
  alternates: {
    canonical: "https://refineclinic.ma/fr/consultation",
    languages: {
      fr: "https://refineclinic.ma/fr/consultation",
      ar: "https://refineclinic.ma/ar/consultation",
      en: "https://refineclinic.ma/en/consultation",
    },
  },
};
import PageHeader from "@/components/ui/PageHeader";
import SectionReveal from "@/components/ui/SectionReveal";
import BookingForm from "@/components/ui/BookingForm";
import { CLINIC } from "@/lib/clinic";
import { Phone, MessageCircle, Clock } from "lucide-react";

export default async function ConsultationPage() {
  const t = await getTranslations("booking");
  const tForm = await getTranslations("form");

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbs={[{ label: t("breadcrumb") }]}
        size="default"
      />

      <section className="py-24 lg:py-32 px-6 bg-neutral">
        <div className="mx-auto" style={{ maxWidth: "var(--max-content)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Form */}
            <div className="lg:col-span-2">
              <SectionReveal>
                <div className="bg-white/55 backdrop-blur-xl rounded-2xl p-8 border border-white/50 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                  <h2 className="font-serif text-2xl font-light text-text mb-2">
                    {t("formTitle")}
                  </h2>
                  <p className="font-sans text-sm text-text-soft mb-7 leading-relaxed">
                    {t("formDesc")}
                  </p>
                  <div className="w-10 h-[2px] rounded-full bg-tertiary mb-8" />
                  <BookingForm />
                </div>
              </SectionReveal>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <SectionReveal delay={0.1}>
                <div className="bg-white/55 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                  <h3 className="font-serif text-lg font-light text-text mb-5">
                    {t("otherContact")}
                  </h3>

                  <div className="space-y-4">
                    {/* Phone */}
                    <a
                      href={`tel:${CLINIC.phone1.replace(/\s/g, "")}`}
                      className="flex items-center gap-3 p-4 rounded-xl bg-neutral hover:bg-neutral-dark transition-colors group"
                    >
                      <Phone className="w-4 h-4 text-primary shrink-0" aria-hidden />
                      <div>
                        <p className="font-sans text-xs font-semibold text-primary uppercase tracking-wider mb-0.5">{t("directCall")}</p>
                        <p className="font-sans text-sm text-text-soft">{CLINIC.phone1}</p>
                      </div>
                    </a>

                    {/* WhatsApp */}
                    <a
                      href={`${CLINIC.whatsappLink}?text=${CLINIC.whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors group"
                    >
                      <MessageCircle className="w-4 h-4 text-green-600 shrink-0" aria-hidden />
                      <div>
                        <p className="font-sans text-xs font-semibold text-green-700 uppercase tracking-wider mb-0.5">WhatsApp</p>
                        <p className="font-sans text-sm text-green-700/80">{CLINIC.whatsapp}</p>
                      </div>
                    </a>

                    {/* Hours */}
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-neutral">
                      <Clock className="w-4 h-4 text-primary shrink-0" aria-hidden />
                      <div>
                        <p className="font-sans text-xs font-semibold text-primary uppercase tracking-wider mb-0.5">{t("hours")}</p>
                        <p className="font-sans text-sm text-text-soft">{CLINIC.hours}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.2}>
                <div
                  className="rounded-2xl p-6 text-white"
                  style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)" }}
                >
                  <h3 className="font-serif text-lg font-light mb-3">{t("promise")}</h3>
                  <ul className="space-y-2.5">
                    {[
                      t("promise1"),
                      t("promise2"),
                      t("promise3"),
                      t("promise4"),
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2.5 font-sans text-xs text-white/85">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </SectionReveal>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
