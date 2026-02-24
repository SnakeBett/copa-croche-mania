import { modules } from "@/data/modules";
import { SITE } from "@/data/site";
import SectionWrapper from "@/components/shared/SectionWrapper";
import CTAButton from "@/components/shared/CTAButton";

const ModulesSection = () => (
  <SectionWrapper id="modulos" maxWidth="xl" bg="card" center>
    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
      O que você vai aprender
    </h2>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((m) => (
        <div key={m.title} className="bg-background rounded-xl p-6 shadow-md border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="text-4xl mb-4">{m.icon}</div>
          <h3 className="text-xl font-bold text-foreground mb-2">{m.title}</h3>
          <p className="text-muted-foreground font-body text-sm">{m.desc}</p>
        </div>
      ))}
    </div>

    <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
      Tudo explicado <strong className="text-foreground">passo a passo</strong>, de forma simples, organizada e prática.
      <br />Mesmo que você nunca tenha vendido uma peça.
    </p>

    <CTAButton href={SITE.offerLink} variant="accent" socialProof>
      ⚽ Quero aprender agora
    </CTAButton>
  </SectionWrapper>
);

export default ModulesSection;
