"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function BusinessLeadModal({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<"idle" | "success" | "error">("idle");

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
    }
  }, [open]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      businessName: String(fd.get("businessName") ?? "").trim(),
      businessAddress: String(fd.get("businessAddress") ?? "").trim(),
      fullName: String(fd.get("fullName") ?? "").trim(),
      title: String(fd.get("title") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
    };

    setSubmitting(true);
    setFeedback("idle");
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
      form.reset();
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
          className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Arka plan — kapat"
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 flex max-h-[min(92vh,880px)] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-3xl"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 pb-4 pt-5 sm:px-8">
              <h2 id={titleId} className="text-lg font-bold text-slate-800 sm:text-xl">
                İşletme Başvurusu
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                aria-label="Kapat"
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-5 sm:px-8 sm:py-6">
              {feedback === "success" ? (
                <div className="flex flex-col items-center gap-5 py-2">
                  <p className="text-center text-sm leading-relaxed text-slate-600">
                    Başvurunuz alındı. En kısa sürede sizinle iletişime geçeceğiz.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg bg-orange-500 px-8 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-orange-600"
                  >
                    Tamam
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <Field label="İşletme Adı" htmlFor="bl-businessName">
                    <input
                      id="bl-businessName"
                      name="businessName"
                      required
                      maxLength={200}
                      placeholder="Örn: ABC Ltd. Şti."
                      className={inputClass}
                      autoComplete="organization"
                    />
                  </Field>
                  <Field label="İşletme Adresi" htmlFor="bl-businessAddress">
                    <input
                      id="bl-businessAddress"
                      name="businessAddress"
                      required
                      maxLength={500}
                      placeholder="Örn: İstanbul / Kadıköy"
                      className={inputClass}
                      autoComplete="street-address"
                    />
                  </Field>
                  <Field label="Ad Soyad" htmlFor="bl-fullName">
                    <input
                      id="bl-fullName"
                      name="fullName"
                      required
                      maxLength={120}
                      placeholder="Adınız Soyadınız"
                      className={inputClass}
                      autoComplete="name"
                    />
                  </Field>
                  <Field label="Ünvan" htmlFor="bl-title">
                    <input
                      id="bl-title"
                      name="title"
                      required
                      maxLength={120}
                      placeholder="Örn: Genel Müdür"
                      className={inputClass}
                      autoComplete="organization-title"
                    />
                  </Field>
                  <Field label="Telefon" htmlFor="bl-phone">
                    <input
                      id="bl-phone"
                      name="phone"
                      required
                      inputMode="tel"
                      maxLength={20}
                      placeholder="05xx xxx xx xx"
                      className={inputClass}
                      autoComplete="tel"
                    />
                  </Field>
                  <Field label="Mail" htmlFor="bl-email">
                    <input
                      id="bl-email"
                      name="email"
                      type="email"
                      required
                      maxLength={120}
                      placeholder="ornek@mail.com"
                      className={inputClass}
                      autoComplete="email"
                    />
                  </Field>
                  <Field label="Mesaj" htmlFor="bl-message">
                    <textarea
                      id="bl-message"
                      name="message"
                      required
                      rows={5}
                      maxLength={4000}
                      placeholder="Mesajınızı buraya yazınız..."
                      className={`${inputClass} min-h-[140px] resize-y`}
                    />
                  </Field>

                  {feedback === "error" && (
                    <p className="text-sm text-red-600" role="alert">
                      Gönderim sırasında bir hata oluştu. Lütfen tekrar deneyin.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-1 w-full rounded-lg bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:min-w-[140px]"
                  >
                    {submitting ? "Gönderiliyor…" : "Gönder"}
                  </button>
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
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-slate-600">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-400/25";
