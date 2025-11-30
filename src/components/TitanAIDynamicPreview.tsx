import { motion } from 'framer-motion';

export default function TitanAIDynamicPreview() {
  const videoUrl = '/202511181451 (2).mp4';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm overflow-hidden shadow-2xl hover:shadow-blue-500/10 hover:border-white/20 transition-all duration-500"
      style={{
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 80px rgba(59, 130, 246, 0.1)'
      }}
    >
      <div className="px-6 py-4 border-b border-white/5 bg-black/20">
        <p className="text-xs font-medium tracking-widest uppercase text-slate-400">
          Titan AI Deal Copilot Demo
        </p>
      </div>
      <div className="aspect-video bg-black relative">
        <video
          src={videoUrl}
          controls
          autoPlay
          muted
          playsInline
          className="w-full h-full object-contain"
        />
      </div>
    </motion.div>
  );
}
