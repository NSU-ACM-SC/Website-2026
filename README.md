# 🚀 NSU ACM Student Chapter (NSU ACM SC) — Public Web Platform

[![Version](https://img.shields.io/badge/version-1.0.0-orange.svg?style=for-the-badge)](https://github.com/NSU-ACM-SC/Website-2026)
[![Next.js](https://img.shields.io/badge/Next.js-15%2B%20App%20Router-black.svg?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-3178C6.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC.svg?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![ACM Charter](https://img.shields.io/badge/ACM%20Charter-%2392841-blue.svg?style=for-the-badge)](https://acm.org)
[![License](https://img.shields.io/badge/License-MIT-purple.svg?style=for-the-badge)](./LICENSE)

The official next-generation public web platform for the **North South University ACM Student Chapter ("NSU ACM SC")**, chartered under the Association for Computing Machinery (ACM Headquarters, New York, Chapter #92841) and based in the Department of Electrical & Computer Engineering at North South University (NSU), Dhaka, Bangladesh.

Built with a bold **Neo-Brutalist / Modern Grotesque** design aesthetic, high-velocity performance, responsive interactive data components, and comprehensive deep section routing.

---

## 🎨 Design System & Neo-Brutalist Aesthetic

The user interface implements an authentic Neo-Brutalist visual language tailored for computing innovators:
- **Structural Integrity**: Heavy borders (`border-[3px] border-black`), offset hard drop shadows (`shadow-[4px_4px_0px_0px_#000]`), sharp rectangular geometries, and sticker-style badges.
- **Dynamic Interactions**: Micro-hover elevations (`translate-y-[-2px]`), tactile active clicks, and dot-matrix/halftone grid background textures.
- **Typography Matrix**:
  - **Display / Headings**: Google Fonts `Syne` & `Space Grotesk` (high-impact grotesque sans-serif).
  - **Body / Content**: Google Fonts `Plus Jakarta Sans` (optimized for readability).
  - **Data / Metrics**: Monospaced tabular accents.

### Color Palette

| Token | Hex Code | Preview | Purpose |
| :--- | :--- | :---: | :--- |
| **Canvas Background** | `#f1eee7` | `■` | Warm off-white page background |
| **Dark Primary** | `#000000` | `■` | Pure black borders, headers, and text |
| **Accent Orange** | `#f47b2b` | `■` | Primary CTAs, status badges, and highlights |
| **ACM Cyan Blue** | `#3392cc` | `■` | Global chapter affiliation, metrics, and links |
| **Electric Purple** | `#5227FF` | `■` | Research badges, SIGAI accents, and headers |
| **Gold Yellow** | `#FFDE59` | `■` | Announcement banners and active tab states |
| **Mint Green** | `#00D084` | `■` | Live operational status and verified markers |

---

## 🧭 Page & Section Architecture

### 1. 🚀 Floating "Pill Nav" Header & Global Layout
- **Floating Pill Header**: Sticky navigation bar with blur backdrop, active route pills, and mobile sliding drawer.
- **Mega Dropdown Menus**: Instant deep links into specific subsections on all desktop viewports.
- **Header Action CTA**: Primary portal button linking directly to the centralized student management dashboard (`https://dash.nsuacmsc.org`).

---

### 2. 🏠 Home Experience (`/`)
- **Overview & Hero Section**:
  - High-impact headline banner (`CODE. RESEARCH. DOMINATE. SCALE.`).
  - Chapter charter ticker and interactive video modal showcase.
  - Quick action buttons to explore flagship hackathons or access the member portal.
- **Quick Metrics & Impact**: Real-time counter metrics for 1,250+ active members, 180+ events, 45+ peer-reviewed papers, and 600+ alumni network.
- **Why NSU ACM SC**: 6-pillar breakdown highlighting ACM Digital Library access, research grants, 5 technical SIG cohorts, national hackathon prize pools, and Big Tech alumni placement.
- **Interactive Campus Location Map**:
  - Stylized Neo-brutalist interactive grid locator for NSU Bashundhara Campus (Plot 15, Block B, Dhaka-1229).
  - Interactive floor pins for SAC Room 402 (Chapter HQ), ECE Innovation Labs & Makerspace (Level 6 & 8), and Auditorium 801 (Contest Arena).

---

### 3. 👥 Teams & SIGs (`/teams`)
- **Executive Board & Sub-Team Roster**:
  - Committee member cards with photos, NSUIDs, department affiliations, tenure badges, quotes, and social channels.
  - Interactive switcher between Executive Committee (2025–2026) and Sub-Team Operational Leads.
- **History & Chapter Milestones**:
  - Comprehensive timeline spanning official 2014 chartering, National Tech Carnivals, ACM-W expansion, ICPC World Finals representation, and open cloud incubator deployments.
- **Special Interest Groups (SIG Cards)**:
  - **SIGAI**: Artificial Intelligence, LLMs & Computer Vision.
  - **SIGSAC**: Cyber Security, CTF, Reverse Engineering & Cryptography.
  - **SIGACT**: Competitive Programming & Advanced Algorithms.
  - **SIGSOFT**: Software Engineering, Distributed Systems & Cloud-Native.
  - **SIGBED**: Embedded Systems, ROS2 Robotics & Hardware IoT.
  - Complete with weekly meeting schedules, project counts, lead contacts, and join triggers.

---

### 4. 📋 Member Directory & Public Roster (`/members`)
- **Real-Time Search & Multi-Filter Engine**:
  - Live query filtering across Name, NSUID, IEEE/ACM ID, Email, and Position.
  - Multi-select filters for **Team Wing**, **SIG Focus**, **Blood Group Registry**, and **Status**.
- **Responsive Table View**:
  - Columns: `SL No`, `IEEE / ACM ID`, `NSUID`, `Name & Position`, `NSU Email`, `SIG Wing`, `Blood Group`, and Actions.
  - 1-click clipboard email copy, verified records indicator, and direct mail compose triggers.
- **One-Click CSV Export**: Instant client-side export of filtered member directories for operational records.

---

### 5. 📅 Events & Activities (`/events`)
- **Flagship Hackathon Showcase (HackStorm 2026)**:
  - 36-hour non-stop national hackathon banner with countdown status, registration capacity trackers (382 / 450 registered), speakers, and BDT 500,000+ prize pool breakdown.
- **Interactive Event Manager & Calendar**:
  - Interactive month switcher, schedule cards, event dossiers, and `.ics` / calendar sync trigger.
- **Photo & Video Masonry Gallery**:
  - Responsive masonry grid with category filters (Hackathon, Workshop, Contest, Social, Hardware).
  - Fullscreen interactive **Lightbox Modal Preview**.
- **Press & Media Coverage**: National newspapers (The Daily Star, Dhaka Tribune, TBS) and global summit award features.

---

### 6. 📚 Publications & Research (`/publications`)
- **Research Papers Showcase**:
  - Peer-reviewed conference papers in ACM, IEEE, and ACL proceedings.
  - Title, author lists, conference info, abstracts, citation copy utility, and links to **IEEE/ACM DL**, **ResearchGate**, and **GitHub replication code**.
- **Project Portfolio Cards**:
  - Open-source software tools, CLI auditors, ASR models, and drone hubs with GitHub star/fork counters and live demos.
- **Tech Blogs & Tutorials**:
  - Engineering deep dives on Redis WebSockets, Segment Trees, and binary exploitation with author details and reading times.
- **NSU ACM SC Chronicle (PDF Magazines)**:
  - Downloadable biannual issues with cover previews, edition highlights, and download notifications.

---

### 7. 📬 Contact & Community (`/contact`)
- **FAQ Accordion & Knowledge Base**: Searchable accordion categorized by General, Membership, SIGs, Events, and Research.
- **Bi-Weekly Newsletter Dispatch**: Interactive email subscription component for event notifications and research cohorts.
- **Official Contact Form**: Department-routed messaging form (Executive Committee, HackStorm Sponsorship, SIG Cohorts, Portal Support) with direct campus office hours and HQ coordinates.

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: [Next.js 15+ (App Router)](https://nextjs.org/)
- **Language**: [TypeScript 5+](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG Social Icons
- **Class Utilities**: `clsx`, `tailwind-merge`
- **Effects**: `canvas-confetti`

---

## 📁 Directory Structure

```
web-2026/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx            # Global RootLayout (Navbar, Footer, SEO, Fonts)
│   │   │   ├── page.tsx              # Home Route
│   │   │   ├── teams/page.tsx        # Teams, Executive Board, History & SIGs
│   │   │   ├── members/page.tsx      # Public Member Directory & Table
│   │   │   ├── events/page.tsx       # HackStorm, Calendar, Masonry & Press
│   │   │   ├── publications/page.tsx # Research Papers, Projects, Blogs & PDFs
│   │   │   ├── contact/page.tsx      # Contact Form, FAQs & Newsletter
│   │   │   └── globals.css           # Neo-Brutalist Theme Tokens & Grid Patterns
│   │   ├── components/
│   │   │   ├── navbar/
│   │   │   │   └── PillNavbar.tsx    # Floating Pill Header with Dropdowns
│   │   │   ├── footer/
│   │   │   │   └── Footer.tsx        # Neo-Brutalist Footer & Social Matrix
│   │   │   ├── home/
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── QuickStats.tsx
│   │   │   │   ├── WhyNSUACM.tsx
│   │   │   │   └── CampusLocationMap.tsx
│   │   │   ├── teams/
│   │   │   │   ├── ExecutiveBoard.tsx
│   │   │   │   ├── HistoryMission.tsx
│   │   │   │   └── SIGCardGrid.tsx
│   │   │   ├── members/
│   │   │   │   ├── MemberDirectory.tsx
│   │   │   │   └── MemberTable.tsx
│   │   │   ├── events/
│   │   │   │   ├── EventShowcase.tsx
│   │   │   │   ├── EventCalendar.tsx
│   │   │   │   ├── MasonryGallery.tsx
│   │   │   │   └── PressCoverage.tsx
│   │   │   ├── publications/
│   │   │   │   ├── ResearchPaperCards.tsx
│   │   │   │   ├── ProjectPortfolio.tsx
│   │   │   │   ├── TechBlogGrid.tsx
│   │   │   │   └── MagazineShowcase.tsx
│   │   │   ├── contact/
│   │   │   │   ├── FAQAccordion.tsx
│   │   │   │   ├── NewsletterSubscribe.tsx
│   │   │   │   └── ContactForm.tsx
│   │   │   └── ui/
│   │   │       ├── NeoButton.tsx
│   │   │       ├── NeoBadge.tsx
│   │   │       ├── NeoCard.tsx
│   │   │       ├── SectionHeading.tsx
│   │   │       └── SocialIcons.tsx
│   │   ├── data/
│   │   │   ├── membersData.ts
│   │   │   ├── teamsData.ts
│   │   │   ├── eventsData.ts
│   │   │   ├── publicationsData.ts
│   │   │   ├── faqsData.ts
│   │   │   └── statsData.ts
│   │   ├── lib/
│   │   │   └── utils.ts
│   │   └── types/
│   │       └── index.ts              # Strict TypeScript Interfaces
│   ├── public/
│   ├── package.json
│   ├── next.config.ts
│   ├── postcss.config.mjs
│   └── tsconfig.json
├── README.md
└── LICENSE
```

---

## ⚡ Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) version **18.18.0** or higher
- [npm](https://www.npmjs.com/) / `yarn` / `pnpm`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/NSU-ACM-SC/Website-2026.git
   cd Website-2026/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view the live platform.

---

## 📦 Available Scripts

Inside the `frontend/` directory, you can run:

- `npm run dev`: Starts the Next.js development server with hot-module replacement on port 3000.
- `npm run build`: Compiles the TypeScript code and creates an optimized static production bundle.
- `npm run start`: Starts the Next.js production server.
- `npm run lint`: Runs ESLint to inspect code quality and ensure adherence to rules.

---

## 🌐 Deployment

This application is ready to deploy on **Vercel**, **Cloudflare Pages**, or any Node.js hosting platform:

```bash
cd frontend
npm run build
```

Set the root directory to `frontend` in your deployment dashboard settings.

---

## 🤝 Contributing

We welcome contributions from NSU ACM SC members, alumni, and open-source enthusiasts!

1. Fork the Project Repository.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'feat: Add new SIG workshop card'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📜 License & Governance

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for full licensing information.

Chartered by the **Association for Computing Machinery (ACM)** — Chapter #92841.  
Maintained with ❤️ by the **NSU ACM SC Technical & Research Wings**.