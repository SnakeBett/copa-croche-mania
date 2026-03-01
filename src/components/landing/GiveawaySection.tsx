import { useState, useEffect } from "react";
import { Gift, Trophy, Award, Package, Clock, Sparkles } from "lucide-react";
import { SITE } from "@/data/site";
import {
  CAMPAIGN_KEY,
  CAMPAIGN_DAYS,
  mainPrizeItems,
  secondaryPrizeItems,
  giveawayRules,
} from "@/data/giveaway";
import CTAButton from "@/components/shared/CTAButton";

const getCampaignEndDate = () => {
  const stored = localStorage.getItem(CAMPAIGN_KEY);
  if (stored) {
    const end = new Date(stored);
    if (end.getTime() > Date.now()) return end;
  }
  const end = new Date();
  end.setDate(end.getDate() + CAMPAIGN_DAYS);
  end.setHours(23, 59, 59, 999);
  localStorage.setItem(CAMPAIGN_KEY, end.toISOString());
  return end;
};

const useCampaignCountdown = (endDate: Date) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, endDate.getTime() - now);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const GiveawaySection = () => {
  const [endDate] = useState(getCampaignEndDate);
  const { days, hours, minutes, seconds } = useCampaignCountdown(endDate);

  return (
    <section
      id="campanha-kit"
      className="py-16 md:py-24 px-3 md:px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(145 45% 32% / 0.08) 0%, hsl(145 45% 32% / 0.03) 100%)" }}
    >
      <div className="max-w-3xl mx-auto relative">
        {/* Badge topo */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-700 to-blue-700 text-white rounded-full px-5 py-2 text-xs font-bold font-body tracking-wide shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            SORTEIO ATIVO
          </span>
        </div>

        {/* Countdown no topo */}
        <div className="bg-gradient-to-r from-emerald-700 to-blue-700 rounded-t-2xl px-6 py-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-white/70" />
            <p className="text-xs text-white/70 font-body uppercase tracking-widest font-semibold">Encerra em</p>
          </div>
          <div className="flex justify-center gap-3">
            {[
              { value: days, label: "dias" },
              { value: hours, label: "horas" },
              { value: minutes, label: "min" },
              { value: seconds, label: "seg" },
            ].map((block) => (
              <div key={block.label} className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[60px]">
                <p className="text-2xl md:text-3xl font-bold font-display text-white leading-none">
                  {String(block.value).padStart(2, "0")}
                </p>
                <p className="text-[10px] text-white/60 font-body mt-1">{block.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Card principal */}
        <div className="bg-card rounded-b-2xl border border-t-0 border-primary/10 shadow-2xl px-5 py-8 md:px-10 md:py-10">
          <div className="space-y-8 text-center">
            {/* Titulo */}
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center mx-auto mb-2">
                <Gift className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground">
                Sorteio Especial de Preparação para a Copa
              </h2>
              <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed max-w-lg mx-auto">
                <strong className="text-foreground">5 novas alunas</strong> serão escolhidas para receber o
                <span className="font-bold text-primary"> Kit Inicial de Produção em Crochê nas Cores do Brasil</span>
              </p>
            </div>

            {/* Cards de premios lado a lado */}
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {/* 1a ganhadora */}
              <div className="relative bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-secondary/30 rounded-2xl p-5 text-left overflow-hidden">
                <Trophy className="absolute -top-1 -right-1 w-16 h-16 text-secondary/10 rotate-12" />
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <p className="font-body font-bold text-foreground text-sm">1 Ganhadora Principal</p>
                    <p className="font-body text-[10px] text-muted-foreground">Kit completo</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {mainPrizeItems.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground font-body">
                      <Sparkles className="w-3.5 h-3.5 text-secondary mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 4 ganhadoras */}
              <div className="relative bg-gradient-to-br from-emerald-50 to-green-50 border border-primary/20 rounded-2xl p-5 text-left overflow-hidden">
                <Award className="absolute -top-1 -right-1 w-16 h-16 text-primary/10 rotate-12" />
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-body font-bold text-foreground text-sm">4 Ganhadoras</p>
                    <p className="font-body text-[10px] text-muted-foreground">Kit básico</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {secondaryPrizeItems.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground font-body">
                      <Package className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bloco motivacional */}
            <div className="bg-gradient-to-r from-primary/5 to-primary/[0.02] border border-primary/10 rounded-2xl px-5 py-5 max-w-xl mx-auto">
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                Você entra no curso. Aprende o passo a passo.
                E ainda pode receber o material para já começar produzindo antes da Copa.
              </p>
              <p className="text-sm font-bold text-foreground font-body mt-3">
                Sem desculpa. Sem enrolação. <span className="text-primary">Só execução.</span>
              </p>
            </div>

            {/* Regras compactas */}
            <div className="flex flex-wrap justify-center gap-3 text-[11px] text-muted-foreground/70 font-body">
              {giveawayRules.map((rule, i) => (
                <span key={i} className="bg-muted/50 rounded-full px-3 py-1">{rule}</span>
              ))}
            </div>

            {/* CTA */}
            <div className="space-y-2">
              <CTAButton href="#oferta" variant="gradient-round">
                ⚽ QUERO GARANTIR MINHA VAGA
              </CTAButton>
              <p className="text-xs text-muted-foreground/60 font-body">
                Essa não é só uma oportunidade de aprender.
                <strong className="text-foreground"> É uma oportunidade de começar equipada.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiveawaySection;
