import { useState, useEffect } from "react";
import { SITE } from "@/data/site";
import CTAButton from "@/components/shared/CTAButton";
import { ShieldCheck, Lock } from "lucide-react";

const heroFeatures = [
  "Receitas exclusivas de bolsas, sousplats e acessórios",
  "Videoaulas passo a passo (do básico ao avançado)",
  "Guia de precificação + apresentação para venda",
  "Você pode vender todas as peças que criar",
];

const avatars = [
  "/images/testimonials/avatar-1.png",
  "/images/testimonials/avatar-2.png",
  "/images/testimonials/avatar-3.png",
];

const COUNTDOWN_KEY = "copa-croche-countdown-end";

const getCountdownEnd = () => {
  const stored = localStorage.getItem(COUNTDOWN_KEY);
  if (stored) {
    const end = new Date(stored);
    if (end.getTime() > Date.now()) return end;
  }
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  localStorage.setItem(COUNTDOWN_KEY, end.toISOString());
  return end;
};

const HeroSection = () => {
  const [endDate] = useState(getCountdownEnd);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, endDate.getTime() - now);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return (
    <section
      id="inicio"
      className="pt-6 pb-12 md:py-20 px-4 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(145 45% 32% / 0.06) 0%, hsl(43 85% 55% / 0.05) 50%, hsl(30 33% 94%) 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
        <div className="space-y-5 md:space-y-7">
          <div className="flex justify-center md:justify-start gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 text-xs font-semibold font-body tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Copa do Mundo 2026
            </span>
            <span className="inline-flex items-center gap-1.5 bg-secondary/10 text-secondary-foreground border border-secondary/30 rounded-full px-3 py-1.5 text-xs font-bold font-body">
              MAIS DE 689 ALUNAS
            </span>
          </div>

          <h1 className="text-2xl md:text-[2.7rem] leading-tight font-bold text-foreground text-center md:text-left">
            Em 7 dias, você vai estar vendendo peças de crochê temáticas da Copa
            <span className="text-accent"> — mesmo começando do zero.</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground font-body leading-relaxed text-center md:text-left">
            Aprenda a criar <strong>bolsas, sousplats e acessórios</strong> que as pessoas compram para torcer, decorar e presentear nos dias de jogo.
          </p>

          <ul className="space-y-2 font-body text-foreground text-sm md:text-base">
            {heroFeatures.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center text-xs shrink-0">&#x2714;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-center md:justify-start gap-2 font-body text-sm">
            <span className="text-muted-foreground">Oferta encerra em:</span>
            <div className="flex gap-1">
              {[
                { v: hours, l: "h" },
                { v: minutes, l: "m" },
                { v: seconds, l: "s" },
              ].map((b) => (
                <span key={b.l} className="bg-foreground text-background font-bold px-2 py-1 rounded text-xs tabular-nums">
                  {String(b.v).padStart(2, "0")}{b.l}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center md:items-start gap-3">
            <CTAButton href={SITE.checkoutLink} className="animate-[cta-breathe_4s_ease-in-out_infinite] text-base md:text-lg px-10 py-5">
              QUERO COMEÇAR A VENDER NA COPA
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
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground/70 font-body">
              <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Compra 100% Segura</span>
              <span className="w-px h-3 bg-border" />
              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Garantia 7 dias</span>
            </div>
          </div>
        </div>

        <div className="relative w-full max-w-sm mx-auto md:max-w-none">
          <div className="overflow-hidden rounded-2xl shadow-2xl border border-border/30 md:-rotate-2 md:hover:rotate-0 transition-transform duration-500">
            <img
              alt="Crochê nas cores do Brasil para a Copa"
              className="w-full h-auto object-contain"
              src="/lovable-uploads/7489d8c3-66ca-44fa-ac39-1c19347716b8.png"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 bg-secondary text-secondary-foreground font-bold font-body text-xs md:text-sm px-4 py-2 rounded-xl shadow-lg rotate-3">
            Apenas {SITE.price}!
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
