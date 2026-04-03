"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/lib/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import BlurFade from "@/components/ui/BlurFade";

export interface ServiceCardData {
  slug: string;
  icon: string;
  color: string;
  name: string;
  desc: string;
  description: string;
  tags: string[];
  learnMore: string;
  doctorName: string;
  category: "aesthetic" | "surgery";
  image: string;
}

interface ServicesGridProps {
  aesthetic: ServiceCardData[];
  surgery: ServiceCardData[];
  tabAesthetic: string;
  tabSurgery: string;
  featuredLabel: string;
  ctaPhoneLabel: string;
  ctaButton: string;
  phone: string;
  bookingHref: string;
  viewAllLabel: string;
}

export default function ServicesGrid({
  aesthetic,
  surgery,
  tabAesthetic,
  tabSurgery,
  featuredLabel,
  ctaPhoneLabel,
  ctaButton,
  phone,
  bookingHref,
  viewAllLabel,
}: ServicesGridProps) {
  const [activeTab, setActiveTab] = useState<"aesthetic" | "surgery">("aesthetic");
  const services = activeTab === "aesthetic" ? aesthetic : surgery;
  const gridCols = activeTab === "aesthetic" ? "lg:grid-cols-3" : "lg:grid-cols-2";

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-0 border-b border-neutral-dark mb-10">
        <button
          onClick={() => setActiveTab("aesthetic")}
          className={`font-sans text-[12px] font-medium tracking-[0.08em] uppercase px-6 py-3 border-b-2 -mb-px transition-colors ${
            activeTab === "aesthetic"
              ? "text-primary border-primary"
              : "text-text-soft border-transparent hover:text-text"
          }`}
        >
          {tabAesthetic}
        </button>
        <button
          onClick={() => setActiveTab("surgery")}
          className={`font-sans text-[12px] font-medium tracking-[0.08em] uppercase px-6 py-3 border-b-2 -mb-px transition-colors ${
            activeTab === "surgery"
              ? "text-primary border-primary"
              : "text-text-soft border-transparent hover:text-text"
          }`}
        >
          {tabSurgery}
        </button>
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.3 }}
        >
          {/* Featured card — full width cinematic */}
          {services[0] && (
            <FeaturedCard service={services[0]} featuredLabel={featuredLabel} />
          )}

          {/* Standard grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols} gap-px bg-neutral-dark border border-neutral-dark border-t-0 mt-px`}>
            {services.slice(1).map((service, i) => (
              <StandardCard key={service.slug} service={service} index={i + 1} />
            ))}
            {/* CTA tile */}
            <BlurFade delay={0.4} yOffset={16}>
              <Link
                href="/services"
                className="group relative flex flex-col items-center justify-center gap-3 p-7 bg-white hover:bg-primary/5 transition-colors h-full text-center min-h-[180px]"
              >
                <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
                  <ArrowRight className="w-4 h-4 text-primary group-hover:text-white transition-colors rtl:rotate-180" />
                </div>
                <p className="font-serif text-[16px] font-light text-text group-hover:text-primary transition-colors">
                  {viewAllLabel}
                </p>
              </Link>
            </BlurFade>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom CTA bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-neutral-dark">
        <span className="font-sans text-[12px] text-text-soft">
          {ctaPhoneLabel} —{" "}
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-primary hover:underline">
            {phone}
          </a>
        </span>
        <Link
          href={bookingHref}
          className="font-sans text-[11px] font-semibold tracking-[0.12em] uppercase text-primary border border-primary px-6 py-2.5 hover:bg-primary hover:text-white transition-colors"
        >
          {ctaButton} →
        </Link>
      </div>
    </div>
  );
}

/* ─── Featured Card — cinematic full-width ─── */
function FeaturedCard({
  service,
  featuredLabel,
}: {
  service: ServiceCardData;
  featuredLabel: string;
}) {
  return (
    <BlurFade delay={0} yOffset={24}>
      <Link
        href={`/services/${service.slug}`}
        className="group relative flex flex-col lg:flex-row items-stretch border border-neutral-dark overflow-hidden h-[280px] lg:h-[340px]"
      >
        {/* Image — takes ~45% */}
        <div className="relative w-full lg:w-[45%] h-full overflow-hidden">
          <Image
            src={service.image}
            alt={service.name}
            fill
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
            sizes="(max-width: 1024px) 100vw, 580px"
          />
          {/* Warm overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-white/40 lg:to-white/60" />
        </div>

        {/* Content */}
        <div className="relative flex flex-col justify-center gap-4 p-8 lg:p-10 flex-1 bg-white">
          {/* Big decorative number */}
          <span className="absolute top-4 right-6 font-serif text-[80px] lg:text-[100px] font-light text-primary/[0.06] leading-none select-none">
            01
          </span>

          <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-primary font-semibold">
            {featuredLabel}
          </p>
          <h3 className="font-serif text-[28px] lg:text-[36px] font-light text-text leading-[1.15] group-hover:text-primary transition-colors">
            {service.name}
          </h3>
          <p className="font-sans text-[13px] text-text-soft leading-[1.7] max-w-md line-clamp-2 lg:line-clamp-3">
            {service.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="font-sans text-[10px] font-medium tracking-[0.05em] text-secondary border border-tertiary px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between mt-auto">
            <span className="flex items-center gap-2 font-sans text-[11px] font-semibold tracking-[0.12em] uppercase text-primary">
              {service.learnMore}
              <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-2 rtl:group-hover:-translate-x-2" />
            </span>
            <span className="flex items-center gap-2 font-sans text-[11px] text-text-soft">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              {service.doctorName}
            </span>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rtl:origin-right" />
        </div>
      </Link>
    </BlurFade>
  );
}

/* ─── Standard Card — editorial with large ghost number ─── */
function StandardCard({
  service,
  index,
}: {
  service: ServiceCardData;
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <BlurFade delay={index * 0.07} yOffset={20}>
      <Link
        href={`/services/${service.slug}`}
        className="group relative flex flex-col justify-between p-7 bg-white hover:bg-primary/[0.03] transition-all duration-300 h-full min-h-[200px] overflow-hidden"
      >
        {/* Large ghost number */}
        <span className="absolute -top-2 -right-1 font-serif text-[90px] font-light leading-none select-none transition-colors duration-300"
          style={{ color: `${service.color}10` }}
        >
          {num}
        </span>

        {/* Top: colored accent dot + small number */}
        <div className="relative z-10 flex items-center gap-2.5 mb-4">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: service.color }}
          />
          <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-text-soft font-medium">
            {num}
          </span>
        </div>

        {/* Service name */}
        <h3 className="relative z-10 font-serif text-[20px] font-light text-text leading-[1.3] group-hover:text-primary transition-colors mb-3">
          {service.name}
        </h3>

        {/* Tags */}
        <div className="relative z-10 flex flex-wrap gap-1.5 mb-4">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="font-sans text-[10px] font-medium tracking-[0.05em] text-secondary border border-tertiary px-2.5 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link */}
        <span className="relative z-10 flex items-center gap-1.5 font-sans text-[11px] font-semibold tracking-[0.12em] uppercase text-primary mt-auto">
          {service.learnMore}
          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5" />
        </span>

        {/* Bottom colored accent on hover */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rtl:origin-right"
          style={{ background: service.color }}
        />
      </Link>
    </BlurFade>
  );
}
