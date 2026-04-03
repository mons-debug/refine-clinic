"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, usePathname, useRouter } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import BorderTrail from "@/components/ui/BorderTrail";

const LOCALES = ["fr", "ar", "en"] as const;
type Locale = (typeof LOCALES)[number];

interface NavLink {
  href: string;
  labelKey: string;
}

const NAV_LINKS: NavLink[] = [
  { href: "/", labelKey: "nav.home" },
  { href: "/services", labelKey: "nav.services" },
  { href: "/doctors", labelKey: "nav.doctors" },
  { href: "/avant-apres", labelKey: "nav.beforeAfter" },
  { href: "/a-propos", labelKey: "nav.about" },
  { href: "/contact", labelKey: "nav.contact" },
];

export default function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 48);
      // Hide navbar when scrolling down past 200px, reveal on scroll up
      if (y > 200 && y > lastY) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function switchLocale(next: Locale) {
    router.replace(pathname, { locale: next });
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm"
            : "bg-transparent",
          hidden && !menuOpen
            ? "-translate-y-full"
            : "translate-y-0"
        )}
      >
        <div
          className="mx-auto flex items-center justify-between px-6 lg:px-8"
          style={{ maxWidth: "var(--max-content)", height: "80px" }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center"
            aria-label="Refine Clinic — Accueil"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-full.svg"
              alt="Refine Clinic"
              className="h-12 sm:h-14 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Navigation principale">
            {NAV_LINKS.map(({ href, labelKey }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "font-sans text-sm font-medium transition-colors duration-200 relative group",
                  scrolled ? "text-text" : "text-text",
                  pathname === href ? "text-primary" : "hover:text-primary"
                )}
              >
                {t(labelKey as Parameters<typeof t>[0])}
                <span
                  className={cn(
                    "absolute -bottom-0.5 start-0 h-px bg-primary transition-all duration-200",
                    pathname === href ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop right: locale switcher + CTA */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Locale switcher */}
            <div className="flex items-center gap-1 font-sans text-xs font-semibold">
              {LOCALES.map((loc, i) => (
                <span key={loc} className="flex items-center">
                  <button
                    onClick={() => switchLocale(loc)}
                    aria-label={`Changer la langue en ${loc.toUpperCase()}`}
                    className={cn(
                      "px-1.5 py-0.5 rounded transition-colors duration-150 uppercase tracking-widest",
                      locale === loc
                        ? "text-primary font-bold"
                        : "text-text-soft hover:text-primary"
                    )}
                  >
                    {loc}
                  </button>
                  {i < LOCALES.length - 1 && (
                    <span className="text-tertiary">|</span>
                  )}
                </span>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/consultation"
              className="relative font-sans text-sm font-semibold px-5 py-2.5 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors duration-200 shadow-sm overflow-hidden"
            >
              <BorderTrail
                size={30}
                className="bg-gradient-to-r from-white/0 via-white/60 to-white/0"
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              />
              {t("nav.book")}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
            className="lg:hidden p-2 text-text hover:text-primary transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-text/95 backdrop-blur-sm flex flex-col"
          >
            {/* Close button */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Fermer le menu"
                className="p-2 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col items-center justify-center flex-1 gap-8">
              {NAV_LINKS.map(({ href, labelKey }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 + 0.1 }}
                >
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "font-serif text-2xl font-light tracking-wide transition-colors",
                      pathname === href
                        ? "text-primary"
                        : "text-white hover:text-tertiary"
                    )}
                  >
                    {t(labelKey as Parameters<typeof t>[0])}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.06 + 0.1 }}
                className="mt-4"
              >
                <Link
                  href="/consultation"
                  onClick={() => setMenuOpen(false)}
                  className="font-sans text-sm font-semibold px-8 py-3 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors"
                >
                  {t("nav.book")}
                </Link>
              </motion.div>

              {/* Mobile locale switcher */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-3 mt-2"
              >
                {LOCALES.map((loc, i) => (
                  <span key={loc} className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        switchLocale(loc);
                        setMenuOpen(false);
                      }}
                      className={cn(
                        "font-sans text-sm uppercase tracking-widest transition-colors",
                        locale === loc
                          ? "text-primary font-bold"
                          : "text-white/50 hover:text-white"
                      )}
                    >
                      {loc}
                    </button>
                    {i < LOCALES.length - 1 && (
                      <span className="text-white/20">|</span>
                    )}
                  </span>
                ))}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
