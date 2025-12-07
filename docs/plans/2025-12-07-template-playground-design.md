# Template System + Developer Playground

## Overview

Improve template contribution experience with centralized registry and developer playground for testing templates with various data scenarios.

## Goals

1. Simplify adding new templates (1 file edit instead of 3)
2. Provide isolated testing environment for template development
3. Help catch edge cases before PR submission

## Design

### 1. Template Registry

**New file: `src/features/templates/registry.ts`**

```tsx
import type { CVData } from '../../types';

export interface TemplateMeta {
  id: string;
  name: string;
  nameKey: string;        // i18n key
  descKey: string;        // i18n key
  color: string;          // Tailwind class
  component: React.ComponentType<{ data: CVData }>;
}

export const templates: TemplateMeta[] = [
  {
    id: 'modern',
    name: 'Modern',
    nameKey: 'template.modern',
    descKey: 'template.modernDesc',
    color: 'bg-teal-500',
    component: ModernTemplate,
  },
  // ... other templates
];

export const getTemplate = (id: string) => templates.find(t => t.id === id);
export const getTemplateIds = () => templates.map(t => t.id);
```

### 2. Playground Page

**Route:** `/playground` (visible in header only in dev mode)

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  Logo    [Templates ▼]   [Data ▼]   [Tools]    🖨️  📐  📱   │
├────────────────────┬────────────────────────────────────────┤
│   DATA PANEL       │         CV PREVIEW                     │
│   (collapsible)    │         (A4 centered)                  │
│   - Preset tabs    │                                        │
│   - JSON Editor    │    ┌─────────────────────────┐         │
│                    │    │     [CV TEMPLATE]       │         │
│                    │    └─────────────────────────┘         │
└────────────────────┴────────────────────────────────────────┘
```

**Toolbar features:**
- Templates dropdown - select template to preview
- Data presets - Empty / Minimal / Full / Long texts / Edge cases
- Tools:
  - Print preview mode (simulate print styles)
  - Grid overlay (alignment helpers)
  - Scale slider (zoom in/out)

### 3. Data Presets

| Preset | Purpose | Content |
|--------|---------|---------|
| Empty | Empty CV test | All fields empty |
| Minimal | Minimum data | Only name, email, 1 experience |
| Full | Complete CV | Current demo data |
| Long texts | Overflow testing | Very long descriptions, 10+ skills |
| No photo | Without photo | Full data, no photo |
| Edge cases | Boundary cases | Special chars, emoji, long words |

### 4. File Structure

```
src/
├── features/
│   ├── templates/
│   │   ├── registry.ts          # Central registration
│   │   ├── ModernTemplate.tsx
│   │   └── ...
│   └── playground/
│       ├── Playground.tsx       # Main component
│       ├── DataPanel.tsx        # JSON/presets panel
│       ├── Toolbar.tsx          # Top toolbar
│       ├── presets.ts           # Test data sets
│       └── index.ts
```

### 5. Dev Mode Integration

```tsx
const isDev = import.meta.env.DEV;

// In header (only when isDev):
{isDev && <Link to="/playground">Playground</Link>}

// In routes:
{isDev && <Route path="/playground" element={<Playground />} />}
```

## Implementation Steps

1. Create `registry.ts` and migrate existing templates
2. Update `Preview.tsx` to use registry
3. Create basic `Playground.tsx` with template selector
4. Add data presets
5. Add toolbar with dev tools (grid, print, zoom)
6. Add dev mode link in header

## Benefits

- Clear contribution path: create file → add to registry → test in playground → PR
- Fewer things to break
- Fast feedback loop for template developers
