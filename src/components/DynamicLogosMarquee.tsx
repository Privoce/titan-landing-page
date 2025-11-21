import { useMediaGallery } from '../hooks/useMediaGallery';
import LogosMarquee from './ui/LogosMarquee';

interface DynamicLogosMarqueeProps {
  folder?: string;
  speed?: number;
  pauseOnHover?: boolean;
  fallbackCount?: number;
}

export default function DynamicLogosMarquee({
  folder = 'logos',
  speed = 24,
  pauseOnHover = true,
  fallbackCount = 10
}: DynamicLogosMarqueeProps) {
  const { media, loading } = useMediaGallery(folder);

  const logos = media.length > 0
    ? media.map(file => ({ src: file.publicUrl, alt: file.name }))
    : Array.from({ length: fallbackCount }).map((_, i) => ({ src: "", alt: `Logo ${i + 1}` }));

  if (loading) {
    return (
      <div className="relative mx-auto max-w-7xl overflow-hidden px-6 py-2">
        <div className="flex gap-x-12 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-16 w-40 shrink-0 rounded bg-white/5 border border-white/10"
            />
          ))}
        </div>
      </div>
    );
  }

  return <LogosMarquee logos={logos} speed={speed} pauseOnHover={pauseOnHover} />;
}
