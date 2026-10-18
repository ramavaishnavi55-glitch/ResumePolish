import React, { useState } from 'react';
import { Tag, Copy, Check, CheckCircle2, Search } from 'lucide-react';

interface MissingKeywordsProps {
  keywords: string[];
  strengths: string[];
  onTriggerToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const MissingKeywords: React.FC<MissingKeywordsProps> = ({
  keywords,
  strengths,
  onTriggerToast,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'keywords' | 'strengths'>('keywords');

  const filteredKeywords = keywords.filter((kw) =>
    kw.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyKeyword = (kw: string) => {
    navigator.clipboard.writeText(kw);
    setCopiedKey(kw);
    onTriggerToast(`Copied "${kw}" to clipboard`, 'success');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const copyAllKeywords = () => {
    if (keywords.length === 0) return;
    const allText = keywords.join(', ');
    navigator.clipboard.writeText(allText);
    onTriggerToast(`Copied all ${keywords.length} keywords to clipboard!`, 'success');
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0d121f] p-6 lg:p-7">
      {/* Header and Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Tag className="w-4 h-4 text-violet-400" />
            ATS Keyword & Strength Analysis
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Keywords extracted from job description not sufficiently detected in resume.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-900/90 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('keywords')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'keywords'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Missing Keywords ({keywords.length})
          </button>
          <button
            onClick={() => setActiveTab('strengths')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'strengths'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Strengths ({strengths.length})
          </button>
        </div>
      </div>

      {activeTab === 'keywords' ? (
        <div className="mt-4 space-y-4">
          {/* Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-xs">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900/80 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>

            {keywords.length > 0 && (
              <button
                onClick={copyAllKeywords}
                className="px-3 py-1.5 text-xs font-semibold text-violet-300 hover:text-white bg-violet-950/40 hover:bg-violet-900/60 border border-violet-500/30 rounded-lg transition-all flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy All ({keywords.length})</span>
              </button>
            )}
          </div>

          {/* Keyword Chips */}
          {filteredKeywords.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {filteredKeywords.map((kw, i) => {
                const isCopied = copiedKey === kw;
                return (
                  <button
                    key={`${kw}-${i}`}
                    onClick={() => copyKeyword(kw)}
                    className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/60 hover:border-violet-500/60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                    title={`Click to copy "${kw}"`}
                  >
                    <span>{kw}</span>
                    {isCopied ? (
                      <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                    ) : (
                      <Copy className="w-3 h-3 text-slate-500 group-hover:text-violet-300 transition-colors shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-slate-400">
              {searchTerm ? 'No matching keywords found.' : 'No missing keywords! Clean alignment.'}
            </div>
          )}

          <div className="p-3 rounded-xl bg-violet-950/20 border border-violet-500/20 text-xs text-violet-300/90 flex items-start gap-2">
            <span className="font-semibold text-violet-300">ATS Pro-Tip:</span>
            <span>
              Insert 3 to 5 of these missing terms naturally into your skills section or bullet points to immediately improve automated parsing score.
            </span>
          </div>
        </div>
      ) : (
        /* Strengths View */
        <div className="mt-4 space-y-3">
          {strengths.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {strengths.map((str, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-medium">{str}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-slate-400">
              No standout strengths detected yet.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
