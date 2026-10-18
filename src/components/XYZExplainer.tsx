import React from 'react';
import { Layers, CheckCircle2, TrendingUp, HelpCircle } from 'lucide-react';

export const XYZExplainer: React.FC = () => {
  return (
    <div id="xyz-formula" className="rounded-2xl border border-slate-800 bg-[#0d121f] p-6 lg:p-7 space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Why Google’s X-Y-Z Formula Gets Interviews
            </h3>
            <span className="text-xs text-slate-400">
              The exact framework recommended by former Google SVP Laszlo Bock
            </span>
          </div>
        </div>

        <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-1 rounded-full">
          Google Standard
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step X */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider font-mono">
              [X] Accomplished
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Step 1</span>
          </div>
          <h4 className="text-sm font-semibold text-slate-100">
            The Business Outcome
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Start with an authoritative action verb. What specific objective, feature, or milestone did you achieve?
          </p>
          <div className="p-2 rounded bg-black/40 border border-slate-800 text-[11px] text-rose-300 font-mono">
            "Reduced payment transaction drop-off..."
          </div>
        </div>

        {/* Step Y */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
              [Y] Measured By
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Step 2</span>
          </div>
          <h4 className="text-sm font-semibold text-slate-100">
            The Quantifiable Metric
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Numbers prove credibility. Quantify the percentage increase, latency drop, cost savings, or user volume.
          </p>
          <div className="p-2 rounded bg-black/40 border border-slate-800 text-[11px] text-amber-300 font-mono">
            "...by 34% across 1.2M monthly users..."
          </div>
        </div>

        {/* Step Z */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
              [Z] By Doing
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Step 3</span>
          </div>
          <h4 className="text-sm font-semibold text-slate-100">
            The Method & Tech Stack
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Explain the exact engineering decisions, algorithms, architecture, or tools you used to make it happen.
          </p>
          <div className="p-2 rounded bg-black/40 border border-slate-800 text-[11px] text-emerald-300 font-mono">
            "...by re-architecting Redis checkout cache and lazy-loading scripts."
          </div>
        </div>
      </div>
    </div>
  );
};
