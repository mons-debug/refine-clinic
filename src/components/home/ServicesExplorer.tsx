"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { CLINIC } from "@/lib/clinic";
import { AREA_ICONS, AREA_KEYS, type AreaKey } from "@/lib/area-icons";
import { ArrowRight, Syringe, Hand, Scissors } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/* ───────────────────── Types ───────────────────── */

interface ServicesExplorerProps {
  headline: string;
  subtitle: string;
}

type FilterType = "all" | "injectable" | "soins" | "chirurgie";

const CATEGORY_ICONS = {
  injectable: Syringe,
  soins: Hand,
  chirurgie: Scissors,
};

const CARDS_PER_PAGE = 3;

/* ───────────────────── Component ───────────────────── */

export default function ServicesExplorer({ headline, subtitle }: ServicesExplorerProps) {
  const t = useTranslations("services");
  const tAreas = useTranslations("areas");

  const [activeType, setActiveType] = useState<FilterType>("all");
  const [selectedArea, setSelectedArea] = useState<AreaKey | null>(null);
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);

  // Count services per category
  const counts = useMemo(() => ({
    injectable: CLINIC.services.filter(s => s.filterType === "injectable").length,
    soins: CLINIC.services.filter(s => s.filterType === "soins").length,
    chirurgie: CLINIC.services.filter(s => s.filterType === "chirurgie").length,
  }), []);

  // Get available areas for current category
  const availableAreas = useMemo(() => {
    const services = activeType === "all"
      ? CLINIC.services
      : CLINIC.services.filter(s => s.filterType === activeType);
    const areas = new Set<string>();
    services.forEach(s => (s.area as readonly string[]).forEach(a => areas.add(a)));
    return AREA_KEYS.filter(k => areas.has(k));
  }, [activeType]);

  // Filter services
  const filteredServices = useMemo(() => {
    return CLINIC.services.filter((s) => {
      const matchType = activeType === "all" || s.filterType === activeType;
      const matchArea = !selectedArea || (s.area as readonly string[]).includes(selectedArea);
      return matchType && matchArea;
    });
  }, [activeType, selectedArea]);

  const handleTypeChange = useCallback((type: FilterType) => {
    setActiveType(type);
    setSelectedArea(null);
    setVisibleCount(CARDS_PER_PAGE);
  }, []);

  const handleAreaClick = useCallback((area: AreaKey) => {
    setSelectedArea((prev) => (prev === area ? null : area));
    setVisibleCount(CARDS_PER_PAGE);
  }, []);

  const visibleServices = filteredServices.slice(0, visibleCount);
  const hasMore = visibleCount < filteredServices.length;

  return (
    <section className="relative pt-8 lg:pt-10 pb-12 lg:pb-16 px-6 overflow-hidden" style={{ background: "var(--color-neutral)" }}>
      <div className="relative mx-auto" style={{ maxWidth: "var(--max-content)" }}>

        {/* ── Section header ── */}
        <div className="text-center mb-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-sans text-[11px] tracking-[0.4em] uppercase font-semibold mb-6"
            style={{ color: "var(--color-primary)" }}
          >
            {t("title")}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light leading-tight mb-5 tracking-[-0.02em]"
            style={{ color: "var(--color-text)" }}
          >
            {headline}
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="w-10 h-[2px] mx-auto mb-5 origin-center rounded-full"
            style={{ background: "var(--color-tertiary)" }}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-sm sm:text-base max-w-md mx-auto leading-relaxed"
            style={{ color: "var(--color-secondary)" }}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* ── Unified Filter Block — glass container ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="relative rounded-none sm:rounded-2xl p-4 sm:p-5 mb-10 -mx-6 px-6 sm:mx-0 sm:px-5"
          style={{
            background: "rgba(255,255,255,0.45)",
            backdropFilter: "blur(20px) saturate(1.3)",
            WebkitBackdropFilter: "blur(20px) saturate(1.3)",
            border: "1px solid rgba(255,255,255,0.5)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          {/* Noise overlay */}
          <div className="absolute inset-0 rounded-2xl opacity-[0.03] pointer-events-none mix-blend-multiply overflow-hidden"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />

          <div className="relative z-10">
            {/* Category tabs — 3 glass cards */}
            <LayoutGroup>
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                {(["injectable", "soins", "chirurgie"] as const).map((type) => {
                  const isActive = activeType === type;
                  const Icon = CATEGORY_ICONS[type];
                  return (
                    <button
                      key={type}
                      onClick={() => handleTypeChange(type)}
                      className={cn(
                        "relative flex flex-col items-center gap-1.5 sm:gap-2 py-3 sm:py-4 rounded-xl transition-all duration-300",
                        isActive
                          ? "text-white"
                          : "text-[var(--color-text-soft)] hover:text-[var(--color-text)]"
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="category-bg"
                          className="absolute inset-0 rounded-xl"
                          style={{
                            background: "var(--color-primary)",
                            boxShadow: "0 4px 20px rgba(166,93,70,0.3)",
                          }}
                          transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                        />
                      )}
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
                      <span className="font-sans text-[9px] sm:text-[11px] font-semibold tracking-[0.08em] uppercase relative z-10">
                        {t(`filter_${type}`)}
                      </span>
                      <span className={cn(
                        "font-sans text-[8px] sm:text-[9px] relative z-10 font-medium",
                        isActive ? "text-white/70" : "text-[var(--color-secondary)]"
                      )}>
                        {counts[type]} {counts[type] > 1 ? "soins" : "soin"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>

            {/* Divider */}
            <div className="h-px mb-4" style={{ background: "rgba(255,255,255,0.4)" }} />

            {/* Body area icons — contextual to category */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeType}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 snap-x snap-mandatory scrollbar-hide sm:flex-wrap sm:justify-center"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {/* "All" chip */}
                  <button
                    onClick={() => setSelectedArea(null)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-lg snap-center shrink-0 transition-all duration-200 font-sans text-[10px] sm:text-[11px] font-medium",
                      !selectedArea
                        ? "bg-[var(--color-text)] text-white shadow-sm"
                        : "bg-white/50 text-[var(--color-text-soft)] hover:bg-white/70"
                    )}
                  >
                    {t("filter_all")}
                  </button>

                  {availableAreas.map((area) => {
                    const isSelected = selectedArea === area;
                    const Icon = AREA_ICONS[area];
                    return (
                      <button
                        key={area}
                        onClick={() => handleAreaClick(area)}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-2 rounded-lg snap-center shrink-0 transition-all duration-200",
                          isSelected
                            ? "bg-[var(--color-text)] text-white shadow-sm"
                            : "bg-white/50 text-[var(--color-text-soft)] hover:bg-white/70"
                        )}
                      >
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="font-sans text-[10px] sm:text-[11px] font-medium whitespace-nowrap">
                          {tAreas(area)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
            {/* Divider before cards */}
            <div className="h-px my-4" style={{ background: "rgba(255,255,255,0.3)" }} />

            {/* Results count */}
            <p className="font-sans text-[11px] font-medium mb-4" style={{ color: "var(--color-secondary)" }}>
              {filteredServices.length} {filteredServices.length > 1 ? "soins" : "soin"} {selectedArea ? `· ${tAreas(selectedArea)}` : ""}
            </p>

            {/* Service cards — inside the glass */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeType}-${selectedArea}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {filteredServices.length === 0 ? (
                  <p className="text-center font-sans text-text-soft py-12">
                    {t("no_results")}
                  </p>
                ) : (
                  <>
                    {/* Desktop grid */}
                    <div className="hidden md:grid grid-cols-3 gap-4">
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

            {/* "Voir plus" */}
            {hasMore && (
              <div className="hidden md:flex justify-center mt-6">
                <button
                  onClick={() => setVisibleCount((prev) => prev + CARDS_PER_PAGE)}
                  className="font-sans text-sm font-semibold px-8 py-3 rounded-full bg-white/60 text-primary hover:bg-primary hover:text-white transition-all duration-200"
                >
                  {t("view_more") ?? "Voir plus"} ({filteredServices.length - visibleCount} {t("remaining") ?? "restants"})
                </button>
              </div>
            )}

            {/* Bottom CTA — inside glass */}
            <div className="text-center mt-6 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.3)" }}>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 font-sans text-sm font-semibold tracking-wide uppercase group transition-colors duration-200"
                style={{ color: "var(--color-primary-dark)" }}
              >
                {t("view_all")}
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
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
        href={`/services?selected=${service.slug}`}
        className="group block relative rounded-2xl overflow-hidden h-80 sm:h-96 hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)]"
      >
        <Image
          src={service.image}
          alt={t(`${service.nameKey}.name`)}
          fill
          sizes="(max-width: 768px) 85vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span className="absolute top-3 right-3 z-10 text-[10px] font-sans font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full backdrop-blur-sm bg-white/80 text-text">
          {typeLabels[service.filterType] ?? service.filterType}
        </span>

        {/* Compact glass strip at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-5 py-3.5 flex items-center justify-between"
          style={{
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(14px) saturate(1.3)",
            WebkitBackdropFilter: "blur(14px) saturate(1.3)",
            borderTop: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <h3 className="font-serif text-base font-medium text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.3)]">
            {t(`${service.nameKey}.name`)}
          </h3>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-sans font-medium px-2.5 py-1 rounded-full bg-white/15 text-white/70 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: service.color }} />
            {doctorName.split(" ").slice(0, 2).join(" ")}
          </span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
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
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const slideWidth = el.offsetWidth * 0.78;
    const idx = Math.round(el.scrollLeft / slideWidth);
    setCurrent(idx);
  }, []);

  return (
    <div className="md:hidden">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-6 px-6 sm:-mx-2 sm:px-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
      >
        {services.map((service) => (
          <div key={service.slug} className="w-[75%] shrink-0 snap-center">
            <ServiceCard service={service} index={0} t={t} tAreas={tAreas} />
          </div>
        ))}
      </div>

      {services.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-4">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const el = scrollRef.current;
                if (!el) return;
                el.scrollTo({ left: el.offsetWidth * 0.78 * i, behavior: "smooth" });
              }}
              className={cn(
                "rounded-full transition-all duration-200",
                i === current
                  ? "w-5 h-1.5 bg-[var(--color-primary)]"
                  : "w-1.5 h-1.5 bg-[var(--color-tertiary)]"
              )}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
