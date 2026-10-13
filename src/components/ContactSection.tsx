"use client";

import { motion } from "framer-motion";
import { Mail, Zap, Send, Instagram } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Section } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { useBusinessLeadModal } from "@/context/BusinessLeadModalContext";
import { CONTACT_EMAIL, INSTAGRAM_URL, PILOT_OFFER } from "@/lib/constants";

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
  const { openBusinessLeadModal } = useBusinessLeadModal();
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

      const data = (await res.json().catch(() => ({}))) as { error?: string; dryRun?: boolean };

      if (data.dryRun) {
        setStatus({
          type: "success",
          text: "Deneme modu: e-posta gönderilmedi (CONTACT_DRY_RUN=1). Form doğrulaması tamam.",
        });
        setFullName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setConsent(false);
        return;
      }

      if (!res.ok) {
        const reason = res.headers.get("X-Contact-Reason");
        if (reason === "missing_env") {
          throw new Error(
            "Mesaj şu an sistem üzerinden iletilemiyor. Lütfen doğrudan info@trinqapp.com adresine yazın."
          );
        }
        if (reason === "sendgrid_auth") {
          throw new Error(
            data.error || "E-posta servisi ayarı doğrulanamadı. Lütfen doğrudan info@trinqapp.com adresine yazın."
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

  const inputClass =
    "min-h-[52px] w-full rounded-2xl border border-trinq-line bg-white px-4 py-3 text-base text-trinq-navy outline-none transition-all placeholder:text-trinq-muted/45 focus:border-trinq-navy/40 focus:ring-4 focus:ring-trinq-navy/8";

  return (
    <Section id="iletisim" tone="light">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Sol: Başlık + İletişim Bilgileri */}
        <Reveal variant="up">
          <span className="t-eyebrow inline-flex items-center gap-2 text-trinq-navy-mid">
            <span aria-hidden className="h-px w-6 bg-trinq-navy-mid/40" />
            İletişim
          </span>
          <h2 className="t-h2 mt-4 text-trinq-navy">
            Önce konuşalım
            <span className="t-serif text-trinq-navy-mid"> mı?</span>
          </h2>
          <p className="t-lead mt-5 max-w-md text-trinq-muted">
            Başvurmadan önce sormak istediğiniz bir şey varsa yazın. Pilot koşulları,
            kurulum ya da kampanya kurgusu — hepsini konuşabiliriz.
          </p>

          <div className="mt-9 space-y-4">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="card card-hover flex items-center gap-4 p-4 sm:p-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-trinq-navy-soft text-trinq-navy">
                <Mail size={19} strokeWidth={1.9} />
              </span>
              <span>
                <span className="block text-sm font-bold text-trinq-navy">E-posta</span>
                <span className="block text-sm text-trinq-muted [overflow-wrap:anywhere]">
                  {CONTACT_EMAIL}
                </span>
              </span>
            </a>

            {/*
              Eskiden burada "Ücretsiz deneme — 14 gün" yazıyordu, fiyatlandırma
              bölümü ise "6 ay ücretsiz" diyordu. Artık tek teklif var ve metni
              PILOT_OFFER'dan geliyor (bkz. lib/constants.ts).
            */}
            <Link href="/#pilot" className="card card-hover flex items-center gap-4 p-4 sm:p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-trinq-navy-soft text-trinq-navy">
                <Zap size={19} strokeWidth={1.9} />
              </span>
              <span>
                <span className="block text-sm font-bold text-trinq-navy">Ücretsiz pilot</span>
                <span className="block text-sm text-trinq-muted">
                  {PILOT_OFFER.shortNote} Koşulları gör →
                </span>
              </span>
            </Link>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-hover flex items-center gap-4 p-4 sm:p-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-trinq-navy-soft text-trinq-navy">
                <Instagram size={19} strokeWidth={1.9} />
              </span>
              <span>
                <span className="block text-sm font-bold text-trinq-navy">Instagram</span>
                <span className="block text-sm text-trinq-muted">@trinqapptr</span>
              </span>
            </a>
          </div>
        </Reveal>

        {/* Sağ: İletişim Formu */}
        <Reveal variant="up" delay={0.08}>
          <div className="rounded-[26px] border border-trinq-line bg-trinq-paper p-5 shadow-[var(--shadow-sm)] sm:p-8 lg:p-10">
            <h3 className="text-xl font-bold tracking-tight text-trinq-navy">Soru sorun</h3>
            {/*
              İki form aynı sayfada duruyor (bu ve işletme başvuru modalı).
              Hangisinin ne işe yaradığı yazılmazsa ziyaretçi başvurmak için
              burayı doldurup bekliyordu — bu yüzden ayrım net belirtiliyor.
            */}
            <p className="mb-7 mt-1.5 text-sm text-trinq-muted">
              Pilot başvurusu için{" "}
              <button
                type="button"
                onClick={openBusinessLeadModal}
                className="font-semibold text-trinq-navy underline decoration-trinq-gold decoration-2 underline-offset-2 transition-colors hover:text-trinq-navy-mid"
              >
                işletme başvuru formunu
              </button>{" "}
              kullanabilirsiniz. Diğer tüm sorularınız için burayı doldurun.
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
                    className={inputClass}
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
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-trinq-navy" htmlFor="contact-phone">
                    Cep Telefonu
                  </label>
                  <div className="flex gap-2">
                    <span className="flex min-h-[52px] shrink-0 items-center rounded-2xl border border-trinq-line bg-white px-4 text-sm font-medium text-trinq-muted">
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
                      className={inputClass}
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
                    className={`${inputClass} min-h-[132px] resize-none`}
                  />
                </div>
                <div className="flex items-start gap-3">
                  <input
                    id="kvkk-consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer rounded border-trinq-line text-trinq-navy accent-[#11392e]"
                  />
                  <label htmlFor="kvkk-consent" className="cursor-pointer text-xs leading-relaxed text-trinq-muted">
                    <Link href="/kvkk" className="font-semibold text-trinq-navy underline decoration-trinq-gold decoration-2 underline-offset-2 hover:text-trinq-navy-mid">
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
                  className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-trinq-navy text-[15px] font-bold text-trinq-cream shadow-[0_16px_40px_-20px_rgba(17,57,46,0.9)] transition-colors hover:bg-trinq-navy-deep disabled:cursor-not-allowed disabled:opacity-60"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {submitting ? "Gönderiliyor..." : "Gönder"} <Send size={16} />
                </motion.button>
            </form>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
