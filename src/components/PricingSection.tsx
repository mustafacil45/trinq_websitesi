"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Check, Clock3, LineChart, Rocket, Sparkles } from "lucide-react";

const BENEFITS = [
  "Kurulum ücretsiz, anında başlayın",
  "6 ay boyunca tüm özelliklere erişim",
  "Taahhüt yok, istediğiniz zaman çıkabilirsiniz",
  "Kampanyalarınızı anında yayınlayın",
  "Dijital damga kart sistemini aktif edin",
];

const ACTION_CARDS = [
  {
    icon: Rocket,
    title: "🚀 Hemen Başlayın",
    desc: "Dakikalar içinde işletmenizi sisteme ekleyin.",
  },
  {
    icon: LineChart,
    title: "📈 Müşterilere Ulaşın",
    desc: "Yakınınızdaki kullanıcılar kampanyalarınızı keşfetsin.",
  },
];

export default function PricingSection() {
  return (
    <section
      className="relative overflow-hidden bg-white py-14 sm:py-20 lg:py-28"
      id="fiyatlandirma"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold leading-tight text-trinq-navy sm:text-4xl">
            Haziran’a Özel: 6 Ay Ücretsiz Kullanın
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-trinq-muted/90 sm:text-lg">
            Sınırlı süreli fırsat. Şimdi katılın, trinQ’nun tüm özelliklerini 6 ay boyunca ücretsiz deneyimleyin.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto mt-10 grid max-w-6xl gap-5 sm:mt-14 sm:gap-6 lg:grid-cols-[1.35fr_0.75fr]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative overflow-hidden rounded-[24px] border border-trinq-accent/15 bg-white p-5 shadow-[0_24px_70px_-36px_rgba(17,57,46,0.45)] sm:rounded-[28px] sm:p-10 lg:p-12">
            <div className="absolute right-0 top-0 h-44 w-44 translate-x-10 -translate-y-10 rounded-full bg-trinq-accent/10 blur-2xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-trinq-accent/20 bg-trinq-accent/10 px-3 py-2 text-xs font-bold text-trinq-navy sm:px-4 sm:text-sm">
                <Clock3 size={16} className="text-trinq-accent" />
                ⏳ Sınırlı Süre - Haziran Sonuna Kadar
              </div>

              <h3 className="mt-6 max-w-2xl text-2xl font-bold leading-tight text-trinq-navy sm:mt-7 sm:text-3xl lg:text-4xl">
                Önce Deneyin, Üstelik 6 Ay Ücretsiz
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-trinq-muted/90 sm:text-lg">
                Kampanyamıza katılan işletmeler, trinQ’nun tüm özelliklerini 6 ay boyunca hiçbir ücret ödemeden
                kullanabilir.
              </p>

              <ul className="mt-7 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
                {BENEFITS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-trinq-muted/90">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-trinq-accent text-white">
                      <Check size={14} strokeWidth={2.5} />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <motion.a
                  href="/#iletisim"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--trinq-accent),#18B66C,var(--trinq-accent))] bg-[length:180%_180%] px-7 py-4 text-sm font-bold text-white shadow-[0_18px_35px_-18px_rgba(26,166,92,0.9)] transition-all hover:bg-[position:100%_50%] sm:w-auto"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  6 Ay Ücretsiz Başla <ArrowRight size={16} />
                </motion.a>
                <motion.a
                  href="/#iletisim"
                  className="inline-flex w-full items-center justify-center rounded-full border border-trinq-accent/25 bg-white px-7 py-4 text-sm font-bold text-trinq-navy shadow-sm transition hover:border-trinq-accent/50 hover:bg-trinq-accent/5 sm:w-auto"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  İletişime Geç
                </motion.a>
              </div>

              <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-trinq-muted/80">
                <Clock3 size={14} className="text-trinq-accent" />
                ⏱ Kampanya süresi sınırlıdır
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {ACTION_CARDS.map((card, index) => (
              <motion.div
                key={card.title}
                className="rounded-[22px] border border-slate-100 bg-white p-5 shadow-[0_18px_50px_-34px_rgba(17,57,46,0.55)] transition hover:-translate-y-1 hover:border-trinq-accent/25 hover:shadow-[0_22px_58px_-32px_rgba(17,57,46,0.55)] sm:rounded-[24px] sm:p-6"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-trinq-accent/10">
                  <card.icon className="h-6 w-6 text-trinq-accent" strokeWidth={1.8} />
                </div>
                <h3 className="text-lg font-bold text-trinq-navy">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-trinq-muted/90">{card.desc}</p>
              </motion.div>
            ))}

            <motion.div
              className="rounded-[22px] border border-trinq-accent/15 bg-trinq-navy p-5 text-white shadow-[0_22px_60px_-34px_rgba(17,57,46,0.65)] sm:rounded-[24px] sm:p-6"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: 0.16 }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <BadgeCheck className="h-6 w-6 text-trinq-accent" strokeWidth={1.8} />
              </div>
              <h3 className="text-lg font-bold">Detaylı Bilgi Alın</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Fiyatlandırma hakkında detaylı bilgi almak için bizimle iletişime geçebilirsiniz.
              </p>
              <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-trinq-accent">
                <Sparkles size={14} />
                Haziran fırsatı aktif
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
