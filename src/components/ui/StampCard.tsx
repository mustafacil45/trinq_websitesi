"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check, Gift } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface StampCardProps {
  /** Toplam damga sayısı */
  total?: number;
  /** Kaç tanesi dolu (sonuncusu ödül damgası olur) */
  filled?: number;
  title?: string;
  subtitle?: string;
  reward?: string;
  className?: string;
  /** Koyu zeminde mi duruyor */
  tone?: "light" | "dark";
}

/**
 * Canlı damga kartı.
 *
 * Ekran görüntüsü yerine gerçek DOM: görünür olunca damgalar sırayla doluyor
 * ve sayaç ilerliyor. Böylece hem içerik hiç bayatlamıyor (eski ekran
 * görüntüsünde geçmiş bir "son geçerlilik tarihi" vardı) hem de bölüm
 * scroll ile canlanıyor.
 */
export default function StampCard({
  total = 10,
  filled = 10,
  title = "Kahve Damga Kartın",
  subtitle = "Kafe Merkez · 1,2 km yakında",
  reward = "10. kahve bizden",
  className = "",
  tone = "light",
}: StampCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-18% 0px -18% 0px" });
  const reduce = useReducedMotion();

  const dark = tone === "dark";
  const step = 0.11;
  const lastIndex = total - 1;

  return (
    <div
      ref={ref}
      className={[
        "relative overflow-hidden rounded-[28px] p-6 sm:p-8",
        dark
          ? "border border-white/14 bg-white/[0.06] backdrop-blur-sm"
          : "border border-trinq-line bg-white shadow-[var(--shadow-lg)]",
        className,
      ].join(" ")}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-trinq-gold/14 blur-3xl"
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p
            className={`text-[17px] font-bold tracking-tight sm:text-lg ${
              dark ? "text-[#f6f7ef]" : "text-trinq-navy"
            }`}
          >
            {title}
          </p>
          <p className={`mt-1 text-sm ${dark ? "text-[#f6f7ef]/55" : "text-trinq-muted"}`}>
            {subtitle}
          </p>
        </div>

        {/* sayaç: damgalarla birlikte ilerler */}
        <span
          className={`shrink-0 text-base font-extrabold tabular-nums tracking-tight ${
            dark ? "text-trinq-gold-soft" : "text-trinq-navy-mid"
          }`}
        >
          <Counter to={filled} total={total} active={inView && !reduce} />
        </span>
      </div>

      <div className="relative mt-6 grid grid-cols-5 gap-2.5 sm:gap-3">
        {Array.from({ length: total }).map((_, i) => {
          const isFilled = i < filled;
          const isReward = i === lastIndex;
          const delay = reduce ? 0 : 0.12 + i * step;

          return (
            <div key={i} className="relative aspect-square w-full">
              {/* boş yuva */}
              <span
                className={`absolute inset-0 rounded-full border-2 border-dashed ${
                  dark ? "border-white/18" : "border-trinq-navy/15"
                }`}
              />

              {/* ödül damgasında halka patlaması */}
              {isReward && isFilled && (
                <motion.span
                  aria-hidden
                  className="absolute -inset-[14%] rounded-full border-[3px] border-trinq-gold-bright"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={
                    inView && !reduce
                      ? { opacity: [0, 0.9, 0], scale: [0.6, 1.9, 2.1] }
                      : { opacity: 0 }
                  }
                  transition={{ duration: 0.9, delay: delay + 0.05, ease: EASE }}
                />
              )}

              {isFilled && (
                <motion.span
                  className={`absolute inset-0 flex items-center justify-center rounded-full ${
                    isReward
                      ? "bg-[linear-gradient(145deg,#f0d98f,#c8a34a)] text-trinq-navy shadow-[0_10px_24px_-10px_rgba(200,163,74,0.95)]"
                      : dark
                        ? "bg-trinq-cream text-trinq-navy"
                        : "bg-trinq-navy text-trinq-cream"
                  }`}
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.42,
                    delay,
                    ease: [0.18, 1.5, 0.4, 1],
                  }}
                >
                  {isReward ? (
                    <Gift className="h-[45%] w-[45%]" strokeWidth={2.1} />
                  ) : (
                    <Check className="h-[45%] w-[45%]" strokeWidth={3.2} />
                  )}
                </motion.span>
              )}
            </div>
          );
        })}
      </div>

      {/* ödül satırı */}
      <motion.div
        className={`relative mt-6 flex items-center gap-2.5 rounded-2xl px-4 py-3 ${
          dark ? "bg-trinq-gold-soft/12" : "bg-trinq-gold/12"
        }`}
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: reduce ? 0 : 0.12 + total * step, ease: EASE }}
      >
        <Gift
          size={17}
          strokeWidth={2.1}
          className={dark ? "shrink-0 text-trinq-gold-soft" : "shrink-0 text-trinq-gold"}
        />
        <span
          className={`text-sm font-bold tracking-tight ${
            dark ? "text-[#f6f7ef]" : "text-trinq-navy"
          }`}
        >
          {reward}
        </span>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function Counter({ to, total, active }: { to: number; total: number; active: boolean }) {
  // Damga animasyonuyla aynı ritimde ilerleyen basit sayaç
  return (
    <span className="inline-flex items-baseline gap-0.5">
      <motion.span
        initial={false}
        animate={{ opacity: 1 }}
        className="inline-block"
        aria-hidden
      >
        {active ? <Ticker to={to} /> : to}
      </motion.span>
      <span className="opacity-60"> / {total}</span>
    </span>
  );
}

function Ticker({ to }: { to: number }) {
  // Görünmez bir "ölçer" son değerin genişliğini verir; rakamlar onun
  // üzerine mutlak konumlanır. Aksi hâlde "10" iki satıra bölünüyordu.
  return (
    <span className="relative inline-block whitespace-nowrap text-right">
      <span className="invisible" aria-hidden>
        {to}
      </span>
      {Array.from({ length: to + 1 }).map((_, n) => (
        <motion.span
          key={n}
          className="absolute inset-0 whitespace-nowrap text-right"
          initial={{ opacity: n === 0 ? 1 : 0 }}
          animate={{ opacity: n === to ? 1 : 0 }}
          transition={{ duration: 0.12, delay: 0.12 + n * 0.11 }}
        >
          {n}
        </motion.span>
      ))}
    </span>
  );
}
