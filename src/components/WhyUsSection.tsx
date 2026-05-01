"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="bg-white py-20 sm:py-24 lg:py-28"
      id="neden-biz"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Sol: Telefon + süzülen fiş + yeşil tarama çizgisi */}
          <motion.div
            className="relative flex min-h-[320px] items-center justify-center lg:min-h-[400px]"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            {/* Telefon mockup (küçük) */}
            <div className="relative z-10 w-[140px] sm:w-[160px]">
              <div
                className="overflow-hidden rounded-[32px] border-[6px] border-zinc-800 bg-zinc-900 shadow-xl"
                style={{ aspectRatio: "390/844" }}
              >
                <div className="flex h-full items-center justify-center bg-trinq-accent/10">
                  <span className="text-[10px] font-medium text-trinq-accent/60">QR</span>
                </div>
              </div>
            </div>

            {/* Süzülen dijital fiş - telefonun üstünde */}
            <motion.div
              className="absolute left-1/2 top-12 z-20 w-[180px] -translate-x-1/2 sm:top-16 sm:w-[200px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative rounded-xl border border-trinq-accent/30 bg-white/95 p-3 shadow-lg backdrop-blur-sm">
                <div className="mb-2 h-1.5 w-3/4 rounded bg-zinc-200" />
                <div className="space-y-1.5">
                  <div className="h-1 w-full rounded bg-zinc-100" />
                  <div className="h-1 w-4/5 rounded bg-zinc-100" />
                  <div className="h-1 w-1/2 rounded bg-zinc-100" />
                </div>
                <div className="mt-2 h-px bg-zinc-200" />
                <div className="mt-1.5 h-1 w-1/3 rounded bg-zinc-200" />
                {/* Yeşil tarama çizgisi - bölüm görünürken yukarı aşağı hareket eder */}
                <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                  <motion.div
                    className="absolute left-0 right-0 top-0 h-1 bg-trinq-accent shadow-[0_0_14px_3px_rgba(0,0,0,0.25)] transform-gpu will-change-transform"
                    animate={
                      isInView
                        ? { y: [0, 72, 0] }
                        : { y: 0 }
                    }
                    transition={{
                      duration: 2.2,
                      repeat: isInView ? Infinity : 0,
                      ease: "easeInOut",
                      repeatDelay: 0.3,
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Arka planda hafif bağlantı çizgileri (AI / veri akışı hissi) */}
            <svg
              className="absolute inset-0 h-full w-full opacity-[0.08]"
              aria-hidden
            >
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#000000" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 80 120 Q 180 80 280 160 T 400 200"
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth="1"
              />
              <path
                d="M 120 280 Q 220 240 320 300"
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth="1"
              />
            </svg>
          </motion.div>

          {/* Sağ: Başlık + açıklama */}
          <motion.div
            className="lg:pl-4"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-trinq-navy sm:text-4xl lg:text-[2.5rem]">
              Sıradan Değil, Sana Özel
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-trinq-muted/90">
              Dijital fiş analizi sayesinde zevklerini anlıyor ve sadece sevdiğin ürünlerde kampanya sunuyoruz.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
