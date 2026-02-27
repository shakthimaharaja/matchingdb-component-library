# matchdb-component-library

Shared React component library for the MatchDB staffing platform. Provides Windows 97-themed UI components, design tokens, and utility functions consumed by both `matchdb-shell-ui` and `matchdb-jobs-ui`.

---

## Tech Stack

| Layer      | Technology                         |
| ---------- | ---------------------------------- |
| Runtime    | React 18 + TypeScript              |
| Styling    | CSS custom properties (W97 theme)  |
| Dev Tools  | Storybook 7, ESLint 9              |
| Bundler    | Consumed via local `file:` link    |

---

## Project Structure

```
matchingdb-component-library/
├── src/
│   ├── index.ts                       # Barrel export (all components, types, utilities)
│   ├── components/
│   │   ├── Alert/Alert.tsx            # Dismissable alert banner
│   │   ├── Badge/TypePill.tsx         # Colored pill badge (job type, status)
│   │   ├── Button/Button.tsx          # W97-themed button (raised, flat, link variants)
│   │   ├── DataTable/DataTable.tsx    # Sortable, paginated data table with flash animations
│   │   ├── FilterBar/FilterBar.tsx    # Horizontal filter chips bar
│   │   ├── Footnote/Footnote.tsx      # Footer footnote with separator
│   │   ├── Input/Input.tsx            # W97-styled text input
│   │   ├── Input/Select.tsx           # W97-styled select dropdown
│   │   ├── MatchMeter/MatchMeter.tsx  # Match score progress meter
│   │   ├── Panel/Panel.tsx            # W97 raised/sunken panel container
│   │   ├── Shimmer/Shimmer.tsx        # Loading skeleton shimmer
│   │   ├── StatBar/StatBar.tsx        # Horizontal stat indicators bar
│   │   ├── Tabs/Tabs.tsx              # W97-themed tab switcher
│   │   └── Toolbar/Toolbar.tsx        # Title bar with integrated toolbar actions
│   ├── styles/
│   │   ├── w97-theme.css              # 50+ --w97-* CSS custom properties (light + dark)
│   │   ├── w97-base.css               # Shared utility classes (.w97-raised, .w97-sunken, etc.)
│   │   └── components.css             # Component-level styles (DataTable, Panel, Toolbar, etc.)
│   └── utils/
│       └── index.ts                   # Formatting helpers, label maps, API utilities
├── .storybook/
│   ├── main.ts                        # Storybook config (webpack5, TypeScript)
│   └── preview.ts                     # Storybook global decorators
├── eslint.config.mjs
├── package.json
└── tsconfig.json
```

---

## Components

### Atomic

| Component    | Export       | Description                                            |
| ------------ | ------------ | ------------------------------------------------------ |
| Alert        | `Alert`      | Dismissable alert banner with variant styling          |
| TypePill     | `TypePill`   | Colored pill badge for job types, statuses             |
| Button       | `Button`     | W97-themed button (raised, flat, link) with sizes      |
| Input        | `Input`      | W97-styled text input                                  |
| Select       | `Select`     | W97-styled select dropdown                             |
| Shimmer      | `Shimmer`    | Loading skeleton shimmer placeholder                   |
| MatchMeter   | `MatchMeter` | Match score progress meter with color variants         |

### Compound

| Component  | Export      | Description                                              |
| ---------- | ----------- | -------------------------------------------------------- |
| DataTable  | `DataTable` | Sortable, paginated table with flash animations          |
| Toolbar    | `Toolbar`   | Title bar with integrated actions (search, buttons, CSV) |
| Tabs       | `Tabs`      | W97-themed tab switcher                                  |
| FilterBar  | `FilterBar` | Horizontal filter chip bar                               |
| StatBar    | `StatBar`   | Horizontal stat indicators bar                           |
| Panel      | `Panel`     | W97 raised/sunken panel container                        |
| Footnote   | `Footnote`  | Footer footnote with `FootnoteSep` separator             |

---

## Utilities (`src/utils/`)

| Export              | Description                                               |
| ------------------- | --------------------------------------------------------- |
| `fmtCurrency()`     | Formats a number as currency or returns "—"               |
| `fmtDate()`         | Formats an ISO date string to short readable form         |
| `fmtList()`         | Joins an array with commas or returns "—"                 |
| `fmtVal()`          | Returns a displayable value or "—"                        |
| `formatExperience()`| Formats years of experience as "N yrs"                    |
| `TYPE_LABELS`       | Map: full_time → "Full Time", contract → "Contract", etc. |
| `SUB_LABELS`        | Map: c2c → "C2C", direct_hire → "Direct Hire", etc.       |
| `authHeader()`      | Builds `{ Authorization: 'Bearer …' }` header             |
| `downloadBlob()`    | Triggers a file download from a Blob response             |

---

## Styles (`src/styles/`)

Three CSS files that consumers import directly:

```css
@import "matchdb-component-library/src/styles/w97-theme.css";
@import "matchdb-component-library/src/styles/w97-base.css";
@import "matchdb-component-library/src/styles/components.css";
```

| File             | Purpose                                                                   |
| ---------------- | ------------------------------------------------------------------------- |
| `w97-theme.css`  | 50+ `--w97-*` CSS custom properties for light & dark mode color palettes  |
| `w97-base.css`   | Shared utility classes: `.w97-raised`, `.w97-sunken`, `.w97-scroll`, etc. |
| `components.css` | Component-level styles (DataTable, Panel, Toolbar, etc.)                  |

---

## Usage

This library is consumed as a local dependency via `file:` link in both UI projects:

```json
// package.json
"dependencies": {
  "matchdb-component-library": "file:../matchingdb-component-library"
}
```

Import components and utilities:

```tsx
import { DataTable, Button, TypePill, fmtCurrency } from "matchdb-component-library";
import "matchdb-component-library/src/styles/w97-theme.css";
import "matchdb-component-library/src/styles/w97-base.css";
import "matchdb-component-library/src/styles/components.css";
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Start Storybook
npm run storybook
```

Storybook runs at **http://localhost:6006**.

---

## Scripts

| Script                     | Description                         |
| -------------------------- | ----------------------------------- |
| `npm run storybook`        | Start Storybook dev server on :6006 |
| `npm run build-storybook`  | Build static Storybook site         |
| `npm run lint`             | Run ESLint on `src/`                |
| `npm run lint:fix`         | Run ESLint with auto-fix            |
| `npm run typecheck`        | TypeScript type-check (no emit)     |
| `npm run quality`          | Run lint + typecheck                |

---

## License

MIT
