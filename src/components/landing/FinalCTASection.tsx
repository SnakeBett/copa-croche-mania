import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";
import { SITE } from "@/data/site";
import SectionWrapper from "@/components/shared/SectionWrapper";
import CTAButton from "@/components/shared/CTAButton";

const FinalCTASection = () => (
  <SectionWrapper id="faq" maxWidth="md">
    <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
      Perguntas Frequentes
    </h2>

    <Accordion type="single" collapsible className="space-y-3">
      {faqs.map((faq, i) => (
        <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-lg border border-border px-6 shadow-sm">
          <AccordionTrigger className="text-foreground font-body text-left text-base md:text-lg hover:no-underline">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground font-body text-sm md:text-base">
            {faq.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>

    <div className="text-center space-y-4 pt-4">
      <p className="text-muted-foreground font-body text-base md:text-lg max-w-md mx-auto">
        Ainda esta em duvida? Lembre-se: voce tem <strong className="text-foreground">7 dias de garantia</strong> para testar sem risco.
      </p>
      <CTAButton href={SITE.checkoutLink} socialProof>
        QUERO GARANTIR MINHA VAGA AGORA
      </CTAButton>
    </div>
  </SectionWrapper>
);

export default FinalCTASection;
