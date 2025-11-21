import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  to?: number;
  suffix?: string;
  duration?: number;
}

export default function StatCounter({ to = 100, suffix = "", duration = 1200 }: StatCounterProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun.current) {
            hasRun.current = true;
            const start = performance.now();

            const animate = (now: number) => {
              const progress = Math.min(1, (now - start) / duration);
              setValue(Math.floor(progress * to));
              if (progress < 1) requestAnimationFrame(animate);
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className="inline-flex items-baseline gap-1">
      <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
        {value.toLocaleString()}
      </span>
      <span className="opacity-70">{suffix}</span>
    </span>
  );
}
