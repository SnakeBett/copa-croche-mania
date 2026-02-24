import { useState, useEffect } from "react";

const CONFETTI_COLORS = ["#009739", "#FEDD00", "#002776"];

const createItems = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    color: CONFETTI_COLORS[i % 3],
    size: 6 + Math.random() * 10,
    duration: 6 + Math.random() * 10,
    delay: -(Math.random() * 15),
    drift: -30 + Math.random() * 60,
    rotate: 180 + Math.random() * 360,
    opacity: 0.15 + Math.random() * 0.25,
  }));

const FloatingConfetti = () => {
  const [items, setItems] = useState(() => createItems(12));

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setItems(createItems(isMobile ? 12 : 30));
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {items.map((c) => (
        <span
          key={c.id}
          className="absolute rounded-sm animate-[confetti-fall_linear_infinite]"
          style={{
            left: c.left,
            top: "-20px",
            width: c.size,
            height: c.size * 0.6,
            backgroundColor: c.color,
            opacity: c.opacity,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
            "--drift": `${c.drift}px`,
            "--rotate": `${c.rotate}deg`,
            "--opacity": `${c.opacity}`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default FloatingConfetti;
