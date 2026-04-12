"use client";

import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";
import InfiniteSlider from "@/components/ui/InfiniteSlider";

interface Testimonial {
  name: string;
  treatment: string;
  text: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sophia M.",
    treatment: "Épilation Laser",
    text: "Une expérience exceptionnelle. Le Dr. Meryem est à l'écoute, professionnelle et les résultats dépassent mes attentes. Je recommande vivement Refine Clinic.",
  },
  {
    name: "Amira K.",
    treatment: "Fillers & Botox",
    text: "J'avais des appréhensions avant ma première consultation, mais l'équipe m'a mis à l'aise dès le premier instant. Résultats naturels et élégants.",
  },
  {
    name: "Nadia B.",
    treatment: "Liposuccion 4D",
    text: "Le Dr. Amr est un véritable artiste. Son expertise en chirurgie plastique est remarquable. Suivi post-opératoire impeccable et résultats au-delà de mes espérances.",
  },
  {
    name: "Yasmine H.",
    treatment: "PRP & Mésothérapie",
    text: "Clinique d'un niveau premium, équipe bienveillante et compétente. L'alliance du Dr. Meryem et du Dr. Amr sous le même toit est une vraie force. Je n'irais nulle part ailleurs.",
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl p-8 sm:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_8px_40px_rgba(166,93,70,0.08)] w-[340px] sm:w-[420px] flex-shrink-0 hover:-translate-y-1 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_12px_48px_rgba(166,93,70,0.12)] transition-all duration-300">
      {/* Quote mark */}
      <div
        className="font-serif text-5xl leading-none text-primary/20 select-none mb-1 -mt-2"
        aria-hidden
      >
        &ldquo;
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-3.5 h-3.5 fill-primary text-primary"
            aria-hidden
          />
        ))}
      </div>

      <blockquote className="font-sans text-sm sm:text-base text-text-soft leading-relaxed italic mb-6">
        &ldquo;{testimonial.text}&rdquo;
      </blockquote>

      <div>
        <p className="font-sans text-sm font-semibold text-text">
          {testimonial.name}
        </p>
        <p className="font-sans text-xs text-primary mt-0.5">
          {testimonial.treatment}
        </p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const t = useTranslations("testimonials");

  return (
    <section className="pt-8 lg:pt-12 pb-24 lg:pb-28 px-0 overflow-hidden" style={{ background: "var(--color-neutral)" }}>
      <div className="mx-auto px-6" style={{ maxWidth: "var(--max-content)" }}>
        <SectionReveal className="text-center mb-16">
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-primary font-semibold mb-4">
            Témoignages
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-text">
            {t("title")}
          </h2>
        </SectionReveal>
      </div>

      {/* Infinite scrolling testimonials */}
      <InfiniteSlider
        gap={24}
        speed={40}
        speedOnHover={15}
        className="py-2"
      >
        {TESTIMONIALS.map((testimonial) => (
          <TestimonialCard key={testimonial.name} testimonial={testimonial} />
        ))}
      </InfiniteSlider>
    </section>
  );
}
