'use client'

// ──────────────────────────────────────────────
// Navbar — shared app component
// ──────────────────────────────────────────────
// Sticky top navigation with:
//   1. Scroll-aware background (transparent → solid on scroll)
//   2. IntersectionObserver to highlight the active section
//   3. Theme toggle button (sun/moon)
//   4. Responsive: desktop links or mobile hamburger menu
//
// Data flow:
//   - Reads `theme` from ThemeContext for dark/light toggle
//   - Uses `useMediaQuery` to switch between desktop/mobile layout
//   - Nav link definitions come from site config
// ──────────────────────────────────────────────

import { useState, useEffect, useCallback, useRef } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { navLinks } from '@/constants/navigation'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')
  const { theme, toggle } = useTheme()
  const [toggleHover, setToggleHover] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuClosing, setMenuClosing] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isDark = theme === 'dark'

  // ── Scroll listener ──
  // Tracks whether user has scrolled past 20px.
  // When scrolled, navbar gets a solid background.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── IntersectionObserver for active section ──
  // Watches all section elements. When a section enters
  // the viewport, we mark its nav link as "active" (highlighted).
  useEffect(() => {
    // Query all section elements and filter out nulls
    const sectionElements = navLinks
      .map((l: { href: string; label: string }) => document.querySelector(l.href))
      .filter((el: Element | null): el is Element => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sectionElements.forEach((el: Element) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const closeMenu = useCallback(() => {
    if (!menuOpen || menuClosing) return
    setMenuClosing(true)
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => {
      setMenuOpen(false)
      setMenuClosing(false)
    }, 300) // matches slideUp duration
  }, [menuOpen, menuClosing])

  const openMenu = useCallback(() => {
    setMenuOpen(true)
    setMenuClosing(false)
  }, [])

  return (
    <nav
      className={styles.nav}
      style={{ background: scrolled ? 'var(--bg)' : 'transparent' }}
    >
      <div className={`${styles.inner} ${isMobile ? styles.innerMobile : ''}`}>
        {/* Logo: JD CpE */}
        <a href="#hero" className={styles.logo} onClick={closeMenu}>
          <span className={`${styles.logoJd} ${isMobile ? styles.logoJdMobile : ''}`}>
            JD
          </span>
          <span className={`${styles.logoCpe} ${isMobile ? styles.logoCpeMobile : ''}`}>
            CpE
          </span>
        </a>

        {/* Desktop navigation links */}
        {!isMobile && (
          <div className={styles.desktopLinks}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.navLink}
                style={{
                  color: active === link.href ? 'var(--accent)' : 'var(--muted)',
                  background: active === link.href ? 'var(--accent-dim)' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (active !== link.href) {
                    e.currentTarget.style.color = 'var(--secondary)'
                    e.currentTarget.style.background = 'var(--secondary-dim)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (active !== link.href) {
                    e.currentTarget.style.color = 'var(--muted)'
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                {link.label}
              </a>
            ))}

            {/* Desktop theme toggle */}
            <button
              onClick={toggle}
              onMouseEnter={() => setToggleHover(true)}
              onMouseLeave={() => setToggleHover(false)}
              aria-label="Toggle theme"
              style={{
                marginLeft: 12,
                width: 52,
                height: 28,
                borderRadius: 14,
                background: isDark ? 'var(--bg3)' : 'var(--toggle-bg)',
                border: `1px solid ${toggleHover ? 'var(--accent)' : 'var(--border)'}`,
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.3s',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                padding: 0,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 3,
                  left: isDark ? 3 : 27,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: isDark ? 'var(--accent)' : 'var(--secondary)',
                  transition: 'all 0.35s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isDark
                    ? '0 0 8px var(--ring)'
                    : '0 0 8px var(--secondary-dim)',
                }}
              >
                {isDark ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  </svg>
                ) : (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </div>
              {isDark && (
                <>
                  <div style={{ position: 'absolute', top: 6, right: 10, width: 2, height: 2, borderRadius: '50%', background: 'var(--text)', opacity: 0.2 }} />
                  <div style={{ position: 'absolute', top: 14, right: 6, width: 1.5, height: 1.5, borderRadius: '50%', background: 'var(--text)', opacity: 0.15 }} />
                  <div style={{ position: 'absolute', bottom: 6, right: 14, width: 1, height: 1, borderRadius: '50%', background: 'var(--text)', opacity: 0.1 }} />
                </>
              )}
            </button>
          </div>
        )}

        {/* Mobile: hamburger menu + theme toggle */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Mobile theme toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              style={{
                width: 40,
                height: 22,
                borderRadius: 11,
                background: isDark ? 'var(--bg3)' : 'var(--toggle-bg)',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.3s',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                padding: 0,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 2,
                  left: isDark ? 2 : 20,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: isDark ? 'var(--accent)' : 'var(--secondary)',
                  transition: 'all 0.35s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isDark ? (
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  </svg>
                ) : (
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </div>
            </button>

            {/* Hamburger button */}
            <button
              onClick={() => (menuOpen && !menuClosing ? closeMenu() : openMenu())}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: 20,
                  height: 2,
                  background: 'var(--text)',
                  borderRadius: 1,
                  transition: 'all 0.3s',
                  transform: menuOpen && !menuClosing ? 'rotate(45deg) translate(3px, 3px)' : 'none',
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: 20,
                  height: 2,
                  background: 'var(--text)',
                  borderRadius: 1,
                  transition: 'all 0.3s',
                  opacity: menuOpen && !menuClosing ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: 20,
                  height: 2,
                  background: 'var(--text)',
                  borderRadius: 1,
                  transition: 'all 0.3s',
                  transform: menuOpen && !menuClosing ? 'rotate(-45deg) translate(3px, -3px)' : 'none',
                }}
              />
            </button>
          </div>
        )}
      </div>

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <div
          className={`${styles.mobileDropdown} ${menuClosing ? styles.closing : ''}`}
          onAnimationEnd={() => {
            if (menuClosing) {
              setMenuOpen(false)
              setMenuClosing(false)
            }
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={closeMenu}
              style={{
                color: active === link.href ? 'var(--accent)' : 'var(--text-secondary)',
                background: active === link.href ? 'var(--accent-dim)' : 'transparent',
                borderLeftColor: active === link.href ? 'var(--accent)' : 'transparent',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
