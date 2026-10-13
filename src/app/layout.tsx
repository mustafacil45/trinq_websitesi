import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Geist_Mono, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import PageWrapper from "@/components/PageWrapper";
import CookieBanner from "@/components/CookieBanner";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const SITE_URL = "https://www.trinqapp.com";
/*
 * Başlık ve açıklama ana sayfanın hedef kitlesiyle hizalı: işletme sahibi.
 * Önceden kullanıcıya sesleniyordu ("Kasada QR'ı okut, damgan düşsün") —
 * arama sonucunda işletme sahibi kendisine hitap eden bir şey görmüyordu.
 * Kullanıcıya yönelik metin /kullanicilar sayfasının metadata'sında.
 */
const TITLE = "trinQ — Kafeler ve Restoranlar için Dijital Sadakat Platformu";
const DESCRIPTION =
  "Dijital damga kartları ve kampanyalar oluştur, müşterilerini tekrar ziyaret etmeye teşvik et. İşletmeni trinQ'ya ekle — pilot dönem boyunca ücretsiz, taahhüt yok.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | trinQ",
  },
  description: DESCRIPTION,
  keywords: [
    "kafe sadakat programı",
    "restoran sadakat programı",
    "dijital damga kartı",
    "işletme sadakat programı",
    "kampanya yönetimi",
    "QR sadakat",
    "müşteri sadakati",
    "dijital sadakat",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE_URL,
    siteName: "trinQ",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  icons: {
    // SVG önce: tarayıcı destekliyorsa her boyutta keskin kalır.
    // Desteklemeyenler PNG'ye, en eskiler /favicon.ico'ya düşer.
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#11392e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${plusJakartaSans.variable} ${geistMono.variable} ${inter.variable} ${instrumentSerif.variable} font-sans antialiased`}
      >
        <a
          href="#anasayfa"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-trinq-navy focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-trinq-cream"
        >
          İçeriğe geç
        </a>
        <ScrollProgress />
        <PageWrapper>{children}</PageWrapper>
        <BackToTop />
        <CookieBanner />
      </body>
    </html>
  );
}
