import type { SubjectIconName } from '../data/content'

const NAVY = '#002955'
const ORANGE = '#ff780d'

interface SubjectIconProps {
  name: SubjectIconName
}

/** Small line illustrations. Animations are defined in index.css and start when the parent gains the "in-view" class. */
export default function SubjectIcon({ name }: SubjectIconProps) {
  const commonProps = {
    viewBox: '0 0 64 64',
    fill: 'none',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    className: `subject-icon icon-${name} size-16 md:size-[76px]`,
  }

  switch (name) {
    case 'physics':
      return (
        <svg {...commonProps}>
          <path d="M13 8H51" stroke={NAVY} strokeWidth={3} />
          <path d="M13 40.9A38 38 0 0 0 51 40.9" stroke={NAVY} strokeWidth={2} strokeDasharray="2 5" opacity={0.45} />
          <g className="pendulum-swing">
            <path d="M32 8V42" stroke={NAVY} strokeWidth={2.5} />
            <circle cx={32} cy={47} r={5.5} fill={ORANGE} stroke={NAVY} strokeWidth={2.5} />
          </g>
        </svg>
      )
    case 'chemistry':
      return (
        <svg {...commonProps}>
          <path d="M17.2 44H46.8L50.5 51.5Q53 56.5 47 56.5H17Q11 56.5 13.5 51.5Z" fill={ORANGE} stroke="none" />
          <path d="M24 8H40M27 8V24L13.5 51.5Q11 56.5 17 56.5H47Q53 56.5 50.5 51.5L37 24V8" stroke={NAVY} strokeWidth={2.5} />
          <g stroke={NAVY} strokeWidth={2}>
            <circle className="bubble bubble-one" cx={25} cy={51} r={2.2} />
            <circle className="bubble bubble-two" cx={34} cy={49} r={2.6} />
            <circle className="bubble bubble-three" cx={30} cy={36} r={2} />
            <circle className="bubble bubble-four" cx={35} cy={29} r={1.5} />
          </g>
        </svg>
      )
    case 'biology':
      return (
        <svg {...commonProps}>
          <g className="cell-left">
            <circle cx={32} cy={32} r={12} stroke={NAVY} strokeWidth={2.5} />
            <circle cx={32} cy={32} r={4} fill={ORANGE} />
          </g>
          <g className="cell-right">
            <circle cx={32} cy={32} r={12} stroke={NAVY} strokeWidth={2.5} />
            <circle cx={32} cy={32} r={4} fill={ORANGE} />
          </g>
        </svg>
      )
    case 'mathematics':
      return (
        <svg {...commonProps}>
          <path d="M8 32H56M8 12V52" stroke={NAVY} strokeWidth={2} opacity={0.55} />
          <path className="draw" pathLength={1} d="M8 32C14 16 26 16 32 32S50 48 56 32" stroke={ORANGE} strokeWidth={3.5} />
        </svg>
      )
    case 'furtherMaths':
      return (
        <svg {...commonProps}>
          <path d="M12 14Q32 66 52 14" stroke={NAVY} strokeWidth={2.5} />
          <path className="draw" pathLength={1} d="M30 49.1L54 17.9" stroke={ORANGE} strokeWidth={3.5} />
          <circle className="tangent-point" cx={42} cy={33.5} r={4} fill={ORANGE} stroke={NAVY} strokeWidth={2} />
        </svg>
      )
    case 'english':
      return (
        <svg {...commonProps}>
          <path d="M32 6L44 30L36 50L32 55L28 50L20 30Z" stroke={NAVY} strokeWidth={2.5} />
          <path d="M32 29V53" stroke={NAVY} strokeWidth={2} />
          <circle cx={32} cy={25} r={2.8} fill={ORANGE} />
          <path
            className="draw"
            pathLength={1}
            d="M6 61C12 57 16 63 22 60S32 58 38 61S50 62 58 58"
            stroke={ORANGE}
            strokeWidth={2.8}
          />
        </svg>
      )
  }
}
