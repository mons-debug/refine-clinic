/**
 * Indication → Zone + Services reverse-lookup registry.
 *
 * Enables cross-service discovery: "dark_circles" should surface PRP, Fillers
 * AND Meso — today those are all buried on their respective service pages.
 *
 * Keys match the labels in messages/{locale}.json services.indications.
 */
import type { AreaKey } from "./area-icons";

export interface IndicationMeta {
  zone: AreaKey;
  services: string[];  // service slugs from CLINIC.services
}

export const INDICATIONS: Record<string, IndicationMeta> = {
  // Botox indications
  wrinkles_forehead:       { zone: "front",     services: ["botox"] },
  glabellar_frown:         { zone: "glabelle",  services: ["botox"] },
  crows_feet:              { zone: "yeux",      services: ["botox"] },
  eyebrow_lift:            { zone: "front",     services: ["botox"] },
  bunny_lines:             { zone: "nez",       services: ["botox"] },
  nasal_tip_lift:          { zone: "nez",       services: ["botox"] },
  nasal_flare:             { zone: "nez",       services: ["botox"] },
  oral_commissures:        { zone: "levres",    services: ["botox"] },
  lip_lift:                { zone: "levres",    services: ["botox"] },
  smokers_lines:           { zone: "levres",    services: ["botox", "fillers"] },
  gummy_smile:             { zone: "levres",    services: ["botox"] },
  marionette_lines:        { zone: "levres",    services: ["botox", "fillers"] },
  dimpled_chin:            { zone: "machoire",  services: ["botox"] },
  nefertiti_neck:          { zone: "cou",       services: ["botox"] },
  masseter:                { zone: "machoire",  services: ["botox"] },
  platysmal_bands:         { zone: "cou",       services: ["botox"] },
  necklace_lines:          { zone: "cou",       services: ["botox"] },
  axillary_hyperhidrosis:  { zone: "aisselles", services: ["botox"] },
  palmoplantar_hyperhidrosis: { zone: "pieds",  services: ["botox"] },

  // Fillers indications
  nasolabial_folds:        { zone: "nez",       services: ["fillers"] },
  lip_filler:              { zone: "levres",    services: ["fillers"] },
  tear_trough:             { zone: "yeux",      services: ["fillers"] },
  sunken_temples:          { zone: "tempes",    services: ["fillers"] },
  fine_wrinkles:           { zone: "front",     services: ["fillers"] },
  cheek_augmentation:      { zone: "machoire",  services: ["fillers"] },
  chin_augmentation:       { zone: "machoire",  services: ["fillers"] },
  texas_inject:            { zone: "front",     services: ["fillers"] },
  aging_hands:             { zone: "mains",     services: ["fillers"] },

  // Laser indications
  hair_reduction:          { zone: "corps",     services: ["epilation-laser"] },
  vascular_lesions:        { zone: "front",     services: ["epilation-laser"] },

  // PRP indications
  hair_loss:               { zone: "cheveux",   services: ["prp", "mesotherapie"] },
  skin_rejuvenation_face:  { zone: "front",     services: ["prp"] },
  skin_rejuvenation_neck:  { zone: "cou",       services: ["prp"] },
  skin_rejuvenation_hands: { zone: "mains",     services: ["prp"] },
  stretch_marks:           { zone: "corps",     services: ["prp", "mesotherapie"] },
  dark_circles:            { zone: "yeux",      services: ["prp", "fillers"] },
  acne_scars:              { zone: "front",     services: ["prp"] },

  // Meso indications
  meso_hair_loss:          { zone: "cheveux",   services: ["mesotherapie"] },
  meso_skin_rejuvenation:  { zone: "front",     services: ["mesotherapie"] },
  meso_double_chin:        { zone: "machoire",  services: ["mesotherapie"] },
  meso_love_handles:       { zone: "ventre",    services: ["mesotherapie"] },
  meso_back_fat:           { zone: "dos",       services: ["mesotherapie"] },
  meso_arms:               { zone: "bras",      services: ["mesotherapie"] },
  meso_stomach:            { zone: "ventre",    services: ["mesotherapie"] },
  meso_inner_thighs:       { zone: "cuisses",   services: ["mesotherapie"] },

  // NEW — Peeling (Apr 16)
  axillary_peeling:        { zone: "aisselles", services: ["peeling-chimique"] },
  plantar_peeling:         { zone: "pieds",     services: ["peeling-chimique"] },

  // NEW — Vascular (Apr 16)
  vascular_lesions_legs:   { zone: "jambes",    services: ["varicosites-jambes"] },
};

/** All indication keys mapped to a given zone. */
export function indicationsForZone(slug: string): string[] {
  return Object.entries(INDICATIONS)
    .filter(([, meta]) => meta.zone === slug)
    .map(([key]) => key);
}

/** All services that treat a given indication. */
export function servicesForIndication(indicationKey: string): string[] {
  return INDICATIONS[indicationKey]?.services ?? [];
}
