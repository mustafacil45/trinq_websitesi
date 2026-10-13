"use client";

import Link from "next/link";
import { Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import {
  BUSINESS_PANEL_URL,
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
} from "@/lib/constants";

/**
 * Footer header nav'ın birebir kopyası değil, kitleye göre ayrılmış:
 * ziyaretçi kendini hangi sütunda arayacağını biliyor.
 */
/**
 * Kullanıcı bağlantıları artık /kullanicilar sayfasına gidiyor: ana sayfa
 * işletme kazanımına odaklandığı için öğrenci/kullanıcı içeriği (üç adım,
 * uygulama ekranları, indirme bağlantıları, kullanıcı SSS'i) o sayfada.
 */
const USER_LINKS = [
  { href: "/kullanicilar", label: "Uygulama Hakkında" },
  { href: "/kullanicilar#sistem", label: "Nasıl Çalışır?" },
  { href: "/kullanicilar#uygulama-vitrini", label: "Uygulama Ekranları" },
  { href: "/kullanicilar#indir", label: "Uygulamayı İndir" },
  { href: "/kullanicilar#sss", label: "Kullanıcı S.S.S." },
];

const BUSINESS_LINKS = [
  { href: "/#nasil-calisir", label: "Nasıl Çalışır?" },
  { href: "/#isletmeye-faydasi", label: "İşletmene Faydası" },
  { href: "/#ozellikler", label: "Özellikler" },
  { href: "/#pilot", label: "Pilot Program" },
  { href: "/#sss", label: "S.S.S." },
  { href: "/#iletisim", label: "İletişim" },
];

const LEGAL_LINKS = [
  { href: "/kvkk", label: "KVKK Aydınlatma Metni" },
  { href: "/acik-riza", label: "Açık Rıza Beyanı" },
  { href: "/privacy", label: "Gizlilik Politikası" },
  { href: "/terms", label: "Kullanıcı Sözleşmesi (EULA)" },
  { href: "/support", label: "Destek" },
];

const SOCIAL = [
  { href: INSTAGRAM_URL, icon: Instagram, label: "Instagram" },
  { href: LINKEDIN_URL, icon: Linkedin, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-trinq-navy-darkest text-[#f6f7ef]">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-trinq-navy-mid/25 blur-[100px]"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.1fr]">
          {/* Marka */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block" aria-label="trinQ ana sayfa">
              <img src="/trinq-logo.png" alt="trinQ" className="h-[58px] w-auto object-contain" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#f6f7ef]/55">
              Kafeler ve restoranlar için dijital sadakat platformu. Dijital damga
              kartları ve kampanyalarla müşterilerinizi tekrar ziyaret etmeye teşvik
              edin.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-[#f6f7ef]/65 transition-colors hover:border-white/25 hover:bg-white/5 hover:text-white"
                  aria-label={s.label}
                >
                  <s.icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Kullanıcılar */}
          <nav aria-label="Kullanıcılar için bağlantılar">
            <h3 className="t-eyebrow text-[#f6f7ef]/45">Kullanıcılar</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {USER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#f6f7ef]/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* İşletmeler */}
          <nav aria-label="İşletmeler için bağlantılar">
            <h3 className="t-eyebrow text-[#f6f7ef]/45">İşletmeler</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {BUSINESS_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#f6f7ef]/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Yasal */}
          <nav aria-label="Yasal bağlantılar">
            <h3 className="t-eyebrow text-[#f6f7ef]/45">Yasal</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#f6f7ef]/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* İletişim */}
          <div>
            <h3 className="t-eyebrow text-[#f6f7ef]/45">İletişim</h3>
            <ul className="mt-5 flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#f6f7ef]/40" />
                <span className="text-sm text-[#f6f7ef]/60">İstanbul, Türkiye</span>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-start gap-3 text-sm text-[#f6f7ef]/60 transition-colors hover:text-white [overflow-wrap:anywhere]"
                >
                  <Mail size={16} className="mt-0.5 shrink-0 text-[#f6f7ef]/40" />
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>

            <a
              href={BUSINESS_PANEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-[44px] items-center rounded-full border border-white/15 px-5 text-sm font-semibold text-[#f6f7ef] transition-colors hover:bg-white/5"
            >
              İşletme Girişi
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/8 pt-8 text-center text-sm text-[#f6f7ef]/40 sm:flex-row sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} trinQ. Tüm hakları saklıdır.</p>
          <p>İstanbul&apos;da tasarlandı.</p>
        </div>
      </div>
    </footer>
  );
}
