"use client";

import AnimatedGroup from "@/components/ui/AnimatedGroup";

interface InstagramGridProps {
  gradients: string[];
  instagramUrl: string;
}

export default function InstagramGrid({ gradients, instagramUrl }: InstagramGridProps) {
  return (
    <AnimatedGroup
      preset="blur"
      className="grid grid-cols-2 sm:grid-cols-3 gap-3"
    >
      {gradients.map((bg, i) => (
        <a
          key={i}
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Post Instagram ${i + 1}`}
          className="block aspect-square rounded-xl overflow-hidden group relative"
        >
          <div
            className="w-full h-full transition-transform duration-500 group-hover:scale-105"
            style={{ background: bg }}
          />
          <div className="absolute inset-0 bg-text/0 group-hover:bg-text/20 transition-colors duration-300 rounded-xl" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="font-sans text-[10px] tracking-widest uppercase text-white font-medium">
              Voir
            </span>
          </div>
        </a>
      ))}
    </AnimatedGroup>
  );
}
