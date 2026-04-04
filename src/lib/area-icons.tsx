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
  "front", "yeux", "nez", "levres", "cou", "machoire",
  "corps", "ventre", "bras", "cuisses", "cheveux", "poitrine",
];

/* ── Base SVG wrapper ── */

const S = 24; // viewBox size
const SW = 1.5; // stroke width

function makeIcon(name: string, render: () => React.JSX.Element) {
  const Icon = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${S} ${S}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={SW}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {render()}
    </svg>
  );
  Icon.displayName = name;
  return Icon;
}

/* ═══════════════════════════════════════════
   FACE / FRONT — front-facing head outline
   with horizontal lines across forehead
   ═══════════════════════════════════════════ */
const FaceIcon = makeIcon("FaceIcon", () => (
  <>
    {/* Head shape — oval */}
    <ellipse cx="12" cy="11" rx="7" ry="9" />
    {/* Forehead wrinkle lines */}
    <line x1="9" y1="6" x2="15" y2="6" />
    <line x1="9.5" y1="8" x2="14.5" y2="8" />
    {/* Chin */}
    <path d="M9 18l3 3 3-3" />
  </>
));

/* ═══════════════════════════════════════════
   EYES — almond eye shape with circle iris
   ═══════════════════════════════════════════ */
const EyeIcon = makeIcon("EyeIcon", () => (
  <>
    {/* Eye shape — two arcs */}
    <path d="M2 12c2.7-4 5.7-6 10-6s7.3 2 10 6c-2.7 4-5.7 6-10 6s-7.3-2-10-6z" />
    {/* Iris */}
    <circle cx="12" cy="12" r="3" />
    {/* Pupil */}
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
  </>
));

/* ═══════════════════════════════════════════
   NOSE — front view, bridge + wings
   ═══════════════════════════════════════════ */
const NoseIcon = makeIcon("NoseIcon", () => (
  <>
    {/* Bridge */}
    <path d="M10 3c-.5 4-1 7-1 10" />
    <path d="M14 3c.5 4 1 7 1 10" />
    {/* Nose tip + wings */}
    <path d="M9 13c-2 1-3.5 2.5-3.5 4 0 1.5 1.5 2.5 3 2.5" />
    <path d="M15 13c2 1 3.5 2.5 3.5 4 0 1.5-1.5 2.5-3 2.5" />
    {/* Bottom curve connecting nostrils */}
    <path d="M8.5 19.5c1-.5 2.2-.8 3.5-.8s2.5.3 3.5.8" />
  </>
));

/* ═══════════════════════════════════════════
   LIPS — cupid's bow upper + full lower lip
   ═══════════════════════════════════════════ */
const LipsIcon = makeIcon("LipsIcon", () => (
  <>
    {/* Upper lip outer */}
    <path d="M4 12.5c3-2.5 5-3.5 8-3.5s5 1 8 3.5" />
    {/* Cupid's bow */}
    <path d="M8.5 11c1.5-1.2 2.5-1.5 3.5-1.5s2 .3 3.5 1.5" />
    {/* Lower lip */}
    <path d="M4 12.5c2.5 3.5 5 5 8 5s5.5-1.5 8-5" />
    {/* Lip line */}
    <path d="M6 12.5c2.5-.3 4-.3 6 0s3.5.3 6 0" />
  </>
));

/* ═══════════════════════════════════════════
   NECK — two vertical lines with horizontal
   bands (necklace lines / platysmal bands)
   ═══════════════════════════════════════════ */
const NeckIcon = makeIcon("NeckIcon", () => (
  <>
    {/* Chin base */}
    <path d="M7 3c2 .5 3.5.8 5 .8S14.5 3.5 17 3" />
    {/* Left neck contour */}
    <path d="M7 3c-.5 4-1 8-1 12s1 5 2 7" />
    {/* Right neck contour */}
    <path d="M17 3c.5 4 1 8 1 12s-1 5-2 7" />
    {/* Neck bands */}
    <path d="M7 9.5c3 .5 5 .7 10 0" />
    <path d="M7.5 14c2.5.5 4.5.6 9 0" />
  </>
));

/* ═══════════════════════════════════════════
   JAW — U-shape jawline with angle marks
   ═══════════════════════════════════════════ */
const JawIcon = makeIcon("JawIcon", () => (
  <>
    {/* Top of head */}
    <path d="M5.5 6c0-2 3-4 6.5-4s6.5 2 6.5 4" />
    {/* Jawline U-shape */}
    <path d="M5.5 6v4c0 3.5 1 6 2.5 8l4 4 4-4c1.5-2 2.5-4.5 2.5-8V6" />
    {/* Jaw angle ticks */}
    <line x1="5" y1="10" x2="7" y2="10" />
    <line x1="17" y1="10" x2="19" y2="10" />
  </>
));

/* ═══════════════════════════════════════════
   BODY — standing person, arms out
   ═══════════════════════════════════════════ */
const BodyIcon = makeIcon("BodyIcon", () => (
  <>
    {/* Head */}
    <circle cx="12" cy="4" r="2.5" />
    {/* Torso */}
    <line x1="12" y1="6.5" x2="12" y2="15" />
    {/* Arms */}
    <path d="M12 9l-5 3" />
    <path d="M12 9l5 3" />
    {/* Legs */}
    <path d="M12 15l-4 7" />
    <path d="M12 15l4 7" />
  </>
));

/* ═══════════════════════════════════════════
   STOMACH — torso outline with belly button
   ═══════════════════════════════════════════ */
const StomachIcon = makeIcon("StomachIcon", () => (
  <>
    {/* Torso left */}
    <path d="M7 2c-1 4-1.5 7-1.5 10S6 17 7 22" />
    {/* Torso right */}
    <path d="M17 2c1 4 1.5 7 1.5 10S18 17 17 22" />
    {/* Belly curve */}
    <path d="M8 14c1.5 2.5 3 3.5 4 3.5s2.5-1 4-3.5" />
    {/* Navel */}
    <circle cx="12" cy="12" r=".8" fill="currentColor" stroke="none" />
    {/* Waistline */}
    <path d="M7.5 8h9" />
  </>
));

/* ═══════════════════════════════════════════
   ARM — upper arm + forearm, slightly bent
   ═══════════════════════════════════════════ */
const ArmIcon = makeIcon("ArmIcon", () => (
  <>
    {/* Shoulder */}
    <path d="M6 2c3 0 5 1 6 2" />
    {/* Outer arm contour */}
    <path d="M6 2c-1.5 4-2 7-1.5 11C5 16 7 19 9 22" />
    {/* Inner arm contour */}
    <path d="M12 4c-1 3.5-1.5 6-1 10 .5 3 2 6 3.5 8" />
    {/* Elbow mark */}
    <path d="M4.5 13c1 .5 2.5.5 4 0" />
  </>
));

/* ═══════════════════════════════════════════
   THIGHS — pair of thighs from hip to knee
   ═══════════════════════════════════════════ */
const ThighIcon = makeIcon("ThighIcon", () => (
  <>
    {/* Hip bar */}
    <line x1="5" y1="2" x2="19" y2="2" />
    {/* Left thigh outer */}
    <path d="M6 2c-1 5-1 10-.5 15s1.5 4 2.5 4" />
    {/* Left thigh inner */}
    <path d="M10 2c.3 5 .3 10 0 15" />
    {/* Right thigh inner */}
    <path d="M14 2c-.3 5-.3 10 0 15" />
    {/* Right thigh outer */}
    <path d="M18 2c1 5 1 10 .5 15s-1.5 4-2.5 4" />
  </>
));

/* ═══════════════════════════════════════════
   HAIR — head with full hair volume
   ═══════════════════════════════════════════ */
const HairIcon = makeIcon("HairIcon", () => (
  <>
    {/* Hair outer volume */}
    <path d="M5 12c0-5 3-10 7-10s7 5 7 10" />
    {/* Hair part / strands on top */}
    <path d="M9 3.5c1.5 1 2.5 1.2 3 1.2s1.5-.2 3-1.2" />
    {/* Side hair flowing */}
    <path d="M4 12c-.5 3 0 5 1.5 7" />
    <path d="M20 12c.5 3 0 5-1.5 7" />
    {/* Face oval bottom */}
    <path d="M7.5 17c1.5 2.5 3 3.5 4.5 3.5s3-1 4.5-3.5" />
  </>
));

/* ═══════════════════════════════════════════
   CHEST — pectoral area, front view
   ═══════════════════════════════════════════ */
const ChestIcon = makeIcon("ChestIcon", () => (
  <>
    {/* Shoulders */}
    <path d="M3 9c1.5-3 4.5-5 9-5s7.5 2 9 5" />
    {/* Torso sides */}
    <line x1="3" y1="9" x2="3" y2="20" />
    <line x1="21" y1="9" x2="21" y2="20" />
    {/* Sternum */}
    <line x1="12" y1="4" x2="12" y2="20" />
    {/* Pec curves */}
    <path d="M4 10c3 2.5 5 3.5 8 3.5" />
    <path d="M20 10c-3 2.5-5 3.5-8 3.5" />
    {/* Bottom line */}
    <line x1="3" y1="20" x2="21" y2="20" />
  </>
));

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
