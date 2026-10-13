"use client";

import {
  Stamp,
  LayoutDashboard,
  Tags,
  QrCode,
  Building2,
  Activity,
} from "lucide-react";
import { Section, SectionHeading } from "./ui/Section";
import { Stagger, StaggerItem } from "./ui/Reveal";

/**
 * Panelde ŞU AN aktif olan özellikler.
 *
 * Eskiden burada "Müşteri bildirimleri — hedefli bildirimlerle müşterilerinizi
 * tekrar davet edin" maddesi vardı; böyle bir hedefli bildirim aracı henüz
 * yok, bu yüzden kaldırıldı. Yerine veritabanında karşılığı olan kampanya
 * türleri geldi. Yeni bir özellik yayına girdiğinde buraya eklenmeli —
 * bu liste "yol haritası" değil, "bugün kullanabileceklerin" listesidir.
 */
const FEATURES = [
  {
    icon: Stamp,
    title: "Dijital damga kartı",
    desc: "Kaç damgada hangi ödül verileceğini sen belirlersin. Kart müşterinin telefonunda durur; yıpranmaz, kaybolmaz.",
  },
  {
    icon: Tags,
    title: "Kampanya türleri",
    desc: "Genel, öğrenci, hoş geldin ve doğum günü kampanyaları. Tarih aralığı, indirim oranı ve kullanım limiti ayarlanabilir.",
  },
  {
    icon: QrCode,
    title: "Kasada QR ile kullanım",
    desc: "Müşteri kasadaki QR'ı okutur, damga ve kampanya kullanımı anında işlenir. Ek cihaz ya da kasa entegrasyonu gerekmez.",
  },
  {
    icon: LayoutDashboard,
    title: "İşletme paneli",
    desc: "Menü, kampanya, damga kartı ve işletme bilgilerini tek panelden yönetirsin. Kurulumu biz yapıyoruz.",
  },
  {
    icon: Activity,
    title: "Ziyaret ve kullanım takibi",
    desc: "Kampanyanın kaç kez kullanıldığını, işlem ve ziyaret hareketlerini panelden görürsün.",
  },
  {
    icon: Building2,
    title: "Çok şubeli işletmeler",
    desc: "Şubelerini ayrı ayrı tanımlar, kampanyalarını şube bazında veya tümüne birlikte uygularsın.",
  },
];

export default function FeaturesGridSection() {
  return (
    <Section id="ozellikler" tone="paper">
      <SectionHeading
        eyebrow="Özellikler"
        title="Panelde bugün kullanabileceklerin"
        subtitle="Yol haritası değil, şu anda aktif olan özellikler. Yeni bir özellik yayına girdiğinde bu listeye ekliyoruz."
      />

      <Stagger className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3" gap={0.07}>
        {FEATURES.map((f) => (
          <StaggerItem key={f.title}>
            <div className="card card-hover group relative h-full overflow-hidden p-6 sm:p-7">
              {/* hover'da beliren yumuşak ışık */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-trinq-navy/0 blur-2xl transition-colors duration-500 group-hover:bg-trinq-navy/[0.06]"
              />
              <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-trinq-navy-soft text-trinq-navy transition-colors duration-300 group-hover:bg-trinq-navy group-hover:text-trinq-cream">
                <f.icon size={23} strokeWidth={1.8} />
              </div>
              <h3 className="relative text-[17px] font-bold tracking-tight text-trinq-navy">
                {f.title}
              </h3>
              <p className="t-body relative mt-2 text-trinq-muted">{f.desc}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
