"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Linkedin } from "lucide-react";
import Logo from "./Logo";
import { useBusinessLeadModal } from "@/context/BusinessLeadModalContext";

const SOCIAL_LINKS = [
  { href: "https://instagram.com/trinqapptr", label: "Instagram", Icon: Instagram },
  { href: "https://www.linkedin.com/company/trinqapp/?viewAsMember=true", label: "LinkedIn", Icon: Linkedin },
] as const;

const NAV_LINKS = [
  { href: "/", label: "ANASAYFA" },
  { href: "/#hakkimizda", label: "HAKKIMIZDA" },
  { href: "/#ozellikler", label: "ÖZELLİKLER" },
  { href: "/#iletisim", label: "İLETİŞİM" },
] as const;

/** Logo 96px kalır; satır daha alçak → logo üst/altta simetrik taşar (overflow-visible) */
const HEADER_HEIGHT = "h-[80px]";

function scrollMainNav(href: string, pathname: string, afterNavigate?: () => void) {
  const m = href.match(/^\/#(.+)$/);
  if (!m || pathname !== "/") return false;
  const el = document.getElementById(m[1]);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", href);
  afterNavigate?.();
  return true;
}

export default function Header() {
  const { openBusinessLeadModal } = useBusinessLeadModal();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinkClass =
    "inline-flex h-10 items-center justify-center leading-none text-xs font-semibold tracking-[0.06em] text-white transition-opacity duration-200 xl:text-[13px] " +
    "hover:opacity-100 hover:underline hover:decoration-white/40 hover:underline-offset-4";

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 z-50 w-full overflow-visible bg-trinq-navy font-sans text-white"
        style={{ top: 0 }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Ortalanmış iç konteyner — max 1280px, yatay padding 24–40px */}
        <div className="mx-auto w-full max-w-[1280px] overflow-visible px-6 md:px-8 xl:px-10">
          {/* Mobil: logo + hamburger */}
          <div className={`flex ${HEADER_HEIGHT} items-center justify-between lg:hidden`}>
            <Link href="/" className="flex h-full min-w-0 shrink-0 items-center" aria-label="trinQ ana sayfa">
              <Logo size="header" showText={true} variant="light" floatingInHeader />
            </Link>
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white transition-opacity hover:opacity-90"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>

          {/* Masaüstü: CSS Grid auto 1fr auto — gap ile iç boşluklar */}
          <div
            className={`hidden min-h-0 w-full grid-cols-[auto_1fr_auto] items-stretch gap-0 lg:grid ${HEADER_HEIGHT}`}
          >
            <div className="flex min-h-0 items-center justify-self-start">
              <Link href="/" className="flex items-center" aria-label="trinQ ana sayfa">
                <Logo size="header" showText={true} variant="light" floatingInHeader />
              </Link>
            </div>

            <nav
              className="flex min-h-0 items-center justify-center justify-self-center"
              aria-label="Ana menü"
            >
              <ul className="flex items-center justify-center gap-6 xl:gap-8">
                {NAV_LINKS.map((link) => (
                  <li key={link.href} className="flex items-center">
                    <Link
                      href={link.href}
                      className={`whitespace-nowrap opacity-95 ${navLinkClass}`}
                      onClick={(e) => {
                        if (scrollMainNav(link.href, pathname)) e.preventDefault();
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex min-h-0 items-center justify-end justify-self-end gap-4 xl:gap-6">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white/85 transition-opacity hover:opacity-100"
                  aria-label={label}
                >
                  <Icon size={20} strokeWidth={1.5} />
                </Link>
              ))}
              <Link
                href="https://kampanyapaneli.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 shrink-0 items-center whitespace-nowrap text-xs font-semibold leading-none tracking-wide text-white opacity-95 transition-opacity hover:opacity-100 xl:text-[13px]"
              >
                İşletme Girişi
              </Link>
              <button
                type="button"
                onClick={openBusinessLeadModal}
                className="inline-flex h-10 shrink-0 items-center rounded-full bg-black px-5 text-[11px] font-bold leading-none tracking-wide text-white ring-1 ring-white/10 transition-colors duration-200 hover:bg-neutral-900 lg:px-6 lg:text-sm"
              >
                İşletme Ol
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden bg-trinq-navy lg:hidden"
            >
              <nav className="mx-auto flex max-w-[1280px] flex-col gap-1 px-6 pb-4 pt-2 md:px-8 xl:px-10" aria-label="Mobil menü">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg px-2 py-3 text-sm font-semibold tracking-[0.04em] text-white/95 transition-opacity hover:opacity-100"
                    onClick={(e) => {
                      if (scrollMainNav(link.href, pathname, () => setMobileOpen(false))) {
                        e.preventDefault();
                      } else {
                        setMobileOpen(false);
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-3 flex flex-col gap-3 border-t border-[rgba(255,255,255,0.08)] pt-4">
                  <div className="flex items-center gap-4 xl:gap-5">
                    {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                      <Link
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-white/85 transition-opacity hover:opacity-100"
                        aria-label={label}
                        onClick={() => setMobileOpen(false)}
                      >
                        <Icon size={22} strokeWidth={1.5} />
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="https://kampanyapaneli.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 text-[13px] font-semibold tracking-wide text-white transition-opacity hover:opacity-100"
                    onClick={() => setMobileOpen(false)}
                  >
                    İşletme Girişi
                  </Link>
                  <button
                    type="button"
                    className="w-full rounded-full bg-black py-3 text-[13px] font-bold tracking-wide text-white ring-1 ring-white/10 transition-colors hover:bg-neutral-900"
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
