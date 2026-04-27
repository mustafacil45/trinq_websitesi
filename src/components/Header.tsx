"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, Instagram, Facebook, Linkedin } from "lucide-react";
import Logo from "./Logo";
import { useBusinessLeadModal } from "@/context/BusinessLeadModalContext";

/** X (Twitter) markası — lucide generic X yerine marka şekli */
function XLogo({ className, size = 20 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { href: "https://instagram.com/trinq.app", label: "Instagram", Icon: Instagram },
  { href: "https://facebook.com/trinq.app", label: "Facebook", Icon: Facebook },
  { href: "https://linkedin.com/company/trinq", label: "LinkedIn", Icon: Linkedin },
  { href: "https://x.com/trinq_app", label: "X", Icon: XLogo },
] as const;

const NAV_LINKS = [
  { href: "#anasayfa", label: "ANASAYFA" },
  { href: "#hakkimizda", label: "HAKKIMIZDA" },
  { href: "#sistem", label: "SİSTEM NASIL ÇALIŞIR?" },
  { href: "#isletmeler-icin", label: "İŞLETMELER İÇİN" },
  { href: "#kullanicilar", label: "KULLANICILAR İÇİN" },
  { href: "#isletmeler", label: "MAĞAZALAR" },
];

export default function Header() {
  const { openBusinessLeadModal } = useBusinessLeadModal();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  const headerShadow = useTransform(
    scrollY,
    [0, 80],
    ["0 1px 0 0 rgba(255,255,255,0.06)", "0 4px 24px -4px rgba(0,0,0,0.2)"]
  );

  useEffect(() => {
    const ua = navigator.userAgent || "";
    setIsMobile(/android|ipad|iphone|ipod/i.test(ua));
  }, []);

  return (
    <>
      {/* Smart App Banner — sadece mobilde */}
      <AnimatePresence>
        {isMobile && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[60] overflow-hidden bg-gradient-to-r from-trinq-accent to-trinq-accent-light shadow-[0_2px_12px_rgba(0,0,0,0.18)]"
          >
            <div className="flex items-center justify-center gap-3 px-4 py-2">
              <img src="/trinq-logo.png" alt="trinQ" className="h-6 w-6 rounded-md object-contain" />
              <span className="text-xs font-semibold text-white">Uygulamamızı İndirin</span>
              <a
                href="#indir"
                className="rounded-full bg-trinq-navy px-4 py-1 text-[10px] font-bold uppercase text-white transition hover:bg-trinq-navy-deep"
              >
                İNDİR
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header
        className="fixed left-0 right-0 z-50 overflow-visible border-b border-white/10 bg-trinq-navy font-sans"
        style={{ boxShadow: headerShadow, top: isMobile ? 36 : 0 }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between overflow-visible px-4 sm:px-6 lg:pl-8 lg:pr-0 xl:pr-1">
          <Link href="/" className="shrink-0 overflow-visible" aria-label="trinQ ana sayfa">
            <Logo size="md" showText={true} variant="light" floatingInHeader />
          </Link>

          <nav
            className="order-3 hidden w-full min-w-0 justify-center lg:order-none lg:flex lg:w-auto lg:flex-1 lg:justify-center"
            aria-label="Ana menü"
          >
            <div className="flex max-w-full flex-nowrap items-center justify-center gap-x-2.5 overflow-x-auto whitespace-nowrap font-[family-name:var(--font-inter)] [scrollbar-width:none] [-ms-overflow-style:none] sm:gap-x-3 lg:gap-x-3.5 xl:gap-x-4 [&::-webkit-scrollbar]:hidden">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="shrink-0 text-[11px] font-semibold leading-none text-white/93 antialiased transition-colors hover:text-white lg:text-[12px] xl:text-[13px]"
                  style={{ letterSpacing: "0.05em" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="hidden shrink-0 items-center justify-end gap-4 lg:ml-2 lg:flex xl:ml-4">
            <div className="flex items-center gap-3 sm:gap-3.5">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 transition-colors hover:text-white"
                  aria-label={label}
                >
                  <Icon size={20} className="transition-transform duration-300 hover:scale-110" />
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-3 xl:gap-4">
              <Link
                href="/panel-giris"
                className="shrink-0 text-[11px] font-semibold text-white/90 antialiased transition-colors hover:text-white lg:text-xs xl:text-[13px]"
              >
                İşletme Girişi
              </Link>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.button
                  type="button"
                  onClick={openBusinessLeadModal}
                  className="inline-block rounded-full bg-trinq-accent px-5 py-2.5 text-[11px] font-bold text-white shadow-md transition-all hover:bg-trinq-accent-hover hover:shadow-lg lg:px-6 lg:text-sm"
                  style={{ letterSpacing: "0.02em" }}
                >
                  İşletme Ol
                </motion.button>
              </motion.div>
            </div>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-white lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-white/10 bg-trinq-navy lg:hidden"
            >
              <nav className="flex flex-col gap-1 px-4 py-4 font-[family-name:var(--font-inter)]" aria-label="Mobil menü">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-xl py-3 px-4 text-sm font-semibold text-white/92 antialiased transition hover:bg-white/10 hover:text-white"
                    style={{ letterSpacing: "0.04em" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 px-2">
                  <div className="flex flex-wrap items-center justify-center gap-4 rounded-xl bg-white/5 py-3 px-2">
                    {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                      <Link
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/85 transition hover:text-white"
                        aria-label={label}
                        onClick={() => setMobileOpen(false)}
                      >
                        <Icon size={22} className="transition-opacity hover:opacity-100" />
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/panel-giris"
                    className="block rounded-xl py-3 text-center text-[13px] font-semibold text-white/92 transition hover:bg-white/10 hover:text-white"
                    style={{ letterSpacing: "0.02em" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    İşletme Girişi
                  </Link>
                  <button
                    type="button"
                    className="block w-full rounded-full bg-trinq-accent py-2.5 text-center text-[13px] font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-trinq-accent-hover"
                    style={{ letterSpacing: "0.02em" }}
                    onClick={() => {
                      openBusinessLeadModal();
                      setMobileOpen(false);
                    }}
                  >
                    İşletme Ol
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
