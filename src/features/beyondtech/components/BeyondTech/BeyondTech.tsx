'use client'

// ──────────────────────────────────────────────
// Features / BeyondTech / Components / BeyondTech
// ──────────────────────────────────────────────
// The "Beyond Tech" section — shows the human side:
// guitar playing, music, hobbies.
//
// Data flow:
//   - musicTags from data.ts (extracted)
//   - MusicBars for the animated equalizer
//   - InteractiveGuitar from shared components
// ──────────────────────────────────────────────

import { useScrollFade } from '@/hooks/useScrollFade'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { musicTags } from '../../data'
import MusicBars from '../MusicBars/MusicBars'
import InteractiveGuitar from '@/components/shared/InteractiveGuitar/InteractiveGuitar'
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel'

export default function BeyondTech() {
  const ref = useScrollFade()
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <section
      id="beyond"
      ref={ref}
      className="scroll-fade"
      style={{ padding: isMobile ? '4rem 1.5rem' : '6rem 2rem', maxWidth: 1100, margin: '0 auto' }}
    >
      <SectionLabel sectionId="05 // beyond tech" />

      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          padding: isMobile ? '1.5rem' : '3rem',
          borderRadius: 4,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: isMobile ? '2rem' : '4rem',
          alignItems: 'center',
        }}
      >
        {/* ── Left column: text ── */}
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: -0.5, marginBottom: '1rem', lineHeight: 1.2 }}>
            Engineer by day,
            <br />
            musician by heart.
          </h2>
          <p className="font-mono" style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Music has always been part of who I am. Playing guitar isn&apos;t
            just a hobby — it&apos;s how I stay creative, stay patient, and
            stay human. The same discipline that goes into learning a new chord
            progression goes into learning a new framework.
          </p>
          <p className="font-mono" style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Whether it&apos;s worship music or just playing for myself, the
            guitar reminds me that mastery takes time, and the process itself
            is worth it.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {musicTags.map((label) => (
              <span
                key={label}
                className="font-mono"
                style={{
                  fontSize: 10, color: 'var(--accent-purple)', background: 'var(--accent-purple-dim)',
                  border: '1px solid var(--accent-purple-border)', padding: '5px 12px', borderRadius: 2,
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right column: music bars + guitar ── */}
        <div
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: '1.5rem', justifySelf: 'center',
            width: '100%', maxWidth: 200,
          }}
        >
          <MusicBars />
          <InteractiveGuitar />
          <div className="font-mono" style={{ fontSize: 12, color: 'var(--muted)', letterSpacing: 2, textAlign: 'center', lineHeight: 1.8 }}>
            PLAYING SINCE
            <br />
            <span style={{ color: 'var(--accent)' }}>COLLEGE</span>
          </div>
        </div>
      </div>
    </section>
  )
}
