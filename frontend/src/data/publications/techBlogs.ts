import type { TechBlog } from "@/types";

export const techBlogs: TechBlog[] = [
  {
    id: "blog-01",
    title:
      "How We Built a Sub-Millisecond Contest Leaderboard Using Redis Sorted Sets and WebSockets",
    excerpt:
      "A breakdown of architectural decisions, race condition mitigations, and WebSocket multiplexing to handle thousands of concurrent contest submissions.",
    author: {
      name: "Abrar Hossain Niloy",
      role: "Lead Software Architect",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    },
    date: "September 02, 2026",
    readTime: "7 min read",
    tags: ["System Design", "Redis", "WebSockets", "Go"],
    coverImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
    slug: "sub-millisecond-contest-leaderboard",
  },
  {
    id: "blog-02",
    title:
      "Mastering Segment Trees with Lazy Propagation for Competitive Programming",
    excerpt:
      "Demystifying range queries, interval updates, coordinate compression, and persistent segment trees with clear C++ template implementations.",
    author: {
      name: "Kazi Rayhan Uddin",
      role: "Senior Contest Coach",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    },
    date: "August 20, 2026",
    readTime: "11 min read",
    tags: ["Algorithms", "Data Structures", "ICPC", "C++"],
    coverImage:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80",
    slug: "segment-trees-lazy-propagation",
  },
  {
    id: "blog-03",
    title:
      "Zero-Day Discovery 101: Memory Corruption and Stack Buffer Overflows on x86_64",
    excerpt:
      "A practical guide to analyzing vulnerable C binaries using GDB-Peda, calculating stack offsets, and constructing ROP chains in safe lab environments.",
    author: {
      name: "Farhan Ishraq Khan",
      role: "R&D Group Lead",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    },
    date: "July 28, 2026",
    readTime: "9 min read",
    tags: ["CyberSec", "Binary Exploitation", "Reverse Engineering", "Linux"],
    coverImage:
      "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80",
    slug: "zero-day-discovery-memory-corruption",
  },
];
