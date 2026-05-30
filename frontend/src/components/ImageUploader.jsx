import { useState, useRef, useCallback } from 'react';
import { uploadToCloudinary } from '../utils/cloudinaryUpload';

/**
 * @param {{ currentImage: string, onUpload: (url: string) => void }} props
 */
const ImageUploader = ({ currentImage, onUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
  const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

  const validateFile = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return 'Only JPG, PNG, WebP and GIF images are accepted.';
    }
    if (file.size > MAX_SIZE) {
      return 'File size must be under 5 MB.';
    }
    return null;
  };

  const handleUpload = useCallback(async (file) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setUploading(true);
    setProgress(0);

    try {
      const url = await uploadToCloudinary(file, setProgress);
      onUpload(url);
    } catch (err) {
      setError(err.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  }, [onUpload]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const removeImage = () => {
    onUpload('');
    setProgress(0);
    setError('');
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="text-on-surface-variant font-label-md uppercase tracking-wider text-xs">Cover Image</label>

      {/* Current preview */}
      {currentImage && !uploading && (
        <div className="relative rounded-xl overflow-hidden border border-white/10 group">
          <img
            src={currentImage}
            alt="Event cover"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white text-sm font-semibold hover:bg-white/20 transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
              Replace
            </button>
            <button
              type="button"
              onClick={removeImage}
              className="px-4 py-2 bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-lg text-red-300 text-sm font-semibold hover:bg-red-500/30 transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">delete</span>
              Remove
            </button>
          </div>
        </div>
      )}

      {/* Upload area */}
      {!currentImage && !uploading && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-300 p-8
            flex flex-col items-center justify-center gap-3 text-center
            ${dragActive
              ? 'border-primary bg-primary/10 shadow-[0_0_30px_rgba(255,42,95,0.15)]'
              : 'border-white/15 hover:border-white/30 hover:bg-white/5'
            }
          `}
        >
          <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${dragActive ? 'bg-primary/20 text-primary scale-110' : 'bg-white/5 text-on-surface-variant'}`}>
            <span className="material-symbols-outlined text-[28px]">cloud_upload</span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm">
              {dragActive ? 'Drop your image here' : 'Drag & drop or click to upload'}
            </p>
            <p className="text-on-surface-variant text-xs mt-1">JPG, PNG, WebP, GIF • Max 5 MB</p>
          </div>
        </div>
      )}

      {/* Upload progress */}
      {uploading && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-3 border-primary border-t-transparent animate-spin"></div>
          <div className="w-full">
            <div className="flex justify-between text-xs text-on-surface-variant mb-1.5">
              <span>Uploading…</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          <span className="material-symbols-outlined text-[16px]">error</span>
          {error}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;
