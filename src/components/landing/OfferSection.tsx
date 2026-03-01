import { ShieldCheck, Star } from "lucide-react";
import { offerBenefits } from "@/data/offer";
import { SITE } from "@/data/site";

const OfferSection = () => (
  <section
    id="oferta"
    className="py-16 md:py-24 px-4"
    style={{ background: "linear-gradient(180deg, hsl(145 45% 32% / 0.1) 0%, hsl(145 45% 32% / 0.04) 50%, hsl(30 33% 94% / 0) 100%)" }}
  >
    <div className="max-w-md mx-auto">
      <div className="bg-card rounded-2xl shadow-[0_8px_40px_hsl(145_45%_32%/0.18)] border-2 border-primary/20 overflow-hidden animate-[glow-border_3s_ease-in-out_infinite]">
        <div className="bg-gradient-to-r from-emerald-700 to-blue-700 py-3 px-6 flex justify-center">
          <span className="inline-flex items-center gap-2 text-white text-sm font-bold font-body px-4 py-1 rounded-full">
            <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
            MAIS VENDIDO
            <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
          </span>
        </div>

        <div className="px-5 md:px-8 py-8 space-y-6 text-center">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-primary">Curso Completo do Crochê</h2>
            <p className="text-muted-foreground font-body text-sm">
              Acesse agora todas as receitas e videoaulas para <br />vender na Copa do Mundo!
            </p>
          </div>

          <div className="space-y-2 py-2">
            <p className="text-sm text-muted-foreground/70 font-body">
              💰 <span className="line-through text-destructive/70">De {SITE.originalPrice}</span> por
            </p>
            <div className="relative inline-block">
              <div className="absolute -inset-3 bg-secondary/20 rounded-2xl -rotate-1" />
              <p className="relative text-5xl md:text-6xl font-bold font-display text-foreground leading-none animate-[price-pop_2s_ease-in-out_infinite]">
                {SITE.price}
              </p>
            </div>
            <p className="text-primary font-semibold font-body text-sm animate-pulse">🔥 Oferta exclusiva por tempo limitado!</p>
          </div>

          <div className="text-left space-y-0">
            <p className="text-sm font-bold text-foreground font-body text-center mb-3">Você vai receber:</p>
            {offerBenefits.map((item, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 py-3 font-body text-sm text-foreground ${i < offerBenefits.length - 1 ? "border-b border-border/50" : ""}`}
              >
                <span className="text-lg shrink-0 mt-0.5">{item.emoji}</span>
                <span className="leading-snug">
                  <strong>{item.label}</strong> {item.detail}
                </span>
              </div>
            ))}
          </div>

          <a
            href={SITE.checkoutLink}
            className="block w-full bg-gradient-to-r from-emerald-700 to-blue-700 text-white font-bold text-base md:text-lg px-6 py-5 rounded-xl text-center hover:scale-105 active:scale-95 transition-all duration-300 font-body animate-[cta-breathe_4s_ease-in-out_infinite]"
          >
            ⚽ QUERO ME PREPARAR PARA A COPA
          </a>

          <div className="flex flex-col items-center gap-2 pt-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground/70 font-body">
              <span>🔒 Compra Segura</span>
              <span className="w-px h-3 bg-border" />
              <span>PIX</span>
              <span className="w-px h-3 bg-border" />
              <span>VISA</span>
              <span className="w-px h-3 bg-border" />
              <span>Mastercard</span>
              <span className="w-px h-3 bg-border" />
              <span>Elo</span>
            </div>
            <p className="text-xs text-muted-foreground/60 font-body">Pagamento único • Acesso imediato</p>
          </div>

          <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <ShieldCheck className="w-8 h-8 text-accent shrink-0" />
              <p className="font-bold text-foreground font-body text-sm text-left">
                Risco zero para você
              </p>
            </div>
            <p className="text-muted-foreground font-body text-xs leading-relaxed">
              Você tem <strong className="text-foreground">7 dias</strong> para acessar o material.
              Se não gostar, basta solicitar reembolso. <span className="text-accent font-semibold">Sem burocracia.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default OfferSection;
