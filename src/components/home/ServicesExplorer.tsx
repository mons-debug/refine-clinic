"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { CLINIC } from "@/lib/clinic";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

/* ───────────────────── Types ───────────────────── */

interface ServicesExplorerProps {
  headline: string;
  subtitle: string;
}

type AreaKey =
  | "front"
  | "yeux"
  | "nez"
  | "levres"
  | "cou"
  | "machoire"
  | "corps"
  | "ventre"
  | "bras"
  | "cuisses"
  | "cheveux"
  | "poitrine";

/* ───────────────────── Area SVG icons ───────────────────── */

const AREA_ICONS: Record<AreaKey, React.ReactNode> = {
  front: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 2C8.5 2 6 5 6 8.5c0 2 .5 3.5 1.5 5C9 15.5 10.5 17 12 22c1.5-5 3-6.5 4.5-8.5 1-1.5 1.5-3 1.5-5C18 5 15.5 2 12 2z" />
      <path d="M9 8h6" />
    </svg>
  ),
  yeux: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  nez: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 2v14" />
      <path d="M8 18c0-1 1.5-2 4-2s4 1 4 2" />
      <path d="M8 18c-1.5 0-2.5.5-2.5 1.5S7 21 8 21" />
      <path d="M16 18c1.5 0 2.5.5 2.5 1.5S17 21 16 21" />
    </svg>
  ),
  levres: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M3 12c3-2 5-3.5 9-3.5s6 1.5 9 3.5" />
      <path d="M3 12c3 3 5 5 9 5s6-2 9-5" />
      <path d="M3 12c1.5-.5 4-1 5 0s2.5 1 4 0 3.5-.5 5 0" />
    </svg>
  ),
  cou: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M8 2c0 3-1 6-1 10s1 7 2 10" />
      <path d="M16 2c0 3 1 6 1 10s-1 7-2 10" />
      <path d="M7 8h10" />
      <path d="M6 14h12" />
    </svg>
  ),
  machoire: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M4 8c0-3 3-6 8-6s8 3 8 6" />
      <path d="M4 8c0 5-1 8 2 11s4 3 6 3 3 0 6-3 2-6 2-11" />
    </svg>
  ),
  corps: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="12" cy="4" r="2" />
      <path d="M12 6v8" />
      <path d="M8 8l4 2 4-2" />
      <path d="M10 22l2-8 2 8" />
    </svg>
  ),
  ventre: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <ellipse cx="12" cy="13" rx="6" ry="7" />
      <path d="M12 9v3" />
      <circle cx="12" cy="13" r="1" />
    </svg>
  ),
  bras: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M6 4c-1 4-2 8 0 12s4 6 6 6" />
      <path d="M6 4c2 0 4 1 5 3" />
      <path d="M12 22c0-3 1-5 3-7" />
    </svg>
  ),
  cuisses: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M8 2c-1 5-2 10-1 15s2 5 3 5" />
      <path d="M16 2c1 5 2 10 1 15s-2 5-3 5" />
    </svg>
  ),
  cheveux: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 2C8 2 5 4 5 7c0 2 1 3 2 4" />
      <path d="M12 2c4 0 7 2 7 5 0 2-1 3-2 4" />
      <path d="M4 9c-1 3 0 6 2 8" />
      <path d="M20 9c1 3 0 6-2 8" />
      <path d="M8 14c0 4 2 8 4 8s4-4 4-8" />
    </svg>
  ),
  poitrine: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M4 10c0-3 3-6 8-6s8 3 8 6" />
      <path d="M4 10c0 4 3 8 8 8s8-4 8-8" />
      <path d="M12 4v14" />
    </svg>
  ),
};

const AREA_KEYS: AreaKey[] = [
  "front",
  "yeux",
  "nez",
  "levres",
  "cou",
  "machoire",
  "corps",
  "ventre",
  "bras",
  "cuisses",
  "cheveux",
  "poitrine",
];

const FILTER_TYPE_STYLES: Record<string, { bg: string; text: string }> = {
  injectable: { bg: "bg-[var(--color-primary)]/10", text: "text-[var(--color-primary-dark)]" },
  soins: { bg: "bg-[var(--color-secondary)]/10", text: "text-[var(--color-secondary)]" },
  chirurgie: { bg: "bg-[var(--color-tertiary)]/10", text: "text-[var(--color-tertiary)]" },
};

const FILTER_TYPE_KEYS: Record<string, string> = {
  injectable: "filter_injectable",
  soins: "filter_soins",
  chirurgie: "filter_chirurgie",
};

/* ───────────────────── Animation variants ───────────────────── */

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.06,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.96,
    transition: { duration: 0.25 },
  },
};

/* ───────────────────── Component ───────────────────── */

export default function ServicesExplorer({ headline, subtitle }: ServicesExplorerProps) {
  const t = useTranslations("services");
  const tAreas = useTranslations("areas");
  const [selectedArea, setSelectedArea] = useState<AreaKey | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredServices = useMemo(() => {
    if (!selectedArea) return [...CLINIC.services];
    return CLINIC.services.filter((s) =>
      (s.area as readonly string[]).includes(selectedArea)
    );
  }, [selectedArea]);

  function handleAreaClick(area: AreaKey) {
    setSelectedArea((prev) => (prev === area ? null : area));
  }

  return (
    <section className="relative py-24 lg:py-32 px-6 overflow-hidden">
      <div className="relative mx-auto" style={{ maxWidth: "var(--max-content)" }}>
        {/* ── Section header ── */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-sans text-[11px] tracking-[0.35em] uppercase font-semibold mb-4"
            style={{ color: "var(--color-primary)" }}
          >
            {t("title")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-4"
            style={{ color: "var(--color-text)" }}
          >
            {headline}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-base sm:text-lg max-w-xl mx-auto"
            style={{ color: "var(--color-text-soft)" }}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* ── Area selector ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-12"
        >
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide sm:flex-wrap sm:justify-center"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {AREA_KEYS.map((area) => {
              const isSelected = selectedArea === area;
              return (
                <button
                  key={area}
                  onClick={() => handleAreaClick(area)}
                  className="flex flex-col items-center gap-2 snap-center shrink-0 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex items-center justify-center rounded-full transition-shadow duration-300"
                    style={{
                      width: 56,
                      height: 56,
                      backgroundColor: isSelected
                        ? "var(--color-primary)"
                        : "var(--color-neutral)",
                      color: isSelected ? "#fff" : "var(--color-text)",
                      boxShadow: isSelected
                        ? "0 4px 20px color-mix(in srgb, var(--color-primary) 35%, transparent)"
                        : "0 1px 4px rgba(0,0,0,0.06)",
                    }}
                  >
                    {AREA_ICONS[area]}
                  </motion.div>
                  <span
                    className="text-[11px] font-sans font-medium tracking-wide transition-colors duration-200"
                    style={{
                      color: isSelected
                        ? "var(--color-primary-dark)"
                        : "var(--color-text-soft)",
                    }}
                  >
                    {tAreas(area)}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Service cards grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, i) => {
              const typeStyle =
                FILTER_TYPE_STYLES[service.filterType] ?? FILTER_TYPE_STYLES.injectable;
              const typeLabel = t(FILTER_TYPE_KEYS[service.filterType] ?? "filter_injectable");

              return (
                <motion.div
                  key={service.slug}
                  layout
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="group block rounded-2xl overflow-hidden bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={t(`${service.nameKey}.name`)}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      {/* Type badge on image */}
                      <span
                        className={`absolute top-3 right-3 text-[10px] font-sans font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full backdrop-blur-sm ${typeStyle.bg} ${typeStyle.text}`}
                      >
                        {typeLabel}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3
                        className="font-serif text-lg font-medium mb-1.5 transition-colors duration-200 group-hover:text-[var(--color-primary-dark)]"
                        style={{ color: "var(--color-text)" }}
                      >
                        {t(`${service.nameKey}.name`)}
                      </h3>
                      <p
                        className="font-sans text-sm leading-relaxed mb-3 line-clamp-2"
                        style={{ color: "var(--color-text-soft)" }}
                      >
                        {t(`${service.nameKey}.desc`)}
                      </p>

                      {/* Area tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {(service.area as readonly string[]).map((areaKey) => (
                          <span
                            key={areaKey}
                            className="text-[10px] font-sans font-medium px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: "var(--color-neutral)",
                              color: "var(--color-text-soft)",
                            }}
                          >
                            {tAreas(areaKey)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-14"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold tracking-wide uppercase group transition-colors duration-200"
            style={{ color: "var(--color-primary-dark)" }}
          >
            {t("view_all")}
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
