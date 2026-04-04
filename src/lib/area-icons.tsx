import type { ReactNode } from "react";

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

const icon = (d: string, extra?: string) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6"
  >
    <path d={d} />
    {extra && <path d={extra} />}
  </svg>
);

export const AREA_ICONS: Record<AreaKey, ReactNode> = {
  front: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 2C8.5 2 6 5 6 8.5c0 2 .5 3.5 1.5 5C9 15.5 10.5 17 12 22c1.5-5 3-6.5 4.5-8.5 1-1.5 1.5-3 1.5-5C18 5 15.5 2 12 2z" />
      <path d="M9 8h6" />
    </svg>
  ),
  yeux: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  nez: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 2v14" />
      <path d="M8 18c0-1 1.5-2 4-2s4 1 4 2" />
      <path d="M8 18c-1.5 0-2.5.5-2.5 1.5S7 21 8 21" />
      <path d="M16 18c1.5 0 2.5.5 2.5 1.5S17 21 16 21" />
    </svg>
  ),
  levres: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M3 12c3-2 5-3.5 9-3.5s6 1.5 9 3.5" />
      <path d="M3 12c3 3 5 5 9 5s6-2 9-5" />
      <path d="M3 12c1.5-.5 4-1 5 0s2.5 1 4 0 3.5-.5 5 0" />
    </svg>
  ),
  cou: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M8 2c0 3-1 6-1 10s1 7 2 10" />
      <path d="M16 2c0 3 1 6 1 10s-1 7-2 10" />
      <path d="M7 8h10" />
      <path d="M6 14h12" />
    </svg>
  ),
  machoire: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M4 8c0-3 3-6 8-6s8 3 8 6" />
      <path d="M4 8c0 5-1 8 2 11s4 3 6 3 3 0 6-3 2-6 2-11" />
    </svg>
  ),
  corps: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="12" cy="4" r="2" />
      <path d="M12 6v8" />
      <path d="M8 8l4 2 4-2" />
      <path d="M10 22l2-8 2 8" />
    </svg>
  ),
  ventre: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <ellipse cx="12" cy="13" rx="6" ry="7" />
      <path d="M12 9v3" />
      <circle cx="12" cy="13" r="1" />
    </svg>
  ),
  bras: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M6 4c-1 4-2 8 0 12s4 6 6 6" />
      <path d="M6 4c2 0 4 1 5 3" />
      <path d="M12 22c0-3 1-5 3-7" />
    </svg>
  ),
  cuisses: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M8 2c-1 5-2 10-1 15s2 5 3 5" />
      <path d="M16 2c1 5 2 10 1 15s-2 5-3 5" />
    </svg>
  ),
  cheveux: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 2C8 2 5 4 5 7c0 2 1 3 2 4" />
      <path d="M12 2c4 0 7 2 7 5 0 2-1 3-2 4" />
      <path d="M4 9c-1 3 0 6 2 8" />
      <path d="M20 9c1 3 0 6-2 8" />
      <path d="M8 14c0 4 2 8 4 8s4-4 4-8" />
    </svg>
  ),
  poitrine: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M4 10c0-3 3-6 8-6s8 3 8 6" />
      <path d="M4 10c0 4 3 8 8 8s8-4 8-8" />
      <path d="M12 4v14" />
    </svg>
  ),
};
