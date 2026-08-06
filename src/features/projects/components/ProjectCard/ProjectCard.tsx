'use client'

import { useState } from 'react'
import { Project } from '../../types'
import PreviewModal from '@/components/ui/PreviewModal/PreviewModal'

export default function ProjectCard({ num, name, desc, tags, dashed, href, images, compact }: Project) {
  const [showPreview, setShowPreview] = useState(false)
  const hasPreview = images && images.length > 0

  if (compact) {
    return (
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          padding: '1rem',
          borderRadius: 4,
          position: 'relative',
          overflow: 'hidden',
          transition: 'border-color 0.3s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)' }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)' }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div className="font-mono" style={{ fontSize: 11, color: 'var(--accent)', opacity: 0.5, letterSpacing: 2, whiteSpace: 'nowrap' }}>
            {num}
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.3 }}>
            {name}
          </div>
        </div>
        <div className="font-mono" style={{ fontSize: '0.8rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
          {desc}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
          {tags.map((tag) => (
            <span
              key={tag}
              className="font-mono"
              style={{ fontSize: 10, letterSpacing: 1, color: 'var(--accent)', background: 'var(--accent-dim)', padding: '2px 8px', borderRadius: 2 }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div
        style={{
          background: 'var(--surface)',
          border: `1px ${dashed ? 'dashed' : 'solid'} var(--border)`,
          padding: '2rem',
          borderRadius: 4,
          position: 'relative',
          overflow: 'hidden',
          opacity: dashed ? 0.6 : 1,
          transition: 'border-color 0.3s, transform 0.3s',
          cursor: hasPreview && !dashed ? 'pointer' : 'default',
        }}
        onClick={() => {
          if (hasPreview && !dashed) setShowPreview(true)
        }}
        onMouseEnter={(e) => {
          if (!dashed) {
            e.currentTarget.style.borderColor = 'var(--accent)'
            e.currentTarget.style.transform = 'translateY(-4px)'
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        <div className="font-mono" style={{ fontSize: 12, color: 'var(--accent)', opacity: 0.5, marginBottom: '0.75rem', letterSpacing: 2 }}>
          {num}
        </div>
        <div style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem', lineHeight: 1.3 }}>
          {name}
        </div>
        <div className="font-mono" style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          {desc}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {tags.map((tag) => (
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
          {hasPreview && !dashed && (
            <button
              onClick={(e) => { e.stopPropagation(); setShowPreview(true) }}
              className="font-mono"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '1.25rem',
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
          )}
          {href && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '1.25rem',
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
          )}
        </div>
      </div>

      {showPreview && images && (
        <PreviewModal images={images} onClose={() => setShowPreview(false)} />
      )}
    </>
  )
}
