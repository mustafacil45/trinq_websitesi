"use client";

import { motion } from "framer-motion";
import { Clock, Headphones, Building2, Check, ArrowRight } from "lucide-react";

export default function PricingSection() {
  return (
    <section className="bg-background py-20 sm:py-24 lg:py-28" id="fiyatlandirma">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-bold uppercase tracking-widest text-trinq-accent">
            FİYATLANDIRMA
          </span>
          <h2 className="mt-3 text-3xl font-bold text-trinq-navy sm:text-4xl">
            Şeffaf ve Esnek Fiyatlandırma
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-trinq-muted/90">
            Sözleşme yok. Gizli ücret yok. Deneme süreniz boyunca tüm özelliklere tam erişim.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-[28px] bg-trinq-navy shadow-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Sol: Deneme bilgisi */}
            <div className="p-8 sm:p-10 lg:p-12">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                <Clock size={16} className="text-trinq-accent" />
                14 Gün Ücretsiz Deneme
              </div>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                Önce Deneyin,<br />Sonra Karar Verin
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
                Kredi kartı gerektirmeden 14 gün boyunca tüm özellikleri kullanın. Deneme süreniz bittikten sonra aylık abonelikle devam edin.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Kurulum ücretsiz, donanım gerekmez",
                  "Sözleşme yok, istediğiniz zaman iptal",
                  "Aylık abonelik, taahhüt yok",
                  "Fiyat için bizimle iletişime geçin",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/80">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-trinq-accent/15">
                      <Check size={12} className="text-trinq-accent" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sağ: Benefit kartları + CTA */}
            <div className="flex flex-col justify-center gap-4 bg-white/5 p-8 sm:p-10 lg:p-12">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <div className="mb-2 flex items-center gap-2">
                  <Headphones size={18} className="text-trinq-accent" />
                  <span className="text-sm font-bold text-white">7/24 Destek</span>
                </div>
                <p className="text-xs leading-relaxed text-white/60">
                  Telefon ve e-posta ile her zaman yanınızdayız.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <div className="mb-2 flex items-center gap-2">
                  <Building2 size={18} className="text-trinq-accent" />
                  <span className="text-sm font-bold text-white">Çoklu Şube</span>
                </div>
                <p className="text-xs leading-relaxed text-white/60">
                  Tüm şubelerinizi tek panelden yönetin.
                </p>
              </div>
              <motion.a
                href="#iletisim"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-trinq-accent px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-trinq-accent-hover"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                14 Gün Ücretsiz Başlayın <ArrowRight size={16} />
              </motion.a>
              <motion.a
                href="#iletisim"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Fiyat Bilgisi Alın
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
