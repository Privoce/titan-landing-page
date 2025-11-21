import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const particleCount = 60;
    const connectionDistance = 180;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.3 + 0.2,
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(3, 7, 18, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        gradient.addColorStop(0, `rgba(59, 130, 246, ${particle.opacity})`);
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const opacity = (1 - distance / connectionDistance) * 0.15;
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="hero" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-screen flex items-center">
      {/* Enhanced Tech Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(to bottom, #030712, #0a0f1e)' }}
      />

      {/* Subtle overlay to darken background slightly */}
      <div className="absolute inset-0 bg-black/20 z-[1]" />

      <div className="max-w-[1400px] mx-auto relative z-10 w-full">
        {/* Unified Glassmorphic Card */}
        <div className="relative backdrop-blur-xl bg-gradient-to-br from-[#050816]/90 via-[#030712]/80 to-[#050816]/90 rounded-[32px] border border-white/10 shadow-2xl shadow-blue-500/10 p-8 sm:p-12 lg:p-16">
          {/* Outer glow effect */}
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

          {/* Inner shadow effect */}
          <div className="absolute inset-0 rounded-[32px] shadow-[inset_0_2px_20px_rgba(0,0,0,0.3)] pointer-events-none" />

          <div className="relative z-10">
            {/* Extended backdrop that covers both columns */}
            <div className="absolute -left-8 -right-8 -top-8 -bottom-8 bg-slate-900/40 backdrop-blur-md rounded-3xl border border-white/5 shadow-2xl pointer-events-none" />

            {/* Left: Text Content */}
            <div className="flex flex-col justify-between relative">

              {/* Main Title */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] relative z-10">
                <span className="text-white">Titan AI — </span>
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Qualitative competitive analysis
                </span>
              </h1>

              {/* Executive Team */}
              <div className="mb-10 relative z-10 flex-1">
                <h3 className="text-2xl font-semibold text-white mb-6">Executives</h3>
                <div className="space-y-6 text-white/90">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-400 mb-1">Levy (CEO)</h4>
                    <p className="text-base leading-relaxed font-light">
                      Co-led AI/ML-driven sales and revenue transformations for F100 enterprises at top global consulting firms
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-400 mb-1">Han (CTO)</h4>
                    <p className="text-base leading-relaxed font-light">
                      Former Tencent AI engineer and MIT graduate on full scholarship; serial entrepreneur with deep expertise in full-stack productization and end-to-end AI/ML implementation
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-400 mb-1">Yifan (Chief Research Officer)</h4>
                    <p className="text-base leading-relaxed font-light">
                      Former Google Vertex AI Tech Lead and Apple engineer; specialist in ML model training, structured-data modeling, and LLM fine-tuning
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mb-12 relative z-10">
                <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center space-x-2 font-semibold text-lg">
                  <span>Schedule demo</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 relative z-10">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-1">
                    0.5–8%
                  </div>
                  <div className="text-xl text-white font-medium">margin uplift</div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-1">
                    5–10×
                  </div>
                  <div className="text-xl text-white font-medium">faster pricing cycle</div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-1">
                    0.3–7.5%
                  </div>
                  <div className="text-xl text-white font-medium">revenue increase</div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-1">
                    30–90%
                  </div>
                  <div className="text-sm text-white/60 whitespace-nowrap text-center">related costs reduction</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
