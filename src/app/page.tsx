import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import BusinessSection from "@/components/BusinessSection";
import FeaturesGridSection from "@/components/FeaturesGridSection";
import AppShowcaseSection from "@/components/AppShowcaseSection";
import SectorsSection from "@/components/SectorsSection";
import PilotSection from "@/components/PilotSection";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

/**
 * ANA SAYFA — hedef kitle: KAFE VE RESTORAN İŞLETMELERİ.
 *
 * Ticari hedef işletmeleri platforma kazandırmak olduğu için sayfanın tek
 * vaadi (müşteri sadakatini güçlendirmek, tekrar ziyareti teşvik etmek) ve
 * tek aksiyonu (işletme başvurusu) var. Öğrenci/kullanıcı içeriği silinmedi,
 * /kullanicilar sayfasına taşındı.
 *
 * Bölüm sırası ziyaretçinin sorularını sırayla cevaplıyor:
 *
 *   1. Hero ............... "Bu benim neyime yarar?"       → tek CTA
 *   2. Problem ............ "Bu sorun bende var mı?"
 *   3. Nasıl çalışır ...... "Pratikte ne yapacağım?"       → gerçek panel
 *   4. İşletmene faydası .. "Bana ne kazandırıyor?"
 *   5. Özellikler ......... "Bugün neler aktif?"
 *   6. Ürün görselleri .... "Gerçekten çalışıyor mu?"      → gerçek ekranlar
 *   7. Sektörler .......... "Benim işletmem uygun mu?"
 *   8. Pilot program ...... "Bana ne kadara mal olacak?"   → tek teklif
 *   9. Hakkımızda ......... "Bunlar kim?"
 *  10. S.S.S. ............. kalan tüm sorular (işletme soruları)
 *  11. İletişim .......... "Önce konuşmak istiyorum"
 *  12. Son CTA ........... başvuru
 *
 * Zemin tonları bilinçli dönüşümlü: dark → light → paper → light → paper →
 * dark → light → paper → light → paper → light → dark.
 *
 * YAYINDAN ÇIKARILANLAR (dosyalar duruyor, sadece buraya bağlı değiller):
 *
 *   • TestimonialsSection — yorumlar gerçek müşteri yorumu değildi; hem güven
 *     hem reklam mevzuatı açısından riskliydi. Pilot işletmelerden izinli
 *     gerçek geri bildirim toplanınca içerik değiştirilip geri eklenebilir.
 *     Yeri: <SectorsSection /> ile <PilotSection /> arası.
 *
 *   • StoresSection / PartnerMerchantsMap — anlaşmalı işletme sayısı
 *     gösterilebilir bir seviyeye gelince geri takılabilir.
 */
export default function Home() {
  return (
    <>
      <Header />
      {/* overflow-x burada OLMAMALI: sticky bölümleri kırar (bkz. globals.css) */}
      <main>
        <Hero variant="business" />
        <ProblemSection />
        <HowItWorksSection />
        <BusinessSection />
        <FeaturesGridSection />
        <AppShowcaseSection variant="business" />
        <SectorsSection />
        <PilotSection />
        <AboutSection />
        <FAQSection audience="business" />
        <ContactSection />
        <CTASection variant="business" />
        <Footer />
      </main>
    </>
  );
}
