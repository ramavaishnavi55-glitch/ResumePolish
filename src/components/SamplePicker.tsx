import React from 'react';
import { SAMPLE_PROFILES } from '../data/samples';
import { SampleProfile } from '../types';
import { Zap, Briefcase } from 'lucide-react';

interface SamplePickerProps {
  onSelectSample: (sample: SampleProfile) => void;
  selectedId: string | null;
}

export const SamplePicker: React.FC<SamplePickerProps> = ({ onSelectSample, selectedId }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#0d121f] border border-slate-800">
      <div className="flex items-center gap-2">
        <div className="p-1 rounded-md bg-amber-500/10 text-amber-400">
          <Zap className="w-3.5 h-3.5" />
        </div>
        <div>
          <span className="text-xs font-bold text-white block">
            Hackathon Quick-Test Demos:
          </span>
          <span className="text-[11px] text-slate-400">
            Load real-world resumes & job descriptions with 1 click
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {SAMPLE_PROFILES.map((sample) => {
          const isSelected = selectedId === sample.id;
          return (
            <button
              key={sample.id}
              onClick={() => onSelectSample(sample)}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                isSelected
                  ? 'bg-violet-600/30 text-violet-200 border-violet-500/80 shadow-md shadow-violet-900/30 font-semibold'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Briefcase className="w-3 h-3 text-slate-400" />
              <span>{sample.title}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
                {sample.badge}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
