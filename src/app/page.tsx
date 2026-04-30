import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturesGridSection from "@/components/FeaturesGridSection";
import AppShowcaseSection from "@/components/AppShowcaseSection";
import UsersSection from "@/components/UsersSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import SectorsSection from "@/components/SectorsSection";
import BusinessSection from "@/components/BusinessSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import MainWithReveal from "@/components/MainWithReveal";

export default function Home() {
  return (
    <>
      <Header />
      <MainWithReveal>
        {/* #hakkimizda: yalnızca menü hedefi (ayrı “hakkımızda” içerik bloğu yok) */}
        <Hero />
        <div id="hakkimizda" className="h-px w-full" aria-hidden />
        <FeaturesGridSection />
        <AppShowcaseSection />
        <HowItWorksSection />
        <UsersSection />
        {/* <DigitalRevolutionSection /> */}
        <SectorsSection />
        <BusinessSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
        <CTASection />
        <Footer />
      </MainWithReveal>
    </>
  );
}
