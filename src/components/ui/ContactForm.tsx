"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Prénom & Nom requis"),
  phone: z.string().regex(/^(05|06|07)\d{8}$/, "Numéro marocain invalide (ex: 0612345678)"),
  email: z.string().email("Email invalide"),
  message: z.string().min(5, "Message requis"),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "contact" }),
      });
      if (!res.ok) throw new Error();
      setSuccess(true);
      reset();
    } catch {
      setServerError("Une erreur s'est produite. Veuillez réessayer.");
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <CheckCircle className="w-12 h-12 text-primary" aria-hidden />
        <h3 className="font-serif text-xl font-light text-text">Message envoyé !</h3>
        <p className="font-sans text-sm text-text-soft max-w-xs leading-relaxed">
          Merci pour votre message. Notre équipe vous répondra dans les 24h.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="font-sans text-sm text-primary hover:underline"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Name */}
      <div>
        <label className="block font-sans text-xs font-semibold uppercase tracking-widest text-text-soft mb-2">
          Prénom & Nom <span className="text-primary">*</span>
        </label>
        <input
          {...register("name")}
          type="text"
          autoComplete="name"
          className={cn(
            "w-full font-sans text-sm px-4 py-3 rounded-xl border bg-neutral outline-none transition-colors",
            errors.name
              ? "border-red-400 focus:border-red-400"
              : "border-neutral-dark focus:border-primary"
          )}
          placeholder="Votre nom complet"
        />
        {errors.name && (
          <p className="font-sans text-xs text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block font-sans text-xs font-semibold uppercase tracking-widest text-text-soft mb-2">
          Téléphone <span className="text-primary">*</span>
        </label>
        <input
          {...register("phone")}
          type="tel"
          autoComplete="tel"
          className={cn(
            "w-full font-sans text-sm px-4 py-3 rounded-xl border bg-neutral outline-none transition-colors",
            errors.phone
              ? "border-red-400 focus:border-red-400"
              : "border-neutral-dark focus:border-primary"
          )}
          placeholder="0612345678"
        />
        {errors.phone && (
          <p className="font-sans text-xs text-red-500 mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block font-sans text-xs font-semibold uppercase tracking-widest text-text-soft mb-2">
          Email <span className="text-primary">*</span>
        </label>
        <input
          {...register("email")}
          type="email"
          autoComplete="email"
          className={cn(
            "w-full font-sans text-sm px-4 py-3 rounded-xl border bg-neutral outline-none transition-colors",
            errors.email
              ? "border-red-400 focus:border-red-400"
              : "border-neutral-dark focus:border-primary"
          )}
          placeholder="votre@email.com"
        />
        {errors.email && (
          <p className="font-sans text-xs text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="block font-sans text-xs font-semibold uppercase tracking-widest text-text-soft mb-2">
          Message <span className="text-primary">*</span>
        </label>
        <textarea
          {...register("message")}
          rows={4}
          className={cn(
            "w-full font-sans text-sm px-4 py-3 rounded-xl border bg-neutral outline-none transition-colors resize-none",
            errors.message
              ? "border-red-400 focus:border-red-400"
              : "border-neutral-dark focus:border-primary"
          )}
          placeholder="Comment pouvons-nous vous aider ?"
        />
        {errors.message && (
          <p className="font-sans text-xs text-red-500 mt-1">{errors.message.message}</p>
        )}
      </div>

      {serverError && (
        <p className="font-sans text-xs text-red-500">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold px-6 py-3.5 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors shadow-brand disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
            Envoi en cours…
          </>
        ) : (
          <>
            Envoyer le message
            <Send className="w-4 h-4" aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}
