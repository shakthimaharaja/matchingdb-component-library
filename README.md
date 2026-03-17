# matchdb-component-library

Shared React component library for the MatchDB staffing platform. Provides Windows 97-themed UI components, design tokens, and utility functions consumed by both `matchdb-shell-ui` and `matchdb-jobs-ui`.

---

## Tech Stack

| Layer     | Technology                        |
| --------- | --------------------------------- |
| Runtime   | React 18 + TypeScript             |
| Styling   | CSS custom properties (W97 theme) |
| Dev Tools | Storybook 7, ESLint 9             |
| Bundler   | Consumed via local `file:` link   |

---

## Project Structure

```
matchingdb-component-library/
├── src/
│   ├── index.ts                       # Barrel export (all components, types, utilities)
│   ├── components/
│   │   ├── Alert/Alert.tsx            # Dismissable alert banner
│   │   │   └── Alert.stories.tsx      # Storybook stories
│   │   ├── Badge/TypePill.tsx         # Colored pill badge (job type, status)
│   │   │   └── TypePill.stories.tsx
│   │   ├── Button/Button.tsx          # W97-themed button (raised, flat, link variants)
│   │   │   └── Button.stories.tsx
│   │   ├── DataTable/DataTable.tsx    # Sortable, paginated data table with flash animations
│   │   │   └── DataTable.stories.tsx
│   │   ├── FilterBar/FilterBar.tsx    # Horizontal filter chips bar
│   │   │   └── FilterBar.stories.tsx
│   │   ├── Footnote/Footnote.tsx      # Footer footnote with separator
│   │   │   └── Footnote.stories.tsx
│   │   ├── Input/Input.tsx            # W97-styled text input
│   │   │   ├── Input.stories.tsx
│   │   │   ├── Select.tsx             # W97-styled select dropdown
│   │   │   └── Select.stories.tsx
│   │   ├── MatchMeter/MatchMeter.tsx  # Match score progress meter
│   │   │   └── MatchMeter.stories.tsx
│   │   ├── Panel/Panel.tsx            # W97 raised/sunken panel container
│   │   │   └── Panel.stories.tsx
│   │   ├── Shimmer/Shimmer.tsx        # Loading skeleton shimmer
│   │   │   └── Shimmer.stories.tsx
│   │   ├── StatBar/StatBar.tsx        # Horizontal stat indicators bar
│   │   │   └── StatBar.stories.tsx
│   │   ├── Tabs/Tabs.tsx              # W97-themed tab switcher
│   │   │   └── Tabs.stories.tsx
│   │   └── Toolbar/Toolbar.tsx        # Title bar with integrated toolbar actions
│   │       └── Toolbar.stories.tsx
│   ├── styles/
│   │   ├── w97-theme.css              # 50+ --w97-* CSS custom properties (light + dark)
│   │   ├── w97-base.css               # Shared utility classes (.w97-raised, .w97-sunken, etc.)
│   │   └── components.css             # Component-level styles + utility CSS classes
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

| Component  | Export       | Description                                       |
| ---------- | ------------ | ------------------------------------------------- |
| Alert      | `Alert`      | Dismissable alert banner with variant styling     |
| TypePill   | `TypePill`   | Colored pill badge for job types, statuses        |
| Button     | `Button`     | W97-themed button (raised, flat, link) with sizes |
| Input      | `Input`      | W97-styled text input                             |
| Select     | `Select`     | W97-styled select dropdown                        |
| Shimmer    | `Shimmer`    | Loading skeleton shimmer placeholder              |
| MatchMeter | `MatchMeter` | Match score progress meter with color variants    |

### Compound

| Component | Export      | Description                                              |
| --------- | ----------- | -------------------------------------------------------- |
| DataTable | `DataTable` | Sortable, paginated table with flash animations          |
| Toolbar   | `Toolbar`   | Title bar with integrated actions (search, buttons, CSV) |
| Tabs      | `Tabs`      | W97-themed tab switcher                                  |
| FilterBar | `FilterBar` | Horizontal filter chip bar                               |
| StatBar   | `StatBar`   | Horizontal stat indicators bar                           |
| Panel     | `Panel`     | W97 raised/sunken panel container                        |
| Footnote  | `Footnote`  | Footer footnote with `FootnoteSep` separator             |

---

## Utilities (`src/utils/`)

| Export               | Description                                               |
| -------------------- | --------------------------------------------------------- |
| `fmtCurrency()`      | Formats a number as currency or returns "—"               |
| `fmtDate()`          | Formats an ISO date string to short readable form         |
| `fmtList()`          | Joins an array with commas or returns "—"                 |
| `fmtVal()`           | Returns a displayable value or "—"                        |
| `formatExperience()` | Formats years of experience as "N yrs"                    |
| `TYPE_LABELS`        | Map: full_time → "Full Time", contract → "Contract", etc. |
| `SUB_LABELS`         | Map: c2c → "C2C", direct_hire → "Direct Hire", etc.       |
| `authHeader()`       | Builds `{ Authorization: 'Bearer …' }` header             |
| `downloadBlob()`     | Triggers a file download from a Blob response             |

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
| `components.css` | Component-level styles + utility CSS classes (see below)                  |

### Utility CSS Classes (in `components.css`)

Use these instead of inline `style={{}}`:

| Class                               | CSS                                                                  |
| ----------------------------------- | -------------------------------------------------------------------- |
| `.u-flex`                           | `display: flex`                                                      |
| `.u-flex-col`                       | `display: flex; flex-direction: column`                              |
| `.u-flex-center`                    | `display: flex; align-items: center`                                 |
| `.u-flex-wrap`                      | `display: flex; flex-wrap: wrap`                                     |
| `.u-flex-between`                   | `display: flex; justify-content: space-between; align-items: center` |
| `.u-gap-2/4/6/8/12/16`              | `gap: Npx`                                                           |
| `.u-fs-10/11/12/13/14`              | `font-size: Npx`                                                     |
| `.u-fw-600/700/800`                 | `font-weight: N`                                                     |
| `.u-color-text-secondary`           | `color: var(--w97-text-secondary)`                                   |
| `.u-color-navy/blue/teal/green/red` | Theme color text                                                     |
| `.u-mb-4/8/12`                      | `margin-bottom: Npx`                                                 |
| `.matchdb-skill-row`                | Flex row for skill pills                                             |
| `.matchdb-action-row`               | Flex row for action buttons                                          |
| `.matchdb-detail-label`             | Bold secondary-color label                                           |

### Storybook

Every component has a `.stories.tsx` file with interactive examples. Run `npm run storybook` to browse at http://localhost:6006.

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
import {
  DataTable,
  Button,
  TypePill,
  fmtCurrency,
} from "matchdb-component-library";
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

| Script                    | Description                         |
| ------------------------- | ----------------------------------- |
| `npm run storybook`       | Start Storybook dev server on :6006 |
| `npm run build-storybook` | Build static Storybook site         |
| `npm run lint`            | Run ESLint on `src/`                |
| `npm run lint:fix`        | Run ESLint with auto-fix            |
| `npm run typecheck`       | TypeScript type-check (no emit)     |
| `npm run quality`         | Run lint + typecheck                |

---

## License

MIT
