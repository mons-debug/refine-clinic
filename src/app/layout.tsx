import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Refine Clinic",
  description: "Médecine esthétique & Chirurgie plastique à Tanger",
};

// Root layout — locale layout in [locale]/layout.tsx handles lang/dir/fonts
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
