import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
import { CLINIC } from "@/lib/clinic";

export default function Footer() {
  const t = useTranslations();

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/services", label: t("nav.services") },
    { href: "/doctors", label: t("nav.doctors") },
    { href: "/avant-apres", label: t("nav.beforeAfter") },
    { href: "/a-propos", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const serviceLinks = [
    { href: "/services/epilation-laser", label: t("services.laser.name") },
    { href: "/services/soin-visage", label: t("services.face.name") },
    { href: "/services/peeling-chimique", label: t("services.peeling.name") },
    { href: "/services/mesotherapie", label: t("services.meso.name") },
    {
      href: "/services/traitement-cellulite",
      label: t("services.cellulite.name"),
    },
    { href: "/services/soin-corps", label: t("services.body.name") },
  ];

  return (
    <footer className="bg-text text-white/80">
      <div
        className="mx-auto px-6 lg:px-8 pt-16 pb-8"
        style={{ maxWidth: "var(--max-content)" }}
      >
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-4">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo-full.svg"
                alt="Refine Clinic"
                className="h-14 w-auto brightness-0 invert opacity-90"
              />
            </div>
            <p className="font-sans text-sm leading-relaxed text-white/60 max-w-[220px]">
              {CLINIC.address.city}, {CLINIC.address.country}
            </p>
            <a
              href={CLINIC.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Refine Clinic"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-tertiary transition-colors group"
            >
              <InstagramIcon className="w-4 h-4 group-hover:text-primary transition-colors" />
              {CLINIC.instagram}
            </a>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-white mb-5">
              {t("footer.nav_title")}
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-sans text-sm text-white/60 hover:text-tertiary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-white mb-5">
              {t("footer.services_title")}
            </p>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-sans text-sm text-white/60 hover:text-tertiary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-white mb-5">
              {t("footer.contact_title")}
            </p>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="font-sans text-sm text-white/60 leading-relaxed">
                  {CLINIC.address.full}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <a
                    href={`tel:${CLINIC.phone1.replace(/\s/g, "")}`}
                    className="font-sans text-sm text-white/60 hover:text-tertiary transition-colors"
                  >
                    {CLINIC.phone1}
                  </a>
                  <a
                    href={`tel:${CLINIC.phone2.replace(/\s/g, "")}`}
                    className="font-sans text-sm text-white/60 hover:text-tertiary transition-colors"
                  >
                    {CLINIC.phone2}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a
                  href={`mailto:${CLINIC.email}`}
                  className="font-sans text-sm text-white/60 hover:text-tertiary transition-colors"
                >
                  {CLINIC.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="font-sans text-sm text-white/60">
                  {CLINIC.hours}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8">
          <p className="font-sans text-xs text-white/40">
            {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/mentions-legales"
              className="font-sans text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              {t("footer.privacy")}
            </Link>
            <Link
              href="/mentions-legales"
              className="font-sans text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
