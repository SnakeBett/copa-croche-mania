import { useState, useEffect } from "react";
import { Gift, Trophy, Award, Clock, Sparkles, ArrowRight } from "lucide-react";
import { SITE } from "@/data/site";
import {
  CAMPAIGN_KEY,
  CAMPAIGN_DAYS,
  mainPrizeItems,
  secondaryPrizeItems,
} from "@/data/giveaway";

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

const GiveawaySection = () => {
  const [endDate] = useState(getCampaignEndDate);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, endDate.getTime() - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return (
    <section
      id="sorteio"
      className="py-12 md:py-20 px-3 md:px-4 relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header chamativo */}
        <div className="text-center mb-8 md:mb-10">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary/20 to-secondary/10 border border-secondary/30 text-foreground rounded-full px-5 py-2 text-xs font-bold font-body tracking-wide mb-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary" />
            </span>
            SORTEIO EXCLUSIVO PARA ALUNAS
          </span>
          <h2 className="text-2xl md:text-4xl font-bold font-display text-foreground leading-tight">
            Compre o curso e concorra a um<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-blue-700">
              Kit Completo de Crochê nas Cores do Brasil
            </span>
          </h2>
          <p className="text-muted-foreground font-body text-sm md:text-base mt-3 max-w-lg mx-auto">
            Além de aprender, você pode <strong className="text-foreground">ganhar o material</strong> para começar a produzir imediatamente.
          </p>
        </div>

        {/* Card principal com gradiente */}
        <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-blue-900 rounded-3xl overflow-hidden shadow-2xl">
          {/* Countdown */}
          <div className="bg-black/20 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-secondary" />
              <p className="text-white/80 font-body text-sm font-semibold">Sorteio encerra em:</p>
            </div>
            <div className="flex gap-2">
              {[
                { value: days, label: "dias" },
                { value: hours, label: "hrs" },
                { value: minutes, label: "min" },
                { value: seconds, label: "seg" },
              ].map((block) => (
                <div key={block.label} className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[50px] text-center">
                  <p className="text-lg md:text-xl font-bold font-display text-white leading-none tabular-nums">
                    {String(block.value).padStart(2, "0")}
                  </p>
                  <p className="text-[9px] text-white/50 font-body mt-0.5">{block.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Conteúdo dos prêmios */}
          <div className="p-6 md:p-10">
            <div className="grid md:grid-cols-2 gap-5">
              {/* Prêmio principal */}
              <div className="relative bg-white/10 backdrop-blur-sm border border-secondary/30 rounded-2xl p-6 text-left overflow-hidden">
                <div className="absolute top-3 right-3">
                  <span className="bg-secondary text-secondary-foreground text-[10px] font-bold font-body px-2.5 py-1 rounded-full">
                    PRÊMIO PRINCIPAL
                  </span>
                </div>
                <Trophy className="w-10 h-10 text-secondary mb-4" />
                <p className="font-body font-bold text-white text-lg mb-1">1 Ganhadora</p>
                <p className="font-body text-white/50 text-xs mb-4">Kit completo para começar a produzir</p>
                <ul className="space-y-2.5">
                  {mainPrizeItems.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-white/90 font-body">
                      <Sparkles className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prêmios secundários */}
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-left overflow-hidden">
                <div className="absolute top-3 right-3">
                  <span className="bg-white/10 text-white text-[10px] font-bold font-body px-2.5 py-1 rounded-full">
                    + 4 GANHADORAS
                  </span>
                </div>
                <Award className="w-10 h-10 text-emerald-400 mb-4" />
                <p className="font-body font-bold text-white text-lg mb-1">4 Ganhadoras</p>
                <p className="font-body text-white/50 text-xs mb-4">Kit básico para iniciar</p>
                <ul className="space-y-2.5">
                  {secondaryPrizeItems.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-white/90 font-body">
                      <Gift className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Motivacional + CTA */}
            <div className="mt-8 text-center space-y-5">
              <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 max-w-lg mx-auto">
                <p className="text-white/80 font-body text-sm leading-relaxed">
                  Você entra no curso, aprende o passo a passo, e ainda pode
                  <strong className="text-secondary"> receber o material para começar a produzir antes da Copa.</strong>
                </p>
              </div>

              <a
                href={SITE.checkoutLink}
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold text-base md:text-lg px-8 py-4 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 font-body"
              >
                QUERO PARTICIPAR DO SORTEIO
                <ArrowRight className="w-5 h-5" />
              </a>

              <p className="text-white/40 font-body text-[11px] max-w-md mx-auto">
                Ao comprar o curso, você automaticamente participa do sorteio.
                5 alunas serão sorteadas. Resultado divulgado oficialmente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiveawaySection;
