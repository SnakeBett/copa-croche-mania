import { SITE } from "@/data/site";
import CTAButton from "@/components/shared/CTAButton";
import { Users } from "lucide-react";

const heroFeatures = [
  "+200 receitas exclusivas",
  "Bolsas e sousplats nas cores do Brasil",
  "Ideal para iniciantes",
  "Você pode vender as peças prontas",
];

const avatars = [
  "/images/testimonials/avatar-1.png",
  "/images/testimonials/avatar-2.png",
  "/images/testimonials/avatar-3.png",
];

const HeroSection = () => (
  <section
    id="inicio"
    className="pt-6 pb-12 md:py-20 px-4 relative overflow-hidden"
    style={{
      background: "linear-gradient(135deg, hsl(145 45% 32% / 0.06) 0%, hsl(43 85% 55% / 0.05) 50%, hsl(30 33% 94%) 100%)",
    }}
  >
    <div className="max-w-6xl mx-auto flex flex-col-reverse md:grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
      <div className="space-y-6 md:space-y-8">
        <div className="flex justify-center md:justify-start">
          <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 text-xs font-semibold font-body tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Copa do Mundo 2026
          </span>
        </div>

        <h1 className="text-2xl md:text-5xl leading-tight font-bold text-foreground text-center md:text-left">
          De 4 em 4 anos surge uma nova onda de pedidos por peças em verde e amarelo…
          <br />
          <span className="text-accent">E você ainda está fazendo as mesmas peças que todo mundo?</span>
        </h1>
        <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed text-center md:text-left">
          Aprenda a criar <strong>bolsas, sousplats e acessórios de crochê</strong> que as pessoas compram para torcer, decorar ou presentear nos dias de jogo. Mesmo que você ainda esteja no básico.
        </p>

        <ul className="space-y-2.5 font-body text-foreground text-sm md:text-base">
          {heroFeatures.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center text-sm shrink-0">⚽</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center md:items-start gap-4">
          <CTAButton href={SITE.ctaLink} className="animate-[cta-breathe_4s_ease-in-out_infinite] text-base md:text-lg px-10 py-5">
            ✨ QUERO COMEÇAR AGORA
          </CTAButton>
          <div className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground font-body">
            <div className="flex -space-x-2">
              {avatars.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="w-7 h-7 rounded-full border-2 border-background object-cover"
                />
              ))}
            </div>
            <span>
              <strong className="text-foreground">689+ alunas</strong> já se inscreveram
            </span>
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-sm mx-auto md:max-w-none">
        <div className="overflow-hidden rounded-2xl shadow-2xl border border-border/30 md:-rotate-2 md:hover:rotate-0 transition-transform duration-500">
          <img
            alt="Crochê nas cores do Brasil para a Copa"
            className="w-full h-auto object-contain"
            src="/lovable-uploads/7489d8c3-66ca-44fa-ac39-1c19347716b8.png"
          />
        </div>
        <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 bg-secondary text-secondary-foreground font-bold font-body text-xs md:text-sm px-4 py-2 rounded-xl shadow-lg rotate-3">
          R$29 apenas!
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
