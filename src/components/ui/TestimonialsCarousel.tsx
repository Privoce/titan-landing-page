import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import TiltCard from "./TiltCard";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar?: string;
  logo?: string;
}

interface TestimonialsCarouselProps {
  items: Testimonial[];
  interval?: number;
}

export default function TestimonialsCarousel({ items, interval = 5000 }: TestimonialsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const size = items.length;

  useEffect(() => {
    if (size <= 1) return;
    const id = setInterval(() => setActiveIndex((n) => (n + 1) % size), interval);
    return () => clearInterval(id);
  }, [size, interval]);

  const startX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) {
      setActiveIndex((n) => (dx < 0 ? (n + 1) % size : (n - 1 + size) % size));
    }
    startX.current = null;
  };

  const testimonial = items[activeIndex];

  return (
    <TiltCard className="p-8 bg-white/[0.06]" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="flex items-start gap-3 text-white/80">
        <Quote className="h-5 w-5 opacity-60" aria-hidden />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            <p className="text-sm leading-relaxed">"{testimonial.quote}"</p>
            <div className="mt-4 flex items-center gap-3">
              {testimonial.avatar ? (
                <img src={testimonial.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
              ) : (
                <div className="h-10 w-10 rounded-full bg-white/10" />
              )}
              <div className="text-sm">
                <span className="font-medium text-white">{testimonial.name}</span>{" "}
                <span className="opacity-60">— {testimonial.role}</span>
              </div>
              {testimonial.logo && <img src={testimonial.logo} alt="" className="ml-auto h-6 opacity-70" />}
            </div>
            <div className="mt-4 flex gap-1">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "h-1.5 w-5 rounded-full transition-opacity",
                    idx === activeIndex ? "bg-white/80" : "bg-white/30 hover:bg-white/50"
                  )}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </TiltCard>
  );
}
