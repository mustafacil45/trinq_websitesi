"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  MapPin,
  Smartphone,
  Sparkles,
  Store,
  Wallet,
} from "lucide-react";
import { useBusinessLeadModal } from "@/context/BusinessLeadModalContext";
import { PILOT_OFFER } from "@/lib/constants";
import StoreBadges from "./StoreBadges";
import PhoneFrame from "./ui/PhoneFrame";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Hero'nun iki kitlesi var ve ikisi AYNI EKRANDA DURMAZ:
 *
 *   business → ana sayfa. Ticari hedef işletme kazanmak olduğu için ilk
 *              ekranda tek bir vaat, tek bir aksiyon var: "İşletmeni ekle".
 *              Mağaza rozetleri burada YOK — indirme butonu başvuru
 *              CTA'sıyla yarışıyordu.
 *   user     → /kullanicilar. Eski (öğrenci/kullanıcı) hero içeriği silinmedi,
 *              buraya taşındı: dönen kelimeler, mağaza rozetleri, hepsi duruyor.
 *
 * Kabuk (gradyan, telefon, parallax) ikisinde de aynı; yalnızca metin,
 * CTA ve güven satırı değişiyor.
 */
type HeroVariant = "business" | "user";

/** Cümle: "Sevdiğin yerlerde, <kelime> özel kampanyalar." — yalnızca user varyantı. */
const ROTATING_WORDS = [
  "öğrenciye",
  "müdavime",
  "kahve tiryakisine",
  "brunch planına",
  "tatlı krizine",
  "akşam yemeğine",
];
const ROTATE_INTERVAL_MS = 2600;

const BUSINESS_TRUST = [
  { icon: Wallet, label: "Kurulum ve pilot ücretsiz" },
  { icon: BadgeCheck, label: "Taahhüt yok, komisyon yok" },
  { icon: Store, label: "Kafeler ve restoranlar için" },
];

const USER_TRUST = [
  { icon: Store, label: "Kafeler ve restoranlar" },
  { icon: MapPin, label: "Konumuna göre yakındaki fırsatlar" },
  { icon: Sparkles, label: "Kullanıcılar için ücretsiz" },
];

export default function Hero({ variant = "business" }: { variant?: HeroVariant }) {
  const { openBusinessLeadModal } = useBusinessLeadModal();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);

  const isBusiness = variant === "business";

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);

  useEffect(() => {
    if (reduce || isBusiness) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % ROTATING_WORDS.length),
      ROTATE_INTERVAL_MS
    );
    return () => clearInterval(id);
  }, [reduce, isBusiness]);

  const trustItems = isBusiness ? BUSINESS_TRUST : USER_TRUST;
  const nextSectionHref = isBusiness ? "/#nasil-calisir" : "#sistem";

  return (
    <section
      ref={sectionRef}
      id="anasayfa"
      className="on-dark grain relative isolate overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32 lg:min-h-[100svh] lg:pb-28 lg:pt-36"
      style={{
        background:
          "radial-gradient(1100px 760px at 78% 6%, rgba(227,199,121,0.17) 0%, transparent 58%)," +
          "radial-gradient(900px 700px at 4% 88%, rgba(36,79,66,0.85) 0%, transparent 62%)," +
          "linear-gradient(176deg, #0c251e 0%, #11392e 38%, #1b4538 62%, #3c6657 86%, #f6f9f7 100%)",
      }}
    >
      {/* yumuşak ışık lekeleri */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[440px] w-[440px] rounded-full bg-trinq-gold/10 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-[380px] w-[380px] rounded-full bg-trinq-navy-mid/40 blur-[120px]"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-5 sm:px-6 lg:flex-row lg:items-center lg:gap-10 lg:px-8">
        {/* ---------------- Sol: metin ---------------- */}
        <motion.div
          style={{ y: copyY, opacity: fade }}
          className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center lg:items-start lg:text-left"
        >
          <motion.span
            className="inline-flex items-center gap-2 rounded-full border border-trinq-gold-soft/30 bg-trinq-gold-soft/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-trinq-gold-bright sm:text-xs"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-trinq-gold-bright" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-trinq-gold-bright" />
            </span>
            {isBusiness ? "Kafeler ve restoranlar için" : "Dijital sadakat platformu"}
          </motion.span>

          <motion.h1
            className="t-display mt-6 w-full text-[#f6f7ef]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.06, ease: EASE }}
          >
            {isBusiness ? (
              <>
                <span className="block">Kafene daha fazla</span>
                <span className="block">müşteri kazandır,</span>
                <span className="t-gold block">müdavimlerini artır.</span>
              </>
            ) : (
              <>
                <span className="block">Sevdiğin yerlerde,</span>

                {/* Dönen kelime — sabit yükseklikli kutu, zıplama yok */}
                <span className="relative my-1 flex h-[1.22em] w-full items-center justify-center overflow-visible lg:justify-start">
                  <AnimatePresence initial={false} mode="wait">
                    <motion.span
                      key={ROTATING_WORDS[index]}
                      className="t-gold absolute inset-0 flex items-center justify-center whitespace-nowrap lg:justify-start"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.34, ease: EASE }}
                    >
                      {ROTATING_WORDS[index]}
                    </motion.span>
                  </AnimatePresence>
                </span>

                <span className="block">özel kampanyalar.</span>
              </>
            )}
          </motion.h1>

          <motion.p
            className="t-lead mt-6 max-w-xl text-[#f6f7ef]/72"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease: EASE }}
          >
            {isBusiness
              ? "trinQ ile dijital damga kartları ve kampanyalar oluştur, müşterilerini tekrar ziyaret etmeye teşvik et ve işletmenin müşteri sadakatini güçlendir."
              : "Kasada QR'ı okut, damgan anında düşsün. Favori kafe ve restoranlarında harcadıkça biriktir, ödülünü anında kullan. Karton karta veda."}
          </motion.p>

          {/* CTA'lar */}
          <motion.div
            className="mt-9 flex w-full flex-col items-center gap-4 sm:w-auto lg:items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22, ease: EASE }}
          >
            {/* Kullanıcı sayfasında indirme ilk aksiyon; ana sayfada hiç yok. */}
            {!isBusiness && <StoreBadges className="justify-center lg:justify-start" />}

            <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row lg:items-start">
              {/*
                CTA metni sitenin HER yerinde aynı: "İşletmeni trinQ'ya ekle".
                Kullanıcı sayfasında aksiyon sırası tersine döner — orada ilk
                aksiyon mağaza rozetleri olduğu için buton sakin bir çerçeveye
                iner, ana sayfada ise birincil (krem) butondur.
              */}
              <motion.button
                type="button"
                onClick={openBusinessLeadModal}
                className={`group inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full px-8 text-[15px] font-bold tracking-tight transition-shadow sm:w-auto ${
                  isBusiness
                    ? "bg-trinq-cream text-trinq-navy shadow-[0_16px_40px_-18px_rgba(240,217,143,0.75)] hover:shadow-[0_20px_50px_-18px_rgba(240,217,143,0.95)]"
                    : "border border-white/22 bg-white/8 text-[#f6f7ef] hover:border-white/35 hover:bg-white/12"
                }`}
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
              <Link
                href={nextSectionHref}
                className="group inline-flex min-h-[44px] items-center gap-1.5 px-2 text-[15px] font-semibold text-[#f6f7ef]/75 underline-offset-4 transition-colors hover:text-[#f6f7ef] hover:underline"
              >
                trinQ nasıl çalışır?
                <ArrowDown
                  size={15}
                  strokeWidth={2.2}
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </Link>
            </div>

            {/* İkincil mesaj — teklifin tek kaynağı lib/constants.ts */}
            {isBusiness && (
              <p className="max-w-md text-[13.5px] font-medium text-trinq-gold-soft sm:text-sm lg:max-w-xl">
                {PILOT_OFFER.shortNote}{" "}
                <span className="font-normal text-[#f6f7ef]/55">
                  Kredi kartı istemiyoruz.
                </span>
              </p>
            )}
          </motion.div>

          {/* Güven satırı */}
          <motion.ul
            className="mt-10 flex flex-col items-center gap-3 text-sm text-[#f6f7ef]/60 sm:flex-row sm:flex-wrap sm:gap-x-6 lg:items-start lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.34 }}
          >
            {trustItems.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon size={15} strokeWidth={1.9} className="shrink-0 text-trinq-gold-soft" />
                <span>{label}</span>
              </li>
            ))}
          </motion.ul>

          {/*
            Öğrenci/kullanıcı tarafı ana sayfadan silinmedi; buradan sakin bir
            metin linkiyle kendi sayfasına gidiyor. Böylece indirme bağlantıları
            başvuru CTA'sıyla yarışmıyor ama erişilebilir kalıyor.
          */}
          {isBusiness && (
            <motion.p
              className="mt-7 text-sm text-[#f6f7ef]/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.42 }}
            >
              Uygulamayı kullanmak için mi geldin?{" "}
              <Link
                href="/kullanicilar"
                className="inline-flex items-center gap-1 font-semibold text-[#f6f7ef]/85 underline decoration-trinq-gold-soft/60 decoration-2 underline-offset-4 transition-colors hover:text-[#f6f7ef]"
              >
                <Smartphone size={14} strokeWidth={2} />
                Kullanıcı sayfası
              </Link>
            </motion.p>
          )}
        </motion.div>

        {/* ---------------- Sağ: telefon ---------------- */}
        <motion.div
          className="relative z-0 flex w-full flex-shrink-0 justify-center lg:w-auto lg:justify-end"
          style={{ y: phoneY }}
          initial={{ opacity: 0, y: 64, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: EASE }}
        >
          {/* arka parıltı */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-trinq-gold/14 blur-[90px]"
          />

          <div className="relative w-[230px] min-[400px]:w-[255px] sm:w-[285px] lg:w-[300px]">
            {/* yüzen damga rozeti */}
            <motion.div
              aria-hidden
              className="float-slow absolute -left-10 top-[22%] z-20 hidden rounded-2xl border border-white/15 bg-trinq-navy-deep/88 px-4 py-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)] backdrop-blur-md sm:block lg:-left-14"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f6f7ef]/55">
                Damga
              </p>
              <p className="mt-1 text-xl font-extrabold text-trinq-gold-bright">9 / 10</p>
            </motion.div>

            {/* yüzen ödül rozeti */}
            <motion.div
              aria-hidden
              className="float-slow absolute -right-10 bottom-[18%] z-20 hidden rounded-2xl border border-white/15 bg-trinq-navy-deep/88 px-4 py-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)] backdrop-blur-md sm:block lg:-right-14"
              style={{ animationDelay: "1.6s" }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f6f7ef]/55">
                {isBusiness ? "Kampanyan" : "Ödül"}
              </p>
              <p className="mt-1 text-sm font-bold text-[#f6f7ef]">10. kahve bizden</p>
            </motion.div>

            {/* cihaz çerçevesi */}
            <PhoneFrame className="w-full">
              <img
                src={isBusiness ? "/app-kartlarim.webp" : "/app-ana-sayfa.webp"}
                alt={
                  isBusiness
                    ? "Müşterinin telefonundaki trinQ damga kartı: biriken damgalar ve kullanıma hazır ödül"
                    : "trinQ uygulaması ana ekranı: yakındaki kampanyalar ve popüler işletmeler"
                }
                className="h-full w-full object-cover object-center"
                fetchPriority="high"
              />
            </PhoneFrame>
          </div>
        </motion.div>
      </div>

      {/* aşağı kaydır ipucu */}
      <motion.a
        href={nextSectionHref}
        aria-label="Aşağı kaydır"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-trinq-navy/45 transition-colors hover:text-trinq-navy/80 lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        style={{ opacity: fade }}
      >
        {isBusiness ? "Nasıl çalışır" : "Keşfet"}
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} strokeWidth={2.2} />
        </motion.span>
      </motion.a>
    </section>
  );
}
