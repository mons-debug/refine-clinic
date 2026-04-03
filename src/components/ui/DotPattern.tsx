"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

interface DotPatternProps {
  className?: string;
  dotColor?: string;
  dotSize?: number;
  gap?: number;
}

export default function DotPattern({
  className,
  dotColor = "var(--color-primary)",
  dotSize = 1.2,
  gap = 24,
}: DotPatternProps) {
  const id = useId();
  const patternId = `dot-pattern-${id.replace(/:/g, "")}`;

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-current",
        className
      )}
    >
      <defs>
        <pattern
          id={patternId}
          width={gap}
          height={gap}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
        >
          <circle
            cx={dotSize}
            cy={dotSize}
            r={dotSize}
            fill={dotColor}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
