"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBusinessLeadModal } from "@/context/BusinessLeadModalContext";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/constants";

const easing = [0.22, 1, 0.36, 1] as const;
const ROTATING_WORDS = ["Öğrenciye", "Doğum Gününe", "Kahvesevere", "Müdavime", "Çalışana", "Gezgine"];
const ROTATE_INTERVAL_MS = 2800;

export default function Hero() {
  const { openBusinessLeadModal } = useBusinessLeadModal();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <section
        className="relative min-h-[90vh] overflow-hidden pt-28 sm:min-h-[85vh] sm:pt-32 lg:pt-36"
        id="anasayfa"
        style={{
          background:
            "linear-gradient(180deg, #11392e 0%, #0e3028 18%, #1a4a3c 40%, #5c7568 62%, #94a3b8 78%, #f4f8f9 100%)",
        }}
      >
        {/* Studio lighting */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full bg-trinq-accent/20 blur-[120px] transform-gpu will-change-transform" />
        <div className="pointer-events-none absolute right-1/4 top-1/2 h-64 w-64 rounded-full bg-trinq-accent-light/12 blur-[100px] transform-gpu will-change-transform" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-96 rounded-full bg-trinq-navy/30 blur-[100px] transform-gpu will-change-transform" />

        <div className="relative mx-auto flex min-h-[calc(90vh-6rem)] max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:min-h-[calc(85vh-6rem)] lg:flex-row lg:gap-12 lg:px-8">
          {/* Sol: Metin hiyerarşisi */}
          <div className="relative z-10 flex max-w-2xl flex-col items-center text-center font-sans lg:items-start lg:text-left">
            <motion.h1
              className="font-semibold leading-snug tracking-tight text-white"
              style={{
                letterSpacing: "-0.02em",
                fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)",
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easing }}
            >
              <span className="block whitespace-nowrap">
                <span className="font-extrabold text-white [text-shadow:0_0_24px_rgba(255,255,255,0.12)]">
                  trinQ
                </span>{" "}
                <span className="font-semibold text-white">İle Sevdiğin Yerlerde,</span>
              </span>
              {/* Sabit kutu + yeterli satır kutusu: ğ, y, g descender’ları bg-clip-text ile kesilmesin */}
              <span
                className="relative my-2 flex min-h-[clamp(4.25rem,12vw,6.25rem)] w-full items-center justify-center overflow-visible py-2 font-semibold lg:justify-start"
                style={{ fontSize: "clamp(2rem, 6vw, 4.25rem)" }}
              >
                <span className="relative inline-block w-full min-w-[min(100%,15ch)] max-w-[95vw] overflow-visible text-center lg:max-w-none lg:text-left">
                  <AnimatePresence initial={false} mode="wait">
                    <motion.span
                      key={ROTATING_WORDS[index]}
                      className="inline-block w-full bg-gradient-to-r from-yellow-300 via-[#d7b85d] to-[#e0c576] bg-clip-text pb-[0.2em] pt-[0.05em] leading-[1.28] text-transparent [background-clip:text] [-webkit-background-clip:text]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: easing }}
                    >
                      {ROTATING_WORDS[index]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
              <span className="block whitespace-nowrap">Özel Kampanyaları Kaçırma.</span>
            </motion.h1>
            <motion.p
              className="mt-6 max-w-xl text-lg text-slate-300 sm:text-xl"
              style={{ lineHeight: 1.6 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12, ease: easing }}
            >
              trinQ ile harcadıkça damga biriktir, favori mekanlarında anında ödüller kazan. Dijital sadakat hiç bu kadar kolay olmamıştı.
            </motion.p>

            {/* Resmi mağaza rozetleri + İşletme Ol — tek satır */}
            <motion.div
              className="mt-8 flex w-full max-w-3xl flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:max-w-none lg:flex-nowrap lg:justify-start lg:gap-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: easing }}
            >
              <motion.a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 justify-center transition hover:opacity-95 sm:justify-start"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src="/badges/app-store-badge.svg"
                  alt="App Store’dan indirin"
                  className="h-11 w-auto max-w-[min(100%,200px)] object-contain object-left md:h-12"
                  width={180}
                  height={54}
                />
              </motion.a>

              <motion.a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 justify-center transition hover:opacity-95 sm:justify-start"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src="/badges/google-play-badge.svg"
                  alt="Google Play’den edinin"
                  className="h-11 w-auto max-w-[min(100%,220px)] object-contain object-left md:h-12"
                  width={202}
                  height={60}
                />
              </motion.a>

              <motion.button
                type="button"
                onClick={openBusinessLeadModal}
                className="inline-flex min-h-[44px] shrink-0 items-center justify-center self-center rounded-full bg-trinq-accent px-7 py-3 text-sm font-bold text-white shadow-[0_6px_22px_rgba(0,0,0,0.22)] transition hover:bg-trinq-accent-hover hover:shadow-[0_8px_28px_rgba(0,0,0,0.28)] sm:min-h-[48px] sm:px-8 sm:text-base lg:ml-1"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="whitespace-nowrap">İşletme Ol</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Sağ: Premium telefon + 3D floating elements + mesh/glow */}
          <motion.div
            className="relative z-0 flex flex-shrink-0 justify-center lg:translate-x-8 lg:justify-end"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: easing }}
          >
            {/* Arka plan derinlik: mesh / blurred mavi daire (3D pop) */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              aria-hidden
            >
              <div
                className="h-[380px] w-[280px] rounded-full opacity-60 blur-[80px] lg:h-[420px] lg:w-[320px]"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.06) 50%, transparent 70%)",
                }}
              />
            </div>

            {/* iPhone mockup */}
            <motion.div
              className="relative w-[240px] cursor-default sm:w-[260px] lg:w-[280px]"
              whileHover={{ y: -6 }}
              transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
            >
              <div className="relative overflow-hidden rounded-[52px] border-[10px] border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/30">
                <div
                  className="relative flex w-full items-center justify-center overflow-hidden rounded-[42px] bg-black"
                  style={{ aspectRatio: "390/844" }}
                >
                  <img
                    src="/hero-app-screen.png"
                    alt="trinQ dijital fiş ve harcama ekranı"
                    className="h-full w-full object-contain object-center"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
