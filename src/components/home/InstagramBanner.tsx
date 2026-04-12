"use client";

interface InstagramBannerProps {
  instagramUrl: string;
  handle: string;
}

const ITEMS = [
  "REFINE CLINIC",
  "BEAUTY REDEFINED",
  "TANGER, MAROC",
  "DR. MERYEM",
  "DR. AMR",
  "MÉDECINE ESTHÉTIQUE",
  "CHIRURGIE PLASTIQUE",
  "CONSULTATION GRATUITE",
];

export default function InstagramBanner({ instagramUrl, handle }: InstagramBannerProps) {
  return (
    <a
      href={instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block py-4 overflow-hidden cursor-pointer"
      style={{ background: "var(--color-primary)" }}
    >
      <div className="relative flex">
        {/* First copy */}
        <div className="flex items-center gap-8 shrink-0 animate-[marquee_30s_linear_infinite]">
          {ITEMS.map((item, i) => (
            <span key={`a-${i}`} className="flex items-center gap-8 shrink-0">
              <span className="font-sans text-[12px] sm:text-[14px] font-bold tracking-[0.25em] uppercase text-white/90 whitespace-nowrap">
                {item}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/40 shrink-0" />
            </span>
          ))}
        </div>
        {/* Second copy for seamless loop */}
        <div className="flex items-center gap-8 shrink-0 animate-[marquee_30s_linear_infinite]" aria-hidden>
          {ITEMS.map((item, i) => (
            <span key={`b-${i}`} className="flex items-center gap-8 shrink-0">
              <span className="font-sans text-[12px] sm:text-[14px] font-bold tracking-[0.25em] uppercase text-white/90 whitespace-nowrap">
                {item}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/40 shrink-0" />
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </a>
  );
}
