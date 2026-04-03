"use client";

import { cn } from "@/lib/utils";

interface ShineButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "white";
  as?: "button" | "a";
  href?: string;
}

export default function ShineButton({
  children,
  className,
  variant = "primary",
  as: Tag = "button",
  href,
  ...props
}: ShineButtonProps & { href?: string }) {
  const Comp = Tag as React.ElementType;

  return (
    <Comp
      href={href}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-3.5 font-sans text-sm font-semibold transition-all duration-300",
        "animate-shine bg-[length:400%_100%]",
        variant === "primary" &&
          "bg-[linear-gradient(110deg,var(--color-primary),45%,var(--color-tertiary),55%,var(--color-primary))] text-white shadow-brand hover:shadow-brand-md",
        variant === "white" &&
          "bg-[linear-gradient(110deg,#ffffff,45%,#f5f0e6,55%,#ffffff)] text-text shadow-brand hover:shadow-brand-md",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
