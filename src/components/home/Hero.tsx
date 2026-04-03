"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut", delay },
});

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
          {...fadeUp(0)}
          className="font-sans text-[11px] tracking-[0.35em] uppercase text-primary font-semibold mb-7"
        >
          Tanger, Maroc
        </motion.p>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.15)}
          className="font-serif text-6xl sm:text-7xl lg:text-8xl font-light text-text leading-none mb-6"
        >
          {t("headline")}
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="w-16 h-px bg-primary mx-auto mb-8 origin-center"
        />

        {/* Subheadline */}
        <motion.p
          {...fadeUp(0.45)}
          className="font-sans text-lg sm:text-xl text-text-soft font-light leading-relaxed mb-12 max-w-md mx-auto"
        >
          {t("subheadline")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.6)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold px-8 py-3.5 rounded-full bg-primary text-white hover:bg-primary-dark transition-all duration-200 shadow-brand hover:shadow-brand-md"
          >
            {t("cta1")}
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold px-8 py-3.5 rounded-full border-2 border-primary/60 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
          >
            {t("cta2")}
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
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
