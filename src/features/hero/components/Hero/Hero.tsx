'use client'

// ──────────────────────────────────────────────
// Features / Hero / Components / Hero
// ──────────────────────────────────────────────
// The landing section of the portfolio. Contains:
//   1. Name + title with typewriter effect
//   2. Bio paragraph
//   3. CTA buttons (View Projects, Get In Touch)
//   4. Profile photo with decorative rings
//
// Data flow:
//   - useTypewriter() hook manages the typing animation
//   - useMediaQuery() adjusts layout for mobile
//   - All content is hardcoded (no external data)
//
// What was split:
//   - Typewriter logic → useTypewriter hook (teaches hook extraction)
// ──────────────────────────────────────────────

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useTypewriter } from '../../hooks/useTypewriter'

export default function Hero() {
  const displayed = useTypewriter()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [tagHovered, setTagHovered] = useState(false)
  const tagTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleTagInteract = useCallback(() => {
    setTagHovered(true)
    if (tagTimer.current) clearTimeout(tagTimer.current)
    tagTimer.current = setTimeout(() => setTagHovered(false), 3000)
  }, [])

  const photoSize = isMobile ? 240 : 370
  const ringOuter = isMobile ? 280 : 450
  const ringMid = isMobile ? 265 : 430
  const ringSpin1 = isMobile ? 270 : 440
  const ringSpin2 = isMobile ? 255 : 420
  const ringGlow = isMobile ? 225 : 370

  return (
    <section
      id="hero"
      style={{
        minHeight: isMobile ? 'auto' : '95vh',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        position: 'relative',
        padding: isMobile ? '2rem 1rem' : '4rem 2rem',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      {/* ── Left: text content ── */}
      <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>
        <div className="section-label-wrap animate-fadeUp-1">
          <div className="font-mono" style={{ fontSize: 13, letterSpacing: 2, color: 'var(--text-secondary)' }}>
            {'// role: computer_engineer | developer'}
          </div>
        </div>

        <h1
          className="animate-fadeUp-2"
          style={{
            fontSize: isMobile ? 'clamp(2.5rem, 14vw, 4.25rem)' : 'clamp(3.5rem, 8vw, 6.5rem)',
            fontWeight: 800,
            letterSpacing: isMobile ? -1 : -2,
            lineHeight: 1.0,
            color: 'var(--accent)',
            marginBottom: '0.5rem',
          }}
        >
          John Dhale
          <br />
          <span style={{ color: 'var(--text-secondary)' }}>Peralta</span>
          <span
            className="font-mono"
            style={{
              color: 'var(--accent)',
              fontSize: '0.61em',
              marginLeft: '0.05em',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'baseline',
              userSelect: 'none',
            }}
            onMouseEnter={handleTagInteract}
            onMouseLeave={() => setTagHovered(false)}
            onClick={handleTagInteract}
            onTouchStart={handleTagInteract}
          >
            {'</'}
            <span
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                width: tagHovered ? '2.7ch' : '0',
                transition: 'width 0.3s ease',
                whiteSpace: 'nowrap',
              }}
            >
              CpE
            </span>
            {'>'}
          </span>
        </h1>

        {/* ── Typewriter line ── */}
        <div
          className="animate-fadeUp-3 font-mono"
          style={{
            fontSize: isMobile ? '0.9rem' : 'clamp(0.9rem, 2vw, 1.1rem)',
            color: 'var(--text-secondary)',
            marginBottom: isMobile ? '1rem' : '1.5rem',
            minHeight: '1.4em',
          }}
        >
          <span style={{ color: 'var(--accent)' }}>{'>'}</span>{' '}
          <span style={{ color: 'var(--text-secondary)' }}>dev.status:</span>{' '}
          {displayed}
          <span className="animate-blink" style={{ color: 'var(--accent)' }}>
            _
          </span>
        </div>

        <p
          className="animate-fadeUp-4 font-mono"
          style={{
            maxWidth: 560,
            fontSize: isMobile ? '0.85rem' : '0.95rem',
            lineHeight: 1.8,
            color: 'var(--text-secondary)',
            marginBottom: isMobile ? '1.5rem' : '2.5rem',
            whiteSpace: 'pre-line',
          }}
        >
          {`Computer Engineering graduate from Teresa, Rizal,
bridging hardware systems and modern web development.
I build from circuits to full-stack web applications
with a strong systems-level mindset.

Currently focused on building with Next.js, TypeScript,
React, Javascript, and exploring the intersection of
web development. AI-assisted development workflows.`}
        </p>

        {/* ── CTA buttons ── */}
        <div
          className="animate-fadeUp-5"
          style={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start', gap: isMobile ? '0.6rem' : '1rem', flexWrap: 'wrap' }}
        >
          <a
            href="#projects"
            className="font-mono"
            style={{
              fontSize: 12, letterSpacing: 2, textTransform: 'uppercase',
              padding: isMobile ? '10px 20px' : '12px 28px',
              borderRadius: 2, background: 'var(--accent)', color: 'var(--text-inverse)', fontWeight: 700,
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 20px var(--accent-dim)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="font-mono"
            style={{
              fontSize: 12, letterSpacing: 2, textTransform: 'uppercase',
              padding: isMobile ? '10px 20px' : '12px 28px',
              borderRadius: 2, border: '1px solid var(--border)', color: 'var(--text-secondary)',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--secondary)'
              e.currentTarget.style.color = 'var(--secondary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-secondary)'
            }}
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* ── Right: photo with decorative rings ── */}
      <div
        className="animate-fadeUp-3"
        style={{
          flexShrink: 0,
          marginLeft: isMobile ? 0 : 'clamp(1.5rem, 4vw, 5rem)',
          marginTop: isMobile ? '2.5rem' : 0,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* ── Status badge above photo ── */}
        <div
          className="font-mono"
          style={{
            position: 'absolute',
            top: isMobile ? -16 : -20,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.75rem',
            borderRadius: 20,
            background: 'rgba(34,197,94,0.1)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#22c55e',
              boxShadow: '0 0 8px #22c55e, 0 0 16px rgba(34,197,94,0.6)',
            }}
          />
          <span style={{ fontSize: 10, letterSpacing: 1, color: '#22c55e', fontWeight: 500 }}>
            Available to work now.
          </span>
        </div>

        <div style={{ position: 'absolute', width: ringOuter, height: ringOuter, borderRadius: '50%', border: '1px solid var(--accent-border)', opacity: 0.2 }} />
        <div style={{ position: 'absolute', width: ringMid, height: ringMid, borderRadius: '50%', border: '1px solid var(--secondary-border)', opacity: 0.15 }} />
        <div style={{ position: 'absolute', width: ringSpin1, height: ringSpin1, borderRadius: '50%', border: '2px solid transparent', borderTopColor: 'var(--accent)', borderRightColor: 'var(--accent)', opacity: 0.2, animation: 'spin 12s linear infinite' }} />
        <div style={{ position: 'absolute', width: ringSpin2, height: ringSpin2, borderRadius: '50%', border: '2px solid transparent', borderBottomColor: 'var(--secondary)', borderLeftColor: 'var(--secondary)', opacity: 0.12, animation: 'spin 18s linear infinite reverse' }} />
        <div style={{ position: 'absolute', width: ringGlow, height: ringGlow, borderRadius: '50%', background: 'radial-gradient(circle, var(--accent-dim) 0%, transparent 70%)', filter: 'blur(30px)' }} />

        <div
          style={{
            width: photoSize, height: photoSize, borderRadius: '50%', overflow: 'hidden',
            border: '2px solid var(--accent-border)', position: 'relative', zIndex: 1,
            animation: 'pulse-glow 4s ease-in-out infinite',
          }}
        >
          <Image
            src="/sakbaysquooshed.jpg"
            alt="John Dhale Peralta — Computer Engineer"
            fill
            sizes={isMobile ? '240px' : '370px'}
            style={{ objectFit: 'cover', objectPosition: 'top center', filter: 'grayscale(20%) contrast(1.05)', transition: 'filter 0.4s, transform 0.4s' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'grayscale(0%) contrast(1.1)'
              e.currentTarget.style.transform = 'scale(1.03)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'grayscale(20%) contrast(1.05)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement
              target.style.display = 'none'
            }}
          />
        </div>

        {!isMobile && (
          <>
            <div style={{ position: 'absolute', top: 10, left: 10, width: 24, height: 24, borderTop: '2px solid var(--accent)', borderLeft: '2px solid var(--accent)', opacity: 0.4 }} />
            <div style={{ position: 'absolute', top: 10, right: 10, width: 24, height: 24, borderTop: '2px solid var(--secondary)', borderRight: '2px solid var(--secondary)', opacity: 0.3 }} />
            <div style={{ position: 'absolute', bottom: 10, left: 10, width: 24, height: 24, borderBottom: '2px solid var(--secondary)', borderLeft: '2px solid var(--secondary)', opacity: 0.3 }} />
            <div style={{ position: 'absolute', bottom: 10, right: 10, width: 24, height: 24, borderBottom: '2px solid var(--accent)', borderRight: '2px solid var(--accent)', opacity: 0.4 }} />
          </>
        )}

        <div
          className="font-mono hide-mobile"
          style={{
            position: 'absolute', bottom: -32, fontSize: 11, letterSpacing: 3,
            color: 'var(--muted)', textTransform: 'uppercase', animation: 'float 3s ease-in-out infinite',
          }}
        >
          {'// dev.png'}
        </div>
      </div>
    </section>
  )
}
