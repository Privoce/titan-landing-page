import { useState, useEffect } from 'react';
import { listMedia } from '../lib/supabase';

interface MediaFile {
  name: string;
  publicUrl: string;
  fullPath: string;
  created_at: string;
}

export function useMediaGallery(folder: string = 'logos') {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        setLoading(true);
        const files = await listMedia(folder);
        setMedia(files);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load media'));
      } finally {
        setLoading(false);
      }
    };

    loadMedia();
  }, [folder]);

  return { media, loading, error };
}
