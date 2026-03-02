import { useState, useEffect } from "react";
import { SITE } from "@/data/site";

const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-card/95 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-2.5">
        <a
          href={SITE.checkoutLink}
          className="block w-full bg-gradient-to-r from-emerald-700 to-blue-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl text-center shadow-lg active:scale-95 transition-transform font-body animate-[cta-breathe_4s_ease-in-out_infinite]"
        >
          QUERO COMECAR AGORA — {SITE.price}
        </a>
        <p className="text-[10px] text-center text-muted-foreground/60 font-body mt-1">Oferta por tempo limitado - Garantia 7 dias</p>
      </div>
    </div>
  );
};

export default FloatingCTA;
