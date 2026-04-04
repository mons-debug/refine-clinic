"use client";

import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "@/components/ui/ImageComparison";

interface ServiceBeforeAfterProps {
  serviceName: string;
}

export default function ServiceBeforeAfter({ serviceName }: ServiceBeforeAfterProps) {
  return (
    <div className="space-y-4">
      <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-dark">
        <ImageComparison className="w-full h-full" enableHover>
          <ImageComparisonImage position="right">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--color-tertiary)] to-[var(--color-neutral-dark)]">
              <div className="text-center px-6">
                <p className="font-sans text-xs uppercase tracking-widest text-text-soft mb-2">Avant</p>
                <p className="font-serif text-lg text-text/60">{serviceName}</p>
                <p className="font-sans text-xs text-text-soft/50 mt-3">Photo à venir</p>
              </div>
            </div>
          </ImageComparisonImage>
          <ImageComparisonImage position="left">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-tertiary)]">
              <div className="text-center px-6">
                <p className="font-sans text-xs uppercase tracking-widest text-primary mb-2">Après</p>
                <p className="font-serif text-lg text-text/60">{serviceName}</p>
                <p className="font-sans text-xs text-text-soft/50 mt-3">Photo à venir</p>
              </div>
            </div>
          </ImageComparisonImage>
          <ImageComparisonSlider />
        </ImageComparison>
      </div>
      <p className="font-sans text-xs text-text-soft text-center italic">
        Les résultats réels seront ajoutés prochainement. Chaque patient est unique.
      </p>
    </div>
  );
}
