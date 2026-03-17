# MatchDB Component Library — Copilot Rules

## Project Overview

This is the **shared component library** for the MatchDB platform. It provides Win97-styled React components, CSS design tokens, and utility functions used by both Shell UI and Jobs UI. Components are documented via **Storybook** (port 6006).

**Stack:** React 18, TypeScript, CSS (custom properties), Storybook 7

---

## Scripts

| Command                   | Purpose                                 |
| ------------------------- | --------------------------------------- |
| `npm run storybook`       | Start Storybook dev server on port 6006 |
| `npm run build-storybook` | Build static Storybook                  |
| `npm run lint`            | ESLint check                            |
| `npm run lint:fix`        | ESLint auto-fix                         |
| `npm run typecheck`       | TypeScript type check                   |
| `npm run quality`         | Lint + typecheck combined               |

## Running Storybook

```powershell
cd matchingdb-component-library
npm run storybook
```

Or use the VS Code task: **"6. Storybook — Component Library (port 6006)"**

## Committing & Pushing

```powershell
.\push-all.ps1
```

---

## Code Conventions

### File Structure

```
src/
  index.ts            # Barrel export — all components, types, utilities
  components/         # One folder per component
    Button/
      Button.tsx        # Component implementation
      Button.stories.tsx # Storybook story
    DataTable/
      DataTable.tsx
      DataTable.stories.tsx
    ...
  styles/             # Global CSS design tokens
    w97-theme.css       # CSS custom properties (Win97 theme)
    w97-base.css        # Base/reset styles
    components.css      # Shared component CSS classes
    aws-theme.css       # AWS dark theme override
  utils/              # Shared utility functions
```

### Naming

- Component folders: `PascalCase/` (e.g., `Button/`, `DataTable/`)
- Component files: `{ComponentName}.tsx`
- Story files: `{ComponentName}.stories.tsx`
- CSS files: In `styles/` directory, kebab-case

### Component Guidelines

- Every component must have a Storybook story
- Export from `src/index.ts` barrel
- Export both the component and its Props type
- Use CSS custom properties from `w97-theme.css` — never hardcode colors
- No inline styles in components — use CSS classes from `styles/components.css`
- All interactive elements must have proper ARIA attributes

### CSS Design Tokens (w97-theme.css)

Key variables: `--w97-blue`, `--w97-green`, `--w97-red`, `--w97-yellow`, `--w97-teal`, `--w97-bg`, `--w97-window`, `--w97-panel-bg`, `--w97-border`, `--w97-text`, `--w97-text-secondary`, `--w97-titlebar-from`, `--w97-sky`

### Storybook

- Stories use CSF3 format (Component Story Format)
- Each story file includes a `default` meta export and named story exports
- Preview imports `w97-theme.css` and `w97-base.css` globally
- Use `args` for interactive controls

### Adding a New Component

1. Create `src/components/{Name}/{Name}.tsx`
2. Create `src/components/{Name}/{Name}.stories.tsx`
3. Export from `src/index.ts`
4. Add relevant CSS classes to `styles/components.css`

---

## Current Components

| Component      | Description                                     |
| -------------- | ----------------------------------------------- |
| Alert          | Status messages (info, success, warning, error) |
| Badge/TypePill | Colored status/type pills                       |
| Button         | Win97-styled button with variants               |
| DataTable      | Paginated data table with skeleton loading      |
| FilterBar      | Horizontal filter strip                         |
| Footnote       | Small footer text                               |
| Input          | Text input + Select dropdown                    |
| MatchMeter     | Percentage match indicator bar                  |
| Panel          | Win97 inset panel container                     |
| Shimmer        | Loading skeleton animation                      |
| StatBar        | Stat chip strip                                 |
| Tabs           | Tabbed navigation                               |
| Toolbar        | Action bar with left/right slots                |

---

## Do NOT

- Use inline styles — use CSS classes
- Hardcode colors — use CSS custom properties from `w97-theme.css`
- Skip Storybook stories for new components
- Skip barrel exports in `src/index.ts`
- Import from consuming apps (shell-ui, jobs-ui) — this is a dependency, not a consumer
- Add runtime dependencies — only peer deps (React) and dev deps
