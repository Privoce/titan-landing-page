import { useEffect, useMemo, useRef, useState } from "react";

interface FloatCounterProps {
  to: number;
  decimals?: number;
  suffix?: string;
}

export default function FloatCounter({ to, decimals = 0, suffix = "" }: FloatCounterProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const hasRun = useRef(false);
  const formatter = useMemo(
    () => new Intl.NumberFormat(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }),
    [decimals]
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun.current) {
            hasRun.current = true;
            const start = performance.now();
            const duration = 1200;

            const animate = (now: number) => {
              const progress = Math.min(1, (now - start) / duration);
              setValue(progress * to);
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
  }, [to]);

  return (
    <span ref={ref} className="inline-flex items-baseline gap-1">
      <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
        {formatter.format(value)}
      </span>
      {suffix && <span className="opacity-70">{suffix}</span>}
    </span>
  );
}
