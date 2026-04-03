"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Star } from "lucide-react";
import SectionReveal from "@/components/ui/SectionReveal";

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

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, paused]);

  return (
    <section className="py-24 lg:py-32 px-6 bg-neutral-dark overflow-hidden">
      <div className="mx-auto" style={{ maxWidth: "var(--max-content)" }}>
        <SectionReveal className="text-center mb-16">
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-primary font-semibold mb-4">
            Témoignages
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-text">
            {t("title")}
          </h2>
        </SectionReveal>

        {/* Carousel */}
        <div
          className="relative max-w-2xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white rounded-2xl p-8 sm:p-10 shadow-brand text-center"
            >
              {/* Quote mark */}
              <div
                className="font-serif text-7xl leading-none text-primary/20 select-none mb-2 -mt-4"
                aria-hidden
              >
                "
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary text-primary"
                    aria-hidden
                  />
                ))}
              </div>

              <blockquote className="font-sans text-base sm:text-lg text-text-soft leading-relaxed italic mb-7">
                "{TESTIMONIALS[current].text}"
              </blockquote>

              <div>
                <p className="font-sans text-sm font-semibold text-text">
                  {TESTIMONIALS[current].name}
                </p>
                <p className="font-sans text-xs text-primary mt-0.5">
                  {TESTIMONIALS[current].treatment}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Témoignage ${i + 1}`}
                className="transition-all duration-200"
              >
                <span
                  className={`block rounded-full transition-all duration-200 ${
                    i === current
                      ? "w-6 h-2 bg-primary"
                      : "w-2 h-2 bg-primary/30 hover:bg-primary/60"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
