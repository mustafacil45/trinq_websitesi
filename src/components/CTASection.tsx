"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Section } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import StoreBadges from "./StoreBadges";
import { useBusinessLeadModal } from "@/context/BusinessLeadModalContext";
import { CONTACT_EMAIL, INSTAGRAM_URL, PILOT_OFFER } from "@/lib/constants";

/**
 * Sayfanın son çağrısı — kitleye göre tek bir aksiyon:
 *
 *   business → ana sayfa. Başvuru. Mağaza rozetleri burada YOK; indirme
 *              butonu sayfanın tek hedefi olan başvuruyla yarışıyordu.
 *   user     → /kullanicilar. Eski indirme CTA'sı; silinmedi, taşındı.
 */
export default function CTASection({
  variant = "business",
}: {
  variant?: "business" | "user";
}) {
  const { openBusinessLeadModal } = useBusinessLeadModal();
  const isBusiness = variant === "business";

  return (
    <Section id={isBusiness ? "basvuru" : "indir"} tone="dark">
      <div className="relative mx-auto max-w-3xl text-center">
        {/* altın parıltı */}
        <div
          aria-hidden
          className="sd-parallax pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[560px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-trinq-gold/12 blur-[110px]"
          style={{ "--sd-from": "60px", "--sd-to": "-60px" } as React.CSSProperties}
        />

        <Reveal variant="up" className="relative">
          <motion.img
            src="/trinq-logo.png"
            alt="trinQ"
            className="mx-auto h-[70px] w-auto object-contain sm:h-[86px]"
            initial={{ opacity: 0, scale: 0.86 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </Reveal>

        <Reveal variant="up" delay={0.08} className="relative">
          <h2 className="t-h2 mt-7 text-[#f6f7ef]">
            {isBusiness ? (
              <>
                Müdavim biriktirmeye
                <br />
                <span className="t-gold">bugün başla.</span>
              </>
            ) : (
              <>
                Damga biriktirmeye
                <br />
                <span className="t-gold">bugün başla.</span>
              </>
            )}
          </h2>
        </Reveal>

        <Reveal variant="up" delay={0.14} className="relative">
          <p className="t-lead mx-auto mt-5 max-w-xl text-[#f6f7ef]/70">
            {isBusiness
              ? "İşletmeni trinQ'ya ekle; damga kartını ve kampanyalarını birlikte kuralım. Pilot dönem boyunca ücretsiz, taahhüt yok."
              : "Uygulamayı indir, favori mekânlarındaki kampanyaları keşfet, harcadıkça damga kazan. Kullanıcılar için tamamen ücretsiz."}
          </p>
        </Reveal>

        {isBusiness ? (
          <>
            <Reveal variant="up" delay={0.2} className="relative mt-10">
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <motion.button
                  type="button"
                  onClick={openBusinessLeadModal}
                  className="group inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-trinq-cream px-8 text-[15px] font-bold tracking-tight text-trinq-navy shadow-[0_16px_40px_-18px_rgba(240,217,143,0.75)] transition-shadow hover:shadow-[0_20px_50px_-18px_rgba(240,217,143,0.95)] sm:w-auto"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  İşletmeni trinQ&apos;ya ekle
                  <ArrowRight
                    size={17}
                    strokeWidth={2.2}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </motion.button>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full border border-white/20 px-8 text-[15px] font-semibold text-[#f6f7ef] transition-colors hover:bg-white/8 sm:w-auto"
                >
                  <Mail size={16} strokeWidth={2} />
                  Önce sorularım var
                </a>
              </div>
            </Reveal>

            <Reveal variant="fade" delay={0.3} className="relative">
              <p className="mt-8 text-sm text-[#f6f7ef]/45">{PILOT_OFFER.shortNote}</p>
              <p className="mt-3 text-sm text-[#f6f7ef]/45">
                Uygulamayı kullanmak için mi geldin?{" "}
                <Link
                  href="/kullanicilar"
                  className="font-semibold text-trinq-gold-soft underline-offset-4 hover:underline"
                >
                  Kullanıcı sayfası
                </Link>
              </p>
            </Reveal>
          </>
        ) : (
          <>
            <Reveal variant="up" delay={0.2} className="relative mt-10 flex justify-center">
              <StoreBadges className="items-center sm:items-start" tone="dark" />
            </Reveal>

            <Reveal variant="fade" delay={0.3} className="relative">
              <p className="mt-10 text-sm text-[#f6f7ef]/45">
                Yenilikleri takip et —{" "}
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-trinq-gold-soft underline-offset-4 hover:underline"
                >
                  @trinqapptr
                </a>
              </p>
            </Reveal>
          </>
        )}
      </div>
    </Section>
  );
}
