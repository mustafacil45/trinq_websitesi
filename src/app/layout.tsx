import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import PageWrapper from "@/components/PageWrapper";
import CookieBanner from "@/components/CookieBanner";
import WhatsAppButton from "@/components/WhatsAppButton";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "trinQ | Fişi Değil, Deneyimi Sakla",
  description: "Dijital fiş ve sadakat platformu. Fişlerini topla, damga kazan, ödüllerini al.",
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
        <PageWrapper>{children}</PageWrapper>
        <CookieBanner />
        <WhatsAppButton />
      </body>
    </html>
  );
}
