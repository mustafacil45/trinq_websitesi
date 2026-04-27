"use client";

import { motion } from "framer-motion";
import { Coffee, Gift } from "lucide-react";

const STAMPS_TOTAL = 10;
const STAMPS_FILLED = 3;

export default function LoyaltyCardAnimation() {
  return (
<section className="bg-[#F8FAFC] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-trinq-navy sm:text-4xl">
          Sadakat Kartı Deneyimi
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-trinq-muted/90">
            Her alışverişte damga kazan, kartını doldur, ödülünü al.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto mt-14 flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* İnteraktif sadakat kartı - 3/10 damga */}
          <div className="w-full max-w-sm overflow-hidden rounded-[24px] bg-gradient-to-br from-trinq-accent to-trinq-accent-light p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-white/20 p-2">
                  <Coffee className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Kahve Dünyası</p>
                  <p className="text-sm text-white/70">10 damgada 1 içecek bedava</p>
                </div>
              </div>
              <motion.span
                className="rounded-full bg-white/25 px-3 py-1.5 text-sm font-bold text-white"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {STAMPS_FILLED}/{STAMPS_TOTAL}
              </motion.span>
            </div>

            <div className="mt-6 grid grid-cols-5 gap-2">
              {Array.from({ length: STAMPS_TOTAL }).map((_, i) => (
                <motion.div
                  key={i}
                  className={`aspect-square rounded-xl ${
                    i < STAMPS_FILLED ? "bg-white" : "bg-white/20"
                  } flex items-center justify-center`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: 0.15 * i,
                  }}
                >
                  {i < STAMPS_FILLED && (
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 400, delay: 0.1 + i * 0.05 }}
                    >
                      <Gift className="h-5 w-5 text-trinq-accent sm:h-6 sm:w-6" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-4 flex items-center justify-center gap-1 text-sm text-white/80"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <span>{STAMPS_TOTAL - STAMPS_FILLED} alışveriş kaldı</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
