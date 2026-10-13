"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { MapPin, Sparkles, Gift, Navigation } from "lucide-react";
import PhoneFrame from "./ui/PhoneFrame";

const EASE = [0.22, 1, 0.36, 1] as const;

type Step = {
  key: string;
  label: string;
  title: string;
  desc: string;
  src: string;
  alt: string;
  chip: { icon: typeof MapPin; text: string };
};

/**
 * Aynı GERÇEK uygulama ekranları, iki farklı anlatım:
 *
 *   business → ana sayfa. "Müşterin uygulamada seni nasıl görüyor?" — ürünün
 *              gerçekten çalıştığını işletme sahibine gösteren bölüm.
 *   user     → /kullanicilar. Eski kullanıcı anlatımı; silinmedi, taşındı.
 *
 * Rozet metinleri uydurma sayı içermez ("12 aktif kampanya" kaldırıldı):
 * ekranda görünmeyen bir rakam vaat gibi okunuyordu.
 */
const BUSINESS_STEPS: Step[] = [
  {
    key: "kesfet",
    label: "Keşfedilme",
    title: "Müşteriler işletmeni uygulamayı açar açmaz görüyor",
    desc: "trinQ kullanıcısı konumuna göre çevresindeki kafe ve restoranları, aktif kampanyalarıyla birlikte listeliyor. İşletmen de bu listede yer alıyor.",
    src: "/app-ana-sayfa.webp",
    alt: "trinQ ana sayfa: yakındaki işletmeler ve aktif kampanyalar listesi",
    chip: { icon: Sparkles, text: "Yakındaki kampanyalar" },
  },
  {
    key: "sayfan",
    label: "İşletme sayfan",
    title: "İşletme sayfan: menü, adres ve kampanyalar bir arada",
    desc: "Müşteri gelmeden önce menünü, konumunu, çalışma saatlerini ve o an geçerli kampanyalarını tek ekranda görüyor.",
    src: "/app-isletme-detay.webp",
    alt: "trinQ işletme detay sayfası: konum, yol tarifi, menü ve aktif kampanyalar",
    chip: { icon: MapPin, text: "Menü ve yol tarifi" },
  },
  {
    key: "damga",
    label: "Damga kartın",
    title: "Kurduğun damga kartı müşterinin cebinde duruyor",
    desc: "Her ziyarette damga otomatik işleniyor. Kart dolduğunda müşteri bildirimi görüyor ve ödülü kasada kullanıyor — yani tekrar sana geliyor.",
    src: "/app-kartlarim.webp",
    alt: "trinQ kartlarım ekranı: biriken damga kartları ve kullanıma hazır ödüller",
    chip: { icon: Gift, text: "Damga ve ödül" },
  },
  {
    key: "harita",
    label: "Haritada görünürlük",
    title: "Haritada, yakındaki müşterinin karşısına çıkıyorsun",
    desc: "Kullanıcı çevresindeki işletmeleri haritada geziyor, tek dokunuşla yol tarifi alıyor. Yeni müşteriyle tanışma kanalın bu.",
    src: "/app-magazalar-harita.webp",
    alt: "trinQ mağazalar haritası: anlaşmalı işletmelerin konumları",
    chip: { icon: Navigation, text: "Haritada görünürlük" },
  },
];

const USER_STEPS: Step[] = [
  {
    key: "kesfet",
    label: "Keşfet",
    title: "Yakınındaki kampanyalar, uygulamayı açar açmaz",
    desc: "Konumuna göre çevrendeki anlaşmalı kafe ve restoranları, aktif kampanyalarıyla birlikte görürsün. Fırsatı aramana gerek yok.",
    src: "/app-ana-sayfa.webp",
    alt: "trinQ ana sayfa: popüler kampanyalar ve yakındaki işletmeler",
    chip: { icon: Sparkles, text: "Yakındaki kampanyalar" },
  },
  {
    key: "mekan",
    label: "Mekânı aç",
    title: "Gitmeden önce ne kazanacağını bil",
    desc: "Adres, yol tarifi, menü ve o mekândaki tüm aktif kampanyalar tek ekranda toplanır.",
    src: "/app-isletme-detay.webp",
    alt: "trinQ işletme detayı: konum, yol tarifi, menü ve aktif kampanyalar",
    chip: { icon: MapPin, text: "Menü ve yol tarifi" },
  },
  {
    key: "biriktir",
    label: "Biriktir",
    title: "Damgalar birikir, ödül kendiliğinden düşer",
    desc: "Her ziyaretin karta işlenir. Hedef dolduğunda ödülün “hazır” olur, kasada QR okutup kullanırsın.",
    src: "/app-kartlarim.webp",
    alt: "trinQ kartlarım: damga kartları ve kullanıma hazır ödüller",
    chip: { icon: Gift, text: "Damga ve ödül" },
  },
  {
    key: "harita",
    label: "Haritada bul",
    title: "Tüm anlaşmalı mekânlar tek haritada",
    desc: "Yakından uzağa sıralanır; açık mı kapalı mı anında görürsün, yol tarifini tek dokunuşla alırsın.",
    src: "/app-magazalar-harita.webp",
    alt: "trinQ mağazalar: anlaşmalı işletmelerin haritası",
    chip: { icon: Navigation, text: "Yol tarifi al" },
  },
];

/**
 * Adım sayısı iki varyantta da 4 — scroll segmentleri (`1/N`) bu sabite
 * bağlı olduğu için listeler aynı uzunlukta tutulmalı.
 */
const N = 4;

export default function AppShowcaseSection({
  variant = "business",
}: {
  variant?: "business" | "user";
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const isBusiness = variant === "business";
  const STEPS = isBusiness ? BUSINESS_STEPS : USER_STEPS;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(N - 1, Math.max(0, Math.floor(v * N + 0.0001)));
    setActive((prev) => (prev === i ? prev : i));
  });

  const railScale = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  /*
   * NOT: Burada `useReducedMotion()` ile FARKLI BİR AĞAÇ döndürmek yok.
   * Sunucu ile istemci farklı DOM üretince hydration çöküyor ve useScroll
   * "Target ref is defined but not hydrated" hatasıyla sayfayı komple
   * boş bırakıyordu. Hareket tercihi artık:
   *   - framer tarafında <MotionConfig reducedMotion="user"> (PageWrapper)
   *   - parallax dönüşümleri için globals.css'teki [data-parallax] kuralı
   * ile ele alınıyor.
   */
  return (
    <section
      ref={sectionRef}
      id={isBusiness ? "urun" : "uygulama-vitrini"}
      className="on-dark grain tone-dark relative h-[330vh] lg:h-[400vh]"
    >
      {/*
        pt-[--header-h]: sticky bölüm viewport'un tamamını kaplıyor ama üstte
        SABİT header duruyor. İçerik tam ortalanınca telefonun tepesi
        header'ın altında kalıyordu — kırpılmış gibi görünüyordu. Masaüstünde
        iki sütunlu düzende içerik zaten daha kısa, orada paylara gerek yok.
      */}
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden pt-[var(--header-h)] lg:pt-0">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-5 sm:gap-8 lg:grid-cols-[1fr_auto] lg:gap-16">
            {/* ---------------- Sol: değişen metin ---------------- */}
            <div className="order-2 lg:order-1">
              {/* Mobilde adım göstergesi telefonun hemen altında durur;
                  sayfanın en altında kalırsa çerez bannerı örtüyor. */}
              <div className="mb-5 flex items-center gap-2.5 lg:hidden">
                {STEPS.map((s, i) => (
                  <span
                    key={s.key}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === active ? "w-7 bg-trinq-gold-soft" : "w-1.5 bg-white/25"
                    }`}
                  />
                ))}
                <span className="ml-1.5 text-xs font-semibold tabular-nums text-[#f6f7ef]/40">
                  {active + 1} / {N}
                </span>
              </div>

              <span className="t-eyebrow inline-flex items-center gap-2 text-trinq-gold-soft">
                <span aria-hidden className="h-px w-6 bg-trinq-gold-soft/50" />
                {isBusiness ? "Ürün görselleri" : "Uygulama"}
              </span>

              {/* başlık + açıklama adıma göre değişir */}
              {/* min-h mobilde düşürüldü: telefonla birlikte 100svh'ye sığması lazım */}
              <div className="relative mt-4 min-h-[148px] sm:min-h-[196px] lg:min-h-[250px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={STEPS[active].key}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <h2 className="t-h2 max-w-xl text-[#f6f7ef]">{STEPS[active].title}</h2>
                    <p className="t-lead mt-4 max-w-lg text-[#f6f7ef]/65">
                      {STEPS[active].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* adım listesi + ilerleme rayı (masaüstü) */}
              <div className="mt-8 hidden lg:block">
                <div className="relative pl-5">
                  <span
                    aria-hidden
                    className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px bg-white/12"
                  />
                  <motion.span
                    aria-hidden
                    className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px origin-top bg-trinq-gold-soft"
                    style={{ scaleY: railScale }}
                  />
                  <ul className="flex flex-col gap-3.5">
                    {STEPS.map((s, i) => (
                      <li key={s.key} className="flex items-center gap-3">
                        <span
                          className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300 ${
                            i <= active ? "bg-trinq-gold-soft" : "bg-white/20"
                          }`}
                        />
                        <span
                          className={`text-[15px] font-semibold tracking-tight transition-colors duration-300 ${
                            i === active
                              ? "text-[#f6f7ef]"
                              : i < active
                                ? "text-[#f6f7ef]/45"
                                : "text-[#f6f7ef]/30"
                          }`}
                        >
                          {s.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/*
                Güven notu: ekranlar temsili değil, yayındaki uygulamadan.
                Yalnızca masaüstünde — mobilde sticky kapsayıcı 100svh ve
                telefon + metin zaten sınırda, ek satır taşmaya yol açıyor.
              */}
              <p className="mt-7 hidden text-[13px] text-[#f6f7ef]/40 lg:block">
                Tüm görseller yayındaki trinQ uygulamasından alınmıştır.
              </p>
            </div>

            {/* ---------------- Sağ: sabit telefon, değişen ekran ---------------- */}
            <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
              <div className="relative">
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-trinq-gold/12 blur-[90px]"
                />

                {/* yüzen etiket — adıma göre değişir */}
                <div className="pointer-events-none absolute -left-4 top-10 z-20 hidden sm:block lg:-left-16">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={STEPS[active].key}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-trinq-navy-deep/85 px-4 py-2.5 text-[13px] font-semibold text-[#f6f7ef] shadow-[0_18px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md"
                      initial={{ opacity: 0, x: -14, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -10, scale: 0.95 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      {(() => {
                        const Icon = STEPS[active].chip.icon;
                        return <Icon size={15} strokeWidth={2} className="text-trinq-gold-soft" />;
                      })()}
                      {STEPS[active].chip.text}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/*
                  Telefon genişliği mobilde viewport YÜKSEKLİĞİNE de bağlı.
                  Sticky kapsayıcı 100svh + overflow-hidden; sabit px genişlik
                  verilince telefon (genişlik × 2.164) + metin bloğu kısa
                  ekranlara sığmıyor ve cihazın tepesi kırpılıyordu —
                  tarayıcı çubuğu açıkken her telefonda oluyordu.
                  min(...) ile yükseklik daraldıkça telefon da küçülüyor.
                */}
                <PhoneFrame className="w-[min(200px,23svh)] sm:w-[min(248px,28svh)] lg:w-[290px]">
                  {STEPS.map((s, i) => (
                    <ScreenLayer
                      key={s.key}
                      progress={scrollYProgress}
                      index={i}
                      src={s.src}
                      alt={s.alt}
                      priority={i === 0}
                    />
                  ))}
                </PhoneFrame>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Tek bir ekran katmanı. Kendi hook'larını çağırır — döngü içinde hook
 * kullanmamak için ayrı bileşen.
 */
function ScreenLayer({
  progress,
  index,
  src,
  alt,
  priority,
}: {
  progress: MotionValue<number>;
  index: number;
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const seg = 1 / N;
  const start = index * seg;
  const end = start + seg;
  const fade = seg * 0.3;

  const opacity = useTransform(
    progress,
    [start - fade, start + fade * 0.6, end - fade * 0.6, end + fade],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    progress,
    [start - fade, start + fade * 0.6, end - fade * 0.6, end + fade],
    [1.06, 1, 1, 0.96]
  );
  const y = useTransform(
    progress,
    [start - fade, start + fade * 0.6, end - fade * 0.6, end + fade],
    [26, 0, 0, -26]
  );

  return (
    <motion.img
      src={src}
      alt={alt}
      className="absolute inset-0 h-full w-full object-cover object-center"
      data-parallax
      style={{ opacity, scale, y }}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
