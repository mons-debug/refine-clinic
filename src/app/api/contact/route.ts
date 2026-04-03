import { NextRequest, NextResponse } from "next/server";
import { CLINIC } from "@/lib/clinic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, name, phone, email, treatment, doctor, date, message } = body;

    // Build email body
    const isBooking = type === "booking";
    const subject = isBooking
      ? `Nouvelle demande de consultation — ${name}`
      : `Nouveau message de contact — ${name}`;

    const textBody = isBooking
      ? `Nouvelle demande de consultation — Refine Clinic\n\nNom: ${name}\nTéléphone: ${phone}\nEmail: ${email}\nSoin souhaité: ${treatment}\nMédecin: ${doctor}\nDate souhaitée: ${date}\nMessage: ${message || "—"}`
      : `Nouveau message de contact — Refine Clinic\n\nNom: ${name}\nTéléphone: ${phone}\nEmail: ${email}\nMessage: ${message}`;

    const htmlBody = isBooking
      ? `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #2B2B2B;">
          <div style="background: #A65D46; padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; font-size: 20px; margin: 0;">Refine Clinic — Nouvelle Consultation</h1>
          </div>
          <div style="background: #F5F0E6; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #EDE7D9;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: 600; width: 160px; color: #5A4E49;">Nom</td><td style="padding: 8px 0;">${name}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: 600; color: #5A4E49;">Téléphone</td><td style="padding: 8px 0;">${phone}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: 600; color: #5A4E49;">Email</td><td style="padding: 8px 0;">${email}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: 600; color: #5A4E49;">Soin souhaité</td><td style="padding: 8px 0;">${treatment}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: 600; color: #5A4E49;">Médecin</td><td style="padding: 8px 0;">${doctor}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: 600; color: #5A4E49;">Date souhaitée</td><td style="padding: 8px 0;">${date}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: 600; color: #5A4E49;">Message</td><td style="padding: 8px 0;">${message || "—"}</td></tr>
            </table>
          </div>
        </div>
      `
      : `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #2B2B2B;">
          <div style="background: #A65D46; padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; font-size: 20px; margin: 0;">Refine Clinic — Message de Contact</h1>
          </div>
          <div style="background: #F5F0E6; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #EDE7D9;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: 600; width: 160px; color: #5A4E49;">Nom</td><td style="padding: 8px 0;">${name}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: 600; color: #5A4E49;">Téléphone</td><td style="padding: 8px 0;">${phone}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: 600; color: #5A4E49;">Email</td><td style="padding: 8px 0;">${email}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: 600; color: #5A4E49;">Message</td><td style="padding: 8px 0;">${message}</td></tr>
            </table>
          </div>
        </div>
      `;

    // Send via Resend if API key is configured
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (RESEND_API_KEY) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Refine Clinic <onboarding@resend.dev>",
          to: [CLINIC.email],
          reply_to: email,
          subject,
          text: textBody,
          html: htmlBody,
        }),
      });

      if (!response.ok) {
        console.error("Resend error:", await response.text());
        // Don't fail — still return success (WhatsApp handles it)
      }
    } else {
      // Log to console in dev
      console.log("[Contact Form]", { subject, textBody });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Contact API]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
