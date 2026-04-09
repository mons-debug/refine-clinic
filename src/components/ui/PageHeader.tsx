"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TextEffect } from "@/components/ui/TextEffect";
import DotPattern from "@/components/ui/DotPattern";
import { motion } from "framer-motion";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  className?: string;
  size?: "default" | "large";
  gradient?: "default" | "warm" | "cool";
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  className,
  size = "default",
  gradient = "default",
}: PageHeaderProps) {
  const t = useTranslations("page_header");

  return (
    <section
      className={cn(
        "relative flex flex-col items-center justify-center text-center overflow-hidden",
        size === "large" ? "min-h-[420px] pt-28 pb-20" : "min-h-[300px] pt-28 pb-16",
        className
      )}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            gradient === "warm"
              ? "linear-gradient(135deg, var(--color-neutral) 0%, var(--color-tertiary) 50%, var(--color-neutral-dark) 100%)"
              : gradient === "cool"
              ? "linear-gradient(135deg, var(--color-neutral-dark) 0%, var(--color-neutral) 60%, var(--color-tertiary) 100%)"
              : "linear-gradient(135deg, var(--color-neutral) 0%, var(--color-neutral-dark) 60%, var(--color-tertiary) 100%)",
        }}
      />
      {/* Dot pattern overlay */}
      <DotPattern
        className="-z-10 opacity-[0.04]"
        dotColor="var(--color-primary)"
        dotSize={1}
        gap={28}
      />
      {/* Decorative arc */}
      <div
        className="absolute bottom-0 inset-x-0 h-16 -z-10"
        style={{
          background: "var(--color-neutral)",
          borderRadius: "100% 100% 0 0 / 40px 40px 0 0",
        }}
      />

      <div className="relative px-6 lg:px-8 max-w-3xl mx-auto">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Fil d'Ariane"
            className="flex items-center justify-center gap-1.5 mb-5 flex-wrap"
          >
            <Link
              href="/"
              className="font-sans text-xs text-text-soft hover:text-primary transition-colors"
            >
              {t("home")}
            </Link>
            {breadcrumbs.map(({ label, href }, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-secondary rtl:rotate-180" aria-hidden />
                {href ? (
                  <Link
                    href={href}
                    className="font-sans text-xs text-text-soft hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                ) : (
                  <span className="font-sans text-xs text-primary font-medium">
                    {label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Title — cinematic blur reveal */}
        <TextEffect
          per="word"
          preset="blur"
          delay={0.1}
          as="h1"
          className={cn(
            "font-serif font-light text-text leading-tight",
            size === "large" ? "text-5xl sm:text-6xl" : "text-4xl sm:text-5xl"
          )}
        >
          {title}
        </TextEffect>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-12 h-px bg-primary mx-auto my-5 origin-center"
        />

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-base sm:text-lg text-text-soft leading-relaxed max-w-xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
