"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, Plug, TreePine, Heart, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import PartnerMerchantsMap from "@/components/PartnerMerchantsMap";

const BADGES = [
  { icon: Wifi, label: "Wifi" },
  { icon: Plug, label: "Priz" },
  { icon: TreePine, label: "Dış Mekan" },
] as const;

export type StoreCategory = "tumu" | "cafe" | "restoran" | "magaza";

type StoreItem = {
  id: number;
  name: string;
  category: StoreCategory;
  matchPercent: number;
  distance: string;
  walkTime: string;
  hours: string;
  address: string;
  favorite: boolean;
  badges: readonly (0 | 1 | 2)[];
  tag: string;
  campaigns: string[];
};

const STORES: StoreItem[] = [
  {
    id: 1,
    name: "Kafe Merkez",
    category: "cafe",
    matchPercent: 95,
    distance: "1.2 km",
    walkTime: "15 dk",
    hours: "08:00 - 22:00",
    address: "İstiklal Cd. No:42, Beyoğlu",
    favorite: true,
    badges: [0, 1, 2] as const,
    tag: "5. kahve bizden!",
    campaigns: ["Öğrenciye %20", "Her 5. kahve bedava"],
  },
  {
    id: 2,
    name: "Restoran Lezzet",
    category: "restoran",
    matchPercent: 88,
    distance: "4.5 km",
    walkTime: "45 dk",
    hours: "11:00 - 00:00",
    address: "Bağdat Cd. No:128, Kadıköy",
    favorite: false,
    badges: [0, 2] as const,
    tag: "Bugün popüler",
    campaigns: ["Hoş geldin tatlı", "Happy Hour %15"],
  },
  {
    id: 3,
    name: "Double Dose",
    category: "cafe",
    matchPercent: 92,
    distance: "2.1 km",
    walkTime: "25 dk",
    hours: "07:30 - 21:00",
    address: "Nişantaşı Mah. Cafe Sok. No:5",
    favorite: true,
    badges: [0, 1] as const,
    tag: "Kahve + tatlı indirim",
    campaigns: ["İkinci içecek %50", "trinQ'de özel fiyat"],
  },
  {
    id: 4,
    name: "Kahve Dünyası",
    category: "cafe",
    matchPercent: 90,
    distance: "0.8 km",
    walkTime: "10 dk",
    hours: "08:00 - 23:00",
    address: "Kadıköy Caferağa Mah.",
    favorite: false,
    badges: [0, 1] as const,
    tag: "trinQ'de %10 indirim",
    campaigns: ["Kahve + kurabiye kampanyası"],
  },
  {
    id: 5,
    name: "Tadım Restoran",
    category: "restoran",
    matchPercent: 85,
    distance: "3.2 km",
    walkTime: "38 dk",
    hours: "12:00 - 23:30",
    address: "Beşiktaş Barbaros Bulvarı",
    favorite: true,
    badges: [0, 1, 2] as const,
    tag: "Akşam menüsü indirimli",
    campaigns: ["3 al 2 öde"],
  },
  {
    id: 6,
    name: "Moda Butik",
    category: "magaza",
    matchPercent: 78,
    distance: "5.1 km",
    walkTime: "55 dk",
    hours: "10:00 - 20:00",
    address: "Moda Caddesi No:22",
    favorite: false,
    badges: [0] as const,
    tag: "İlk alışverişe özel",
    campaigns: ["100 TL üzeri kargo bedava"],
  },
];

const extraBadges: readonly (0 | 1 | 2)[][] = [[0], [0, 1], [0, 1, 2]];
const EXTRA_STORES: StoreItem[] = "ABCDEFGHIJ".split("").map((letter, i) => {
  const cats: StoreCategory[] = ["cafe", "restoran", "magaza"];
  return {
    id: 100 + i,
    name: `İşletme ${letter}`,
    category: cats[i % 3],
    matchPercent: 70 + (i % 26),
    distance: `${(i + 1) * 0.5} km`,
    walkTime: `${(i + 2) * 5} dk`,
    hours: "09:00 - 22:00",
    address: `Örnek Mah. ${letter} Cad. No:${i + 1}`,
    favorite: i % 3 === 0,
    badges: extraBadges[i % 3],
    tag: "Örnek kampanya",
    campaigns: ["Kampanya örneği"],
  };
});

const ALL_STORES = [...STORES, ...EXTRA_STORES];

const CATEGORIES: { value: StoreCategory; label: string }[] = [
  { value: "tumu", label: "Tümü" },
  { value: "cafe", label: "Cafe" },
  { value: "restoran", label: "Restoran" },
  { value: "magaza", label: "Mağaza" },
];

const CARD_WIDTH = 280;
const GAP = 20;
const VISIBLE_CARDS = 4.25; // 4 full + peek of 5th

export default function StoresSection() {
  const [category, setCategory] = useState<StoreCategory>("tumu");
  const [scrollIndex, setScrollIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = category === "tumu" ? ALL_STORES : ALL_STORES.filter((s) => s.category === category);
  const totalCards = filtered.length;
  const maxIndex = Math.max(0, Math.ceil(totalCards / 4) - 1);

  const go = (delta: number) => {
    const next = Math.max(0, Math.min(scrollIndex + delta, maxIndex));
    setScrollIndex(next);
    scrollRef.current?.scrollTo({ left: next * 4 * (CARD_WIDTH + GAP), behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const left = el.scrollLeft;
      const pageWidth = 4 * (CARD_WIDTH + GAP);
      setScrollIndex(Math.round(left / pageWidth));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [filtered.length]);

  useEffect(() => {
    setScrollIndex(0);
    scrollRef.current?.scrollTo({ left: 0 });
  }, [category]);

  return (
    <section className="bg-[#F8FAFC] py-20 sm:py-24 lg:py-28" id="isletmeler">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-trinq-navy sm:text-4xl">
            İşletmeler
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-trinq-muted/90">
            Anlaşmalı işletmeler haritada gösterilir. Yakınındaki mekanları keşfet.
          </p>
        </motion.div>

        {/* Harita + telefon */}
        <div className="mt-14 grid min-w-0 grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8">
          <motion.div
            className="relative w-full h-[400px] max-w-md overflow-hidden rounded-2xl bg-slate-200 shadow-xl lg:max-w-full lg:h-[600px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
          >
            <PartnerMerchantsMap />
          </motion.div>
          <motion.div
            className="flex justify-center lg:justify-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative w-[220px] sm:w-[250px] lg:w-[260px] cursor-default"
              whileHover={{ y: -6 }}
              transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
            >
              <div className="relative overflow-hidden rounded-[52px] border-[10px] border-zinc-800 bg-zinc-900 shadow-2xl">
                <div
                  className="relative flex w-full items-center justify-center overflow-hidden rounded-[42px] bg-black"
                  style={{ aspectRatio: "390/844" }}
                >
                  <img
                    src="/magazalar-ekran.png"
                    alt="trinQ İşletmeler ekranı"
                    className="h-full w-full object-contain object-center"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Filtre chip'leri */}
        <div className="mt-14 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setCategory(c.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                category === c.value
                  ? "bg-trinq-accent text-white shadow-sm"
                  : "bg-white text-trinq-muted shadow-sm ring-1 ring-slate-200/80 hover:ring-trinq-accent/50 hover:text-trinq-accent"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Carousel: 4 kart + sağda 5. kartın peek'i, oklar hover'da */}
        <div
          className="relative mt-8"
          onMouseEnter={() => setShowArrows(true)}
          onMouseLeave={() => setShowArrows(false)}
        >
          <div
            className="mx-auto overflow-hidden"
            style={{
              maxWidth: (CARD_WIDTH + GAP) * VISIBLE_CARDS + 24,
            }}
          >
            {/* Prev arrow */}
            <AnimatePresence>
              {showArrows && scrollIndex > 0 && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-trinq-navy shadow-lg ring-1 ring-slate-200/80 backdrop-blur-sm transition hover:bg-white hover:shadow-xl lg:left-4"
                  onClick={() => go(-1)}
                  aria-label="Önceki"
                >
                  <ChevronLeft className="h-5 w-5" />
                </motion.button>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {showArrows && scrollIndex < maxIndex && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-trinq-navy shadow-lg ring-1 ring-slate-200/80 backdrop-blur-sm transition hover:bg-white hover:shadow-xl lg:right-4"
                  onClick={() => go(1)}
                  aria-label="Sonraki"
                >
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              )}
            </AnimatePresence>

            <div
              ref={scrollRef}
              className="scrollbar-hide flex gap-5 overflow-x-auto pb-2 scroll-smooth"
              style={{ scrollSnapType: "x mandatory" }}
            >
                {filtered.map((store) => (
                  <motion.article
                    key={store.id}
                    className="relative flex-shrink-0 rounded-[20px] border border-trinq-accent/10 bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition hover:border-trinq-accent/25 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
                    style={{
                      width: CARD_WIDTH,
                      scrollSnapAlign: "start",
                    }}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-semibold text-trinq-navy">{store.name}</h3>
                        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-trinq-muted">
                          <span className="font-medium text-trinq-accent">{store.distance}</span>
                          <span className="text-slate-400">·</span>
                          <span>~{store.walkTime}</span>
                        </p>
                        <p className="mt-1.5 text-sm font-medium text-trinq-accent">{store.tag}</p>
                        <p className="mt-2 flex items-center gap-1.5 text-xs text-trinq-muted/90">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-trinq-accent" />
                          <span>{store.address}</span>
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {store.badges.map((idx) => {
                            const BadgeIcon = BADGES[idx].icon;
                            return (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 rounded-lg bg-slate-100/80 px-2 py-1 text-[10px] text-slate-600"
                                title={BADGES[idx].label}
                              >
                                <BadgeIcon className="h-3.5 w-3.5 text-trinq-accent" />
                                {BADGES[idx].label}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="shrink-0 rounded-full p-1.5 text-trinq-accent hover:bg-trinq-accent/10"
                        aria-label={store.favorite ? "Favorilerden çıkar" : "Favorilere ekle"}
                      >
                        <Heart className={`h-5 w-5 ${store.favorite ? "fill-trinq-accent" : ""}`} />
                      </button>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        className="rounded-full bg-trinq-accent px-4 py-2 text-xs font-medium text-white transition hover:bg-trinq-accent-hover"
                      >
                        Yol tarifi →
                      </button>
                      <button
                        type="button"
                        className="rounded-full border border-trinq-accent/40 bg-white px-4 py-2 text-xs font-medium text-trinq-accent transition hover:bg-trinq-accent/5"
                      >
                        Kampanyalar
                      </button>
                    </div>
                  </motion.article>
                ))}
            </div>
          </div>

          {/* Pagination dots */}
          {maxIndex >= 0 && (
            <div className="mt-6 flex justify-center gap-1.5">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i - scrollIndex)}
                  className={`h-2 rounded-full transition ${
                    i === scrollIndex ? "w-6 bg-trinq-accent" : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Sayfa ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
