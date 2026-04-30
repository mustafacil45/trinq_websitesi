import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { z } from "zod";

/** SendGrid Node SDK; Edge’de çalışmaz */
export const runtime = "nodejs";

const bodySchema = z.object({
  fullName: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(120),
  countryCode: z.string().trim().min(1).max(10),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "Telefon 10 haneli olmalıdır."),
  message: z.string().trim().min(10).max(4000),
  kvkkApproved: z.boolean(),
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

/** 10 hane → "5XX XXX XX XX" (görüntü / e-posta için) */
function formatTrMobile10(d: string) {
  return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8, 10)}`;
}

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;

function getClientIp(req: Request) {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

/** Host başlığından portu at (örn. :443) */
function hostOnly(host: string | null): string | null {
  if (!host) return null;
  return host.split(":")[0].toLowerCase();
}

/** example.com ile www.example.com aynı site sayılır (canlıda 403/500 karışmasın) */
function hostsMatch(a: string, b: string): boolean {
  if (a === b) return true;
  const strip = (h: string) => h.replace(/^www\./, "");
  return strip(a) === strip(b);
}

function sameOriginAllowed(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  const requestHost = hostOnly(req.headers.get("host"));
  if (!requestHost) return false;
  try {
    const originHost = hostOnly(new URL(origin).hostname);
    if (!originHost) return false;
    return hostsMatch(originHost, requestHost);
  } catch {
    return false;
  }
}

function corsHeaders(req: Request) {
  const origin = req.headers.get("origin");
  const requestHost = hostOnly(req.headers.get("host"));
  const headers = new Headers();
  if (!origin || !requestHost) return headers;
  try {
    const originHost = hostOnly(new URL(origin).hostname);
    if (!originHost || !hostsMatch(originHost, requestHost)) return headers;
  } catch {
    return headers;
  }

  headers.set("Access-Control-Allow-Origin", origin);
  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  headers.set("Vary", "Origin");
  return headers;
}

export async function OPTIONS(req: Request) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req) });
}

export async function POST(req: Request) {
  if (!sameOriginAllowed(req)) {
    return NextResponse.json({ error: "Yetkisiz istek." }, { status: 403, headers: corsHeaders(req) });
  }

  const ip = getClientIp(req);
  const now = Date.now();
  const current = buckets.get(ip);
  if (!current || current.resetAt <= now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    current.count += 1;
    if (current.count > MAX_PER_WINDOW) {
      return NextResponse.json(
        { error: "Çok fazla istek. Lütfen biraz sonra tekrar deneyin." },
        { status: 429, headers: corsHeaders(req) }
      );
    }
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek gövdesi." }, { status: 400, headers: corsHeaders(req) });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Alanları kontrol edin." }, { status: 400, headers: corsHeaders(req) });
  }

  const safe = {
    fullName: cleanSingleLine(parsed.data.fullName),
    email: cleanSingleLine(parsed.data.email),
    countryCode: cleanSingleLine(parsed.data.countryCode),
    phone: cleanSingleLine(parsed.data.phone),
    message: cleanMultiline(parsed.data.message),
    kvkkApproved: parsed.data.kvkkApproved,
  };

  if (!safe.kvkkApproved) {
    return NextResponse.json(
      { error: "Lütfen KVKK onayını işaretleyin." },
      { status: 400, headers: corsHeaders(req) }
    );
  }

  const sendGridKey = process.env.SENDGRID_API_KEY?.trim();
  const to = process.env.CONTACT_RECEIVER_EMAIL?.trim();
  const from = process.env.CONTACT_SENDER_EMAIL?.trim();

  if (!sendGridKey || !to || !from) {
    const missing = [
      !sendGridKey && "SENDGRID_API_KEY",
      !to && "CONTACT_RECEIVER_EMAIL",
      !from && "CONTACT_SENDER_EMAIL",
    ].filter(Boolean);
    console.error("[contact] Missing env (Production’da Vercel → Settings → Environment Variables):", missing.join(", "));
    return NextResponse.json(
      { error: "Mesaj gönderilirken bir sorun oluştu. Lütfen tekrar deneyin." },
      { status: 500, headers: corsHeaders(req) }
    );
  }

  const phoneDisplay = `${safe.countryCode} ${formatTrMobile10(safe.phone)}`;

  const text = [
    "Yeni iletişim formu mesajı:",
    "",
    `Ad Soyad: ${safe.fullName}`,
    `E-posta: ${safe.email}`,
    `Telefon: ${phoneDisplay}`,
    "",
    "Mesaj:",
    safe.message,
    "",
    "KVKK Onayı: Evet",
  ].join("\n");

  const html = `
        <h2>Yeni TrinQ İletişim Formu Mesajı</h2>
        <p><strong>Ad Soyad:</strong> ${escapeHtml(safe.fullName)}</p>
        <p><strong>E-posta:</strong> ${escapeHtml(safe.email)}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(phoneDisplay)}</p>
        <p><strong>Mesaj:</strong></p>
        <p>${escapeHtml(safe.message).replace(/\r\n|\n|\r/g, "<br/>")}</p>
        <p><strong>KVKK Onayı:</strong> Evet</p>
      `;

  try {
    sgMail.setApiKey(sendGridKey);

    await sgMail.send({
      to,
      from,
      replyTo: safe.email,
      subject: "Yeni TrinQ İletişim Formu Mesajı",
      text,
      html,
    });
  } catch (err: unknown) {
    const sg = err as { response?: { body?: unknown }; message?: string };
    console.error(
      "[contact] SendGrid:",
      JSON.stringify(sg?.response?.body ?? null),
      sg?.message ?? err
    );
    return NextResponse.json(
      { error: "Mesaj gönderilirken bir sorun oluştu. Lütfen tekrar deneyin." },
      { status: 500, headers: corsHeaders(req) }
    );
  }

  return NextResponse.json({ ok: true, success: true }, { headers: corsHeaders(req) });
}
