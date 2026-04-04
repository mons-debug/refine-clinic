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

/* ── SVG wrapper — Lucide-style: 24x24, 1.5 stroke, round caps/joins ── */

function icon(children: JSX.Element, name: string) {
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
      {children}
    </svg>
  );
  Icon.displayName = name;
  return Icon;
}

/* ── FACE (front/forehead) — front view of face outline with forehead lines ── */
const FaceIcon = icon(
  <>
    {/* Face oval */}
    <path d="M12 2C8.7 2 6 5.6 6 9.5c0 3.2 1.5 6 3.5 7.5L12 22l2.5-5c2-1.5 3.5-4.3 3.5-7.5C18 5.6 15.3 2 12 2z" />
    {/* Forehead wrinkle lines */}
    <path d="M9 6.5h6" />
    <path d="M9.5 8.5h5" />
  </>,
  "FaceIcon",
);

/* ── EYES — classic eye shape with iris ── */
const EyeIcon = icon(
  <>
    <path d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7S2.5 12 2.5 12z" />
    <circle cx={12} cy={12} r={3} />
  </>,
  "EyeIcon",
);

/* ── NOSE — side profile of nose, clear and literal ── */
const NoseIcon = icon(
  <>
    {/* Bridge to tip */}
    <path d="M12 2c0 0-1 3-1 6s.5 4 1 6" />
    {/* Nostrils */}
    <path d="M12 14c-1.5.5-3 1.5-3 3 0 1 .8 1.5 1.5 1.5" />
    <path d="M12 14c1.5.5 3 1.5 3 3 0 1-.8 1.5-1.5 1.5" />
  </>,
  "NoseIcon",
);

/* ── LIPS — cupid's bow + lower lip ── */
const LipsIcon = icon(
  <>
    {/* Upper lip with cupid's bow */}
    <path d="M5 13c1.5-2 3.5-3 7-3s5.5 1 7 3" />
    {/* Cupid's bow detail */}
    <path d="M9 12c1-.8 2-1.2 3-1.2s2 .4 3 1.2" />
    {/* Lower lip */}
    <path d="M5 13c1.5 3 3.5 4.5 7 4.5s5.5-1.5 7-4.5" />
  </>,
  "LipsIcon",
);

/* ── NECK — literal neck between shoulders and chin ── */
const NeckIcon = icon(
  <>
    {/* Chin */}
    <path d="M8 3h8" />
    {/* Neck sides */}
    <path d="M8 3c-.3 4-.5 7-.5 10s.5 5 1 8" />
    <path d="M16 3c.3 4 .5 7 .5 10s-.5 5-1 8" />
    {/* Neck lines */}
    <path d="M8.5 10h7" />
    <path d="M9 14h6" />
  </>,
  "NeckIcon",
);

/* ── JAW — front-view jawline, U-shape ── */
const JawIcon = icon(
  <>
    {/* Skull top */}
    <path d="M6 4c0-1.5 2.5-2.5 6-2.5S18 2.5 18 4" />
    {/* Jawline — clear U shape */}
    <path d="M6 4v5c0 4 1 7 3 9l3 3 3-3c2-2 3-5 3-9V4" />
    {/* Jaw angle marks */}
    <path d="M6 9h2" />
    <path d="M16 9h2" />
  </>,
  "JawIcon",
);

/* ── BODY — full standing body silhouette ── */
const BodyIcon = icon(
  <>
    {/* Head */}
    <circle cx={12} cy={4} r={2} />
    {/* Torso */}
    <path d="M12 6v7" />
    {/* Arms */}
    <path d="M8 8l4 2 4-2" />
    {/* Legs */}
    <path d="M12 13l-3 9" />
    <path d="M12 13l3 9" />
  </>,
  "BodyIcon",
);

/* ── STOMACH/BELLY — torso outline with navel ── */
const StomachIcon = icon(
  <>
    {/* Torso outline */}
    <path d="M8 2v2c-1 2-2 5-2 8s1 6 2 8v2" />
    <path d="M16 2v2c1 2 2 5 2 8s-1 6-2 8v2" />
    {/* Navel */}
    <circle cx={12} cy={13} r={1} />
    {/* Belly curve */}
    <path d="M8 12c1 2 2.5 3 4 3s3-1 4-3" />
  </>,
  "StomachIcon",
);

/* ── ARM — bent arm showing bicep ── */
const ArmIcon = icon(
  <>
    {/* Upper arm */}
    <path d="M8 2c-1 3-1.5 6-1 9" />
    <path d="M13 2c-.5 3-1 6-.5 9" />
    {/* Elbow */}
    <path d="M7 11c.5 1 1.5 2 3 2s2.5-1 3.5-2" />
    {/* Forearm */}
    <path d="M10 13c-.5 3-.5 5 0 9" />
    <path d="M13.5 13c.5 3 .5 5 0 9" />
  </>,
  "ArmIcon",
);

/* ── THIGHS — pair of thighs, front view ── */
const ThighIcon = icon(
  <>
    {/* Hip line */}
    <path d="M6 2h12" />
    {/* Left thigh */}
    <path d="M7 2c-.5 5-.5 10 0 15s1.5 5 2.5 5" />
    {/* Right thigh */}
    <path d="M17 2c.5 5 .5 10 0 15s-1.5 5-2.5 5" />
    {/* Inner thigh lines */}
    <path d="M11 2c.3 4 .3 8 0 12" />
    <path d="M13 2c-.3 4-.3 8 0 12" />
  </>,
  "ThighIcon",
);

/* ── HAIR — head with hair strands ── */
const HairIcon = icon(
  <>
    {/* Hair volume */}
    <path d="M6 11c0-5 2.7-9 6-9s6 4 6 9" />
    {/* Hair parting strands */}
    <path d="M9 2.5c1 1 2 2 3 2s2-1 3-2" />
    {/* Side hair */}
    <path d="M5 11c-1 2.5-.5 5 1 7" />
    <path d="M19 11c1 2.5.5 5-1 7" />
    {/* Face outline */}
    <path d="M8 16c1 2 2.5 3.5 4 3.5s3-1.5 4-3.5" />
  </>,
  "HairIcon",
);

/* ── CHEST — front torso with pec lines ── */
const ChestIcon = icon(
  <>
    {/* Shoulders */}
    <path d="M4 8c1-3 4-5 8-5s7 2 8 5" />
    {/* Torso sides */}
    <path d="M4 8v9" />
    <path d="M20 8v9" />
    {/* Chest center line */}
    <path d="M12 3v14" />
    {/* Pec curves */}
    <path d="M5 9c2 2 4 3 7 3" />
    <path d="M19 9c-2 2-4 3-7 3" />
  </>,
  "ChestIcon",
);

/* ── Export map ── */

export const AREA_ICONS: Record<AreaKey, ComponentType<{ className?: string }>> = {
  front: FaceIcon,
  yeux: EyeIcon,
  nez: NoseIcon,
  levres: LipsIcon,
  cou: NeckIcon,
  machoire: JawIcon,
  corps: BodyIcon,
  ventre: StomachIcon,
  bras: ArmIcon,
  cuisses: ThighIcon,
  cheveux: HairIcon,
  poitrine: ChestIcon,
};
