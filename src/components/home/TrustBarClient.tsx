"use client";

import AnimatedGroup from "@/components/ui/AnimatedGroup";

export default function TrustBarClient({ children }: { children: React.ReactNode }) {
  return (
    <AnimatedGroup
      preset="fade"
      className="grid grid-cols-2 lg:grid-cols-4 gap-8"
    >
      {children}
    </AnimatedGroup>
  );
}
