import SectionWrapper from "@/components/shared/SectionWrapper";

const ProblemSection = () => (
  <SectionWrapper id="problema" maxWidth="md" bg="card" center>
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent to-secondary rounded-full hidden md:block" />
      <div className="md:pl-8 space-y-8">
        <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
          Quando a Copa começa…<br />
          <span className="text-accent">a procura dispara.</span>
        </h2>
        <div className="space-y-5 text-muted-foreground font-body text-base md:text-lg leading-relaxed text-left md:text-center">
          <p>
            A procura por itens nas cores do Brasil aumenta durante reuniões para assistir aos jogos,
            eventos temáticos, presentes, decoração e confraternizações.
          </p>
          <p>
            E é nesse momento que muitas artesãs percebem que poderiam estar vendendo…
          </p>
          <p className="text-foreground font-semibold bg-accent/5 rounded-xl p-4 border-l-4 border-accent">
            Mas quem vende mais é quem começou a produzir <strong className="text-accent">antes</strong> da demanda chegar.
          </p>
        </div>
      </div>
    </div>
  </SectionWrapper>
);

export default ProblemSection;
