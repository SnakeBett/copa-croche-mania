import { useState, useEffect } from "react";
import { ShieldCheck, Star, Clock, Gift } from "lucide-react";
import { offerBenefits, offerBonuses } from "@/data/offer";
import { SITE } from "@/data/site";

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

const OfferSection = () => {
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
      id="oferta"
      className="py-16 md:py-24 px-4"
      style={{ background: "linear-gradient(180deg, hsl(145 45% 32% / 0.1) 0%, hsl(145 45% 32% / 0.04) 50%, hsl(30 33% 94% / 0) 100%)" }}
    >
      <div className="max-w-lg mx-auto">
        <div className="bg-card rounded-2xl shadow-[0_8px_40px_hsl(145_45%_32%/0.18)] border-2 border-primary/20 overflow-hidden animate-[glow-border_3s_ease-in-out_infinite]">
          <div className="bg-gradient-to-r from-emerald-700 to-blue-700 py-3 px-6 flex justify-center">
            <span className="inline-flex items-center gap-2 text-white text-sm font-bold font-body px-4 py-1 rounded-full">
              <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
              ÚLTIMA CHANCE — OFERTA TERMINA HOJE
              <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
            </span>
          </div>

          <div className="bg-gradient-to-r from-emerald-800 to-blue-800 px-6 py-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-3.5 h-3.5 text-white/70" />
              <p className="text-[10px] text-white/70 font-body uppercase tracking-widest font-semibold">Oferta encerra em</p>
            </div>
            <div className="flex justify-center gap-2">
              {[
                { value: hours, label: "horas" },
                { value: minutes, label: "min" },
                { value: seconds, label: "seg" },
              ].map((block) => (
                <div key={block.label} className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[52px]">
                  <p className="text-xl md:text-2xl font-bold font-display text-white leading-none tabular-nums">
                    {String(block.value).padStart(2, "0")}
                  </p>
                  <p className="text-[9px] text-white/60 font-body mt-0.5">{block.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="px-5 md:px-8 py-8 space-y-6 text-center">
            <div className="space-y-1">
              <h2 className="text-2xl md:text-3xl font-bold font-display text-primary">Curso Completo do Crochê</h2>
              <p className="text-muted-foreground font-body text-sm">
                Todas as receitas e videoaulas para vender na Copa do Mundo!
              </p>
            </div>

            <p className="text-xs text-primary font-bold font-body bg-primary/5 rounded-full px-4 py-1.5 inline-block">
              Essa oferta está disponível para as próximas 20 alunas
            </p>

            <div className="text-left space-y-0">
              <p className="text-sm font-bold text-foreground font-body text-center mb-3">Você vai receber:</p>
              {offerBenefits.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 py-2.5 font-body text-sm text-foreground ${i < offerBenefits.length - 1 ? "border-b border-border/50" : ""}`}
                >
                  <span className="text-lg shrink-0 mt-0.5">{item.emoji}</span>
                  <span className="leading-snug">
                    <strong>{item.label}</strong> {item.detail}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2">
                <Gift className="w-5 h-5 text-secondary" />
                <p className="text-lg font-bold text-foreground font-display">E não para por aí... Tem mais!</p>
              </div>
              {offerBonuses.map((bonus) => (
                <div key={bonus.number} className="bg-secondary/5 border border-secondary/20 rounded-xl p-4 text-left">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl shrink-0">{bonus.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-foreground font-body text-sm">
                        BÔNUS #{bonus.number} — {bonus.title}
                      </p>
                      <p className="text-muted-foreground font-body text-xs mt-0.5">{bonus.desc}</p>
                      <p className="text-xs font-body mt-1">
                        <span className="text-muted-foreground/60">Valor: </span>
                        <span className="line-through text-destructive/60">{bonus.originalPrice}</span>
                        <span className="text-primary font-bold ml-1">GRÁTIS</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 py-2">
              <p className="text-sm text-muted-foreground/70 font-body">
                <span className="line-through text-destructive/70">De {SITE.originalPrice} + R$135 em bônus = {SITE.totalValue}</span>
              </p>
              <p className="text-xs text-muted-foreground font-body">por apenas:</p>
              <div className="relative inline-block">
                <div className="absolute -inset-3 bg-secondary/20 rounded-2xl -rotate-1" />
                <p className="relative text-5xl md:text-6xl font-bold font-display text-foreground leading-none animate-[price-pop_2s_ease-in-out_infinite]">
                  {SITE.price}
                </p>
              </div>
              <p className="text-muted-foreground font-body text-xs">ou até 6x de R$5,54 no cartão</p>
              <p className="text-primary font-semibold font-body text-sm">Você economiza mais de R$200!</p>
            </div>

            <a
              href={SITE.checkoutLink}
              className="block w-full bg-gradient-to-r from-emerald-700 to-blue-700 text-white font-bold text-base md:text-lg px-6 py-5 rounded-xl text-center hover:scale-105 active:scale-95 transition-all duration-300 font-body animate-[cta-breathe_4s_ease-in-out_infinite]"
            >
              QUERO ME PREPARAR PARA A COPA
            </a>

            <div className="flex flex-col items-center gap-2 pt-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground/70 font-body">
                <span>Compra Segura</span>
                <span className="w-px h-3 bg-border" />
                <span>PIX</span>
                <span className="w-px h-3 bg-border" />
                <span>VISA</span>
                <span className="w-px h-3 bg-border" />
                <span>Mastercard</span>
                <span className="w-px h-3 bg-border" />
                <span>Elo</span>
              </div>
              <p className="text-xs text-muted-foreground/60 font-body">Pagamento único · Acesso imediato</p>
            </div>

            <div className="bg-accent/5 border border-accent/20 rounded-xl p-5">
              <div className="flex items-center justify-center gap-3 mb-2">
                <ShieldCheck className="w-10 h-10 text-accent shrink-0" />
                <div className="text-left">
                  <p className="font-bold text-foreground font-body text-base">Garantia de 7 dias</p>
                  <p className="font-body text-xs text-muted-foreground">Risco zero para você</p>
                </div>
              </div>
              <p className="text-muted-foreground font-body text-xs leading-relaxed text-center">
                Você tem <strong className="text-foreground">7 dias</strong> para acessar o material.
                Se não gostar, basta solicitar reembolso. <span className="text-accent font-semibold">Sem burocracia. Devolvemos 100% do seu dinheiro.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
