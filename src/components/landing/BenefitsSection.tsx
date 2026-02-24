import { benefits } from "@/data/benefits";
import SectionWrapper from "@/components/shared/SectionWrapper";

const gradients = [
  "from-emerald-500/20 to-emerald-600/10",
  "from-blue-500/20 to-blue-600/10",
  "from-yellow-500/20 to-yellow-600/10",
  "from-emerald-500/20 to-emerald-600/10",
  "from-blue-500/20 to-blue-600/10",
  "from-yellow-500/20 to-yellow-600/10",
];

const BenefitsSection = () => (
  <SectionWrapper id="beneficios" maxWidth="lg" bg="card" center>
    <h2 className="text-2xl md:text-4xl font-bold text-foreground">
      Benefícios da Apostila
    </h2>

    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {benefits.map(({ icon: Icon, text, desc }, i) => (
        <div key={text} className="bg-background rounded-xl p-5 md:p-6 shadow-md border border-border flex flex-col items-center text-center gap-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${gradients[i]} flex items-center justify-center`}>
            <Icon className="w-7 h-7 md:w-8 md:h-8 text-accent" />
          </div>
          <h3 className="font-bold text-foreground text-sm md:text-lg leading-tight">{text}</h3>
          <p className="text-muted-foreground font-body text-xs md:text-sm">{desc}</p>
        </div>
      ))}
    </div>
  </SectionWrapper>
);

export default BenefitsSection;
