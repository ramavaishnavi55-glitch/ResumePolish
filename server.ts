import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '25mb' }));

// Shared Gemini Client instance for server-side execution
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.warn('⚠️ Warning: GEMINI_API_KEY environment variable is not defined.');
}

const ai = new GoogleGenAI({
  apiKey: apiKey || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

interface AnalyzeRequestBody {
  resumeText?: string;
  jobDescription?: string;
  targetRole?: string;
}

// 1. Core ATS Analysis Endpoint
app.post('/api/analyze', async (req: Request<{}, {}, AnalyzeRequestBody>, res: Response) => {
  try {
    const { resumeText, jobDescription, targetRole } = req.body;

    if (!resumeText || !resumeText.trim()) {
      return res.status(400).json({ error: 'Hold up bestie, drop your resume in first!' });
    }

    const trimmedResume = resumeText.trim();
    const effectiveJD = (jobDescription && jobDescription.trim())
      ? jobDescription.trim()
      : (targetRole && targetRole.trim())
      ? `Role: ${targetRole.trim()}\nGeneral industry standards and high-impact requirements for a top-tier ${targetRole.trim()}.`
      : '';

    if (!effectiveJD) {
      return res.status(400).json({ error: 'Job description or target role is missing. Drop one so we can match!' });
    }

    const systemInstruction = `You are an elite Silicon Valley technical recruiter and ATS (Applicant Tracking System) specialist.
Analyze the candidate's resume against the target job description or role standards with rigorous scrutiny and high standards.

Assess:
1. match_score: An objective 0-100 integer indicating ATS compatibility, skill alignment, and domain relevance.
2. missing_keywords: 5-12 critical tools, technologies, methodologies, or credentials present in the job description or expected for this role that are missing or under-emphasized in the resume.
3. strengths: 3-6 verified strengths and qualifications from the resume that directly align with the target role.
4. rewritten_bullets: Extract 3-6 weak, vague, or passive bullet points from the resume. Rewrite each using Google's canonical X-Y-Z formula: "Accomplished [X] as measured by [Y], by doing [Z]".
   - The rewritten bullets must be punchy, quantifiable, begin with power action verbs, and integrate relevant keywords.
   - Return objects with exact "original" and high-impact "improved" strings.`;

    const contents = `=== CANDIDATE RESUME ===\n${trimmedResume}\n\n=== TARGET JOB DESCRIPTION / ROLE ===\n${effectiveJD}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.2,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            match_score: {
              type: Type.INTEGER,
              description: 'ATS match score from 0 to 100 based on keyword overlap, experience relevance, and seniority fit.',
            },
            missing_keywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Critical keywords or competencies from the JD missing in the candidate resume.',
            },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Strongest matching points and proven qualifications from the candidate resume.',
            },
            rewritten_bullets: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  original: {
                    type: Type.STRING,
                    description: 'Original weak or generic bullet point identified from the resume.',
                  },
                  improved: {
                    type: Type.STRING,
                    description: 'Optimized high-impact version using Google X-Y-Z formula: Accomplished [X] as measured by [Y], by doing [Z].',
                  },
                },
                required: ['original', 'improved'],
              },
              description: 'List of transformed bullet points comparing original vs Google X-Y-Z formula.',
            },
          },
          required: ['match_score', 'missing_keywords', 'strengths', 'rewritten_bullets'],
        },
      },
    });

    const rawText = response.text?.trim() || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(rawText);
    } catch (parseErr) {
      console.error('Failed to parse Gemini JSON output:', rawText);
      return res.status(502).json({ error: 'AI engine generated an unparseable response. Please retry.' });
    }

    const match_score = typeof parsedData.match_score === 'number'
      ? Math.max(0, Math.min(100, Math.round(parsedData.match_score)))
      : 50;

    const result = {
      match_score,
      missing_keywords: Array.isArray(parsedData.missing_keywords) ? parsedData.missing_keywords : [],
      strengths: Array.isArray(parsedData.strengths) ? parsedData.strengths : [],
      rewritten_bullets: Array.isArray(parsedData.rewritten_bullets) ? parsedData.rewritten_bullets : [],
    };

    return res.json(result);
  } catch (error: any) {
    console.error('Gemini API analysis error:', error);
    const message = error?.message || 'Error occurred during AI resume analysis';
    return res.status(500).json({ error: message });
  }
});

// 2. Resume File Parser & Extractor (supports PDF and text documents)
app.post('/api/extract-resume-file', async (req: Request, res: Response) => {
  try {
    const { fileBase64, mimeType, fileName } = req.body;

    if (!fileBase64) {
      return res.status(400).json({ error: 'No file content received. Please select a valid file.' });
    }

    let contentsPayload: any;

    if (mimeType === 'application/pdf') {
      contentsPayload = {
        parts: [
          {
            inlineData: {
              mimeType: 'application/pdf',
              data: fileBase64,
            },
          },
          {
            text: `Extract the complete, pristine text from this resume document (${fileName || 'resume.pdf'}).
Format cleanly into standard resume sections:
- Contact Information
- Professional Summary
- Technical Skills
- Work Experience (preserve all roles, company names, dates, and bullet points)
- Education
- Certifications / Projects (if any)

Do NOT invent details. Extract the text faithfully so it can be analyzed.`,
          },
        ],
      };
    } else {
      // Decode plain text / markdown / other text formats
      const decodedText = Buffer.from(fileBase64, 'base64').toString('utf-8');
      contentsPayload = `Format and clean this resume text so it has clear section headers and readable formatting:\n\n${decodedText}`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contentsPayload,
      config: {
        systemInstruction: 'You are an accurate document parser. Extract resume text cleanly, preserving original names, dates, companies, and bullet points.',
        temperature: 0.1,
      },
    });

    const extractedText = response.text?.trim() || '';

    if (!extractedText) {
      return res.status(422).json({ error: 'Could not extract text from the file. Try copy-pasting the text directly.' });
    }

    return res.json({
      extractedText,
      fileName,
    });
  } catch (err: any) {
    console.error('Resume extraction error:', err);
    return res.status(500).json({ error: err.message || 'Failed to extract text from resume file.' });
  }
});

// 3. Full Resume Polish Endpoint (transforms the entire resume into an executive document)
app.post('/api/full-polish', async (req: Request, res: Response) => {
  try {
    const { resumeText, jobDescription, targetRole } = req.body;

    if (!resumeText || !resumeText.trim()) {
      return res.status(400).json({ error: 'Hold up bestie, drop your resume in first!' });
    }

    const trimmedResume = resumeText.trim();
    const roleContext = (jobDescription && jobDescription.trim())
      ? `TARGET JOB DESCRIPTION:\n${jobDescription.trim()}`
      : `TARGET ROLE / INDUSTRY FOCUS:\n${targetRole || 'Senior Software Engineer / Tech Leader'}`;

    const systemInstruction = `You are an elite career strategist and former Google Staff Technical Recruiter.
Take the candidate's existing resume and overhaul the ENTIRE document into a world-class, ATS-crushing, high-impact resume.

Rules:
1. candidate_name: Extract or preserve their real name from the resume.
2. contact_info: Clean single-line contact string (email | phone | location | LinkedIn/GitHub).
3. professional_summary: 2-3 sentence power summary synthesizing their years of experience, core technical mastery, and highest-scale achievement, tailored directly to the target role.
4. skills: Group skills into logical categories (e.g. "Languages & Runtimes", "Frontend & UI", "Backend & Distributed Systems", "Cloud & DevOps", "Tools & Methodologies"). Integrate missing high-value keywords naturally.
5. experience: For each company and role, upgrade EVERY SINGLE bullet point using Google's X-Y-Z formula: "Accomplished [X] as measured by [Y], by doing [Z]". Make every line quantifiable, punchy, and starting with strong action verbs.
6. education: Format degrees, universities, and graduation years cleanly.
7. full_markdown: Generate the complete, impeccably formatted Markdown representation of the entire polished resume, ready for immediate copying, printing, or export.`;

    const contents = `=== CURRENT RESUME ===\n${trimmedResume}\n\n=== ${roleContext} ===`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.2,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            candidate_name: { type: Type.STRING },
            contact_info: { type: Type.STRING },
            professional_summary: { type: Type.STRING },
            skills: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  items: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ['category', 'items'],
              },
            },
            experience: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  company: { type: Type.STRING },
                  role: { type: Type.STRING },
                  period: { type: Type.STRING },
                  location: { type: Type.STRING },
                  bullets: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ['company', 'role', 'period', 'bullets'],
              },
            },
            education: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  degree: { type: Type.STRING },
                  school: { type: Type.STRING },
                  year: { type: Type.STRING },
                  highlights: { type: Type.STRING },
                },
                required: ['degree', 'school', 'year'],
              },
            },
            full_markdown: { type: Type.STRING },
          },
          required: [
            'candidate_name',
            'contact_info',
            'professional_summary',
            'skills',
            'experience',
            'education',
            'full_markdown',
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text?.trim() || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('Full polish error:', err);
    return res.status(500).json({ error: err.message || 'Failed to generate full polished resume.' });
  }
});

// 4. Single bullet polish endpoint for custom user experimentation
app.post('/api/polish-bullet', async (req: Request, res: Response) => {
  try {
    const { bullet, targetRole } = req.body;
    if (!bullet || !bullet.trim()) {
      return res.status(400).json({ error: 'Please enter a bullet point to polish.' });
    }

    const systemInstruction = `You are a career coach and Google recruiter. Rewrite the user's resume bullet point using Google's X-Y-Z achievement formula: "Accomplished [X] as measured by [Y], by doing [Z]".
Return a JSON object with:
- "improved": the rewritten bullet point
- "breakdown": { "accomplished_x": string, "measured_by_y": string, "by_doing_z": string }`;

    const contents = `Target Role: ${targetRole || 'Software / Tech Role'}\nBullet: ${bullet.trim()}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.2,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            improved: { type: Type.STRING },
            breakdown: {
              type: Type.OBJECT,
              properties: {
                accomplished_x: { type: Type.STRING },
                measured_by_y: { type: Type.STRING },
                by_doing_z: { type: Type.STRING },
              },
              required: ['accomplished_x', 'measured_by_y', 'by_doing_z'],
            },
          },
          required: ['improved', 'breakdown'],
        },
      },
    });

    const parsed = JSON.parse(response.text?.trim() || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('Polish bullet error:', err);
    return res.status(500).json({ error: err.message || 'Failed to polish bullet point.' });
  }
});

// Integrate Vite dev server or serve production build
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 ResumePolish server active at http://0.0.0.0:${PORT}`);
  });
}

startServer();
