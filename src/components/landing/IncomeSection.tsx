import { TrendingUp, ArrowRight, Wallet, ShoppingBag, Banknote } from "lucide-react";
import { SITE } from "@/data/site";
import SectionWrapper from "@/components/shared/SectionWrapper";
import CTAButton from "@/components/shared/CTAButton";

const IncomeSection = () => (
  <SectionWrapper id="renda" maxWidth="lg" center>
    <h2 className="text-2xl md:text-4xl font-bold text-foreground">
      💰 Vamos falar de números?
    </h2>

    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible md:pb-0 px-1">
      {/* Card 1 - Investimento */}
      <div className="snap-center shrink-0 w-[78%] md:w-auto rounded-2xl p-6 shadow-lg border border-border bg-card text-foreground relative overflow-hidden group hover:shadow-xl transition-all">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-yellow-400" />
        <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
          <Wallet className="w-6 h-6 text-secondary" />
        </div>
        <p className="text-xs font-body text-muted-foreground uppercase tracking-wider font-semibold">Investimento</p>
        <p className="text-4xl md:text-5xl font-bold font-display my-2 text-foreground">R$27</p>
        <p className="text-sm font-body text-muted-foreground">na apostila completa</p>
        <div className="mt-4 pt-3 border-t border-border/50">
          <p className="text-[11px] font-body text-muted-foreground/70">Menos que um almoço</p>
        </div>
      </div>

      {/* Card 2 - Venda media */}
      <div className="snap-center shrink-0 w-[78%] md:w-auto rounded-2xl p-6 shadow-lg border border-border bg-card text-foreground relative overflow-hidden group hover:shadow-xl transition-all">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600" />
        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
          <ShoppingBag className="w-6 h-6 text-blue-600" />
        </div>
        <p className="text-xs font-body text-muted-foreground uppercase tracking-wider font-semibold">Venda média</p>
        <p className="text-4xl md:text-5xl font-bold font-display my-2 text-foreground">R$25<span className="text-2xl md:text-3xl text-muted-foreground">–</span>R$80</p>
        <p className="text-sm font-body text-muted-foreground">por peça vendida</p>
        <div className="mt-4 pt-3 border-t border-border/50">
          <p className="text-[11px] font-body text-muted-foreground/70">Já paga o investimento na 1a venda</p>
        </div>
      </div>

      {/* Card 3 - Lucro (destaque) */}
      <div className="snap-center shrink-0 w-[78%] md:w-auto rounded-2xl p-6 shadow-2xl border-2 border-primary bg-gradient-to-br from-emerald-700 via-emerald-800 to-blue-900 text-white relative overflow-hidden group hover:scale-[1.02] transition-all">
        <TrendingUp className="absolute -top-2 -right-2 w-20 h-20 text-white/[0.06] rotate-12" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-yellow-400 to-secondary" />
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
          <Banknote className="w-6 h-6 text-secondary" />
        </div>
        <p className="text-xs font-body text-white/60 uppercase tracking-wider font-semibold">Lucro potencial</p>
        <p className="text-5xl md:text-6xl font-bold font-display my-2">
          R$2.800<span className="text-2xl text-secondary">+</span>
        </p>
        <p className="text-sm font-body text-white/70">por mês de renda extra</p>
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
          <ArrowRight className="w-3.5 h-3.5 text-secondary" />
          <p className="text-[11px] font-body text-white/60">Vendendo apenas 2 bolsas por semana</p>
        </div>
      </div>
    </div>

    <div className="space-y-3 text-muted-foreground font-body text-base md:text-lg">
      <p>Venda apenas <strong className="text-foreground">2 bolsas por semana</strong> e já tem renda extra.</p>
      <p>Na temporada da Copa, a demanda só <strong className="text-accent">aumenta</strong>.</p>
    </div>

    <div>
      <CTAButton href={SITE.offerLink} variant="accent" socialProof>
        ⚽ Quero começar a lucrar
      </CTAButton>
    </div>
  </SectionWrapper>
);

export default IncomeSection;
