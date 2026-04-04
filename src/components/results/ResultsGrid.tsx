"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/lib/navigation";
import { ArrowRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "@/components/ui/ImageComparison";

interface ResultItem {
  slug: string;
  serviceName: string;
  serviceDesc: string;
  filterType: string;
  category: string;
  color: string;
  doctor: string;
}

interface FilterTab {
  key: string;
  label: string;
}

interface ResultsGridProps {
  items: ResultItem[];
  filterTabs: FilterTab[];
  beforeLabel: string;
  afterLabel: string;
  ctaLabel: string;
  storyPlaceholder: string;
}

// Placeholder patient stories (will be replaced with real content)
const PLACEHOLDER_TESTIMONIALS = [
  "Une expérience exceptionnelle. Le résultat est naturel et exactement ce que je souhaitais.",
  "Le Dr. m'a mis(e) à l'aise dès la première consultation. Je recommande vivement.",
  "Résultat au-delà de mes espérances. L'équipe est professionnelle et bienveillante.",
  "Un suivi impeccable et des résultats qui parlent d'eux-mêmes.",
  "Je me sens enfin en confiance. Merci à toute l'équipe de Refine Clinic.",
];

export default function ResultsGrid({
  items,
  filterTabs,
  beforeLabel,
  afterLabel,
  ctaLabel,
  storyPlaceholder,
}: ResultsGridProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = useMemo(() => {
    if (activeFilter === "all") return items;
    return items.filter((item) => item.filterType === activeFilter);
  }, [items, activeFilter]);

  return (
    <div>
      {/* Filter pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key)}
            className={cn(
              "font-sans text-[12px] font-medium tracking-[0.05em] px-5 py-2.5 rounded-full border transition-all duration-200",
              activeFilter === tab.key
                ? "bg-primary text-white border-primary shadow-sm"
                : "bg-white text-text-soft border-tertiary hover:border-primary/40 hover:text-text"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Results grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {filtered.map((item, i) => (
            <ResultCard
              key={item.slug}
              item={item}
              index={i}
              beforeLabel={beforeLabel}
              afterLabel={afterLabel}
              ctaLabel={ctaLabel}
              testimonial={PLACEHOLDER_TESTIMONIALS[i % PLACEHOLDER_TESTIMONIALS.length]}
              storyPlaceholder={storyPlaceholder}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ResultCard({
  item,
  index,
  beforeLabel,
  afterLabel,
  ctaLabel,
  testimonial,
  storyPlaceholder,
}: {
  item: ResultItem;
  index: number;
  beforeLabel: string;
  afterLabel: string;
  ctaLabel: string;
  testimonial: string;
  storyPlaceholder: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="bg-white rounded-2xl overflow-hidden shadow-brand hover:shadow-brand-md transition-shadow duration-300"
    >
      {/* Before/After comparison */}
      <div className="relative">
        <ImageComparison className="h-64 sm:h-72 cursor-ew-resize" enableHover>
          <ImageComparisonImage position="right">
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[var(--color-neutral-dark)] to-[var(--color-neutral)]">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase font-semibold text-text-soft/60">
                {beforeLabel}
              </span>
              <div className="w-14 h-14 rounded-full opacity-15" style={{ background: item.color }} />
              <span className="font-sans text-[10px] text-text-soft/40">Photo à venir</span>
            </div>
          </ImageComparisonImage>
          <ImageComparisonImage position="left">
            <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[var(--color-neutral)] to-[var(--color-tertiary)]">
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase font-semibold text-primary/60">
                {afterLabel}
              </span>
              <div className="w-14 h-14 rounded-full opacity-25" style={{ background: item.color }} />
              <span className="font-sans text-[10px] text-text-soft/40">Photo à venir</span>
            </div>
          </ImageComparisonImage>
          <ImageComparisonSlider />
        </ImageComparison>

        {/* Service badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <span className="font-sans text-[11px] font-semibold text-text">
            {item.serviceName}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Doctor + treatment info */}
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full" style={{ background: item.color }} />
          <span className="font-sans text-xs text-text-soft">{item.doctor}</span>
        </div>

        {/* Patient story / testimonial */}
        <div className="relative mb-5 pl-4 border-l-2 border-tertiary">
          <Quote className="absolute -top-1 -left-0.5 w-3 h-3 text-tertiary" />
          <p className="font-sans text-sm text-text-soft leading-relaxed italic">
            {testimonial}
          </p>
          <p className="font-sans text-xs text-text-soft/50 mt-2">
            — {storyPlaceholder}
          </p>
        </div>

        {/* CTA */}
        <Link
          href={`/services/${item.slug}`}
          className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-primary hover:text-primary-dark transition-colors uppercase tracking-widest"
        >
          {ctaLabel}
          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
        </Link>
      </div>
    </motion.div>
  );
}
