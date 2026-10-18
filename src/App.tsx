import React, { useState, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SamplePicker } from './components/SamplePicker';
import { ResumeEditor } from './components/ResumeEditor';
import { ScoreGauge } from './components/ScoreGauge';
import { MissingKeywords } from './components/MissingKeywords';
import { BulletComparison } from './components/BulletComparison';
import { QuickBulletTester } from './components/QuickBulletTester';
import { FullResumeView } from './components/FullResumeView';
import { XYZExplainer } from './components/XYZExplainer';
import { Toast } from './components/Toast';
import { AnalysisResult, FullPolishedResume, SampleProfile, ToastMessage } from './types';
import { SAMPLE_PROFILES } from './data/samples';
import { Sparkles, FileText, BarChart3, Wand2 } from 'lucide-react';

export default function App() {
  const defaultSample = SAMPLE_PROFILES[0];
  const [resumeText, setResumeText] = useState(defaultSample.resume);
  const [jobDescription, setJobDescription] = useState(defaultSample.jobDescription);
  const [targetRole, setTargetRole] = useState(defaultSample.role);
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(defaultSample.id);
  const [isEditedFromPolished, setIsEditedFromPolished] = useState(false);

  // Analysis State
  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  // Full Resume Polish State
  const [fullPolishLoading, setFullPolishLoading] = useState(false);
  const [fullPolishedResume, setFullPolishedResume] = useState<FullPolishedResume | null>(null);

  // Active Dashboard Tab
  const [activeDashboardTab, setActiveDashboardTab] = useState<'analytics' | 'fullResume'>('analytics');

  const [toast, setToast] = useState<ToastMessage | null>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  const triggerToast = (message: string, type: 'error' | 'success' | 'info' = 'info') => {
    setToast({
      id: Math.random().toString(36).substring(7),
      type,
      message,
    });
  };

  const handleSelectSample = (sample: SampleProfile) => {
    setSelectedSampleId(sample.id);
    setResumeText(sample.resume);
    setJobDescription(sample.jobDescription);
    setTargetRole(sample.role);
    setIsEditedFromPolished(false);
    triggerToast(`Loaded demo: ${sample.title} (${sample.companyTarget})`, 'info');
  };

  const handleReset = () => {
    setResumeText('');
    setJobDescription('');
    setTargetRole('');
    setSelectedSampleId(null);
    setResult(null);
    setFullPolishedResume(null);
    setIsEditedFromPolished(false);
    triggerToast('Inputs and results reset.', 'info');
  };

  const scrollToDashboard = () => {
    if (dashboardRef.current) {
      dashboardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Transfer displayed polished resume or bullets into the "Upload / Candidate Resume" input to make custom edits
  const handleApplyToResumeInput = (text: string) => {
    setResumeText(text);
    setIsEditedFromPolished(true);
    setSelectedSampleId(null);
    triggerToast('Polished resume loaded into editor! You can now make manual changes or re-analyze ✍️', 'success');

    // Smooth scroll to the editor area
    setTimeout(() => {
      const editorElement = document.getElementById('editor');
      if (editorElement) {
        editorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // 1. ATS & Bullet Analysis
  const handleAnalyze = async () => {
    if (!resumeText || !resumeText.trim()) {
      triggerToast('Hold up bestie, drop your resume in first!', 'error');
      return;
    }

    if (!jobDescription.trim() && !targetRole.trim()) {
      triggerToast('Provide either a Job Description or a Target Role to benchmark against!', 'error');
      return;
    }

    if (resumeText.trim().length < 40) {
      triggerToast('Your resume looks too short! Drop in a full job role or bullet points.', 'error');
      return;
    }

    setLoading(true);
    setLoadingStatus('Parsing ATS keywords...');

    const timers = [
      setTimeout(() => setLoadingStatus('Deconstructing weak bullet points...'), 1200),
      setTimeout(() => setLoadingStatus('Applying Google X-Y-Z formula...'), 2400),
      setTimeout(() => setLoadingStatus('Calculating recruiter match score...'), 3600),
    ];

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText: resumeText.trim(),
          jobDescription: jobDescription.trim(),
          targetRole: targetRole.trim(),
        }),
      });

      timers.forEach(clearTimeout);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to analyze resume with Gemini');
      }

      const data: AnalysisResult = await response.json();
      setResult(data);
      setActiveDashboardTab('analytics');
      triggerToast('Analysis complete! Check out your score and polished bullets. 🚀', 'success');

      setTimeout(() => {
        dashboardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } catch (err: any) {
      timers.forEach(clearTimeout);
      console.error('Error analyzing resume:', err);
      triggerToast(err.message || 'Something went wrong while analyzing. Please try again.', 'error');
    } finally {
      setLoading(false);
      setLoadingStatus('');
    }
  };

  // 2. Full Resume Restructure & Polish
  const handleFullPolish = async () => {
    if (!resumeText || !resumeText.trim()) {
      triggerToast('Hold up bestie, drop your resume in first!', 'error');
      return;
    }

    if (resumeText.trim().length < 40) {
      triggerToast('Provide a more complete resume text to generate a full document!', 'error');
      return;
    }

    setFullPolishLoading(true);

    try {
      const response = await fetch('/api/full-polish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText: resumeText.trim(),
          jobDescription: jobDescription.trim(),
          targetRole: targetRole.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate full polished resume.');
      }

      const data: FullPolishedResume = await response.json();
      setFullPolishedResume(data);
      setActiveDashboardTab('fullResume');
      triggerToast('Full resume overhauled with Google X-Y-Z achievements! 📄✨', 'success');

      setTimeout(() => {
        dashboardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } catch (err: any) {
      console.error('Full polish error:', err);
      triggerToast(err.message || 'Error occurred while polishing full resume.', 'error');
    } finally {
      setFullPolishLoading(false);
    }
  };

  const hasAnyResults = result !== null || fullPolishedResume !== null;

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col font-sans">
      <Navbar
        onReset={handleReset}
        onScrollToDashboard={scrollToDashboard}
        hasResults={hasAnyResults}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Hero Section */}
        <HeroSection />

        {/* 1-Click Sample Demos */}
        <SamplePicker
          onSelectSample={handleSelectSample}
          selectedId={selectedSampleId}
        />

        {/* Text & File Input Editor */}
        <ResumeEditor
          resumeText={resumeText}
          setResumeText={(text) => {
            setResumeText(text);
            setSelectedSampleId(null);
          }}
          jobDescription={jobDescription}
          setJobDescription={(text) => {
            setJobDescription(text);
            setSelectedSampleId(null);
          }}
          targetRole={targetRole}
          setTargetRole={setTargetRole}
          onAnalyze={handleAnalyze}
          onFullPolish={handleFullPolish}
          loading={loading}
          fullPolishLoading={fullPolishLoading}
          loadingStatus={loadingStatus}
          onTriggerToast={triggerToast}
          isEditedFromPolished={isEditedFromPolished}
        />

        {/* Interactive Results Dashboard */}
        <div ref={dashboardRef} id="dashboard" className="scroll-mt-20">
          {(loading || fullPolishLoading) && (
            <div className="rounded-2xl border border-violet-500/30 bg-[#0d121f] p-8 text-center space-y-4 animate-pulse">
              <div className="w-12 h-12 rounded-full border-4 border-violet-500/30 border-t-violet-400 animate-spin mx-auto" />
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white">
                  Gemini AI Processing Engine Active
                </h3>
                <p className="text-sm text-violet-300 font-mono">
                  {fullPolishLoading
                    ? 'Synthesizing professional summary, integrating ATS keywords & rewriting all bullets...'
                    : loadingStatus || 'Analyzing resume structure and ATS alignment...'}
                </p>
              </div>
            </div>
          )}

          {hasAnyResults && !loading && !fullPolishLoading && (
            <section aria-label="Analysis Results Dashboard" className="space-y-6 animate-in fade-in duration-300">
              {/* Dashboard Nav Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <h2 className="text-xl font-bold text-white">
                    Resume Intelligence Suite
                  </h2>
                </div>

                <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 self-start sm:self-auto">
                  <button
                    onClick={() => setActiveDashboardTab('analytics')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                      activeDashboardTab === 'analytics'
                        ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>ATS Analytics & Bullets</span>
                    {result && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-violet-950 text-violet-200 font-mono">
                        {result.match_score}%
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      if (!fullPolishedResume) {
                        handleFullPolish();
                      } else {
                        setActiveDashboardTab('fullResume');
                      }
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                      activeDashboardTab === 'fullResume'
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>Full Polished Resume</span>
                    {fullPolishedResume && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-200 font-mono">
                        Ready
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {activeDashboardTab === 'analytics' && result && (
                <div className="space-y-8">
                  {/* Score Display Card */}
                  <ScoreGauge score={result.match_score} />

                  {/* Missing Keywords & Strengths */}
                  <MissingKeywords
                    keywords={result.missing_keywords}
                    strengths={result.strengths}
                    onTriggerToast={triggerToast}
                  />

                  {/* Side-by-Side X-Y-Z Bullet Point Comparisons */}
                  <BulletComparison
                    bullets={result.rewritten_bullets}
                    onTriggerToast={triggerToast}
                    onApplyBulletsToResumeInput={handleApplyToResumeInput}
                  />

                  {/* Single Bullet Polish Sandbox */}
                  <QuickBulletTester onTriggerToast={triggerToast} />
                </div>
              )}

              {activeDashboardTab === 'fullResume' && fullPolishedResume && (
                <FullResumeView
                  polishedResume={fullPolishedResume}
                  onTriggerToast={triggerToast}
                  onApplyToResumeInput={handleApplyToResumeInput}
                />
              )}
            </section>
          )}
        </div>

        {/* Google X-Y-Z Explainer */}
        <XYZExplainer />
      </main>

      {/* Modern, Clean Footer */}
      <footer className="border-t border-slate-800/80 bg-[#08090d] py-8 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">ResumePolish</span>
            <span>— AI Resume & ATS Engine</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Powered by Gemini 3.8 Flash</span>
            <span aria-hidden="true">·</span>
            <span>Google X-Y-Z Formula</span>
            <span aria-hidden="true">·</span>
            <span>Hackathon Edition</span>
          </div>
        </div>
      </footer>

      {/* Accessible Toast Notification System */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
