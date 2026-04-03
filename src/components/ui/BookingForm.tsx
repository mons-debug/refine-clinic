"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CLINIC } from "@/lib/clinic";

const TREATMENTS = [
  // Dr. Meryem
  "Fillers — lèvres",
  "Fillers — visage / mâchoire",
  "Botox",
  "Thread lift",
  "Épilation laser",
  "PRP",
  "Soin de peau / Mésothérapie",
  "Peeling chimique",
  "Traitement cellulite",
  "Soin corps",
  // Dr. Amr
  "Liposuccion / 4D Lipo",
  "Abdominoplastie (tummy tuck)",
  "Brachioplastie (lifting des bras)",
  "Lifting des cuisses",
  "Gynécomastie",
  "Otoplastie (chirurgie des oreilles)",
  "Blépharoplastie (chirurgie des paupières)",
  "Mammoplastie",
  // Other
  "Autre / Je ne sais pas encore",
];

const today = new Date().toISOString().split("T")[0];

const schema = z.object({
  name: z.string().min(2, "Prénom & Nom requis"),
  phone: z.string().regex(/^(05|06|07)\d{8}$/, "Numéro marocain invalide (ex: 0612345678)"),
  email: z.string().email("Email invalide"),
  treatment: z.string().min(1, "Veuillez sélectionner un soin"),
  doctor: z.string().min(1, "Veuillez indiquer une préférence"),
  date: z.string().min(1, "Veuillez indiquer une date souhaitée"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const inputClass = (hasError: boolean) =>
  cn(
    "w-full font-sans text-sm px-4 py-3 rounded-xl border bg-neutral outline-none transition-colors",
    hasError
      ? "border-red-400 focus:border-red-400"
      : "border-neutral-dark focus:border-primary"
  );

const labelClass = "block font-sans text-xs font-semibold uppercase tracking-widest text-text-soft mb-2";

export default function BookingForm() {
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "booking" }),
      });
      if (!res.ok) throw new Error();

      // Open WhatsApp with pre-filled message
      const waMsg = encodeURIComponent(
        `Bonjour, je souhaite prendre rendez-vous à Refine Clinic.\n\nNom: ${data.name}\nTéléphone: ${data.phone}\nEmail: ${data.email}\nSoin souhaité: ${data.treatment}\nMédecin: ${data.doctor}\nDate souhaitée: ${data.date}${data.message ? `\nMessage: ${data.message}` : ""}`
      );
      window.open(`${CLINIC.whatsappLink}?text=${waMsg}`, "_blank");

      setSuccess(true);
      reset();
    } catch {
      setServerError("Une erreur s'est produite. Veuillez réessayer ou nous contacter via WhatsApp.");
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-14 text-center">
        <CheckCircle className="w-14 h-14 text-primary" aria-hidden />
        <h3 className="font-serif text-2xl font-light text-text">Demande envoyée !</h3>
        <p className="font-sans text-sm text-text-soft max-w-sm leading-relaxed">
          Votre demande a été envoyée avec succès. Nous vous recontactons dans les 24h. Un message WhatsApp a également été ouvert pour vous.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-2 font-sans text-sm font-semibold text-primary hover:underline"
        >
          Envoyer une nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div className="sm:col-span-2">
          <label className={labelClass}>
            Prénom & Nom <span className="text-primary">*</span>
          </label>
          <input
            {...register("name")}
            type="text"
            autoComplete="name"
            className={inputClass(!!errors.name)}
            placeholder="Votre nom complet"
          />
          {errors.name && <p className="font-sans text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className={labelClass}>
            Téléphone <span className="text-primary">*</span>
          </label>
          <input
            {...register("phone")}
            type="tel"
            autoComplete="tel"
            className={inputClass(!!errors.phone)}
            placeholder="0612345678"
          />
          {errors.phone && <p className="font-sans text-xs text-red-500 mt-1">{errors.phone.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>
            Email <span className="text-primary">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            className={inputClass(!!errors.email)}
            placeholder="votre@email.com"
          />
          {errors.email && <p className="font-sans text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        {/* Treatment */}
        <div className="sm:col-span-2">
          <label className={labelClass}>
            Soin souhaité <span className="text-primary">*</span>
          </label>
          <select
            {...register("treatment")}
            className={cn(inputClass(!!errors.treatment), "cursor-pointer")}
          >
            <option value="">Sélectionnez un soin…</option>
            {TREATMENTS.map((tr) => (
              <option key={tr} value={tr}>{tr}</option>
            ))}
          </select>
          {errors.treatment && <p className="font-sans text-xs text-red-500 mt-1">{errors.treatment.message}</p>}
        </div>

        {/* Doctor */}
        <div>
          <label className={labelClass}>
            Médecin préféré <span className="text-primary">*</span>
          </label>
          <select
            {...register("doctor")}
            className={cn(inputClass(!!errors.doctor), "cursor-pointer")}
          >
            <option value="">Choisir…</option>
            <option value="Dr. Meryem (Médecine esthétique)">Dr. Meryem — Médecine esthétique</option>
            <option value="Dr. Amr (Chirurgie plastique)">Dr. Amr — Chirurgie plastique</option>
            <option value="Pas de préférence">Pas de préférence</option>
          </select>
          {errors.doctor && <p className="font-sans text-xs text-red-500 mt-1">{errors.doctor.message}</p>}
        </div>

        {/* Date */}
        <div>
          <label className={labelClass}>
            Date souhaitée <span className="text-primary">*</span>
          </label>
          <input
            {...register("date")}
            type="date"
            min={today}
            className={inputClass(!!errors.date)}
          />
          {errors.date && <p className="font-sans text-xs text-red-500 mt-1">{errors.date.message}</p>}
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label className={labelClass}>
            Message / précisions <span className="text-text-soft/50 normal-case tracking-normal font-normal">(optionnel)</span>
          </label>
          <textarea
            {...register("message")}
            rows={3}
            className={cn(inputClass(false), "resize-none")}
            placeholder="Questions, zones à traiter, précisions…"
          />
        </div>
      </div>

      {serverError && (
        <p className="font-sans text-xs text-red-500">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold px-6 py-4 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors shadow-brand disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
            Envoi en cours…
          </>
        ) : (
          <>
            Envoyer ma demande
            <Send className="w-4 h-4" aria-hidden />
          </>
        )}
      </button>

      <p className="font-sans text-xs text-center text-text-soft/60 leading-relaxed">
        En soumettant ce formulaire, vous acceptez d'être contacté par Refine Clinic. WhatsApp s'ouvrira automatiquement après l'envoi.
      </p>
    </form>
  );
}
