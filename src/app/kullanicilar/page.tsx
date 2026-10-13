import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import UsersSection from "@/components/UsersSection";
import AppShowcaseSection from "@/components/AppShowcaseSection";
import SectorsSection from "@/components/SectorsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Uygulamayı Kullananlar İçin",
  description:
    "trinQ uygulamasıyla çevrendeki kafe ve restoranların kampanyalarını keşfet, kasada QR'ı okut, damga biriktir ve ödülünü anında kullan. Kullanıcılar için ücretsiz.",
  alternates: { canonical: "/kullanicilar" },
};

/**
 * KULLANICI SAYFASI — hedef kitle: uygulamayı kullanan (öğrenci dahil) herkes.
 *
 * Ana sayfa işletme kazanımına odaklandığı için kullanıcı içeriği SİLİNMEDİ,
 * buraya taşındı: hero'nun kullanıcı varyantı, üç adımlık anlatım ve canlı
 * damga kartı, gerçek uygulama ekranları, kullanıcı S.S.S.'i ve indirme
 * bağlantıları. Mağaza rozetleri burada ilk aksiyon — ana sayfada hiç yok,
 * çünkü orada başvuru CTA'sıyla yarışıyorlardı.
 */
export default function UsersPage() {
  return (
    <>
      <Header />
      {/* overflow-x burada OLMAMALI: sticky bölümleri kırar (bkz. globals.css) */}
      <main>
        <Hero variant="user" />
        <UsersSection />
        <AppShowcaseSection variant="user" />
        <SectorsSection audience="user" />
        <FAQSection audience="user" />
        <CTASection variant="user" />
        <Footer />
      </main>
    </>
  );
}
