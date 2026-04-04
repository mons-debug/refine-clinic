import {
  Eye,
  PersonArmsSpread,
  FaceMask,
  Ear,
  Sparkle,
  Heart,
  Barbell,
  HandGrabbing,
} from "@phosphor-icons/react";
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

/* ── Custom SVG icons for body parts no library covers ── */

function customIcon(children: JSX.Element, name: string) {
  const Icon = ({ className }: { className?: string }) => (
    <svg
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
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

/* Nose — side profile, clear bridge + tip + nostrils */
const NoseIcon = customIcon(
  <>
    <path d="M128 24c0 0-12 40-12 80s6 40 12 64" />
    <path d="M128 168c-20 6-36 18-36 32 0 10 8 16 16 16" />
    <path d="M128 168c20 6 36 18 36 32 0 10-8 16-16 16" />
  </>,
  "NoseIcon",
);

/* Lips — cupid's bow + full lower lip */
const LipsIcon = customIcon(
  <>
    <path d="M48 128c20-24 44-36 80-36s60 12 80 36" />
    <path d="M96 112c12-10 20-14 32-14s20 4 32 14" />
    <path d="M48 128c20 32 44 48 80 48s60-16 80-48" />
  </>,
  "LipsIcon",
);

/* Neck — between chin and shoulders */
const NeckIcon = customIcon(
  <>
    <path d="M80 24h96" />
    <path d="M80 24c-4 48-6 80-6 112s4 52 10 96" />
    <path d="M176 24c4 48 6 80 6 112s-4 52-10 96" />
    <path d="M84 112h88" />
    <path d="M88 160h80" />
  </>,
  "NeckIcon",
);

/* Jaw — U-shape jawline, front view */
const JawIcon = customIcon(
  <>
    <path d="M56 40c0-16 28-28 72-28s72 12 72 28" />
    <path d="M56 40v48c0 44 12 76 32 100l40 44 40-44c20-24 32-56 32-100V40" />
  </>,
  "JawIcon",
);

/* Stomach — torso outline + navel */
const StomachIcon = customIcon(
  <>
    <path d="M80 20v24c-12 24-20 56-20 84s8 60 20 84v24" />
    <path d="M176 20v24c12 24 20 56 20 84s-8 60-20 84v24" />
    <circle cx={128} cy={140} r={8} fill="currentColor" stroke="none" />
    <path d="M88 128c12 20 28 28 40 28s28-8 40-28" />
  </>,
  "StomachIcon",
);

/* Thighs — pair from hip to knee */
const ThighIcon = customIcon(
  <>
    <path d="M56 20h144" />
    <path d="M68 20c-6 52-6 108 0 164s16 52 28 52" />
    <path d="M188 20c6 52 6 108 0 164s-16 52-28 52" />
    <path d="M116 20c2 44 2 88 0 132" />
    <path d="M140 20c-2 44-2 88 0 132" />
  </>,
  "ThighIcon",
);

/* Hair — head silhouette with styled hair */
const HairIcon = customIcon(
  <>
    <path d="M60 120c0-52 30-96 68-96s68 44 68 96" />
    <path d="M92 28c12 10 24 16 36 16s24-6 36-16" />
    <path d="M48 120c-10 28-6 52 10 72" />
    <path d="M208 120c10 28 6 52-10 72" />
    <path d="M80 180c14 24 30 36 48 36s34-12 48-36" />
  </>,
  "HairIcon",
);

/* ── Phosphor wrapper to match our API (className prop) ── */

function phosphor(
  PhosphorIcon: ComponentType<{ size?: number | string; weight?: string; className?: string }>,
  name: string,
) {
  const Icon = ({ className }: { className?: string }) => (
    <PhosphorIcon className={className} weight="regular" />
  );
  Icon.displayName = name;
  return Icon;
}

/* ── Export map ── */

export const AREA_ICONS: Record<AreaKey, ComponentType<{ className?: string }>> = {
  front: phosphor(FaceMask, "FrontIcon"),
  yeux: phosphor(Eye, "YeuxIcon"),
  nez: NoseIcon,
  levres: LipsIcon,
  cou: NeckIcon,
  machoire: JawIcon,
  corps: phosphor(PersonArmsSpread, "CorpsIcon"),
  ventre: StomachIcon,
  bras: phosphor(Barbell, "BrasIcon"),
  cuisses: ThighIcon,
  cheveux: HairIcon,
  poitrine: phosphor(Heart, "PoitrineIcon"),
};
