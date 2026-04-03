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
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-neutral-dark">
      {/* Left — Pull quote */}
      <div className="p-8 lg:p-12 flex flex-col justify-center bg-white border-b lg:border-b-0 lg:border-r border-neutral-dark">
        <BlurFade delay={0}>
          <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-primary font-semibold mb-6">
            {eyebrow}
          </p>
        </BlurFade>
        <BlurFade delay={0.15}>
          <blockquote className="font-serif text-[clamp(24px,3.5vw,36px)] font-light text-text leading-[1.35]">
            &ldquo;{renderAccent(pullquote, pullquoteAccent)}&rdquo;
          </blockquote>
        </BlurFade>
        {/* Decorative line */}
        <BlurFade delay={0.3}>
          <div className="w-16 h-px bg-primary mt-8" />
        </BlurFade>
      </div>

      {/* Right — Differentiators stacked with dividers */}
      <div className="flex flex-col bg-white">
        {items.map((item, i) => {
          const num = String(i + 1).padStart(2, "0");
          return (
            <BlurFade key={i} delay={i * 0.08 + 0.1} yOffset={12}>
              <div
                className={`group flex items-start gap-5 px-8 lg:px-10 py-5 lg:py-6 hover:bg-primary/[0.03] transition-colors ${
                  i > 0 ? "border-t border-neutral-dark" : ""
                }`}
              >
                {/* Number */}
                <span className="font-serif text-[13px] text-primary/40 font-light mt-0.5 shrink-0 w-6">
                  {num}
                </span>
                {/* Text */}
                <div className="flex-1">
                  <h3 className="font-serif text-[16px] font-light text-text leading-[1.4] group-hover:text-primary transition-colors">
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
