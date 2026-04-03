"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { TextEffect } from "@/components/ui/TextEffect";
import BlurFade from "@/components/ui/BlurFade";

interface ServicesHeaderProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export default function ServicesHeader({
  eyebrow,
  title,
  subtitle,
}: ServicesHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-12 mb-12"
    >
      <div>
        <BlurFade delay={0}>
          <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-primary font-medium mb-3">
            {eyebrow}
          </p>
        </BlurFade>
        <TextEffect
          per="word"
          preset="blur"
          delay={0.1}
          trigger={isInView}
          as="h2"
          className="font-serif text-[clamp(28px,4vw,42px)] font-light text-text leading-[1.2]"
        >
          {title}
        </TextEffect>
      </div>
      <BlurFade delay={0.3}>
        <p className="font-sans text-[13px] text-text-soft leading-[1.7] max-w-[280px] shrink-0">
          {subtitle}
        </p>
      </BlurFade>
    </div>
  );
}
