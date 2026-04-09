import { Link } from "@/lib/navigation";

export default function NotFound() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(160deg, var(--color-neutral) 0%, var(--color-neutral-dark) 55%, var(--color-tertiary) 100%)",
        }}
      />

      <div className="max-w-md mx-auto">
        {/* Large 404 */}
        <p className="font-serif text-[120px] sm:text-[160px] font-light leading-none text-primary/10 select-none mb-2">
          404
        </p>

        {/* Divider */}
        <div className="w-12 h-px bg-primary mx-auto mb-6" />

        {/* Message */}
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-text mb-4">
          Page introuvable
        </h1>
        <p className="font-sans text-base text-text-soft leading-relaxed mb-10 max-w-sm mx-auto">
          Cette page n&apos;existe pas ou a été déplacée. Retournez à l&apos;accueil pour continuer votre visite.
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="inline-flex items-center justify-center font-sans text-sm font-semibold px-8 py-3.5 rounded-full bg-primary text-white hover:bg-primary-dark hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 shadow-brand hover:shadow-brand-md"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}
