import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Questions Fréquentes | Refine Clinic Tanger",
  description: "Toutes vos questions sur nos soins esthétiques, l'épilation laser, les injections, la chirurgie plastique et le fonctionnement de Refine Clinic à Tanger.",
  openGraph: {
    title: "FAQ | Refine Clinic Tanger",
    description: "Réponses à vos questions sur nos soins médicaux et esthétiques.",
    url: "https://refineclinic.ma/fr/faq",
    siteName: "Refine Clinic",
    type: "website",
  },
  alternates: {
    canonical: "https://refineclinic.ma/fr/faq",
    languages: {
      fr: "https://refineclinic.ma/fr/faq",
      ar: "https://refineclinic.ma/ar/faq",
      en: "https://refineclinic.ma/en/faq",
    },
  },
};
import PageHeader from "@/components/ui/PageHeader";
import FAQAccordion from "@/components/ui/FAQAccordion";
import SectionReveal from "@/components/ui/SectionReveal";
import BookingCTA from "@/components/home/BookingCTA";
import { Link } from "@/lib/navigation";
import { ArrowRight } from "lucide-react";

const FAQ_DATA = [
  {
    category: "Général",
    items: [
      {
        q: "Quels sont vos horaires d'ouverture ?",
        a: "Nous sommes ouverts du lundi au samedi de 9h00 à 19h00. Prenez rendez-vous par téléphone, WhatsApp ou via notre formulaire en ligne.",
      },
      {
        q: "Comment prendre rendez-vous ?",
        a: "Vous pouvez nous contacter par téléphone au 05399 42632, via WhatsApp au +212539942632, ou remplir notre formulaire de consultation en ligne. Nous vous recontactons sous 24h.",
      },
      {
        q: "Où se situe la clinique ?",
        a: "Refine Clinic se trouve au Centre Business Salman, Avenue Abi Al Hassan Echadli, 4ème étage, App.16, Tanger.",
      },
      {
        q: "Quels modes de paiement acceptez-vous ?",
        a: "Nous acceptons les paiements en espèces et par virement bancaire. Renseignez-vous lors de votre consultation pour les modalités de paiement échelonné.",
      },
    ],
  },
  {
    category: "Médecine Esthétique",
    items: [
      {
        q: "Les injections de Botox ou de fillers sont-elles douloureuses ?",
        a: "Les injections sont réalisées avec une crème anesthésiante et des aiguilles ultra-fines. L'inconfort est minime et de courte durée.",
      },
      {
        q: "Combien de temps durent les effets du Botox ?",
        a: "Les effets du Botox durent généralement entre 4 et 6 mois, selon le patient et la zone traitée.",
      },
      {
        q: "À partir de quel âge peut-on commencer les soins esthétiques ?",
        a: "Chaque cas est évalué individuellement lors de la consultation. En général, les soins préventifs peuvent commencer dès 25 ans.",
      },
    ],
  },
  {
    category: "Épilation Laser",
    items: [
      {
        q: "Combien de séances sont nécessaires pour l'épilation laser ?",
        a: "En moyenne, 6 à 8 séances espacées de 4 à 6 semaines sont nécessaires pour un résultat optimal et durable.",
      },
      {
        q: "L'épilation laser est-elle douloureuse ?",
        a: "La technologie utilisée à Refine Clinic est conçue pour minimiser l'inconfort. La plupart des patients décrivent une légère sensation de chaleur.",
      },
      {
        q: "Quelles zones peut-on traiter ?",
        a: "Toutes les zones du corps : jambes, aisselles, maillot, dos, visage, bras et bien plus encore.",
      },
    ],
  },
  {
    category: "Chirurgie Plastique",
    items: [
      {
        q: "Comment se déroule une première consultation chirurgicale ?",
        a: "Le Dr. Amr réalise un bilan complet, écoute vos attentes, vous explique les options disponibles et répond à toutes vos questions. Aucune décision n'est prise en consultation initiale.",
      },
      {
        q: "Quelle est la durée de récupération après une liposuccion ?",
        a: "La reprise d'activité légère est possible après 1 semaine. La récupération complète varie entre 4 et 6 semaines selon les patients.",
      },
      {
        q: "Les résultats de la chirurgie plastique sont-ils permanents ?",
        a: "Les résultats sont durables à condition de maintenir un mode de vie sain. Le Dr. Amr vous accompagne avec un suivi post-opératoire personnalisé.",
      },
    ],
  },
  {
    category: "Sécurité",
    items: [
      {
        q: "Qui réalise les traitements à Refine Clinic ?",
        a: "Tous les soins sont réalisés exclusivement par les médecins de la clinique — le Dr. Meryem pour la médecine esthétique et le Dr. Amr pour la chirurgie. Jamais délégués à des assistants non médicaux.",
      },
      {
        q: "Y a-t-il des contre-indications aux soins esthétiques ?",
        a: "Certains traitements ont des contre-indications (grossesse, maladies auto-immunes, certains médicaments). Tout est évalué lors de votre consultation médicale préalable.",
      },
    ],
  },
];

export default async function FAQPage() {
  const t = await getTranslations("faq");

  return (
    <>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumbs={[{ label: t("title") }]}
        size="default"
      />

      <section className="py-24 lg:py-32 px-6 bg-neutral">
        <div className="mx-auto max-w-3xl" style={{ maxWidth: "var(--max-content)" }}>
          <div className="max-w-3xl mx-auto space-y-12">
            {FAQ_DATA.map(({ category, items }, ci) => (
              <SectionReveal key={ci} delay={ci * 0.05}>
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <h2 className="font-serif text-xl sm:text-2xl font-light text-text">
                      {category}
                    </h2>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-brand">
                    <FAQAccordion items={items} />
                  </div>
                </div>
              </SectionReveal>
            ))}

            {/* Still have questions */}
            <SectionReveal>
              <div
                className="rounded-2xl p-8 text-center text-white mt-8"
                style={{ background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)" }}
              >
                <h3 className="font-serif text-2xl font-light mb-3">Votre question n'est pas listée ?</h3>
                <p className="font-sans text-sm text-white/80 mb-6 leading-relaxed">
                  Contactez-nous directement — notre équipe vous répond dans les 24h.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/consultation"
                    className="inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold px-6 py-3 rounded-full bg-white text-primary hover:bg-neutral transition-colors"
                  >
                    Prendre RDV
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold px-6 py-3 rounded-full border border-white/40 text-white hover:bg-white/10 transition-colors"
                  >
                    Nous contacter
                  </Link>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </>
  );
}
