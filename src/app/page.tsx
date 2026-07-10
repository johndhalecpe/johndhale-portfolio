'use client'

// ──────────────────────────────────────────────
// Home page — orchestrator
// ──────────────────────────────────────────────
// This is the root page of the portfolio. It acts
// as an orchestrator — it doesn't contain any
// section logic itself, it just imports and
// arranges the order of feature components.
//
// Data flow:
//   1. Reads theme from ThemeContext for particle colors
//   2. Dynamically imports Particles (WebGL, needs browser)
//   3. Renders all sections in order with dividers between
//   4. Navbar + Particles are fixed, content scrolls
// ──────────────────────────────────────────────

import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useTheme } from '@/context/ThemeContext'

import Navbar from '@/components/shared/Navbar/Navbar'
import Hero from '@/features/hero/components/Hero/Hero'
import About from '@/features/about/components/About/About'
import Skills from '@/features/skills/components/Skills/Skills'
import Projects from '@/features/projects/components/Projects/Projects'
import Journey from '@/features/journey/components/Journey/Journey'
import BeyondTech from '@/features/beyondtech/components/BeyondTech/BeyondTech'
import Contact from '@/features/contact/components/Contact/Contact'
import Footer from '@/components/shared/Footer/Footer'
import Divider from '@/components/ui/Divider/Divider'

// Particles uses WebGL (OGL library) and can't be SSR-rendered
const Particles = dynamic(() => import('@/components/shared/Particles/Particles'), { ssr: false })

export default function Home() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Particle colors change based on theme — useMemo avoids
  // recalculating on every render (only when isDark changes).
  const particleColors = useMemo(
    () => (isDark ? ['#52525b', '#27272a'] : ['#d4d4ce', '#c8c8c0']),
    [isDark]
  )

  return (
    <>
      {/* ── Background: 3D particle system ── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <Particles
          particleColors={particleColors}
          particleCount={200}
          particleSpread={20}
          speed={0.08}
          particleBaseSize={200}
          moveParticlesOnHover
          alphaParticles
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      {/* ── Foreground: scrollable content ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <div className="navbar-spacer" />
        <main>
          <Hero />
          <Divider />
          <About />
          <Divider />
          <Skills />
          <Divider />
          <Projects />
          <Divider />
          <Journey />
          <Divider />
          <BeyondTech />
          <Divider />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
