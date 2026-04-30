"use client";

import { motion } from "framer-motion";
import { Mail, Zap, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/** Sadece rakamları al, en fazla 10 hane; TR cep: 5XX XXX XX XX */
function formatTurkishMobileDisplay(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 10);
  if (d.length === 0) return "";
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`;
  if (d.length <= 8) return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
  return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8, 10)}`;
}

export default function ContactSection() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; text?: string }>({ type: "idle" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    const cleanFullName = fullName.trim();
    const cleanEmail = email.trim();
    const phoneDigits = phone.replace(/\D/g, "");
    const cleanMessage = message.trim();

    if (!cleanFullName) {
      setStatus({ type: "error", text: "Lütfen ad soyad alanını doldurun." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setStatus({ type: "error", text: "Lütfen geçerli bir e-posta adresi girin." });
      return;
    }
    if (!/^\d{10}$/.test(phoneDigits)) {
      setStatus({ type: "error", text: "Cep telefonu 10 haneli olmalıdır (ör. 5XX XXX XX XX)." });
      return;
    }
    if (cleanMessage.length < 10) {
      setStatus({ type: "error", text: "Mesajınız en az 10 karakter olmalıdır." });
      return;
    }
    if (!consent) {
      setStatus({ type: "error", text: "Lütfen KVKK onayını işaretleyin." });
      return;
    }

    setStatus({ type: "idle" });
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: cleanFullName,
          email: cleanEmail,
          countryCode: "+90",
          phone: phoneDigits,
          message: cleanMessage,
          kvkkApproved: true,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        const reason = res.headers.get("X-Contact-Reason");
        if (reason === "missing_env") {
          throw new Error(
            "Mesaj şu an sistem üzerinden iletilemiyor. Lütfen doğrudan info@trinqapp.com adresine yazın."
          );
        }
        const base = data.error || "Mesaj gönderilirken bir sorun oluştu. Lütfen tekrar deneyin.";
        if (reason === "sendgrid") {
          throw new Error(`${base} Sorun sürerse info@trinqapp.com ile iletişime geçebilirsiniz.`);
        }
        throw new Error(base);
      }

      setStatus({
        type: "success",
        text: "Mesajınız başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.",
      });
      setFullName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setConsent(false);
    } catch (err) {
      setStatus({
        type: "error",
        text: err instanceof Error ? err.message : "Mesaj gönderilirken bir sorun oluştu. Lütfen tekrar deneyin.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-background py-20 sm:py-24 lg:py-28" id="iletisim">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Sol: Başlık + İletişim Bilgileri */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
          >
            <h2 className="text-3xl font-bold text-trinq-navy sm:text-4xl">
              Bizimle İletişime Geçin
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-trinq-muted/90">
              İşletmenizi dijital çağa taşımaya hazır mısınız? Sorularınız, önerileriniz veya demo talepleriniz için bize ulaşın. Ekibimiz size en kısa sürede dönüş yapacaktır.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-trinq-accent/10">
                  <Mail size={20} className="text-trinq-accent" />
                </div>
                <div>
                  <p className="font-semibold text-trinq-navy">E-posta</p>
                  <p className="text-sm text-trinq-muted">info@trinqapp.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-trinq-accent/10">
                  <Zap size={20} className="text-trinq-accent" />
                </div>
                <div>
                  <p className="font-semibold text-trinq-navy">Ücretsiz Demo</p>
                  <p className="text-sm text-trinq-muted">Sistemi 14 gün boyunca ücretsiz deneyin</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sağ: İletişim Formu */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
          >
            <div className="rounded-[24px] border border-slate-100 bg-[#FAFBFC] p-8 shadow-sm sm:p-10">
              <h3 className="mb-2 text-xl font-bold text-trinq-navy">Bize Ulaşın</h3>
              <p className="mb-8 text-sm text-trinq-muted/80">
                Sorularınız için aşağıdaki formu doldurabilirsiniz.
              </p>

              <form className="space-y-5" onSubmit={onSubmit} noValidate>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-trinq-navy" htmlFor="contact-name">
                    Adınız Soyadınız
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Ahmet Yılmaz"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-trinq-navy outline-none transition-all focus:border-trinq-accent focus:ring-4 focus:ring-trinq-accent/10"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-trinq-navy" htmlFor="contact-email">
                    E-posta Adresiniz
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="ornek@sirket.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-trinq-navy outline-none transition-all focus:border-trinq-accent focus:ring-4 focus:ring-trinq-accent/10"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-trinq-navy" htmlFor="contact-phone">
                    Cep Telefonu
                  </label>
                  <div className="flex gap-2">
                    <span className="flex items-center rounded-xl border border-gray-200 bg-white px-3 text-sm text-trinq-muted">
                      +90
                    </span>
                    <input
                      id="contact-phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      placeholder="5XX XXX XX XX"
                      value={phone}
                      onChange={(e) => setPhone(formatTurkishMobileDisplay(e.target.value))}
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-trinq-navy outline-none transition-all focus:border-trinq-accent focus:ring-4 focus:ring-trinq-accent/10"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-trinq-navy" htmlFor="contact-message">
                    Mesajınız
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Mesajınızı buraya yazın..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-trinq-navy outline-none transition-all focus:border-trinq-accent focus:ring-4 focus:ring-trinq-accent/10"
                  />
                </div>
                <div className="flex items-start gap-2">
                  <input
                    id="kvkk-consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-trinq-accent focus:ring-trinq-accent"
                  />
                  <label htmlFor="kvkk-consent" className="text-xs leading-relaxed text-trinq-muted">
                    <Link href="/kvkk" className="font-semibold text-trinq-accent hover:underline">
                      Kişisel Verilerin Korunması Politikası
                    </Link>
                    &apos;nı okudum ve kişisel verilerimin işlenmesine onay veriyorum.
                  </label>
                </div>
                {status.type !== "idle" && (
                  <div
                    className={`rounded-xl px-4 py-3 text-sm ${
                      status.type === "success"
                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                        : "bg-rose-50 text-rose-700 ring-1 ring-rose-200"
                    }`}
                    role="status"
                    aria-live="polite"
                  >
                    {status.text}
                  </div>
                )}
                <motion.button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-trinq-accent py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-trinq-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {submitting ? "Gönderiliyor..." : "Gönder"} <Send size={16} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
