import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import sgMail from "@sendgrid/mail";

/**
 * Başvuru formu kısaltıldı: ÜNVAN, TELEFON ve MESAJ artık opsiyonel.
 *
 * Eskiden altı alan da zorunluydu ve `message` en az 10 karakter istiyordu —
 * yani başvurmak için ziyaretçinin ayrıca bir metin yazması gerekiyordu.
 * Zorunlu alanlar işletme adı, şehir/ilçe, ad soyad ve e-posta ile sınırlı.
 *
 * Prisma'da `title` ve `message` NOT NULL olduğu için boş gelenler "" olarak
 * yazılıyor (şema değişikliği/migration gerektirmez).
 */
const bodySchema = z.object({
  businessName: z.string().trim().min(2).max(200),
  businessAddress: z.string().trim().min(3).max(500),
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(120),
  title: z.string().trim().max(120).optional().default(""),
  phone: z.string().trim().max(32).optional().default(""),
  message: z.string().trim().max(4000).optional().default(""),
});

function cleanSingleLine(input: string) {
  return input
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanMultiline(input: string) {
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim();
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek gövdesi." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Alanları kontrol edin.", issues: parsed.error.flatten() }, { status: 400 });
  }

  try {
    await prisma.businessLead.create({
      data: {
        ...parsed.data,
        phone: parsed.data.phone || null,
      },
    });
  } catch {
    return NextResponse.json({ error: "Kayıt sırasında hata oluştu." }, { status: 500 });
  }

  const sendGridKey = process.env.SENDGRID_API_KEY;
  const to = process.env.CONTACT_RECEIVER_EMAIL || "info@trinqapp.com";
  const from = process.env.CONTACT_SENDER_EMAIL;

  if (!sendGridKey || !from) {
    console.error("[business-lead] Missing SENDGRID_API_KEY or CONTACT_SENDER_EMAIL");
    return NextResponse.json({ error: "Başvuru alındı ancak e-posta gönderilemedi." }, { status: 500 });
  }

  const safe = {
    businessName: cleanSingleLine(parsed.data.businessName),
    businessAddress: cleanSingleLine(parsed.data.businessAddress),
    fullName: cleanSingleLine(parsed.data.fullName),
    title: cleanSingleLine(parsed.data.title),
    phone: cleanSingleLine(parsed.data.phone),
    email: cleanSingleLine(parsed.data.email),
    message: cleanMultiline(parsed.data.message),
  };

  /** Opsiyonel alanlar boşken e-postada "Ünvan: " gibi boş satır bırakmasın. */
  const EMPTY_LABEL = "—";

  const text = [
    "Yeni işletme başvurusu (ücretsiz pilot):",
    "",
    `İşletme Adı: ${safe.businessName}`,
    `Şehir / İlçe: ${safe.businessAddress}`,
    `Ad Soyad: ${safe.fullName}`,
    `Ünvan: ${safe.title || EMPTY_LABEL}`,
    `E-posta: ${safe.email}`,
    `Telefon: ${safe.phone || EMPTY_LABEL}`,
    "",
    "Mesaj:",
    safe.message || EMPTY_LABEL,
  ].join("\n");

  const html = `
    <h2>Yeni İşletme Başvurusu (ücretsiz pilot)</h2>
    <p><strong>İşletme Adı:</strong> ${escapeHtml(safe.businessName)}</p>
    <p><strong>Şehir / İlçe:</strong> ${escapeHtml(safe.businessAddress)}</p>
    <p><strong>Ad Soyad:</strong> ${escapeHtml(safe.fullName)}</p>
    <p><strong>Ünvan:</strong> ${escapeHtml(safe.title) || EMPTY_LABEL}</p>
    <p><strong>E-posta:</strong> ${escapeHtml(safe.email)}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(safe.phone) || EMPTY_LABEL}</p>
    <p><strong>Mesaj:</strong></p>
    <p>${escapeHtml(safe.message).replace(/\r\n|\n|\r/g, "<br/>") || EMPTY_LABEL}</p>
  `;

  try {
    sgMail.setApiKey(sendGridKey);
    await sgMail.send({
      to,
      from,
      replyTo: safe.email,
      subject: "Yeni İşletme Başvurusu",
      text,
      html,
    });
  } catch (err) {
    console.error("SENDGRID BUSINESS LEAD ERROR:", err);
    return NextResponse.json({ error: "Başvuru alındı ancak e-posta gönderilemedi." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
