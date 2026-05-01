"use client";

import { motion } from "framer-motion";
import { MapPin, Wallet, Tag } from "lucide-react";

const FEATURES = [
  { icon: MapPin, title: "Keşfet & Yakındaki Fırsatlar", desc: "Çevrendeki anlaşmalı işletmeleri ve kampanyaları keşfet." },
  { icon: Wallet, title: "Tüm Kartlar Cebinde", desc: "Sadakat kartların tek uygulamada, kaybolmaz." },
  { icon: Tag, title: "Özel Kampanyalar", desc: "İşletmelere özel indirim ve ödüllerden yararlan." },
];

export default function UsersSection() {
  return (
    <section className="bg-white py-14 sm:py-20 lg:py-28" id="kullanicilar">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
          >
            <h2 className="text-3xl font-bold leading-tight text-trinq-navy sm:text-4xl">
              Kullanıcı Özellikleri
            </h2>
            <p className="mt-4 text-base leading-relaxed text-trinq-muted/90 sm:text-lg">
              trinQ ile alışveriş alışkanlıkların değişsin; fiş kaybolmasın, ödüller biriksin.
            </p>
            <ul className="mt-8 space-y-5">
              {FEATURES.map((f, i) => (
                <motion.li
                  key={f.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-trinq-accent">
                    <f.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-trinq-navy">{f.title}</h3>
                    <p className="mt-1 text-trinq-muted/90">{f.desc}</p>
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
                href="#indir"
                className="inline-flex w-full justify-center rounded-full bg-trinq-accent px-6 py-3.5 text-base font-semibold text-white shadow-[0_4px_14px_-2px_rgba(0,0,0,0.18)] transition hover:bg-trinq-accent-hover sm:w-auto"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Hemen Keşfet
              </motion.a>
            </motion.div>
          </motion.div>

          {/* İki uygulama ekranı: Hero / StoresSection ile aynı çerçeve (çentik yok), hover yukarı */}
          <motion.div
            className="relative flex justify-center gap-4 lg:gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="relative w-[205px] cursor-default min-[375px]:w-[225px] sm:w-[250px] lg:w-[260px]"
              whileHover={{ y: -6 }}
              transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
            >
              <div className="relative overflow-hidden rounded-[40px] border-[8px] border-zinc-800 bg-zinc-900 shadow-[0_14px_32px_-10px_rgba(15,23,42,0.35)] sm:rounded-[52px] sm:border-[10px]">
                <div
                  className="relative flex w-full items-center justify-center overflow-hidden rounded-[32px] bg-black sm:rounded-[42px]"
                  style={{ aspectRatio: "390/844" }}
                >
                  <img
                    src="/user-feature-damga-karti.png"
                    alt="Kahve Damga Kartı – trinQ uygulaması"
                    className="h-full w-full object-contain object-center"
                  />
                </div>
              </div>
            </motion.div>
            <motion.div
              className="relative hidden w-[240px] sm:block sm:w-[260px] lg:w-[260px] cursor-default"
              whileHover={{ y: -6 }}
              transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
            >
              <div className="relative overflow-hidden rounded-[52px] border-[10px] border-zinc-800 bg-zinc-900 shadow-[0_14px_32px_-10px_rgba(15,23,42,0.35)]">
                <div
                  className="relative flex w-full items-center justify-center overflow-hidden rounded-[42px] bg-black"
                  style={{ aspectRatio: "390/844" }}
                >
                  <img
                    src="/user-feature-kafe-detay.png"
                    alt="Kafe Merkez detay – trinQ uygulaması"
                    className="h-full w-full object-contain object-center"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
