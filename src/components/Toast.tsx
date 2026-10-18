import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const icons = {
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-cyan-400 shrink-0" />,
  };

  const borders = {
    error: 'border-rose-500/30 bg-rose-950/80 shadow-rose-900/20',
    success: 'border-emerald-500/30 bg-emerald-950/80 shadow-emerald-900/20',
    info: 'border-cyan-500/30 bg-cyan-950/80 shadow-cyan-900/20',
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4 animate-in fade-in slide-in-from-bottom-4 duration-200"
    >
      <div
        className={`flex items-start gap-3 p-4 rounded-xl border backdrop-blur-xl shadow-2xl text-slate-100 ${borders[toast.type]}`}
      >
        {icons[toast.type]}
        <div className="flex-1 text-sm font-medium leading-relaxed">
          {toast.message}
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors p-1 -mr-1 -mt-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
