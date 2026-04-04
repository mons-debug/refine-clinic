import { Eye, PersonStanding } from "lucide-react";
import type { ComponentType } from "react";

export type AreaKey =
  | "front"
  | "yeux"
  | "nez"
  | "levres"
  | "cou"
  | "machoire"
  | "corps"
  | "ventre"
  | "bras"
  | "cuisses"
  | "cheveux"
  | "poitrine";

export const AREA_KEYS: AreaKey[] = [
  "front",
  "yeux",
  "nez",
  "levres",
  "cou",
  "machoire",
  "corps",
  "ventre",
  "bras",
  "cuisses",
  "cheveux",
  "poitrine",
];

/* ── Helper to create custom SVG icon components ── */

function svgIcon(paths: string[], extra?: { circles?: { cx: number; cy: number; r: number }[] }) {
  const Icon = ({ className }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
      {extra?.circles?.map((c, i) => (
        <circle key={`c${i}`} cx={c.cx} cy={c.cy} r={c.r} />
      ))}
    </svg>
  );
  Icon.displayName = "AreaIcon";
  return Icon;
}

/* ── Icon definitions ── */

const FrontIcon = svgIcon(
  [
    // Forehead + face outline
    "M12 2C9 2 7 4.5 7 7.5c0 2.5 1 4.5 2.5 6L12 22l2.5-8.5c1.5-1.5 2.5-3.5 2.5-6C17 4.5 15 2 12 2z",
    // Brow lines
    "M9 7.5h6",
    "M9.5 5.5h5",
  ],
);

const NezIcon = svgIcon(
  [
    // Nose bridge
    "M12 3v12",
    // Nostrils
    "M12 15c-2 0-3.5 1-3.5 2.5S9.5 20 10.5 20",
    "M12 15c2 0 3.5 1 3.5 2.5S14.5 20 13.5 20",
    // Nose tip
    "M10.5 15.5a1.5 1.5 0 003 0",
  ],
);

const LevresIcon = svgIcon(
  [
    // Upper lip (cupid's bow)
    "M4 13c2-1.5 4-3 8-3s6 1.5 8 3",
    // Lower lip
    "M4 13c2 2.5 4 4.5 8 4.5s6-2 8-4.5",
    // Lip line
    "M6 13c2-.5 3.5-.5 6 0s4 .5 6 0",
  ],
);

const CouIcon = svgIcon(
  [
    // Neck contour left
    "M8 3c-.5 3-1 6-1 10s.5 5 1.5 8",
    // Neck contour right
    "M16 3c.5 3 1 6 1 10s-.5 5-1.5 8",
    // Necklace lines
    "M7.5 9h9",
    "M7 13h10",
  ],
);

const MachoireIcon = svgIcon(
  [
    // Jawline
    "M5 7c0-3 3-5 7-5s7 2 7 5",
    "M5 7c0 4.5-.5 7 2 10s3.5 3 5 3 2.5 0 5-3 2-5.5 2-10",
    // Jaw angle accent
    "M7 14l2 2",
    "M17 14l-2 2",
  ],
);

const VentreIcon = svgIcon(
  [
    // Belly outline
    "M7 6c-1 3-1.5 6-1 10s2 5.5 6 5.5 5.5-1.5 6-5.5.5-7-1-10",
    // Navel
    "M12 13v1.5",
  ],
  { circles: [{ cx: 12, cy: 15.5, r: 0.8 }] },
);

const BrasIcon = svgIcon(
  [
    // Arm outer contour
    "M7 3c-1.5 4-2 8-.5 13s3.5 5 5.5 5",
    // Arm inner contour
    "M10 3c-1 3.5-1.5 7-.5 11s2.5 4 4.5 4",
    // Bicep line
    "M7.5 8c1.5-.5 3 0 3.5 1",
  ],
);

const CuissesIcon = svgIcon(
  [
    // Left thigh
    "M8 2c-1 4-1.5 9-1 14s1.5 4.5 2.5 4.5",
    // Right thigh
    "M16 2c1 4 1.5 9 1 14s-1.5 4.5-2.5 4.5",
    // Inner line
    "M10 2c.5 4 .5 8 0 12",
    "M14 2c-.5 4-.5 8 0 12",
  ],
);

const CheveuxIcon = svgIcon(
  [
    // Hair top
    "M6 9c0-4 3-7 6-7s6 3 6 7",
    // Hair sides
    "M5 9c-1 2-.5 5 1 7",
    "M19 9c1 2 .5 5-1 7",
    // Hair strands
    "M8 4c1-1 2.5-1.5 4-1.5s3 .5 4 1.5",
    // Face bottom
    "M8 15c1 2 2.5 3 4 3s3-1 4-3",
  ],
);

const PoitrineIcon = svgIcon(
  [
    // Chest outline
    "M4 9c0-3 3.5-6 8-6s8 3 8 6",
    "M4 9c0 4.5 3.5 8.5 8 8.5s8-4 8-8.5",
    // Center line
    "M12 3v14.5",
    // Subtle curve
    "M8 10c1.5 1 2.5 1.5 4 1.5s2.5-.5 4-1.5",
  ],
);

/* ── Export map ── */

export const AREA_ICONS: Record<AreaKey, ComponentType<{ className?: string }>> = {
  front: FrontIcon,
  yeux: Eye,
  nez: NezIcon,
  levres: LevresIcon,
  cou: CouIcon,
  machoire: MachoireIcon,
  corps: PersonStanding,
  ventre: VentreIcon,
  bras: BrasIcon,
  cuisses: CuissesIcon,
  cheveux: CheveuxIcon,
  poitrine: PoitrineIcon,
};
