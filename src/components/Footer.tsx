"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import Logo from "./Logo";

/** Header ile uyumlu sıra; sayfa üzerinde yukarıdan aşağı akış */
const QUICK_LINKS = [
  { href: "/", label: "Anasayfa" },
  { href: "/#hakkimizda", label: "Hakkımızda" },
  { href: "/#ozellikler", label: "Özellikler" },
  { href: "/#sistem", label: "Nasıl Çalışır?" },
  { href: "/#isletmeler-icin", label: "İşletmeler İçin" },
  { href: "/#isletmeler", label: "Mağazalar" },
  { href: "/#iletisim", label: "İletişim" },
  { href: "/#sss", label: "S.S.S." },
];

const LEGAL_LINKS = [
  { href: "/kvkk", label: "KVKK Aydınlatma Metni" },
  { href: "/cerez-politikasi", label: "Çerez Politikası" },
  { href: "/kullanim-kosullari", label: "Kullanım Koşulları" },
  { href: "/gizlilik", label: "Gizlilik Politikası" },
];

const SOCIAL = [
  { href: "https://instagram.com/trinqapptr", icon: Instagram, label: "Instagram" },
  { href: "https://www.linkedin.com/company/trinqapp/?viewAsMember=true", icon: Linkedin, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <motion.footer
      className="border-t border-slate-200/80 bg-trinq-navy"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Ana grid: 4 kolon */}
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
          {/* 1. Kolon: Logo + Açıklama */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block" aria-label="trinQ ana sayfa">
              <Logo size="sm" showText={true} variant="light" />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Sadakat platformu. Fişlerini topla, damga kazan, ödüllerini al. İşletmenizi dijitale taşıyın.
            </p>
            {/* Sosyal medya */}
            <div className="mt-6 flex items-center gap-4">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 transition-colors hover:text-white"
                  aria-label={s.label}
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Kolon: Hızlı Bağlantılar */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/80">
              Hızlı Bağlantılar
            </h3>
            <nav className="flex flex-col gap-2.5" aria-label="Footer menü">
              {QUICK_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm leading-relaxed text-white/60 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* 3. Kolon: Yasal */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/80">
              Yasal
            </h3>
            <nav className="flex flex-col gap-2.5" aria-label="Yasal linkler">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm leading-relaxed text-white/60 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* 4. Kolon: İletişim */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white/80">
              İletişim
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-white/50" />
                <span className="text-sm text-white/60">
                  İstanbul, Türkiye
                </span>
              </li>
              <li>
                <a
                  href="mailto:info@trinqapp.com"
                  className="flex items-center gap-3 text-sm text-white/60 transition hover:text-white [overflow-wrap:anywhere]"
                >
                  <Mail size={16} className="shrink-0 text-white/50" />
                  info@trinqapp.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt çizgi */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/50">
          © {new Date().getFullYear()} trinQ. Tüm hakları saklıdır.
        </div>
      </div>
    </motion.footer>
  );
}
