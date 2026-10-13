"use client";

import { motion } from "framer-motion";
import { Store, Stamp, QrCode, BarChart3 } from "lucide-react";
import { Section } from "./ui/Section";
import { Reveal, Stagger, StaggerItem } from "./ui/Reveal";
import { useBusinessLeadModal } from "@/context/BusinessLeadModalContext";
import PhoneFrame from "./ui/PhoneFrame";

/**
 * "trinQ nasıl çalışır?" — İŞLETME tarafından anlatım.
 *
 * Kullanıcı tarafındaki üç adım (QR okut → damga → ödül) silinmedi;
 * UsersSection'da duruyor ve artık /kullanicilar sayfasında yayınlanıyor.
 * Burada aynı akış işletmenin gözünden anlatılıyor: panelde ne yapıyorum,
 * kasada ne oluyor, sonra neyi görüyorum.
 *
 * Adımların yanında GERÇEK işletme paneli ekran görüntüsü ve müşterinin
 * telefonundaki gerçek uygulama ekranı duruyor — ürünün gerçekten çalıştığını
 * göstermek güven için en etkili içerik.
 */
const STEPS = [
  {
    icon: Store,
    title: "İşletmeni panele ekle",
    desc: "Logonu, adresini, menünü ve varsa şubelerini tek seferde tanımlarsın. Kurulumu biz yapıyoruz; teknik bilgi gerekmez.",
  },
  {
    icon: Stamp,
    title: "Damga kartını ve kampanyanı kur",
    desc: "“10 kahve alana 1 ücretsiz” ya da “öğrenciye %20” — kuralı, tarih aralığını ve kullanım limitini panelden dakikalar içinde belirlersin.",
  },
  {
    icon: QrCode,
    title: "Müşteri kasada QR'ı okutur",
    desc: "Damga ve kampanya kullanımı müşterinin telefonuna otomatik işlenir. Kasiyer için ekstra iş yükü, karton kart ya da yeni cihaz yok.",
  },
  {
    icon: BarChart3,
    title: "Panelden takip et",
    desc: "Hangi kampanya kaç kez kullanıldı, kaç ziyaret geldi, hangi şube nasıl gidiyor — hepsi tek ekranda.",
  },
];

export default function HowItWorksSection() {
  const { openBusinessLeadModal } = useBusinessLeadModal();

  return (
    <Section id="nasil-calisir" tone="paper">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.02fr] lg:gap-16">
        {/* ---------------- Adımlar ---------------- */}
        <div>
          <Reveal variant="up">
            <span className="t-eyebrow inline-flex items-center gap-2 text-trinq-navy-mid">
              <span aria-hidden className="h-px w-6 bg-trinq-navy-mid/40" />
              trinQ nasıl çalışır
            </span>
            <h2 className="t-h2 mt-4 text-trinq-navy">
              Panelden kur, kasada okut,
              <br />
              müşterinin telefonunda{" "}
              <span className="t-serif text-trinq-navy-mid">biriksin.</span>
            </h2>
            <p className="t-lead mt-5 max-w-lg text-trinq-muted">
              Dört adım. Uygulama yazdırmana, cihaz almana ya da kasa sistemini
              değiştirmene gerek yok.
            </p>
          </Reveal>

          <Stagger className="mt-9 flex flex-col gap-5" gap={0.1}>
            {STEPS.map((s, i) => (
              <StaggerItem key={s.title} className="flex items-start gap-4">
                <div
                  className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                    i === STEPS.length - 1
                      ? "bg-[linear-gradient(145deg,#f0d98f,#c8a34a)] text-trinq-navy"
                      : "bg-white text-trinq-navy shadow-[var(--shadow-xs)]"
                  }`}
                >
                  <s.icon size={21} strokeWidth={1.9} />
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
            <button
              type="button"
              onClick={openBusinessLeadModal}
              className="inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-trinq-navy px-8 text-[15px] font-bold text-trinq-cream shadow-[0_16px_40px_-20px_rgba(17,57,46,0.9)] transition-colors hover:bg-trinq-navy-deep sm:w-auto"
            >
              İşletmeni trinQ&apos;ya ekle
            </button>
          </Reveal>
        </div>

        {/* ---------------- Gerçek ekranlar ---------------- */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            aria-hidden
            className="sd-parallax pointer-events-none absolute -inset-3 rounded-[34px] bg-white/70 blur-2xl sm:-inset-6"
            style={{ "--sd-from": "30px", "--sd-to": "-30px" } as React.CSSProperties}
          />

          {/* işletme paneli — gerçek ekran görüntüsü */}
          <figure className="relative">
            <div className="overflow-hidden rounded-[22px] border border-trinq-line bg-white shadow-[var(--shadow-xl)] sm:rounded-[26px]">
              <img
                src="/trinq-isletme-panel-gercek.png"
                alt="trinQ işletme paneli: kampanya listesi, müşteri ve işlem özetleri"
                className="sd-zoom h-auto w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            {/*
              Sola hizalı: telefon mockup'ı sağ alt köşeden panelin üzerine
              biniyor, ortalanmış bir açıklama telefonun altında kalıyordu.
            */}
            <figcaption className="mt-3 text-[13px] font-medium text-trinq-muted">
              İşletme panelinden gerçek bir görünüm
            </figcaption>
          </figure>

          {/* müşterinin telefonu — paneli hafifçe örtecek şekilde */}
          <div className="relative mx-auto -mt-6 w-[150px] sm:-mt-14 sm:ml-auto sm:mr-2 sm:w-[190px] lg:-mt-20 lg:w-[205px]">
            <Reveal variant="up" delay={0.2}>
              <PhoneFrame className="w-full">
                <img
                  src="/app-kampanyalar-liste.webp"
                  alt="trinQ uygulamasında işletmenin aktif kampanyaları"
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                />
              </PhoneFrame>
            </Reveal>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
