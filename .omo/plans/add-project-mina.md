# Rearrange Projects Section — Featured Trio + Compressed Cards

## Context
The user wants to elevate three projects (Agham Setlist, Project Mina, The Shepherd) as equal "hero" projects, compress the less impactful ones (Arduino, Calculator Noir), and add two new projects. The current layout has Agham Setlist hardcoded as a single featured card above a uniform grid — we need to generalize this into a 3-column featured row + compact grid below.

## Changes (4 files)

---

### 1. `src/features/projects/types.ts` — Add fields for hierarchy
Add `compact?: boolean` to the `Project` interface so Arduino and Calculator Noir can be rendered smaller.

```typescript
export interface Project {
  num: string
  name: string
  desc: string
  tags: string[]
  dashed: boolean
  href?: string
  images?: string[]
  compact?: boolean          // ← NEW: renders a condensed card
}
```

---

### 2. `src/features/projects/data.ts` — Add new projects, compress old ones

**Add two new entries at the TOP of the array** (before the existing ones):

```typescript
// ── Featured: Project Mina ──
{
  num: '01 // ai benchmarking',
  name: 'Project Mina',
  desc: 'A Terminal Benchmark 2.0 framework that evaluates how well frontier AI coding models — GPT-5.5, Claude Opus 4.8 — fix real-world bugs. Designed structured tasks with Docker sandboxes, pytest verification suites, and oracle solutions across 21 benchmark runs.',
  tags: ['Python', 'Docker', 'pytest', 'AI Evaluation', 'Bash'],
  dashed: false,
  images: [],  // add screenshots later if available
},

// ── Featured: The Shepherd ──
{
  num: '02 // church management',
  name: 'The Shepherd',
  desc: 'A production-grade church management system co-developed and deployed for a live organization. Full financial workflows — cash adjustments, opening/closing balances, credit/debit, and audit reporting — plus membership, events, loans, and admin authorization.',
  tags: ['Ruby on Rails', 'React', 'PostgreSQL', 'Full-Stack', 'FinTech'],
  dashed: false,
  href: '',  // add live URL if available
},
```

**Mark existing Arduino and Heartbeat Monitor as `compact: true`** and shorten their descriptions:

```typescript
// Existing Memory Game — add compact: true, shorten desc
{
  num: '03 // embedded systems',
  name: 'Memory Game — Arduino',
  desc: 'Simon Says-style memory game on a microcontroller with LEDs, push buttons, and real-time input handling.',
  tags: ['Arduino', 'C/C++', 'Embedded'],
  dashed: false,
  compact: true,   // ← NEW
},

// Existing Heartbeat Monitor — add compact: true, shorten desc
{
  num: '04 // sensor integration',
  name: 'Heartbeat Monitor',
  desc: 'Real-time heart rate monitoring with pulse sensor and OLED display — biometric data processing and live rendering.',
  tags: ['Arduino', 'Pulse Sensor', 'OLED'],
  dashed: false,
  compact: true,   // ← NEW
},
```

**Keep Calculator Noir and Sheep Disease as-is** (they're mid-tier), just renumber:
- Calculator Noir → `05 // web application`
- Sheep Disease → `06 // flagship thesis`
- Web Projects (coming soon) → `07 // coming soon`

---

### 3. `src/features/projects/components/ProjectCard/ProjectCard.tsx` — Add compact variant

Add a branch at the top of the render that checks `compact`:

- **Compact card:** smaller padding (`1rem`), smaller font sizes, tags shown as a single line, no hover transform. Essentially a "list item" feel.
- **Normal card:** existing behavior unchanged.

Key differences for compact:
- `padding: '1rem'` instead of `2rem`
- `fontSize: '1rem'` for name instead of `1.2rem`
- `fontSize: '0.8rem'` for desc instead of `0.875rem`
- Tags rendered with smaller padding and font
- No `translateY(-4px)` on hover

---

### 4. `src/features/projects/components/Projects/Projects.tsx` — Featured trio layout

**Replace** the single hardcoded Agham Setlist featured card with a **3-column featured row** that renders all three hero projects inline.

The three featured projects are **hardcoded** (not from the data array) because they each have unique layouts, images, and links. This keeps them visually distinct from the grid.

**Featured row structure:**
```
┌─────────────────┬─────────────────┬─────────────────┐
│  Agham Setlist   │  Project Mina   │  The Shepherd   │
│  [Preview btn]   │  [No images]    │  [Live Demo]    │
│  [Live Demo]     │                 │                 │
│  [Badge]         │  [Badge]        │  [Badge]        │
└─────────────────┴─────────────────┴─────────────────┘
```

- On desktop: 3 equal columns (`gridTemplateColumns: 'repeat(3, 1fr)'`)
- On mobile: stack vertically
- Each card gets the same `var(--accent)` border and styling as the current Agham Setlist featured card
- Badges: Agham Setlist = FULL-STACK / SUPABASE, Project Mina = AI / BENCHMARKING, The Shepherd = FULL-STACK / RAILS

**Below the featured row:** render the `projects` array (which now starts at `03 // embedded systems`).

---

## File Change Summary

| File | Change |
|------|--------|
| `src/features/projects/types.ts` | Add `compact?: boolean` to `Project` interface |
| `src/features/projects/data.ts` | Add Project Mina + The Shepherd entries; mark Arduino + Heartbeat as `compact: true` with shortened descs; renumber all |
| `src/features/projects/components/ProjectCard/ProjectCard.tsx` | Add compact card branch (smaller padding, font, no hover transform) |
| `src/features/projects/components/Projects/Projects.tsx` | Replace single featured card with 3-column featured row; keep `projects` grid below |

## Verification
- `npm run build` — no errors
- `npm run dev` — open http://localhost:3000
- Desktop: 3 featured cards in a row, all equal size, each with accent border
- Below: compact Arduino/Heartbeat cards, normal Calculator Noir/Sheep Disease/Web Projects cards
- Mobile: featured cards stack vertically, grid stays single-column
- Agham Setlist preview still opens images
- All existing hover states work on non-compact cards
