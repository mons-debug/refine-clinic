"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import BlurFade from "@/components/ui/BlurFade";

interface WhyItem {
  title: string;
  desc: string;
  index: number;
}

interface WhyRefineGridProps {
  items: WhyItem[];
  eyebrow: string;
  pullquote: string;
  pullquoteAccent: string;
}

export default function WhyRefineGrid({
  items,
  eyebrow,
  pullquote,
  pullquoteAccent,
}: WhyRefineGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const renderAccent = (text: string, accent: string) => {
    const idx = text.indexOf(accent);
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <em className="italic text-primary">{accent}</em>
        {text.slice(idx + accent.length)}
      </>
    );
  };

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-0">
      {/* Left — Pull quote (60%) */}
      <div className="p-8 lg:p-14 flex flex-col justify-center bg-white border border-neutral-dark lg:border-r-0">
        <BlurFade delay={0}>
          <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-primary font-semibold mb-6">
            {eyebrow}
          </p>
        </BlurFade>
        <BlurFade delay={0.15}>
          <blockquote className="font-serif text-[clamp(26px,3.5vw,40px)] font-light text-text leading-[1.35]">
            &ldquo;{renderAccent(pullquote, pullquoteAccent)}&rdquo;
          </blockquote>
        </BlurFade>
        {/* Decorative line */}
        <BlurFade delay={0.3}>
          <div className="w-16 h-px bg-primary mt-8" />
        </BlurFade>
      </div>

      {/* Right — Differentiators with staggered offset (40%) */}
      <div className="flex flex-col bg-white border border-neutral-dark lg:border-l border-t-0 lg:border-t">
        {items.map((item, i) => {
          const num = String(i + 1).padStart(2, "0");
          // Stagger vertical offsets for asymmetry on desktop
          const offsetClass = i % 2 === 1 ? "lg:translate-x-2" : "";
          return (
            <BlurFade key={i} delay={i * 0.08 + 0.1} yOffset={12}>
              <div
                className={`group flex items-start gap-5 px-7 lg:px-8 py-5 lg:py-5 hover:bg-primary/[0.04] transition-all duration-300 ${
                  i > 0 ? "border-t border-neutral-dark" : ""
                } ${offsetClass}`}
              >
                {/* Number */}
                <span className="font-serif text-[28px] text-primary/15 font-light mt-0.5 shrink-0 w-8 leading-none select-none">
                  {num}
                </span>
                {/* Text */}
                <div className="flex-1">
                  <h3 className="font-sans text-[14px] font-semibold text-text leading-[1.4] group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[12px] text-text-soft leading-[1.6] mt-1">
                    {item.desc}
                  </p>
                </div>
              </div>
            </BlurFade>
          );
        })}
      </div>
    </div>
  );
}
