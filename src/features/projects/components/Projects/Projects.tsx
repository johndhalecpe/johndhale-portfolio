'use client'

import { useState } from 'react'
import { useScrollFade } from '@/hooks/useScrollFade'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { projects } from '../../data'
import ProjectCard from '../ProjectCard/ProjectCard'
import Badge from '@/components/ui/Badge/Badge'
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel'
import PreviewModal from '@/components/ui/PreviewModal/PreviewModal'

const aghamImages = [
  '/agham setlist.jpg',
  '/agham setlist (2).jpg',
  '/agham setlist (3).jpg',
  '/agham setlist (4).jpg',
]

export default function Projects() {
  const ref = useScrollFade()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [showPreview, setShowPreview] = useState(false)

  return (
    <section
      id="projects"
      ref={ref}
      className="scroll-fade"
      style={{ padding: isMobile ? '4rem 1.5rem' : '6rem 2rem', maxWidth: 1100, margin: '0 auto', position: 'relative' }}
    >
      {/* ── Scattered code textures ── */}
      <span className="code-texture" style={{ top: 30, left: 30, color: 'var(--accent)', opacity: 0.04, transform: 'rotate(-1.5deg)' }}>
        {'async function deploy(project) { await build(); return ship(); }'}
      </span>
      <span className="code-texture" style={{ bottom: 80, right: 40, color: 'var(--secondary)', opacity: 0.03, transform: 'rotate(2deg)' }}>
        {"SELECT * FROM songs ORDER BY service_date DESC;"}
      </span>

      <SectionLabel sectionId="03 // projects" />

      <h2
        style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          letterSpacing: -1,
          marginBottom: '3rem',
          lineHeight: 1.1,
        }}
      >
        Things I&apos;ve
        <br />
        <span style={{ color: 'var(--accent)' }}>built.</span>
      </h2>

      {/* ── Featured project: Agham Setlist ── */}
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--accent)',
          padding: isMobile ? '1.5rem' : '2.5rem',
          borderRadius: 4,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
          gap: isMobile ? '1rem' : '2rem',
          alignItems: isMobile ? 'center' : 'start',
          marginBottom: '3rem',
          transition: 'transform 0.3s',
          cursor: 'pointer',
        }}
        onClick={() => setShowPreview(true)}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)' }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
      >
        <div>
          <div className="font-mono" style={{ fontSize: 12, color: 'var(--accent)', opacity: 0.5, marginBottom: '0.75rem', letterSpacing: 2 }}>
            01 // full-stack web application
          </div>
          <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.3 }}>
            Agham Setlist
          </div>
          <div className="font-mono" style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            A worship setlist management app built with Next.js and Supabase.
            Plan, organise, and manage church worship service setlists with a
            clean, intuitive interface — powered by a PostgreSQL database for
            real-time song and service management.
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' }}>
            {['Next.js', 'TypeScript', 'React', 'Supabase', 'PostgreSQL'].map((tag) => (
              <span
                key={tag}
                className="font-mono"
                style={{ fontSize: 11, letterSpacing: 1, color: 'var(--accent)', background: 'var(--accent-dim)', padding: '4px 10px', borderRadius: 2 }}
              >
                {tag}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              className="font-mono"
              onClick={(e) => { e.stopPropagation(); setShowPreview(true) }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase',
                color: 'var(--accent)', opacity: 0.7, textDecoration: 'none',
                transition: 'opacity 0.2s', background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              Preview
            </button>
            <a
              href="https://agham-setlist.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase',
                color: 'var(--accent)', opacity: 0.7, textDecoration: 'none', transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7' }}
            >
              Live Demo
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', alignItems: isMobile ? 'center' : 'flex-end', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Badge label="FULL-STACK" color="var(--secondary)" bg="var(--secondary-dim)" border="var(--secondary-border)" />
          <Badge label="SUPABASE" color="var(--badge-supabase)" bg="var(--badge-supabase-dim)" border="var(--badge-supabase-border)" />
        </div>
      </div>

      {/* ── Project cards grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {projects.map((p) => (
          <ProjectCard key={p.num} {...p} />
        ))}
      </div>

      {showPreview && (
        <PreviewModal images={aghamImages} onClose={() => setShowPreview(false)} />
      )}
    </section>
  )
}
