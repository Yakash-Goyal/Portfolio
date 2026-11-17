/* =========================================================
   ALL SITE CONTENT LIVES HERE.
   Edit text, projects and links in this file; the components
   read from it, so you rarely need to touch them.
   ========================================================= */

export const site = {
  name: 'Yakash Goyal',
  first: 'Yakash',
  last: 'Goyal',
  initial: 'Y',
  role: 'Full-stack developer',
  location: 'Chandigarh, India',
  timeZone: 'Asia/Kolkata',
  /* Leave empty to keep email off the site. When set, the contact form opens an email
     instead of LinkedIn, and a "copy email" button appears. */
  email: '',
  github: 'https://github.com/Yakash-Goyal',
  githubUser: 'Yakash-Goyal',
  linkedin: 'https://www.linkedin.com/in/yakash-goyal',
  status: 'Open to opportunities',
  /* words that cycle in the hero: "I build ____" */
  roles: ['web apps', 'AI agents', 'dashboards', 'Chrome extensions', 'interfaces'],
};

export const nav = [
  { id: 'about', label: 'About', n: '01' },
  { id: 'work', label: 'Work', n: '02' },
  { id: 'skills', label: 'Skills', n: '04' },
  { id: 'journey', label: 'Journey', n: '06' },
  { id: 'github', label: 'GitHub', n: '09' },
  { id: 'contact', label: 'Contact', n: '10' },
];

export const bands = {
  top: ['Full-stack development', 'AI agents', 'MERN stack', 'GSAP motion', 'Data & analytics'],
  bottom: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'LangGraph', 'Tailwind', 'PostgreSQL', 'GSAP'],
};

export const about = {
  /* wrap phrases in [[double brackets]] to get the highlighter effect */
  intro: "I'm Yakash, a computer science student at UIET Chandigarh and a full-stack developer. I build [[end-to-end web apps]] and [[AI-powered tools]], from the database and the API all the way to the last animation on screen.",
  more: [
    'Most of my work is on the MERN stack: React with Tailwind and GSAP on the front, Node, Express and MongoDB or SQL on the back, with authentication and clean APIs in between.',
    "Lately I've been building AI agents with LangGraph, Gemini and local models through Ollama, always with a human in control and safety switched on by default.",
  ],
  facts: [
    { k: 'Focus', v: 'Full-stack & AI' },
    { k: 'Studying', v: 'CS at UIET' },
    { k: 'Based in', v: 'Chandigarh, India' },
  ],
  stats: [
    { n: 17, label: 'Public repositories on GitHub' },
    { n: 4, label: 'AI & LLM projects' },
    { n: 2, label: 'Apps live in production' },
    { n: 2024, label: 'Shipping code on GitHub since' },
  ],
};

/* cover: which drawn mockup to show (aether = phones, monolith = component sheet,
   pulse = dashboard, driftwood = product page). pal: cobalt | paper | mint | sand | violet */
export const work = [
  {
    title: 'Disaster Response',
    kind: 'AI command centre',
    year: '2026',
    text: 'A command-and-control platform for disaster teams. AI agents triage incoming reports and recommend which unit to send, with real road travel times. A human commander approves every decision.',
    tags: ['TypeScript', 'LangGraph', 'Gemini', 'PostGIS', 'OSRM'],
    cover: 'pulse', pal: 'cobalt',
    repo: 'https://github.com/Yakash-Goyal/disaster-response-coordinator',
  },
  {
    title: 'SentinelQA',
    kind: 'Autonomous testing agent',
    year: '2026',
    text: 'An LLM agent that tests web apps for security weaknesses and load. It chooses its own tools, runs fully local with Ollama, and is deny-by-default at four levels.',
    tags: ['TypeScript', 'Bun', 'Ollama', 'Playwright', 'k6'],
    cover: 'monolith', pal: 'paper',
    repo: 'https://github.com/Yakash-Goyal/SentriQA',
  },
  {
    title: 'PrimePlanners',
    kind: 'Event platform',
    year: '2026',
    text: 'A full-stack event platform with a dynamic ticket-pricing engine, separate dashboards for attenders, creators and admins, and a dark UI animated with GSAP.',
    tags: ['React 19', 'Node.js', 'MongoDB', 'JWT', 'GSAP'],
    cover: 'driftwood', pal: 'sand',
    repo: 'https://github.com/Yakash-Goyal/PrimePlanners',
    live: 'https://prime-planners.vercel.app',
  },
  {
    title: 'SnapRoute',
    kind: 'AI memory manager',
    year: '2026',
    text: 'Saves structured memories from your AI chats and restores the right context into a new chat. A Chrome extension, a React dashboard and a local LLM working together.',
    tags: ['React', 'Express', 'MongoDB', 'Chrome extension', 'Ollama'],
    cover: 'aether', pal: 'mint',
    repo: 'https://github.com/Yakash-Goyal/SnapRoute',
  },
];

export const archive = [
  {
    title: 'LinkLens', kind: 'URL shortener & analytics', year: '2026',
    text: 'Short links with custom aliases and privacy-safe click tracking. URL records live in PostgreSQL and click events in MongoDB, broken down by device, country and date.',
    tags: ['Express', 'PostgreSQL', 'MongoDB'], cover: 'pulse', pal: 'paper',
    repo: 'https://github.com/Yakash-Goyal/LinkLens',
  },
  {
    title: 'CampusBeacon', kind: 'Student dashboard', year: '2026',
    text: 'Expenses, CGPA, attendance, daily targets and todos in one place. Everything stays in your browser: no backend and no sign-up.',
    tags: ['React', 'Tailwind', 'Recharts'], cover: 'aether', pal: 'sand',
    repo: 'https://github.com/Yakash-Goyal/CampusBeacon', live: 'https://campusbeacon.vercel.app',
  },
  {
    title: 'HCP Insights', kind: 'Data analytics', year: '2026',
    text: 'Segments healthcare providers by the recency, frequency and value of industry payments, using SQL profiling, Python RFM scoring and a Power BI dashboard.',
    tags: ['SQL', 'Python', 'Power BI'], cover: 'pulse', pal: 'mint',
    repo: 'https://github.com/Yakash-Goyal/HCP-Insights',
  },
  {
    title: 'Clean Screenshots', kind: 'Chrome extension', year: '2026',
    text: 'One-click screenshots of YouTube lectures without the player controls, saved in numbered folders for each lecture. Built for studying.',
    tags: ['JavaScript', 'Manifest V3', 'Canvas'], cover: 'monolith', pal: 'violet',
    repo: 'https://github.com/Yakash-Goyal/NotesCreater',
  },
  {
    title: 'Gradient Maker', kind: 'CSS tool', year: '2024',
    text: 'A small tool for building CSS gradients and copying the code. One of my first projects on GitHub.',
    tags: ['HTML', 'CSS', 'JavaScript'], cover: 'monolith', pal: 'cobalt',
    repo: 'https://github.com/Yakash-Goyal/gradient-maker',
  },
];

export const skills = [
  {
    title: 'Full-stack web apps', icon: 'screen',
    text: 'End-to-end apps on the MERN stack: React front ends, Node and Express APIs, MongoDB or SQL databases, with JWT authentication and role-based access.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js', 'MySQL', 'PostgreSQL'],
  },
  {
    title: 'AI agents & LLM tools', icon: 'spark',
    text: 'Agents that classify, plan and call tools using LangGraph, Gemini or local models through Ollama, designed with a human in the loop and safe defaults.',
    tags: ['LangGraph', 'Gemini', 'Ollama', 'RAG'],
  },
  {
    title: 'Front-end & motion', icon: 'wave',
    text: 'Responsive interfaces with React, Tailwind and Bootstrap, brought to life with GSAP scroll and interaction animations, like this site.',
    tags: ['React', 'Tailwind', 'GSAP', 'Sass'],
  },
  {
    title: 'Data & analytics', icon: 'chart',
    text: 'SQL analysis, Python scripts and dashboards that turn raw data into something people can act on.',
    tags: ['SQL', 'Python', 'Power BI', 'Recharts'],
  },
];

export const process = [
  { n: 'Step 01', title: 'Understand', text: 'Start from the real problem and the people who have it, not from the tech stack.' },
  { n: 'Step 02', title: 'Plan', text: 'Sketch the data model, the API and the main screens before writing much code.' },
  { n: 'Step 03', title: 'Build', text: 'Ship in small working pieces, with auth, validation and errors handled from day one.' },
  { n: 'Step 04', title: 'Ship', text: 'Deploy it, write a README anyone can follow, and keep improving from feedback.' },
];

export const journey = [
  { when: 'Now', what: 'Computer Science student', where: 'UIET, Panjab University', tag: 'Chandigarh' },
  { when: '2026', what: 'AI agents & full-stack apps', where: 'Disaster Response, SentinelQA, SnapRoute', tag: 'Projects' },
  { when: '2025', what: 'Algorithms & hackathons', where: 'C++ algorithms, hackathon prototype', tag: 'Projects' },
  { when: '2024', what: 'First projects on GitHub', where: 'Todo list, gradient maker', tag: 'Started' },
];

export const tools = [
  { t: 'JavaScript' }, { t: 'TypeScript', c: 'a' }, { t: 'React' }, { t: 'Node.js', c: 'b' },
  { t: 'Express' }, { t: 'MongoDB', c: 'b' }, { t: 'MySQL' }, { t: 'PostgreSQL' },
  { t: 'Tailwind' }, { t: 'GSAP', c: 'a' }, { t: 'Python' }, { t: 'C++' },
  { t: 'PHP' }, { t: 'LangGraph', c: 'c' }, { t: 'Ollama' }, { t: 'Figma' }, { t: 'Git' }, { t: 'Bun', c: 'c' },
];

export const now = [
  { k: 'Building', v: 'Disaster Response Coordinator', e: '●' },
  { k: 'Exploring', v: 'AI agents with LangGraph', e: '◆' },
  { k: 'Studying', v: 'Computer Science, UIET', e: '▲' },
  { k: 'Open to', v: 'New opportunities', e: '★' },
];

/* quotes on the draggable cards come straight from my project READMEs */
export const principles = [
  { quote: 'Nothing is dispatched automatically. A human approves every decision the AI suggests.', from: 'Disaster Response Coordinator', short: 'DR' },
  { quote: 'Deny by default. A fresh install can test nothing until you allow it.', from: 'SentinelQA', short: 'SQ' },
  { quote: 'Your data stays on your device. No backend, no sign-up, instant access.', from: 'CampusBeacon', short: 'CB' },
  { quote: 'Run the model locally: no API key needed, and no data leaves the machine.', from: 'SnapRoute', short: 'SR' },
];

export const statement = 'I like building things that solve real problems, with creativity and logic, from the database all the way to the last animation.';

/* shown in the GitHub section until live data loads (or if GitHub can't be reached) */
export const repoFallback = [
  { name: 'disaster-response-coordinator', language: 'TypeScript', pushed_at: '2026-11-09', html_url: 'https://github.com/Yakash-Goyal/disaster-response-coordinator' },
  { name: 'SentriQA', language: 'TypeScript', pushed_at: '2026-08-26', html_url: 'https://github.com/Yakash-Goyal/SentriQA' },
  { name: 'HCP-Insights', language: 'Python', pushed_at: '2026-08-24', html_url: 'https://github.com/Yakash-Goyal/HCP-Insights' },
  { name: 'SnapRoute', language: 'JavaScript', pushed_at: '2026-08-01', html_url: 'https://github.com/Yakash-Goyal/SnapRoute' },
  { name: 'LinkLens', language: 'JavaScript', pushed_at: '2026-08-01', html_url: 'https://github.com/Yakash-Goyal/LinkLens' },
];
/* nicer descriptions for repos that have none on GitHub */
export const repoNotes = {
  'disaster-response-coordinator': 'AI-assisted dispatch for disaster response teams',
  SentriQA: 'Autonomous security and load-testing agent',
  'HCP-Insights': 'Healthcare provider segmentation and dashboard',
  SnapRoute: 'AI memory manager: Chrome extension + dashboard',
  LinkLens: 'URL shortener with click analytics',
  OpenClaw: 'Software testing agent experiments',
  RAG: 'Retrieval-augmented generation experiments',
  PrimePlanners: 'Event platform with dynamic pricing',
  NotesCreater: 'Clean YouTube lecture screenshots extension',
  CampusBeacon: 'Student productivity dashboard',
};

export const contact = {
  topics: ['an internship', 'a project', 'a collaboration', 'something else'],
};
