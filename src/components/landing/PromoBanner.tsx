import { SITE } from "@/data/site";

const PromoBanner = () => (
  <div className="w-full bg-gradient-to-r from-emerald-700 to-blue-700 text-white py-3 px-4 text-center font-bold text-sm md:text-base sticky top-0 z-50 shadow-md">
    <a href={SITE.ctaLink} className="hover:underline flex items-center justify-center gap-1 flex-wrap">
      <span>🔥 Últimas vagas! Acesse +200 receitas de crochê por apenas</span>
      <span className="underline animate-pulse text-yellow-300 text-base md:text-lg">{SITE.price}</span>
    </a>
  </div>
);

export default PromoBanner;
