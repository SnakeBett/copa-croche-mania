import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonialImages } from "@/data/testimonials";
import SectionWrapper from "@/components/shared/SectionWrapper";

const TestimonialsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <SectionWrapper id="depoimentos">
      <h2 className="text-2xl md:text-4xl font-bold text-foreground text-center">
        São mais de 600 alunas que já estão colocando em prática o curso e colhendo fruto desse lindo trabalho em crochê!
      </h2>

      <div className="relative">
        <button
          onClick={scrollPrev}
          aria-label="Anterior"
          className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-10 bg-card/90 backdrop-blur-sm border border-border rounded-full p-2.5 shadow-lg hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="overflow-hidden px-2" ref={emblaRef}>
          <div className="flex gap-5">
            {testimonialImages.map((src, i) => (
              <div key={src} className="flex-[0_0_88%] md:flex-[0_0_32%] min-w-0">
                <img
                  src={src}
                  alt={`Depoimento de aluna ${i + 1}`}
                  className="w-full rounded-xl"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollNext}
          aria-label="Próximo"
          className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-10 bg-card/90 backdrop-blur-sm border border-border rounded-full p-2.5 shadow-lg hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex justify-center gap-2.5">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            aria-label={`Slide ${i + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === selectedIndex ? "bg-accent scale-125" : "bg-border"
            }`}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default TestimonialsSection;
