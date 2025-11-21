export default function AnimatedBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-gradient-to-br from-blue-600/20 via-sky-500/20 to-cyan-500/20 blur-3xl animate-[pulse_10s_ease-in-out_infinite]" />
      <div className="absolute -right-40 -bottom-40 h-[38rem] w-[38rem] rounded-full bg-gradient-to-br from-blue-600/20 via-sky-500/20 to-cyan-500/20 blur-3xl animate-[pulse_12s_ease-in-out_infinite]" />
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, rgba(37,99,235,0.06), rgba(59,130,246,0.06), rgba(6,182,212,0.06), rgba(37,99,235,0.06))",
          animation: "spin 60s linear infinite",
        }}
      />
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
