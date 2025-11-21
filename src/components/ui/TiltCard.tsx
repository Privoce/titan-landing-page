import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

interface TiltCardProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = "", ...rest }: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-15, 15], [8, -8]);
  const rotateY = useTransform(x, [-15, 15], [-8, 8]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * 30 - 15;
      const py = ((e.clientY - rect.top) / rect.height) * 30 - 15;
      x.set(px);
      y.set(py);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY }}
      className={cn("rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-xl", className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
