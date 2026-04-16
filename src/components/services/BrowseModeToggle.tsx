import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { LayoutGrid, Compass } from "lucide-react";

export default function BrowseModeToggle({ active }: { active: "services" | "zones" }) {
  const t = useTranslations("browseMode");

  const modes = [
    { key: "services" as const, href: "/services", icon: LayoutGrid, label: t("byService") },
    { key: "zones" as const,    href: "/zones",    icon: Compass,    label: t("byZone") },
  ];

  return (
    <div className="flex items-center justify-center mb-6">
      <div
        className="inline-flex items-center gap-1 p-1 rounded-full"
        style={{
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(16px) saturate(1.3)",
          WebkitBackdropFilter: "blur(16px) saturate(1.3)",
          border: "1px solid rgba(255,255,255,0.55)",
          boxShadow: "0 2px 10px rgba(31,26,20,0.04)",
        }}
      >
        {modes.map((m) => {
          const Icon = m.icon;
          const isActive = active === m.key;
          return (
            <Link
              key={m.key}
              href={m.href}
              className={cn(
                "flex items-center gap-2 px-5 py-2 rounded-full font-sans text-xs font-semibold tracking-[0.08em] uppercase transition-all duration-300",
                isActive
                  ? "text-white shadow-[0_4px_16px_rgba(166,93,70,0.25)]"
                  : "text-text-soft hover:text-text"
              )}
              style={isActive ? { background: "var(--color-primary)" } : undefined}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="w-3.5 h-3.5" />
              {m.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
