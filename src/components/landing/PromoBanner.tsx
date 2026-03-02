import { SITE } from "@/data/site";

const today = () => {
  const d = new Date();
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
};

const PromoBanner = () => (
  <div className="w-full bg-gradient-to-r from-emerald-700 to-blue-700 text-white py-2.5 px-4 text-center sticky top-0 z-50 shadow-md">
    <a href={SITE.checkoutLink} className="hover:underline flex items-center justify-center gap-2 flex-wrap text-sm md:text-base font-body">
      <span className="font-bold">OFERTA ESPECIAL DISPONIVEL APENAS HOJE {today()}</span>
      <span className="w-px h-4 bg-white/30 hidden md:block" />
      <span className="flex items-center gap-1 text-yellow-300 font-bold animate-pulse text-base md:text-lg">{SITE.price}</span>
      <span className="w-px h-4 bg-white/30 hidden md:block" />
      <span className="text-white/80 text-xs flex items-center gap-1">COMPRA 100% SEGURA</span>
    </a>
  </div>
);

export default PromoBanner;
