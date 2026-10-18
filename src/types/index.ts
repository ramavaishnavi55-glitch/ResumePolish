export interface RewrittenBullet {
  original: string;
  improved: string;
}

export interface AnalysisResult {
  match_score: number;
  missing_keywords: string[];
  strengths: string[];
  rewritten_bullets: RewrittenBullet[];
}

export interface FullPolishedResume {
  candidate_name: string;
  contact_info: string;
  professional_summary: string;
  skills: {
    category: string;
    items: string[];
  }[];
  experience: {
    company: string;
    role: string;
    period: string;
    location?: string;
    bullets: string[];
  }[];
  education: {
    degree: string;
    school: string;
    year: string;
    highlights?: string;
  }[];
  full_markdown: string;
}

export interface SampleProfile {
  id: string;
  title: string;
  role: string;
  companyTarget: string;
  badge: string;
  resume: string;
  jobDescription: string;
}

export interface ToastMessage {
  id: string;
  type: 'error' | 'success' | 'info';
  message: string;
}
