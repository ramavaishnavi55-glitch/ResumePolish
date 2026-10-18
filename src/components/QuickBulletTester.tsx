import React, { useState } from 'react';
import { Sparkles, ArrowRight, Copy, Check, Wand2 } from 'lucide-react';

interface QuickBulletTesterProps {
  onTriggerToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const QuickBulletTester: React.FC<QuickBulletTesterProps> = ({ onTriggerToast }) => {
  const [inputBullet, setInputBullet] = useState(
    'Assisted team with writing unit tests and fixing customer reported bugs in production.'
  );
  const [targetRole, setTargetRole] = useState('Software Engineer');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    improved: string;
    breakdown: {
      accomplished_x: string;
      measured_by_y: string;
      by_doing_z: string;
    };
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handlePolish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputBullet.trim()) {
      onTriggerToast('Hold up bestie, enter a bullet point to polish!', 'error');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/polish-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bullet: inputBullet.trim(),
          targetRole: targetRole.trim(),
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to polish bullet point.');
      }

      const data = await response.json();
      setResult(data);
      onTriggerToast('Single bullet polished using X-Y-Z formula! ✨', 'success');
    } catch (err: any) {
      onTriggerToast(err.message || 'Error polishing bullet', 'error');
    } finally {
      setLoading(false);
    }
  };

  const copyResult = () => {
    if (!result?.improved) return;
    navigator.clipboard.writeText(result.improved);
    setCopied(true);
    onTriggerToast('Copied polished bullet to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0d121f] p-6 lg:p-7 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Wand2 className="w-4 h-4 text-cyan-400" />
            Quick Bullet Polisher & Formula Deconstructor
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Test and deconstruct any single bullet point into its X-Y-Z constituent parts.
          </p>
        </div>
      </div>

      <form onSubmit={handlePolish} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-2 space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Resume Bullet Point
            </label>
            <input
              type="text"
              value={inputBullet}
              onChange={(e) => setInputBullet(e.target.value)}
              placeholder="e.g. Worked on database migration and wrote documentation..."
              className="w-full px-3.5 py-2.5 text-xs bg-slate-900/90 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Target Role Context
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Senior Frontend / DevOps"
              className="w-full px-3.5 py-2.5 text-xs bg-slate-900/90 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 rounded-xl transition-all shadow-md shadow-cyan-600/20 disabled:opacity-50 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            {loading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Polishing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                <span>Polish Bullet</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Polish Result */}
      {result && (
        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/30 to-cyan-950/20 border border-indigo-500/30 space-y-3.5 animate-in fade-in duration-200">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-cyan-400 block mb-1">
                Polished High-Impact Result:
              </span>
              <p className="text-sm font-semibold text-white leading-relaxed">
                {result.improved}
              </p>
            </div>
            <button
              onClick={copyResult}
              className="px-3 py-1.5 rounded-lg bg-indigo-900/60 hover:bg-indigo-800 text-xs font-medium text-indigo-200 hover:text-white border border-indigo-500/40 transition-colors shrink-0 flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Formula Breakdown */}
          {result.breakdown && (
            <div className="pt-3 border-t border-indigo-800/40 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-500/20">
                <span className="text-[10px] uppercase font-bold text-rose-300 block mb-0.5">
                  [X] Accomplished
                </span>
                <span className="text-slate-300 text-[11px] leading-tight">
                  {result.breakdown.accomplished_x}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/20">
                <span className="text-[10px] uppercase font-bold text-amber-300 block mb-0.5">
                  [Y] Measured By
                </span>
                <span className="text-slate-300 text-[11px] leading-tight">
                  {result.breakdown.measured_by_y}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20">
                <span className="text-[10px] uppercase font-bold text-emerald-300 block mb-0.5">
                  [Z] By Doing
                </span>
                <span className="text-slate-300 text-[11px] leading-tight">
                  {result.breakdown.by_doing_z}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
