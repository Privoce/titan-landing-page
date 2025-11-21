import { cn } from "../../lib/utils";
import SectionReveal from "../ui/SectionReveal";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", className)}>
      <SectionReveal>{children}</SectionReveal>
    </section>
  );
}
