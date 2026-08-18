import {
  ProfileInfo,
  StatMetric,
  SkillCategory,
  Experience,
  Project,
  Education,
} from '../models/portfolio.model';

export const APP_URLS = {
  email: 'dheerajv1750@gmail.com',
  mailto: 'mailto:dheerajv1750@gmail.com',
  linkedin: 'https://www.linkedin.com/in/dheeraj-verma-590597192/',
  github: 'https://github.com/Dheeraj62',
  pitchConnectLive: 'https://pitchconnect.online',
} as const;

export const PROFILE_DATA: ProfileInfo = {
  name: 'Dheeraj Verma',
  role: 'Software Engineer | Full-Stack (.NET Core, Angular, React)',
  location: 'Gurugram, India',
  experienceYears: '3.7+',
  currentCompany: 'IndiGo Airlines — Aionos',
  currentRole: 'Software Engineer',
  social: {
    email: APP_URLS.email,
    linkedin: APP_URLS.linkedin,
    github: APP_URLS.github,
  },
  highlights: [
    '3.7+ years engineering enterprise full-stack solutions with C#, ASP.NET Core & Angular / React',
    'Event-driven microservices with Apache Kafka, gRPC & GraphQL inter-service communication',
    'High-throughput database design & query tuning across SQL Server & MongoDB',
    'Cloud-native delivery with Azure, CI/CD pipelines, OAuth 2.0 & JWT security',
    'Accelerated development velocity (~25%) leveraging AI assistants (Claude, Copilot, ChatGPT)',
  ],
  coreStack: [
    'C# / .NET 9',
    'Angular 20',
    'React.js',
    'Apache Kafka',
    'gRPC',
    'SQL Server',
    'MongoDB',
    'Azure',
  ],
};

export const QUICK_STATS: readonly StatMetric[] = [
  { num: '3.7+', label: 'Years Experience', sub: 'Enterprise & SaaS', icon: 'timeline' },
  { num: '20,000+', label: 'Active Users', sub: 'Flight Crew CMS', icon: 'flight_takeoff' },
  { num: '4+', label: 'Enterprise Apps', sub: 'Built & Deployed', icon: 'layers' },
  { num: '99.5%+', label: 'Uptime Maintained', sub: 'Production SLA', icon: 'verified' },
];

export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    title: 'Backend Engineering',
    icon: 'dns',
    color: '#6366f1',
    items: [
      'C#',
      'ASP.NET Core (.NET 6/8/9)',
      'ASP.NET MVC',
      'Web API',
      'Entity Framework Core',
      'EF6',
      'gRPC',
      'LINQ',
    ],
  },
  {
    title: 'Frontend & UI',
    icon: 'devices',
    color: '#06b6d4',
    items: [
      'Angular (v16–v20)',
      'React.js',
      'TypeScript',
      'JavaScript',
      'Angular Material',
      'RxJS',
      'Reactive Forms',
      'Tailwind CSS',
      'SCSS/HTML5',
    ],
  },
  {
    title: 'Messaging & APIs',
    icon: 'sync_alt',
    color: '#a855f7',
    items: [
      'Apache Kafka',
      'GraphQL',
      'RESTful APIs',
      'JSON Serialization',
      'Event Streaming',
      'Microservices IPC',
    ],
  },
  {
    title: 'Databases & Storage',
    icon: 'storage',
    color: '#10b981',
    items: [
      'Microsoft SQL Server',
      'MongoDB',
      'Stored Procedures',
      'Query Optimization',
      'Index Tuning',
      'ADO.NET Migration',
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: 'cloud_queue',
    color: '#38bdf8',
    items: [
      'Azure Web Apps',
      'Azure Functions',
      'Entra ID',
      'Blob Storage',
      'Azure Key Vault',
      'Azure DevOps',
      'CI/CD Pipelines',
      'Git & GitHub',
    ],
  },
  {
    title: 'Architecture & Security',
    icon: 'security',
    color: '#f59e0b',
    items: [
      'Microservices',
      'Clean Architecture',
      'Repository Pattern',
      'Dependency Injection',
      'SOLID Principles',
      'OAuth 2.0',
      'JWT Authentication',
      'Role-Based Access Control (RBAC)',
    ],
  },
  {
    title: 'AI & Developer Productivity',
    icon: 'psychology',
    color: '#ec4899',
    items: [
      'Claude (Anthropic)',
      'GitHub Copilot',
      'ChatGPT',
      'Gemini',
      'AI Code Reviews',
      'Prompt Engineering',
      'Automated Test Scaffolding',
    ],
  },
  {
    title: 'Testing & Code Quality',
    icon: 'fact_check',
    color: '#8b5cf6',
    items: [
      'NUnit',
      'Postman',
      'Swagger / OpenAPI',
      'SonarQube',
      'Code Reviews',
      'Performance Profiling',
    ],
  },
];

export const WORK_EXPERIENCES: readonly Experience[] = [
  {
    title: 'Software Engineer',
    org: 'IndiGo Airlines — Aionos',
    location: 'Gurugram, India',
    period: 'January 2026 – Present',
    type: 'Aviation Tech / Microservices',
    badge: 'Current Role',
    isCurrent: true,
    summary:
      'Engineering high-scale airline crew management backend microservices and modern interfaces handling operations for 20,000+ flight crew members.',
    points: [
      'Engineered backend APIs that integrated crew scheduling systems into a unified data model, supporting operations for 20,000+ flight crew members.',
      'Implemented gRPC inter-service communication between CMS microservices, improving internal API latency by ~30% over REST.',
      'Integrated Apache Kafka for event-driven crew roster updates, enabling near-real-time propagation across 4 dependent services.',
      'Designed GraphQL endpoints for flexible field-level crew data queries, reducing payload sizes for mobile and web clients.',
      'Utilized GitHub Copilot and Claude for accelerated boilerplate generation, unit test scaffolding, and code review, boosting development velocity by ~25%.',
    ],
    tech: ['.NET 9', 'Microservices', 'Apache Kafka', 'gRPC', 'GraphQL', 'Angular', 'Azure', 'AI Tools'],
  },
  {
    title: 'Software Developer',
    org: 'Binary Semantics Ltd.',
    location: 'Gurugram, India',
    period: 'March 2023 – January 2026',
    type: 'Enterprise FinTech & Compliance',
    badge: 'Nearly 3 Years',
    isCurrent: false,
    summary:
      'Engineered and delivered 4 enterprise compliance and e-invoicing platforms using ASP.NET Core, Angular, React, and SQL Server serving 500+ concurrent users.',
    points: [
      'Developed 4 enterprise web applications in the GST compliance and e-invoicing domain using ASP.NET Core, Web API, Angular, React, and SQL Server, serving 500+ concurrent users.',
      'Migrated legacy stored procedures and ADO.NET to Entity Framework Core with optimized LINQ queries, reducing query execution time by ~40%.',
      'Built RESTful APIs for invoice generation, GST return filing (GSTR1, GSTR1A, GSTR2B), and tax validation.',
      'Implemented OAuth 2.0 and JWT authentication, securing endpoints across multi-tenant applications.',
      'Integrated third-party GSTN APIs with retry logic and circuit breaker patterns for real-time invoice validation.',
      'Optimized SQL Server performance through index analysis and query restructuring, reducing reporting screen load times by ~35%.',
      'Leveraged AI coding assistants (Copilot, ChatGPT) for rapid debugging, SQL query optimization, and generating boilerplate CRUD operations across 4 enterprise applications.',
      'Resolved 200+ production issues across backend, database, and UI layers, maintaining 99.5%+ uptime.',
    ],
    tech: ['ASP.NET Core', 'Angular', 'React.js', 'SQL Server', 'Entity Framework Core', 'MongoDB', 'OAuth 2.0', 'GSTN APIs'],
  },
];

export const PORTFOLIO_PROJECTS: readonly Project[] = [
  {
    id: 'cms-indigo',
    title: 'Crew Management System (CMS)',
    category: 'Airlines Microservices',
    projectType: 'enterprise-work',
    organization: 'IndiGo Airlines — Aionos',
    isCurrentJobProject: true,
    featured: true,
    description:
      'Enterprise microservices-based crew management platform for IndiGo Airlines, orchestrating flight crew scheduling, roster propagation, and operational compliance for 20,000+ flight crew members.',
    highlights: [
      'Current Production Job Project at IndiGo Airlines (Aionos).',
      'Real-time event streaming across 4 dependent microservices powered by Apache Kafka.',
      'High-speed inter-service RPC with gRPC, reducing internal API latency by ~30%.',
      'GraphQL endpoints for efficient field-level querying on mobile and web clients.',
    ],
    metrics: '20,000+ Crew Members • ~30% Lower Latency',
    tags: ['.NET 9', 'Microservices', 'Apache Kafka', 'gRPC', 'GraphQL', 'Angular', 'Azure'],
  },
  {
    id: 'pitchconnect',
    title: 'PitchConnect — Founder-Investor Matchmaking Platform',
    category: 'SaaS / Live Platform',
    projectType: 'saas',
    featured: true,
    description:
      'A full-stack SaaS platform connecting startup founders with investors, featuring pitch deck submissions, industry-based discovery, investor signaling, and real-time deal flow dashboards.',
    highlights: [
      'Architected the backend with ASP.NET Core, MongoDB, JWT authentication, and fine-grained Role-Based Access Control (RBAC).',
      'Developed responsive frontend in Angular & React with infinite scroll, industry/stage filtering, and real-time analytics.',
      'Leveraged Claude and GitHub Copilot for AI-assisted schema modeling, component scaffolding, and end-to-end test coverage.',
    ],
    metrics: 'Live Production SaaS • Multi-Tenant RBAC',
    tags: ['ASP.NET Core', 'Angular', 'React.js', 'MongoDB', 'JWT / RBAC', 'Claude AI', 'Tailwind'],
    liveUrl: APP_URLS.pitchConnectLive,
  },
  {
    id: 'p2p-platform',
    title: 'Procure-to-Pay (P2P) Platform',
    category: 'Enterprise Workflow',
    projectType: 'enterprise-work',
    organization: 'Binary Semantics Ltd.',
    description:
      'End-to-end procurement and invoice validation workflow platform featuring automated cross-matching, multi-tier approval chains, and vendor ledger reconciliations.',
    highlights: [
      'Engineered cross-validation engine reconciling data between Purchase Orders (PO), Goods Receipts (GRN), and Vendor Invoices.',
      'Configurable multi-level approval hierarchies with audit logging and automated email triggers.',
    ],
    metrics: '500+ Concurrent Enterprise Users',
    tags: ['ASP.NET Core', 'Angular', 'SQL Server', 'Entity Framework Core', 'REST APIs', 'Audit Logging'],
  },
  {
    id: 'gst-robo',
    title: 'GST Robo — GST Return Filing Platform',
    category: 'FinTech / Tax Compliance',
    projectType: 'fintech',
    organization: 'Binary Semantics Ltd.',
    description:
      'Comprehensive tax compliance suite enabling enterprise taxpayers to prepare, reconcile, and file GSTR1, GSTR1A, and GSTR2B returns with automated government portal validation.',
    highlights: [
      'Direct GSTN API integration with robust circuit breaker patterns and automatic retry mechanisms.',
      'Reusable Angular Material design system with high-speed data tables and bulk spreadsheet upload validation.',
    ],
    metrics: '40% Faster Query Execution with EF Core',
    tags: ['ASP.NET Core', 'Angular Material', 'SQL Server', 'GSTN APIs', 'Circuit Breaker', 'LINQ'],
  },
  {
    id: 'comply-robo',
    title: 'Comply Robo — Malaysia E-Invoicing System',
    category: 'International Compliance',
    projectType: 'fintech',
    organization: 'Binary Semantics Ltd.',
    description:
      'Regulatory e-invoicing compliance application adhering to Malaysia Inland Revenue Board (LHDN) standards, implementing cryptographic signing and real-time clearance.',
    highlights: [
      'Built secure REST APIs implementing SHA-256 digital signing for invoice integrity and non-repudiation.',
      'Strict schema validation and cryptographic validation pipelines for high-volume transactions.',
    ],
    metrics: 'LHDN Compliant • SHA-256 Digital Signing',
    tags: ['ASP.NET Core', 'Cryptography (SHA-256)', 'Angular', 'MongoDB', 'REST APIs'],
  },
];

export const EDUCATION_DATA: readonly Education[] = [
  {
    degree: 'Bachelor of Technology in Computer Science and Engineering',
    institution: 'G.B. Pant Government Engineering College, GGSIPU — New Delhi, India',
    period: 'Graduated',
    score: 'GPA: 8.94 / 10.00',
    icon: 'school',
    highlight: 'First Class with Distinction',
  },
  {
    degree: 'Senior Secondary Education (Class XII - Science & Math)',
    institution: 'Stephens International Public School — Jammu, J&K',
    period: 'Completed',
    score: 'Score: 92.8%',
    icon: 'workspace_premium',
    highlight: 'Top Tier Academic Standing',
  },
];
