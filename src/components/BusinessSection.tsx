"use client";

import { motion } from "framer-motion";
import { Users, BarChart3, Megaphone } from "lucide-react";

const BENEFITS = [
  { icon: Users, title: "Müşteri Sadakati Artır", desc: "Tekrarlayan ziyaretler ve bağlı müşteri tabanı." },
  { icon: BarChart3, title: "Veri Analitiği", desc: "Satış ve davranış verileriyle bilinçli karar al." },
  { icon: Megaphone, title: "Kolay Kampanya Yönetimi", desc: "Damga ve puan kampanyalarını tek panelden yönet." },
];

export default function BusinessSection() {
  return (
    <section className="bg-white py-14 sm:py-20 lg:py-28" id="isletmeler-icin">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
          >
            <h2 className="text-3xl font-bold leading-tight text-trinq-navy sm:text-4xl">
              İşletmeler İçin
            </h2>
            <p className="mt-4 text-base leading-relaxed text-trinq-muted/90 sm:text-lg">
              trinQ ile müşteri sadakati programını dijitalleştir, verilerini takip et.
            </p>
            <ul className="mt-8 space-y-5">
              {BENEFITS.map((b, i) => (
                <motion.li
                  key={b.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-trinq-accent">
                    <b.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-trinq-navy">{b.title}</h3>
                    <p className="mt-1 text-trinq-muted/90">{b.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="mt-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <motion.a
                href="#giris"
                className="inline-flex w-full justify-center rounded-full bg-trinq-accent px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-trinq-accent/15 transition hover:bg-trinq-accent-hover sm:w-auto"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                İşletme Hesabı Oluştur
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Dashboard Mockup */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
          >
            <div className="relative w-full max-w-xl overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-2xl lg:max-w-2xl">
              <img
                src="/trinq-isletme-panel-gercek.png"
                alt="trinQ işletme paneli — gerçek ekran görüntüsü"
                className="h-auto w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
