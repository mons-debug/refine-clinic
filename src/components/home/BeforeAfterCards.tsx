"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BlurFade from "@/components/ui/BlurFade";
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "@/components/ui/ImageComparison";

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
  const [active, setActive] = useState(0);
  const current = cards[active];

  const prev = () => setActive((a) => (a - 1 + cards.length) % cards.length);
  const next = () => setActive((a) => (a + 1) % cards.length);

  return (
    <div>
      {/* Main viewer with nav arrows */}
      <BlurFade delay={0.1} yOffset={24}>
        <div className="relative group/viewer">
          {/* Viewer */}
          <div className="relative rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.1)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5 }}
              >
                <ImageComparison
                  className="h-[360px] sm:h-[440px] lg:h-[520px] cursor-ew-resize"
                  springOptions={{ bounce: 0, duration: 0 }}
                >
                  {/* Before (right) */}
                  <ImageComparisonImage position="right">
                    <Image
                      src={current.beforeImage}
                      alt={`${current.label} — ${current.beforeLabel}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1280px) 100vw, 1280px"
                    />
                  </ImageComparisonImage>

                  {/* After (left) */}
                  <ImageComparisonImage position="left">
                    <Image
                      src={current.afterImage}
                      alt={`${current.label} — ${current.afterLabel}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1280px) 100vw, 1280px"
                    />
                  </ImageComparisonImage>

                  {/* Custom slider with labels */}
                  <ImageComparisonSlider className="bg-white/80 backdrop-blur-md w-[2px]">
                    {/* Handle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-primary shadow-lg shadow-primary/30">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <path d="M18 8L22 12L18 16" />
                          <path d="M6 8L2 12L6 16" />
                        </svg>
                      </div>
                    </div>
                    {/* Before label on slider line */}
                    <div className="absolute top-4 right-3 whitespace-nowrap">
                      <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        {current.beforeLabel}
                      </span>
                    </div>
                    {/* After label on slider line */}
                    <div className="absolute top-4 left-3 whitespace-nowrap">
                      <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-white bg-primary/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        {current.afterLabel}
                      </span>
                    </div>
                  </ImageComparisonSlider>
                </ImageComparison>

                {/* Bottom glass info strip */}
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none px-5 py-3.5 flex items-center justify-between"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(14px) saturate(1.3)",
                    WebkitBackdropFilter: "blur(14px) saturate(1.3)",
                    borderTop: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  <div>
                    <p className="font-sans text-[11px] tracking-[0.12em] uppercase text-white font-semibold">
                      {current.label}
                    </p>
                    <p className="font-serif text-[11px] italic text-white/60 mt-0.5">
                      {current.note}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-sans font-medium px-2.5 py-1 rounded-full bg-white/15 text-white/70 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: current.color }} />
                    {current.doctor.split(" ").slice(0, 2).join(" ")}
                  </span>
                </div>

                {/* Counter badge */}
                <div className="absolute top-5 right-5 pointer-events-none">
                  <span className="font-sans text-[11px] font-medium text-white/90 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    {active + 1} / {cards.length}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Prev/Next arrows — appear on hover */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center opacity-0 group-hover/viewer:opacity-100 transition-opacity duration-300 hover:bg-white/40"
          >
            <ChevronLeft className="w-5 h-5 text-white rtl:rotate-180" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center opacity-0 group-hover/viewer:opacity-100 transition-opacity duration-300 hover:bg-white/40"
          >
            <ChevronRight className="w-5 h-5 text-white rtl:rotate-180" />
          </button>
        </div>
      </BlurFade>

      {/* Treatment selector with progress */}
      <BlurFade delay={0.25} yOffset={12}>
        <div className="mt-8">
          {/* Progress bar */}
          <div className="relative h-px bg-neutral-dark mb-6">
            <motion.div
              className="absolute top-0 left-0 h-full bg-primary"
              initial={false}
              animate={{
                width: `${((active + 1) / cards.length) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          {/* Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {cards.map((card, i) => (
              <button
                key={card.label}
                onClick={() => setActive(i)}
                className={`relative font-sans text-[11px] tracking-[0.08em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 ${
                  i === active
                    ? "text-white shadow-[0_4px_16px_rgba(166,93,70,0.3)]"
                    : "text-text-soft hover:text-text bg-white/70 backdrop-blur-sm border border-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-primary/30"
                }`}
              >
                {i === active && (
                  <motion.div
                    layoutId="ba-pill-bg"
                    className="absolute inset-0 bg-primary rounded-full"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 font-medium">{card.label}</span>
              </button>
            ))}
          </div>
        </div>
      </BlurFade>
    </div>
  );
}
