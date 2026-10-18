import React from 'react';
import { Sparkles, ArrowDownRight, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <div className="relative pt-6 pb-4">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-gradient-to-r from-violet-600/15 via-indigo-600/20 to-cyan-500/15 blur-3xl opacity-70" />

      <div className="relative text-center max-w-3xl mx-auto space-y-4">
        {/* Gen-Z / Modern Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span>No more resume ghosting · Google X-Y-Z Engine</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
          Turn Mid Bullets into{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-300">
            Tier-1 Offers.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Pass automated ATS filters and impress human hiring managers. Match missing keywords and rewrite passive bullet points into high-impact metric statements.
        </p>

        {/* Quiet Trust Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 pt-1">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Recruiter-Vetted Logic
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            Google X-Y-Z Formula
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            Gemini 3.8 Flash Engine
          </span>
        </div>
      </div>
    </div>
  );
};
