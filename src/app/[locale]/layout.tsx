import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "../../../i18n";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Refine Clinic Tanger | Médecine Esthétique & Chirurgie Plastique",
    template: "%s | Refine Clinic",
  },
  description:
    "Refine Clinic à Tanger — clinique de médecine esthétique et chirurgie plastique. Dr. Meryem (esthétique) & Dr. Amr (chirurgie). Résultats naturels, approche personnalisée.",
  openGraph: {
    title: "Refine Clinic Tanger | Beauty Redefined",
    description:
      "Médecine esthétique & chirurgie plastique à Tanger. Expertise médicale, résultats naturels.",
    url: "https://refineclinic.ma",
    siteName: "Refine Clinic",
    type: "website",
  },
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "fr" | "ar" | "en")) {
    notFound();
  }

  const messages = await getMessages();
  const isRtl = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={`${notoSerif.variable} ${manrope.variable}`}
    >
      <body className="flex flex-col min-h-screen bg-neutral antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
