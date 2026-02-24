import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/data/faqs";
import SectionWrapper from "@/components/shared/SectionWrapper";

const FinalCTASection = () => (
  <SectionWrapper id="faq" maxWidth="md">
    <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
      Perguntas Frequentes
    </h2>

    <Accordion type="single" collapsible className="space-y-3">
      {faqs.map((faq, i) => (
        <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-lg border border-border px-6 shadow-sm">
          <AccordionTrigger className="text-foreground font-body text-left text-lg hover:no-underline">
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground font-body text-base">
            {faq.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </SectionWrapper>
);

export default FinalCTASection;
