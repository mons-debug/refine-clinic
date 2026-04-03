import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  className,
  size = "default",
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
            "linear-gradient(135deg, var(--color-neutral) 0%, var(--color-neutral-dark) 60%, var(--color-tertiary) 100%)",
        }}
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

        {/* Title */}
        <h1
          className={cn(
            "font-serif font-light text-text leading-tight",
            size === "large" ? "text-5xl sm:text-6xl" : "text-4xl sm:text-5xl"
          )}
        >
          {title}
        </h1>

        {/* Divider */}
        <div className="w-12 h-px bg-primary mx-auto my-5" />

        {/* Subtitle */}
        {subtitle && (
          <p className="font-sans text-base sm:text-lg text-text-soft leading-relaxed max-w-xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
