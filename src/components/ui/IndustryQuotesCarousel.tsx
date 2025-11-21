import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

interface QuoteItem {
  text: string;
  author: string;
  title: string;
  company: string;
}

interface IndustryQuotesCarouselProps {
  quotes: QuoteItem[];
  interval?: number;
}

export default function IndustryQuotesCarousel({ quotes, interval = 7000 }: IndustryQuotesCarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % quotes.length);
    }, interval);
    return () => clearInterval(timer);
  }, [quotes.length, interval]);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl" />

      <div className="relative px-8 py-8 md:px-16 md:py-10 lg:px-24 lg:py-12">
        <Quote className="h-8 w-8 md:h-10 md:w-10 text-cyan-400/30 mb-4 mx-auto" />

        <div className="h-[300px] md:h-[260px] lg:h-[240px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full flex flex-col justify-between"
            >
              <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium text-white leading-relaxed max-w-5xl mx-auto text-justify">
                "{quotes[current].text}"
              </blockquote>

              <div className="flex items-start max-w-5xl mx-auto mt-4">
                <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                  {quotes[current].author}, {quotes[current].company}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {quotes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className="group relative"
              aria-label={`Go to quote ${idx + 1}`}
            >
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === current
                    ? "w-12 bg-cyan-400"
                    : "w-1.5 bg-white/30 group-hover:bg-white/50"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
