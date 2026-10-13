"use client";

import Link from "next/link";
import { ArrowRight, Check, Rocket, LineChart, ShieldCheck } from "lucide-react";
import { Section, SectionHeading } from "./ui/Section";
import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";
import { useBusinessLeadModal } from "@/context/BusinessLeadModalContext";
import { PILOT_OFFER } from "@/lib/constants";

/**
 * ⚠️ BU BÖLÜM YAYINDA DEĞİL — yerine <PilotSection /> kullanılıyor.
 *
 * Bölümün adı "Fiyatlandırma" ama içinde hiç fiyat yoktu; yalnızca süresi
 * geçmiş "Haziran'a özel 6 ay ücretsiz" kampanyası vardı. Teklif tek bir
 * kaynağa (lib/constants.ts → PILOT_OFFER) taşındı ve pilot programı
 * koşullarıyla birlikte PilotSection'da anlatılıyor.
 *
 * Gerçek fiyat listesi (paketler, tutarlar) netleştiğinde bu dosya bir
 * fiyatlandırma tablosuna dönüştürülüp ana sayfaya geri takılabilir:
 * <PilotSection /> ile <AboutSection /> arasına koymak ve Header/Footer'a
 * "Fiyatlandırma" bağlantısını eklemek yeterli.
 */
const BENEFITS = [
  ...PILOT_OFFER.includes,
  "Taahhüt yok, istediğiniz zaman çıkabilirsiniz",
  "Komisyon yok, sabit aylık abonelik",
];

const SIDE_CARDS = [
  {
    icon: Rocket,
    title: "Hemen başlayın",
    desc: "Dakikalar içinde işletmenizi sisteme ekleyin.",
  },
  {
    icon: LineChart,
    title: "Müşterilere ulaşın",
    desc: "Yakınınızdaki kullanıcılar kampanyalarınızı keşfetsin.",
  },
  {
    icon: ShieldCheck,
    title: "Taahhütsüz",
    desc: "Gizli ücret ya da cayma bedeli yok.",
  },
];

export default function PricingSection() {
  const { openBusinessLeadModal } = useBusinessLeadModal();

  return (
    <Section id="fiyatlandirma" tone="dark">
      <SectionHeading
        tone="dark"
        eyebrow="Fiyatlandırma"
        title={
          <>
            Önce deneyin, <span className="t-gold">pilot ücretsiz.</span>
          </>
        }
        subtitle="Pilot programa katılan işletmeler trinQ'yu hiçbir ücret ödemeden kullanır."
      />

      <div className="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-[1.4fr_0.8fr]">
        {/* Ana teklif kartı */}
        <Reveal variant="up">
          <div className="relative h-full overflow-hidden rounded-[26px] bg-trinq-cream p-6 text-trinq-navy shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)] sm:rounded-[30px] sm:p-10 lg:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-trinq-gold/25 blur-3xl"
            />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-trinq-navy/15 bg-trinq-navy/5 px-4 py-2 text-xs font-bold tracking-tight">
                Pilot programa katılan işletmelere özel
              </span>

              <h3 className="mt-6 text-3xl font-extrabold leading-[1.08] tracking-tight sm:mt-7 sm:text-4xl lg:text-[2.75rem]">
                Pilot dönem boyunca
                <br />
                tek kuruş ödemeyin.
              </h3>

              <ul className="mt-8 grid gap-3.5 sm:grid-cols-2 sm:gap-4">
                {BENEFITS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] leading-snug">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-trinq-navy text-trinq-cream">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="text-trinq-navy/80">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={openBusinessLeadModal}
                  className="group inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-trinq-navy px-8 text-[15px] font-bold text-trinq-cream shadow-[0_18px_40px_-20px_rgba(17,57,46,0.9)] transition-colors hover:bg-trinq-navy-deep"
                >
                  Ücretsiz başla
                  <ArrowRight
                    size={17}
                    strokeWidth={2.2}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
                <Link
                  href="/#iletisim"
                  className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-trinq-navy/20 px-8 text-[15px] font-semibold text-trinq-navy transition-colors hover:bg-trinq-navy/5"
                >
                  Önce konuşalım
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Yan kartlar */}
        <Stagger className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1" gap={0.09}>
          {SIDE_CARDS.map((card) => (
            <StaggerItem key={card.title}>
              <div className="card-dark h-full p-5 sm:p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-trinq-gold-soft/15 text-trinq-gold-soft">
                  <card.icon size={21} strokeWidth={1.8} />
                </div>
                <h3 className="text-base font-bold tracking-tight text-[#f6f7ef]">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#f6f7ef]/60">{card.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
