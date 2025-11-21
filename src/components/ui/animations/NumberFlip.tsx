import { AnimatePresence, motion } from "framer-motion";

interface NumberFlipProps {
  value: number | string;
  prefix?: string;
  suffix?: string;
}

export default function NumberFlip({ value, prefix = "", suffix = "" }: NumberFlipProps) {
  return (
    <div className="relative inline-block h-10 overflow-hidden align-middle">
      <AnimatePresence initial={false}>
        <motion.div
          key={String(value)}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
        >
          {prefix}{value}{suffix}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
