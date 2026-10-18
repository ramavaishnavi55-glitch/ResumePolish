import React, { useState } from 'react';
import { FileText, Target, Trash2, Sparkles, Wand2, Upload, CheckCircle2, Edit3 } from 'lucide-react';
import { FileUploadZone } from './FileUploadZone';

interface ResumeEditorProps {
  resumeText: string;
  setResumeText: (text: string) => void;
  jobDescription: string;
  setJobDescription: (text: string) => void;
  targetRole: string;
  setTargetRole: (role: string) => void;
  onAnalyze: () => void;
  onFullPolish: () => void;
  loading: boolean;
  fullPolishLoading: boolean;
  loadingStatus: string;
  onTriggerToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
  isEditedFromPolished?: boolean;
}

export const ResumeEditor: React.FC<ResumeEditorProps> = ({
  resumeText,
  setResumeText,
  jobDescription,
  setJobDescription,
  targetRole,
  setTargetRole,
  onAnalyze,
  onFullPolish,
  loading,
  fullPolishLoading,
  loadingStatus,
  onTriggerToast,
  isEditedFromPolished,
}) => {
  const [jdMode, setJdMode] = useState<'jobDescription' | 'targetRole'>('jobDescription');

  const getWordCount = (text: string) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  const resumeWords = getWordCount(resumeText);
  const jdWords = getWordCount(jobDescription);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      onAnalyze();
    }
  };

  const handleFileExtracted = (extractedText: string, fileName: string) => {
    setResumeText(extractedText);
  };

  return (
    <div id="editor" className="space-y-6" onKeyDown={handleKeyDown}>
      {/* File Upload Banner */}
      <FileUploadZone
        onFileExtracted={handleFileExtracted}
        onTriggerToast={onTriggerToast}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resume Text Input Card */}
        <div
          className={`relative rounded-2xl border bg-[#0d121f] p-5 lg:p-6 flex flex-col transition-all shadow-xl shadow-black/40 ${
            isEditedFromPolished
              ? 'border-emerald-500/70 ring-1 ring-emerald-500/30'
              : 'border-slate-800 focus-within:border-violet-500/70 focus-within:ring-1 focus-within:ring-violet-500/30'
          }`}
        >
          {/* Polished Loaded Notice Banner */}
          {isEditedFromPolished && (
            <div className="mb-3 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Polished resume loaded into input! You can make direct changes and re-analyze.</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                Editable
              </span>
            </div>
          )}

          <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-violet-500/10 text-violet-400">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <label htmlFor="resume-textarea" className="text-sm font-bold text-white block cursor-pointer">
                  Candidate Resume (Editable Text)
                </label>
                <span className="text-[11px] text-slate-400">
                  Type, paste, or edit polished bullets directly here
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono tabular-nums px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                {resumeWords} words
              </span>
              {resumeText && (
                <button
                  type="button"
                  onClick={() => setResumeText('')}
                  className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                  aria-label="Clear resume text"
                  title="Clear resume"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="relative flex-1">
            <textarea
              id="resume-textarea"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste or upload your resume here...
e.g.
Alex Rivera — Senior Software Engineer
• Responsible for payment gateway integration and handling customer transactions.
• Built frontend dashboard features in React.
• Improved database performance."
              className="w-full h-80 lg:h-96 bg-transparent text-slate-100 placeholder-slate-500 text-xs sm:text-sm font-mono leading-relaxed p-1 resize-none focus:outline-none focus:ring-0"
              spellCheck="false"
              aria-label="Resume text input"
              aria-required="true"
            />
          </div>

          <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <Edit3 className="w-3 h-3 text-slate-500" />
              Directly editable anytime
            </span>
            <span className="font-mono tabular-nums">{resumeText.length} chars</span>
          </div>
        </div>

        {/* Job Description / Target Role Input Card */}
        <div className="relative rounded-2xl border border-slate-800 bg-[#0d121f] p-5 lg:p-6 flex flex-col focus-within:border-cyan-500/70 focus-within:ring-1 focus-within:ring-cyan-500/30 transition-all shadow-xl shadow-black/40">
          <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <label htmlFor="jd-textarea" className="text-sm font-bold text-white block cursor-pointer">
                  Target Job or Role
                </label>
                <div className="flex items-center gap-2 mt-0.5">
                  <button
                    type="button"
                    onClick={() => setJdMode('jobDescription')}
                    className={`text-[11px] font-medium transition-colors ${
                      jdMode === 'jobDescription' ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Paste JD
                  </button>
                  <span className="text-slate-600">·</span>
                  <button
                    type="button"
                    onClick={() => setJdMode('targetRole')}
                    className={`text-[11px] font-medium transition-colors ${
                      jdMode === 'targetRole' ? 'text-cyan-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Quick Role Target
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {jdMode === 'jobDescription' && (
                <span className="text-xs text-slate-400 font-mono tabular-nums px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                  {jdWords} words
                </span>
              )}
              {jobDescription && jdMode === 'jobDescription' && (
                <button
                  type="button"
                  onClick={() => setJobDescription('')}
                  className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
                  aria-label="Clear job description"
                  title="Clear job description"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="relative flex-1">
            {jdMode === 'jobDescription' ? (
              <textarea
                id="jd-textarea"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the target job description here...
Role: Senior Software Engineer
Requirements:
• 4+ years of TypeScript, React, and Node.js
• Deep expertise with PostgreSQL query optimization and Redis caching
• Experience scaling microservices on AWS / Kubernetes"
                className="w-full h-80 lg:h-96 bg-transparent text-slate-100 placeholder-slate-500 text-xs sm:text-sm font-mono leading-relaxed p-1 resize-none focus:outline-none focus:ring-0"
                spellCheck="false"
                aria-label="Job description input"
              />
            ) : (
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Target Job Title / Specialization
                  </label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. Senior Full-Stack Engineer, Staff DevOps, AI Research Engineer..."
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-300 leading-relaxed">
                  <p className="font-semibold mb-1">No specific JD on hand?</p>
                  <p className="text-slate-400">
                    Entering your target role allows Gemini to benchmark your resume against top Silicon Valley industry standards, extracting common keywords and upgrading all bullets to Google X-Y-Z statements.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
            <span>ATS target source</span>
            <span className="font-mono tabular-nums">
              {jdMode === 'jobDescription' ? `${jobDescription.length} chars` : 'Role mode active'}
            </span>
          </div>
        </div>
      </div>

      {/* Primary Action Button Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-violet-950/20 via-slate-900 to-cyan-950/20 border border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Sparkles className="w-4 h-4 text-violet-400 shrink-0" />
          <span>
            Powered by Gemini 3.8 Flash · ATS keyword match & Google X-Y-Z engine
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
          {/* Analyze ATS Match */}
          <button
            type="button"
            onClick={onAnalyze}
            disabled={loading || fullPolishLoading}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-600/30 disabled:opacity-60 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            {loading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>{loadingStatus || 'Analyzing...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>{isEditedFromPolished ? 'Re-Analyze ATS Match' : 'Analyze ATS Match'}</span>
              </>
            )}
          </button>

          {/* Full Polish Master Button */}
          <button
            type="button"
            onClick={onFullPolish}
            disabled={loading || fullPolishLoading}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 transition-all shadow-lg shadow-cyan-600/30 disabled:opacity-60 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            {fullPolishLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Overhauling Resume...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 text-emerald-200" />
                <span>{isEditedFromPolished ? 'Re-Generate Full Resume' : 'Generate Full Polished Resume'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
