# 🚀 NSU ACM Student Chapter (NSU ACM SC) — Public Web Platform

[![Version](https://img.shields.io/badge/version-1.0.0-orange.svg?style=for-the-badge)](https://github.com/NSU-ACM-SC/Website-2026)
[![Next.js](https://img.shields.io/badge/Next.js-16%2B%20App%20Router-black.svg?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0%2B-61DAFB.svg?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-3178C6.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC.svg?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![ACM Charter](https://img.shields.io/badge/ACM%20Charter-%2392841-blue.svg?style=for-the-badge)](https://acm.org)
[![License](https://img.shields.io/badge/License-MIT-purple.svg?style=for-the-badge)](./LICENSE)

The official public web platform for the **North South University ACM Student Chapter ("NSU ACM SC")**, chartered under the Association for Computing Machinery (ACM Headquarters, New York, Chapter #92841) and based in the Department of Electrical & Computer Engineering at North South University (NSU), Dhaka, Bangladesh.

Built with a bold **Neo-Brutalist & Editorial** design aesthetic, high-velocity performance (Next.js 16 App Router + Turbopack + React 19), responsive interactive data components, custom cursor interactions, animated chapter introduction loader, and comprehensive deep section routing.

---

## 🎨 Design System & Neo-Brutalist Aesthetic

The user interface implements an authentic Neo-Brutalist and Editorial visual language tailored for computing innovators and academic excellence:

- **Structural Integrity**: High-contrast heavy borders (`border-2` / `border-[3px] border-black`), offset hard drop shadows (`shadow-[3px_3px_0_#3392cc]`, `shadow-[6px_6px_0_#000]`), sharp rectangular geometries, and sticker-style badges.
- **Micro-Interactions & Motion**: Hover translations (`hover:-translate-y-0.5`), tactile clicks, subtle rotation effects on brand logos, and GSAP/CSS animations.
- **Interactive Cursor & Loader**: Custom canvas-based `TargetCursor` with parallax tracking and a seamless `ChapterIntro` word preloader for initial page loads.
- **Typography Matrix**:
  - **Headings & Accents**: `Inter` / Modern Grotesque display styling with heavy tracking and uppercase accents.
  - **Body / Content**: Balanced editorial typography optimized for readability across devices.
  - **Data / Badges**: Monospaced and tabular accents for timestamps, IDs, and tags.

### Color Palette

| Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Canvas Background** | `#f1eee7` | Warm off-white page background |
| **Dark Primary** | `#000000` | High-contrast borders, headers, and text |
| **Accent Orange** | `#f47b2b` | Primary CTAs, hover states, and highlights |
| **ACM Cyan Blue** | `#3392cc` | Global chapter affiliation, accents, and badge shadows |
| **Electric Purple** | `#5227FF` | Active focus rings, research highlights, and links |
| **Mint Green** | `#00D084` | Live status, achievement badges, and verified markers |

---

## 🧭 Page & Route Architecture

### 1. 🚀 Global Navigation & Layout
- **Fixed Neo-Brutalist Header**: Sticky navbar styled with a `max-w-7xl` container, tactile logo, and dropdown menus for complex sections.
  - Structure: `Home` → `About` → `Activities` (dropdown) → `Publications` (dropdown) → `Teams & SIGs` → `Members` (dropdown) → `Contact Us`.
- **Target Cursor**: Custom interactive target cursor with spin and parallax response.
- **Site Footer**: Comprehensive footer with quick navigation links, chapter coordinates, social dock, and member portal link.

---

### 2. 🏠 Home Experience (`/`)
- **Hero Section**: Bold typographic intro with quick action CTAs linking to About (`/about`) and Membership (`/join`).
- **Quick Stats & Chapter Impact**: Interactive metric counters highlighting members, events, research publications, and alumni.
- **Why NSU ACM SC**: 6-pillar breakdown detailing project building, research mentorship, special interest groups, workshops, technical resources, and community networking.
- **Campus Location Map**: Interactive campus locator highlighting NSU Bashundhara Campus coordinates and facilities.

---

### 3. 📖 About the Chapter (`/about`)
- **Mission & Vision**: Foundational goals of NSU ACM SC in advancing computing education, research, and industry leadership.
- **Historical Milestones & Charter**: Timeline tracing chapter achievements, student breakthroughs, and ACM HQ chartering.

---

### 4. 📅 Activities & Events (`/activities`)
- **Main Hub (`/activities`)**: Overview of chapter initiatives, workshops, and flagship competitions.
- **Events (`/activities/events` & `/activities/events/[slug]`)**: Upcoming and past events, registration details, speaker dossiers, and detailed slug-based event write-ups.
- **Calendar (`/activities/calender`)**: Month-by-month timeline and schedule of upcoming seminars and hackathons.
- **Achievements (`/activities/achievements` & `/activities/achievements/[slug]`)**: National and international competitive programming podiums, hackathon awards, and research accolades.

---

### 5. 📚 Publications & Research (`/publications`)
- **Main Hub (`/publications`)**: Gateway to research, projects, technical blogs, and chapter media.
- **Research Papers (`/publications/researchs` & `[slug]`)**: Published student and faculty research papers with abstract viewer, citations, and DOI links.
- **Open-Source Projects (`/publications/projects` & `[slug]`)**: Chapter software repositories, developer tools, and live demonstrations.
- **Blogs (`/publications/blogs` & `[slug]`)**: In-depth technical articles and tutorials authored by members.
- **News (`/publications/news` & `[slug]`)**: Press coverage and campus updates.
- **Magazines (`/publications/megazines` & `[slug]`)**: Digital editions of the NSU ACM SC chronicle and magazines.
- **Gallery (`/publications/gallery`)**: Curated event photographs and visual archives.
- **Toolkits (`/publications/toolkits` & `[slug]`)**: Brand assets, chapter logos, color palettes, and developer toolkits.
- **Learning Resources (`/publications/learningResources` & `[slug]`)**: Worksheets, roadmap guides, and starter kits.

---

### 6. 👥 Teams & SIGs (`/teams&sig`)
- **Main Hub (`/teams&sig`)**: Overview of operational wings and technical Special Interest Groups.
- **Sub-Teams (`/teams&sig/team` & `/teams&sig/[slug]`)**: Detailed rosters and objectives for Corporate, Promotion, Provision, Web, Design, R&D, and other operational groups.
- **Special Interest Groups (`/teams&sig/sig`)**: Specialized technical divisions (AI/ML, Cyber Security, Competitive Programming, Software Engineering, Hardware/Robotics).

---

### 7. 📋 Members Directory (`/members`)
- **Main Directory (`/members`)**: Searchable and filterable roster with direct profile view options.
- **Filtered Category Views**:
  - `/members/panels` (Executive Committee & Panel)
  - `/members/core` (Core Wing Leaders & Coordinators)
  - `/members/members(non-core)` (Active Chapter Members)
  - `/members/alumni` (Graduated Alumni Network)
  - `/members/allMembers` (Comprehensive searchable master directory)
- **Member Dossier (`/members/[id]`)**: Individual member profiles featuring bios, roles, contributions, and social links.

---

### 8. 🛡️ Additional Routes
- **Certificate Verification (`/certificates`)**: Public certificate verification utility.
- **Membership Application (`/join`)**: Interactive recruitment gateway and onboarding guide.
- **Contact & FAQs (`/contact`)**: Categorized accordion FAQs, newsletter subscription, and direct inquiry forms.

---

## 🛠️ Tech Stack & Dependencies

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) with Turbopack |
| **Core Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5+](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & Custom Neo-Brutalist CSS |
| **Animations & FX** | [GSAP](https://gsap.com/) & [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Utilities** | `clsx`, `tailwind-merge` |

---

## 📁 Directory Structure

```
web-2026/
├── frontend/
│   ├── public/
│   │   └── assets/                  # Logos, badges, and static imagery
│   ├── src/
│   │   ├── app/
│   │   │   ├── about/               # About page route
│   │   │   ├── activities/          # Events, Calendar, Achievements & slugs
│   │   │   ├── certificates/        # Certificate verification route
│   │   │   ├── contact/             # Contact Us, FAQs & Newsletter
│   │   │   ├── join/                # Member recruitment gateway
│   │   │   ├── members/             # Master directory, panels, core, alumni & [id]
│   │   │   ├── publications/        # Research, projects, blogs, magazines & toolkits
│   │   │   ├── teams&sig/           # Operational teams, SIGs & dynamic slugs
│   │   │   ├── editorial.css        # Neo-brutalist / editorial layout styles
│   │   │   ├── globals.css          # Global theme tokens & base styles
│   │   │   ├── layout.tsx           # RootLayout with Navbar, Footer, TargetCursor
│   │   │   ├── loading.tsx          # App suspense boundary fallback
│   │   │   ├── not-found.tsx        # 404 handler
│   │   │   └── page.tsx             # Home landing page
│   │   ├── components/
│   │   │   ├── contact/             # ContactForm, FAQAccordion, Newsletter, SocialDock
│   │   │   ├── cursor/              # TargetCursor interactive pointer
│   │   │   ├── events/              # EventShowcase, EventCalendar, PressCoverage, etc.
│   │   │   ├── footer/              # Site footer
│   │   │   ├── home/                # HeroSection, QuickStats, WhyNSUACM, CampusLocationMap
│   │   │   ├── loader/              # ChapterIntro animated preloader
│   │   │   ├── members/             # MemberDirectory, MemberTable, etc.
│   │   │   ├── navbar/              # Navbar & PillNavbar responsive components
│   │   │   ├── publications/        # ResearchPapers, Projects, Blogs, Magazines, Toolkits
│   │   │   ├── teams/               # ExecutiveBoard, SIGCardGrid, TeamLists
│   │   │   └── ui/                  # Buttons, Badges, Cards, SectionTitles, SocialIcons
│   │   ├── data/
│   │   │   ├── contactData.ts
│   │   │   ├── eventsData.ts
│   │   │   ├── faqsData.ts
│   │   │   ├── memberGroups.ts
│   │   │   ├── membersData.ts
│   │   │   ├── navigationData.ts
│   │   │   ├── publications/        # Dedicated data files for research, blogs, etc.
│   │   │   ├── siteContent.ts
│   │   │   ├── statsData.ts
│   │   │   └── teamsData.ts
│   │   ├── lib/                     # Helper utilities (navigation, styling)
│   │   └── types/                   # Strict TypeScript definitions & data models
│   ├── package.json
│   ├── next.config.ts
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

- `npm run dev`: Starts the Next.js development server with Webpack.
- `npm run dev:turbo`: Starts the Next.js development server with Turbopack.
- `npm run build`: Compiles TypeScript and creates an optimized static production build.
- `npm run start`: Starts the Next.js production server.
- `npm run lint`: Runs ESLint to check for code quality and standards.
- `npm run format`: Automatically formats files using Prettier.
- `npm run format:check`: Validates file formatting with Prettier without modifying.

---

## 🌐 Deployment

This application is optimized for static export / server rendering on **Vercel**, **Cloudflare Pages**, or any modern Node.js platform:

```bash
cd frontend
npm run build
```

Set the root directory to `frontend` in your deployment provider settings.

---

## 🤝 Contributing

We welcome contributions from NSU ACM SC members, alumni, and open-source contributors!

1. Fork the Project Repository.
2. Create your Feature Branch (`git checkout -b feature/NewFeature`).
3. Commit your Changes (`git commit -m 'feat: add interactive calendar filter'`).
4. Push to the Branch (`git push origin feature/NewFeature`).
5. Open a Pull Request.

---

## 📜 License & Governance

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for full licensing information.

Chartered by the **Association for Computing Machinery (ACM)** — Chapter #92841.  
Maintained with ❤️ by the **NSU ACM SC Technical Wing**.