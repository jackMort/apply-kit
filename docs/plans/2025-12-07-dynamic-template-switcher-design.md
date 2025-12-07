# Dynamic Template Switcher in Preview

## Overview

Move template selection from wizard step to preview page with a slide-in sidebar for real-time template switching.

## Changes

### 1. Remove Template Step from Wizard

- Wizard reduced from 6 to 5 steps
- Steps: Personal → Education → Experience → Skills → Courses/Languages
- "Preview CV" button leads directly to Preview

### 2. Preview Page - New Layout

```
┌─────────────────────────────────────────────────────────┐
│  ← Edytuj    [Zmień szablon]    List motyw.  Drukuj    │
├─────────────────────────────────────────────────────────┤
│                                         ┌─────────────┐ │
│                                         │  SIDEBAR    │ │
│         [  CV DOCUMENT  ]               │  (overlay)  │ │
│                                         │             │ │
│                                         │ ┌─────────┐ │ │
│                                         │ │ Modern  │ │ │
│                                         │ └─────────┘ │ │
│                                         │ ┌─────────┐ │ │
│                                         │ │ Classic │ │ │
│                                         │ └─────────┘ │ │
│                                         │   ...       │ │
│                                         └─────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### 3. Sidebar Behavior

- Hidden by default
- "Zmień szablon" button toggles visibility
- Slide-in animation from right
- Overlay mode (doesn't push CV)
- Clicking template = instant change + auto-hide sidebar

## Files to Modify

1. `src/features/wizard/Wizard.tsx` - remove template step
2. `src/features/preview/Preview.tsx` - add template sidebar
3. `src/i18n/locales/*.json` - add new translation keys
4. Delete or repurpose `src/features/wizard/steps/TemplateStep.tsx`

## Implementation Notes

- Reuse template cards styling from TemplateStep
- Use Tailwind for slide-in animation (`translate-x`, `transition`)
- Sidebar width: ~280px
- Semi-transparent backdrop when sidebar open (optional)
