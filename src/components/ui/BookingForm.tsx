"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CLINIC } from "@/lib/clinic";
import { useTranslations } from "next-intl";

const TREATMENT_KEYS = [
  "treatment_fillers_lips",
  "treatment_fillers_face",
  "treatment_botox",
  "treatment_threads",
  "treatment_laser",
  "treatment_prp",
  "treatment_meso",
  "treatment_peeling",
  "treatment_cellulite",
  "treatment_body",
  "treatment_lipo",
  "treatment_abdo",
  "treatment_brachio",
  "treatment_thigh",
  "treatment_gyneco",
  "treatment_oto",
  "treatment_blepharo",
  "treatment_mammo",
  "treatment_other",
] as const;

const today = new Date().toISOString().split("T")[0];

const inputClass = (hasError: boolean) =>
  cn(
    "w-full font-sans text-sm px-4 py-3 rounded-xl border bg-neutral outline-none transition-all duration-200",
    "focus:ring-2 focus:ring-primary/20 focus:shadow-[0_0_0_3px_rgba(166,93,70,0.08)]",
    hasError
      ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
      : "border-neutral-dark focus:border-primary"
  );

const labelClass = "block font-sans text-xs font-semibold uppercase tracking-widest text-text-soft mb-2 transition-colors duration-200 group-focus-within:text-primary";

export default function BookingForm() {
  const t = useTranslations("form");
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const schema = z.object({
    name: z.string().min(2, t("nameRequired")),
    phone: z.string().regex(/^(05|06|07)\d{8}$/, t("phoneInvalid")),
    email: z.string().email(t("emailInvalid")),
    treatment: z.string().min(1, t("treatmentRequired")),
    doctor: z.string().min(1, t("doctorRequired")),
    date: z.string().min(1, t("dateRequired")),
    message: z.string().optional(),
  });

  type FormData = z.infer<typeof schema>;

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
        `${t("whatsappMsg")}\n\n${t("name")}: ${data.name}\n${t("phone")}: ${data.phone}\n${t("email")}: ${data.email}\n${t("treatment")}: ${data.treatment}\n${t("doctor")}: ${data.doctor}\n${t("date")}: ${data.date}${data.message ? `\n${t("message")}: ${data.message}` : ""}`
      );
      window.open(`${CLINIC.whatsappLink}?text=${waMsg}`, "_blank");

      setSuccess(true);
      reset();
    } catch {
      setServerError(t("serverError"));
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-14 text-center">
        <CheckCircle className="w-14 h-14 text-primary" aria-hidden />
        <h3 className="font-serif text-2xl font-light text-text">{t("successTitle")}</h3>
        <p className="font-sans text-sm text-text-soft max-w-sm leading-relaxed">
          {t("successDesc")}
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-2 font-sans text-sm font-semibold text-primary hover:underline"
        >
          {t("newRequest")}
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
            {t("name")} <span className="text-primary">*</span>
          </label>
          <input
            {...register("name")}
            type="text"
            autoComplete="name"
            className={inputClass(!!errors.name)}
            placeholder={t("namePlaceholder")}
          />
          {errors.name && <p className="font-sans text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className={labelClass}>
            {t("phone")} <span className="text-primary">*</span>
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
            {t("email")} <span className="text-primary">*</span>
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
            {t("treatment")} <span className="text-primary">*</span>
          </label>
          <select
            {...register("treatment")}
            className={cn(inputClass(!!errors.treatment), "cursor-pointer")}
          >
            <option value="">{t("selectTreatment")}</option>
            {TREATMENT_KEYS.map((key) => (
              <option key={key} value={t(key)}>{t(key)}</option>
            ))}
          </select>
          {errors.treatment && <p className="font-sans text-xs text-red-500 mt-1">{errors.treatment.message}</p>}
        </div>

        {/* Doctor */}
        <div>
          <label className={labelClass}>
            {t("doctor")} <span className="text-primary">*</span>
          </label>
          <select
            {...register("doctor")}
            className={cn(inputClass(!!errors.doctor), "cursor-pointer")}
          >
            <option value="">{t("selectDoctor")}</option>
            <option value={t("doctor_meryem")}>{t("doctor_meryem_option")}</option>
            <option value={t("doctor_amr")}>{t("doctor_amr_option")}</option>
            <option value={t("doctor_none")}>{t("doctor_none_option")}</option>
          </select>
          {errors.doctor && <p className="font-sans text-xs text-red-500 mt-1">{errors.doctor.message}</p>}
        </div>

        {/* Date */}
        <div>
          <label className={labelClass}>
            {t("date")} <span className="text-primary">*</span>
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
            {t("message")} <span className="text-text-soft/50 normal-case tracking-normal font-normal">({t("optional")})</span>
          </label>
          <textarea
            {...register("message")}
            rows={3}
            className={cn(inputClass(false), "resize-none")}
            placeholder={t("messagePlaceholder")}
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
            {t("submitting")}
          </>
        ) : (
          <>
            {t("submit")}
            <Send className="w-4 h-4" aria-hidden />
          </>
        )}
      </button>

      <p className="font-sans text-xs text-center text-text-soft/60 leading-relaxed">
        {t("disclaimer")}
      </p>
    </form>
  );
}
