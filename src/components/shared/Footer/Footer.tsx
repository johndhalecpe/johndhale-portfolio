'use client'

// ──────────────────────────────────────────────
// Footer — shared app component
// ──────────────────────────────────────────────
// Site footer with:
//   - JD CpE logo
//   - Tagline
//   - Copyright year + location
//   - "Built with discipline" badge
//
// Data flow: reads site config for personal info.
// ──────────────────────────────────────────────

import { siteConfig } from '@/config/site'

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: 'none',
        boxShadow: '0 -1px 0 var(--accent-cyan-dim)',
        padding: '3rem 2rem 2rem',
        color: 'var(--text-secondary)',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Top row: logo + tagline */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 5,
              lineHeight: 1,
              borderLeft: '2px solid var(--accent-cyan)',
              paddingLeft: 12,
            }}
          >
            <span
              className="font-mono footer-logo-jd"
              style={{ fontSize: 58, fontWeight: 700, letterSpacing: 3, color: 'var(--text)', opacity: 1, transition: 'letter-spacing 0.3s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.letterSpacing = '6px' }}
              onMouseLeave={(e) => { e.currentTarget.style.letterSpacing = '3px' }}
            >
              JD
            </span>
            <span
              className="font-mono footer-logo-cpe"
              style={{ fontSize: 34, fontWeight: 400, letterSpacing: 2, color: 'var(--accent)', opacity: 0.7, transition: 'opacity 0.3s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7' }}
            >
              CpE
            </span>
          </div>
          <div
            className="font-mono hide-mobile"
            style={{ fontSize: 11, letterSpacing: 2, color: 'var(--muted)', opacity: 0.5, textTransform: 'uppercase' }}
          >
            <span style={{ color: 'var(--accent)', opacity: 1 }}>{'//'}</span> SYSTEMS ENGINEER · WEB DEVELOPER
          </div>
        </div>

        {/* Gradient divider */}
        <div
          style={{
            height: 1,
            background: 'linear-gradient(to right, transparent, var(--accent-cyan), transparent)',
            marginBottom: '1.5rem',
          }}
        />

        {/* Bottom row: copyright + location */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div className="font-mono" style={{ fontSize: 11, letterSpacing: 2, color: 'var(--muted)', opacity: 0.7 }}>
            © <span style={{ color: 'var(--secondary)', opacity: 0.6 }}>{siteConfig.copyright}</span> ·{' '}
            <span style={{ color: 'var(--text)' }}>{siteConfig.name}</span>
          </div>
          <div
            className="font-mono"
            style={{ fontSize: 11, letterSpacing: 2, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <span style={{ color: 'var(--muted)' }}>Built with</span>
            <span style={{ color: 'var(--accent)', fontWeight: 600, opacity: 0.7, textShadow: '0 0 8px var(--accent-dim)' }}>
              discipline
            </span>
            <span style={{ opacity: 0.3, margin: '0 0.15rem' }}>·</span>
            <span style={{ color: 'var(--muted)' }}>{siteConfig.location}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
