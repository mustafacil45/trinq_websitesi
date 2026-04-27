/**
 * Paylaşılan Framer Motion varyantları – premium loyalty site
 * Scroll reveal, stagger ve micro-interaction için tutarlı değerler
 */

export const easing = [0.22, 1, 0.36, 1] as const; // easeOutExpo

export const viewportOnce = { once: true, margin: "-60px" as const };
export const viewportTight = { once: true, margin: "-40px" as const };

/** Bölüm başlığı: fade + slide up */
export const sectionHeading = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: viewportOnce,
  transition: { duration: 0.55, ease: easing },
};

/** Kart / blok: fade + slide up (stagger ile kullanılabilir) */
export const cardReveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: viewportTight,
  transition: { duration: 0.5, ease: easing },
};

/** Stagger container */
export const staggerContainer = {
  initial: "hidden",
  whileInView: "visible",
  viewport: viewportOnce,
  variants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  },
};

export const staggerItem = {
  variants: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: easing },
    },
  },
};

/** CTA buton: hover scale, tap scale */
export const ctaButtonMotion = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 400, damping: 17 },
};
