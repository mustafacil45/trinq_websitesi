"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("trinq_cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("trinq_cookie_consent", "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("trinq_cookie_consent", "declined");
    setShowBanner(false);
  };

  const handleCustomize = () => {
    alert("Çerez özelleştirme menüsü yakında eklenecektir.");
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-x-4 bottom-4 z-[100] rounded-2xl border border-white/15 bg-trinq-navy/95 p-4 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm sm:p-6"
        >
          <div className="mb-5">
            <h3 className="mb-1.5 text-[15px] font-bold text-white">Çerez Tercihleri</h3>
            <p className="text-xs leading-relaxed text-white/60">
              Size platformumuzda daha iyi ve kişiselleştirilmiş bir deneyim sunabilmek için çerezlerden yararlanıyoruz.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <button
              onClick={handleAccept}
              className="min-h-11 flex-1 whitespace-nowrap rounded-lg bg-trinq-accent px-4 py-2.5 text-[13px] font-bold text-white transition-all hover:bg-trinq-accent-hover hover:shadow-md"
            >
              Tümünü Kabul Et
            </button>
            <button
              onClick={handleDecline}
              className="min-h-11 flex-1 whitespace-nowrap rounded-lg border border-trinq-accent/30 px-4 py-2.5 text-[13px] font-semibold text-white transition-all hover:border-trinq-accent/50 hover:bg-white/5"
            >
              Tümünü Reddet
            </button>
          </div>
          <button
            onClick={handleCustomize}
            className="mt-3 w-full text-center text-[12px] font-medium text-white/55 underline transition-colors hover:text-white/85"
          >
            Özelleştir
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
