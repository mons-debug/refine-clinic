"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { CLINIC } from "@/lib/clinic";
import { AREA_ICONS, AREA_KEYS, type AreaKey } from "@/lib/area-icons";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/* ───────────────────── Types ───────────────────── */

interface ServicesExplorerProps {
  headline: string;
  subtitle: string;
}

type FilterType = "all" | "injectable" | "soins" | "chirurgie";

const FILTER_TYPES: { key: FilterType; labelKey: string }[] = [
  { key: "all", labelKey: "filter_all" },
  { key: "injectable", labelKey: "filter_injectable" },
  { key: "soins", labelKey: "filter_soins" },
  { key: "chirurgie", labelKey: "filter_chirurgie" },
];

const CARDS_PER_PAGE = 3;

/* ───────────────────── Component ───────────────────── */

export default function ServicesExplorer({ headline, subtitle }: ServicesExplorerProps) {
  const t = useTranslations("services");
  const tAreas = useTranslations("areas");

  const [activeType, setActiveType] = useState<FilterType>("all");
  const [selectedArea, setSelectedArea] = useState<AreaKey | null>(null);
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);

  // Filter services
  const filteredServices = useMemo(() => {
    return CLINIC.services.filter((s) => {
      const matchType = activeType === "all" || s.filterType === activeType;
      const matchArea = !selectedArea || (s.area as readonly string[]).includes(selectedArea);
      return matchType && matchArea;
    });
  }, [activeType, selectedArea]);

  // Reset visible count when filters change
  const handleTypeChange = useCallback((type: FilterType) => {
    setActiveType(type);
    setVisibleCount(CARDS_PER_PAGE);
  }, []);

  const handleAreaClick = useCallback((area: AreaKey) => {
    setSelectedArea((prev) => (prev === area ? null : area));
    setVisibleCount(CARDS_PER_PAGE);
  }, []);

  const visibleServices = filteredServices.slice(0, visibleCount);
  const hasMore = visibleCount < filteredServices.length;

  return (
    <section className="relative py-24 lg:py-32 px-6 overflow-hidden">
      <div className="relative mx-auto" style={{ maxWidth: "var(--max-content)" }}>

        {/* ── Section header ── */}
        <div className="text-center mb-12">
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

        {/* ── Category pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {FILTER_TYPES.map(({ key, labelKey }) => (
            <button
              key={key}
              onClick={() => handleTypeChange(key)}
              className={cn(
                "font-sans text-[12px] font-medium tracking-[0.05em] px-5 py-2.5 rounded-full border transition-all duration-200",
                activeType === key
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "bg-white text-text-soft border-tertiary hover:border-primary/40 hover:text-text"
              )}
            >
              {t(labelKey)}
            </button>
          ))}
        </motion.div>

        {/* ── Body area icons ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-14"
        >
          <div
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
                      width: 52,
                      height: 52,
                      backgroundColor: isSelected
                        ? "var(--color-primary)"
                        : "var(--color-neutral)",
                      color: isSelected ? "#fff" : "var(--color-text)",
                      boxShadow: isSelected
                        ? "0 4px 20px color-mix(in srgb, var(--color-primary) 35%, transparent)"
                        : "0 1px 4px rgba(0,0,0,0.06)",
                    }}
                  >
                    {(() => { const Icon = AREA_ICONS[area]; return <Icon className="w-6 h-6" />; })()}
                  </motion.div>
                  <span
                    className="text-[10px] font-sans font-medium tracking-wide transition-colors duration-200"
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

        {/* ── Service cards — Desktop: grid, Mobile: swipe carousel ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeType}-${selectedArea}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {filteredServices.length === 0 ? (
              <p className="text-center font-sans text-text-soft py-16">
                {t("no_results")}
              </p>
            ) : (
              <>
                {/* Desktop grid */}
                <div className="hidden md:grid grid-cols-3 gap-6">
                  {visibleServices.map((service, i) => (
                    <ServiceCard key={service.slug} service={service} index={i} t={t} tAreas={tAreas} />
                  ))}
                </div>

                {/* Mobile carousel */}
                <MobileCarousel services={filteredServices} t={t} tAreas={tAreas} />
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── "Voir plus" button (desktop only) ── */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="hidden md:flex justify-center mt-8"
          >
            <button
              onClick={() => setVisibleCount((prev) => prev + CARDS_PER_PAGE)}
              className="font-sans text-sm font-semibold px-8 py-3 rounded-full border-2 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-200"
            >
              {t("view_more") ?? "Voir plus"} ({filteredServices.length - visibleCount} {t("remaining") ?? "restants"})
            </button>
          </motion.div>
        )}

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
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

/* ───────────────────── Service Card ───────────────────── */

function ServiceCard({
  service,
  index,
  t,
  tAreas,
}: {
  service: (typeof CLINIC.services)[number];
  index: number;
  t: ReturnType<typeof useTranslations>;
  tAreas: ReturnType<typeof useTranslations>;
}) {
  const typeLabels: Record<string, string> = {
    injectable: t("filter_injectable"),
    soins: t("filter_soins"),
    chirurgie: t("filter_chirurgie"),
  };

  const doctorName =
    service.doctor === "meryem"
      ? CLINIC.doctors.meryem.name
      : CLINIC.doctors.amr.name;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        href={`/services/${service.slug}`}
        className="group block rounded-2xl overflow-hidden bg-white shadow-[0_1px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={service.image}
            alt={t(`${service.nameKey}.name`)}
            fill
            sizes="(max-width: 768px) 85vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          {/* Type badge */}
          <span className="absolute top-3 right-3 text-[10px] font-sans font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full backdrop-blur-sm bg-white/80 text-text">
            {typeLabels[service.filterType] ?? service.filterType}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-serif text-lg font-medium mb-1 transition-colors duration-200 group-hover:text-[var(--color-primary-dark)] text-[var(--color-text)]">
            {t(`${service.nameKey}.name`)}
          </h3>
          <p className="font-sans text-sm leading-relaxed mb-3 line-clamp-2 text-[var(--color-text-soft)]">
            {t(`${service.nameKey}.desc`)}
          </p>

          {/* Doctor badge + area tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-sans font-medium px-2 py-0.5 rounded-full bg-[var(--color-primary)]/8 text-[var(--color-primary-dark)]">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: service.color }} />
              {doctorName.split(" ").slice(0, 2).join(" ")}
            </span>
            {(service.area as readonly string[]).slice(0, 3).map((areaKey) => (
              <span
                key={areaKey}
                className="text-[10px] font-sans font-medium px-2 py-0.5 rounded-full bg-[var(--color-neutral)] text-[var(--color-text-soft)]"
              >
                {tAreas(areaKey)}
              </span>
            ))}
            {service.area.length > 3 && (
              <span className="text-[10px] font-sans text-[var(--color-text-soft)]">
                +{service.area.length - 3}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ───────────────────── Mobile Carousel ───────────────────── */

function MobileCarousel({
  services,
  t,
  tAreas,
}: {
  services: readonly (typeof CLINIC.services)[number][];
  t: ReturnType<typeof useTranslations>;
  tAreas: ReturnType<typeof useTranslations>;
}) {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const threshold = 50;
      if (info.offset.x < -threshold && current < services.length - 1) {
        setCurrent((p) => p + 1);
      } else if (info.offset.x > threshold && current > 0) {
        setCurrent((p) => p - 1);
      }
    },
    [current, services.length]
  );

  // Reset current when services change
  const prevLen = useRef(services.length);
  if (services.length !== prevLen.current) {
    prevLen.current = services.length;
    if (current >= services.length) setCurrent(0);
  }

  return (
    <div className="md:hidden">
      <div className="overflow-hidden" ref={containerRef}>
        <motion.div
          className="flex gap-4"
          animate={{ x: -(current * 85) + "%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
        >
          {services.map((service) => (
            <div key={service.slug} className="w-[80%] shrink-0">
              <ServiceCard service={service} index={0} t={t} tAreas={tAreas} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dots */}
      {services.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-6">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "rounded-full transition-all duration-200",
                i === current
                  ? "w-6 h-2 bg-[var(--color-primary)]"
                  : "w-2 h-2 bg-[var(--color-tertiary)]"
              )}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
