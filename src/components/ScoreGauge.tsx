import React, { useEffect, useState } from 'react';
import { Target, CheckCircle2, ShieldAlert, Award } from 'lucide-react';

interface ScoreGaugeProps {
  score: number;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = score / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  // Color scheme determination
  const getScoreTheme = (val: number) => {
    if (val >= 85) {
      return {
        label: 'Tier-1 Candidate Fit',
        description: 'Exceptional ATS alignment. High probability of landing recruiter screens.',
        stroke: '#10b981', // emerald-500
        bgGlow: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
        badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        icon: <Award className="w-5 h-5 text-emerald-400" />,
      };
    }
    if (val >= 70) {
      return {
        label: 'Strong Contender',
        description: 'Solid profile match. A few keyword insertions will push you to the top quartile.',
        stroke: '#06b6d4', // cyan-500
        bgGlow: 'from-cyan-500/20 via-cyan-500/5 to-transparent',
        badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
        icon: <Target className="w-5 h-5 text-cyan-400" />,
      };
    }
    if (val >= 50) {
      return {
        label: 'Moderate Alignment',
        description: 'Relevant baseline skills, but key ATS requirements and impact metrics are missing.',
        stroke: '#f59e0b', // amber-500
        bgGlow: 'from-amber-500/20 via-amber-500/5 to-transparent',
        badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        icon: <ShieldAlert className="w-5 h-5 text-amber-400" />,
      };
    }
    return {
      label: 'Needs Deep Polish',
      description: 'Significant keyword mismatch. Overhaul weak bullets with Google X-Y-Z formula below.',
      stroke: '#f43f5e', // rose-500
      bgGlow: 'from-rose-500/20 via-rose-500/5 to-transparent',
      badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      icon: <ShieldAlert className="w-5 h-5 text-rose-400" />,
    };
  };

  const theme = getScoreTheme(score);
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0d121f] p-6 lg:p-8">
      {/* Background radial glow */}
      <div
        className={`pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-gradient-to-br ${theme.bgGlow} blur-3xl opacity-60`}
      />

      <div className="flex flex-col sm:flex-row items-center gap-6 lg:gap-10">
        {/* Circular SVG Gauge */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="w-36 h-36 -rotate-90 transform" viewBox="0 0 160 160">
            {/* Background track */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#1e293b"
              strokeWidth="12"
              fill="transparent"
            />
            {/* Animated progress arc */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke={theme.stroke}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-700 ease-out"
            />
          </svg>

          {/* Centered Score */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-extrabold tracking-tight text-white font-mono tabular-nums">
              {animatedScore}
            </span>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              / 100
            </span>
          </div>
        </div>

        {/* Textual Details */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mb-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${theme.badgeBg}`}
            >
              {theme.icon}
              {theme.label}
            </span>
            <span className="text-xs text-slate-400 font-medium">ATS Match Score</span>
          </div>

          <h3 className="text-xl font-bold text-white mb-1.5">
            {animatedScore >= 80
              ? 'Ready for submission'
              : animatedScore >= 65
              ? 'Targeted keyword additions will boost pass-rate'
              : 'Substantial ATS gap detected'}
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
            {theme.description}
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap gap-4 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Applicant Tracking System Validated</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span>Google X-Y-Z Benchmarking Applied</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
