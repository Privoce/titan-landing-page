import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as unknown as ReturnType<typeof createClient>;

export const uploadMedia = async (file: File, folder: string = 'general') => {
  if (!supabase) {
    throw new Error('Supabase is not configured. Define VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('media')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('media')
    .getPublicUrl(data.path);

  return { path: data.path, publicUrl };
};

export const deleteMedia = async (path: string) => {
  if (!supabase) {
    throw new Error('Supabase is not configured. Define VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
  const { error } = await supabase.storage
    .from('media')
    .remove([path]);

  if (error) throw error;
};

export const listMedia = async (folder: string = '') => {
  if (!supabase) {
    console.warn('Supabase is not configured. Returning empty media list.');
    return [];
  }
  console.log(`Attempting to list files in folder: "${folder}"`);

  const { data, error } = await supabase.storage
    .from('media')
    .list(folder, {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' }
    });

  if (error) {
    console.error(`Error listing files in folder "${folder}":`, error);
    throw error;
  }

  console.log(`Raw data from storage bucket for folder "${folder}":`, data);

  if (!data) {
    console.error('No data returned from storage');
    return [];
  }

  const files = data.filter(item => item.id);

  console.log(`Filtered files (excluding folders):`, files);

  return files.map(file => {
    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(folder ? `${folder}/${file.name}` : file.name);

    return {
      ...file,
      publicUrl,
      fullPath: folder ? `${folder}/${file.name}` : file.name
    };
  });
};

export const getLatestVideo = async () => {
  if (!supabase) {
    console.warn('Supabase is not configured. Falling back to default video.');
    return null;
  }
  const videoExtensions = ['.mp4', '.webm', '.mov', '.avi'];
  const folders = ['Videos', 'videos'];

  let allVideoFiles: any[] = [];

  for (const folder of folders) {
    try {
      const files = await listMedia(folder);
      console.log(`Found ${files.length} files in ${folder}:`, files);

      const videoFiles = files.filter(file =>
        videoExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
      );

      console.log(`Found ${videoFiles.length} video files in ${folder}:`, videoFiles);
      allVideoFiles = [...allVideoFiles, ...videoFiles];
    } catch (error) {
      console.log(`Error accessing folder ${folder}:`, error);
    }
  }

  console.log(`Total video files found:`, allVideoFiles.length);

  if (allVideoFiles.length === 0) return null;

  allVideoFiles.sort((a, b) => {
    const timeA = new Date(a.created_at).getTime();
    const timeB = new Date(b.created_at).getTime();
    return timeB - timeA;
  });

  console.log(`Latest video selected:`, allVideoFiles[0]);
  return allVideoFiles[0];
};
