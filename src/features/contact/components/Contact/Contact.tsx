'use client'

// ──────────────────────────────────────────────
// Features / Contact / Components / Contact
// ──────────────────────────────────────────────
// Contact form section with social links.
//
// What was extracted (the god file split):
//   - Form validation → utils/validation.ts (pure functions, testable)
//   - API call → services/contactApi.ts (network logic)
//   - Form state management → hooks/useContactForm.ts (state machine)
//
// Now this component ONLY handles:
//   - JSX markup and rendering
//   - Passing data/handlers from the hook to form fields
//
// Data flow:
//   useContactForm() → { formData, errors, status, handleSubmit, handleChange }
//       ↓                    ↓         ↓          ↓             ↓
//   <form>               <input>   <alert>    onSubmit      onChange
// ──────────────────────────────────────────────

import { useState } from 'react'
import { useScrollFade } from '@/hooks/useScrollFade'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useContactForm } from '../../hooks/useContactForm'
import { siteConfig } from '@/config/site'
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel'

// ── Social link SVG icons ──
// These are simple enough to keep inline with the component.
// Each icon matches the brand's official color/design style.

const socialIcons = {
  GitHub: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--accent)" strokeWidth="1.5">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--accent)" strokeWidth="1.5">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Resume: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--accent)" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
}

// ──────────────────────────────────────────────
// InputField — reusable form input component
// ──────────────────────────────────────────────

function InputField({
  id, label, type = 'text', value, error, placeholder, onChange,
}: {
  id: string; label: string; type?: string; value: string; error?: string
  placeholder: string; onChange: (val: string) => void
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label
        htmlFor={id}
        className="font-mono"
        style={{
          display: 'block', fontSize: 12, letterSpacing: 2,
          color: focused ? 'var(--accent)' : 'var(--text-secondary)',
          marginBottom: '0.4rem', textTransform: 'uppercase', transition: 'color 0.2s',
        }}
      >
        {label}
      </label>
      <input
        id={id} name={id} type={type} value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        required
        style={{
          width: '100%', padding: '0.65rem 0.85rem', background: 'var(--bg)',
          border: `1px solid ${error ? 'var(--secondary)' : focused ? 'var(--accent)' : 'var(--border)'}`,
          borderRadius: 2, color: 'var(--text)', fontSize: '0.85rem',
          fontFamily: "'JetBrains Mono', monospace", outline: 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          boxShadow: focused ? '0 0 0 1px var(--accent-dim)' : 'none',
        }}
      />
      {error && (
        <div id={`${id}-error`} className="font-mono" role="alert" style={{ fontSize: 11, color: 'var(--secondary)', marginTop: '0.3rem' }}>
          {error}
        </div>
      )}
    </div>
  )
}

// ──────────────────────────────────────────────
// TextareaField — reusable form textarea
// ──────────────────────────────────────────────

function TextareaField({
  id, label, value, error, placeholder, onChange,
}: {
  id: string; label: string; value: string; error?: string
  placeholder: string; onChange: (val: string) => void
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div style={{ marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
      <label
        htmlFor={id}
        className="font-mono"
        style={{
          display: 'block', fontSize: 12, letterSpacing: 2,
          color: focused ? 'var(--accent)' : 'var(--text-secondary)',
          marginBottom: '0.4rem', textTransform: 'uppercase', transition: 'color 0.2s',
        }}
      >
        {label}
      </label>
      <textarea
        id={id} name={id} value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={4} placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        required
        style={{
          width: '100%', flex: 1, padding: '0.65rem 0.85rem', background: 'var(--bg)',
          border: `1px solid ${error ? 'var(--secondary)' : focused ? 'var(--accent)' : 'var(--border)'}`,
          borderRadius: 2, color: 'var(--text)', fontSize: '0.85rem',
          fontFamily: "'JetBrains Mono', monospace", outline: 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          boxShadow: focused ? '0 0 0 1px var(--accent-dim)' : 'none',
          resize: 'none', minHeight: 90,
        }}
      />
      {error && (
        <div id={`${id}-error`} className="font-mono" role="alert" style={{ fontSize: 11, color: 'var(--secondary)', marginTop: '0.3rem' }}>
          {error}
        </div>
      )}
    </div>
  )
}

// ──────────────────────────────────────────────
// Contact — main section component
// ──────────────────────────────────────────────

export default function Contact() {
  const ref = useScrollFade()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const { formData, errors, status, handleSubmit, handleChange } = useContactForm()

  return (
    <section
      id="contact"
      ref={ref}
      className="scroll-fade"
      style={{ padding: isMobile ? '4rem 1.5rem' : '6rem 2rem', maxWidth: 1100, margin: '0 auto' }}
    >
      <SectionLabel sectionId="06 // contact" />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '2rem' : '3rem',
          alignItems: 'start',
        }}
      >
        {/* ── Left column: heading + social links ── */}
        <div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: -1, marginBottom: '1rem', lineHeight: 1.1 }}>
            Let&apos;s build
            <br />
            <span style={{ color: 'var(--accent)' }}>something.</span>
          </h2>

          <p className="font-mono" style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '0.9rem', lineHeight: 1.7 }}>
            Open to junior roles, freelance, and collaborations.
            <br />
            If you&apos;re building something interesting — let&apos;s talk.
          </p>

          <div className="font-mono" style={{ fontSize: 12, letterSpacing: 2, color: 'var(--secondary)', marginBottom: '1rem', textTransform: 'uppercase', opacity: 0.8 }}>
            {'// find me elsewhere'}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {siteConfig.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover"
                style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  padding: '0.85rem 1.1rem', borderRadius: 4,
                  display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    width: 34, height: 34, borderRadius: 2, background: 'var(--accent-dim)',
                    border: '1px solid var(--accent-border)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}
                >
                  {socialIcons[s.label as keyof typeof socialIcons]}
                </div>
                <div>
                  <div className="font-mono" style={{ fontSize: 11, letterSpacing: 2, color: 'var(--muted)', textTransform: 'uppercase' }}>
                    {s.label}
                  </div>
                  <div className="font-mono" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)', marginTop: 1 }}>
                    {s.value}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Right column: contact form ── */}
        <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="contact-form" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div
            style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderLeft: '2px solid var(--secondary)', borderRadius: '0 4px 4px 0',
              padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1,
            }}
          >
            <div className="font-mono" style={{ fontSize: 12, letterSpacing: 2, color: 'var(--muted)', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
              {'// send me a message!'}
            </div>

            <InputField
              id="name" label="Name" value={formData.name} error={errors.name}
              placeholder="your name" onChange={handleChange('name')}
            />
            <InputField
              id="email" label="Email" type="email" value={formData.email} error={errors.email}
              placeholder="yourcompany@email.com" onChange={handleChange('email')}
            />
            <TextareaField
              id="message" label="Message" value={formData.message} error={errors.message}
              placeholder="Tell me about your project or idea..." onChange={handleChange('message')}
            />

            {/* ── Submit button ── */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="font-mono"
              style={{
                width: '100%', padding: '0.75rem',
                background: status === 'loading' ? 'var(--bg3)' : 'var(--secondary)',
                color: status === 'loading' ? 'var(--muted)' : 'var(--text-inverse)',
                border: 'none', borderRadius: 2, fontSize: 12, letterSpacing: 2,
                textTransform: 'uppercase', fontWeight: 700,
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                if (status !== 'loading') {
                  e.currentTarget.style.boxShadow = '0 0 20px var(--secondary-dim)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }
              }}
              onMouseLeave={(e) => {
                if (status !== 'loading') {
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'translateY(0)'
                }
              }}
            >
              {status === 'loading' ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    width: 14, height: 14, border: '2px solid var(--muted)', borderTopColor: 'transparent',
                    borderRadius: '50%', animation: 'spin 0.6s linear infinite', display: 'inline-block',
                  }} />
                  Sending…
                </span>
              ) : (
                'Send Message'
              )}
            </button>

            {/* ── Status messages ── */}
            {status === 'success' && (
              <div className="font-mono" role="status" style={{
                marginTop: '0.75rem', padding: '0.65rem 0.85rem',
                background: 'var(--accent-dim)', border: '1px solid var(--accent-border)',
                borderRadius: 2, fontSize: 12, letterSpacing: 1, color: 'var(--accent)', textAlign: 'center',
              }}>
                Sent! I&apos;ll get back to you soon.
              </div>
            )}

            {status === 'error' && (
              <div className="font-mono" role="alert" style={{
                marginTop: '0.75rem', padding: '0.65rem 0.85rem',
                background: 'var(--error-dim)', border: '1px solid var(--error-border)',
                borderRadius: 2, fontSize: 12, letterSpacing: 1, color: 'var(--error)', textAlign: 'center',
              }}>
                Failed to send. Try again or reach out via LinkedIn.
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
