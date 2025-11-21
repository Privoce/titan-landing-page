import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function HolographicCockpit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }

    const particles: Particle[] = [];
    const gridLines: Array<{ x1: number; y1: number; x2: number; y2: number; opacity: number }> = [];

    const particleCount = 120;
    const connectionDistance = 120;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    const edgeZone = canvas.width * 0.25;
    for (let i = 0; i < 15; i++) {
      const isLeft = i < 7;
      const x1 = isLeft ? Math.random() * edgeZone : canvas.width - Math.random() * edgeZone;
      const x2 = isLeft ? Math.random() * edgeZone : canvas.width - Math.random() * edgeZone;

      gridLines.push({
        x1,
        y1: Math.random() * canvas.height,
        x2,
        y2: Math.random() * canvas.height,
        opacity: Math.random() * 0.15 + 0.1,
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(7, 7, 22, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      gridLines.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.strokeStyle = `rgba(59, 130, 246, ${line.opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3
        );
        gradient.addColorStop(0, `rgba(6, 182, 212, ${particle.opacity})`);
        gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
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
            const opacity = (1 - distance / connectionDistance) * 0.3;
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #070716, #0a0a1f)',
        }}
      />

      <motion.div
        className="absolute top-[15%] left-[3%] w-52 h-36 border-2 border-cyan-400/70 rounded-lg shadow-lg shadow-cyan-500/30"
        initial={{ opacity: 0, x: -30 }}
        animate={{
          opacity: [0.6, 0.9, 0.6],
          x: [-30, 0, -30]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.5, 1]
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 backdrop-blur-sm rounded-lg" />
        <div className="p-4 relative z-10">
          <div className="text-xs font-mono text-cyan-300 mb-3 tracking-wide font-semibold">DEAL INTEL</div>
          <div className="space-y-3">
            <motion.div
              className="h-2 bg-gradient-to-r from-cyan-400/70 to-cyan-400/20 w-3/4 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="h-2 bg-gradient-to-r from-blue-400/70 to-blue-400/20 w-full rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-[40%] left-[3%] w-48 h-32 border-2 border-blue-400/70 rounded-lg shadow-lg shadow-blue-500/30"
        initial={{ opacity: 0, x: -30 }}
        animate={{
          opacity: [0.6, 0.9, 0.6],
          x: [-30, 0, -30]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
          times: [0, 0.5, 1]
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 to-cyan-500/15 backdrop-blur-sm rounded-lg" />
        <div className="p-4 relative z-10">
          <div className="text-xs font-mono text-blue-300 mb-3 tracking-wide font-semibold">PRICING</div>
          <div className="space-y-3">
            <motion.div
              className="h-2 bg-gradient-to-r from-blue-400/70 to-blue-400/20 w-2/3 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />
            <motion.div
              className="h-2 bg-gradient-to-r from-cyan-400/70 to-cyan-400/20 w-full rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-[65%] left-[3%] w-44 h-28 border-2 border-cyan-400/70 rounded-lg shadow-lg shadow-cyan-500/30"
        initial={{ opacity: 0, x: -30 }}
        animate={{
          opacity: [0.6, 0.9, 0.6],
          x: [-30, 0, -30]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
          times: [0, 0.5, 1]
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 backdrop-blur-sm rounded-lg" />
        <div className="p-3 relative z-10">
          <div className="text-xs font-mono text-cyan-300 mb-2 tracking-wide font-semibold">MARGINS</div>
          <div className="space-y-3">
            <motion.div
              className="h-2 bg-gradient-to-r from-cyan-400/70 to-cyan-400/20 w-3/4 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />
            <motion.div
              className="h-2 bg-gradient-to-r from-blue-400/70 to-blue-400/20 w-1/2 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-[15%] right-[3%] w-52 h-36 border-2 border-cyan-400/70 rounded-lg shadow-lg shadow-cyan-500/30"
        initial={{ opacity: 0, x: 30 }}
        animate={{
          opacity: [0.6, 0.9, 0.6],
          x: [30, 0, 30]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
          times: [0, 0.5, 1]
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 backdrop-blur-sm rounded-lg" />
        <div className="p-4 relative z-10">
          <div className="text-xs font-mono text-cyan-300 mb-3 tracking-wide font-semibold">COMPETITIVE</div>
          <div className="space-y-3">
            <motion.div
              className="h-2 bg-gradient-to-r from-blue-400/70 to-blue-400/20 w-2/3 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
            />
            <motion.div
              className="h-2 bg-gradient-to-r from-cyan-400/70 to-cyan-400/20 w-full rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-[40%] right-[3%] w-48 h-32 border-2 border-blue-400/70 rounded-lg shadow-lg shadow-blue-500/30"
        initial={{ opacity: 0, x: 30 }}
        animate={{
          opacity: [0.6, 0.9, 0.6],
          x: [30, 0, 30]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
          times: [0, 0.5, 1]
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 to-cyan-500/15 backdrop-blur-sm rounded-lg" />
        <div className="p-4 relative z-10">
          <div className="text-xs font-mono text-blue-300 mb-3 tracking-wide font-semibold">CUSTOMER</div>
          <div className="space-y-3">
            <motion.div
              className="h-2 bg-gradient-to-r from-cyan-400/70 to-cyan-400/20 w-3/4 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />
            <motion.div
              className="h-2 bg-gradient-to-r from-blue-400/70 to-blue-400/20 w-1/2 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-[65%] right-[3%] w-44 h-28 border-2 border-cyan-400/70 rounded-lg shadow-lg shadow-cyan-500/30"
        initial={{ opacity: 0, x: 30 }}
        animate={{
          opacity: [0.6, 0.9, 0.6],
          x: [30, 0, 30]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
          times: [0, 0.5, 1]
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 backdrop-blur-sm rounded-lg" />
        <div className="p-3 relative z-10">
          <div className="text-xs font-mono text-cyan-300 mb-2 tracking-wide font-semibold">APPROVAL</div>
          <div className="space-y-3">
            <motion.div
              className="h-2 bg-gradient-to-r from-cyan-400/70 to-cyan-400/20 w-2/3 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />
            <motion.div
              className="h-2 bg-gradient-to-r from-blue-400/70 to-blue-400/20 w-3/4 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}
