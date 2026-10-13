"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { PILOT_OFFER } from "@/lib/constants";

type Props = {
  open: boolean;
  onClose: () => void;
};

/**
 * İŞLETME BAŞVURU FORMU
 *
 * Eski hâlinde altı alan da zorunluydu (işletme adı, adres, ad soyad, ünvan,
 * mail, mesaj) ve "Mesaj" en az 10 karakter istiyordu — yani başvurmak için
 * ziyaretçinin bir de metin yazması gerekiyordu. Başvuruyu kısaltmak için:
 *
 *   • Zorunlu alanlar 4'e indi: işletme adı, şehir/ilçe, ad soyad, e-posta.
 *   • Ünvan, telefon ve mesaj opsiyonel oldu (API tarafı da gevşetildi).
 *   • Zorunluluk yıldızla ve "* Zorunlu alan" notuyla açıkça belirtiliyor.
 *   • Alanlar kontrollü (controlled) hâle getirildi: otomatik doldurulan
 *     değerler ekranda görünüyor, düzenlenebiliyor ve gönderimden önce
 *     alan bazında doğrulanıyor. Böylece autofill'in doldurduğu hatalı bir
 *     e-posta sessizce gönderilmiyor.
 *   • KVKK onayı eklendi — kişisel veri topluyoruz, iletişim formunda da var.
 *   • Başarı ekranı artık tek satırlık değil; başvurudan sonraki adımları
 *     da söylüyor, böylece ziyaretçi ne beklediğini biliyor.
 */

type FieldKey = "businessName" | "businessAddress" | "fullName" | "email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Sadece rakamları al, en fazla 10 hane; TR cep: 5XX XXX XX XX */
function formatTurkishMobileDisplay(raw: string) {
  const d = raw.replace(/\D/g, "").slice(0, 10);
  if (d.length === 0) return "";
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`;
  if (d.length <= 8) return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
  return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8, 10)}`;
}

const EMPTY = {
  businessName: "",
  businessAddress: "",
  fullName: "",
  title: "",
  email: "",
  phone: "",
  message: "",
};

export default function BusinessLeadModal({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<"idle" | "success" | "error">("idle");
  const [values, setValues] = useState(EMPTY);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<FieldKey | "consent", string>>>({});

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const t = window.setTimeout(() => {
      document.getElementById("bl-businessName")?.focus();
    }, 80);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setFeedback("idle");
      setSubmitting(false);
      setErrors({});
    }
  }, [open]);

  function setField(key: keyof typeof EMPTY, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    // Kullanıcı düzeltmeye başlayınca o alanın hatası hemen kalkar.
    setErrors((e) => (e[key as FieldKey] ? { ...e, [key]: undefined } : e));
  }

  function validate() {
    const next: Partial<Record<FieldKey | "consent", string>> = {};
    if (values.businessName.trim().length < 2) {
      next.businessName = "İşletme adını yazın.";
    }
    if (values.businessAddress.trim().length < 3) {
      next.businessAddress = "İşletmenin bulunduğu şehir ve ilçeyi yazın.";
    }
    if (values.fullName.trim().length < 2) {
      next.fullName = "Adınızı ve soyadınızı yazın.";
    }
    if (!EMAIL_RE.test(values.email.trim())) {
      next.email = "Geçerli bir e-posta adresi girin.";
    }
    if (!consent) {
      next.consent = "Devam etmek için KVKK onayı gerekiyor.";
    }
    setErrors(next);
    return next;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    setFeedback("idle");
    // NOT: `errors` state'ini okumuyoruz — setErrors henüz işlenmemiş olurdu.
    // validate() hata nesnesini doğrudan döndürüyor.
    const found = validate();
    if (Object.keys(found).length > 0) {
      // İlk hatalı alana odaklan — mobilde hatanın nerede olduğu görünmüyordu.
      const firstKey = (
        ["businessName", "businessAddress", "fullName", "email"] as FieldKey[]
      ).find((k) => found[k]);
      if (firstKey) document.getElementById(`bl-${firstKey}`)?.focus();
      return;
    }

    const phoneDigits = values.phone.replace(/\D/g, "");
    const payload = {
      businessName: values.businessName.trim(),
      businessAddress: values.businessAddress.trim(),
      fullName: values.fullName.trim(),
      title: values.title.trim(),
      email: values.email.trim(),
      phone: phoneDigits ? `+90${phoneDigits}` : "",
      message: values.message.trim(),
      kvkkApproved: true,
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/business-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Gönderilemedi");
      }
      setFeedback("success");
      setValues(EMPTY);
      setConsent(false);
    } catch {
      setFeedback("error");
    } finally {
      setSubmitting(false);
    }
  }

  if (!mounted) return null;

  const overlay = (
    <AnimatePresence>
      {open && (
        <motion.div
          key="business-lead-shell"
          className="fixed inset-0 z-[200] flex items-end justify-center p-3 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Arka plan — kapat"
            className="absolute inset-0 bg-trinq-navy-darkest/60 backdrop-blur-[3px]"
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 flex max-h-[min(92vh,880px)] w-full max-w-lg flex-col overflow-hidden rounded-[26px] bg-white shadow-[0_40px_90px_-30px_rgba(8,28,22,0.6)] sm:max-h-[90vh]"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-trinq-line px-5 pb-4 pt-5 sm:px-8">
              <div>
                <h2
                  id={titleId}
                  className="text-lg font-bold tracking-tight text-trinq-navy sm:text-xl"
                >
                  İşletmeni trinQ&apos;ya ekle
                </h2>
                <p className="mt-1 text-[13px] text-trinq-muted">
                  Ücretsiz pilot başvurusu — yaklaşık 2 dakika.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="-mr-1 shrink-0 rounded-full p-2 text-trinq-muted transition hover:bg-trinq-navy-soft hover:text-trinq-navy"
                aria-label="Kapat"
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-8 sm:py-6">
              {feedback === "success" ? (
                <div className="flex flex-col items-center gap-5 py-4 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-trinq-navy-soft text-trinq-navy">
                    <Check size={26} strokeWidth={2.4} />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-trinq-navy">
                      Başvurunuz alındı
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-trinq-muted">
                      Sırada ön görüşme var: verdiğiniz iletişim bilgilerinden size
                      ulaşıp, işletmenize uygun kampanya ve damga kurgusunu birlikte
                      belirliyor, ardından panelinizi açıyoruz. Bu aşamaların
                      hiçbirinde ödeme istenmiyor.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="min-h-[48px] rounded-full bg-trinq-navy px-8 text-sm font-bold text-trinq-cream shadow-[0_14px_32px_-16px_rgba(17,57,46,0.9)] transition-colors hover:bg-trinq-navy-deep"
                  >
                    Tamam
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                  <Field label="İşletme Adı" htmlFor="bl-businessName" required error={errors.businessName}>
                    <input
                      id="bl-businessName"
                      name="businessName"
                      value={values.businessName}
                      onChange={(e) => setField("businessName", e.target.value)}
                      maxLength={200}
                      placeholder="Örn: Kafe Merkez"
                      className={inputClass(errors.businessName)}
                      autoComplete="organization"
                      aria-invalid={Boolean(errors.businessName)}
                    />
                  </Field>

                  <Field
                    label="Şehir / İlçe"
                    htmlFor="bl-businessAddress"
                    required
                    error={errors.businessAddress}
                  >
                    <input
                      id="bl-businessAddress"
                      name="businessAddress"
                      value={values.businessAddress}
                      onChange={(e) => setField("businessAddress", e.target.value)}
                      maxLength={500}
                      placeholder="Örn: İstanbul / Kadıköy"
                      className={inputClass(errors.businessAddress)}
                      autoComplete="address-level2"
                      aria-invalid={Boolean(errors.businessAddress)}
                    />
                  </Field>

                  <Field label="Ad Soyad" htmlFor="bl-fullName" required error={errors.fullName}>
                    <input
                      id="bl-fullName"
                      name="fullName"
                      value={values.fullName}
                      onChange={(e) => setField("fullName", e.target.value)}
                      maxLength={120}
                      placeholder="Adınız Soyadınız"
                      className={inputClass(errors.fullName)}
                      autoComplete="name"
                      aria-invalid={Boolean(errors.fullName)}
                    />
                  </Field>

                  <Field label="E-posta" htmlFor="bl-email" required error={errors.email}>
                    <input
                      id="bl-email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={(e) => setField("email", e.target.value)}
                      maxLength={120}
                      placeholder="ornek@mail.com"
                      className={inputClass(errors.email)}
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                    />
                  </Field>

                  <Field label="Telefon" htmlFor="bl-phone" hint="opsiyonel">
                    <div className="flex gap-2">
                      <span className="flex min-h-[50px] shrink-0 items-center rounded-2xl border border-trinq-line bg-trinq-paper px-4 text-sm font-medium text-trinq-muted">
                        +90
                      </span>
                      <input
                        id="bl-phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        value={values.phone}
                        onChange={(e) => setField("phone", formatTurkishMobileDisplay(e.target.value))}
                        placeholder="5XX XXX XX XX"
                        className={inputClass()}
                        autoComplete="tel-national"
                      />
                    </div>
                  </Field>

                  <Field label="Ünvanınız" htmlFor="bl-title" hint="opsiyonel">
                    <input
                      id="bl-title"
                      name="title"
                      value={values.title}
                      onChange={(e) => setField("title", e.target.value)}
                      maxLength={120}
                      placeholder="Örn: İşletme sahibi"
                      className={inputClass()}
                      autoComplete="organization-title"
                    />
                  </Field>

                  <Field label="Eklemek istediğiniz bir şey" htmlFor="bl-message" hint="opsiyonel">
                    <textarea
                      id="bl-message"
                      name="message"
                      rows={3}
                      value={values.message}
                      onChange={(e) => setField("message", e.target.value)}
                      maxLength={4000}
                      placeholder="Şube sayısı, aklınızdaki kampanya fikri ya da sorularınız…"
                      className={`${inputClass()} min-h-[96px] resize-y`}
                    />
                  </Field>

                  {/* KVKK onayı */}
                  <div className="flex items-start gap-3">
                    <input
                      id="bl-consent"
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        setErrors((prev) =>
                          prev.consent ? { ...prev, consent: undefined } : prev
                        );
                      }}
                      className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer rounded border-trinq-line accent-[#11392e]"
                      aria-invalid={Boolean(errors.consent)}
                    />
                    <label htmlFor="bl-consent" className="cursor-pointer text-xs leading-relaxed text-trinq-muted">
                      <Link
                        href="/kvkk"
                        className="font-semibold text-trinq-navy underline decoration-trinq-gold decoration-2 underline-offset-2 hover:text-trinq-navy-mid"
                      >
                        KVKK Aydınlatma Metni
                      </Link>
                      &apos;ni okudum; başvurumun değerlendirilmesi için iletişim
                      bilgilerimin işlenmesine onay veriyorum.
                    </label>
                  </div>
                  {errors.consent && (
                    <p className="-mt-2 text-xs font-medium text-rose-700">{errors.consent}</p>
                  )}

                  <p className="text-xs text-trinq-muted">
                    <span className="text-rose-600">*</span> Zorunlu alan. Pilot başvurusu
                    için ödeme bilgisi istemiyoruz.
                  </p>

                  {feedback === "error" && (
                    <p className="text-sm font-medium text-rose-700" role="alert">
                      Gönderim sırasında bir hata oluştu. Lütfen tekrar deneyin ya da
                      info@trinqapp.com adresine yazın.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-1 min-h-[52px] w-full rounded-full bg-trinq-navy px-7 text-sm font-bold text-trinq-cream shadow-[0_14px_32px_-16px_rgba(17,57,46,0.9)] transition-colors hover:bg-trinq-navy-deep disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? "Gönderiliyor…" : "Başvuruyu gönder"}
                  </button>

                  <p className="text-center text-xs text-trinq-muted">
                    {PILOT_OFFER.shortNote}
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(overlay, document.body);
}

function Field({
  label,
  htmlFor,
  required = false,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  /** Zorunlu olmayan alanlarda etiketin yanında görünen not */
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="flex items-center gap-1.5 text-sm font-semibold text-trinq-navy">
        {label}
        {required ? (
          <span className="text-rose-600" aria-hidden>
            *
          </span>
        ) : null}
        {hint ? (
          <span className="font-normal text-xs text-trinq-muted">({hint})</span>
        ) : null}
      </label>
      {children}
      {error ? <p className="text-xs font-medium text-rose-700">{error}</p> : null}
    </div>
  );
}

function inputClass(error?: string) {
  return [
    "min-h-[50px] w-full rounded-2xl border bg-trinq-paper px-4 py-2.5 text-base text-trinq-navy outline-none transition placeholder:text-trinq-muted/45 focus:bg-white focus:ring-4 sm:text-sm",
    error
      ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/10"
      : "border-trinq-line focus:border-trinq-navy/40 focus:ring-trinq-navy/8",
  ].join(" ");
}
