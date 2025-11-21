import { cn } from "../../../lib/utils";
import FloatCounter from "./FloatCounter";

interface AnimatedRangeProps {
  left: number;
  right: number;
  leftDecimals?: number;
  rightDecimals?: number;
  suffix?: string;
  className?: string;
}

export default function AnimatedRange({
  left,
  right,
  leftDecimals = 0,
  rightDecimals = 0,
  suffix = "",
  className = ""
}: AnimatedRangeProps) {
  return (
    <span className={cn("inline-flex items-baseline gap-1", className)}>
      <FloatCounter to={left} decimals={leftDecimals} />
      <span className="opacity-50">–</span>
      <FloatCounter to={right} decimals={rightDecimals} />
      {suffix && <span className="opacity-70">{suffix}</span>}
    </span>
  );
}
