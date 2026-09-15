import type { ProjectItem } from "@/types";

export const projectPortfolio: ProjectItem[] = [
  {
    id: "proj-01",
    title: "ACM Portal & Automation Suite (dash.nsuacmsc.org)",
    description:
      "Full-stack member management, automated event ticketing, QR check-in, and member certification generation platform powering 1000+ active chapter delegates.",
    category: "Web & Cloud",
    tags: ["Next.js 15", "TypeScript", "PostgreSQL", "Tailwind CSS", "Redis"],
    authors: ["Technical Sub-team", "Abrar Hossain Niloy", "Shafiqur Sifat"],
    githubUrl: "https://github.com/nsuacmsc/member-portal",
    liveUrl: "https://dash.nsuacmsc.org",
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    stars: 142,
    forks: 38,
    featured: true,
  },
  {
    id: "proj-02",
    title: "ProtoBongo: Open Bengali Speech Synthesis & ASR Engine",
    description:
      "An open weights End-to-End Bengali automatic speech recognition model with real-time browser WebAssembly inference and voice command triggers.",
    category: "AI & ML",
    tags: ["PyTorch", "Whisper", "Wasm", "FastAPI", "HuggingFace"],
    authors: ["R&D Group Cohort", "Zarin Promi", "Anika Shreya"],
    githubUrl: "https://github.com/nsuacmsc/protobongo-asr",
    liveUrl: "https://huggingface.co/spaces/nsuacmsc/protobongo",
    coverImage:
      "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800&auto=format&fit=crop&q=80",
    stars: 289,
    forks: 71,
    featured: true,
  },
  {
    id: "proj-03",
    title: "SentinelGuard: Automated Cloud Security Posture Auditor",
    description:
      "Open-source CLI and dashboard for scanning AWS, Azure, and GCP architectures against CIS benchmarks with automatic Terraform drift remediation.",
    category: "CyberSec & Systems",
    tags: ["Go", "Kubernetes", "Terraform", "Docker", "Security"],
    authors: ["R&D Group Red Team", "Farhan Khan", "Wasif Zaman"],
    githubUrl: "https://github.com/nsuacmsc/sentinel-guard",
    coverImage:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
    stars: 94,
    forks: 22,
    featured: false,
  },
  {
    id: "proj-04",
    title: "AeroTelemetry: Autonomous Drone Sensor Hub",
    description:
      "ESP32-S3 and ROS2 based sensor aggregation hub for autonomous quadcopters with LiDAR obstacle mapping and 4G remote telemetry downlink.",
    category: "Robotics & IoT",
    tags: ["C++", "ROS 2", "ESP32", "LiDAR", "Hardware"],
    authors: ["R&D Group Robotics", "Ahsan Habib Rifat", "Tanvir Siam"],
    githubUrl: "https://github.com/nsuacmsc/aero-telemetry-hub",
    coverImage:
      "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80",
    stars: 67,
    forks: 15,
    featured: false,
  },
];
