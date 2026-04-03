"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";
import { TextEffect } from "@/components/ui/TextEffect";
import BlurFade from "@/components/ui/BlurFade";
import ShineButton from "@/components/ui/ShineButton";
import BorderTrail from "@/components/ui/BorderTrail";
import DotPattern from "@/components/ui/DotPattern";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(160deg, var(--color-neutral) 0%, var(--color-neutral-dark) 55%, var(--color-tertiary) 100%)",
        }}
      />
      {/* Dot pattern overlay */}
      <DotPattern
        className="-z-10 opacity-[0.04]"
        dotColor="var(--color-primary)"
        dotSize={1}
        gap={28}
      />
      {/* Soft radial glows */}
      <div
        className="absolute inset-0 -z-10 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 15% 85%, var(--color-primary) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 85% 15%, var(--color-secondary) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto w-full">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-[11px] tracking-[0.35em] uppercase text-primary font-semibold mb-7"
        >
          Tanger, Maroc
        </motion.p>

        {/* Headline — per-word blur reveal */}
        <TextEffect
          per="word"
          preset="blur"
          delay={0.2}
          speedReveal={0.8}
          as="h1"
          className="font-serif text-6xl sm:text-7xl lg:text-8xl font-light text-text leading-none mb-6"
        >
          {t("headline")}
        </TextEffect>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-16 h-px bg-primary mx-auto mb-8 origin-center"
        />

        {/* Subheadline — blur fade */}
        <BlurFade delay={0.6} yOffset={16}>
          <p className="font-sans text-lg sm:text-xl text-text-soft font-light leading-relaxed mb-12 max-w-md mx-auto">
            {t("subheadline")}
          </p>
        </BlurFade>

        {/* CTAs */}
        <BlurFade delay={0.8} yOffset={12}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary CTA — shine button */}
            <ShineButton as="a" href="/services" className="gap-2">
              {t("cta1")}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </ShineButton>

            {/* Secondary CTA — border trail */}
            <Link
              href="/consultation"
              className="relative inline-flex items-center gap-2 font-sans text-sm font-semibold px-8 py-3.5 rounded-full border-2 border-primary/60 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 overflow-hidden"
            >
              <BorderTrail
                size={40}
                className="bg-gradient-to-r from-primary/0 via-primary to-primary/0"
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              />
              {t("cta2")}
            </Link>
          </div>
        </BlurFade>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-text-soft/50">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-primary/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
