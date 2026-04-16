"use client";

import { Link } from "@/lib/navigation";
import { ArrowRight, Star } from "lucide-react";
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "@/components/ui/ImageComparison";
import SectionReveal from "@/components/ui/SectionReveal";

interface ResultItem {
  slug: string;
  serviceName: string;
  serviceDesc: string;
  filterType: string;
  color: string;
  doctor: string;
}

interface ResultsGridProps {
  items: ResultItem[];
  beforeLabel: string;
  afterLabel: string;
  ctaLabel: string;
}

// 5 featured results — curated, not all 18
const FEATURED = [
  {
    slugKey: "botox",
    patientName: "Samira K.",
    age: "34 ans",
    quote: "Les rides de mon front me complexaient depuis des années. Après une seule séance, mon visage est lissé naturellement. Je me sens rajeunie de 10 ans.",
    detail: "Botox front + pattes d'oie — 1 séance",
    rating: 5,
  },
  {
    slugKey: "fillers",
    patientName: "Nadia B.",
    age: "28 ans",
    quote: "J'avais les lèvres très fines. Le Dr. Meryem a su créer un volume naturel et harmonieux. Mes amies n'en reviennent pas !",
    detail: "Acide hyaluronique lèvres — 1 séance",
    rating: 5,
  },
  {
    slugKey: "liposuccion",
    patientName: "Yasmine H.",
    age: "41 ans",
    quote: "Le Dr. Amr est un véritable artiste. La liposuccion a transformé ma silhouette. Le suivi post-opératoire est impeccable.",
    detail: "Liposuccion 4D ventre + flancs — résultat à 3 mois",
    rating: 5,
  },
  {
    slugKey: "prp",
    patientName: "Leila M.",
    age: "38 ans",
    quote: "Mes cernes étaient mon plus grand complexe. Après 3 séances de PRP, mon regard est lumineux. L'équipe est d'une douceur incroyable.",
    detail: "PRP cernes + rajeunissement — 3 séances",
    rating: 4,
  },
  {
    slugKey: "epilation-laser",
    patientName: "Amina R.",
    age: "26 ans",
    quote: "Enfin libérée ! L'épilation laser a changé ma routine. Plus de rasage, plus d'irritations. Je recommande à toutes mes amies.",
    detail: "Épilation laser aisselles + jambes — 6 séances",
    rating: 5,
  },
];

export default function ResultsGrid({
  items,
  beforeLabel,
  afterLabel,
  ctaLabel,
}: ResultsGridProps) {
  // Match featured stories with service data
  const results = FEATURED.map((f) => {
    const service = items.find((i) => i.slug === f.slugKey);
    if (!service) return null;
    return { ...f, ...service };
  }).filter(Boolean) as (typeof FEATURED[number] & ResultItem)[];

  return (
    <div className="space-y-12">
      {results.map((result, i) => {
        const isReversed = i % 2 === 1;

        return (
          <SectionReveal key={result.slug}>
            <div
              className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 bg-white/55 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/50 shadow-[0_4px_24px_rgba(0,0,0,0.04)]`}
            >
              {/* Before/After */}
              <div className="lg:w-1/2 relative">
                <ImageComparison className="h-72 sm:h-80 lg:h-full min-h-[320px] cursor-ew-resize" enableHover>
                  <ImageComparisonImage position="right">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[var(--color-neutral-dark)] to-[var(--color-neutral)]">
                      <span className="font-sans text-[10px] tracking-[0.3em] uppercase font-semibold px-3 py-1 rounded-full bg-white/60 text-text-soft">
                        {beforeLabel}
                      </span>
                      <div className="w-20 h-20 rounded-full opacity-10" style={{ background: result.color }} />
                      <span className="font-sans text-[11px] text-text-soft/40">Photo à venir</span>
                    </div>
                  </ImageComparisonImage>
                  <ImageComparisonImage position="left">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[var(--color-tertiary)]/50 to-[var(--color-primary)]/10">
                      <span className="font-sans text-[10px] tracking-[0.3em] uppercase font-semibold px-3 py-1 rounded-full bg-white/60 text-primary">
                        {afterLabel}
                      </span>
                      <div className="w-20 h-20 rounded-full opacity-20" style={{ background: result.color }} />
                      <span className="font-sans text-[11px] text-text-soft/40">Photo à venir</span>
                    </div>
                  </ImageComparisonImage>
                  <ImageComparisonSlider />
                </ImageComparison>
              </div>

              {/* Story */}
              <div className="lg:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
                {/* Service tag */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-sans text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1 rounded-full bg-[var(--color-neutral)] text-[var(--color-primary-dark)]">
                    {result.serviceName}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-tertiary" />
                  <span className="font-sans text-[11px] text-text-soft">{result.doctor}</span>
                </div>

                {/* Quote */}
                <blockquote className="font-serif text-lg sm:text-xl font-light leading-relaxed text-text mb-5 relative">
                  <span className="absolute -top-3 -left-2 text-4xl text-tertiary/50 font-serif">"</span>
                  {result.quote}
                </blockquote>

                {/* Patient + rating */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="font-sans text-sm font-semibold text-text">{result.patientName}</p>
                    <p className="font-sans text-xs text-text-soft">{result.age} — {result.detail}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: result.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={`/services/${result.slug}`}
                  className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-primary hover:text-primary-dark transition-colors group"
                >
                  {ctaLabel}
                  <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </SectionReveal>
        );
      })}
    </div>
  );
}
