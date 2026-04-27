import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AppShowcaseSection from "@/components/AppShowcaseSection";
import UsersSection from "@/components/UsersSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import DigitalRevolutionSection from "@/components/DigitalRevolutionSection";
import FeaturesGridSection from "@/components/FeaturesGridSection";
import SectorsSection from "@/components/SectorsSection";
import BusinessSection from "@/components/BusinessSection";
import AboutSection from "@/components/AboutSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import MainWithReveal from "@/components/MainWithReveal";

export default function Home() {
  return (
    <>
      <Header />
      <MainWithReveal>
        {/* === KULLANICILAR === */}
        <Hero />
        <AppShowcaseSection />
        <UsersSection />
        <HowItWorksSection />
        <DigitalRevolutionSection />

        {/* === İŞLETMELER === */}
        <FeaturesGridSection />
        <SectorsSection />
        <BusinessSection />
        <AboutSection />
        <PricingSection />
        <TestimonialsSection />

        {/* === ORTAK === */}
        <ContactSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </MainWithReveal>
    </>
  );
}
