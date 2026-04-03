"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TextEffect } from "@/components/ui/TextEffect";
import BlurFade from "@/components/ui/BlurFade";
import NumberTicker from "@/components/ui/NumberTicker";
import Image from "next/image";
import { Link } from "@/lib/navigation";
import { ArrowRight, User } from "lucide-react";

interface DoctorData {
  slug: string;
  name: string;
  title: string;
  initials: string;
  image: string;
  treatments: readonly string[];
  category: string;
  meetLabel: string;
}

interface StatData {
  value: string;
  label: string;
}

interface DoctorsGridProps {
  doctors: DoctorData[];
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  calloutEyebrow: string;
  calloutHeadline: string;
  calloutAccent: string;
  calloutText: string;
  stats: StatData[];
}

export default function DoctorsGrid({
  doctors,
  eyebrow,
  headline,
  headlineAccent,
  calloutEyebrow,
  calloutHeadline,
  calloutAccent,
  calloutText,
  stats,
}: DoctorsGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Split headline and render accent in italic primary
  const renderHeadline = (text: string, accent: string) => {
    const parts = text.split(accent);
    if (parts.length < 2) return text;
    return (
      <>
        {parts[0]}
        <em className="italic text-primary">{accent}</em>
        {parts[1]}
      </>
    );
  };

  return (
    <div ref={ref}>
      {/* Header */}
      <div className="text-center mb-14">
        <BlurFade delay={0}>
          <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-primary font-semibold mb-4">
            {eyebrow}
          </p>
        </BlurFade>
        <BlurFade delay={0.15}>
          <h2 className="font-serif text-[clamp(28px,4.5vw,48px)] font-light text-text leading-[1.2] whitespace-pre-line">
            {renderHeadline(headline, headlineAccent)}
          </h2>
        </BlurFade>
      </div>

      {/* Doctor Cards — 1px border grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-neutral-dark border border-neutral-dark mb-px">
        {doctors.map((doc, i) => (
          <BlurFade key={doc.slug} delay={i * 0.15 + 0.2} yOffset={20}>
            <Link
              href={`/doctors/${doc.slug}`}
              className="group flex flex-col bg-white hover:bg-neutral/30 transition-colors h-full"
            >
              {/* Photo / Placeholder */}
              {doc.image ? (
                <div className="relative h-[340px] sm:h-[380px] lg:h-[420px] overflow-hidden">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 640px"
                  />
                  {/* Category label overlaid on image */}
                  <div className="absolute top-5 left-5 z-10">
                    <span className="inline-block font-sans text-[10px] font-medium tracking-[0.1em] uppercase text-white bg-black/30 backdrop-blur-sm border border-white/20 px-3 py-1.5">
                      {doc.category}
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="px-7 pt-6 pb-0">
                    <span className="inline-block font-sans text-[10px] font-medium tracking-[0.1em] uppercase text-text-soft border border-neutral-dark px-3 py-1.5">
                      {doc.category}
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center py-10 lg:py-14">
                    <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full border border-tertiary flex items-center justify-center">
                      <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-neutral-dark/50 flex items-center justify-center">
                        <User className="w-8 h-8 text-text-soft/40" />
                      </div>
                    </div>
                    <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-text-soft/40 mt-4">
                      Photo à venir
                    </p>
                  </div>
                </>
              )}

              {/* Info */}
              <div className="px-7 pb-7 flex flex-col gap-3 flex-1 border-t border-neutral-dark pt-6">
                <h3 className="font-serif text-[22px] lg:text-[24px] font-light text-text leading-[1.2] group-hover:text-primary transition-colors">
                  {doc.name}
                </h3>
                <p className="font-sans text-[11px] tracking-[0.08em] uppercase text-primary font-semibold leading-[1.5]">
                  {doc.title}
                </p>

                {/* All treatment tags */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {doc.treatments.map((tr) => (
                    <span
                      key={tr}
                      className="font-sans text-[10px] font-medium text-secondary border border-tertiary px-2.5 py-0.5 rounded-full"
                    >
                      {tr}
                    </span>
                  ))}
                </div>

                <span className="flex items-center gap-1.5 font-sans text-[11px] font-semibold tracking-[0.12em] uppercase text-primary mt-auto pt-3">
                  {doc.meetLabel}
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5" />
                </span>
              </div>
            </Link>
          </BlurFade>
        ))}
      </div>

      {/* Bottom callout — dark bg, split layout */}
      <BlurFade delay={0.5} yOffset={20}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] bg-text text-white overflow-hidden">
          {/* Left — headline */}
          <div className="p-8 lg:p-10 flex flex-col justify-center">
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-tertiary font-semibold mb-4">
              {calloutEyebrow}
            </p>
            <h3 className="font-serif text-[clamp(24px,3vw,32px)] font-light leading-[1.25] whitespace-pre-line">
              {renderHeadline(calloutHeadline, calloutAccent)}
            </h3>
          </div>

          {/* Right — text + stats */}
          <div className="p-8 lg:p-10 flex flex-col justify-center gap-8 border-t lg:border-t-0 lg:border-l border-white/10">
            {/* Thin separator */}
            <div className="w-12 h-px bg-primary hidden lg:block" />
            <p className="font-sans text-[13px] text-white/70 leading-[1.8] max-w-lg">
              {calloutText}
            </p>

            {/* Stats row */}
            <div className="flex gap-10 lg:gap-16">
              {stats.map((stat, i) => {
                const numericVal = parseInt(stat.value.replace(/\D/g, ""));
                const hasPlus = stat.value.includes("+");
                return (
                  <div key={i} className="flex flex-col gap-1">
                    <span className="font-serif text-[36px] lg:text-[42px] font-light text-white leading-none">
                      <NumberTicker value={numericVal} />
                      {hasPlus && "+"}
                    </span>
                    <span className="font-sans text-[9px] tracking-[0.15em] uppercase text-white/50 font-medium">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </BlurFade>
    </div>
  );
}
