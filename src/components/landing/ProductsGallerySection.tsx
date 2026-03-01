import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import { SITE } from "@/data/site";
import SectionWrapper from "@/components/shared/SectionWrapper";
import CTAButton from "@/components/shared/CTAButton";

const ProductsGallerySection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })],
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
    <SectionWrapper id="galeria" className="bg-muted/50">
      <div className="text-center space-y-4">
        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-body font-medium">
          Galeria de Produtos
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Veja o que você vai criar 🧶
        </h2>
        <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
          Peças exclusivas nas cores do Brasil, prontas para vender ou presentear durante a Copa.
        </p>
      </div>

      <div className="relative">
        <button
          onClick={scrollPrev}
          aria-label="Anterior"
          className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 z-10 bg-card/90 backdrop-blur-sm border border-border rounded-full p-2.5 shadow-lg hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 md:gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-[0_0_85%] md:flex-[0_0_32%] min-w-0"
              >
                <div className="relative rounded-2xl overflow-hidden border-2 border-border shadow-md bg-card hover:shadow-xl transition-all duration-300 aspect-[3/4]">
                  <img
                    src={product.src}
                    alt={product.label}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent py-4 px-3">
                    <p className="text-white text-sm font-body font-semibold text-center">
                      {product.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollNext}
          aria-label="Próximo"
          className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 z-10 bg-card/90 backdrop-blur-sm border border-border rounded-full p-2.5 shadow-lg hover:bg-accent hover:text-accent-foreground transition-colors"
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
              i === selectedIndex ? "bg-accent scale-125" : "bg-border hover:bg-border/80"
            }`}
          />
        ))}
      </div>

      <div className="text-center">
        <CTAButton href={SITE.ctaLink} socialProof>
          ⚽ Quero aprender a fazer essas peças
        </CTAButton>
      </div>
    </SectionWrapper>
  );
};

export default ProductsGallerySection;
