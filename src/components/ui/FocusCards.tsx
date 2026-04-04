"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/lib/navigation";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FocusCardData {
  title: string;
  subtitle: string;
  services: string[];
  image: string;
  href: string;
  ctaLabel: string;
}

interface FocusCardsProps {
  cards: FocusCardData[];
}

export default function FocusCards({ cards }: FocusCardsProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 w-full">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          className={cn(
            "relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out",
            "h-[360px] md:h-[440px] lg:h-[500px]",
            hovered !== null && hovered !== i && "blur-[3px] scale-[0.97] opacity-70"
          )}
          initial={false}
          animate={{
            scale: hovered === i ? 1.02 : 1,
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Link href={card.href} className="block w-full h-full">
            {/* Background image */}
            <Image
              src={card.image}
              alt={card.title}
              fill
              className={cn(
                "object-cover transition-transform duration-700 ease-out",
                hovered === i && "scale-110"
              )}
              sizes="(max-width: 768px) 100vw, 33vw"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-7 lg:p-8">
              {/* Category subtitle */}
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-white/60 font-semibold mb-2">
                {card.subtitle}
              </span>

              {/* Title */}
              <h3 className="font-serif text-[28px] lg:text-[34px] font-light text-white leading-[1.15] mb-4">
                {card.title}
              </h3>

              {/* Services list — revealed on hover */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: hovered === i ? 1 : 0,
                  y: hovered === i ? 0 : 10,
                }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="flex flex-wrap gap-2 mb-5"
              >
                {card.services.map((service) => (
                  <span
                    key={service}
                    className="font-sans text-[11px] font-medium text-white/90 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20"
                  >
                    {service}
                  </span>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{
                  opacity: hovered === i ? 1 : 0,
                  y: hovered === i ? 0 : 8,
                }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex items-center gap-2 font-sans text-[12px] font-semibold tracking-[0.1em] uppercase text-white"
              >
                {card.ctaLabel}
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </motion.div>
            </div>

            {/* Top accent line on hover */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{ background: "var(--color-primary)" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hovered === i ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
