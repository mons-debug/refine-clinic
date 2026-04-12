"use client";

import { motion } from "framer-motion";
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
    <div className="text-center mb-14">
      <BlurFade delay={0}>
        <p className="font-sans text-[11px] tracking-[0.4em] uppercase font-semibold mb-6" style={{ color: "var(--color-primary)" }}>
          {eyebrow}
        </p>
      </BlurFade>
      <BlurFade delay={0.1}>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light leading-tight mb-5 tracking-[-0.02em]" style={{ color: "var(--color-text)" }}>
          {renderHeadline(headline, headlineAccent)}
        </h2>
      </BlurFade>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="w-10 h-[2px] mx-auto mb-5 origin-center rounded-full"
        style={{ background: "var(--color-tertiary)" }}
      />
      <BlurFade delay={0.2}>
        <p className="font-sans text-sm sm:text-base max-w-md mx-auto leading-relaxed" style={{ color: "var(--color-secondary)" }}>
          {instruction}
        </p>
      </BlurFade>
    </div>
  );
}
