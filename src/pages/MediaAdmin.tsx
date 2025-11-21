import { useState, useEffect } from 'react';
import { Trash2, Copy, Check, Image as ImageIcon, Video as VideoIcon, Folder } from 'lucide-react';
import MediaUploader from '../components/MediaUploader';
import { listMedia, deleteMedia } from '../lib/supabase';
import Logo from '../components/shared/Logo';

interface MediaFile {
  name: string;
  publicUrl: string;
  fullPath: string;
  created_at: string;
  metadata?: {
    size?: number;
  };
}

export default function MediaAdmin() {
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [selectedFolder, setSelectedFolder] = useState('screenshots');

  const folders = [
    { id: 'screenshots', name: 'Screenshots', icon: ImageIcon },
    { id: 'logos', name: 'Logos', icon: ImageIcon },
    { id: 'videos', name: 'Videos', icon: VideoIcon },
    { id: 'general', name: 'General', icon: Folder }
  ];

  const loadMedia = async () => {
    setLoading(true);
    try {
      console.log('MediaAdmin: Loading media for folder:', selectedFolder);
      const files = await listMedia(selectedFolder);
      console.log('MediaAdmin: Received files:', files);
      setMedia(files);
    } catch (error) {
      console.error('Failed to load media:', error);
      alert(`Failed to load media: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, [selectedFolder]);

  const handleDelete = async (path: string) => {
    if (!confirm('Delete this file?')) return;

    try {
      await deleteMedia(path);
      setMedia(media.filter(m => m.fullPath !== path));
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('Failed to delete file');
    }
  };

  const copyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown';
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  const isVideo = (name: string) => {
    return /\.(mp4|webm|mov|avi)$/i.test(name);
  };

  const testStorageAccess = async () => {
    console.log('=== Testing Storage Access ===');
    const { listMedia } = await import('../lib/supabase');
    const { supabase } = await import('../lib/supabase');

    console.log('Test 1: List all folders at root');
    const { data: rootData, error: rootError } = await supabase.storage
      .from('media')
      .list('', { limit: 100 });
    console.log('Root listing:', rootData, rootError);

    console.log('Test 2: List videos folder');
    const { data: videosData, error: videosError } = await supabase.storage
      .from('media')
      .list('videos', { limit: 100 });
    console.log('Videos folder listing:', videosData, videosError);

    console.log('Test 3: Using listMedia function');
    try {
      const files = await listMedia('videos');
      console.log('listMedia result:', files);
    } catch (e) {
      console.error('listMedia error:', e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Logo className="mb-4" />
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Media Manager</h1>
              <p className="text-white/60">Upload and manage images, videos, and logos</p>
            </div>
            <button
              onClick={testStorageAccess}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm"
            >
              Debug Storage
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Upload New Media</h2>

              <div className="mb-4">
                <label className="text-sm text-white/80 mb-2 block">Select Folder</label>
                <select
                  value={selectedFolder}
                  onChange={(e) => setSelectedFolder(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {folders.map(folder => (
                    <option key={folder.id} value={folder.id}>{folder.name}</option>
                  ))}
                </select>
              </div>

              <MediaUploader
                folder={selectedFolder}
                onUploadComplete={loadMedia}
                label="Click to upload"
              />
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-3">Folders</h3>
              <div className="space-y-2">
                {folders.map(folder => {
                  const Icon = folder.icon;
                  return (
                    <button
                      key={folder.id}
                      onClick={() => setSelectedFolder(folder.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        selectedFolder === folder.id
                          ? 'bg-blue-500/20 text-white border border-blue-500/40'
                          : 'bg-white/5 text-white/70 hover:bg-white/10 border border-transparent'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{folder.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">
                  {folders.find(f => f.id === selectedFolder)?.name} ({media.length})
                </h2>
              </div>

              {loading ? (
                <div className="text-center py-12 text-white/60">Loading...</div>
              ) : media.length === 0 ? (
                <div className="text-center py-12 text-white/60">No files uploaded yet</div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {media.map((file) => (
                    <div
                      key={file.fullPath}
                      className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all group"
                    >
                      <div className="aspect-video bg-black/40 relative overflow-hidden">
                        {isVideo(file.name) ? (
                          <video
                            src={file.publicUrl}
                            className="w-full h-full object-contain"
                            controls
                          />
                        ) : (
                          <img
                            src={file.publicUrl}
                            alt={file.name}
                            className="w-full h-full object-contain"
                          />
                        )}
                      </div>

                      <div className="p-4">
                        <p className="text-sm text-white/80 font-medium truncate mb-2">
                          {file.name}
                        </p>
                        <p className="text-xs text-white/50 mb-3">
                          {formatFileSize(file.metadata?.size)}
                        </p>

                        <div className="flex gap-2">
                          <button
                            onClick={() => copyUrl(file.publicUrl)}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all text-sm"
                          >
                            {copiedUrl === file.publicUrl ? (
                              <>
                                <Check className="w-4 h-4" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                Copy URL
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => handleDelete(file.fullPath)}
                            className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
