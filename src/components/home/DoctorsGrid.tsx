"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
      {/* Header — matching services section editorial style */}
      <div className="text-center mb-14">
        <BlurFade delay={0}>
          <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-primary font-semibold mb-6">
            {eyebrow}
          </p>
        </BlurFade>
        <BlurFade delay={0.1}>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-text leading-[1.2] whitespace-pre-line tracking-[-0.02em]">
            {renderHeadline(headline, headlineAccent)}
          </h2>
        </BlurFade>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="w-10 h-[2px] mx-auto mt-5 origin-center rounded-full"
          style={{ background: "var(--color-tertiary)" }}
        />
      </div>

      {/* Doctor Cards — glass image cards, side by side on all screens */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-8">
        {doctors.map((doc, i) => (
          <BlurFade key={doc.slug} delay={i * 0.15 + 0.2} yOffset={20}>
            <Link
              href={`/doctors/${doc.slug}`}
              className="group block relative rounded-xl sm:rounded-2xl overflow-hidden h-[280px] sm:h-[420px] lg:h-[520px] hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]"
            >
              {/* Photo or premium placeholder */}
              {doc.image ? (
                <motion.div
                  className="absolute inset-0"
                  initial={{ clipPath: "inset(100% 0 0 0)" }}
                  whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }}
                >
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 640px"
                  />
                </motion.div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neutral-dark)] via-[var(--color-tertiary)]/30 to-[var(--color-neutral)] flex flex-col items-center justify-center">
                  <div className="w-16 h-16 sm:w-28 sm:h-28 rounded-full border-2 border-[var(--color-tertiary)] flex items-center justify-center mb-2 sm:mb-3">
                    <span className="font-serif text-2xl sm:text-4xl font-light text-[var(--color-secondary)]">{doc.initials}</span>
                  </div>
                  <p className="font-sans text-[8px] sm:text-[10px] tracking-[0.2em] uppercase text-[var(--color-secondary)]/50">
                    Photo à venir
                  </p>
                </div>
              )}

              {/* Dark gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

              {/* Category badge — top left */}
              <span className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 inline-block font-sans text-[8px] sm:text-[10px] font-medium tracking-[0.1em] uppercase text-white/90 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                {doc.category}
              </span>

              {/* Glass info strip at bottom */}
              <div className="absolute bottom-0 left-0 right-0 z-10 px-3 py-3 sm:px-6 sm:py-5"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(14px) saturate(1.3)",
                  WebkitBackdropFilter: "blur(14px) saturate(1.3)",
                  borderTop: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <h3 className="font-serif text-sm sm:text-xl lg:text-2xl font-light text-white mb-0.5 sm:mb-1 [text-shadow:0_1px_8px_rgba(0,0,0,0.3)] line-clamp-1">
                  {doc.name}
                </h3>
                <p className="font-sans text-[8px] sm:text-[10px] tracking-[0.08em] uppercase text-white/60 font-semibold mb-1 sm:mb-3 line-clamp-1">
                  {doc.title}
                </p>

                {/* Treatment tags — hidden on mobile, shown on sm+ */}
                <div className="hidden sm:flex flex-wrap gap-1.5 mb-3">
                  {doc.treatments.slice(0, 4).map((tr) => (
                    <span
                      key={tr}
                      className="font-sans text-[9px] font-medium text-white/60 border border-white/15 px-2 py-0.5 rounded-full"
                    >
                      {tr}
                    </span>
                  ))}
                  {doc.treatments.length > 4 && (
                    <span className="font-sans text-[9px] text-white/40">
                      +{doc.treatments.length - 4}
                    </span>
                  )}
                </div>

                <span className="hidden sm:flex items-center gap-1.5 font-sans text-[10px] font-semibold tracking-[0.12em] uppercase text-white/70 group-hover:text-white transition-colors">
                  {doc.meetLabel}
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5" />
                </span>
              </div>
            </Link>
          </BlurFade>
        ))}
      </div>

      {/* Bottom callout — liquid glass on dark */}
      <BlurFade delay={0.5} yOffset={20}>
        <div
          className="rounded-2xl overflow-hidden p-6 sm:p-8 lg:p-10"
          style={{
            background: "rgba(255, 255, 255, 0.45)",
            backdropFilter: "blur(24px) saturate(1.4)",
            WebkitBackdropFilter: "blur(24px) saturate(1.4)",
            border: "1px solid rgba(255,255,255,0.6)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(255,255,255,0.2)",
          }}
        >
          <p className="font-sans text-[10px] tracking-[0.25em] uppercase font-semibold mb-3" style={{ color: "var(--color-primary)" }}>
            {calloutEyebrow}
          </p>
          <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-light leading-[1.25] whitespace-pre-line mb-4" style={{ color: "var(--color-text)" }}>
            {renderHeadline(calloutHeadline, calloutAccent)}
          </h3>

          <div className="w-10 h-[2px] rounded-full mb-4" style={{ background: "var(--color-tertiary)" }} />

          <p className="font-sans text-xs sm:text-[13px] leading-[1.8] max-w-lg mb-6" style={{ color: "var(--color-text-soft)" }}>
            {calloutText}
          </p>

          {/* Stats row */}
          <div className="flex gap-8 sm:gap-12 lg:gap-16">
            {stats.map((stat, i) => {
              const numericVal = parseInt(stat.value.replace(/\D/g, ""));
              const hasPlus = stat.value.includes("+");
              return (
                <div key={i} className="flex flex-col gap-0.5">
                  <span className="font-serif text-[28px] sm:text-[36px] lg:text-[42px] font-light leading-none" style={{ color: "var(--color-text)" }}>
                    <NumberTicker value={numericVal} />
                    {hasPlus && "+"}
                  </span>
                  <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.15em] uppercase font-medium" style={{ color: "var(--color-secondary)" }}>
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </BlurFade>
    </div>
  );
}
