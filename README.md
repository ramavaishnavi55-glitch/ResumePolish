# ResumePolish

> **Turn Mid Bullets into Tier-1 Offers.**  
> An AI-powered resume optimization platform and ATS intelligence engine built with React, Tailwind CSS, Express, and Google Gemini 3.8 Flash.

---

## 1. Overview

**ResumePolish** is a full-stack web application designed to help job seekers bypass automated Applicant Tracking Systems (ATS) and capture human recruiters' attention. By leveraging Google's **Gemini 3.8 Flash** model and Laszlo Bock's renowned **Google X-Y-Z formula**, the app transforms passive, unquantified job descriptions into high-impact, metric-driven achievement statements.

---

## 2. Core Features (Sequential Workflow)

### Step 1: Resume Ingestion & Multimodal Parsing
- **Drag-and-Drop / File Upload**: Supports `.pdf`, `.docx`, `.txt`, `.md`, and `.rtf` files.
- **Multimodal Extraction**: Native PDF document parsing powered by Gemini server-side processing to extract clean, uncorrupted resume text.
- **1-Click Hackathon Demos**: Pre-configured sample profiles (Full-Stack Engineer, AI/LLM Applications Engineer, Design Technologist) for instant one-click testing.

### Step 2: Target Role & Job Description Matching
- **Custom JD Matching**: Paste any target job description to run deep semantic gap analysis.
- **Target Role Mode**: No JD on hand? Simply type your desired job title (e.g. *Senior Full-Stack Engineer*, *Staff DevOps*) to benchmark against Silicon Valley industry expectations.

### Step 3: Server-Side Gemini Intelligence Engine
- **Recruiter System Instruction**: Configured with strict technical recruiter and ATS specialist personas.
- **Structured JSON Schema**: Enforces consistent response structures:
  - `match_score` (0–100 integer)
  - `missing_keywords` (array of detected missing terms)
  - `strengths` (verified alignment points)
  - `rewritten_bullets` (paired original vs. improved statements)

### Step 4: Interactive Results Dashboard
- **Animated Circular Score Gauge**: Real-time countup with color-coded tier feedback (*Tier-1 Candidate Fit*, *Strong Contender*, *Needs Deep Polish*).
- **Interactive Keyword Chips**: 1-click single keyword copying and a bulk *"Copy All Missing Keywords"* action.
- **Side-by-Side Bullet Comparisons**: Clear visual contrast between weak task-oriented bullets and high-impact Google X-Y-Z statements with instant clipboard copy.
- **Quick Bullet Polisher & Formula Deconstructor**: Interactive sandbox to test individual bullet points on the fly.

### Step 5: Full Resume Overhaul & Document Generation
- **Executive Resume Generation**: Generates a complete, publication-ready resume with an overhauled summary, categorized skills, and fully rewritten work experience.
- **Multiple Export Formats**: 1-click Markdown copying, `.md` file download, `.txt` file download, and native print/PDF styling.

### Step 6: Roundtrip Editing & Iteration
- **Load into Resume Editor to Edit**: Transfers the generated polished resume straight back into the main input textarea.
- **Live In-Place Editor**: Edit any line directly within the dashboard and click **Save & Preview** or **Apply to Editor**.
- **Iterative Re-Analysis**: Re-evaluate your updated resume against the ATS engine until you reach a top-tier score.

---

## 3. The Google X-Y-Z Formula

The app benchmarks all resume accomplishments against Google's canonical formula:

$$\text{Accomplished } [X] \text{ as measured by } [Y], \text{ by doing } [Z]$$

- **[X] Accomplished Goal**: An authoritative action verb describing the business or technical outcome.
- **[Y] Quantified Metric**: Concrete numbers (e.g. `% improvement`, latency reduction, revenue impact, or user scale).
- **[Z] Method / Technology**: The exact architecture, tool, algorithm, or strategy executed.

---

## 4. Architecture & Tech Stack

| Layer | Technology | Details |
|---|---|---|
| **Frontend Framework** | React 19 + TypeScript | Modular, accessible SPA architecture |
| **Styling & Theme** | Tailwind CSS v4 | Dark mode (`#090b10`), glowing aura gradients, Plus Jakarta Sans & JetBrains Mono |
| **Animation & Icons** | Lucide React | Clean, functional micro-interactions |
| **Backend Server** | Node.js + Express (via `tsx`) | Server-side Gemini API execution and proxy |
| **AI Model & SDK** | Google GenAI SDK (`@google/genai`) | `gemini-3.8-flash` with structured JSON schema output |
| **Build & Bundler** | Vite 8 + TSX | Fast dev server and optimized production build |

---

## 5. API Endpoints

### `POST /api/analyze`
Performs complete ATS keyword matching, scoring, and bullet point rewriting.
- **Body**: `{ resumeText: string, jobDescription?: string, targetRole?: string }`
- **Response**: `{ match_score: number, missing_keywords: string[], strengths: string[], rewritten_bullets: Array<{ original: string, improved: string }> }`

### `POST /api/full-polish`
Generates an entire structured executive resume document.
- **Body**: `{ resumeText: string, jobDescription?: string, targetRole?: string }`
- **Response**: `{ candidate_name, contact_info, professional_summary, skills, experience, education, full_markdown }`

### `POST /api/extract-resume-file`
Parses PDF or text resume files into structured text using Gemini multimodal input.
- **Body**: `{ fileBase64: string, mimeType: string, fileName: string }`
- **Response**: `{ extractedText: string, fileName: string }`

### `POST /api/polish-bullet`
Single-bullet point sandbox that returns an improved bullet and its $[X], [Y], [Z]$ decomposition.
- **Body**: `{ bullet: string, targetRole?: string }`
- **Response**: `{ improved: string, breakdown: { accomplished_x, measured_by_y, by_doing_z } }`

---

## 6. Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Valid `GEMINI_API_KEY` (configured in your environment)

### Installation
```bash
npm install
```

### Environment Setup
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY="your-gemini-api-key-here"
PORT=3000
```

### Running the Development Server
```bash
npm run dev
```
The server will start at `http://localhost:3000`.

### Production Build
```bash
npm run build
npm start
```

---

## 7. Accessibility & UX Guidelines
- **WCAG AA Compliance**: High-contrast text on dark backgrounds (`#090b10`).
- **Keyboard Navigation**: Full tab index coverage, visible focus rings, and `Cmd/Ctrl + Enter` shortcuts.
- **Screen Reader Support**: Standard semantic headings, ARIA live regions for toasts (`role="status"`, `aria-live="polite"`), and clear button labels.
