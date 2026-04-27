"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function DigitalRevolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const receiptOpacity = useTransform(scrollYProgress, [0, 0.35, 0.7], [1, 0.4, 0]);
  const [phoneHovered, setPhoneHovered] = useState(false);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-28"
      id="dijital-devrim"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Sol: Kağıt fiş (scroll'da şeffaflaşır) + başlık ve metin */}
          <div className="relative">
            {/* Kağıt fiş görseli - kaydırıldıkça yavaşça şeffaflaşır */}
            <motion.div
              className="absolute -left-4 top-0 z-0 hidden w-32 origin-bottom rotate-[-12deg] sm:block lg:w-40"
              style={{ opacity: receiptOpacity }}
            >
              <div className="rounded-lg border border-zinc-300 bg-white p-3 shadow-lg">
                <div className="mb-2 h-1.5 w-16 rounded bg-zinc-200" />
                <div className="space-y-1">
                  <div className="h-0.5 w-full rounded bg-zinc-100" />
                  <div className="h-0.5 w-4/5 rounded bg-zinc-100" />
                  <div className="h-0.5 w-3/5 rounded bg-zinc-100" />
                </div>
                <div className="my-1.5 border-t border-dashed border-zinc-200" />
                <div className="h-0.5 w-1/4 rounded bg-zinc-200" />
              </div>
            </motion.div>

            <motion.div
              className="relative z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45 }}
            >
              <h2 className="text-3xl font-bold leading-tight text-trinq-navy sm:text-4xl lg:text-[2.25rem]">
                Kağıt Fişler{" "}
                <span className="text-trinq-accent">Tarihe Karıştı</span>,{" "}
                <span className="text-trinq-accent">Akıllı Harcamalar</span> Başladı.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-trinq-muted">
                trinQ ile fiş biriktirme zahmetine son. QR kodunu okuttuğun an dijital fişin cebine düşer, AI sistemimiz harcamalarını analiz ederek sana sadece seveceğin mekanlarda en özel kampanyaları yaratır.
              </p>
            </motion.div>
          </div>

          {/* Sağ: iPhone mockup + hover'da solda dijital fiş */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45 }}
          >
            <div
              className="relative w-[240px] sm:w-[260px] lg:w-[280px] cursor-default"
              onMouseEnter={() => setPhoneHovered(true)}
              onMouseLeave={() => setPhoneHovered(false)}
            >
              {/* Hover'da ekranın solunda beliren dijital fiş */}
              <motion.div
                className="absolute right-full z-20 mr-4 top-1/2 w-[200px] -translate-y-1/2 rounded-xl border border-trinq-accent/20 bg-white p-4 shadow-xl"
                initial={{ opacity: 0, x: 12, scale: 0.96 }}
                animate={
                  phoneHovered
                    ? { opacity: 1, x: 0, scale: 1 }
                    : { opacity: 0, x: 12, scale: 0.96 }
                }
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                <p className="mb-3 border-b border-dashed border-slate-200 pb-2 text-center text-xs font-bold uppercase tracking-wider text-trinq-accent">
                  Dijital Fişiniz
                </p>
                <p className="text-[11px] font-semibold text-trinq-navy">Kafe Merkez</p>
                <p className="text-[10px] text-slate-500">İstiklal Cd. No:42, Beyoğlu</p>
                <p className="mt-1 text-[10px] text-slate-500">14.03.2025 · 14:32</p>
                <div className="my-3 border-t border-dashed border-slate-200 pt-2">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-700">Türk Kahvesi x1</span>
                    <span>45,00 ₺</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-700">Su 0,33L x2</span>
                    <span>20,00 ₺</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-700">Çikolatalı Kek</span>
                    <span>55,00 ₺</span>
                  </div>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-1.5 text-[11px] font-semibold text-trinq-navy">
                  <span>Toplam</span>
                  <span>120,00 ₺</span>
                </div>
                <p className="mt-2 text-center text-[9px] text-slate-400">trinQ ile dijital fiş</p>
              </motion.div>

              {/* iPhone çerçevesi - Harcamalarım ekranı */}
              <motion.div
                className="relative overflow-hidden rounded-[52px] border-[10px] border-zinc-800 bg-zinc-900 shadow-2xl"
                animate={{
                  boxShadow: phoneHovered
                    ? "0 28px 60px -12px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.12)"
                    : "0 25px 50px -12px rgba(0,0,0,0.35)",
                }}
                transition={{ duration: 0.25 }}
              >
                <div
                  className="relative flex w-full items-center justify-center overflow-hidden rounded-[42px] bg-black"
                  style={{ aspectRatio: "390/844" }}
                >
                  <img
                    src="/harcamalarim-ekrani.png"
                    alt="trinQ Harcamalarım ekranı"
                    className="h-full w-full object-contain object-center"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
