import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "../../../lib/utils";

interface WordRotatorProps {
  words: string[];
  interval?: number;
  className?: string;
}

export function WordRotator({ words, interval = 2200, className = "" }: WordRotatorProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || words.length <= 1) return;
    const id = setInterval(() => setIndex((n) => (n + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words, interval, paused]);

  return (
    <span
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={cn(
        "inline-block min-w-[6.5ch] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400",
        className
      )}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
