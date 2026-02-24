import { useEffect } from "react";
import PromoBanner from "@/components/landing/PromoBanner";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import OpportunitySection from "@/components/landing/OpportunitySection";
import ModulesSection from "@/components/landing/ModulesSection";
import IncomeSection from "@/components/landing/IncomeSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import GiveawaySection from "@/components/landing/GiveawaySection";
import OfferSection from "@/components/landing/OfferSection";
import AboutSection from "@/components/landing/AboutSection";
import FinalCTASection from "@/components/landing/FinalCTASection";
import Footer from "@/components/landing/Footer";
import ScrollReveal from "@/components/landing/ScrollReveal";
import FloatingConfetti from "@/components/landing/FloatingConfetti";
import FloatingCTA from "@/components/landing/FloatingCTA";
import ProductsGallerySection from "@/components/landing/ProductsGallerySection";

const SCROLL_OFFSET = 80;

const Index = () => {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"], button[data-href]');
      if (!target) return;

      const href = target.getAttribute("href") || target.getAttribute("data-href");
      if (!href || !href.startsWith("#") || href === "#") return;

      const el = document.querySelector(href);
      if (!el) return;

      e.preventDefault();

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;

      window.scrollTo({
        top,
        behavior: prefersReduced ? "auto" : "smooth",
      });

      if (!prefersReduced) {
        const onScroll = () => {
          const diff = Math.abs(window.scrollY - (top > 0 ? top : 0));
          if (diff < 2 || Math.abs(window.scrollY + window.innerHeight - document.body.scrollHeight) < 2) {
            el.classList.add("section-glow");
            setTimeout(() => el.classList.remove("section-glow"), 1000);
            window.removeEventListener("scroll", onScroll);
          }
        };
        setTimeout(() => window.addEventListener("scroll", onScroll, { passive: true }), 100);
        setTimeout(() => window.removeEventListener("scroll", onScroll), 3000);
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <main className="min-h-screen relative">
      <PromoBanner />
      <FloatingConfetti />
      <FloatingCTA />
      <HeroSection />
      {/* Emocao */}
      <ScrollReveal><ProblemSection /></ScrollReveal>
      <ScrollReveal><OpportunitySection /></ScrollReveal>
      <ScrollReveal><ProductsGallerySection /></ScrollReveal>
      {/* Autoridade + prova social */}
      <ScrollReveal><AboutSection /></ScrollReveal>
      <ScrollReveal><TestimonialsSection /></ScrollReveal>
      {/* Logica e valor */}
      <ScrollReveal><ModulesSection /></ScrollReveal>
      <ScrollReveal><BenefitsSection /></ScrollReveal>
      <ScrollReveal><IncomeSection /></ScrollReveal>
      {/* Decisao */}
      <ScrollReveal><OfferSection /></ScrollReveal>
      <ScrollReveal><GiveawaySection /></ScrollReveal>
      {/* Objecoes finais */}
      <ScrollReveal><FinalCTASection /></ScrollReveal>
      <Footer />
    </main>
  );
};

export default Index;
