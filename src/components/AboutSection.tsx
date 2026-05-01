"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Handshake, MapPin, Megaphone, Sparkles, Store, Target, Zap } from "lucide-react";

const WHAT_WE_DO = [
  {
    icon: MapPin,
    text: "Kullanıcıların çevresindeki kampanyaları anlık olarak görmesini sağlıyoruz.",
  },
  {
    icon: Megaphone,
    text: "İşletmelerin kampanya oluşturmasını ve doğru kitleye ulaşmasını kolaylaştırıyoruz.",
  },
  {
    icon: BadgeCheck,
    text: "Geleneksel damga kartı sistemini dijital hale getiriyoruz.",
  },
  {
    icon: Sparkles,
    text: "Alışveriş sonrası deneyimi daha akıllı ve etkileşimli hale getiriyoruz.",
  },
];

const BELIEFS = [
  {
    icon: Target,
    text: "Keşif kolay olmalı: Kullanıcı fırsatı aramamalı, fırsat kullanıcıya gelmeli.",
  },
  {
    icon: Zap,
    text: "Etkileşim değerli olmalı: Her ziyaret bir deneyime dönüşmeli.",
  },
  {
    icon: Store,
    text: "Dijitalleşme basit olmalı: Karmaşık sistemler yerine sade çözümler sunulmalı.",
  },
  {
    icon: Handshake,
    text: "Bağ kurmak önemli: İşletme ve müşteri arasında gerçek bir ilişki kurulmalı.",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function AboutSection() {
  return (
    <section className="bg-white py-14 sm:py-20 lg:py-28" id="hakkimizda">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            className="text-sm font-bold uppercase tracking-widest text-trinq-accent"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
          >
            HAKKIMIZDA
          </motion.span>
          <motion.h2
            className="mt-3 text-3xl font-bold leading-tight text-trinq-navy sm:text-4xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45 }}
          >
            Hakkımızda
          </motion.h2>
        </div>

        <motion.div
          className="mx-auto mt-8 max-w-4xl space-y-4 text-base leading-relaxed text-trinq-muted/90 sm:space-y-5 sm:text-lg"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          <p>
            trinQ, işletmeler ile kullanıcıları daha akıllı ve etkileşimli bir şekilde buluşturan yeni nesil bir
            keşif ve kampanya platformudur.
          </p>
          <p>
            Günümüzde kullanıcılar çevresindeki fırsatlardan habersiz, işletmeler ise doğru müşteriye ulaşmakta
            zorlanıyor. trinQ, bu iki tarafı aynı noktada buluşturarak bu problemi çözer.
          </p>
          <p>
            Kullanıcılar trinQ ile bulundukları konuma göre yakınlarındaki kampanyaları keşfeder, işletmeler ise
            hedef kitlesine doğrudan ulaşarak kampanyalarını daha etkili şekilde sunar.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-8 lg:grid-cols-2">
          <motion.div
            className="rounded-[20px] border border-slate-100 bg-[#FAFBFC] p-5 shadow-sm sm:p-8"
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <h3 className="text-xl font-bold text-trinq-navy sm:text-2xl">Ne Yapıyoruz?</h3>
            <ul className="mt-6 space-y-4">
              {WHAT_WE_DO.map((item) => (
                <li key={item.text} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-trinq-accent/10">
                    <item.icon className="h-5 w-5 text-trinq-accent" strokeWidth={1.8} />
                  </div>
                  <p className="pt-1 text-sm leading-relaxed text-trinq-muted/90 sm:text-base">{item.text}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="rounded-[20px] border border-slate-100 bg-[#FAFBFC] p-5 shadow-sm sm:p-8"
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.08 }}
          >
            <h3 className="text-xl font-bold text-trinq-navy sm:text-2xl">Neye İnanıyoruz?</h3>
            <ul className="mt-6 space-y-4">
              {BELIEFS.map((item) => (
                <li key={item.text} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-trinq-accent/10">
                    <item.icon className="h-5 w-5 text-trinq-accent" strokeWidth={1.8} />
                  </div>
                  <p className="pt-1 text-sm leading-relaxed text-trinq-muted/90 sm:text-base">{item.text}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-5 grid gap-5 sm:mt-8 sm:gap-6 lg:grid-cols-2">
          <motion.div
            className="rounded-[20px] border border-trinq-accent/15 bg-trinq-accent/5 p-5 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
          >
            <h3 className="text-xl font-bold text-trinq-navy sm:text-2xl">Vizyonumuz</h3>
            <p className="mt-4 text-sm leading-relaxed text-trinq-muted/90 sm:text-base">
              trinQ’yu sadece bir kampanya uygulaması değil, kullanıcıların bulunduğu çevreyle etkileşimini yeniden
              tanımlayan bir platform haline getirmek.
            </p>
          </motion.div>

          <motion.div
            className="rounded-[20px] border border-trinq-accent/15 bg-trinq-accent/5 p-5 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <h3 className="text-xl font-bold text-trinq-navy sm:text-2xl">Misyonumuz</h3>
            <p className="mt-4 text-sm leading-relaxed text-trinq-muted/90 sm:text-base">
              İşletmelerin doğru kullanıcıya ulaşabildiği, kullanıcıların ise en doğru fırsatları zahmetsizce
              keşfedebildiği yeni nesil dijital etkileşim ekosistemini oluşturmak.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
