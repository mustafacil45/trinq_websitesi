"use client";

import { Repeat, CreditCard, EyeOff, LineChart } from "lucide-react";
import { Section, SectionHeading } from "./ui/Section";
import { Stagger, StaggerItem } from "./ui/Reveal";

/**
 * Ana sayfanın ikinci durağı: ziyaretçinin kendi problemini tanıması.
 *
 * Buradaki maddeler bilinçli olarak İSTATİSTİKSİZ. Ölçülmüş müşteri kazanımı
 * verimiz olmadığı için "müşteriyi geri getirmek X kat daha ucuz" gibi
 * kaynaksız iddialar yerine, işletmenin günlük olarak yaşadığı somut
 * durumlar anlatılıyor. Veri toplandıkça bu bölüm güçlendirilebilir.
 */
const PROBLEMS = [
  {
    icon: Repeat,
    title: "Müşteri bir kez geliyor",
    desc: "Kapıdan giren müşteriyi tekrar davet edecek bir aracın yok. Hesap kapanınca bağ da kapanıyor.",
  },
  {
    icon: CreditCard,
    title: "Karton damga kartı kayboluyor",
    desc: "Yıpranıyor, cüzdanda unutuluyor, yeniden basılıyor. Kimin kaç damgası var — kimse tam bilmiyor.",
  },
  {
    icon: EyeOff,
    title: "Kampanyayı kimse görmüyor",
    desc: "Kampanyayı hazırlıyorsun ama yalnızca o an içeride olan müşteri fark ediyor. Dışarıdaki potansiyel müşteriye ulaşmıyor.",
  },
  {
    icon: LineChart,
    title: "Sonuç ölçülemiyor",
    desc: "Hangi kampanya işe yaradı, kaç müşteri geri döndü? Elinde kasa cirosundan başka bir veri yok.",
  },
];

export default function ProblemSection() {
  return (
    <Section id="problem" tone="light">
      <SectionHeading
        eyebrow="İşletmenin problemi"
        title={
          <>
            Yeni müşteri bulmak kolay.
            <br />
            Zor olan, <span className="t-serif text-trinq-navy-mid">geri getirmek.</span>
          </>
        }
        subtitle="Bir kafenin cirosunu yapan şey tek seferlik ziyaretler değil, tekrar gelen müdavimler. Ama çoğu işletmede müşteriyi tekrar davet edecek bir sistem yok."
      />

      <Stagger
        className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5"
        gap={0.08}
      >
        {PROBLEMS.map((p) => (
          <StaggerItem key={p.title}>
            <div className="card card-hover flex h-full items-start gap-4 p-6 sm:gap-5 sm:p-7">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-trinq-navy-soft text-trinq-navy-mid">
                <p.icon size={22} strokeWidth={1.9} />
              </div>
              <div>
                <h3 className="text-[17px] font-bold tracking-tight text-trinq-navy">
                  {p.title}
                </h3>
                <p className="t-body mt-2 text-trinq-muted">{p.desc}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Problemden çözüme köprü — bir sonraki bölümün sorusunu kurar */}
      <p className="mx-auto mt-12 max-w-2xl text-center text-[17px] font-semibold leading-snug tracking-tight text-trinq-navy sm:mt-14 sm:text-lg">
        trinQ bu dört şeyi tek bir yerde çözüyor:{" "}
        <span className="text-trinq-muted">
          dijital damga kartı, kampanya yönetimi, uygulamada görünürlük ve
          ziyaret takibi.
        </span>
      </p>
    </Section>
  );
}
