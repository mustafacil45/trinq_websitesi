"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { QrCode, Stamp, Gift, ArrowRight, Coffee } from "lucide-react";
import { Section } from "./ui/Section";
import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";
import StampCard from "./ui/StampCard";

/**
 * KULLANICI tarafındaki üç adım. Bu bölüm artık ana sayfada değil,
 * /kullanicilar sayfasında yayınlanıyor: ana sayfa işletme kazanımına
 * odaklandığı için iki kitleye birden seslenmiyor. İçerik silinmedi, taşındı.
 *
 * Aynı akışın işletme tarafındaki anlatımı <HowItWorksSection>'da.
 */
const STEPS = [
  {
    icon: QrCode,
    title: "Kasada QR'ı okut",
    desc: "Tek bir okutma yeterli. Kart çıkarmak, kod ezberlemek, uygulama aramak yok.",
  },
  {
    icon: Stamp,
    title: "Damgan anında düşsün",
    desc: "Harcaman ve damgaların uygulamana otomatik işlenir. Hiçbir şey kaybolmaz.",
  },
  {
    icon: Gift,
    title: "Ödülünü al",
    desc: "Kartın dolduğunda haberin olur, ödülünü kasada anında kullanırsın.",
  },
];

export default function UsersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yCard = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yMini = useTransform(scrollYProgress, [0, 1], [-16, 46]);

  return (
    <Section id="sistem" tone="light">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* ---------------- Metin ---------------- */}
        <div>
          <Reveal variant="up">
            <span className="t-eyebrow inline-flex items-center gap-2 text-trinq-navy-mid">
              <span aria-hidden className="h-px w-6 bg-trinq-navy-mid/40" />
              Nasıl çalışır
            </span>
            <h2 className="t-h2 mt-4 text-trinq-navy">
              Her kahve seni bir
              <br />
              <span className="t-serif text-trinq-navy-mid">sonrakine</span> yaklaştırsın.
            </h2>
            <p className="t-lead mt-5 max-w-lg text-trinq-muted">
              Üç adım, hepsi bu. Karton damga kartı dönemi bitti — trinQ arka planda çalışır,
              sen sadece kahveni al. Kullanıcılar için tamamen ücretsiz.
            </p>
          </Reveal>

          <Stagger className="mt-9 flex flex-col gap-5" gap={0.1}>
            {STEPS.map((s, i) => (
              <StaggerItem key={s.title} className="flex items-start gap-4">
                <div
                  className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                    i === STEPS.length - 1
                      ? "bg-[linear-gradient(145deg,#f0d98f,#c8a34a)] text-trinq-navy"
                      : "bg-trinq-navy-soft text-trinq-navy"
                  }`}
                >
                  <s.icon size={22} strokeWidth={1.9} />
                  {/* adım numarası — rozetin köşesinde, sırayı okunur kılar */}
                  <span
                    aria-hidden
                    className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-trinq-navy text-[10px] font-bold text-trinq-cream"
                  >
                    {i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold tracking-tight text-trinq-navy sm:text-lg">
                    {s.title}
                  </h3>
                  <p className="t-body mt-1 text-trinq-muted">{s.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal variant="up" delay={0.1} className="mt-10">
            <Link
              href="#indir"
              className="group inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-trinq-navy px-8 text-[15px] font-bold text-trinq-cream shadow-[0_16px_40px_-20px_rgba(17,57,46,0.9)] transition-all hover:bg-trinq-navy-deep sm:w-auto"
            >
              Uygulamayı indir
              <ArrowRight
                size={17}
                strokeWidth={2.2}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        {/* ---------------- Canlı damga kartı ---------------- */}
        <div ref={ref} className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-trinq-navy-soft blur-[80px]"
          />

          <motion.div data-parallax style={{ y: yCard }} className="relative mx-auto max-w-[460px]">
            <StampCard
              total={10}
              filled={10}
              title="Kahve Damga Kartın"
              subtitle="Kafe Merkez · 1,2 km yakında"
              reward="10. kahve bizden"
            />
          </motion.div>

          {/* ikinci, küçük kart — kampanya önerisi */}
          <motion.div
            data-parallax
            style={{ y: yMini }}
            className="relative mx-auto mt-5 max-w-[400px] sm:-mt-2 sm:ml-auto sm:mr-0 sm:max-w-[330px] sm:translate-x-6"
          >
            <Reveal variant="up" delay={0.25}>
              <div className="card flex items-center gap-4 p-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(140deg,#c98f4e,#6b3f1f)] text-white">
                  <Coffee size={22} strokeWidth={1.9} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-bold tracking-tight text-trinq-navy">
                    Öğrenciye kahve %20
                  </span>
                  <span className="mt-0.5 block text-[13px] text-trinq-muted">
                    Kafe Merkez · 1,2 km yakında
                  </span>
                </span>
              </div>
            </Reveal>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
