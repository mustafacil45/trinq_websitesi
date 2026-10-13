"use client";

import { MapPin, Megaphone, BadgeCheck, Sparkles } from "lucide-react";
import { Section, SectionHeading } from "./ui/Section";
import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";
import ScrollRevealText from "./ui/ScrollRevealText";

const WHAT_WE_DO = [
  {
    icon: MapPin,
    title: "Fırsatı kullanıcıya getiriyoruz",
    desc: "Kullanıcılar çevrelerindeki kampanyaları aramak zorunda kalmıyor; konumlarına göre anında görüyor.",
  },
  {
    icon: Megaphone,
    title: "İşletmeyi doğru kitleyle buluşturuyoruz",
    desc: "Kampanya oluşturmak ve hedef kitleye ulaşmak teknik bilgi gerektirmiyor.",
  },
  {
    icon: BadgeCheck,
    title: "Damga kartını dijitalleştiriyoruz",
    desc: "Yıpranan, kaybolan karton kartların yerini uygulamadaki tek bir kart alıyor.",
  },
  {
    icon: Sparkles,
    title: "Ziyareti deneyime çeviriyoruz",
    desc: "Her alışveriş, bir sonraki ziyarete değer katan bir etkileşime dönüşüyor.",
  },
];

export default function AboutSection() {
  return (
    <Section id="hakkimizda" tone="light">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Hakkımızda"
            title={
              <>
                Keşfi kolay,
                <br />
                sadakati <span className="t-serif text-trinq-navy-mid">gerçek</span> kılıyoruz.
              </>
            }
          />

          {/* Scroll'a bağlı okuma hissi: kelimeler kaydırdıkça netleşir */}
          <div className="mt-6 space-y-4">
            <ScrollRevealText className="t-body text-trinq-muted">
              trinQ, işletmeler ile kullanıcıları daha akıllı ve etkileşimli bir şekilde
              buluşturan yeni nesil bir keşif ve kampanya platformu.
            </ScrollRevealText>
            <ScrollRevealText className="t-body text-trinq-muted">
              Bugün kullanıcılar çevrelerindeki fırsatlardan habersiz, işletmeler ise doğru
              müşteriye ulaşmakta zorlanıyor. Biz bu iki tarafı aynı noktada buluşturuyoruz.
            </ScrollRevealText>
          </div>

          <Reveal variant="up" delay={0.14} className="mt-8">
            <div className="rounded-[22px] border border-trinq-line bg-trinq-navy-soft/60 p-6">
              <p className="t-eyebrow text-trinq-navy-mid">Vizyonumuz</p>
              <p className="mt-3 text-[17px] font-semibold leading-snug tracking-tight text-trinq-navy">
                trinQ&apos;yu sadece bir kampanya uygulaması değil, kullanıcıların bulunduğu
                çevreyle etkileşimini yeniden tanımlayan bir platform haline getirmek.
              </p>
            </div>
          </Reveal>
        </div>

        <Stagger className="grid gap-4 sm:grid-cols-2 sm:gap-5" gap={0.08}>
          {WHAT_WE_DO.map((item) => (
            <StaggerItem key={item.title}>
              <div className="card card-hover h-full p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-trinq-navy-soft text-trinq-navy">
                  <item.icon size={21} strokeWidth={1.9} />
                </div>
                <h3 className="text-[16px] font-bold tracking-tight text-trinq-navy">
                  {item.title}
                </h3>
                <p className="t-body mt-2 text-trinq-muted">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
