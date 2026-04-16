import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "aside";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export default function GlassCard({
  children,
  className,
  as: Tag = "div",
  hover = false,
  padding = "md",
}: GlassCardProps) {
  return (
    <Tag
      className={cn(
        "rounded-2xl border border-white/50 bg-white/55 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.04)]",
        hover && "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(166,93,70,0.1)] hover:border-white/70",
        padding === "sm" && "p-4",
        padding === "md" && "p-6",
        padding === "lg" && "p-8",
        padding === "none" && "",
        className
      )}
    >
      {children}
    </Tag>
  );
}
