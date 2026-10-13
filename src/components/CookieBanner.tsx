"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "trinq_cookie_consent";

/**
 * Çerez tercihleri.
 *
 * Önceki sürümde banner sol altta sabit duruyor ve kapatılana kadar sayfa
 * içeriğinin bir kısmını örtüyordu; "Özelleştir" ise bloklayan bir
 * `alert()` açıyordu. Artık mobilde alt sayfa (bottom sheet), masaüstünde
 * köşede kompakt bir kart ve özelleştirme satır içi.
 */
export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [customizing, setCustomizing] = useState(false);

  useEffect(() => {
    // İlk boyamadan sonra oku: SSR'da localStorage yok, commit sırasında
    // senkron setState ise gereksiz bir render zinciri yaratıyor.
    const raf = requestAnimationFrame(() => {
      try {
        if (!localStorage.getItem(STORAGE_KEY)) setShow(true);
      } catch {
        /* localStorage kapalıysa banner gösterme */
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const persist = (value: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* yoksay */
    }
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="dialog"
          aria-label="Çerez tercihleri"
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 28, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="on-dark fixed inset-x-0 bottom-0 z-[100] border-t border-white/12 bg-trinq-navy-deep/96 px-4 pb-[max(0.875rem,env(safe-area-inset-bottom))] pt-3.5 shadow-[0_-10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-[400px] sm:rounded-3xl sm:border sm:p-6"
        >
          <div className="flex items-start gap-3">
            <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/8 text-trinq-gold-soft sm:flex">
              <Cookie size={19} strokeWidth={1.9} />
            </span>
            <div className="min-w-0">
              <h2 className="text-[14px] font-bold text-[#f6f7ef] sm:text-[15px]">Çerez tercihleri</h2>
              <p className="mt-1 text-[12.5px] leading-snug text-[#f6f7ef]/60 sm:mt-1.5 sm:text-[13px] sm:leading-relaxed">
                Zorunlu çerezleri kullanıyoruz; isteğe bağlı olanlara da izin
                verebilirsin.{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-trinq-gold-soft underline-offset-4 hover:underline"
                >
                  Gizlilik Politikası
                </Link>
              </p>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {customizing && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-2 rounded-2xl border border-white/10 bg-white/5 p-3">
                  <label className="flex cursor-not-allowed items-center justify-between gap-3 text-[13px] text-[#f6f7ef]/55">
                    <span>
                      <span className="block font-semibold text-[#f6f7ef]/80">Zorunlu</span>
                      Oturum ve güvenlik
                    </span>
                    <input type="checkbox" checked disabled className="h-4 w-4 accent-[#e3c779]" />
                  </label>
                  <label className="flex cursor-pointer items-center justify-between gap-3 border-t border-white/8 pt-2 text-[13px] text-[#f6f7ef]/55">
                    <span>
                      <span className="block font-semibold text-[#f6f7ef]/80">Analitik</span>
                      Anonim kullanım istatistikleri
                    </span>
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                      className="h-4 w-4 cursor-pointer accent-[#e3c779]"
                    />
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-3 flex gap-2 sm:mt-4">
            <button
              type="button"
              onClick={() => persist(customizing ? (analytics ? "accepted" : "essential") : "accepted")}
              className="min-h-[44px] flex-1 rounded-full bg-trinq-cream px-3 text-[13px] font-bold text-trinq-navy transition-colors hover:bg-white"
            >
              {customizing ? "Seçimi kaydet" : "Tümünü kabul et"}
            </button>
            <button
              type="button"
              onClick={() => persist("declined")}
              className="min-h-[44px] flex-1 rounded-full border border-white/20 px-3 text-[13px] font-semibold text-[#f6f7ef] transition-colors hover:bg-white/8"
            >
              Tümünü reddet
            </button>
          </div>

          {!customizing && (
            <button
              type="button"
              onClick={() => setCustomizing(true)}
              className="mt-2.5 w-full text-center text-[12px] font-medium text-[#f6f7ef]/50 underline underline-offset-4 transition-colors hover:text-[#f6f7ef]/80"
            >
              Özelleştir
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
