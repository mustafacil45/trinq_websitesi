"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export type RevealVariant = "up" | "down" | "left" | "right" | "fade" | "scale" | "blur";

const OFFSETS: Record<RevealVariant, { x?: number; y?: number; scale?: number; filter?: string }> = {
  up: { y: 34 },
  down: { y: -34 },
  left: { x: 34 },
  right: { x: -34 },
  fade: {},
  scale: { scale: 0.94 },
  blur: { y: 18, filter: "blur(10px)" },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Hareket yönü / tipi */
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  /**
   * Görünürlük eşiği.
   *
   * Üst kenarda ARTIK negatif margin yok. Eskiden "-12%" vardı ve menüden
   * bir bölüme atlayınca (anchor scroll) ekranın üst kısmındaki içerik
   * henüz "görünür" sayılmadığı için bölüm bomboş açılıyordu.
   */
  margin?: string;
  once?: boolean;
  as?: "div" | "section" | "li" | "span" | "p";
}

/**
 * Tek bir elemanı scroll ile ortaya çıkarır.
 * prefers-reduced-motion açıkken hareket yok, içerik anında görünür.
 */
export function Reveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
  duration = 0.6,
  margin = "0px 0px -8% 0px",
  once = true,
  as = "div",
}: RevealProps) {
  // NOT: hareket tercihi <MotionConfig reducedMotion="user"> ile ele alınıyor.
  // Burada DOM'u dallandırmak SSR/istemci uyuşmazlığı yaratıyordu.
  const M = motion[as];
  const from = OFFSETS[variant];

  return (
    <M
      className={className}
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once, margin }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </M>
  );
}

/* -------------------------------------------------------------------------- */

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Çocuklar arası gecikme */
  gap?: number;
  delay?: number;
  margin?: string;
  once?: boolean;
}

/**
 * Çocuklarını sırayla ortaya çıkarır. Çocuklar <StaggerItem> olmalı.
 */
export function Stagger({
  children,
  className = "",
  gap = 0.07,
  delay = 0.03,
  // bkz. <Reveal> içindeki not: üst kenarda negatif margin yok
  margin = "0px 0px -6% 0px",
  once = true,
}: StaggerProps) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: gap, delayChildren: delay } },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin }}
    >
      {children}
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function StaggerItem({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "a";
}) {
  const M = motion[as];

  return (
    <M className={className} variants={itemVariants}>
      {children}
    </M>
  );
}

export default Reveal;
