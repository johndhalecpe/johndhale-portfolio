// ──────────────────────────────────────────────
// Projects — TypeScript types
// ──────────────────────────────────────────────

export interface Project {
  num: string
  name: string
  desc: string
  tags: string[]
  dashed: boolean
  href?: string
  images?: string[]
  compact?: boolean
}
