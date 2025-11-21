import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Check, Shield, Zap, Cpu, Globe2, Sparkles, Star, Quote, ChevronDown } from "lucide-react";

/***************************|  Helpers & Base Elements  |
\***************************/
const cn = (...a: (string | false | null | undefined)[]) => a.filter(Boolean).join(" ");

function AnimatedBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {/* Animated radial blobs (blue theme) */}
      <div className="absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-gradient-to-br from-blue-600/20 via-sky-500/20 to-cyan-500/20 blur-3xl animate-[pulse_10s_ease-in-out_infinite]" />
      <div className="absolute -right-40 -bottom-40 h-[38rem] w-[38rem] rounded-full bg-gradient-to-br from-blue-600/20 via-sky-500/20 to-cyan-500/20 blur-3xl animate-[pulse_12s_ease-in-out_infinite]" />
      {/* Conic sheen */}
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, rgba(37,99,235,0.06), rgba(59,130,246,0.06), rgba(6,182,212,0.06), rgba(37,99,235,0.06))",
          animation: "spin 60s linear infinite",
        }}
      />
      {/* Dotted grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:24px_24px]" />
      <style>{`
        @keyframes pulse { 0%,100%{ transform:translateY(0)} 50%{ transform:translateY(8px)} }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes marquee { 0%{ transform: translateX(0) } 100%{ transform: translateX(-50%) } }
        @media (prefers-reduced-motion: reduce){
          .animate-[pulse_10s_ease-in-out_infinite], .animate-[pulse_12s_ease-in-out_infinite]{ animation:none !important }
        }
      `}</style>
    </div>
  );
}

function CursorSpotlight() {
  useEffect(() => {
    const root = document.documentElement;
    const onMove = (e: MouseEvent) => {
      root.style.setProperty("--mx", `${e.clientX}px`);
      root.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background:
          "radial-gradient(240px 240px at var(--mx) var(--my), rgba(59,130,246,0.12), transparent 60%)",
      }}
    />
  );
}

function ScrollProgressBar() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max ? h.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-0.5 bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-blue-600 to-cyan-500"
        style={{ transform: `scaleX(${p})`, transformOrigin: "0 0" }}
      />
    </div>
  );
}

function SectionReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={show ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/*********************|  Reusable widgets   |
\*********************/
function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-500 shadow-lg" />
        <Sparkles className="absolute -right-1 -top-1 h-4 w-4 text-sky-300" aria-hidden />
      </div>
      <span className="text-lg font-bold tracking-tight">
        Titan <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">AI</span>
      </span>
    </div>
  );
}

export function WordRotator({ words, interval = 2200, className = "" }: { words: string[]; interval?: number; className?: string }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || words.length <= 1) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval);
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
        <motion.span key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function StatCounter({ to = 100, suffix = "", duration = 1200 }: { to?: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const hasRun = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            setVal(Math.floor(p * to));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return (
    <span ref={ref} className="inline-flex items-baseline gap-1">
      <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{val.toLocaleString()}</span>
      <span className="opacity-70">{suffix}</span>
    </span>
  );
}

function FloatCounter({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const hasRun = useRef(false);
  const fmt = useMemo(() => new Intl.NumberFormat(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }), [decimals]);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const start = performance.now();
          const duration = 1200;
          const step = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            setVal(p * to);
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref} className="inline-flex items-baseline gap-1">
      <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{fmt.format(val)}</span>
      {suffix ? <span className="opacity-70">{suffix}</span> : null}
    </span>
  );
}

function AnimatedRange({ left, right, leftDecimals = 0, rightDecimals = 0, suffix = "", className = "" }: { left: number; right: number; leftDecimals?: number; rightDecimals?: number; suffix?: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline gap-1", className)}>
      <FloatCounter to={left} decimals={leftDecimals} />
      <span className="opacity-50">–</span>
      <FloatCounter to={right} decimals={rightDecimals} />
      {suffix ? <span className="opacity-70">{suffix}</span> : null}
    </span>
  );
}

function TiltCard({ children, className = "", ...rest }: React.ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-15, 15], [8, -8]);
  const rotateY = useTransform(x, [-15, 15], [-8, 8]);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * 30 - 15;
      const py = ((e.clientY - rect.top) / rect.height) * 30 - 15;
      x.set(px);
      y.set(py);
    };
    const leave = () => {
      x.set(0);
      y.set(0);
    };
    el.addEventListener("mousemove", handle);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", handle);
      el.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);
  return (
    <motion.div ref={ref} style={{ rotateX, rotateY }} className={cn("rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-xl", className)} {...rest}>
      {children}
    </motion.div>
  );
}

function LogosMarquee({ logos, speed = 24, pauseOnHover = true }: { logos: { src?: string; alt?: string }[]; speed?: number; pauseOnHover?: boolean }) {
  const items = useMemo(() => [...logos, ...logos], [logos]);
  return (
    <div className="relative mx-auto max-w-7xl overflow-hidden px-6 py-6 opacity-90">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#070716] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#070716] to-transparent" />
      <div
        className="flex w-[200%] gap-x-12"
        style={{ animation: `marquee ${speed}s linear infinite` }}
        onMouseEnter={(e) => pauseOnHover && (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={(e) => pauseOnHover && (e.currentTarget.style.animationPlayState = "running")}
      >
        {items.map((logo, idx) => (
          <div key={idx} className="h-8 w-28 shrink-0 flex items-center justify-center rounded bg-white/5 border border-white/10">
            {logo?.src ? (
              <img src={logo.src} alt={logo.alt || ""} loading="lazy" className="max-h-6 max-w-[6.5rem] opacity-90" />
            ) : (
              <div className="text-[10px] tracking-wide text-white/70">LOGO</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialsCarousel({ items, interval = 5000 }: { items: { name: string; role: string; quote: string; avatar?: string; logo?: string }[]; interval?: number }) {
  const [i, setI] = useState(0);
  const size = items.length;
  useEffect(() => {
    if (size <= 1) return;
    const id = setInterval(() => setI((n) => (n + 1) % size), interval);
    return () => clearInterval(id);
  }, [size, interval]);
  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => (startX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) setI((n) => (dx < 0 ? (n + 1) % size : (n - 1 + size) % size));
    startX.current = null;
  };
  const t = items[i];
  return (
    <TiltCard className="p-8 bg-white/[0.06]" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="flex items-start gap-3 text-white/80">
        <Quote className="h-5 w-5 opacity-60" aria-hidden />
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
            <p className="text-sm leading-relaxed">“{t.quote}”</p>
            <div className="mt-4 flex items-center gap-3">
              {t.avatar ? <img src={t.avatar} alt="" className="h-10 w-10 rounded-full object-cover" /> : <div className="h-10 w-10 rounded-full bg-white/10" />}
              <div className="text-sm">
                <span className="font-medium text-white">{t.name}</span> <span className="opacity-60">— {t.role}</span>
              </div>
              {t.logo && <img src={t.logo} alt="" className="ml-auto h-6 opacity-70" />}
            </div>
            <div className="mt-4 flex gap-1">
              {items.map((_, idx) => (
                <button key={idx} aria-label={`Go to testimonial ${idx + 1}`} onClick={() => setI(idx)} className={cn("h-1.5 w-5 rounded-full transition-opacity", idx === i ? "bg-white/80" : "bg-white/30 hover:bg-white/50")} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </TiltCard>
  );
}

function FeatureTabs({ tabs, initial = 0 }: { tabs: { id: string; label: string; content: React.ReactNode }[]; initial?: number }) {
  const [active, setActive] = useState(initial);
  return (
    <div className="w-full">
      <div className="relative inline-flex rounded-xl bg-white/5 p-1">
        {tabs.map((t, i) => {
          const selected = i === active;
          return (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={cn(
                "relative z-10 px-4 py-2 text-sm rounded-lg transition-colors",
                selected ? "text-white" : "text-white/70 hover:text-white"
              )}
              aria-selected={selected}
              role="tab"
            >
              {t.label}
              {selected && (
                <motion.span layoutId="tab-underline" className="absolute inset-0 -z-10 rounded-lg bg-white/10" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-4" role="tabpanel">
        <AnimatePresence mode="wait">
          <motion.div key={tabs[active].id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
            {tabs[active].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function MagneticButton({ children, className = "", href, ...props }: { children: React.ReactNode; className?: string; href?: string } & React.ComponentProps<"button">) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const el = ref.current as HTMLElement | null;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      setT({ x: dx * 6, y: dy * 6 });
    };
    const onLeave = () => setT({ x: 0, y: 0 });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  const Comp: any = href ? "a" : "button";
  const commonProps = href ? { href, target: "_blank", rel: "noopener noreferrer" } : props;
  return (
    <Comp
      ref={ref}
      {...commonProps}
      className={cn(
        "relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-medium shadow-lg shadow-cyan-500/20 will-change-transform",
        className
      )}
      style={{ transform: `translate(${t.x}px, ${t.y}px)` }}
    >
      {children}
    </Comp>
  );
}

function NumberFlip({ value, prefix = "", suffix = "" }: { value: number | string; prefix?: string; suffix?: string }) {
  return (
    <div className="relative inline-block h-10 overflow-hidden align-middle">
      <AnimatePresence initial={false}>
        <motion.div key={String(value)} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }} transition={{ duration: 0.35 }} className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          {prefix}{value}{suffix}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function BackToTopButton() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-6 right-6 z-40 rounded-full bg-white/10 p-3 backdrop-blur border border-white/15 hover:bg-white/15">
      ↑
    </button>
  );
}

/*********************|   Page & Sections   |
\*********************/
const Section = ({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) => (
  <section id={id} className={cn("py-20 sm:py-28", className)}>
    <SectionReveal>{children}</SectionReveal>
  </section>
);

const content = {
  logos: Array.from({ length: 10 }).map((_, i) => ({ src: "", alt: `Logo ${i + 1}` })),
  testimonials: [
    { name: "Alex Patel", role: "VP Engineering, Acme Co.", quote: "Ship cycles went from months to weeks with Titan's SDK.", logo: "" },
    { name: "Maya Chen", role: "Head of Product, Nimbus", quote: "Observability and cost controls are top‑notch.", avatar: "" },
    { name: "Diego Ramirez", role: "CTO, Solara", quote: "Enterprise features smoothed procurement and rollout." },
  ],
  features: [
    { icon: <Zap className="h-6 w-6" />, title: "Blazing fast inference", desc: "Streaming, smart batching, and KV caching." },
    { icon: <Shield className="h-6 w-6" />, title: "Enterprise‑grade security", desc: "SOC 2 controls, private networking, data options." },
    { icon: <Cpu className="h-6 w-6" />, title: "Choice of models", desc: "Chat, vision, agents—or bring your own." },
    { icon: <Globe2 className="h-6 w-6" />, title: "Global edge", desc: "Autoscaling in multiple regions to meet users." },
  ],
  faq: [
    { q: "What is Titan AI?", a: "A developer‑first platform to build, deploy, and scale AI apps." },
    { q: "Do you store prompts or data?", a: "Zero‑retention by default; enterprise options available." },
    { q: "Can I bring my own model?", a: "Yes—deploy custom images alongside managed models." },
  ],
};

export default function TitanAIDynamicPreview() {
  const sections = [
    { id: "hero", label: "Home" },
    { id: "features", label: "Features" },
    { id: "showcase", label: "Showcase" },
    { id: "pricing", label: "Pricing" },
    { id: "faq", label: "FAQ" },
  ];
  const [activeId, setActiveId] = useState(sections[0].id);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0.01 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const [annual, setAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-[#070716] text-white">
      <AnimatedBackdrop />
      <CursorSpotlight />
      <ScrollProgressBar />
      <BackToTopButton />

      {/* Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Logo />
          <nav className="hidden items-center gap-6 text-sm text-white/80 md:flex">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className={cn("relative hover:text-white", activeId === s.id && "text-white") }>
                {s.label}
                {activeId === s.id && (
                  <motion.span layoutId="nav-active" className="absolute -bottom-1 left-0 h-[2px] w-full bg-gradient-to-r from-blue-400 to-cyan-400" />
                )}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <MagneticButton href="https://calendly.com/levytitanai/30min">
              Schedule demo <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </div>
        </div>
      </header>

      {/* Hero */}
      <Section id="hero" className="pt-16 sm:pt-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                World 1st Deal Copilot
              </motion.h1>
              <p className="mt-4 max-w-2xl text-white/70">
                World’s 1st deal copilot, forecasting customer willingness to pay and competitor pricing to generate AI guidance for every deal and every seller — across packaging/bundling, value-based negotiation talk tracks, item-level pricing, and win rate.
              </p>

              {/* Single-line CTA, no email field */}
              <div className="mt-8 text-center">
                <MagneticButton href="https://calendly.com/levytitanai/30min" className="inline-flex items-center justify-center whitespace-nowrap">
                  Schedule demo <ArrowRight className="h-4 w-4 ml-2" />
                </MagneticButton>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-sm font-medium">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-2xl font-semibold whitespace-nowrap flex items-baseline gap-1">
  <AnimatedRange left={0.5} right={8} leftDecimals={1} rightDecimals={0} suffix="%" />
</div>
                    <div className="text-white/60 whitespace-nowrap">margin uplift</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-2xl font-semibold whitespace-nowrap flex items-baseline gap-1">
  <AnimatedRange left={5} right={10} leftDecimals={0} rightDecimals={0} suffix="×" />
</div>
                    <div className="text-white/60 whitespace-nowrap">faster pricing cycle</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-2xl font-semibold whitespace-nowrap flex items-baseline gap-1">
  <AnimatedRange left={0.3} right={7.5} leftDecimals={1} rightDecimals={1} suffix="%" />
</div>
                    <div className="text-white/60 whitespace-nowrap">revenue increase</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-2xl font-semibold whitespace-nowrap flex items-baseline gap-1">
  <span>1/</span><StatCounter to={3} />
  <span className="opacity-50">–</span>
  <span>1/</span><StatCounter to={10} />
</div>
                    <div className="text-white/60 whitespace-nowrap">cost of human analysts</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right visual */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
              <TiltCard className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-white/60">Console · Live preview</div>
                  <div className="flex gap-1">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                  </div>
                </div>
                <div className="mt-4 rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-xs text-white/80">
                  $ curl -X POST https://api.titan.ai/v1/chat                  <br />&nbsp;&nbsp;-H "Authorization: Bearer $TOKEN"                   <br />&nbsp;&nbsp;-d '{`{ "model": "titan-chat-large", "messages": [{"role":"user","content":"Summarize this doc."}] }`}'
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-white/60">Requests today</div>
                    <div className="mt-1 text-2xl font-semibold"><StatCounter to={128450} /></div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-white/60">Cost / 1M tokens</div>
                    <div className="mt-1 text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">$0.42</div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Logo marquee */}
      <LogosMarquee logos={content.logos} speed={24} />

      {/* Features */}
      <Section id="features">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Everything you need to ship AI</h2>
            <p className="mt-3 text-white/70">A single platform for prototypes, production, and everything in between.</p>
          </div>
          <div className="mt-10">
            <FeatureTabs
              tabs={[
                {
                  id: "tab1",
                  label: "Core",
                  content: (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                      {content.features.map((f) => (
                        <TiltCard key={f.title} className="p-6">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">{f.icon}</div>
                          <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                          <p className="mt-1 text-sm text-white/70">{f.desc}</p>
                        </TiltCard>
                      ))}
                    </div>
                  ),
                },
                {
                  id: "tab2",
                  label: "Use cases",
                  content: (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {["Chatbots & copilots", "Search & RAG", "Content generation", "Voice & multimodal"].map((item) => (
                        <div key={item} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                          <Check className="mt-1 h-5 w-5 text-cyan-400" />
                          <div>
                            <div className="font-medium">{item}</div>
                            <div className="text-sm text-white/70">Best‑in‑class latency, observability, and cost controls built‑in.</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ),
                },
                {
                  id: "tab3",
                  label: "SDK",
                  content: (
                    <TiltCard className="p-6">
                      <h4 className="text-white/70">SDK snippet</h4>
                      <pre className="mt-2 overflow-auto rounded-xl bg-black/50 p-4 text-xs leading-relaxed text-white/80">{`import { Titan } from "@titan/sdk";

const titan = new Titan({ apiKey: process.env.TITAN_KEY });

const res = await titan.chat.completions.create({
  model: "titan-chat-large",
  messages: [
    { role: "user", content: "Explain RAG in 2 sentences" },
  ],
});

console.log(res.choices[0].message);`}
                      </pre>
                      <button className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90">Copy SDK</button>
                    </TiltCard>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </Section>

      {/* Showcase: Testimonials */}
      <Section id="showcase" className="pt-0">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-3">
            <TestimonialsCarousel items={content.testimonials} />
            <TiltCard className="p-8">
              <div className="flex items-center gap-2 text-sm text-white/70">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-white/70 text-white/70" />)}
                <span>4.9/5 • 1,200+ reviews</span>
              </div>
              <p className="mt-4 text-sm text-white/80">“Support is responsive, docs are excellent, and the evals suite saves days each release.”</p>
              <div className="mt-4 h-10 w-32 rounded bg-white/10" />
            </TiltCard>
            <TiltCard className="p-8">
              <h4 className="text-white/70">Security certifications</h4>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-video rounded-xl border border-white/10 bg-white/5" />
                ))}
              </div>
            </TiltCard>
          </div>
        </div>
      </Section>

      {/* Pricing with toggle */}
      <Section id="pricing" className="pt-0">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Simple, predictable pricing</h2>
            <p className="mt-3 text-white/70">Start free, scale as you grow. Usage‑based billing with generous quotas.</p>
          </div>
          <div className="mt-6 flex items-center justify-center gap-3 text-sm">
            <span className={cn(!annual && "text-white")}>Monthly</span>
            <button onClick={() => setAnnual((v) => !v)} className="relative h-6 w-11 rounded-full bg-white/10 p-0.5 transition-colors">
              <motion.span layout className={cn("block h-5 w-5 rounded-full bg-white", annual && "translate-x-5")} />
            </button>
            <span className={cn(annual && "text-white")}>Annual <span className="text-sky-300">(save 15%)</span></span>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {[
              { name: "Starter", monthly: 0, pro: false, features: ["100k tokens/day", "Community support", "Hosted playground", "1 environment"] },
              { name: "Pro", monthly: 99, pro: true, features: ["10M tokens/mo", "Priority support", "Fine‑tuning jobs", "3 environments"] },
              { name: "Enterprise", monthly: 0, custom: true, features: ["Unlimited usage", "SLA & uptime guarantees", "Private networking", "SAML/SCIM, SOC 2"] },
            ].map((p) => {
              const price = p.custom ? "Custom" : annual ? Math.round(p.monthly * 12 * 0.85) : p.monthly;
              return (
                <div key={p.name} className={cn("relative rounded-2xl p-px", p.pro && "bg-gradient-to-r from-blue-600/40 via-sky-500/40 to-cyan-500/40") }>
                  <TiltCard className={cn("p-6", p.pro && "ring-1 ring-white/20 bg-white/[0.08]") }>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{p.name}</h3>
                      {p.pro && <span className="rounded-full bg-sky-500/20 px-3 py-1 text-xs text-sky-200">Most popular</span>}
                    </div>
                    <div className="mt-4 flex items-end gap-1">
                      {p.custom ? (
                        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Custom</div>
                      ) : (
                        <NumberFlip value={price} prefix="$" />
                      )}
                      {!p.custom && <div className="pb-1 text-white/60">/mo</div>}
                    </div>
                    <ul className="mt-4 space-y-2 text-sm">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-white/80"><Check className="h-4 w-4 text-cyan-400" /> {f}</li>
                      ))}
                    </ul>
                    <button className={cn("mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium", p.pro ? "bg-white text-black hover:bg-white/90" : "bg-white/10 text-white hover:bg-white/15")}>Get started</button>
                  </TiltCard>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* FAQ with micro animation */}
      <Section id="faq" className="pt-0">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Frequently asked questions</h2>
          </div>
          <div className="mt-10 grid gap-4">
            {content.faq.map((item, idx) => (
              <TiltCard key={idx} className="p-6">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-medium">
                    {item.q}
                    <ChevronDown className="h-5 w-5 transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="mt-2 overflow-hidden text-white/70">
                    {item.a}
                  </motion.p>
                </details>
              </TiltCard>
            ))}
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-white/60">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row">
            <Logo />
            <div className="flex flex-wrap gap-6">
              <a href="#" className="hover:text-white">Status</a>
              <a href="#" className="hover:text-white">Security</a>
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Contact</a>
            </div>
          </div>
          <div className="mt-6 text-xs">© {new Date().getFullYear()} Titan AI. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
