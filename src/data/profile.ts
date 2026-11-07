export const researchAdvisor = {
  name: 'Dr. Huynh Van Dang',
  affiliation: 'Faculty of Computer Networks and Communications, University of Information Technology, VNU-HCM',
  homepage: 'https://sites.google.com/site/vdanghuynh/',
};

export const profile = {
  name: 'Doan Van Tai',
  vietnameseName: 'Đoàn Văn Tài',
  email: 'taidoan.13072005@gmail.com',
  github: 'https://github.com/vantai13',
  location: 'Ho Chi Minh City, Vietnam',
  university: 'University of Information Technology, VNU-HCM',
  availability: 'Open to research & R&D opportunities',
  bio: 'I’m a final-year Computer Networks and Communications student at UIT, VNU-HCM, working toward a career as a Research Engineer. My training combines network engineering, hands-on systems work, and undergraduate research.',
  interests: ['Network Digital Twins', 'Network Optimization', 'AI / ML for Networking', 'Decision-Making under Uncertainty'],
  skills: [
    { title: 'Networks & digital twins', items: 'Mininet · Ryu · OpenFlow · Eclipse Ditto · TCP/IP · Linux' },
    { title: 'Learning & experimentation', items: 'Python · PyTorch · Gymnasium · scikit-learn · NumPy · pandas' },
    { title: 'Cloud & engineering', items: 'AWS · Docker · Kubernetes · Terraform · ArgoCD · GitHub Actions' },
  ],
};

export type Experience = {
  id: string;
  kind: 'research' | 'internship';
  date: string;
  title: string;
  role: string;
  organization: string;
  description: string;
  advisor?: typeof researchAdvisor;
  detail: string;
  href: string;
  topics?: string[];
};

export const labExperience: Experience = {
  id: 'inseclab',
  kind: 'internship',
  date: 'Nov 2026 to Present',
  title: 'Research Intern, AI for Security',
  role: 'Research Intern',
  organization: 'UIT InSecLab · University of Information Technology, VNU-HCM',
  description: 'Exploring large language models and AI agents for security-oriented applications, including how agents select and use tools or skills for different tasks.',
  detail: 'Current learning topics include retrieval and reinforcement learning. This work is exploratory.',
  topics: ['LLMs', 'AI Agents', 'Tool / Skill Selection', 'Retrieval', 'Reinforcement Learning'],
  href: '/experience/#inseclab',
};

export const experience: Experience[] = [
  labExperience,
  {
    id: 'dt4n',
    kind: 'research',
    date: '2025 to 2026',
    title: 'Network Digital Twin Research',
    role: 'Project Lead · Undergraduate Research',
    organization: 'University of Information Technology, VNU-HCM',
    description: 'Led a UIT-supported student research project, from an SDN testbed and bidirectional telemetry synchronization to what-if analysis and closed-loop network control.',
    advisor: researchAdvisor,
    detail: 'Faculty of Computer Networks and Communications, UIT, VNU-HCM.',
    href: '/work/network-digital-twin/',
  },
  {
    id: 'state-model-regret',
    kind: 'research',
    date: '2026 to Present',
    title: 'State-Model-Regret for Network Routing',
    role: 'Ongoing Research',
    organization: 'Network decision-making under uncertainty',
    description: 'Studying the separate and interacting effects of state information quality and action-response model fidelity on expected routing decision regret.',
    advisor: researchAdvisor,
    detail: 'Exploratory work; no publication or confirmed scientific contribution claimed.',
    href: '/work/state-model-regret/',
  },
];
