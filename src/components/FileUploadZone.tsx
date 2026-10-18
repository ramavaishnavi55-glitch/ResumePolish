import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface FileUploadZoneProps {
  onFileExtracted: (text: string, fileName: string) => void;
  onTriggerToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  onFileExtracted,
  onTriggerToast,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    // Validate file type
    const validExtensions = ['.pdf', '.txt', '.md', '.doc', '.docx', '.rtf'];
    const lowerName = file.name.toLowerCase();
    const isValid = validExtensions.some((ext) => lowerName.endsWith(ext));

    if (!isValid) {
      onTriggerToast('Please upload a PDF, TXT, or MD resume file.', 'error');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      onTriggerToast('File size exceeds 15MB limit.', 'error');
      return;
    }

    setUploading(true);
    setUploadedFileName(file.name);

    try {
      if (lowerName.endsWith('.txt') || lowerName.endsWith('.md')) {
        // Read directly as text
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          if (content) {
            onFileExtracted(content, file.name);
            onTriggerToast(`Extracted ${file.name} successfully! ✨`, 'success');
          }
          setUploading(false);
        };
        reader.onerror = () => {
          onTriggerToast('Error reading text file.', 'error');
          setUploading(false);
        };
        reader.readAsText(file);
      } else {
        // Read as base64 and send to server-side Gemini PDF extractor
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const dataUrl = e.target?.result as string;
            const base64 = dataUrl.split(',')[1];
            const mimeType = file.type || (lowerName.endsWith('.pdf') ? 'application/pdf' : 'text/plain');

            const res = await fetch('/api/extract-resume-file', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                fileBase64: base64,
                mimeType,
                fileName: file.name,
              }),
            });

            if (!res.ok) {
              const err = await res.json().catch(() => ({}));
              throw new Error(err.error || 'Failed to extract text from file');
            }

            const data = await res.json();
            onFileExtracted(data.extractedText, file.name);
            onTriggerToast(`Successfully extracted resume from ${file.name}! ✨`, 'success');
          } catch (err: any) {
            console.error('File extraction failed:', err);
            onTriggerToast(err.message || 'Failed to parse resume document.', 'error');
          } finally {
            setUploading(false);
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (err: any) {
      console.error(err);
      onTriggerToast('Failed to process file.', 'error');
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative rounded-2xl border-2 border-dashed p-4 sm:p-5 transition-all text-center ${
        isDragging
          ? 'border-cyan-400 bg-cyan-950/20 scale-[1.01]'
          : 'border-slate-800 hover:border-slate-700 bg-slate-950/40'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.txt,.md,.doc,.docx"
        onChange={handleFileChange}
        className="hidden"
        id="resume-file-upload"
      />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              uploading
                ? 'bg-cyan-500/20 text-cyan-400'
                : 'bg-violet-500/10 text-violet-400 border border-violet-500/20'
            }`}
          >
            {uploading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Upload className="w-5 h-5" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-white">
                Upload User Resume
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-violet-950/60 text-violet-300 border border-violet-800/40 font-mono">
                PDF / TXT / MD
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {uploading
                ? 'Gemini is reading and extracting your resume document...'
                : 'Drag & drop your resume file or browse from your device'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
          {uploadedFileName && !uploading && (
            <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {uploadedFileName}
            </span>
          )}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/60 rounded-xl transition-all disabled:opacity-50 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>{uploading ? 'Extracting...' : 'Browse File'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
