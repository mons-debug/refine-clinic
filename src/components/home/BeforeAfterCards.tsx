"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import BlurFade from "@/components/ui/BlurFade";
import { cn } from "@/lib/utils";

export interface BACardData {
  label: string;
  note: string;
  doctor: string;
  color: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImage: string;
  afterImage: string;
}

export default function BeforeAfterCards({ cards }: { cards: BACardData[] }) {
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth * 0.78;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setCurrent(idx);
  }, []);

  return (
    <BlurFade delay={0.1} yOffset={20}>
      {/* Desktop: 2x2 grid */}
      <div className="hidden sm:grid sm:grid-cols-2 gap-5">
        {cards.map((card, i) => (
          <DesktopCard key={card.label} card={card} index={i} />
        ))}
      </div>

      {/* Mobile: horizontal filmstrip */}
      <div className="sm:hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 -mx-3 px-3"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          {cards.map((card) => (
            <div key={card.label} className="w-[75%] shrink-0 snap-center">
              <MobileCard card={card} />
            </div>
          ))}
        </div>

        {/* Dots */}
        {cards.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-3">
            {cards.map((_, i) => (
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
              />
            ))}
          </div>
        )}
      </div>
    </BlurFade>
  );
}

/* ——— Desktop Card: side by side ——— */
function DesktopCard({ card, index }: { card: BACardData; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.14)]"
    >
      <div className="flex h-64 lg:h-72">
        {/* Before */}
        <div className="relative w-1/2 overflow-hidden">
          <Image
            src={card.beforeImage}
            alt={`${card.label} — ${card.beforeLabel}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="25vw"
          />
          <span className="absolute top-2.5 left-2.5 font-sans text-[9px] tracking-[0.15em] uppercase text-white bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
            {card.beforeLabel}
          </span>
        </div>
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/60 z-10" />
        {/* After */}
        <div className="relative w-1/2 overflow-hidden">
          <Image
            src={card.afterImage}
            alt={`${card.label} — ${card.afterLabel}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="25vw"
          />
          <span className="absolute top-2.5 right-2.5 font-sans text-[9px] tracking-[0.15em] uppercase text-white backdrop-blur-sm px-2 py-0.5 rounded-full" style={{ background: "rgba(166,93,70,0.7)" }}>
            {card.afterLabel}
          </span>
        </div>
      </div>
      {/* Glass strip */}
      <div className="px-4 py-3 flex items-center justify-between"
        style={{
          background: "rgba(255,255,255,0.5)",
          backdropFilter: "blur(14px) saturate(1.3)",
          WebkitBackdropFilter: "blur(14px) saturate(1.3)",
          borderTop: "1px solid rgba(255,255,255,0.4)",
        }}
      >
        <div>
          <p className="font-sans text-xs font-semibold tracking-[0.05em]" style={{ color: "var(--color-text)" }}>{card.label}</p>
          <p className="font-serif text-[10px] italic" style={{ color: "var(--color-secondary)" }}>{card.note}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[9px] font-sans font-medium px-2 py-0.5 rounded-full shrink-0" style={{ background: "rgba(255,255,255,0.5)", color: "var(--color-text-soft)" }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: card.color }} />
          {card.doctor.split(" ").slice(0, 2).join(" ")}
        </span>
      </div>
    </motion.div>
  );
}

/* ——— Mobile Card: vertical stack (before top, after bottom) ——— */
function MobileCard({ card }: { card: BACardData }) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
      {/* Before — top half */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={card.beforeImage}
          alt={`${card.label} — ${card.beforeLabel}`}
          fill
          className="object-cover"
          sizes="75vw"
        />
        <span className="absolute top-2.5 left-2.5 font-sans text-[8px] tracking-[0.15em] uppercase text-white bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
          {card.beforeLabel}
        </span>
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white/20 to-transparent" />
      </div>

      {/* Glass divider strip */}
      <div className="relative z-10 flex items-center justify-center py-1.5"
        style={{
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-[1px]" style={{ background: "var(--color-tertiary)" }} />
          <span className="font-sans text-[8px] tracking-[0.2em] uppercase font-bold" style={{ color: "var(--color-primary)" }}>
            {card.label}
          </span>
          <div className="w-4 h-[1px]" style={{ background: "var(--color-tertiary)" }} />
        </div>
      </div>

      {/* After — bottom half */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={card.afterImage}
          alt={`${card.label} — ${card.afterLabel}`}
          fill
          className="object-cover"
          sizes="75vw"
        />
        <span className="absolute top-2.5 right-2.5 font-sans text-[8px] tracking-[0.15em] uppercase text-white backdrop-blur-sm px-2 py-0.5 rounded-full" style={{ background: "rgba(166,93,70,0.7)" }}>
          {card.afterLabel}
        </span>
      </div>

      {/* Bottom info */}
      <div className="px-3 py-2.5 flex items-center justify-between"
        style={{
          background: "rgba(255,255,255,0.5)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <p className="font-serif text-[10px] italic" style={{ color: "var(--color-secondary)" }}>{card.note}</p>
        <span className="inline-flex items-center gap-1 text-[8px] font-sans font-medium" style={{ color: "var(--color-text-soft)" }}>
          <span className="w-1 h-1 rounded-full" style={{ background: card.color }} />
          {card.doctor.split(" ").slice(0, 2).join(" ")}
        </span>
      </div>
    </div>
  );
}
