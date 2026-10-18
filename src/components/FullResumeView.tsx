import React, { useState, useEffect } from 'react';
import { FullPolishedResume } from '../types';
import {
  FileText,
  Copy,
  Check,
  Download,
  Printer,
  Sparkles,
  Code,
  Eye,
  Edit3,
  ArrowUpRight,
  Save,
  RotateCcw,
} from 'lucide-react';

interface FullResumeViewProps {
  polishedResume: FullPolishedResume;
  onTriggerToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
  onApplyToResumeInput: (text: string) => void;
}

export const FullResumeView: React.FC<FullResumeViewProps> = ({
  polishedResume,
  onTriggerToast,
  onApplyToResumeInput,
}) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'edit' | 'markdown'>('preview');
  const [currentMarkdown, setCurrentMarkdown] = useState(polishedResume.full_markdown);

  // Sync when polishedResume prop changes
  useEffect(() => {
    setCurrentMarkdown(polishedResume.full_markdown);
  }, [polishedResume.full_markdown]);

  const copyMarkdown = () => {
    navigator.clipboard.writeText(currentMarkdown);
    setCopied(true);
    onTriggerToast('Copied full polished resume to clipboard! 📋', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = (ext: 'md' | 'txt') => {
    const blob = new Blob([currentMarkdown], {
      type: ext === 'md' ? 'text/markdown;charset=utf-8' : 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const cleanName = polishedResume.candidate_name.replace(/\s+/g, '_').toLowerCase() || 'polished_resume';
    link.download = `${cleanName}_resume.${ext}`;
    link.click();
    URL.revokeObjectURL(url);
    onTriggerToast(`Downloaded ${link.download}! ✨`, 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendToEditor = () => {
    onApplyToResumeInput(currentMarkdown);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0d121f] p-6 lg:p-8 space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Full Polished Resume Document
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-700/40 font-mono">
              Ready to Send
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Complete resume generated with Google X-Y-Z achievements, keyword enrichment, and executive ATS formatting.
          </p>
        </div>

        {/* Primary Action: Send back to Editor */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleSendToEditor}
            className="px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-violet-600/30 transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            title="Load this polished resume back into the upload/edit area above to make custom manual changes"
          >
            <Edit3 className="w-3.5 h-3.5 text-cyan-200" />
            <span>Load into Resume Editor to Edit</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-cyan-200" />
          </button>
        </div>
      </div>

      {/* Mode Controls and Export Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
        {/* View mode toggle */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-900 rounded-lg border border-slate-800">
          <button
            onClick={() => setViewMode('preview')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
              viewMode === 'preview'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Document Preview</span>
          </button>
          <button
            onClick={() => setViewMode('edit')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
              viewMode === 'edit'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Quick In-Place Edit</span>
          </button>
          <button
            onClick={() => setViewMode('markdown')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
              viewMode === 'markdown'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Raw Markdown</span>
          </button>
        </div>

        {/* Secondary Export Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={copyMarkdown}
            className="px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-all flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Copied' : 'Copy Text'}</span>
          </button>

          <button
            onClick={() => downloadFile('md')}
            className="px-2.5 py-1.5 text-xs font-semibold text-indigo-300 hover:text-white bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-500/30 rounded-lg transition-all flex items-center gap-1"
            title="Download as Markdown"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.md</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-2.5 py-1.5 text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 rounded-lg transition-all flex items-center gap-1"
            title="Print or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>PDF</span>
          </button>
        </div>
      </div>

      {viewMode === 'preview' && (
        /* Formatted Document View */
        <div className="p-6 sm:p-10 rounded-xl bg-slate-950 border border-slate-800/90 shadow-2xl text-slate-200 space-y-7 print:bg-white print:text-black print:p-0 print:border-none print:shadow-none">
          {/* Header */}
          <div className="text-center pb-6 border-b border-slate-800 print:border-neutral-300">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight print:text-black">
              {polishedResume.candidate_name || 'Candidate Name'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 font-medium print:text-neutral-600">
              {polishedResume.contact_info}
            </p>
          </div>

          {/* Professional Summary */}
          {polishedResume.professional_summary && (
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-violet-400 font-mono print:text-neutral-800">
                Professional Summary
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed print:text-neutral-800">
                {polishedResume.professional_summary}
              </p>
            </div>
          )}

          {/* Skills Section */}
          {polishedResume.skills && polishedResume.skills.length > 0 && (
            <div className="space-y-3 pt-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono print:text-neutral-800">
                Technical Skills & Competencies
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {polishedResume.skills.map((cat, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 print:bg-neutral-50 print:border-neutral-200"
                  >
                    <span className="font-semibold text-slate-200 block mb-1 print:text-neutral-900">
                      {cat.category}:
                    </span>
                    <span className="text-slate-400 leading-relaxed print:text-neutral-700">
                      {cat.items.join(' · ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Work Experience */}
          {polishedResume.experience && polishedResume.experience.length > 0 && (
            <div className="space-y-5 pt-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono print:text-neutral-800">
                Work Experience (Google X-Y-Z Formatted)
              </h2>
              <div className="space-y-5">
                {polishedResume.experience.map((exp, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm">
                      <span className="font-bold text-white print:text-neutral-900">
                        {exp.role} — <span className="text-slate-300 print:text-neutral-700">{exp.company}</span>
                      </span>
                      <span className="text-xs font-mono text-slate-400 tabular-nums print:text-neutral-500">
                        {exp.period} {exp.location ? `· ${exp.location}` : ''}
                      </span>
                    </div>

                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-outside pl-4 print:text-neutral-800">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="leading-relaxed pl-1">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {polishedResume.education && polishedResume.education.length > 0 && (
            <div className="space-y-3 pt-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono print:text-neutral-800">
                Education
              </h2>
              <div className="space-y-2">
                {polishedResume.education.map((edu, eIdx) => (
                  <div
                    key={eIdx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm"
                  >
                    <div>
                      <span className="font-bold text-white print:text-neutral-900">{edu.degree}</span>
                      <span className="text-slate-400 print:text-neutral-600"> — {edu.school}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-400 print:text-neutral-500 tabular-nums">
                      {edu.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {viewMode === 'edit' && (
        /* In-place Editable Textarea with Instant Sync */
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Edit resume markdown directly below:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setCurrentMarkdown(polishedResume.full_markdown);
                  onTriggerToast('Reset changes to original polished version.', 'info');
                }}
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Edits</span>
              </button>
            </div>
          </div>

          <textarea
            value={currentMarkdown}
            onChange={(e) => setCurrentMarkdown(e.target.value)}
            className="w-full h-[450px] p-4 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm font-mono text-slate-100 leading-relaxed resize-none focus:outline-none focus:border-cyan-500"
            spellCheck="false"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-xs text-slate-400">
              {currentMarkdown.split(/\s+/).filter(Boolean).length} words · {currentMarkdown.length} characters
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onTriggerToast('In-place changes saved! Click below to push to editor.', 'success');
                  setViewMode('preview');
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700"
              >
                Save & Preview
              </button>

              <button
                onClick={handleSendToEditor}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 flex items-center gap-1.5 shadow-md shadow-violet-900/30"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>Apply & Load into Resume Editor Above</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'markdown' && (
        /* Raw Readonly Markdown View */
        <div className="space-y-3">
          <textarea
            readOnly
            value={currentMarkdown}
            className="w-full h-[450px] p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm font-mono text-slate-300 leading-relaxed resize-none focus:outline-none"
          />
          <div className="flex justify-end">
            <button
              onClick={handleSendToEditor}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 flex items-center gap-1.5 shadow-md shadow-violet-900/30"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Load into Resume Editor to Make Changes</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
