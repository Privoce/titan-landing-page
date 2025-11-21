import { useMemo } from "react";

interface Logo {
  src?: string;
  alt?: string;
}

interface LogosMarqueeProps {
  logos: Logo[];
  speed?: number;
  pauseOnHover?: boolean;
}

export default function LogosMarquee({ logos, speed = 24, pauseOnHover = true }: LogosMarqueeProps) {
  const staticLogos = [
    { src: "/image copy copy copy copy copy copy copy copy copy copy copy copy copy copy copy copy copy copy.png", alt: "HP" },
    { src: "/image copy copy copy copy copy copy copy copy copy copy copy copy copy copy copy copy copy copy copy.png", alt: "Gusto" },
    { src: "/image copy copy copy copy copy copy copy copy copy copy copy copy copy copy copy copy copy copy copy copy.png", alt: "Gusto" }
  ];

  const repeatedLogos = useMemo(() => {
    const baseSet = [...staticLogos, ...staticLogos, ...staticLogos, ...staticLogos];
    return baseSet;
  }, []);

  return (
    <div className="relative mx-auto max-w-7xl overflow-hidden px-6 py-1.5 opacity-90">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />

      <div className="flex">
        <div
          className="flex gap-x-8 animate-marquee-infinite"
          style={{ animationDuration: `${speed}s` }}
          onMouseEnter={(e) => pauseOnHover && (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={(e) => pauseOnHover && (e.currentTarget.style.animationPlayState = "running")}
        >
          {repeatedLogos.map((logo, idx) => (
            <div
              key={`original-${idx}`}
              className="h-11 w-28 shrink-0 flex items-center justify-center rounded bg-black border border-white/10"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className="max-h-8 max-w-[6.3rem] opacity-90"
              />
            </div>
          ))}
        </div>
        <div
          className="flex gap-x-8 animate-marquee-infinite ml-8"
          style={{ animationDuration: `${speed}s` }}
          onMouseEnter={(e) => pauseOnHover && (e.currentTarget.style.animationPlayState = "paused")}
          onMouseLeave={(e) => pauseOnHover && (e.currentTarget.style.animationPlayState = "running")}
        >
          {repeatedLogos.map((logo, idx) => (
            <div
              key={`duplicate-${idx}`}
              className="h-11 w-28 shrink-0 flex items-center justify-center rounded bg-black border border-white/10"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className="max-h-8 max-w-[6.3rem] opacity-90"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
