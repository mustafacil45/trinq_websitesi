"use client";

import { Repeat, Megaphone, Eye, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "./ui/Section";
import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";
import { useBusinessLeadModal } from "@/context/BusinessLeadModalContext";
import { BUSINESS_PANEL_URL } from "@/lib/constants";
import StampCard from "./ui/StampCard";

/**
 * "İşletmeme ne faydası var?" sorusunun cevabı.
 *
 * Fayda iddiaları bilinçli olarak YAPABİLDİĞİMİZ şeyle sınırlı:
 * "müşteriyi tekrar ziyarete TEŞVİK ET", "kampanyayı KOLAY YÖNET",
 * "uygulamada GÖRÜN". "Cironuzu %30 artırın" tipi, ölçülmemiş sonuç
 * vaatleri yok — sonuçları ölçtükçe bu metinler güçlendirilecek.
 */
const BENEFITS = [
  {
    icon: Repeat,
    title: "Tekrar ziyareti teşvik et",
    desc: "Dijital damga kartı müşteriye bir sonraki ziyaret için somut bir sebep verir. Kartı cebinde taşımasına gerek yok, kaybolmaz.",
  },
  {
    icon: Megaphone,
    title: "Kampanyayı dakikalar içinde yönet",
    desc: "Kampanyayı panelden kurar, anında yayına alır, dilediğinde durdurursun. Tasarım, baskı ya da ajans beklemek yok.",
  },
  {
    icon: Eye,
    title: "Uygulamada ve haritada görün",
    desc: "trinQ kullanıcıları tek uygulamada çevrelerindeki işletmeleri geziyor. İşletmen de bu listede ve haritada yer alır.",
  },
];

export default function BusinessSection() {
  const { openBusinessLeadModal } = useBusinessLeadModal();

  return (
    <Section id="isletmeye-faydasi" tone="light">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Müşterinin gördüğü damga kartı — mobilde metnin altında kalmasın */}
        <motion.div
          className="relative order-2 lg:order-1"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-trinq-navy-soft blur-[80px]"
          />

          <div className="relative mx-auto max-w-[460px]">
            <StampCard
              total={10}
              filled={10}
              title="Kahve Damga Kartı"
              subtitle="İşletmenin adı · müşterinin telefonunda"
              reward="10. kahve bizden"
            />
          </div>

          <p className="relative mt-4 text-center text-[13px] font-medium text-trinq-muted">
            Kurduğun damga kartı müşterinin telefonunda böyle görünür
          </p>
        </motion.div>

        {/* Metin */}
        <div className="order-1 lg:order-2">
          <Reveal variant="up">
            <span className="t-eyebrow inline-flex items-center gap-2 text-trinq-navy-mid">
              <span aria-hidden className="h-px w-6 bg-trinq-navy-mid/40" />
              İşletmene faydası
            </span>
            <h2 className="t-h2 mt-4 text-trinq-navy">
              Kendi uygulamanı yazdırmana
              <br />
              <span className="t-serif text-trinq-navy-mid">gerek yok.</span>
            </h2>
            <p className="t-lead mt-5 max-w-lg text-trinq-muted">
              Geliştirme maliyeti, teknik altyapı ve bakım derdi olmadan dijital
              sadakat programını başlatırsın. Panel hazır, uygulama yayında,
              kullanıcı tabanı ortak.
            </p>
          </Reveal>

          <Stagger className="mt-9 flex flex-col gap-5" gap={0.1}>
            {BENEFITS.map((b) => (
              <StaggerItem key={b.title} className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-trinq-navy text-trinq-cream">
                  <b.icon size={21} strokeWidth={1.9} />
                </div>
                <div>
                  <h3 className="text-base font-bold tracking-tight text-trinq-navy sm:text-lg">
                    {b.title}
                  </h3>
                  <p className="t-body mt-1 text-trinq-muted">{b.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal variant="up" delay={0.1} className="mt-10">
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={openBusinessLeadModal}
                className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-trinq-navy px-8 text-[15px] font-bold text-trinq-cream shadow-[0_16px_40px_-20px_rgba(17,57,46,0.9)] transition-colors hover:bg-trinq-navy-deep"
              >
                İşletmeni trinQ&apos;ya ekle
                <ArrowRight
                  size={17}
                  strokeWidth={2.2}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
              <a
                href={BUSINESS_PANEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-trinq-line px-8 text-[15px] font-semibold text-trinq-navy transition-colors hover:border-trinq-navy/25 hover:bg-trinq-navy-soft"
              >
                Panele giriş yap
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
