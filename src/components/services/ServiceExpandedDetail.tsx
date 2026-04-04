"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/lib/navigation";
import { X, CheckCircle, Clock, ArrowRight } from "lucide-react";
import FAQAccordion from "@/components/ui/FAQAccordion";
import ServiceBeforeAfter from "@/components/services/ServiceBeforeAfter";
import { CLINIC } from "@/lib/clinic";

export interface ExpandedServiceData {
  slug: string;
  name: string;
  shortDesc: string;
  image: string;
  color: string;
  doctorName: string;
  doctorTitle: string;
  description: string;
  sessions: string;
  forWho: string;
  indications: string[];
  steps: { title: string; desc: string }[];
  benefits: string[];
  faq: { q: string; a: string }[];
}

export interface DetailLabels {
  whatIsIt: string;
  howItWorks: string;
  benefits: string;
  forWho: string;
  faqTitle: string;
  sessionsLabel: string;
  indicationsTitle: string;
  beforeAfterTitle: string;
  bookCta: string;
  whatsappCta: string;
  interested: string;
  interestedDesc: string;
  performedBy: string;
  viewFullPage: string;
}

interface ServiceExpandedDetailProps {
  service: ExpandedServiceData;
  labels: DetailLabels;
  onClose: () => void;
}

export default function ServiceExpandedDetail({
  service,
  labels,
  onClose,
}: ServiceExpandedDetailProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Escape key to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Scroll to top of expanded content
  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{
        height: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.3 },
      }}
      className="overflow-hidden scroll-mt-24"
    >
      <div className="bg-white rounded-3xl shadow-brand overflow-hidden">

        {/* Hero image + close button */}
        <div className="relative h-64 sm:h-80">
          <Image
            src={service.image}
            alt={service.name}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-text hover:bg-white hover:text-primary transition-colors shadow-lg z-10"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Service name overlay */}
          <div className="absolute bottom-6 left-6 right-16">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-widest text-white/70 mb-1">
              {labels.performedBy} {service.doctorName}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">
              {service.name}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">

            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">

              {/* Description */}
              <div>
                <h3 className="font-serif text-xl font-light text-text mb-4">{labels.whatIsIt}</h3>
                <div className="w-8 h-px bg-primary mb-4" />
                <p className="font-sans text-sm text-text-soft leading-relaxed">{service.description}</p>
              </div>

              {/* Indications */}
              {service.indications.length > 0 && (
                <div>
                  <h3 className="font-serif text-xl font-light text-text mb-4">{labels.indicationsTitle}</h3>
                  <div className="w-8 h-px bg-primary mb-5" />
                  <div className="flex flex-wrap gap-2">
                    {service.indications.map((label, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 font-sans text-xs px-3 py-1.5 rounded-full border border-tertiary bg-neutral text-text-soft"
                      >
                        <CheckCircle className="w-3 h-3 text-primary shrink-0" aria-hidden />
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* How it works — 4 steps */}
              <div>
                <h3 className="font-serif text-xl font-light text-text mb-4">{labels.howItWorks}</h3>
                <div className="w-8 h-px bg-primary mb-6" />
                <div className="space-y-5">
                  {service.steps.map(({ title, desc }, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center font-sans text-[11px] font-bold shrink-0">
                          {i + 1}
                        </div>
                        {i < 3 && <div className="w-px flex-1 bg-primary/20 mt-1.5" />}
                      </div>
                      <div className="pb-4">
                        <h4 className="font-sans text-sm font-semibold text-text mb-1">{title}</h4>
                        <p className="font-sans text-xs text-text-soft leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="font-serif text-xl font-light text-text mb-4">{labels.benefits}</h3>
                <div className="w-8 h-px bg-primary mb-5" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3 bg-neutral rounded-xl">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" aria-hidden />
                      <span className="font-sans text-xs font-medium text-text">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* For who */}
              <div>
                <h3 className="font-serif text-xl font-light text-text mb-4">{labels.forWho}</h3>
                <div className="w-8 h-px bg-primary mb-4" />
                <p className="font-sans text-sm text-text-soft leading-relaxed">{service.forWho}</p>
              </div>

              {/* Before/After */}
              <div>
                <h3 className="font-serif text-xl font-light text-text mb-4">{labels.beforeAfterTitle}</h3>
                <div className="w-8 h-px bg-primary mb-4" />
                <ServiceBeforeAfter serviceName={service.name} />
              </div>

              {/* FAQ */}
              <div>
                <h3 className="font-serif text-xl font-light text-text mb-4">{labels.faqTitle}</h3>
                <div className="w-8 h-px bg-primary mb-5" />
                <FAQAccordion items={service.faq} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-5">

                {/* Doctor card */}
                <div className="bg-neutral rounded-2xl p-5 border border-neutral-dark">
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-widest text-primary mb-1.5">
                    {labels.performedBy}
                  </p>
                  <p className="font-serif text-base font-medium text-text">{service.doctorName}</p>
                  <p className="font-sans text-xs text-text-soft mt-0.5">{service.doctorTitle}</p>
                </div>

                {/* Sessions */}
                <div className="bg-neutral rounded-2xl p-5 border border-neutral-dark">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-primary" aria-hidden />
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-widest text-primary">
                      {labels.sessionsLabel}
                    </span>
                  </div>
                  <p className="font-sans text-sm text-text-soft leading-relaxed">{service.sessions}</p>
                </div>

                {/* Book CTA */}
                <div
                  className="rounded-2xl p-5 text-center"
                  style={{
                    background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)",
                  }}
                >
                  <h3 className="font-serif text-base font-light text-white mb-1.5">{labels.interested}</h3>
                  <p className="font-sans text-[11px] text-white/70 mb-4 leading-relaxed">{labels.interestedDesc}</p>
                  <Link
                    href="/consultation"
                    className="block font-sans text-sm font-semibold px-5 py-2.5 rounded-full bg-white text-primary hover:bg-neutral transition-colors mb-2"
                  >
                    {labels.bookCta}
                  </Link>
                  <a
                    href={`${CLINIC.whatsappLink}?text=${CLINIC.whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-sans text-[11px] text-white/60 hover:text-white transition-colors"
                  >
                    {labels.whatsappCta}
                  </a>
                </div>

                {/* View full page link */}
                <Link
                  href={`/services/${service.slug}`}
                  className="flex items-center gap-2 font-sans text-xs text-text-soft hover:text-primary transition-colors"
                >
                  {labels.viewFullPage}
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
