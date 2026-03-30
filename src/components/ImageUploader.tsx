import { useState, useRef, useCallback } from "react";
import { Upload, X, Image as ImageIcon, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_WIDTH = 1000;
const QUALITY = 0.85;

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
}

const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      let { width, height } = img;
      if (width > MAX_WIDTH) {
        height = Math.round((height * MAX_WIDTH) / width);
        width = MAX_WIDTH;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL("image/webp", QUALITY);
      resolve(dataUrl);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
};

const ImageUploader = ({ images, onChange }: ImageUploaderProps) => {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) return `"${file.name}" — only JPG, PNG, WEBP allowed`;
    if (file.size > MAX_FILE_SIZE) return `"${file.name}" — exceeds 2MB limit (${(file.size / 1024 / 1024).toFixed(1)}MB)`;
    return null;
  };

  const processFiles = useCallback(async (files: FileList | File[]) => {
    const fileArr = Array.from(files);
    const errors: string[] = [];
    const valid: File[] = [];

    fileArr.forEach(f => {
      const err = validateFile(f);
      if (err) errors.push(err);
      else valid.push(f);
    });

    if (errors.length) errors.forEach(e => toast.error(e));
    if (!valid.length) return;

    setUploading(true);
    try {
      const compressed = await Promise.all(valid.map(compressImage));
      onChange([...images, ...compressed]);
      toast.success(`${compressed.length} image${compressed.length > 1 ? "s" : ""} uploaded`);
    } catch {
      toast.error("Image processing failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }, [images, onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium mb-1 flex items-center gap-1.5">
        <ImageIcon className="w-3.5 h-3.5" /> Product Images
      </label>

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
          dragging
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-border hover:border-primary/50 hover:bg-muted/50"
        }`}
      >
        <input
          ref={fileRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          multiple
          className="hidden"
          onChange={e => e.target.files?.length && processFiles(e.target.files)}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2 py-2">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Compressing & optimizing...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-2">
            <Upload className={`w-8 h-8 ${dragging ? "text-primary" : "text-muted-foreground"}`} />
            <p className="text-sm font-medium">
              {dragging ? "Drop images here" : "Drag & drop or click to upload"}
            </p>
            <p className="text-xs text-muted-foreground">JPG, PNG, WEBP • Max 2MB each</p>
          </div>
        )}
      </div>

      {/* Info note */}
      <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg p-2.5">
        <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
        <span>Images auto-compressed to WebP, max 1000px width for fast loading.</span>
      </div>

      {/* Previews */}
      <AnimatePresence>
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-3 gap-2"
          >
            {images.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group aspect-square rounded-lg overflow-hidden border border-border bg-muted"
              >
                <img src={src} alt={`Upload ${i + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                  className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUploader;
