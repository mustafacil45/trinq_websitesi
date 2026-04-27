"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Store, Download, Receipt, Star } from "lucide-react";

const STATS = [
  { icon: Store, value: 50, suffix: "+", label: "Anlaşmalı İşletme" },
  { icon: Download, value: 10, suffix: "K+", label: "Uygulama İndirme" },
  { icon: Receipt, value: 100, suffix: "K+", label: "İşlenen Fiş" },
  { icon: Star, value: 4.8, suffix: "", label: "Uygulama Puanı", isDecimal: true },
];

function AnimatedCounter({
  target,
  suffix,
  isDecimal = false,
  inView,
}: {
  target: number;
  suffix: string;
  isDecimal?: boolean;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [inView, target, isDecimal]);

  return (
    <span className="tabular-nums">
      {isDecimal ? count.toFixed(1) : count}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 sm:py-24"
      style={{
        background:
          "linear-gradient(135deg, #11392e 0%, #0c251e 50%, #143d32 100%)",
      }}
    >
      {/* Dekoratif arka plan */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-trinq-accent/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/8 blur-[80px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Rakamlarla trinQ
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
            Her geçen gün büyüyen ağımızla kullanıcılarımıza ve işletmelerimize
            değer katıyoruz.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="group relative flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-center backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white transition-colors group-hover:bg-white/15">
                <stat.icon size={28} />
              </div>
              <span className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  isDecimal={stat.isDecimal}
                  inView={isInView}
                />
              </span>
              <span className="mt-2 text-sm font-medium text-white/60">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
