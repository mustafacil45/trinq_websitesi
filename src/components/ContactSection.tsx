"use client";

import { motion } from "framer-motion";
import { Phone, Mail, Zap, Send } from "lucide-react";
import Link from "next/link";

export default function ContactSection() {
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
                  <Phone size={20} className="text-trinq-accent" />
                </div>
                <div>
                  <p className="font-semibold text-trinq-navy">Telefon</p>
                  <p className="text-sm text-trinq-muted">0850 307 43 80</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-trinq-accent/10">
                  <Mail size={20} className="text-trinq-accent" />
                </div>
                <div>
                  <p className="font-semibold text-trinq-navy">E-posta</p>
                  <p className="text-sm text-trinq-muted">info@trinq.app</p>
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

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-trinq-navy" htmlFor="contact-name">
                    Adınız Soyadınız
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Ahmet Yılmaz"
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
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-trinq-navy outline-none transition-all focus:border-trinq-accent focus:ring-4 focus:ring-trinq-accent/10"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-trinq-navy" htmlFor="contact-phone">
                    Cep Telefonu
                  </label>
                  <div className="flex gap-2">
                    <span className="flex items-center rounded-xl border border-gray-200 bg-white px-3 text-sm text-trinq-muted">+90</span>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="5XX XXX XX XX"
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
                    className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-trinq-navy outline-none transition-all focus:border-trinq-accent focus:ring-4 focus:ring-trinq-accent/10"
                  />
                </div>
                <div className="flex items-start gap-2">
                  <input
                    id="kvkk-consent"
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-trinq-accent focus:ring-trinq-accent"
                  />
                  <label htmlFor="kvkk-consent" className="text-xs leading-relaxed text-trinq-muted">
                    <Link href="/kvkk" className="font-semibold text-trinq-accent hover:underline">
                      Kişisel Verilerin Korunması Politikası
                    </Link>
                    &apos;nı okudum ve kişisel verilerimin işlenmesine onay veriyorum.
                  </label>
                </div>
                <motion.button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-trinq-accent py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-trinq-accent-hover"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  Gönder <Send size={16} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
