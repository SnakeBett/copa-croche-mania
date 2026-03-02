import SectionWrapper from "@/components/shared/SectionWrapper";

const ProblemSection = () => (
  <SectionWrapper id="problema" maxWidth="md" bg="card" center>
    <div className="space-y-6 text-center">
      <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
        Seu crochê não é fraco.<br />
        <span className="text-accent">O que falta é produzir o que o mercado quer comprar.</span>
      </h2>
      <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed max-w-xl mx-auto">
        A cada Copa, a procura por peças nas cores do Brasil <strong className="text-foreground">dispara</strong>. 
        Bolsas, sousplats, acessórios — tudo vira oportunidade de venda.
      </p>
      <p className="text-foreground font-semibold bg-accent/5 rounded-xl p-4 border-l-4 border-accent font-body text-base md:text-lg max-w-xl mx-auto text-left">
        Mas quem vende mais é quem começa a produzir <strong className="text-accent">antes</strong> da demanda chegar.
      </p>
    </div>
  </SectionWrapper>
);

export default ProblemSection;
