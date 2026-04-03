"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type PresetType = "fade" | "slide" | "scale" | "blur" | "blur-slide";

const presets: Record<PresetType, { container: Variants; item: Variants }> = {
  fade: {
    container: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
    },
    item: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  },
  slide: {
    container: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
  },
  scale: {
    container: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
    },
    item: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
    },
  },
  blur: {
    container: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
    },
    item: {
      hidden: { opacity: 0, filter: "blur(8px)", y: 16 },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      },
    },
  },
  "blur-slide": {
    container: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
    },
    item: {
      hidden: { opacity: 0, filter: "blur(4px)", y: 24 },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: { duration: 0.6, type: "spring", bounce: 0.3 },
      },
    },
  },
};

interface AnimatedGroupProps {
  children: React.ReactNode;
  className?: string;
  variants?: { container?: Variants; item?: Variants };
  preset?: PresetType;
  as?: React.ElementType;
  once?: boolean;
}

export default function AnimatedGroup({
  children,
  className,
  variants,
  preset = "fade",
  as = "div",
  once = true,
}: AnimatedGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px" });
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  const selectedVariants = variants ?? presets[preset];

  return (
    <MotionTag
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={selectedVariants.container}
      className={cn(className)}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={selectedVariants.item}>
              {child}
            </motion.div>
          ))
        : children}
    </MotionTag>
  );
}
