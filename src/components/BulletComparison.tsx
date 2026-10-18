import React, { useState } from 'react';
import { RewrittenBullet } from '../types';
import { Copy, Check, Sparkles, Download, Layers, ArrowUpRight, Edit3 } from 'lucide-react';

interface BulletComparisonProps {
  bullets: RewrittenBullet[];
  onTriggerToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
  onApplyBulletsToResumeInput?: (bulletsText: string) => void;
}

export const BulletComparison: React.FC<BulletComparisonProps> = ({
  bullets,
  onTriggerToast,
  onApplyBulletsToResumeInput,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeView, setActiveView] = useState<'side-by-side' | 'improved-only'>('side-by-side');

  const copySingleBullet = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    onTriggerToast('Copied polished bullet to clipboard!', 'success');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAllImprovedBullets = () => {
    if (bullets.length === 0) return;
    const formatted = bullets.map((b) => `• ${b.improved}`).join('\n\n');
    navigator.clipboard.writeText(formatted);
    onTriggerToast(`Copied all ${bullets.length} polished bullets!`, 'success');
  };

  const handleApplyToResume = () => {
    if (bullets.length === 0 || !onApplyBulletsToResumeInput) return;
    const formatted = bullets.map((b) => `• ${b.improved}`).join('\n');
    onApplyBulletsToResumeInput(formatted);
  };

  const downloadAsMarkdown = () => {
    if (bullets.length === 0) return;
    let content = `# ResumePolish: Google X-Y-Z Polished Bullet Points\n\n`;
    content += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
    content += `## Polished Bullets (Google X-Y-Z Formula)\n\n`;
    bullets.forEach((b, i) => {
      content += `### Bullet ${i + 1}\n`;
      content += `**Original (Weak):**\n> ${b.original}\n\n`;
      content += `**Improved (Google X-Y-Z):**\n> ${b.improved}\n\n`;
      content += `---\n\n`;
    });

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `resume_polished_bullets_${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
    onTriggerToast('Downloaded markdown summary!', 'success');
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0d121f] p-6 lg:p-7 space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-white">
              Google X-Y-Z Bullet Point Overhaul
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-950/60 text-indigo-300 border border-indigo-700/40 font-mono">
              {bullets.length} transformed
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            "Accomplished [X] as measured by [Y], by doing [Z]" — transforms passive duties into quantifiable executive impact.
          </p>
        </div>

        {/* View toggles & Bulk Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {onApplyBulletsToResumeInput && (
            <button
              onClick={handleApplyToResume}
              className="px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-lg shadow-md shadow-violet-900/30 transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              title="Push these improved bullets into your resume text area to make custom edits"
            >
              <Edit3 className="w-3.5 h-3.5 text-cyan-200" />
              <span>Apply Bullets to Resume Editor</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-cyan-200" />
            </button>
          )}

          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setActiveView('side-by-side')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                activeView === 'side-by-side'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Side-by-Side
            </button>
            <button
              onClick={() => setActiveView('improved-only')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                activeView === 'improved-only'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Polished Only
            </button>
          </div>

          <button
            onClick={copyAllImprovedBullets}
            className="px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            <Copy className="w-3.5 h-3.5 text-slate-400" />
            <span>Copy All</span>
          </button>

          <button
            onClick={downloadAsMarkdown}
            className="px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:text-white bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-500/30 rounded-lg transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            title="Export bullets as Markdown file"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.md</span>
          </button>
        </div>
      </div>

      {/* Formula Explainer Strip */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-violet-950/20 via-indigo-950/30 to-cyan-950/20 border border-violet-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300 font-medium">
          <Layers className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>The Google Recruiter Benchmark:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
          <span className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-300 font-semibold">
            [X] Accomplished Goal
          </span>
          <span className="text-slate-500 font-sans">+</span>
          <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold">
            [Y] Quantified Metric
          </span>
          <span className="text-slate-500 font-sans">+</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-semibold">
            [Z] Method / Technology
          </span>
        </div>
      </div>

      {/* Bullets List */}
      <div className="space-y-4">
        {bullets.map((b, idx) => {
          const isCopied = copiedIndex === idx;

          if (activeView === 'improved-only') {
            return (
              <div
                key={idx}
                className="relative p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/10 hover:border-emerald-500/50 transition-all group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold shrink-0 mt-0.5 font-mono">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-slate-100 leading-relaxed font-medium">
                      {b.improved}
                    </p>
                  </div>
                  <button
                    onClick={() => copySingleBullet(b.improved, idx)}
                    className="p-2 rounded-lg bg-slate-900/80 hover:bg-emerald-900/60 border border-slate-700 hover:border-emerald-500 text-slate-300 hover:text-white transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    aria-label={`Copy bullet ${idx + 1}`}
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div
              key={idx}
              className="rounded-xl border border-slate-800/90 bg-slate-950/40 p-4 transition-all hover:border-slate-700/80"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/60 text-xs text-slate-400">
                <span className="font-mono font-medium text-slate-300">
                  Bullet #{idx + 1} Comparison
                </span>
                <button
                  onClick={() => copySingleBullet(b.improved, idx)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    isCopied
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-indigo-950/60 hover:bg-indigo-900/70 text-indigo-300 border border-indigo-500/30 hover:border-indigo-500/60'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Improved</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Original Weak Bullet */}
                <div className="p-3.5 rounded-lg bg-rose-950/10 border border-rose-900/20 text-xs text-slate-300">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <span className="font-semibold text-rose-300 uppercase tracking-wider text-[10px]">
                      Original (Weak / Task-focused)
                    </span>
                  </div>
                  <p className="leading-relaxed text-slate-300 font-mono text-[12px]">
                    "{b.original}"
                  </p>
                </div>

                {/* AI Polished Google X-Y-Z Bullet */}
                <div className="p-3.5 rounded-lg bg-gradient-to-br from-emerald-950/20 to-indigo-950/20 border border-emerald-500/30 text-xs">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="font-semibold text-emerald-300 uppercase tracking-wider text-[10px]">
                        AI Polished (Google X-Y-Z)
                      </span>
                    </div>
                    <span className="text-[10px] text-cyan-400 font-medium">
                      High Impact
                    </span>
                  </div>
                  <p className="leading-relaxed text-slate-100 font-medium text-[13px]">
                    {b.improved}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
