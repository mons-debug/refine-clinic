"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { Link } from "@/lib/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { AREA_ICONS, AREA_KEYS, type AreaKey } from "@/lib/area-icons";
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

  return (
    <div>
      {/* Filter row 1: Type pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {typeTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTypeChange(tab.key)}
            className={cn(
              "font-sans text-[12px] font-medium tracking-[0.05em] px-5 py-2.5 rounded-full border transition-all duration-200",
              activeType === tab.key
                ? "bg-primary text-white border-primary shadow-sm"
                : "bg-white text-text-soft border-tertiary hover:border-primary/40 hover:text-text"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filter row 2: Body area icons */}
      <div className="mb-10">
        <div
          className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide sm:flex-wrap sm:justify-center"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {AREA_KEYS.map((area) => {
            const isSelected = selectedArea === area;
            const Icon = AREA_ICONS[area];
            return (
              <button
                key={area}
                onClick={() => handleAreaClick(area)}
                className="flex flex-col items-center gap-2 snap-center shrink-0 group"
              >
                <div
                  className="relative flex items-center justify-center rounded-full transition-all duration-200"
                  style={{
                    width: 48,
                    height: 48,
                    backgroundColor: isSelected
                      ? "var(--color-primary)"
                      : "var(--color-neutral-dark)",
                    color: isSelected ? "#fff" : "var(--color-text)",
                    boxShadow: isSelected
                      ? "0 4px 20px color-mix(in srgb, var(--color-primary) 35%, transparent)"
                      : "0 1px 4px rgba(0,0,0,0.06)",
                  }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span
                  className="text-[10px] font-sans font-medium tracking-wide transition-colors duration-200"
                  style={{
                    color: isSelected
                      ? "var(--color-primary-dark)"
                      : "var(--color-text-soft)",
                  }}
                >
                  {areaLabels[area] ?? area}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results count */}
      {!selectedService && (
        <p className="font-sans text-xs text-text-soft mb-5">
          {filtered.length} {filtered.length === 1 ? "soin" : "soins"}
        </p>
      )}

      {/* Content: Grid or Expanded Detail */}
      <LayoutGroup>
        <AnimatePresence mode="wait">
          {selectedService ? (
            <motion.div
              key={`detail-${selectedService.slug}`}
              layoutId={`card-${selectedService.slug}`}
              className="rounded-3xl overflow-hidden"
              transition={{ type: "spring", stiffness: 200, damping: 28, mass: 0.9 }}
            >
              {/* Shared hero image — morphs from card */}
              <motion.div
                layoutId={`image-${selectedService.slug}`}
                className="relative"
                transition={{ type: "spring", stiffness: 200, damping: 28 }}
              >
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  <Image
                    src={selectedService.image}
                    alt={selectedService.name}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                </div>
              </motion.div>

              {/* Detail content — fades in after morph */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
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
      </LayoutGroup>
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
      layoutId={`card-${service.slug}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, layout: { type: "spring", stiffness: 200, damping: 28, mass: 0.9 } }}
      className="rounded-2xl overflow-hidden"
    >
      <button
        onClick={onClick}
        className="group relative block w-full text-start rounded-2xl overflow-hidden bg-white border border-transparent hover:border-primary/15 transition-all duration-300 hover:-translate-y-1 shadow-brand hover:shadow-brand-md"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image — shared layoutId for morph */}
        <motion.div
          layoutId={`image-${service.slug}`}
          className="relative h-[200px] overflow-hidden"
          transition={{ type: "spring", stiffness: 200, damping: 28 }}
        >
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
        </motion.div>

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
