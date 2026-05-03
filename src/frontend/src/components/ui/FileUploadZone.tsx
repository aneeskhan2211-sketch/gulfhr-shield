import { cn } from "@/lib/utils";
import { File, Upload, X } from "lucide-react";
import React, { useRef, useState } from "react";

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSizeMB?: number;
  className?: string;
  label?: string;
  "data-ocid"?: string;
}

export default function FileUploadZone({
  onFileSelect,
  accept,
  maxSizeMB = 10,
  className,
  label = "Upload a file",
  "data-ocid": ocid,
}: FileUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<File | null>(null);

  function handleFile(file: File) {
    setError(null);
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File too large. Max size: ${maxSizeMB}MB`);
      return;
    }
    setSelected(file);
    onFileSelect(file);
  }

  return (
    <div className={className} data-ocid={ocid}>
      <div
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
        data-ocid={ocid ? `${ocid}.dropzone` : "dropzone"}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-smooth",
          dragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-muted/30",
        )}
      >
        <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-1">
          Drag & drop or click to browse
        </p>
        <p className="text-xs text-muted-foreground">Max {maxSizeMB}MB</p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        data-ocid={ocid ? `${ocid}.upload_button` : "upload_button"}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      {selected && (
        <div className="mt-2 flex items-center gap-2 p-2 bg-muted/50 rounded-md">
          <File className="w-4 h-4 text-muted-foreground shrink-0" />
          <span className="text-sm text-foreground truncate flex-1">
            {selected.name}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelected(null);
            }}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Remove file"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {error && (
        <p className="mt-1 text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
