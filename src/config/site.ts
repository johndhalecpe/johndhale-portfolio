// ──────────────────────────────────────────────
// Site Configuration
// ──────────────────────────────────────────────
// Central place for site-wide settings: nav links,
// social profiles, and metadata. Import anywhere
// instead of duplicating data across components.
//
// We use explicit types instead of `as const` to
// avoid TypeScript strict-mode inference issues
// through re-exports.
// ──────────────────────────────────────────────

export interface NavLink {
  href: string
  label: string
}

export interface SocialLink {
  label: string
  value: string
  href: string
}

export interface SiteConfig {
  navLinks: NavLink[]
  socials: SocialLink[]
  name: string
  title: string
  location: string
  email: string
  copyright: string
}

export const siteConfig: SiteConfig = {
  // ── Navigation ──
  navLinks: [
    { href: '#hero', label: 'JDP' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#journey', label: 'Journey' },
    { href: '#beyond', label: 'Beyond' },
    { href: '#contact', label: 'Contact' },
  ],

  // ── Social Links ──
  socials: [
    {
      label: 'GitHub',
      value: 'github.com/johndhalecpe',
      href: 'https://github.com/johndhalecpe',
    },
    {
      label: 'LinkedIn',
      value: 'John Dhale Peralta',
      href: 'https://www.linkedin.com/in/john-dhale-peralta-964300368',
    },
    {
      label: 'Resume',
      value: 'Download PDF',
      href: '/resume-2026.pdf',
    },
  ],

  // ── Personal Info ──
  name: 'John Dhale Peralta',
  title: 'Computer Engineer & Web Developer',
  location: 'Teresa, Rizal',
  email: 'john.dhale.peralta@gmail.com',

  // ── Footer ──
  copyright: '2026',
}
