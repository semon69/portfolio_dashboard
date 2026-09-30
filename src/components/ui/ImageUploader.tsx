import { useRef, useState } from "react";
import { FiAlertCircle, FiUploadCloud } from "react-icons/fi";
import {
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_UPLOAD_URL,
  MAX_UPLOAD_BYTES,
  cloudinaryConfigured,
} from "../../config/cloudinary";

type Props = {
  /** Receives the hosted URL once the upload finishes. */
  onUploaded: (url: string) => void;
  folder?: string;
};

const prettySize = (bytes: number) => `${(bytes / 1024 / 1024).toFixed(1)}MB`;

/**
 * Drag-and-drop (or click) upload straight from the browser to
 * Cloudinary. Uses XHR rather than fetch because fetch gives no upload
 * progress events.
 */
const ImageUploader = ({ onUploaded, folder }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState("");

  const upload = (file: File) => {
    setError("");

    if (!file.type.startsWith("image/")) {
      setError("That's not an image file.");
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      setError(
        `That file is ${prettySize(file.size)}. The limit is ${prettySize(
          MAX_UPLOAD_BYTES
        )}.`
      );
      return;
    }

    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    if (folder) form.append("folder", folder);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", CLOUDINARY_UPLOAD_URL);

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) return;
      setProgress(Math.round((event.loaded / event.total) * 100));
    };

    xhr.onload = () => {
      setProgress(null);
      try {
        const body = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300 && body.secure_url) {
          onUploaded(body.secure_url);
        } else {
          setError(body?.error?.message ?? `Upload failed (${xhr.status}).`);
        }
      } catch {
        setError("Cloudinary returned something unreadable.");
      }
    };

    xhr.onerror = () => {
      setProgress(null);
      setError("Couldn't reach Cloudinary. Check your connection.");
    };

    setProgress(0);
    xhr.send(form);
  };

  if (!cloudinaryConfigured) {
    return (
      <div className="rounded-lg border border-dashed border-line px-4 py-4 text-xs text-muted">
        <p className="flex items-center gap-2 font-medium text-ink">
          <FiAlertCircle aria-hidden="true" />
          Uploads aren&rsquo;t set up
        </p>
        <p className="mt-1.5 leading-relaxed">
          Add <code className="font-mono">VITE_CLOUDINARY_CLOUD_NAME</code> and{" "}
          <code className="font-mono">VITE_CLOUDINARY_UPLOAD_PRESET</code> to{" "}
          <code className="font-mono">.env.local</code>, then restart the dev
          server. You can still paste a URL below.
        </p>
      </div>
    );
  }

  const busy = progress !== null;

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file) upload(file);
        }}
        disabled={busy}
        className={`flex w-full flex-col items-center gap-2 rounded-lg border border-dashed px-4 py-6 text-center transition-colors ${
          dragging
            ? "border-accent bg-accent/5"
            : "border-line hover:border-accent/50"
        } ${busy ? "pointer-events-none opacity-70" : ""}`}
      >
        <FiUploadCloud
          className={`text-xl ${dragging ? "text-accent" : "text-faint"}`}
          aria-hidden="true"
        />
        <span className="text-sm font-medium text-ink">
          {busy ? `Uploading… ${progress}%` : "Drop an image or click to browse"}
        </span>
        <span className="text-xs text-faint">
          PNG, JPG, WebP or GIF · up to {prettySize(MAX_UPLOAD_BYTES)}
        </span>
      </button>

      {busy && (
        <div
          className="mt-2 h-1 overflow-hidden rounded-full bg-raised"
          role="progressbar"
          aria-valuenow={progress ?? 0}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-accent-solid transition-[width] duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {error && (
        <p role="alert" className="mt-2 text-xs text-danger">
          {error}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) upload(file);
          // Reset so picking the same file twice still fires onChange.
          e.target.value = "";
        }}
      />
    </div>
  );
};

export default ImageUploader;
