"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import type { Transition, Variants } from "framer-motion";
import React, { useMemo } from "react";

export type PresetType = "blur" | "fade-in-blur" | "scale" | "fade" | "slide";
export type PerType = "word" | "char" | "line";

export type TextEffectProps = {
  children: string;
  per?: PerType;
  as?: keyof React.JSX.IntrinsicElements;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  className?: string;
  preset?: PresetType;
  delay?: number;
  speedReveal?: number;
  speedSegment?: number;
  trigger?: boolean;
  onAnimationComplete?: () => void;
  segmentWrapperClassName?: string;
};

const defaultStaggerTimes: Record<PerType, number> = {
  char: 0.03,
  word: 0.05,
  line: 0.1,
};

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
  exit: { opacity: 0, transition: { staggerChildren: 0.02, staggerDirection: -1 } },
};

const presetVariants: Record<PresetType, Variants> = {
  blur: {
    hidden: { opacity: 0, filter: "blur(12px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(12px)" },
  },
  "fade-in-blur": {
    hidden: { opacity: 0, filter: "blur(6px)", y: 8 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
    exit: { opacity: 0, filter: "blur(6px)", y: 8 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
};

function splitText(text: string, per: PerType): string[] {
  if (per === "line") return text.split("\n");
  if (per === "word") return text.split(/(\s+)/);
  return text.split("");
}

export function TextEffect({
  children,
  per = "word",
  as = "p",
  variants,
  className,
  preset = "fade",
  delay = 0,
  speedReveal = 1,
  speedSegment = 1,
  trigger = true,
  onAnimationComplete,
  segmentWrapperClassName,
}: TextEffectProps) {
  const segments = useMemo(() => splitText(children, per), [children, per]);
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.p;

  const containerVariants = variants?.container ?? {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: (defaultStaggerTimes[per] ?? 0.05) / speedReveal,
        delayChildren: delay,
      },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.02, staggerDirection: -1 },
    },
  };

  const itemVariants = variants?.item ?? presetVariants[preset];
  const itemTransition: Transition = {
    duration: 0.3 / speedSegment,
    ease: "easeOut",
  };

  return (
    <AnimatePresence mode="popLayout">
      {trigger && (
        <MotionTag
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          onAnimationComplete={onAnimationComplete}
          className={cn(className)}
        >
          {segments.map((segment, i) => (
            <motion.span
              key={`${segment}-${i}`}
              variants={itemVariants}
              transition={itemTransition}
              className={cn(
                per === "line" ? "block" : "inline-block",
                per === "word" && segment.match(/^\s+$/) ? "whitespace-pre" : "",
                segmentWrapperClassName
              )}
            >
              {segment}
            </motion.span>
          ))}
        </MotionTag>
      )}
    </AnimatePresence>
  );
}
