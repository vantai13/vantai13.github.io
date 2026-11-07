import { researchAdvisor } from './profile';

export type Work = {
  kind: 'research' | 'engineering';
  slug: string; index: string; title: string; shortTitle: string; category: string;
  status: string; period: string; summary: string; tags: string[];
  image?: string; imageAlt?: string; problem: string; motivation: string;
  researchQuestion?: string;
  advisor?: { name: string; affiliation: string; homepage: string };
  reflection?: { text: string; linkLabel: string; href: string };
  role: string; approach: string[]; results: {label: string; value: string; context: string}[];
  evidence: string; limitations: string[]; links: {label: string; url: string}[];
};

export const work: Work[] = [
  {
    kind: 'research', slug: 'network-digital-twin', index: '01',
    title: 'Network Digital Twin for Intelligent Network Management', shortTitle: 'Network Digital Twin',
    category: 'Network Digital Twins', status: 'Completed research project', period: '2025 — 2026',
    summary: 'Connecting an SDN testbed to a living network model, with bidirectional synchronization, what-if analysis, and a closed control loop.',
    tags: ['Mininet', 'Eclipse Ditto', 'Python', 'Ryu'],
    image: '/images/dt4n-dashboard.png', imageAlt: 'DT4N project dashboard showing the actual network topology, link state and throughput controls',
    problem: 'Network monitoring provides telemetry, but an operational response also requires a model of the network, a way to issue commands, and evidence that the intended change took effect. DT4N brings these paths together in a controlled SDN testbed.',
    motivation: 'The technical objective was to build an inspectable Network Digital Twin: synchronize a Mininet / Ryu testbed with Eclipse Ditto, explore bounded what-if scenarios, and trace control actions through the returning network state.',
    role: 'Project Lead for a UIT-supported undergraduate research project. I built the SDN testbed and synchronization layer, implemented the anomaly detector, and developed the closed-loop controller. The work also includes experiment scripts and archived evaluation artifacts.',
    advisor: researchAdvisor,
    reflection: {
      text: 'DT4N connects observations, a network model, and control actions in one system. Evaluating that system raises a further question: how do the observations and response model affect the quality of the decision itself? This connects the engineering project to my ongoing State–Model–Regret research.',
      linkLabel: 'Explore the next research question',
      href: '/work/state-model-regret/',
    },
    approach: [
      'Built a Mininet / Ryu SDN testbed and represented hosts and links as Eclipse Ditto Things.',
      'Implemented upward telemetry synchronization and a downward command path, verifying control actions through the returning network state.',
      'Added a detector trained on normal traffic, a bounded what-if model, and a controller that rate-limits a host identified as causing congestion.',
      'Preserved raw observations, model versions, evaluation criteria, and scripts for offline reproduction. The system also includes an AWS automation integration.',
    ],
    results: [
      { label: 'State synchronization', value: '1.017 s', context: 'p95 upward synchronization delay, 30 trials; seed 20260915, 1 s collection period.' },
      { label: 'Throughput under UDP flood', value: '0.295 → 2.146 Mbps', context: 'Controller OFF → ON, 32 trials in 8 blocks; seed 20260920. Mean difference 1.8514 Mbps, 95% CI [1.7729, 1.9122]; exact randomization p = 0.0078125.' },
      { label: 'In-domain what-if error', value: '0.009 Mbps', context: 'Median absolute throughput error across 62 in-domain rate entries in a retrospective evaluation. Maximum 0.097 Mbps; entries are not independent trials.' },
    ],
    evidence: 'Results from archived project experiments. Eight offline reproduction checks and 193 artifact integrity checks matched on 6 November 2026. These checks reprocess existing data; they are not new testbed measurements.',
    limitations: [
      'Experiments use a small, single-machine testbed. They do not establish performance on a production network.',
      'The detector caught 4/4 flood and bottleneck-shift incidents, but bandwidth-reduction detection was 0.40 against a target of 0.875. Maximum detection delay was about 20 s against a 3 s target.',
      'Zero false-alarm events were observed over approximately two normal-traffic hours; this does not imply a zero false-alarm rate. The stored one-sided 95% upper bound is about 1.50 events/hour.',
      'The controller throughput result has a possible ceiling effect noted in the stored analysis. The what-if model has an explicit operating region.',
    ],
    links: [
      { label: 'Source code', url: 'https://github.com/vantai13/dt4n-core' },
      { label: 'Results & reproduction', url: 'https://github.com/vantai13/dt4n-core/tree/main/ket-qua-bao-cao' },
      { label: 'System documentation', url: 'https://github.com/vantai13/dt4n-core/blob/main/README.md' },
    ],
  },
  {
    kind: 'research', slug: 'state-model-regret', index: '02',
    title: 'When does better network information lead to better decisions?', shortTitle: 'State–Model–Regret',
    category: 'Decision-Making under Uncertainty', status: 'Research in progress', period: '2026 — Present',
    summary: 'Investigating how current-state information and action-response model fidelity interact in their effect on expected routing decision regret.',
    tags: ['Routing', 'Queueing Systems', 'Uncertainty', 'Simulation'],
    problem: 'A routing change moves load between paths. A controller must choose using information about the current state and a model of the response to that change. Prediction accuracy alone does not tell us how either factor affects the cost of the selected action.',
    motivation: 'Following the systems work in DT4N, this project examines the decisions made with a network model. The goal is to understand the separate and interacting effects of state information and response-model fidelity within a specified decision setting.',
    researchQuestion: 'For load-changing routing actions, how do improvements in current-state information and action-response model fidelity differ and interact in their effect on expected decision regret?',
    role: 'I work on queueing-based models, simulation, and the evaluation workflow for this ongoing study. The repository records experimental designs, exploratory analyses, diagnostic results, and their limitations.',
    advisor: researchAdvisor,
    approach: [
      'Use a controlled two-path queueing model in which switching a managed load changes the load on both paths.',
      'Compare four decision pipelines under the same plant, action set, objective, and probability law, varying state information and response modeling separately.',
      'In the specified model comparison, hold parameters and posterior information fixed; compare mean-rollout costs with true expected future costs.',
      'Evaluate expected decision regret against a reference with current-state and response-law information. The reference does not know realized future traffic. Preserve predictions, configurations, and result artifacts for inspection.',
    ],
    results: [],
    evidence: 'The repository records exploratory and diagnostic results. Current status is ongoing research; no publication, novelty claim, or confirmed hypothesis is asserted here.',
    limitations: [
      'The Phase 6 result is inconclusive and calls for reformulating the predictor. Phase 7 remains exploratory.',
      'Numerical and model checks do not by themselves establish research validity or real-network generalization.',
      'The current-state benchmark includes hidden-mode oracle information. It is not a deployed telemetry refresh mechanism, and it does not establish that fresher telemetry is harmful.',
      'The model comparison has a fixed scope: shared parameters and posterior, with different representations of future cost. It does not test arbitrary parameter or structural errors, or establish a general ranking of state information versus model fidelity.',
    ],
    links: [
      { label: 'Research repository', url: 'https://github.com/vantai13/state-model-regret' },
      { label: 'Research notebook', url: 'https://github.com/vantai13/state-model-regret/tree/main/notes' },
      { label: 'Decision setting & definitions', url: 'https://github.com/vantai13/state-model-regret/blob/main/notes/01_definitions_v1_3.md' },
    ],
  },
  {
    kind: 'engineering', slug: 'deep-rl-routing', index: '03',
    title: 'Learning adaptive routes in software-defined networks', shortTitle: 'Deep RL for SDN Routing',
    category: 'Learning for Networking', status: 'Academic project', period: 'February — May 2026',
    summary: 'A Dueling Double DQN routing agent, a custom Gymnasium environment, and a Mininet evaluation pipeline with an OSPF baseline.',
    tags: ['PyTorch', 'Gymnasium', 'Mininet', 'Vue'],
    problem: 'Congestion and link failures can make a fixed route inefficient. A learned policy needs a useful representation of network state and an evaluation that reaches beyond its training simulator.',
    motivation: 'Explore adaptive routing through a complete implementation: train an agent, connect its decisions to an SDN testbed, and inspect the behavior alongside a conventional baseline.',
    role: 'Implemented the routing environment, DQN agent, training workflow, and Mininet/Ryu integration, with a Vue / Flask dashboard for inspecting network state and routing decisions.',
    approach: [
      'Designed an 81-dimensional state representation, action masking, and a multi-objective routing reward in Gymnasium.',
      'Combined Dueling DQN, Double DQN, prioritized replay, and Softmax exploration with an entropy bonus.',
      'Used a five-phase curriculum; the project documentation reports 18,000 training episodes.',
      'Built a 12-switch / 5-host Mininet testbed and evaluated four congestion / failure scenarios alongside OSPF, with 30 episodes per scenario.',
    ],
    results: [],
    evidence: 'The repository contains training logs and Mininet evaluation artifacts. Its reported percentage improvements are not repeated here because the summary table still needs to be linked to the exact corresponding runs.',
    limitations: [
      'Simulation performance does not by itself establish testbed or real-network performance.',
      'The README result table and the inspected local summary files are not yet reconciled. No single run has been selected as a headline result.',
    ],
    links: [
      { label: 'Source code', url: 'https://github.com/vantai13/routing-sdn' },
      { label: 'Project documentation', url: 'https://github.com/vantai13/routing-sdn/blob/vantai/README.md' },
      { label: 'Evaluation artifacts', url: 'https://github.com/vantai13/routing-sdn/tree/vantai/logs' },
    ],
  },
  {
    kind: 'engineering', slug: 'cloud-gitops', index: '04',
    title: 'From infrastructure as code to observable delivery on AWS', shortTitle: 'Cloud & GitOps on AWS',
    category: 'Cloud Infrastructure', status: 'Team course project', period: 'February — May 2026',
    summary: 'A three-tier application delivered to EKS through Terraform, GitHub Actions, and ArgoCD, with observable Blue/Green rollouts.',
    tags: ['AWS EKS', 'Terraform', 'ArgoCD', 'Prometheus'],
    image: '/images/eks-architecture.png', imageAlt: 'AWS architecture diagram from the NT548 team project, with public and private subnets across two availability zones',
    problem: 'A working application still needs reproducible infrastructure, controlled releases, observability, and a practical way to recover when a deployment is unhealthy.',
    motivation: 'Bring the infrastructure and application delivery lifecycle into version control, and connect deployment decisions to metrics rather than manual inspection alone.',
    role: 'Contributed infrastructure as code and delivery automation for the NT548 team project. The project and its architecture are shared team work; the source repositories retain the original attribution.',
    approach: [
      'Provisioned AWS infrastructure using Terraform with separate states, S3 storage, and DynamoDB state locking.',
      'Connected GitHub Actions to a separate GitOps configuration repository consumed by ArgoCD.',
      'Used Argo Rollouts for Blue/Green releases, with Prometheus analysis and rollback behavior.',
      'Included cluster observability, external secrets, network policies, and CI security scanning.',
    ],
    results: [],
    evidence: 'Source code, architecture diagrams, and a Vietnamese project report are available in the team repository. This portfolio does not claim an always-on production service or a newly repeated cloud benchmark.',
    limitations: [
      'The EKS stack is provisioned on demand, so the original demo domain may be offline.',
      'This is an educational team project. Architecture and implementation should be evaluated in that context.',
    ],
    links: [
      { label: 'Application & infrastructure', url: 'https://github.com/Devop-Projects/NT548-DevOps' },
      { label: 'GitOps configuration', url: 'https://github.com/Devop-Projects/nt548-config' },
      { label: 'Project report', url: 'https://github.com/Devop-Projects/NT548-DevOps/blob/main/docs/NT548_Group21_Report.pdf' },
    ],
  },
];
