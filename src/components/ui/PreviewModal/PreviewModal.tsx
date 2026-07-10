'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { useMediaQuery } from '@/hooks/useMediaQuery'

interface PreviewModalProps {
  images: string[]
  initialIndex?: number
  onClose: () => void
}

const N = (raised: boolean, inset = false) => {
  const d = 'var(--accent-dim)'
  const l = raised ? 'var(--accent-border)' : 'var(--accent-dim)'
  const i = inset ? 'inset ' : ''
  return `${i}2px 2px 8px ${d}, ${i}-2px -2px 8px ${l}`
}

const SWIPE_THRESHOLD = 50

export default function PreviewModal({ images, initialIndex = 0, onClose }: PreviewModalProps) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [index, setIndex] = useState(initialIndex)
  const [imgLoaded, setImgLoaded] = useState(false)
  const touchX = useRef(0)

  const handleClose = useCallback(() => onClose(), [onClose])
  const prev = useCallback(() => setIndex((i) => (i === 0 ? images.length - 1 : i - 1)), [images.length])
  const next = useCallback(() => setIndex((i) => (i === images.length - 1 ? 0 : i + 1)), [images.length])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleClose, prev, next])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX
  }, [])

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      if (dx > 0) prev()
      else next()
    }
  }, [prev, next])

  const ar = isMobile ? '4 / 3' : '16 / 10'

  const btnCommon: React.CSSProperties = {
    background: 'var(--overlay)',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'box-shadow 0.25s, transform 0.25s',
    color: 'var(--text-secondary)',
  }

  const content = (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'var(--overlay)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: isMobile ? '0.5rem' : '1rem',
        cursor: 'pointer',
      }}
      onClick={handleClose}
    >
      <div
        style={{
          position: 'relative',
          width: '100%', maxWidth: 1040,
          cursor: 'default',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: isMobile ? '0.75rem' : '1.25rem',
        }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={images.length > 1 ? onTouchStart : undefined}
        onTouchEnd={images.length > 1 ? onTouchEnd : undefined}
      >
        {/* ── Image card ── */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            borderRadius: isMobile ? 14 : 18,
            overflow: 'hidden',
            background: 'var(--overlay-alt)',
            boxShadow: N(true),
            transition: 'box-shadow 0.3s',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: ar,
              opacity: imgLoaded ? 1 : 0.4,
              transition: 'opacity 0.4s',
            }}
          >
            <Image
              key={images[index]}
              src={images[index]}
              alt={`Preview ${index + 1}`}
              fill
              priority
              onLoad={() => setImgLoaded(true)}
              sizes="(max-width: 768px) 100vw, 1040px"
              style={{ objectFit: 'contain', padding: isMobile ? 4 : 8 }}
            />

            {!imgLoaded && (
              <div
                style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'var(--overlay)',
                    boxShadow: N(true, true),
                    animation: 'spin 0.8s linear infinite',
                  }}
                />
              </div>
            )}
          </div>

          {/* ── Close button ── */}
          <button
            onClick={handleClose}
            aria-label="Close preview"
            style={{
              ...btnCommon,
              position: 'absolute', top: isMobile ? 10 : 14,
              right: isMobile ? 10 : 14,
              width: isMobile ? 40 : 36,
              height: isMobile ? 40 : 36,
              borderRadius: '50%',
              fontSize: isMobile ? 18 : 16,
              lineHeight: 1,
              boxShadow: N(true),
color: 'var(--text-secondary)',
                  background: 'var(--overlay)',
              zIndex: 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = N(false, true)
              e.currentTarget.style.color = 'var(--accent)'
              e.currentTarget.style.transform = 'scale(0.92)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = N(true)
              e.currentTarget.style.color = 'var(--text-secondary)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
            onMouseDown={(e) => { e.currentTarget.style.boxShadow = N(false, true); e.currentTarget.style.transform = 'scale(0.88)' }}
            onMouseUp={(e) => { e.currentTarget.style.boxShadow = N(false, true); e.currentTarget.style.transform = 'scale(0.92)' }}
          >
            ✕
          </button>

          {/* ── Arrow: previous ── */}
          {images.length > 1 && (
            <button
              onClick={prev}
              aria-label="Previous image"
              style={{
                ...btnCommon,
                position: 'absolute',
                left: isMobile ? 6 : 14,
                top: '50%',
                transform: 'translateY(-50%)',
                width: isMobile ? 40 : 44,
                height: isMobile ? 40 : 44,
                borderRadius: '50%',
                boxShadow: N(true),
                background: 'var(--overlay)',
                opacity: isMobile ? 0.5 : 0.7,
                zIndex: 1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = N(false, true)
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.color = 'var(--accent)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = N(true)
                e.currentTarget.style.opacity = isMobile ? '0.5' : '0.7'
                e.currentTarget.style.color = 'var(--text-secondary)'
              }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(0.92)' }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)' }}
            >
              <svg width={isMobile ? 16 : 18} height={isMobile ? 16 : 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {/* ── Arrow: next ── */}
          {images.length > 1 && (
            <button
              onClick={next}
              aria-label="Next image"
              style={{
                ...btnCommon,
                position: 'absolute',
                right: isMobile ? 6 : 14,
                top: '50%',
                transform: 'translateY(-50%)',
                width: isMobile ? 40 : 44,
                height: isMobile ? 40 : 44,
                borderRadius: '50%',
                boxShadow: N(true),
                background: 'var(--overlay)',
                opacity: isMobile ? 0.5 : 0.7,
                zIndex: 1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = N(false, true)
                e.currentTarget.style.opacity = '1'
                e.currentTarget.style.color = 'var(--accent)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = N(true)
                e.currentTarget.style.opacity = isMobile ? '0.5' : '0.7'
                e.currentTarget.style.color = 'var(--text-secondary)'
              }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(0.92)' }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)' }}
            >
              <svg width={isMobile ? 16 : 18} height={isMobile ? 16 : 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>

        {/* ── Dots ── */}
        {images.length > 1 && (
          <div style={{ display: 'flex', gap: isMobile ? '0.5rem' : '0.65rem', alignItems: 'center' }}>
            {images.map((_, i) => {
              const active = i === index
              return (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`View image ${i + 1}`}
                  style={{
                    width: active ? (isMobile ? 36 : 30) : (isMobile ? 14 : 12),
                    height: isMobile ? 14 : 12,
                    borderRadius: isMobile ? 7 : 6,
                    border: 'none',
                    padding: 0,
                    background: 'var(--overlay)',
                    boxShadow: active ? N(false, true) : N(true),
                    cursor: 'pointer',
                    transition: 'box-shadow 0.25s, width 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.boxShadow = N(false, true)
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.boxShadow = N(true)
                  }}
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )

  return createPortal(content, document.body)
}
