export const profile = {
  name: 'Doan Van Tai',
  vietnameseName: 'Đoàn Văn Tài',
  email: 'taidoan.13072005@gmail.com',
  github: 'https://github.com/vantai13',
  location: 'Ho Chi Minh City, Vietnam',
  university: 'University of Information Technology, VNU-HCM',
  availability: 'Open to research & R&D opportunities',
  bio: 'I’m a final-year Computer Networks and Communications student at UIT, VNU-HCM, working toward a career as a Research Engineer. I explore how networks can be understood, optimized, and operated through digital twins, learning, and careful experimentation.',
  interests: ['Network Digital Twins', 'Network Optimization', 'AI / ML for Networking', 'Decision-Making under Uncertainty'],
  skills: [
    { title: 'Networks & digital twins', items: 'Mininet · Ryu · OpenFlow · Eclipse Ditto · TCP/IP · Linux' },
    { title: 'Learning & experimentation', items: 'Python · PyTorch · Gymnasium · scikit-learn · NumPy · pandas' },
    { title: 'Cloud & engineering', items: 'AWS · Docker · Kubernetes · Terraform · ArgoCD · GitHub Actions' },
  ],
};

export const experience = [
  {
    date: '2025 — 2026',
    title: 'Network Digital Twin Research',
    role: 'Project Lead · Undergraduate Research',
    organization: 'University of Information Technology, VNU-HCM',
    description: 'Led a UIT-supported student research project, from an SDN testbed and bidirectional telemetry synchronization to what-if analysis and closed-loop network control.',
    detail: 'Advised by Dr. Huynh Van Dang.',
    href: '/work/network-digital-twin/',
  },
  {
    date: '2026 — Present',
    title: 'State–Model–Regret for Network Routing',
    role: 'Ongoing Research',
    organization: 'Network decision-making under uncertainty',
    description: 'Studying the separate and interacting effects of state information quality and action-response model fidelity on expected routing decision regret.',
    detail: 'Exploratory work; no publication or confirmed scientific contribution claimed.',
    href: '/work/state-model-regret/',
  },
];
