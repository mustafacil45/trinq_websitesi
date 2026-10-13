"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Sayfanın en üstünde ince okuma ilerleme çubuğu.
 * Uzun tek sayfalık sitelerde "ne kadar kaldı" hissini verir.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[linear-gradient(90deg,#c8a34a,#e3c779,#f0d98f)]"
      style={{ scaleX }}
    />
  );
}
