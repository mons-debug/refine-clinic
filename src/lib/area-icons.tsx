import type { ComponentType } from "react";

export type AreaKey =
  | "front"
  | "glabelle"
  | "tempes"
  | "yeux"
  | "nez"
  | "levres"
  | "cou"
  | "machoire"
  | "oreilles"
  | "corps"
  | "ventre"
  | "bras"
  | "cuisses"
  | "jambes"
  | "pieds"
  | "mains"
  | "aisselles"
  | "cheveux"
  | "poitrine"
  | "dos";

export const AREA_KEYS: AreaKey[] = [
  "front", "glabelle", "tempes", "yeux", "nez", "levres", "cou", "machoire", "oreilles",
  "corps", "ventre", "bras", "cuisses", "jambes", "pieds", "mains", "aisselles",
  "cheveux", "poitrine", "dos",
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

/** Custom icon from Illustrator SVG — uses original paths with a cropping viewBox */
function makeIllustratorIcon(
  name: string,
  viewBox: string,
  render: () => React.JSX.Element,
  sw = 2,
) {
  const Icon = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
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
    <ellipse cx="12" cy="11" rx="7" ry="9" />
    <line x1="9" y1="6" x2="15" y2="6" />
    <line x1="9.5" y1="8" x2="14.5" y2="8" />
    <path d="M9 18l3 3 3-3" />
  </>
));

/* ═══════════════════════════════════════════
   EYES — detailed eye with iris and pupil
   (from Illustrator SVG — jFLQgh group)
   ═══════════════════════════════════════════ */
const EyeIcon = makeIllustratorIcon("EyeIcon", "235 470 84 52", () => (
  <>
    <g strokeWidth="1.5">
      <path d="M315.52,488.74c-4.83-4.86-10.3-8.76-16.67-11.38-5.59-2.3-11.33-3.5-17.41-3.66-10.87-.29-20.53,2.89-29.26,9.23-3.92,2.85-7.09,6.44-10.39,9.92" />
      <path d="M311.17,506.87c-6.75,6.24-14.69,10.07-23.69,11.86-12.29,2.45-23.44-.46-33.84-7.04-.32-.2-.49-.32-.74.02" />
      <path d="M313.58,500.34c-5.42,4.78-11.34,8.79-18.14,11.34-3.02,1.13-5.99,2.05-9.41,2.18-3.43.13-6.91.74-10.4.75-2.03,0-4.48-.18-5.67-1.35-2.17-2.13-4.7-3.95-6.25-6.83-3.48-6.47-2.68-12.34.96-18.47,2.47-4.15,6.15-4.93,10.24-4.97,2.97-.03,5.96.02,8.96.27,4.53.37,6.77,2.88,8.72,6.43,4.17,7.61,1.93,16.58-4.15,21.27-.89.69-1.79,1.31-2.16,2.43" />
      <path d="M314.31,500.1c-4.98-4.96-10.61-9.06-16.7-12.54-1.46-.84-3.12-1.3-4.62-2.13-.56-.31-1.64-.63-2.38.17" />
      <path d="M265.72,485.59c-1.28-.97-2.63-.14-3.59.32-6.2,2.93-12.27,6.09-17.23,11.02-1.26,1.25-3.06,1.87-4.32,3.17-.59.61-1.64,1.15-1.17,2.15.46.98,1.44,1.51,2.61,1.48.32,0-.05.07.24-.02,3.89-1.23,6.74,1.16,9.65,2.95,4.37,2.69,8.93,4.91,13.8,6.49,1.13.37,2.26.65,3.38,0" />
      <path d="M285.06,496.23c.51-.71,1.47-.92,1.94-1.69.82-1.37,1.11-2.74,0-4.11-1.16-1.45-2.68-1.82-4.34-1.18-1.27.48-2.62,1.04-2.44,2.87.19,1.9.97,3.37,2.92,3.82.53.12,1.08.46,1.68.29" />
      <path d="M279.98,491.16c-3.05-.69-5.8.02-7.68,2.46-1.49,1.93-1.96,4.25-.81,6.74,1.56,3.4,5.34,5.37,8.73,4.34,3.6-1.1,5.84-4.81,4.96-8.22" />
      <path d="M244.57,497.92c.45,1.66.57,3.38.85,5.08" />
    </g>
  </>
));

/* ═══════════════════════════════════════════
   NOSE — front view with bridge + nostrils
   (from Illustrator SVG)
   ═══════════════════════════════════════════ */
const NoseIcon = makeIllustratorIcon("NoseIcon", "228 264 80 82", () => (
  <>
    <path d="M289.21,271.99c-.79,8.95-.29,17.59,5.33,25.21,3.77,5.12,5.44,10.93,5.61,17.29.21,7.76-1,15.22-3.84,22.44-.18.45-.4,1.12-.04,1.69" />
    <path d="M247.74,271.99c.87,9.13.15,17.93-5.56,25.62-2.79,3.76-4.19,8.01-4.97,12.6-.66,3.86-.61,7.73-.27,11.53.45,5.11,1.72,10.13,3.57,14.94.2.51-.08,1.1.39,1.51" />
    <path d="M273.6,322.18c-.62.62-.42,1.4-.42,2.14-.01,3.92,0,7.83-.01,11.75,0,.72.13,1.45-.21,2.14" />
    <path d="M251.8,328.16c4.83-.13,8.31-2.74,11.27-6.24.88.66.7,1.56.7,2.39,0,3.92,0,7.83,0,11.75,0,.72-.13,1.45.21,2.14" />
    <path d="M266.98,309.58c-.51,4.33-2.01,8.38-3.63,12.39" />
    <path d="M270.18,309.58c.26,3.36,1.2,6.49,2.47,9.65,1.83,4.53,5.18,6.95,9.49,8.51.98.35,1.97.44,3,.42" />
  </>
));

/* ═══════════════════════════════════════════
   LIPS — upper and lower lip curves
   (from Illustrator SVG)
   ═══════════════════════════════════════════ */
const LipsIcon = makeIllustratorIcon("LipsIcon", "232 566 78 40", () => (
  <>
    <path d="M237.96,588.77c1.23,2.79,3.95,4.05,6.25,5.46,6.02,3.71,12.54,6.2,19.6,7.41,11.82,2.03,22.42-.96,32.52-6.87,3.22-1.88,6.34-3.78,8.35-7.02-.2-1.8-1.75-2.47-2.83-3.45-4.84-4.41-10.03-8.35-16.23-10.68-3.32-1.25-6.62-1.75-10.29-.8-2.67.69-5.82.72-8.48,0-4.9-1.31-9.28-.12-13.47,1.9-5.8,2.78-10.71,6.91-15.43,11.25-.46.43-.46,1.06-.93,1.37.28.65.62,1.17,1.15,1.18,7.26.19,14.5.23,21.17-3.38,2.61-1.41,5.4-2.06,8.32-1.07,2.38.8,4.78.72,7.04-.07,2.74-.95,5.22-.15,7.46.98,3.96,1.99,8.03,3.06,12.43,3.42,2.1.17,4.12.42,6.21-.03.97-.21,2.05-.19,2.98.39" />
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
    <path d="M5.5 6c0-2 3-4 6.5-4s6.5 2 6.5 4" />
    <path d="M5.5 6v4c0 3.5 1 6 2.5 8l4 4 4-4c1.5-2 2.5-4.5 2.5-8V6" />
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
   STOMACH — torso with belly button
   (from Illustrator SVG)
   ═══════════════════════════════════════════ */
const StomachIcon = makeIllustratorIcon("StomachIcon", "224 153 90 70", () => (
  <>
    <path d="M244.8,157.36c0,5.05.04,10.11,0,15.16-.05,5.71-1.53,10.96-4.66,15.83-3.42,5.32-5.62,11.22-6.37,17.5-.41,3.43-1.07,6.97-.08,10.46" />
    <path d="M289.26,157.36c0,4.49.15,8.98-.03,13.45-.28,6.85,1.63,13.08,5.21,18.77,2.92,4.64,4.72,9.59,5.53,14.97.59,3.91,1.28,7.8.41,11.75" />
    <path d="M267.03,197.09v7.26" />
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
   CHEST — breast/pectoral area
   (from Illustrator SVG)
   ═══════════════════════════════════════════ */
const ChestIcon = makeIllustratorIcon("ChestIcon", "239 378 73 72", () => (
  <>
    <path d="M296.52,382.45c-1.11,1.71-.72,3.44.01,5.12,1.75,4.01,4.36,7.46,7.27,10.67,1.89,2.09,3.78,4.19,5.75,6.21,1.89,1.93,2.46,5.25.66,8.12-1.25,2-2.6,3.86-4.48,5.36-3.39,2.7-6.97,2.57-10.7,1.04-1.89-.77-3.6-1.85-5.13-3.2" />
    <path d="M243.51,406.8c2.43,2.68,4.98,5.29,6.6,8.56,1.89,3.82,3.2,7.85,3.45,12.16.36,6.22-.45,12.28-2.6,18.14-.11.3-.14.57-.18.87" />
    <path d="M255.26,411.93c2.84,3.12,5.91,5.91,9.82,7.71,5.67,2.61,11.07,1.26,14.59-3.19.6-.76,1.02-1.82,2.09-2.17" />
    <path d="M301.65,420.47c-1.45,5.69-2.99,11.36-4.26,17.09-.69,3.12-1.49,6.22-1.94,9.39" />
    <path d="M281.34,440.98v5.98" />
  </>
));

/* ═══════════════════════════════════════════
   EARS — ear shape with inner curl
   ═══════════════════════════════════════════ */
const EarIcon = makeIcon("EarIcon", () => (
  <>
    {/* Outer ear */}
    <path d="M15 4c3 1 4.5 4 4.5 7.5c0 4-2 7-4.5 8" />
    {/* Inner curl */}
    <path d="M15 8c1.2 0 2.2 1.5 2.2 3.5s-1 3.2-2.2 3.2" />
    {/* Earlobe */}
    <path d="M15 18.5c-0.5 1-1.2 1.8-2 2" />
  </>
));

/* ═══════════════════════════════════════════
   LEGS — full leg length with knees
   (different from thighs which stops at knees)
   ═══════════════════════════════════════════ */
const LegIcon = makeIcon("LegIcon", () => (
  <>
    {/* Waist */}
    <line x1="6" y1="2.5" x2="18" y2="2.5" />
    {/* Left leg outer */}
    <path d="M7.5 2.5c-0.5 5-0.5 12-0.2 19" />
    {/* Left leg inner */}
    <path d="M11.5 2.5c0 6 0 13-0.2 19" />
    {/* Right leg inner */}
    <path d="M12.5 2.5c0 6 0 13 0.2 19" />
    {/* Right leg outer */}
    <path d="M16.5 2.5c0.5 5 0.5 12 0.2 19" />
    {/* Knee marks */}
    <line x1="7.8" y1="11" x2="11" y2="11" />
    <line x1="13" y1="11" x2="16.2" y2="11" />
  </>
));

/* ═══════════════════════════════════════════
   HANDS — palm with 5 fingers
   ═══════════════════════════════════════════ */
const HandIcon = makeIcon("HandIcon", () => (
  <>
    {/* Thumb */}
    <path d="M7 14c-1 -0.8 -2 -1.5 -2 -3.5c0 -0.6 0.4 -1 1 -1s1 0.4 1 1v2" />
    {/* Finger 1 (index) */}
    <path d="M7 14v-10c0 -0.6 0.4 -1 1 -1s1 0.4 1 1v8" />
    {/* Finger 2 (middle) */}
    <path d="M9.5 12v-10.5c0 -0.6 0.4 -1 1 -1s1 0.4 1 1v9" />
    {/* Finger 3 (ring) */}
    <path d="M12 12v-10c0 -0.6 0.4 -1 1 -1s1 0.4 1 1v9" />
    {/* Finger 4 (pinky) */}
    <path d="M14.5 12v-8.5c0 -0.6 0.4 -1 1 -1s1 0.4 1 1v7.5" />
    {/* Palm + wrist */}
    <path d="M6.5 14v5c0 1.5 1.2 2.5 3 2.5h4c2 0 3.5 -1 3.5 -3v-6.5" />
  </>
));

/* ═══════════════════════════════════════════
   AXILLARY (aisselles) — torso with raised arm
   ═══════════════════════════════════════════ */
const AxillaryIcon = makeIcon("AxillaryIcon", () => (
  <>
    {/* Raised arm */}
    <path d="M8 2c-0.5 3 -1.5 5 -2.5 6.5" />
    {/* Shoulder / armpit curve */}
    <path d="M8 2c1.5 2 4.5 2.5 6 2.5" />
    {/* Armpit hollow */}
    <path d="M10 5.5c-0.5 1 -1.2 2 -2.2 2.5" />
    {/* Torso side */}
    <path d="M10 5c0.2 6 0.2 12 0.5 17" />
    {/* Other torso side */}
    <path d="M16 4.5c0 6 0 12 -0.2 17.5" />
  </>
));

/* ═══════════════════════════════════════════
   BACK (dos) — rear view with spine
   ═══════════════════════════════════════════ */
const BackIcon = makeIcon("BackIcon", () => (
  <>
    {/* Shoulders */}
    <path d="M7 4c1.5 -1 3 -1.5 5 -1.5s3.5 0.5 5 1.5" />
    {/* Left back */}
    <path d="M7 4c-0.5 4 -0.5 9 0 14c0.2 2 1 3 2 3" />
    {/* Right back */}
    <path d="M17 4c0.5 4 0.5 9 0 14c-0.2 2 -1 3 -2 3" />
    {/* Spine */}
    <line x1="12" y1="5" x2="12" y2="19" />
    {/* Shoulder blade marks */}
    <path d="M9 8c0.5 0.5 1.5 0.8 2.5 0.5" />
    <path d="M15 8c-0.5 0.5 -1.5 0.8 -2.5 0.5" />
  </>
));

/* ═══════════════════════════════════════════
   GLABELLE — between eyebrows
   ═══════════════════════════════════════════ */
const GlabellaIcon = makeIcon("GlabellaIcon", () => (
  <>
    {/* Left eyebrow */}
    <path d="M5 10c1 -1 3 -1.5 5 -1" />
    {/* Right eyebrow */}
    <path d="M14 9c2 -0.5 4 0 5 1" />
    {/* Glabella wrinkles */}
    <path d="M11 10.5v4" />
    <path d="M12.5 10.5v3.5" />
    {/* Left eye hint */}
    <path d="M6.5 13.5c1 0.5 2 0.5 3 0" />
    {/* Right eye hint */}
    <path d="M14.5 13.5c1 0.5 2 0.5 3 0" />
  </>
));

/* ═══════════════════════════════════════════
   TEMPES — side of the face, temple area
   ═══════════════════════════════════════════ */
const TempleIcon = makeIcon("TempleIcon", () => (
  <>
    {/* Face profile */}
    <path d="M8 3c-0.5 4 -1 8 0 12c0.5 2 2 4 4 5" />
    {/* Hairline */}
    <path d="M8 3c1 -0.5 2.5 -0.8 4.5 -0.5" />
    {/* Temple curve */}
    <path d="M8 7c-0.5 0.5 -1 1.5 -1 2.5s0.5 1.5 1 2" />
    {/* Temple hollow marker */}
    <circle cx="9" cy="9.5" r="0.4" fill="currentColor" stroke="none" />
    {/* Eye hint */}
    <path d="M11 10c1 -0.5 2 -0.5 3 0" />
    {/* Mouth hint */}
    <path d="M11 15c0.5 0.3 1.5 0.3 2 0" />
  </>
));

/* ═══════════════════════════════════════════
   PIEDS — feet, top-down view
   ═══════════════════════════════════════════ */
const FeetIcon = makeIcon("FeetIcon", () => (
  <>
    {/* Left foot outline */}
    <path d="M6 5c-1 0 -2 1 -2 3s0.5 6 1 9c0.3 2 1 3 2.5 3s2 -1 2 -3v-9c0 -2 -1 -3 -2 -3c-0.5 0 -1 0 -1.5 0z" />
    {/* Left toes */}
    <circle cx="4.5" cy="4" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="5.8" cy="3" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="7" cy="2.8" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="8" cy="3.2" r="0.4" fill="currentColor" stroke="none" />
    {/* Right foot outline */}
    <path d="M18 5c1 0 2 1 2 3s-0.5 6 -1 9c-0.3 2 -1 3 -2.5 3s-2 -1 -2 -3v-9c0 -2 1 -3 2 -3c0.5 0 1 0 1.5 0z" />
    {/* Right toes */}
    <circle cx="19.5" cy="4" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="18.2" cy="3" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="17" cy="2.8" r="0.5" fill="currentColor" stroke="none" />
    <circle cx="16" cy="3.2" r="0.4" fill="currentColor" stroke="none" />
  </>
));

/* ── Export map ── */

export const AREA_ICONS: Record<AreaKey, ComponentType<{ className?: string }>> = {
  front: FaceIcon,
  glabelle: GlabellaIcon,
  tempes: TempleIcon,
  yeux: EyeIcon,
  nez: NoseIcon,
  levres: LipsIcon,
  cou: NeckIcon,
  machoire: JawIcon,
  oreilles: EarIcon,
  corps: BodyIcon,
  ventre: StomachIcon,
  bras: ArmIcon,
  cuisses: ThighIcon,
  jambes: LegIcon,
  pieds: FeetIcon,
  mains: HandIcon,
  aisselles: AxillaryIcon,
  cheveux: HairIcon,
  poitrine: ChestIcon,
  dos: BackIcon,
};
