import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

interface MagneticButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export default function MagneticButton({ children, className = "", href, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current as HTMLElement | null;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      setTransform({ x: dx * 6, y: dy * 6 });
    };

    const handleMouseLeave = () => setTransform({ x: 0, y: 0 });

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const Component: any = href ? "a" : "button";
  const componentProps = href ? { href, target: "_blank", rel: "noopener noreferrer" } : props;

  return (
    <Component
      ref={ref}
      {...componentProps}
      className={cn(
        "relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-medium shadow-lg shadow-cyan-500/20 will-change-transform transition-transform",
        className
      )}
      style={{ transform: `translate(${transform.x}px, ${transform.y}px)` }}
    >
      {children}
    </Component>
  );
}
