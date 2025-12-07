# Mobile Version Design

## Overview

Add responsive mobile support to CV Builder with focus on wizard usability and scaled CV preview.

## Scope

- Fully responsive wizard (mobile-first)
- Mobile header with hamburger menu
- Bottom navigation for wizard steps
- Scaled CV preview with zoom capability
- Touch-friendly controls

## Breakpoints

```
mobile:  < 640px  (sm)
tablet:  640-1024px (md/lg)
desktop: > 1024px
```

## Mobile Wizard Layout

```
┌─────────────────────────┐
│ Logo        ☰  🌐       │  <- compact header
├─────────────────────────┤
│ ● ● ○ ○ ○   Step 2/5    │  <- compact progress
├─────────────────────────┤
│                         │
│    [ FORM CONTENT ]     │  <- scrollable
│                         │
│                         │
├─────────────────────────┤
│  ← Wstecz      Dalej →  │  <- fixed bottom nav
└─────────────────────────┘
```

### Header (mobile)
- Smaller logo (sm size)
- Hamburger menu instead of buttons
- Language switcher in menu
- Demo/Reset buttons in menu

### Progress (mobile)
- Compact dots instead of full ProgressBar
- Current step name below dots

### Form
- Full width inputs
- Larger touch targets (min 44px)
- Education/experience cards stacked vertically
- ATS Tips hidden (or collapsible accordion)

### Bottom Navigation (fixed)
- Back/Next buttons
- Height: 60-70px
- Safe area for iPhone: env(safe-area-inset-bottom)

## Mobile Preview Layout

```
┌─────────────────────────┐
│ ← Edytuj    [Szablon ▼] │  <- top bar
├─────────────────────────┤
│                         │
│   ┌─────────────────┐   │
│   │                 │   │
│   │   CV PREVIEW    │   │  <- scaled ~50%
│   │   (scaled)      │   │
│   │                 │   │
│   └─────────────────┘   │
│                         │
│   📱 Rotate for         │  <- landscape hint
│      better view        │
│                         │
├─────────────────────────┤
│ 📄 Letter   🖨️ Print    │  <- bottom actions
└─────────────────────────┘
```

### Behavior
- CV scaled to ~50% to fit viewport
- Tap on CV = zoom to 100% (fullscreen overlay with pan/pinch)
- Landscape mode = larger CV, better preview
- Print button → opens system share or "Open on desktop" instruction

### Template Switcher (mobile)
- Dropdown instead of sidebar
- Or bottom sheet with template list

### Gestures
- Pinch-to-zoom on CV
- Swipe down = close fullscreen
- Double-tap = zoom toggle

## New Components

- `src/components/MobileNav.tsx` - hamburger menu
- `src/components/BottomNav.tsx` - fixed bottom navigation
- `src/components/MobileProgress.tsx` - compact progress dots

## Files to Modify

| File | Changes |
|------|---------|
| `App.tsx` | Mobile header, menu state |
| `Wizard.tsx` | Bottom nav, hide ATS on mobile |
| `ProgressBar.tsx` | Mobile variant |
| `Preview.tsx` | Scaled CV, zoom overlay |
| `*Step.tsx` | Touch-friendly inputs |
| `Button.tsx` | Larger touch targets |
| `Input.tsx` | Full width on mobile |
| `Card.tsx` | Smaller paddings on mobile |

## CSS Additions

```css
/* Safe area for iPhone */
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}

/* Touch targets */
.touch-target {
  min-height: 44px;
}
```

## Implementation Order

1. Header + MobileNav (hamburger menu)
2. MobileProgress (compact dots)
3. BottomNav (fixed navigation)
4. Wizard layout adjustments
5. Form inputs (touch-friendly)
6. Preview scaling + zoom
7. Template switcher (dropdown/bottom sheet)
