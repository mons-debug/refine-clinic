import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Contact | Refine Clinic Tanger",
  description: "Contactez Refine Clinic à Tanger. Avenue Abi Al Hassan Echadli, Centre Business Salman. Tél: 05399 42632. Ouvert lundi–samedi 9h–19h.",
  openGraph: {
    title: "Contacter Refine Clinic | Tanger",
    description: "Adresse, téléphone, horaires et formulaire de contact — Refine Clinic Tanger.",
    url: "https://refineclinic.ma/fr/contact",
    siteName: "Refine Clinic",
    type: "website",
  },
  alternates: {
    canonical: "https://refineclinic.ma/fr/contact",
    languages: {
      fr: "https://refineclinic.ma/fr/contact",
      ar: "https://refineclinic.ma/ar/contact",
      en: "https://refineclinic.ma/en/contact",
    },
  },
};
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SectionReveal from "@/components/ui/SectionReveal";
import ContactForm from "@/components/ui/ContactForm";
import { CLINIC } from "@/lib/clinic";

export default async function ContactPage() {
  const t = await getTranslations("contact");

  const infoItems = [
    {
      icon: MapPin,
      title: t("address_title"),
      lines: [CLINIC.address.street, CLINIC.address.building, `${CLINIC.address.city}, ${CLINIC.address.country}`],
      link: CLINIC.address.mapsUrl,
      linkLabel: "Voir sur Google Maps",
    },
    {
      icon: Clock,
      title: t("hours_title"),
      lines: [CLINIC.hours],
    },
    {
      icon: Phone,
      title: t("phone_title"),
      lines: [CLINIC.phone1, CLINIC.phone2],
      link: `tel:${CLINIC.phone1.replace(/\s/g, "")}`,
      linkLabel: "Appeler maintenant",
    },
    {
      icon: Mail,
      title: t("email_title"),
      lines: [CLINIC.email],
      link: `mailto:${CLINIC.email}`,
      linkLabel: "Envoyer un email",
    },
  ];

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbs={[{ label: t("title") }]}
        size="default"
      />

      <section className="py-24 lg:py-32 px-6 bg-neutral">
        <div className="mx-auto" style={{ maxWidth: "var(--max-content)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

            {/* Left — info + map */}
            <div className="space-y-10">
              {/* Contact info cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {infoItems.map(({ icon: Icon, title, lines, link, linkLabel }, i) => (
                  <SectionReveal key={i} delay={i * 0.08}>
                    <div className="bg-white/55 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-[0_4px_24px_rgba(0,0,0,0.04)] h-full">
                      <div className="flex items-center gap-2.5 mb-4">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "var(--color-neutral-dark)" }}>
                          <Icon className="w-4 h-4 text-primary" aria-hidden />
                        </div>
                        <span className="font-sans text-xs font-semibold uppercase tracking-widest text-primary">
                          {title}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        {lines.map((line, li) => (
                          <p key={li} className="font-sans text-sm text-text-soft leading-relaxed">
                            {line}
                          </p>
                        ))}
                      </div>
                      {link && linkLabel && (
                        <a
                          href={link}
                          target={link.startsWith("http") ? "_blank" : undefined}
                          rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="mt-3 inline-block font-sans text-xs font-semibold text-primary hover:underline"
                        >
                          {linkLabel} →
                        </a>
                      )}
                    </div>
                  </SectionReveal>
                ))}
              </div>

              {/* Map embed */}
              <SectionReveal>
                <div className="rounded-2xl overflow-hidden border border-white/50 shadow-[0_4px_24px_rgba(0,0,0,0.04)] h-72 bg-neutral-dark flex items-center justify-center relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.9!2d-5.8!3d35.77!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQ2JzEyLjAiTiA1wrA0OCcwMC4wIlc!5e0!3m2!1sfr!2sma!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Refine Clinic — Tanger"
                    className="absolute inset-0 w-full h-full"
                  />
                  <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-neutral-dark" />
                </div>
              </SectionReveal>

              {/* WhatsApp CTA */}
              <SectionReveal>
                <a
                  href={`${CLINIC.whatsappLink}?text=${CLINIC.whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-5 bg-white/55 backdrop-blur-xl rounded-2xl border border-white/50 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(166,93,70,0.1)] hover:-translate-y-0.5 transition-all duration-200 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-green-500 flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-text group-hover:text-primary transition-colors">
                      Contacter via WhatsApp
                    </p>
                    <p className="font-sans text-xs text-text-soft">{CLINIC.whatsapp}</p>
                  </div>
                </a>
              </SectionReveal>
            </div>

            {/* Right — contact form */}
            <SectionReveal delay={0.1}>
              <div className="bg-white/55 backdrop-blur-xl rounded-2xl p-8 border border-white/50 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                <h2 className="font-serif text-2xl font-light text-text mb-2">
                  {t("form_title")}
                </h2>
                <div className="w-10 h-[2px] rounded-full bg-tertiary mb-7" />
                <ContactForm />
              </div>
            </SectionReveal>

          </div>
        </div>
      </section>
    </>
  );
}
