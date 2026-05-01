"use client";

import { motion } from "framer-motion";
import { QrCode, RefreshCw, Gift } from "lucide-react";

const STEPS = [
  {
    icon: QrCode,
    title: "Temas Kur: Tek Bir Okutma Yeterli.",
    desc: "Kasada sadece QR kodunu okutman yeterli; geri kalanı trinQ halleder.",
  },
  {
    icon: RefreshCw,
    title: "Akış: Görünmez Teknoloji, Gerçek Veri.",
    desc: "Harcaman, fişin ve damgaların anında uygulamana düşsün.",
  },
  {
    icon: Gift,
    title: "Ayrıcalık: Sana Özel Tasarlanan Ödüller.",
    desc: "Sana özel kampanyalar ve ödüllerle alışverişten anında fayda sağla.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const easing = [0.22, 1, 0.36, 1] as const;
const item = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.45, ease: easing },
  },
};

export default function HowItWorksSection() {
  return (
    <section className="relative bg-white py-14 sm:py-20 lg:py-28" id="sistem">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-trinq-navy sm:text-4xl" style={{ letterSpacing: "-0.02em" }}>
            trinQ Ayrıcalığına 3 Adımda Katıl
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#1E293B]/90 sm:text-lg" style={{ lineHeight: 1.6 }}>
            Üç adımda dijital sadakat: tek okutma, görünmez aktarım, sana özel ödüller.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-5 sm:mt-16 md:grid-cols-3 md:items-stretch lg:gap-10"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              className="relative flex min-h-0 min-w-0"
              variants={item}
            >
              {/* Glassmorphism kart: aynı genişlik/yükseklik — grid sütunları eşit */}
              <motion.div
                className="relative flex h-full min-h-[240px] w-full flex-col rounded-[24px] border border-white/60 bg-white/70 p-6 shadow-[0_8px_32px_-8px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:min-h-[320px] sm:p-8"
                style={{ boxShadow: "0 8px 32px -8px rgba(15,23,42,0.08), 0 0 0 0.5px rgba(255,255,255,0.8)" }}
                whileHover={{ y: -4, boxShadow: "0 20px 48px -12px rgba(15,23,42,0.12), 0 0 0 0.5px rgba(255,255,255,0.9)" }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                {/* Adım numarası: çok ince (200), büyük, arka planda hafif transparan */}
                <span
                  className="pointer-events-none absolute right-4 top-4 max-w-[45%] truncate text-right text-[clamp(3rem,10vw,5rem)] font-extralight leading-none text-trinq-navy/10 sm:right-6 sm:top-6 sm:max-w-none sm:text-[5rem]"
                  style={{ fontWeight: 200 }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative flex flex-1 flex-col items-center text-center">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-trinq-accent to-trinq-accent-light shadow-lg shadow-trinq-accent/15">
                    <step.icon className="h-8 w-8 text-white" strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-trinq-navy" style={{ letterSpacing: "-0.02em" }}>
                    {step.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[#1E293B]/90" style={{ lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
