import React from 'react';
import { Sparkles, RotateCcw, FileText, CheckCircle, Flame } from 'lucide-react';

interface NavbarProps {
  onReset: () => void;
  onScrollToDashboard?: () => void;
  hasResults: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onReset, onScrollToDashboard, hasResults }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#090b10]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-violet-500/20">
            <div className="w-full h-full bg-[#0d111a] rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-300" />
            </div>
          </div>
          <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5 whitespace-nowrap shrink-0">
            ResumePolish
            <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20">
              Gemini ATS
            </span>
          </span>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-400">
          <a
            href="#editor"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            Resume Input
          </a>
          <a
            href="#xyz-formula"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Google X-Y-Z Method
          </a>
          {hasResults && (
            <button
              onClick={onScrollToDashboard}
              className="text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 font-semibold"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Live Results
            </button>
          )}
        </nav>

        {/* Action Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onReset}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-lg border border-slate-700/60 transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            title="Reset inputs and clear dashboard"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
};
