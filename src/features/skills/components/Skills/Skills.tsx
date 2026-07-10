'use client'

import { useScrollFade } from '@/hooks/useScrollFade'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { skillGroups } from '../../data'
import { getSkillIcon } from '../SkillIcon/SkillIcon'
import { Skill, SkillGroup } from '../../types'
import SectionLabel from '@/components/ui/SectionLabel/SectionLabel'

function SkillCarouselItem({ skill, color }: { skill: Skill; color: string }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '1.1rem',
        padding: '1rem 1.9rem',
        borderRadius: 10,
        border: `1px solid ${color}40`,
        background: `${color}08`,
        cursor: 'default',
        flexShrink: 0,
      }}
    >
      <span style={{ color, flexShrink: 0, display: 'flex', width: 41, height: 41, alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ transform: 'scale(2.35)', transformOrigin: 'center', display: 'flex' }}>
          {getSkillIcon(skill.name)}
        </span>
      </span>
      <span
        className="font-mono"
        style={{
          fontSize: 20,
          letterSpacing: 0.5,
          color,
          fontWeight: 600,
          whiteSpace: 'nowrap',
        }}
      >
        {skill.name}
      </span>
    </div>
  )
}

function SkillCarousel({ group, index }: { group: SkillGroup; index: number }) {
  const direction = index % 2 === 0 ? 'scroll-left' : 'scroll-right'
  const duration = group.label === 'AI & Productivity' ? '20s' : '40s'

  const items = group.skills.map((skill) => (
    <SkillCarouselItem key={skill.name} skill={skill} color={group.color} />
  ))

  return (
    <div>
      {/* ── Category label (centered) ── */}
      <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
        <div
          className="font-mono"
          style={{
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: 2,
            color: group.color,
            textTransform: 'uppercase',
            opacity: 0.8,
          }}
        >
          {'>'} {group.label}
        </div>
      </div>

      {/* ── Scrolling track ── */}
      <div className="skill-scroll-container">
        <div
          className={`skill-scroll-track ${direction}`}
          style={{ animationDuration: duration }}
        >
          {items}
          {items}
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useScrollFade()
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <section
      id="skills"
      ref={ref}
      className="scroll-fade"
      style={{ padding: isMobile ? '4rem 1.5rem' : '6rem 2rem', maxWidth: 1100, margin: '0 auto', position: 'relative' }}
    >
      <span className="code-texture" style={{ top: 40, right: 20, color: 'var(--accent)', opacity: 0.04, transform: 'rotate(-2deg)' }}>
        {'const skills = ["React", "Next.js", "TypeScript"]'}
      </span>
      <span className="code-texture" style={{ bottom: 60, left: 40, color: 'var(--secondary)', opacity: 0.03, transform: 'rotate(1deg)' }}>
        {'function useSkill(level) { return level > 9000; }'}
      </span>

      <SectionLabel sectionId="02 // skills" />

      <h2
        style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          letterSpacing: -1,
          marginBottom: '3rem',
          lineHeight: 1.1,
        }}
      >
        Tools I work
        <br />
        <span style={{ color: 'var(--accent)' }}>with.</span>
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {skillGroups.map((group, i) => (
          <SkillCarousel key={group.label} group={group} index={i} />
        ))}
      </div>
    </section>
  )
}
