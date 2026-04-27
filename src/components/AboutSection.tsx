"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const easing = [0.22, 1, 0.36, 1] as const;

const PANEL_SLIDES = [
  { src: "/panel-isletme-yonetimi.png", alt: "İşletme yönetimi – şube bilgileri, harita, çalışma saatleri" },
  { src: "/panel-kampanya.png", alt: "Kampanya yönetimi – kampanya listesi ve istatistikler" },
  { src: "/panel-dashboard.png", alt: "Dashboard – ekstra ciro, müşteri durumu, bugün özeti" },
  { src: "/panel-satislar.png", alt: "Satışlar – fiş listesi, kampanya oranı, işlemler" },
];

export default function AboutSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const goTo = useCallback((nextIndex: number) => {
    const i = Math.max(0, Math.min(nextIndex, PANEL_SLIDES.length - 1));
    setIndex(i);
    const el = scrollRef.current;
    if (el) {
      const width = el.offsetWidth;
      el.scrollTo({ left: width * i, behavior: "smooth" });
    }
  }, []);

  const goNext = () => goTo(index + 1);
  const goPrev = () => goTo(index - 1);

  return (
    <section
      className="relative min-h-[90vh] overflow-hidden bg-background py-20 sm:py-24 lg:py-28"
      id="hakkimizda"
    >
      <div className="relative mx-auto max-w-7xl px-6 pt-4 sm:px-8 lg:px-12">
        {/* Üst: Başlık + açıklama */}
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: easing }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-trinq-navy sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            İşletmenizi Dijitalin Gücüyle Yönetin
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-trinq-muted lg:mx-0 lg:max-w-xl">
            Kampanyalarını oluştur, sadakat sistemini yönet ve performansını kolayca takip et. trinQ panel ile her şey senin kontrolünde.
          </p>
        </motion.div>

        {/* Alt: Panel görselleri – daraltılmış genişlik, ortada */}
        <motion.div
          className="relative mx-auto mt-10 w-full max-w-3xl sm:max-w-4xl lg:mt-14 lg:max-w-5xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.05, ease: easing }}
        >
          <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-xl">
            <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-trinq-accent-light/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-trinq-accent/80" />
              </div>
              <div className="ml-4 flex-1 rounded-lg bg-white px-3 py-1.5 text-center text-xs text-slate-400 shadow-inner">
                panel.trinQ.com
              </div>
            </div>
            <div className="relative">
              {/* Sol ok – önceki slide */}
              <button
                type="button"
                onClick={goPrev}
                disabled={index === 0}
                className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-trinq-navy shadow-lg ring-1 ring-slate-200/80 transition hover:bg-white disabled:pointer-events-none disabled:opacity-40"
                aria-label="Önceki ekran"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              {/* Sağ ok – sonraki slide */}
              <button
                type="button"
                onClick={goNext}
                disabled={index === PANEL_SLIDES.length - 1}
                className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-trinq-navy shadow-lg ring-1 ring-slate-200/80 transition hover:bg-white disabled:pointer-events-none disabled:opacity-40"
                aria-label="Sonraki ekran"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <div
                ref={scrollRef}
                className="flex overflow-x-auto bg-slate-100 scrollbar-hide"
                style={{
                  scrollSnapType: "x mandatory",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
                onScroll={() => {
                  const el = scrollRef.current;
                  if (!el) return;
                  const width = el.offsetWidth;
                  const i = Math.round(el.scrollLeft / width);
                  setIndex(Math.min(i, PANEL_SLIDES.length - 1));
                }}
              >
                {PANEL_SLIDES.map((slide) => (
                  <div
                    key={slide.src}
                    className="relative min-w-full flex-shrink-0 bg-slate-100"
                    style={{ scrollSnapAlign: "start" }}
                  >
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      className="h-auto w-full object-contain object-top"
                    />
                  </div>
                ))}
              </div>
            </div>
            <p className="border-t border-slate-100 bg-slate-50/80 px-4 py-2 text-center text-xs text-slate-500">
              Ok işaretine tıklayarak veya sağa sola kaydırarak geçiş yapabilirsiniz
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
