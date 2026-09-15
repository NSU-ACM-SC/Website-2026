# NSU ACM Student Chapter Frontend

This is a Next.js App Router project. The codebase is organized around one rule: every file should have one clear responsibility.

## Project structure

```text
src/
├── app/                    # Routes; pages compose feature components
├── components/
│   ├── ui/                 # Generic reusable UI primitives
│   ├── events/             # Event feature components
│   ├── publications/
│   │   └── cards/          # Reusable publication card components
│   └── ...                 # Other feature-owned components
├── data/
│   ├── publications/       # One publication dataset per file
│   └── ...                 # Typed static content and configuration
├── lib/                    # Framework-independent helpers and business logic
└── types/                  # Shared domain types

public/
└── assets/                 # Images, fonts, documents, and other static files
```

## Responsibility rules

- `app/**/page.tsx` defines metadata and composes components. Avoid large UI blocks or static datasets in page files.
- `components/ui` contains domain-neutral primitives. Feature-specific UI belongs in its feature folder.
- A collection component fetches or receives data and maps it to cards. Each complex card has its own component.
- `data` contains typed content, navigation configuration, and static records. Do not place JSX or component behavior there.
- `lib` contains reusable formatting, filtering, transformation, and validation logic with no rendered markup.
- Shared domain models live in `types`; component-only prop types stay beside their component.
- Static files belong under `public/assets` and should be grouped by feature when the asset set grows.

## Import conventions

Use the `@/` alias for cross-feature imports and relative imports within the same feature:

```tsx
import { researchPapers } from "@/data/publications";
import { ResearchPaperCard } from "./cards/ResearchPaperCard";
```

Import publication data through `@/data/publications`. The legacy `@/data/publicationsData` module remains only as a compatibility barrel.

## Adding a new collection page

1. Define or extend its domain type in `src/types`.
2. Add typed records in a focused file under `src/data`.
3. Build one reusable card or row component for a single record.
4. Build a collection component that maps data to those cards and owns filters or pagination.
5. Keep the route page thin: metadata, shared navigation, and component composition only.
6. Put reusable transformations in `src/lib`, not inside a page or card.
7. Run `npm run lint` and `npm run build` before handing off.

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run format
```
