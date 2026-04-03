"use client";

import AnimatedGroup from "@/components/ui/AnimatedGroup";
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider,
} from "@/components/ui/ImageComparison";

interface Item {
  service: string;
  zone: string;
  color: string;
}

export default function AvantApresGrid({ items }: { items: Item[] }) {
  return (
    <AnimatedGroup
      preset="blur"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
    >
      {items.map(({ service, zone, color }) => (
        <div
          key={service}
          className="bg-white rounded-2xl overflow-hidden shadow-brand hover:shadow-brand-md hover:-translate-y-1 transition-all duration-300"
        >
          {/* Interactive before/after comparison */}
          <ImageComparison
            className="h-72 cursor-ew-resize"
            enableHover
            springOptions={{ bounce: 0, duration: 0 }}
          >
            {/* Before */}
            <ImageComparisonImage position="right">
              <div
                className="w-full h-full flex flex-col items-center justify-center gap-2 border-r border-neutral-dark"
                style={{ background: `linear-gradient(135deg, var(--color-neutral-dark) 0%, var(--color-neutral) 100%)` }}
              >
                <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-text-soft/50">Avant</span>
                <div
                  className="w-16 h-16 rounded-full opacity-20"
                  style={{ background: "var(--color-secondary)" }}
                />
              </div>
            </ImageComparisonImage>

            {/* After */}
            <ImageComparisonImage position="left">
              <div
                className="w-full h-full flex flex-col items-center justify-center gap-2"
                style={{ background: `linear-gradient(135deg, var(--color-neutral) 0%, var(--color-tertiary) 100%)` }}
              >
                <span className="font-sans text-[9px] tracking-[0.25em] uppercase text-text-soft/50">Après</span>
                <div
                  className="w-16 h-16 rounded-full opacity-30"
                  style={{ background: "var(--color-primary)" }}
                />
              </div>
            </ImageComparisonImage>

            <ImageComparisonSlider className="bg-white/60 backdrop-blur-sm" />
          </ImageComparison>

          {/* Info */}
          <div className="p-5">
            <p className="font-sans text-[10px] tracking-widest uppercase text-primary font-semibold mb-1">
              {service}
            </p>
            <p className="font-sans text-sm text-text-soft">{zone}</p>
          </div>
        </div>
      ))}
    </AnimatedGroup>
  );
}
