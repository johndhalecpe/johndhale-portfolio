// ──────────────────────────────────────────────
// Projects — data layer
// ──────────────────────────────────────────────
// All project data extracted from the Projects
// component. Update projects here without touching
// the UI code.
// ──────────────────────────────────────────────

import { Project } from './types'

export const projects: Project[] = [
  {
    num: '04 // web application',
    name: 'Calculator Noir',
    desc: 'A dark-themed, cinematic calculator with a noir aesthetic. Features responsive arithmetic operations, calculation history tracking, and a sleek UI — blending design sensibility with functional web development.',
    tags: ['Next.js', 'TypeScript', 'React', 'UI/UX'],
    dashed: false,
    href: 'https://next-calc-john-dhale.vercel.app/',
    images: ['/calcu noir.jpg'],
  },
  {
    num: '05 // flagship thesis',
    name: 'Sheep Disease Diagnostic System',
    desc: 'An academic capstone project applying machine learning techniques to assist in diagnosing sheep diseases. Built as a data-driven diagnostic tool combining research, problem-solving, and intelligent system design — demonstrating how engineering can drive real-world impact in agriculture.',
    tags: ['Deep Learning', 'Disease Diagnosis', 'Data-Driven', 'Research', 'Python'],
    dashed: false,
  },
  {
    num: '06 // coming soon',
    name: 'Web Projects',
    desc: 'Task manager, IoT dashboard, and more in development. Combining CpE hardware background with modern web tech for unique full-stack projects.',
    tags: ['Next.js', 'TypeScript', 'React', 'In Progress'],
    dashed: true,
  },
  {
    num: '07 // embedded systems',
    name: 'Memory Game — Arduino',
    desc: 'Simon Says-style memory game on a microcontroller with LEDs, push buttons, and real-time input handling.',
    tags: ['Arduino', 'C/C++', 'Embedded'],
    dashed: false,
    compact: true,
  },
  {
    num: '08 // sensor integration',
    name: 'Heartbeat Monitor',
    desc: 'Real-time heart rate monitoring with pulse sensor and OLED display — biometric data processing and live rendering.',
    tags: ['Arduino', 'Pulse Sensor', 'OLED'],
    dashed: false,
    compact: true,
  },
]
