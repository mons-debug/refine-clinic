import type { Metadata } from "next";
import Script from "next/script";
import Hero from "@/components/home/Hero";

import ServicesExplorerSection from "@/components/home/ServicesExplorerSection";
import ZonesExploreSection from "@/components/home/ZonesExploreSection";
import DoctorsSection from "@/components/home/DoctorsSection";
import BeforeAfterSection from "@/components/home/BeforeAfterSection";
import Testimonials from "@/components/home/Testimonials";
import WhyRefine from "@/components/home/WhyRefine";
import InstagramFeed from "@/components/home/InstagramFeed";
import BookingCTA from "@/components/home/BookingCTA";

export const metadata: Metadata = {
  title: "Refine Clinic Tanger | Médecine Esthétique & Chirurgie Plastique",
  description:
    "Refine Clinic à Tanger — la seule clinique alliant chirurgie plastique et médecine esthétique sous le même toit. Dr. Meryem & Dr. Amr. Résultats naturels.",
  openGraph: {
    title: "Refine Clinic Tanger | Médecine Esthétique & Chirurgie Plastique",
    description: "La seule clinique à Tanger alliant chirurgie plastique et médecine esthétique. Dr. Meryem & Dr. Amr.",
    url: "https://refineclinic.ma",
    siteName: "Refine Clinic",
    type: "website",
  },
  alternates: {
    canonical: "https://refineclinic.ma/fr",
    languages: {
      fr: "https://refineclinic.ma/fr",
      ar: "https://refineclinic.ma/ar",
      en: "https://refineclinic.ma/en",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Refine Clinic",
  description: "Clinique de médecine esthétique et chirurgie plastique à Tanger, Maroc",
  url: "https://refineclinic.ma",
  telephone: "+212539942632",
  email: "Contact@refineclinic.ma",
  image: "https://refineclinic.ma/og-image.jpg",
  priceRange: "$$",
  currenciesAccepted: "MAD",
  paymentAccepted: "Cash, Bank Transfer",
  openingHours: "Mo-Sa 09:00-19:00",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Avenue Abi Al Hassan Echadli, Centre Business Salman, 4ème étage, App.16",
    addressLocality: "Tanger",
    addressCountry: "MA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "35.7595",
    longitude: "-5.8340",
  },
  medicalSpecialty: ["PlasticSurgery", "Dermatology"],
  hasMap: "https://maps.google.com/?q=Avenue+Abi+Al+Hassan+Echadli+Tanger+Maroc",
  sameAs: ["https://instagram.com/refineclinic.tanger"],
  member: [
    {
      "@type": "Physician",
      name: "Dr. El Boujadaini Meryem",
      medicalSpecialty: "Aesthetic Medicine",
    },
    {
      "@type": "Physician",
      name: "Dr. Amr Ismail",
      medicalSpecialty: "Plastic Surgery",
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <Script
        id="json-ld-clinic"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <ServicesExplorerSection />
      <ZonesExploreSection />
      <DoctorsSection />
      <BeforeAfterSection />
      <InstagramFeed />
      <Testimonials />
      <WhyRefine />
      <BookingCTA />
    </>
  );
}
