"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import BlurFade from "@/components/ui/BlurFade";

interface BeforeAfterHeaderProps {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  instruction: string;
}

export default function BeforeAfterHeader({
  eyebrow,
  headline,
  headlineAccent,
  instruction,
}: BeforeAfterHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const renderHeadline = (text: string, accent: string) => {
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
    <div ref={ref} className="mb-14 lg:mb-16">
      {/* Top row: decorative number + headline */}
      <div className="flex items-start gap-6 lg:gap-8 mb-8">
        {/* Big ghost number */}
        <BlurFade delay={0}>
          <span className="font-serif text-[80px] lg:text-[120px] font-light text-primary/10 leading-none select-none -mt-4">
            6
          </span>
        </BlurFade>
        <div className="flex-1">
          <BlurFade delay={0.05}>
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-primary font-semibold mb-3">
              {eyebrow}
            </p>
          </BlurFade>
          <BlurFade delay={0.15}>
            <h2 className="font-serif text-[clamp(28px,4vw,42px)] font-light text-text leading-[1.2]">
              {renderHeadline(headline, headlineAccent)}
            </h2>
          </BlurFade>
        </div>
      </div>

      {/* Separator + instruction */}
      <div className="border-t border-neutral-dark pt-5">
        <BlurFade delay={0.25}>
          <p className="font-sans text-[13px] text-text-soft leading-[1.7] max-w-lg">
            {instruction}
          </p>
        </BlurFade>
      </div>
    </div>
  );
}
