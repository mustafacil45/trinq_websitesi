"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Apple, Smartphone, QrCode, X, Play } from "lucide-react";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/constants";

const easing = [0.22, 1, 0.36, 1] as const;

export default function CTASection() {
  const [device, setDevice] = useState<"ios" | "android" | "desktop" | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor;
    if (/android/i.test(ua)) {
      setDevice("android");
    } else if (/iPad|iPhone|iPod/.test(ua)) {
      setDevice("ios");
    } else {
      setDevice("desktop");
    }
  }, []);

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (device === "ios") {
      window.location.href = APP_STORE_URL;
    } else if (device === "android") {
      window.location.href = PLAY_STORE_URL;
    } else {
      setShowQrModal(true);
    }
  };

  return (
    <>
    <section className="relative overflow-hidden bg-trinq-navy py-20 sm:py-24 lg:py-28" id="indir">
      {/* Hafif gradient derinlik */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-trinq-accent/8 to-transparent opacity-60" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-trinq-accent/10 blur-[80px]" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          style={{ letterSpacing: "-0.02em" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: easing }}
        >
          trinQ’yi Hemen İndir
        </motion.h2>
        <motion.p
          className="mx-auto mt-4 max-w-xl text-lg text-white/90"
          style={{ lineHeight: 1.6 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08, ease: easing }}
        >
          Fişlerini topla, damga kazan, ödüllerini al. App Store ve Google Play’de ücretsiz.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col items-center gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: easing }}
        >
          <motion.button
            onClick={handleDownload}
            className="inline-flex items-center gap-3 rounded-full bg-trinq-accent px-8 py-4 text-lg font-bold text-white shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-all hover:bg-trinq-accent-hover hover:shadow-[0_12px_40px_rgba(0,0,0,0.22)]"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {device === "ios" ? (
              <>
                <Apple size={24} className="mb-0.5" />
                App Store'dan İndir
              </>
            ) : device === "android" ? (
              <>
                <Play size={22} className="ml-0.5 mt-0.5 fill-current" />
                Google Play'den İndir
              </>
            ) : (
              <>
                <Smartphone size={24} />
                Uygulamayı Hemen İndir
              </>
            )}
          </motion.button>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-5">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex transition hover:opacity-95"
            >
              <img
                src="/badges/app-store-badge.svg"
                alt="App Store’dan indirin"
                className="h-11 w-auto max-w-[min(100%,200px)] object-contain md:h-12"
                width={180}
                height={54}
              />
            </a>
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex transition hover:opacity-95"
            >
              <img
                src="/badges/google-play-badge.svg"
                alt="Google Play’den edinin"
                className="h-11 w-auto max-w-[min(100%,220px)] object-contain md:h-12"
                width={202}
                height={60}
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>

      {/* Masaüstü: QR Modal Tasarımı */}
      <AnimatePresence>
        {showQrModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-sm rounded-[24px] border border-gray-100 bg-white p-8 px-6 text-center shadow-[0_30px_60px_rgba(0,0,0,0.15)] sm:px-8"
            >
              {/* Kapatma Butonu */}
              <button
                onClick={() => setShowQrModal(false)}
                className="absolute right-4 top-4 rounded-full bg-gray-50 p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={18} />
              </button>

              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FDF8EC] shadow-sm">
                <QrCode size={32} className="text-trinq-accent" />
              </div>

              <h3 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900">
                Mobil Uygulamayı İndir
              </h3>
              <p className="mb-8 text-[13.5px] leading-relaxed text-gray-500">
                Cep telefonunuzun kamerasını kullanarak barkodu okutabilir ve uygulamamızı saniyeler içinde indirebilirsiniz.
              </p>

              <div className="flex justify-center gap-6">
                {/* App Store QR */}
                <div className="flex flex-col items-center gap-3">
                  <div className="flex h-[110px] w-[110px] items-center justify-center rounded-[20px] border-2 border-gray-100 bg-white shadow-sm transition-all hover:border-gray-200">
                    {/* Placeholder QR */}
                    <QrCode size={64} className="text-gray-300 pointer-events-none" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
                    <Apple size={14} className="mb-0.5" /> iOS
                  </div>
                </div>

                {/* Google Play QR */}
                <div className="flex flex-col items-center gap-3">
                  <div className="flex h-[110px] w-[110px] items-center justify-center rounded-[20px] border-2 border-gray-100 bg-white shadow-sm transition-all hover:border-gray-200">
                    {/* Placeholder QR */}
                    <QrCode size={64} className="text-gray-300 pointer-events-none" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800">
                    <Play size={12} className="fill-current" /> Android
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
