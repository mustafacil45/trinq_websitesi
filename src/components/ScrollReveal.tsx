"use client";

import { motion } from "framer-motion";

const defaultReveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function ScrollReveal({ children, className = "", delay = 0, direction = "up" }: ScrollRevealProps) {
  const y = direction === "up" ? 32 : direction === "down" ? -32 : 0;
  const x = direction === "left" ? 24 : direction === "right" ? -24 : 0;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: direction === "up" || direction === "down" ? y : 0, x: x !== 0 ? x : 0 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;
