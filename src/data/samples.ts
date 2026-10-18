import { SampleProfile } from '../types';

export const SAMPLE_PROFILES: SampleProfile[] = [
  {
    id: 'swe-fullstack',
    title: 'Full-Stack Engineer',
    role: 'Senior Software Engineer',
    companyTarget: 'Scale AI / Stripe',
    badge: 'Popular',
    resume: `Alex Rivera
Senior Software Engineer | alex.rivera@example.com | github.com/alexrivera

SUMMARY
Software engineer with 4 years of experience building web applications, backend APIs, and microservices using TypeScript, Node.js, React, and PostgreSQL.

WORK EXPERIENCE
FinTech Horizon — Software Engineer (2022 - Present)
• Responsible for working on payment gateway integration and handling customer transactions.
• Helped speed up database queries by adding indexes and rewriting slow queries.
• Built new frontend dashboard features in React for merchant analytics.
• Participated in weekly agile meetings and reviewed pull requests from team members.
• Set up basic CI/CD pipeline using GitHub Actions to deploy code to AWS ECS.

NovaTech Labs — Junior Full-Stack Developer (2020 - 2022)
• Fixed bugs in existing React application and created reusable components.
• Maintained REST APIs in Express and connected them to MongoDB database.
• Worked with team to migrate legacy codebase to TypeScript.

TECHNICAL SKILLS
Languages: JavaScript, TypeScript, Python, SQL
Frontend: React, HTML5, CSS3, Tailwind CSS, Redux
Backend: Node.js, Express, PostgreSQL, MongoDB, Redis
Cloud & Tools: Docker, AWS (S3, EC2, ECS), Git, GitHub Actions, Jest`,
    jobDescription: `Role: Senior Full-Stack Software Engineer
Company: CloudScale Systems

About the Role:
We are seeking a Senior Full-Stack Engineer to scale our core financial infrastructure handling over $2B in annualized payments. You will design, build, and optimize distributed microservices and low-latency APIs while collaborating closely with product designers to ship intuitive web interfaces.

Key Responsibilities:
• Architect resilient, fault-tolerant distributed systems and microservices with high throughput and sub-50ms p99 latency.
• Lead end-to-end development of customer-facing dashboards utilizing modern React, TypeScript, and state-of-the-art state management.
• Partner with infrastructure teams on Kubernetes orchestration, Terraform IaC, and observability (Datadog/Prometheus).
• Mentor junior and mid-level engineers, drive code review excellence, and champion engineering best practices.

Requirements:
• 4+ years of professional full-stack development experience.
• Strong expertise in TypeScript, Node.js, and modern React.
• Deep proficiency with relational databases (PostgreSQL), query optimization, connection pooling, and caching strategies (Redis).
• Hands-on experience with Kafka or RabbitMQ event-driven architectures.
• Solid background in cloud platforms (AWS/GCP), Docker containers, Kubernetes, and automated CI/CD pipelines.
• Proven track record of improving system reliability and performance at scale.`,
  },
  {
    id: 'ai-ml-eng',
    title: 'AI / LLM Engineer',
    role: 'AI Applications Engineer',
    companyTarget: 'Perplexity / Anthropic',
    badge: 'GenAI',
    resume: `Maya Chen
Machine Learning Engineer | maya.chen@example.com | San Francisco, CA

SUMMARY
ML Engineer with experience implementing generative AI models, embeddings, RAG pipelines, and Python backends.

EXPERIENCE
NeuroSynth AI — AI Engineer (2023 - Present)
• Worked on LLM pipelines using LangChain and OpenAI models for enterprise search.
• Stored document embeddings in Pinecone vector database.
• Tested model prompts to make answers more accurate for users.
• Created FastAPI endpoints to serve model responses to our frontend app.

DataFlow Inc — Data Scientist (2021 - 2023)
• Built predictive models using scikit-learn and XGBoost for churn prediction.
• Cleaned and preprocessed large tabular datasets using Pandas and NumPy.
• Created reports and dashboards in Metabase to share insights with stakeholders.

SKILLS
Python, PyTorch, FastAPI, LangChain, OpenAI API, Hugging Face, Vector Databases (Pinecone, Chroma), SQL, Docker`,
    jobDescription: `Role: Senior AI / LLM Applications Engineer
Company: Cortex Labs

Overview:
We are seeking an experienced AI Applications Engineer to build next-generation agentic workflows and production Retrieval-Augmented Generation (RAG) systems. You will lead the transition from prompt prototypes to high-throughput, evaluation-backed generative AI services.

What You Will Do:
• Build and optimize production RAG systems with hybrid search, re-ranking, and chunking strategies across millions of enterprise documents.
• Implement agentic reasoning loops, tool-use architectures, and guardrails to minimize hallucinations and ensure strict latency SLAs (<800ms).
• Design automated evaluation pipelines (Ragas, Trulens, LLM-as-a-judge) to continuously monitor accuracy, faithfulness, and semantic drift.
• Scale asynchronous Python/FastAPI microservices deployed on Kubernetes with streaming responses (SSE/WebSocket).

Qualifications:
• 3+ years experience developing and deploying machine learning or LLM-driven applications.
• Strong mastery of Python, asyncio, FastAPI, PyTorch, and tokenization techniques.
• Deep expertise with vector databases (Qdrant, Pinecone, pgvector) and semantic search algorithms (HNSW, BM25 hybrid).
• Experience with model optimization, quantization, vLLM, and prompt caching.
• Understanding of security, data privacy, and prompt injection defense in enterprise LLM deployment.`,
  },
  {
    id: 'product-designer-frontend',
    title: 'Design Technologist',
    role: 'Senior UI/Frontend Engineer',
    companyTarget: 'Vercel / Figma',
    badge: 'UI/UX',
    resume: `Jordan Lee
Frontend & Design Technologist | jordan.lee@example.com

SUMMARY
Frontend engineer passionate about design systems, accessible UI interactions, and high-performance web applications using React, Next.js, and CSS.

EXPERIENCE
PixelCraft — Frontend Engineer (2022 - Present)
• Worked on the core component library and updated styling using Tailwind CSS.
• Fixed accessibility issues found in our audits to meet WCAG standards.
• Made our web pages load faster by optimizing images and code splitting.
• Collaborated with UX designers to turn Figma mockups into working React components.

Vivid Studio — Web Developer (2020 - 2022)
• Created marketing landing pages using HTML, CSS, JavaScript, and React.
• Implemented interactive animations with Framer Motion.
• Managed client websites and fixed bugs across various browsers.

SKILLS
JavaScript, TypeScript, React, Next.js, Tailwind CSS, Framer Motion, Figma, Storybook, Jest, Webpack, Git`,
    jobDescription: `Role: Senior Design Systems Engineer / Frontend Specialist
Company: Canvas Cloud

About the Team:
Our Design Systems team crafts the foundational components, tokens, and micro-interactions relied upon by 150+ product engineers and millions of end users worldwide.

Responsibilities:
• Architect, document, and maintain an enterprise-scale multi-brand design system in React, TypeScript, and Tailwind CSS / CSS Modules.
• Enforce strict WCAG 2.1 AA accessibility standards, keyboard navigation models, and screen reader compatibility across all components.
• Build fluid 60fps micro-interactions and gesture-driven animations with Framer Motion while maintaining sub-100KB bundle budgets.
• Create automated visual regression testing pipelines (Storybook, Playwright, Chromatic) and comprehensive design token workflows.

Requirements:
• 4+ years of specialized frontend engineering focused on design systems and complex UI architectures.
• Deep proficiency in TypeScript, React 18/19, headless UI patterns, and compound component patterns.
• Mastery of web performance optimization (Core Web Vitals, tree shaking, SSR/RSC streaming).
• Proven passion for UI craft, typographic precision, and interaction design.`,
  },
];
