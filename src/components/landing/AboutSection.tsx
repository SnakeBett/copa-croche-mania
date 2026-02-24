import { Award, Target } from "lucide-react";
import SectionWrapper from "@/components/shared/SectionWrapper";

const AboutSection = () => (
  <SectionWrapper id="sobre" maxWidth="xl">
    <div className="flex flex-col md:flex-row items-start gap-10 md:gap-14">
      <div className="shrink-0 mx-auto md:mx-0">
        <div className="w-56 h-64 md:w-64 md:h-80 rounded-2xl overflow-hidden border-4 border-primary/20 shadow-lg bg-muted flex items-center justify-center">
          <img
            src="https://microchet.site/wp-content/uploads/2026/02/ChatGPT-Image-20-de-fev.-de-2026-19_41_15.png"
            alt="Luana Barbosa, instrutora do curso Copa Crochê Mania"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex-1 text-center md:text-left">
        <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-body font-medium">
          Sobre a Expert
        </span>

        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
          Conheça Luana Barbosa
        </h2>

        <p className="text-foreground font-body text-lg leading-relaxed mb-8">
          Luana Barbosa transformou o crochê de hobby em uma fonte de renda extra real.

Depois de perceber que peças comuns geravam pouco retorno, ela começou a focar em modelos temáticos que despertam mais interesse e aumentam as chances de venda.

Hoje, sua missão é ajudar outras artesãs a criarem peças que não só sejam bonitas…
mas que também tenham potencial de venda, principalmente em épocas de alta procura como a Copa do Mundo.
        </p>

        <div className="rounded-2xl border border-border bg-card p-6 space-y-5 text-left">
          <div className="flex items-start gap-4">
            <div className="shrink-0 mt-0.5">
              <Award className="w-7 h-7 text-secondary" strokeWidth={1.8} />
            </div>
            <div>
              <p className="font-body font-semibold text-foreground mb-1">Método validado por +689 alunas</p>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">
                Meu método já ajudou mais de +689 alunas a aprenderem novas técnicas e começarem a produzir peças com mais confiança.

Muitas delas passaram a vender suas criações como renda extra.
              </p>
            </div>
          </div>

          <div className="border-t border-border" />

          <div className="flex items-start gap-4">
            <div className="shrink-0 mt-0.5">
              <Target className="w-7 h-7 text-secondary" strokeWidth={1.8} />
            </div>
            <div>
              <p className="font-body font-semibold text-foreground mb-1">
                Nossa Missão
              </p>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">
                Ajudar você a transformar sua habilidade com crochê em peças que possam ser usadas, presenteadas ou vendidas durante datas especiais e eventos sazonais.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SectionWrapper>
);

export default AboutSection;
