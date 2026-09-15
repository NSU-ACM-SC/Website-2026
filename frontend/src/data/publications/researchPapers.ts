import type { ResearchPaper } from "@/types";

export const researchPapers: ResearchPaper[] = [
  {
    id: "paper-01",
    title:
      "BengaliBERT-Quant: Ultra-Low Bitrate Quantization for Bengali Transformer Models on Edge Devices",
    authors: [
      "Zarin Tasnim Promi",
      "Sadia Afrin Chowdhury",
      "Dr. Sazzad Hossain",
    ],
    conference:
      "ACM Transactions on Asian and Low-Resource Language Information Processing (TALLIP 2025)",
    year: 2025,
    abstract:
      "We introduce a 3-bit activation and weight quantization framework for low-resource Bengali transformer encoders. Our approach retains 97.4% F1-score on sentiment and named entity recognition while reducing memory footprint by 78%, enabling on-device inference on affordable Android micro-architectures.",
    coverImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&auto=format&fit=crop&q=80",
    researchGateUrl: "https://researchgate.net",
    paperUrl: "https://arxiv.org",
    githubUrl: "https://github.com/nsuacmsc/bengali-quant-edge",
    doi: "10.1145/3688192.3688204",
    tags: ["LLM Quantization", "NLP", "Bengali NLP", "Edge AI"],
    field: "Artificial Intelligence & NLP",
    citationsCount: 19,
  },
  {
    id: "paper-02",
    title:
      "Zero-Knowledge Federated Aggregation for Privacy-Preserving Health Sensor Telemetry",
    authors: ["Farhan Ishraq Khan", "Mahir Faisal Rahman", "Wasif Zaman"],
    conference:
      "IEEE International Conference on Blockchain and Cryptographic Trust (ICBC 2025)",
    year: 2025,
    abstract:
      "A lightweight zk-SNARK cryptographic aggregation protocol tailored for distributed IoT telemetry sensors. Mitigates Byzantine gradient poisoning attacks while preserving complete non-invertible patient privacy without requiring heavy homomorphic encryption overhead.",
    coverImage:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1400&auto=format&fit=crop&q=80",
    researchGateUrl: "https://researchgate.net",
    paperUrl: "https://ieeexplore.ieee.org",
    githubUrl: "https://github.com/nsuacmsc/zk-fl-telemetry",
    doi: "10.1109/ICBC.2025.1098231",
    tags: [
      "Zero-Knowledge",
      "Federated Learning",
      "IoT Security",
      "Cryptography",
    ],
    field: "Cyber Security & Cryptography",
    citationsCount: 14,
  },
  {
    id: "paper-03",
    title:
      "Automated Distributed Cache-Eviction Optimization via Graph Attention Networks",
    authors: [
      "Abrar Hossain Niloy",
      "Shafiqur Rahman Sifat",
      "Tanzimul Haque Shafi",
    ],
    conference: "ACM SIGOPS Operating Systems Review (2026)",
    year: 2026,
    abstract:
      "We formulate multi-tier microservice cache eviction as a dynamic bipartite dependency graph and propose GNN-Cache, an asynchronous neural eviction predictor yielding 22% higher hit-rates over LRU/LFU baselines under bursty web traffic distributions.",
    coverImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&auto=format&fit=crop&q=80",
    researchGateUrl: "https://researchgate.net",
    paperUrl: "https://dl.acm.org",
    githubUrl: "https://github.com/nsuacmsc/gnn-cache-optimizer",
    doi: "10.1145/3712390.3712411",
    tags: [
      "Distributed Systems",
      "Graph Neural Networks",
      "Cloud Computing",
      "Caching",
    ],
    field: "Systems & Cloud",
    citationsCount: 8,
  },
];
