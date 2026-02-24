import { useState, useEffect } from "react";
import { SITE } from "@/data/site";

const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const offerEl = document.getElementById("oferta");

      if (scrollY < 600) {
        setVisible(false);
        return;
      }

      if (offerEl) {
        const rect = offerEl.getBoundingClientRect();
        const offerVisible = rect.top < window.innerHeight && rect.bottom > 0;
        setVisible(!offerVisible);
      } else {
        setVisible(true);
      }
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
      <div className="bg-card/95 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-3">
        <a
          href={SITE.offerLink}
          className="block w-full bg-gradient-to-r from-emerald-700 to-blue-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl text-center shadow-lg active:scale-95 transition-transform font-body"
        >
          ⚽ QUERO ME PREPARAR PARA A COPA — {SITE.price}
        </a>
      </div>
    </div>
  );
};

export default FloatingCTA;
