"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";
import { TextEffect } from "@/components/ui/TextEffect";
import BlurFade from "@/components/ui/BlurFade";
import ShineButton from "@/components/ui/ShineButton";
import BorderTrail from "@/components/ui/BorderTrail";
import { motion } from "framer-motion";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex flex-col items-center sm:items-start justify-end sm:justify-center h-screen text-center sm:text-left px-6 sm:px-12 lg:px-20 pb-20 sm:pb-0 overflow-hidden">
      <style>{`
        @media (max-width: 639px) {
          .hero-video {
            object-position: 75% 15% !important;
          }
          .hero-overlay-mobile {
            background: linear-gradient(to top,
              rgba(0,0,0,0.75) 0%,
              rgba(0,0,0,0.5) 30%,
              rgba(0,0,0,0.1) 55%,
              transparent 70%
            ) !important;
          }
        }
        @media (min-width: 640px) {
          .hero-glass {
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px) saturate(1.4);
            -webkit-backdrop-filter: blur(20px) saturate(1.4);
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.15);
            border-radius: 2rem;
            padding: 4rem 2.5rem;
          }
        }
      `}</style>

      {/* ——— VIDEO ——— */}
      <div className="absolute inset-0 -z-30">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="hero-video w-full h-full object-cover object-center"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ——— OVERLAYS ——— */}
      <div className="absolute inset-0 -z-20 bg-black/15" />
      {/* Desktop: subtle left gradient. Mobile: strong bottom gradient so text reads over face */}
      <div className="hero-overlay-mobile absolute inset-0 -z-10 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-[var(--color-neutral)]" />
      <div className="absolute inset-0 -z-10 pointer-events-none hidden sm:block" style={{ background: "radial-gradient(ellipse 70% 120% at 0% 50%, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.05) 35%, transparent 65%)" }} />

      {/* ——— CONTENT ——— */}
      <div className="relative z-10 max-w-md w-full hero-glass">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-[11px] tracking-[0.35em] uppercase text-white/70 font-semibold mb-5"
        >
          Tanger, Maroc
        </motion.p>

        <TextEffect
          per="word"
          preset="blur"
          delay={0.2}
          speedReveal={0.8}
          as="h1"
          className="font-serif text-4xl sm:text-5xl lg:text-7xl font-light text-white leading-none mb-4 sm:mb-5 [text-shadow:0_2px_30px_rgba(0,0,0,0.5)] [-webkit-text-stroke:0.5px_rgba(255,255,255,0.1)] drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
        >
          {t("headline")}
        </TextEffect>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-12 h-px bg-white/40 mb-5 mx-auto sm:mx-0 origin-center sm:origin-left"
        />

        <BlurFade delay={0.6} yOffset={16}>
          <p className="font-sans text-sm sm:text-base lg:text-lg text-white/80 font-light leading-relaxed mb-8 max-w-sm mx-auto sm:mx-0 [text-shadow:0_1px_16px_rgba(0,0,0,0.4)]">
            {t("subheadline")}
          </p>
        </BlurFade>

        <BlurFade delay={0.8} yOffset={12}>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <ShineButton as="a" href="/services" className="gap-2">
              {t("cta1")}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </ShineButton>

            <Link
              href="/consultation"
              className="relative inline-flex items-center gap-2 font-sans text-sm font-semibold px-8 py-3.5 rounded-full border-2 border-white/30 text-white hover:bg-white hover:text-primary hover:border-white hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 overflow-hidden backdrop-blur-sm"
            >
              <BorderTrail
                size={40}
                className="bg-gradient-to-r from-white/0 via-white/80 to-white/0"
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
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/40">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
