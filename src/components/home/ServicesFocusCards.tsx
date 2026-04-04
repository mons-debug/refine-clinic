"use client";

import FocusCards from "@/components/ui/FocusCards";
import type { FocusCardData } from "@/components/ui/FocusCards";

interface ServicesFocusCardsProps {
  categories: FocusCardData[];
}

export default function ServicesFocusCards({ categories }: ServicesFocusCardsProps) {
  return <FocusCards cards={categories} />;
}
