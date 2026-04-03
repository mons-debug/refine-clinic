"use client";

import { cn } from "@/lib/utils";
import { useState, createContext, useContext } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MotionValue, SpringOptions } from "framer-motion";

const ImageComparisonContext = createContext<{
  sliderPosition: number;
  setSliderPosition: (pos: number) => void;
  motionSliderPosition: MotionValue<number>;
} | null>(null);

export interface ImageComparisonProps {
  children: React.ReactNode;
  className?: string;
  enableHover?: boolean;
  springOptions?: SpringOptions;
}

const DEFAULT_SPRING_OPTIONS: SpringOptions = {
  bounce: 0,
  duration: 0,
};

export function ImageComparison({
  children,
  className,
  enableHover,
  springOptions,
}: ImageComparisonProps) {
  const [isDragging, setIsDragging] = useState(false);
  const motionValue = useMotionValue(50);
  const motionSliderPosition = useSpring(
    motionValue,
    springOptions ?? DEFAULT_SPRING_OPTIONS
  );
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleDrag = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging && !enableHover) return;

    const containerRect = (
      event.currentTarget as HTMLElement
    ).getBoundingClientRect();
    const x =
      "touches" in event
        ? event.touches[0].clientX - containerRect.left
        : (event as React.MouseEvent).clientX - containerRect.left;

    const percentage = Math.min(
      Math.max((x / containerRect.width) * 100, 0),
      100
    );
    motionValue.set(percentage);
    setSliderPosition(percentage);
  };

  return (
    <ImageComparisonContext.Provider
      value={{ sliderPosition, setSliderPosition, motionSliderPosition }}
    >
      <div
        className={cn(
          "relative select-none overflow-hidden",
          enableHover && "cursor-ew-resize",
          className
        )}
        onMouseMove={handleDrag}
        onMouseDown={() => !enableHover && setIsDragging(true)}
        onMouseUp={() => !enableHover && setIsDragging(false)}
        onMouseLeave={() => !enableHover && setIsDragging(false)}
        onTouchMove={handleDrag}
        onTouchStart={() => !enableHover && setIsDragging(true)}
        onTouchEnd={() => !enableHover && setIsDragging(false)}
      >
        {children}
      </div>
    </ImageComparisonContext.Provider>
  );
}

export function ImageComparisonImage({
  className,
  alt,
  src,
  position,
  children,
}: {
  className?: string;
  alt?: string;
  src?: string;
  position: "left" | "right";
  children?: React.ReactNode;
}) {
  const ctx = useContext(ImageComparisonContext);
  if (!ctx) throw new Error("ImageComparisonImage must be inside ImageComparison");

  const { motionSliderPosition } = ctx;
  const clipPath = useTransform(motionSliderPosition, (value) =>
    position === "right"
      ? `inset(0 ${100 - value}% 0 0)`
      : `inset(0 0 0 ${value}%)`
  );

  if (children) {
    return (
      <motion.div
        className={cn("absolute inset-0 h-full w-full", className)}
        style={{ clipPath }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.img
      src={src}
      alt={alt ?? ""}
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
      style={{ clipPath }}
    />
  );
}

export function ImageComparisonSlider({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const ctx = useContext(ImageComparisonContext);
  if (!ctx) throw new Error("ImageComparisonSlider must be inside ImageComparison");

  const { motionSliderPosition } = ctx;
  const left = useTransform(motionSliderPosition, (value) => `${value}%`);

  return (
    <motion.div
      className={cn(
        "absolute bottom-0 top-0 w-0.5 cursor-ew-resize bg-white/60 backdrop-blur-sm",
        className
      )}
      style={{ left }}
    >
      {children ?? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-white shadow-brand">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <path d="M18 8L22 12L18 16" />
            <path d="M6 8L2 12L6 16" />
          </svg>
        </div>
      )}
    </motion.div>
  );
}
