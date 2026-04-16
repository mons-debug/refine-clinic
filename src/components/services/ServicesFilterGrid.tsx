"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { Link } from "@/lib/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ArrowRight, Syringe, Hand, Scissors } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { AREA_ICONS, AREA_KEYS, type AreaKey } from "@/lib/area-icons";

const CATEGORY_ICONS = {
  injectable: Syringe,
  soins: Hand,
  chirurgie: Scissors,
} as const;
import ServiceExpandedDetail, {
  type ExpandedServiceData,
  type DetailLabels,
} from "./ServiceExpandedDetail";

export interface ServiceItem {
  slug: string;
  name: string;
  shortDesc: string;
  image: string;
  color: string;
  filterType: string;
  category: string;
  area: string[];
  doctorName: string;
  learnMore: string;
  // Detail data
  description: string;
  pageSubtitle: string;
  doctorTitle: string;
  sessions: string;
  forWho: string;
  indications: string[];
  steps: { title: string; desc: string }[];
  benefits: string[];
  faq: { q: string; a: string }[];
}

interface FilterTab {
  key: string;
  label: string;
}

interface ServicesFilterGridProps {
  services: ServiceItem[];
  typeTabs: FilterTab[];
  areaLabels: Record<string, string>;
  noResults: string;
  detailLabels: DetailLabels;
}

export default function ServicesFilterGrid({
  services,
  typeTabs,
  areaLabels,
  noResults,
  detailLabels,
}: ServicesFilterGridProps) {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") || "all";
  const initialArea = searchParams.get("area") || null;
  const initialSelected = searchParams.get("selected") || null;

  const [activeType, setActiveType] = useState(initialType);
  const [selectedArea, setSelectedArea] = useState<AreaKey | null>(
    AREA_KEYS.includes(initialArea as AreaKey) ? (initialArea as AreaKey) : null
  );
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialSelected);

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchType = activeType === "all" || s.filterType === activeType;
      const matchArea = !selectedArea || s.area.includes(selectedArea);
      return matchType && matchArea;
    });
  }, [services, activeType, selectedArea]);

  const selectedService = useMemo(() => {
    if (!selectedSlug) return null;
    return services.find((s) => s.slug === selectedSlug) || null;
  }, [services, selectedSlug]);

  // Update URL when selection changes
  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedSlug) {
      url.searchParams.set("selected", selectedSlug);
    } else {
      url.searchParams.delete("selected");
    }
    window.history.replaceState(null, "", url.toString());
  }, [selectedSlug]);

  // Close expanded view on filter change
  const handleTypeChange = useCallback((type: string) => {
    setActiveType(type);
    setSelectedSlug(null);
  }, []);

  const handleAreaClick = useCallback((area: AreaKey) => {
    setSelectedArea((prev) => (prev === area ? null : area));
    setSelectedSlug(null);
  }, []);

  const handleCardClick = useCallback((slug: string) => {
    setSelectedSlug(slug);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedSlug(null);
  }, []);

  const tAreas = useTranslations("areas");

  // Count services per category
  const counts = useMemo(() => {
    const c = { injectable: 0, soins: 0, chirurgie: 0 };
    services.forEach((s) => {
      if (s.filterType in c) c[s.filterType as keyof typeof c]++;
    });
    return c;
  }, [services]);

  // Available areas for current filter
  const availableAreas = useMemo(() => {
    const typeFiltered = activeType === "all" ? services : services.filter((s) => s.filterType === activeType);
    const areaSet = new Set<AreaKey>();
    typeFiltered.forEach((s) => s.area.forEach((a) => { if (AREA_KEYS.includes(a as AreaKey)) areaSet.add(a as AreaKey); }));
    return AREA_KEYS.filter((a) => areaSet.has(a));
  }, [services, activeType]);

  return (
    <div>
      {/* Filter container — glass */}
      <div
        className="relative rounded-none sm:rounded-2xl p-4 sm:p-6 mb-10 -mx-6 px-6 sm:mx-0 sm:px-6"
        style={{
          background: "rgba(255,255,255,0.45)",
          backdropFilter: "blur(20px) saturate(1.3)",
          WebkitBackdropFilter: "blur(20px) saturate(1.3)",
          border: "1px solid rgba(255,255,255,0.5)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
      >
        {/* Noise overlay */}
        <div className="absolute inset-0 sm:rounded-2xl opacity-[0.03] pointer-events-none mix-blend-multiply overflow-hidden"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />

        <div className="relative z-10">
          {/* Category tabs — 3 glass cards with spring animation */}
          <LayoutGroup>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
              {(["injectable", "soins", "chirurgie"] as const).map((type) => {
                const isActive = activeType === type;
                const Icon = CATEGORY_ICONS[type];
                const tab = typeTabs.find((t) => t.key === type);
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
                        layoutId="services-category-bg"
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
                      {tab?.label ?? type}
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

          {/* Body area chips — compact with icon + text */}
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
                  {typeTabs[0]?.label ?? "All"}
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
                        {areaLabels[area] ?? area}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Results count */}
          <div className="h-px my-4" style={{ background: "rgba(255,255,255,0.3)" }} />
          <p className="font-sans text-[11px] font-medium" style={{ color: "var(--color-secondary)" }}>
            {filtered.length} {filtered.length > 1 ? "soins" : "soin"} {selectedArea ? `· ${areaLabels[selectedArea]}` : ""}
          </p>
        </div>
      </div>

      {/* Results count */}
      {!selectedService && (
        <p className="font-sans text-xs text-text-soft mb-5">
          {filtered.length} {filtered.length === 1 ? "soin" : "soins"}
        </p>
      )}

      {/* Content: Grid or Expanded Detail */}
      <AnimatePresence mode="wait">
        {selectedService ? (
          <motion.div
            key={`detail-${selectedService.slug}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-3xl overflow-hidden"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Hero image */}
            <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-3xl">
              <Image
                src={selectedService.image}
                alt={selectedService.name}
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            </div>

            {/* Detail content */}
            <ServiceExpandedDetail
              service={{
                slug: selectedService.slug,
                name: selectedService.name,
                shortDesc: selectedService.shortDesc,
                image: selectedService.image,
                color: selectedService.color,
                doctorName: selectedService.doctorName,
                doctorTitle: selectedService.doctorTitle,
                description: selectedService.description,
                sessions: selectedService.sessions,
                forWho: selectedService.forWho,
                indications: selectedService.indications,
                steps: selectedService.steps,
                benefits: selectedService.benefits,
                faq: selectedService.faq,
                beforeImage: (selectedService as any).beforeImage,
                afterImage: (selectedService as any).afterImage,
              }}
              labels={detailLabels}
              onClose={handleClose}
              hideHero
            />
          </motion.div>
        ) : (
          <motion.div
            key={`grid-${activeType}-${selectedArea}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.length === 0 ? (
              <p className="text-center font-sans text-text-soft py-16">{noResults}</p>
            ) : (
              <>
                {/* Desktop/tablet grid */}
                <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.map((service, i) => (
                    <ServiceCard
                      key={service.slug}
                      service={service}
                      index={i}
                      onClick={() => handleCardClick(service.slug)}
                      isSelected={selectedSlug === service.slug}
                    />
                  ))}
                </div>

                {/* Mobile carousel */}
                <MobileServiceCarousel
                  services={filtered}
                  onCardClick={handleCardClick}
                  selectedSlug={selectedSlug}
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ServiceCard({
  service,
  index,
  onClick,
  isSelected,
}: {
  service: ServiceItem;
  index: number;
  onClick: () => void;
  isSelected: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="rounded-2xl overflow-hidden"
    >
      <button
        onClick={onClick}
        className="group relative block w-full text-start rounded-2xl overflow-hidden bg-white/55 backdrop-blur-xl border border-white/50 hover:border-white/70 transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(166,93,70,0.1)]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div className="relative h-[200px] overflow-hidden">
          <Image
            src={service.image}
            alt={service.name}
            fill
            className={cn(
              "object-cover transition-transform duration-700 ease-out",
              hovered && "scale-110"
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {/* Doctor badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: service.color }}
            />
            <span className="font-sans text-[10px] font-medium text-text">
              {service.doctorName}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-serif text-[18px] font-semibold text-text mb-1.5 group-hover:text-primary transition-colors">
            {service.name}
          </h3>
          <p className="font-sans text-[13px] text-text-soft leading-relaxed line-clamp-2 mb-4">
            {service.shortDesc}
          </p>
          <span className="flex items-center gap-1.5 font-sans text-[11px] font-semibold tracking-[0.1em] uppercase text-primary">
            {service.learnMore}
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </span>
        </div>

        {/* Bottom accent */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rtl:origin-right"
          style={{ background: service.color }}
        />
      </button>
    </motion.div>
  );
}

/* ───────────────────── Mobile Carousel (services page) ───────────────────── */

function MobileServiceCarousel({
  services,
  onCardClick,
  selectedSlug,
}: {
  services: ServiceItem[];
  onCardClick: (slug: string) => void;
  selectedSlug: string | null;
}) {
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const slideWidth = el.offsetWidth * 0.84;
    const idx = Math.round(el.scrollLeft / slideWidth);
    setCurrent(idx);
  }, []);

  const scrollTo = useCallback((i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const slideWidth = el.offsetWidth * 0.84;
    el.scrollTo({ left: slideWidth * i, behavior: "smooth" });
  }, []);

  // Reset scroll when filter changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0 });
    }
    setCurrent(0);
  }, [services]);

  return (
    <div className="sm:hidden">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-2 px-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
      >
        {services.map((service, i) => (
          <div key={service.slug} className="w-[82%] shrink-0 snap-center">
            <ServiceCard
              service={service}
              index={0}
              onClick={() => onCardClick(service.slug)}
              isSelected={selectedSlug === service.slug}
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      {services.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-5">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
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
