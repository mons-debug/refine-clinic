/**
 * Zone metadata — body-part-as-landing-page.
 *
 * Each zone aggregates all services tagged to that area (via service.area[]).
 * Zones are the second browse axis alongside treatments: patients can arrive
 * via /services/{slug} OR /zones/{slug}.
 *
 * Priority tiers (for homepage featuring + content depth):
 *   1 = featured, full hero photo, full i18n content (intro + FAQ)
 *   2 = full page, auto-generated intro, no FAQ yet
 *   3 = basic aggregator only (label + treatment grid)
 */
import type { AreaKey } from "./area-icons";
import { CLINIC } from "./clinic";

export interface Zone {
  slug: AreaKey;
  image?: string;
  priority: 1 | 2 | 3;
  relatedZones?: AreaKey[];
}

export const ZONES: Zone[] = [
  // ── Priority 1 — launch set (Dr. Meryem's Apr 7 WhatsApp list) ──
  { slug: "mains",     image: "/images/zones/mains.png",     priority: 1, relatedZones: ["aisselles", "bras"] },
  { slug: "aisselles", image: "/images/zones/aisselles.png", priority: 1, relatedZones: ["mains", "bras"] },
  { slug: "pieds",     image: "/images/zones/pieds.png",     priority: 1, relatedZones: ["jambes", "mains"] },
  { slug: "tempes",    image: "/images/zones/tempes.png",    priority: 1, relatedZones: ["front", "yeux"] },
  { slug: "glabelle",  image: "/images/zones/glabelle.png",  priority: 1, relatedZones: ["front", "yeux"] },

  // ── Priority 2 — full pages, no dedicated photo yet ──
  { slug: "front",    priority: 2, relatedZones: ["glabelle", "tempes", "yeux"] },
  { slug: "yeux",     priority: 2, relatedZones: ["front", "tempes"] },
  { slug: "levres",   priority: 2, relatedZones: ["machoire"] },
  { slug: "nez",      priority: 2, relatedZones: ["front"] },
  { slug: "cou",      priority: 2, relatedZones: ["machoire", "poitrine"] },
  { slug: "machoire", priority: 2, relatedZones: ["cou", "levres"] },
  { slug: "cheveux",  priority: 2 },
  { slug: "ventre",   priority: 2, relatedZones: ["cuisses", "dos"] },
  { slug: "cuisses",  priority: 2, relatedZones: ["ventre", "jambes"] },
  { slug: "jambes",   priority: 2, relatedZones: ["cuisses", "pieds"] },
  { slug: "bras",     priority: 2, relatedZones: ["mains", "aisselles"] },

  // ── Priority 3 — basic aggregators ──
  { slug: "oreilles", priority: 3 },
  { slug: "dos",      priority: 3, relatedZones: ["ventre"] },
  { slug: "poitrine", priority: 3, relatedZones: ["cou"] },
  { slug: "corps",    priority: 3 },
];

export function getZone(slug: string): Zone | undefined {
  return ZONES.find((z) => z.slug === slug);
}

export function getFeaturedZones(limit = 5): Zone[] {
  return ZONES.filter((z) => z.priority === 1).slice(0, limit);
}

/** Services that include this zone's slug in their `area` array. */
export function servicesForZone(slug: string) {
  return CLINIC.services.filter((s) => (s.area as readonly string[]).includes(slug));
}

export function relatedZones(slug: string): Zone[] {
  const z = getZone(slug);
  if (!z?.relatedZones?.length) return [];
  return z.relatedZones
    .map((s) => getZone(s))
    .filter((x): x is Zone => Boolean(x));
}
