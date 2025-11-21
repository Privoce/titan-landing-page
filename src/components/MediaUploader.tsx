import { useState, useRef } from 'react';
import { Upload, X, Image, Video, Loader2 } from 'lucide-react';
import { uploadMedia } from '../lib/supabase';

interface MediaUploaderProps {
  folder?: string;
  accept?: string;
  onUploadComplete?: (url: string, path: string) => void;
  label?: string;
}

export default function MediaUploader({
  folder = 'general',
  accept = 'image/*,video/*',
  onUploadComplete,
  label = 'Upload Media'
}: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<'image' | 'video' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setSelectedFile(file);
    const type = file.type.startsWith('image/') ? 'image' : 'video';
    setFileType(type);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setError(null);
    try {
      const { publicUrl, path } = await uploadMedia(selectedFile, folder);
      onUploadComplete?.(publicUrl, path);
      setPreview(null);
      setFileType(null);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    setFileType(null);
    setError(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        id={`file-upload-${folder}`}
      />

      {!preview ? (
        <label
          htmlFor={`file-upload-${folder}`}
          className="flex flex-col items-center justify-center w-full h-48 border-2 border-white/20 border-dashed rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center justify-center py-6">
            <Upload className="w-12 h-12 text-white/60 mb-3" />
            <p className="mb-2 text-sm text-white/80">
              <span className="font-semibold">{label}</span>
            </p>
            <p className="text-xs text-white/60">Images or Videos</p>
          </div>
        </label>
      ) : (
        <>
          <div className="relative w-full h-48 rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm border border-white/20">
            {fileType === 'image' ? (
              <img src={preview} alt="Preview" className="w-full h-full object-contain" />
            ) : (
              <video src={preview} className="w-full h-full object-contain" controls />
            )}
            <button
              onClick={clearPreview}
              className="absolute top-2 right-2 p-2 bg-black/60 hover:bg-black/80 rounded-full transition-colors"
              disabled={uploading}
            >
              <X className="w-4 h-4 text-white" />
            </button>
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}
          </div>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="mt-4 w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Upload to {folder}
              </>
            )}
          </button>
        </>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
