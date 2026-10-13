"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

/**
 * Scroll'a BAĞLI metin açılımı.
 *
 * Sitedeki <Reveal> bir kez tetiklenip biter (scroll-triggered). Bu bileşen
 * ise ilerlemeyi scroll konumuna bağlar (scroll-linked): kelimeler siz
 * kaydırdıkça sırayla netleşir, yukarı kaydırınca geri soluklaşır. Uzun bir
 * paragrafın "okunuyor" hissi vermesi için.
 *
 * NOT: Bileşen koşullu DOM dallanması yapmaz — hareket tercihi
 * <MotionConfig reducedMotion="user"> ile üst seviyede ele alınıyor.
 * (bkz. AppShowcaseSection'daki hydration notu)
 */

/** Kelime net olmadan önceki opaklık — okunabilirliği koruyacak kadar yüksek */
const DIM = 0.22;

interface Props {
  children: string;
  className?: string;
}

export default function ScrollRevealText({ children, className = "" }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);

  // Paragrafın üstü ekranın %82'sine geldiğinde başlar, %35'ine geldiğinde biter.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.55"],
  });

  const words = children.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          progress={scrollYProgress}
          // Kelimeler sırayla netleşsin; aralıklar hafifçe üst üste biner.
          start={i / words.length}
          end={(i + 1.6) / words.length}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  start,
  end,
}: {
  children: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [DIM, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
      {/* kelime arası boşluk — inline-block olduğu için elle veriliyor */}
      <span>&nbsp;</span>
    </motion.span>
  );
}
