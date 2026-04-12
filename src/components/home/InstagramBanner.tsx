"use client";

import { AtSign } from "lucide-react";

interface InstagramBannerProps {
  instagramUrl: string;
  handle: string;
}

const ITEMS = [
  "REFINE CLINIC",
  "BEAUTY REDEFINED",
  "TANGER",
  "DR. MERYEM",
  "DR. AMR",
  "MÉDECINE ESTHÉTIQUE",
  "CHIRURGIE PLASTIQUE",
];

export default function InstagramBanner({ instagramUrl, handle }: InstagramBannerProps) {
  // Double the items for seamless loop
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <a
      href={instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative py-4 cursor-pointer hover:opacity-80 transition-opacity"
    >
      <div
        className="flex items-center gap-6 animate-marquee-reverse whitespace-nowrap"
        style={{
          animationDuration: "40s",
        }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-3 shrink-0">
            <span
              className="font-sans text-[12px] sm:text-[14px] font-bold tracking-[0.2em] uppercase"
              style={{ color: "var(--color-primary)" }}
            >
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-tertiary)" }} />
          </span>
        ))}
      </div>

      {/* Centered Instagram handle overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span
          className="flex items-center gap-2 font-sans text-[11px] font-semibold tracking-[0.1em] px-4 py-2 rounded-full"
          style={{
            background: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.5)",
            color: "var(--color-primary)",
          }}
        >
          <AtSign className="w-3.5 h-3.5" />
          {handle}
        </span>
      </div>

      <style>{`
        @keyframes marquee-reverse {
          0% { transform: translateX(0); }
          100% { transform: translateX(50%); }
        }
        .animate-marquee-reverse {
          animation: marquee-reverse linear infinite;
          will-change: transform;
        }
      `}</style>
    </a>
  );
}
