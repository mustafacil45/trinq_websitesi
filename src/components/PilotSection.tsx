"use client";

import { ArrowRight, Check, HelpCircle } from "lucide-react";
import { Section, SectionHeading } from "./ui/Section";
import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";
import { useBusinessLeadModal } from "@/context/BusinessLeadModalContext";
import { PILOT_OFFER } from "@/lib/constants";

/**
 * PİLOT PROGRAM — sitedeki TEK teklif.
 *
 * Eskiden dört ayrı teklif dolaşıyordu ("Haziran'a özel 6 ay ücretsiz",
 * "14 gün demo", "ücretsiz kurulum", "ücretsiz pilot"). Hepsi tek bir
 * teklifte birleştirildi ve işletme sahibinin aklındaki beş soru burada
 * açıkça cevaplanıyor:
 *
 *   1. Pilot ne kadar sürüyor?
 *   2. Hangi hizmetler ücretsiz?
 *   3. Ödeme / taahhüt isteniyor mu?
 *   4. Pilot sonrasında ücretlendirme olacak mı?
 *   5. Başvurudan sonra hangi adımlar var?
 *
 * Teklif metinleri lib/constants.ts'teki PILOT_OFFER'dan gelir — SSS ve
 * iletişim bölümü de aynı kaynaktan beslenir, böylece iki yer çelişemez.
 */
const TERMS = [
  {
    q: "Pilot ne kadar sürüyor?",
    a: PILOT_OFFER.duration
      ? `Pilot dönem ${PILOT_OFFER.duration} sürüyor.`
      : "Pilot dönem için sabit bir süre açıklamıyoruz — programı yeni başlattığımız için dürüst olan bu. Dönemin bitişini, siz karar vermeden önce yazılı olarak bildiriyoruz.",
  },
  {
    q: "İşletmeden ödeme ya da taahhüt isteniyor mu?",
    a: "Hayır. Kredi kartı bilgisi istemiyoruz, kurulum ücreti almıyoruz, süre taahhüdü yok. İstediğiniz an ayrılabilirsiniz.",
  },
  {
    q: "Pilot sonrasında ücretlendirme olacak mı?",
    a: PILOT_OFFER.pricingAfter,
  },
  {
    q: "İşletmeden ne bekliyoruz?",
    a: "Kasada QR'ın müşterinin görebileceği bir yerde durmasını, en az bir aktif kampanya ya da damga kartı tanımlanmasını ve işleyişle ilgili geri bildirim vermenizi. Hepsi bu.",
  },
];

const STEPS = [
  {
    title: "Başvuru",
    desc: "Formdaki birkaç alanı doldurmanız yeterli — yaklaşık iki dakika sürüyor.",
  },
  {
    title: "Ön görüşme",
    desc: "Başvurunuzu aldıktan sonra sizinle iletişime geçiyor, işletmenize uygun kampanya ve damga kurgusunu birlikte belirliyoruz.",
  },
  {
    title: "Kurulum",
    desc: "Panelinizi açıyoruz; menü, kampanya ve işletme bilgilerinizi yüklüyoruz, kasa için QR'ınızı gönderiyoruz. Kurulum için ücret almıyoruz.",
  },
  {
    title: "Yayın",
    desc: "İşletmeniz uygulamada ve haritada görünür hâle geliyor. Pilot dönem buradan başlıyor.",
  },
];

export default function PilotSection() {
  const { openBusinessLeadModal } = useBusinessLeadModal();

  return (
    <Section id="pilot" tone="paper">
      <SectionHeading
        eyebrow="Pilot program"
        title={
          <>
            Ücretsiz pilot:
            <br />
            önce <span className="t-serif text-trinq-navy-mid">deneyin</span>, sonra
            karar verin.
          </>
        }
        subtitle="Tek bir teklif sunuyoruz ve koşullarını buraya açıkça yazıyoruz. Gizli ücret, süresi geçmiş kampanya ya da küçük yazı yok."
      />

      <div className="mt-12 grid gap-5 sm:mt-16 lg:grid-cols-[1.15fr_0.85fr]">
        {/* ------------- Teklif kartı ------------- */}
        <Reveal variant="up">
          <div className="relative h-full overflow-hidden rounded-[26px] bg-trinq-navy p-6 text-trinq-cream shadow-[var(--shadow-xl)] sm:rounded-[30px] sm:p-9 lg:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-trinq-gold/20 blur-3xl"
            />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-trinq-cream/20 bg-trinq-cream/10 px-4 py-2 text-xs font-bold tracking-tight">
                Kafe ve restoranlara açık
              </span>

              <h3 className="mt-6 text-3xl font-extrabold leading-[1.08] tracking-tight sm:mt-7 sm:text-4xl">
                Pilot dönem boyunca
                <br />
                <span className="t-gold">tek kuruş ödemeyin.</span>
              </h3>

              <p className="mt-5 text-[15px] font-semibold uppercase tracking-[0.14em] text-trinq-cream/50">
                Pilotta ücretsiz olanlar
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-x-5">
                {PILOT_OFFER.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] leading-snug">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-trinq-gold-bright text-trinq-navy">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="text-trinq-cream/85">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Beş sorunun cevabı — tek tek, kaçamaksız */}
              <dl className="mt-9 flex flex-col gap-5 border-t border-trinq-cream/12 pt-7">
                {TERMS.map((t) => (
                  <div key={t.q} className="flex items-start gap-3">
                    <HelpCircle
                      size={17}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-trinq-gold-soft"
                    />
                    <div>
                      <dt className="text-[15px] font-bold tracking-tight text-trinq-cream">
                        {t.q}
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-trinq-cream/60">
                        {t.a}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>

              <button
                type="button"
                onClick={openBusinessLeadModal}
                className="group mt-9 inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-trinq-cream px-8 text-[15px] font-bold text-trinq-navy transition-shadow hover:shadow-[0_18px_44px_-18px_rgba(240,217,143,0.8)] sm:w-auto"
              >
                Pilot programa başvur
                <ArrowRight
                  size={17}
                  strokeWidth={2.2}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </Reveal>

        {/* ------------- Başvuru sonrası adımlar ------------- */}
        <div>
          <Reveal variant="up" delay={0.08}>
            <h3 className="t-h3 text-trinq-navy">Başvurudan sonra ne oluyor?</h3>
            <p className="t-body mt-2 text-trinq-muted">
              Süreç dört adımdan oluşuyor; hiçbirinde ödeme istenmiyor.
            </p>
          </Reveal>

          <Stagger className="relative mt-7 flex flex-col gap-6" gap={0.09}>
            {/* adımları birbirine bağlayan dikey çizgi */}
            <span
              aria-hidden
              className="absolute left-[17px] top-3 h-[calc(100%-2.5rem)] w-px bg-trinq-navy/12"
            />

            {STEPS.map((s, i) => (
              <StaggerItem key={s.title} className="relative flex items-start gap-4">
                <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-trinq-line bg-white text-sm font-bold text-trinq-navy shadow-[var(--shadow-xs)]">
                  {i + 1}
                </span>
                <div className="pt-1">
                  <h4 className="text-[16px] font-bold tracking-tight text-trinq-navy">
                    {s.title}
                  </h4>
                  <p className="t-body mt-1 text-trinq-muted">{s.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  );
}
