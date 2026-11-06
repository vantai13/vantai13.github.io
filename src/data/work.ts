export type Work = {
  slug: string; index: string; title: string; shortTitle: string; category: string;
  status: string; period: string; summary: string; tags: string[];
  image?: string; imageAlt?: string; problem: string; motivation: string;
  role: string; approach: string[]; results: {label: string; value: string; context: string}[];
  evidence: string; limitations: string[]; links: {label: string; url: string}[];
};

export const work: Work[] = [
  {
    slug: 'network-digital-twin', index: '01',
    title: 'A digital twin for intelligent network management', shortTitle: 'Network Digital Twin',
    category: 'Network Digital Twins', status: 'Completed research project', period: '2025 — 2026',
    summary: 'Connecting an SDN testbed to a living network model, with bidirectional synchronization, what-if analysis, and a closed control loop.',
    tags: ['Mininet', 'Eclipse Ditto', 'Python', 'Ryu'],
    image: '/images/dt4n-dashboard.png', imageAlt: 'DT4N project dashboard showing the actual network topology, link state and throughput controls',
    problem: 'Network telemetry is useful only when it can support a timely and appropriate operational decision. A monitoring dashboard alone does not close the gap between observing the network and acting on it.',
    motivation: 'I wanted to build a network digital twin whose state could be inspected, whose assumptions could be tested, and whose commands could be traced back to observed changes in a testbed.',
    role: 'Project Lead for a UIT-supported undergraduate research project, advised by Dr. Huynh Van Dang. My work covered the SDN testbed, synchronization layer, anomaly detector, and closed-loop controller.',
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
    slug: 'state-model-regret', index: '02',
    title: 'When does better network information lead to better decisions?', shortTitle: 'State–Model–Regret',
    category: 'Decision-Making under Uncertainty', status: 'Research in progress', period: '2026 — Present',
    summary: 'Investigating how current-state information and action-response model fidelity interact in their effect on expected routing decision regret.',
    tags: ['Routing', 'Queueing Systems', 'Uncertainty', 'Simulation'],
    problem: 'A controller can see an imperfect state of the network and use an imperfect model of what its actions will do. Improving either source of information may affect the quality of the resulting decision in different ways.',
    motivation: 'The project asks: for load-changing routing actions, how do improvements in current-state information and action-response model fidelity differ and interact in their effect on expected decision regret?',
    role: 'Ongoing research and development of the modeling, simulation, evaluation, and evidence workflow. The repository keeps exploratory results and their limitations separate from confirmatory claims.',
    approach: [
      'Model state information and action-response model fidelity as distinct experimental factors.',
      'Study stale telemetry, model error, queueing dynamics, and counterfactual routing decisions.',
      'Track expected decision regret and preserve predictions, experiment configurations, and result artifacts.',
      'Use simulation and controlled exploratory analysis to examine mechanisms before making broader networking claims.',
    ],
    results: [],
    evidence: 'The repository records exploratory and diagnostic results. Current status is ongoing research; no publication, novelty claim, or confirmed hypothesis is asserted here.',
    limitations: [
      'The Phase 6 result is inconclusive and calls for reformulating the predictor. Phase 7 remains exploratory.',
      'Numerical and model checks do not by themselves establish research validity or real-network generalization.',
    ],
    links: [
      { label: 'Research repository', url: 'https://github.com/vantai13/state-model-regret' },
      { label: 'Research notebook', url: 'https://github.com/vantai13/state-model-regret/tree/main/notes' },
    ],
  },
  {
    slug: 'deep-rl-routing', index: '03',
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
    slug: 'cloud-gitops', index: '04',
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
