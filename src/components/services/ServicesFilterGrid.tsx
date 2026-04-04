"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Link } from "@/lib/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { AREA_ICONS, AREA_KEYS, type AreaKey } from "@/lib/area-icons";

export interface ServiceItem {
  slug: string;
  name: string;
  desc: string;
  image: string;
  color: string;
  filterType: string;
  area: string[];
  doctorName: string;
  learnMore: string;
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
}

export default function ServicesFilterGrid({
  services,
  typeTabs,
  areaLabels,
  noResults,
}: ServicesFilterGridProps) {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") || "all";
  const initialArea = searchParams.get("area") || null;

  const [activeType, setActiveType] = useState(initialType);
  const [selectedArea, setSelectedArea] = useState<AreaKey | null>(
    AREA_KEYS.includes(initialArea as AreaKey) ? (initialArea as AreaKey) : null
  );

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchType = activeType === "all" || s.filterType === activeType;
      const matchArea = !selectedArea || s.area.includes(selectedArea);
      return matchType && matchArea;
    });
  }, [services, activeType, selectedArea]);

  function handleAreaClick(area: AreaKey) {
    setSelectedArea((prev) => (prev === area ? null : area));
  }

  return (
    <div>
      {/* Filter row 1: Type pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {typeTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveType(tab.key)}
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
                  {AREA_ICONS[area]}
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
      <p className="font-sans text-xs text-text-soft mb-5">
        {filtered.length} {filtered.length === 1 ? "soin" : "soins"}
      </p>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeType}-${selectedArea}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {filtered.length === 0 ? (
            <p className="text-center font-sans text-text-soft py-16">{noResults}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((service, i) => (
                <ServiceCard key={service.slug} service={service} index={i} />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        href={`/services/${service.slug}`}
        className="group relative block rounded-2xl overflow-hidden bg-white border border-transparent hover:border-primary/15 transition-all duration-300 hover:-translate-y-1 shadow-brand hover:shadow-brand-md"
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
            {service.desc}
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
      </Link>
    </motion.div>
  );
}
