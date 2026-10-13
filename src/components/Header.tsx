"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Linkedin, ArrowUpRight } from "lucide-react";
import { useBusinessLeadModal } from "@/context/BusinessLeadModalContext";

const SOCIAL_LINKS = [
  { href: "https://instagram.com/trinqapptr", label: "Instagram", Icon: Instagram },
  {
    href: "https://www.linkedin.com/company/trinqapp/?viewAsMember=true",
    label: "LinkedIn",
    Icon: Linkedin,
  },
] as const;

/**
 * Menü ana sayfanın yeni akışını izler: problem → nasıl çalışır → fayda →
 * pilot → SSS → iletişim. "Hakkımızda" ve "Sektörler" menüden çıkarıldı
 * (bölümler sayfada duruyor, footer'dan erişilebiliyor) — menü işletmenin
 * karar yolculuğunu gösteriyor, sayfanın içindekiler listesini değil.
 *
 * `section` = ana sayfadaki bölüm id'si (scroll-spy için)
 */
const BUSINESS_NAV = [
  { href: "/#nasil-calisir", label: "Nasıl Çalışır", section: "nasil-calisir" },
  { href: "/#isletmeye-faydasi", label: "Faydalar", section: "isletmeye-faydasi" },
  { href: "/#ozellikler", label: "Özellikler", section: "ozellikler" },
  { href: "/#pilot", label: "Pilot Program", section: "pilot" },
  { href: "/#sss", label: "S.S.S.", section: "sss" },
  { href: "/#iletisim", label: "İletişim", section: "iletisim" },
] as const;

/**
 * /kullanicilar sayfasındayken menü o sayfanın bölümlerini gösterir —
 * aksi hâlde "Nasıl Çalışır"a basan kullanıcı, okuduğu sayfadan çıkıp
 * işletme ana sayfasına atlıyordu.
 */
const USER_NAV = [
  { href: "/kullanicilar#sistem", label: "Nasıl Çalışır", section: "sistem" },
  { href: "/kullanicilar#uygulama-vitrini", label: "Uygulama", section: "uygulama-vitrini" },
  { href: "/kullanicilar#sektorler", label: "Nerelerde Geçerli", section: "sektorler" },
  { href: "/kullanicilar#sss", label: "S.S.S.", section: "sss" },
  { href: "/kullanicilar#indir", label: "Uygulamayı İndir", section: "indir" },
] as const;

/**
 * "/#pilot" ya da "/kullanicilar#sistem" biçimindeki bir bağlantıyı, HEDEF
 * SAYFA ZATEN AÇIKSA yumuşak kaydırmaya çevirir. Başka bir sayfadaysak
 * `false` döner ve <Link> normal gezinmeyi yapar.
 */
function smoothScrollTo(href: string, pathname: string, after?: () => void) {
  const m = href.match(/^(\/[^#]*)#(.+)$/);
  if (!m) return false;
  const targetPath = m[1] === "/" ? "/" : m[1].replace(/\/$/, "");
  if (targetPath !== pathname) return false;
  const el = document.getElementById(m[2]);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", href);
  after?.();
  return true;
}

export default function Header() {
  const { openBusinessLeadModal } = useBusinessLeadModal();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  /**
   * Header yalnızca KOYU HERO'lu sayfalarda şeffaf durabilir. Yasal sayfalar
   * gibi açık zeminli sayfalarda krem logo/menü okunmaz, bu yüzden oralarda
   * her zaman katı zemin kullanılır. /kullanicilar da ana sayfa gibi koyu
   * hero ile açılıyor.
   */
  const isUsersPage = pathname === "/kullanicilar";
  const hasDarkHero = pathname === "/" || isUsersPage;
  const solid = scrolled || mobileOpen || !hasDarkHero;

  /** Menü bulunulan sayfanın bölümlerini gösterir. */
  const navLinks = isUsersPage ? USER_NAV : BUSINESS_NAV;
  /** Scroll-spy yalnızca menüdeki bölümler o sayfadayken anlamlı. */
  const spyEnabled = hasDarkHero;

  /* --- zemin: en üstte şeffaf, kaydırınca katı --- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    // İlk ölçümü bir sonraki frame'e ertele: commit sırasında senkron
    // setState yapmak zincirleme render tetikliyor.
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* --- scroll-spy: görünür bölümü menüde işaretle --- */
  useEffect(() => {
    if (!spyEnabled) return;
    const ids = navLinks.map((l) => l.section);
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [pathname, spyEnabled, navLinks]);

  /* --- mobil menü açıkken arka plan kaymasın --- */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* --- Esc ile kapat --- */
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const handleNav = useCallback(
    (e: React.MouseEvent, href: string, close?: boolean) => {
      if (smoothScrollTo(href, pathname, close ? () => setMobileOpen(false) : undefined)) {
        e.preventDefault();
      } else if (close) {
        setMobileOpen(false);
      }
    },
    [pathname]
  );

  return (
    <>
      <motion.header
        className="on-dark fixed inset-x-0 top-0 z-50 w-full font-sans text-[#f6f7ef]"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Zemin katmanı — opaklığı scroll'a göre değişir */}
        <div
          aria-hidden
          className={`absolute inset-0 transition-all duration-500 ${
            solid
              ? "bg-trinq-navy-deep/92 shadow-[0_8px_30px_-16px_rgba(0,0,0,0.65)] backdrop-blur-xl"
              : "bg-gradient-to-b from-trinq-navy-deep/70 to-transparent"
          }`}
        />

        <div className="relative mx-auto w-full max-w-[1280px] px-5 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-[height] duration-300 ${
              solid ? "h-[64px]" : "h-[72px]"
            }`}
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex shrink-0 items-center"
              aria-label="trinQ ana sayfa"
              onClick={(e) => handleNav(e, "/#anasayfa")}
            >
              <img
                src="/trinq-logo.png"
                alt="trinQ"
                className={`w-auto object-contain transition-all duration-300 ${
                  solid ? "h-[54px]" : "h-[62px]"
                }`}
              />
            </Link>

            {/* Masaüstü menü */}
            <nav className="hidden lg:block" aria-label="Ana menü">
              <ul className="flex items-center gap-1">
                {navLinks.map((link) => {
                  const isActive = spyEnabled && active === link.section;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={(e) => handleNav(e, link.href)}
                        className="relative inline-flex h-10 items-center whitespace-nowrap rounded-full px-4 text-[13px] font-semibold tracking-[0.01em] transition-colors duration-200 hover:text-white"
                        style={{ color: isActive ? "#f0d98f" : "rgba(246,247,239,0.78)" }}
                      >
                        {link.label}
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-0 -z-10 rounded-full bg-white/8 ring-1 ring-trinq-gold-soft/25"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Masaüstü sağ blok */}
            <div className="hidden items-center gap-1.5 lg:flex">
              {/*
                Sosyal ikonlar menüden çıkarıldı (footer'da duruyorlar):
                sağ blokta artık yalnızca karar yolculuğundaki üç bağlantı var
                ve birincil CTA'nın yanında dikkat dağıtan öğe kalmadı.
              */}
              {/* Kitleler arası geçiş — bulunulan sayfaya göre karşı tarafı gösterir */}
              <Link
                href={isUsersPage ? "/" : "/kullanicilar"}
                className="inline-flex h-10 items-center whitespace-nowrap rounded-full px-3 text-[13px] font-semibold text-[#f6f7ef]/70 transition-colors hover:text-white"
              >
                {isUsersPage ? "İşletmeler" : "Kullanıcılar"}
              </Link>
              <a
                href="https://kampanyapaneli.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-1 whitespace-nowrap rounded-full px-3 text-[13px] font-semibold text-[#f6f7ef]/85 transition-colors hover:text-white"
              >
                İşletme Girişi
                <ArrowUpRight size={14} strokeWidth={2.2} />
              </a>
              <button
                type="button"
                onClick={openBusinessLeadModal}
                className="ml-1 inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-full bg-trinq-cream px-5 text-[13px] font-bold tracking-tight text-trinq-navy transition-all duration-200 hover:bg-white hover:shadow-[0_10px_26px_-12px_rgba(240,217,143,0.9)]"
              >
                İşletmeni ekle
              </button>
            </div>

            {/* Mobil hamburger */}
            <button
              type="button"
              className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#f6f7ef] transition-colors hover:bg-white/10 lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} strokeWidth={1.8} /> : <Menu size={24} strokeWidth={1.8} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobil tam ekran menü */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="on-dark fixed inset-0 z-40 flex flex-col bg-trinq-navy-deep pt-[72px] text-[#f6f7ef] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-trinq-gold/12 blur-[90px]"
            />
            <nav
              className="relative flex flex-1 flex-col gap-1 overflow-y-auto px-5 pb-8 pt-6 sm:px-6"
              aria-label="Mobil menü"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 + i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href, true)}
                    className="flex items-center justify-between border-b border-white/8 py-4 text-[22px] font-bold tracking-tight text-[#f6f7ef] transition-colors hover:text-trinq-gold-bright"
                  >
                    {link.label}
                    <ArrowUpRight size={20} className="text-[#f6f7ef]/35" strokeWidth={2} />
                  </Link>
                </motion.div>
              ))}

              <motion.div
                className="mt-7 flex flex-col gap-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <button
                  type="button"
                  className="w-full rounded-full bg-trinq-cream py-4 text-[15px] font-bold text-trinq-navy"
                  onClick={() => {
                    openBusinessLeadModal();
                    setMobileOpen(false);
                  }}
                >
                  İşletmeni trinQ&apos;ya ekle
                </button>
                <a
                  href="https://kampanyapaneli.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-full border border-white/20 py-4 text-center text-[15px] font-semibold text-[#f6f7ef]"
                  onClick={() => setMobileOpen(false)}
                >
                  İşletme Girişi
                </a>
                <Link
                  href={isUsersPage ? "/" : "/kullanicilar"}
                  className="w-full py-2 text-center text-sm font-semibold text-[#f6f7ef]/60 underline-offset-4 hover:underline"
                  onClick={() => setMobileOpen(false)}
                >
                  {isUsersPage
                    ? "İşletme sahibiyim → İşletmeler sayfası"
                    : "Uygulamayı kullanacağım → Kullanıcı sayfası"}
                </Link>

                <div className="mt-4 flex items-center gap-3">
                  {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-[#f6f7ef]/80 transition-colors hover:bg-white/8 hover:text-white"
                      aria-label={label}
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icon size={20} strokeWidth={1.8} />
                    </a>
                  ))}
                  <a
                    href="mailto:info@trinqapp.com"
                    className="ml-auto text-sm font-medium text-[#f6f7ef]/60"
                  >
                    info@trinqapp.com
                  </a>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
