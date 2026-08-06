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

const featured = [
  {
    num: '01 // full-stack web application',
    name: 'Agham Setlist',
    desc: 'A worship setlist management app built with Next.js and Supabase. Plan, organise, and manage church worship service setlists with a clean, intuitive interface — powered by a PostgreSQL database for real-time song and service management.',
    tags: ['Next.js', 'TypeScript', 'React', 'Supabase', 'PostgreSQL'],
    href: 'https://agham-setlist.vercel.app/',
    badges: [
      { label: 'FULL-STACK', color: 'var(--secondary)', bg: 'var(--secondary-dim)', border: 'var(--secondary-border)' },
      { label: 'SUPABASE', color: 'var(--badge-supabase)', bg: 'var(--badge-supabase-dim)', border: 'var(--badge-supabase-border)' },
    ],
    hasPreview: true,
  },
  {
    num: '02 // ai benchmarking',
    name: 'Project Mina',
    desc: 'A Terminal Benchmark 2.0 framework that evaluates how well frontier AI coding models — GPT-5.5, Claude Opus 4.8 — fix real-world bugs. Designed structured tasks with Docker sandboxes, pytest verification suites, and oracle solutions across 21 benchmark runs.',
    tags: ['Python', 'Docker', 'pytest', 'AI Evaluation', 'Bash'],
    href: '',
    badges: [
      { label: 'AI', color: 'var(--accent)', bg: 'var(--accent-dim)', border: 'var(--accent)' },
      { label: 'BENCHMARKING', color: 'var(--secondary)', bg: 'var(--secondary-dim)', border: 'var(--secondary-border)' },
    ],
    hasPreview: false,
  },
  {
    num: '03 // church management',
    name: 'Shepherd',
    desc: 'A production-grade church management system co-developed and deployed for a live organization. Full financial workflows — cash adjustments, opening/closing balances, credit/debit, and audit reporting — plus membership, events, loans, and admin authorization.',
    tags: ['Ruby on Rails', 'React', 'PostgreSQL', 'Full-Stack', 'FinTech'],
    href: '',
    badges: [
      { label: 'FULL-STACK', color: 'var(--secondary)', bg: 'var(--secondary-dim)', border: 'var(--secondary-border)' },
      { label: 'RAILS', color: 'var(--accent)', bg: 'var(--accent-dim)', border: 'var(--accent)' },
    ],
    hasPreview: false,
  },
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

      {/* ── Featured projects row ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}
      >
        {featured.map((project) => (
          <div
            key={project.name}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--accent)',
              padding: isMobile ? '1.5rem' : '2rem',
              borderRadius: 4,
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s',
              cursor: project.hasPreview ? 'pointer' : 'default',
            }}
            onClick={() => {
              if (project.hasPreview) setShowPreview(true)
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <div className="font-mono" style={{ fontSize: 11, color: 'var(--accent)', opacity: 0.5, marginBottom: '0.75rem', letterSpacing: 2 }}>
              {project.num}
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem', lineHeight: 1.3 }}>
              {project.name}
            </div>
            <div className="font-mono" style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1.25rem', flex: 1 }}>
              {project.desc}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono"
                  style={{ fontSize: 10, letterSpacing: 1, color: 'var(--accent)', background: 'var(--accent-dim)', padding: '3px 8px', borderRadius: 2 }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {project.hasPreview && (
                <button
                  className="font-mono"
                  onClick={(e) => { e.stopPropagation(); setShowPreview(true) }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase',
                    color: 'var(--accent)', opacity: 0.7, textDecoration: 'none',
                    transition: 'opacity 0.2s', background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  Preview
                </button>
              )}
              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase',
                    color: 'var(--accent)', opacity: 0.7, textDecoration: 'none', transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7' }}
                >
                  Live Demo
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              )}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
              {project.badges.map((badge) => (
                <Badge key={badge.label} label={badge.label} color={badge.color} bg={badge.bg} border={badge.border} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Other projects grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {projects.filter((p) => !p.compact).map((p) => (
          <ProjectCard key={p.num} {...p} />
        ))}
      </div>

      {/* ── Compact projects ── */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '1rem' }}>
        {projects.filter((p) => p.compact).map((p) => (
          <ProjectCard key={p.num} {...p} />
        ))}
      </div>

      {showPreview && (
        <PreviewModal images={aghamImages} onClose={() => setShowPreview(false)} />
      )}
    </section>
  )
}
