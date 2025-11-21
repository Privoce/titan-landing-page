import { useEffect, useState } from 'react';
import { getLatestVideo } from '../lib/supabase';
import { motion } from 'framer-motion';

export default function TitanAIDynamicPreview() {
  const [videoUrl, setVideoUrl] = useState<string | null>(import.meta.env.BASE_URL + '202511181451 (2).mp4');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        const video = await getLatestVideo();
        if (video) {
          setVideoUrl(video.publicUrl);
        }
      } catch (error) {
        console.error('Failed to load video:', error);
      }
    };

    loadVideo();
  }, []);

  if (loading) {
    return (
      <div className="w-full rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-white/5">
          <p className="text-xs font-medium tracking-widest uppercase text-slate-400">
            Titan AI Deal Copilot Demo
          </p>
        </div>
        <div className="aspect-video flex items-center justify-center bg-black/40">
          <div className="text-white/60 text-sm">Loading video...</div>
        </div>
      </div>
    );
  }

  if (!videoUrl) {
    return (
      <div className="w-full rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-white/5">
          <p className="text-xs font-medium tracking-widest uppercase text-slate-400">
            Titan AI Deal Copilot Demo
          </p>
        </div>
        <div className="aspect-video flex items-center justify-center bg-black/40">
          <div className="text-center text-white/60 px-6">
            <p className="text-sm mb-2">No demo video available</p>
            <p className="text-xs text-white/40">Upload a video to /admin/media in the Videos folder</p>
          </div>
        </div>
      </div>
    );
  }

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
          playsInline
          className="w-full h-full object-contain"
        />
      </div>
    </motion.div>
  );
}
