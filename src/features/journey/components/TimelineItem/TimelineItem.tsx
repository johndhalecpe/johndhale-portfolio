'use client'

// ──────────────────────────────────────────────
// TimelineItem — single journey milestone
// ──────────────────────────────────────────────
// Displays one phase of the learning journey with:
//   - A colored dot on the timeline
//   - Date label
//   - Title
//   - Description
//
// Extracted from Journey so the main component
// only handles the container/layout.
// ──────────────────────────────────────────────

import { TimelineItemData } from '../../types'

export default function TimelineItem({ date, title, desc, active }: TimelineItemData) {
  return (
    <div style={{ position: 'relative', marginBottom: '3rem' }}>
      {/* Timeline dot */}
      <div
        style={{
          position: 'absolute',
          left: '-2.4rem',
          top: 4,
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: active ? 'var(--secondary)' : 'var(--bg)',
          border: `2px solid ${active ? 'var(--secondary)' : 'var(--muted)'}`,
          boxShadow: active ? '0 0 12px var(--secondary-dim)' : 'none',
          transition: 'all 0.3s',
        }}
      />

      <div className="font-mono" style={{ fontSize: 12, letterSpacing: 2, color: 'var(--accent)', marginBottom: '0.8rem' }}>
        {date}
      </div>
      <div className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        {title}
      </div>
      <div className="font-mono" style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
        {desc}
      </div>
    </div>
  )
}
