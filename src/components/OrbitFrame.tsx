import { useId, type CSSProperties } from 'react'
import { useInView } from '../hooks/useInView'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface OrbitFrameProps {
  /** 'whiteboard' draws the physics graphic. 'portrait' draws a silhouette until a photo is supplied. */
  variant: 'whiteboard' | 'portrait'
  /** Photo to show inside the ring. When set, it replaces the graphic. */
  photoSrc?: string | null
  photoAlt: string
  /** Small label shown on a placeholder. Leave undefined for no label. */
  placeholderLabel?: string
  className?: string
}

const SIZE = 560
const CENTER = SIZE / 2
const ARC_RADIUS = CENTER - 18
const INNER_RADIUS = CENTER - 48

function pointOnCircle(angleDegrees: number, radius: number) {
  const angleRadians = (angleDegrees * Math.PI) / 180
  return { x: CENTER + radius * Math.cos(angleRadians), y: CENTER + radius * Math.sin(angleRadians) }
}

export default function OrbitFrame({ variant, photoSrc, photoAlt, placeholderLabel, className }: OrbitFrameProps) {
  const instanceId = useId()
  const prefersReducedMotion = usePrefersReducedMotion()
  const { elementRef, hasEnteredView } = useInView<SVGSVGElement>(0.25)
  const gradientId = `${instanceId}-gradient`
  const clipId = `${instanceId}-clip`
  const arcStart = pointOnCircle(100, ARC_RADIUS)
  const arcEnd = pointOnCircle(305, ARC_RADIUS)
  const gridPositions = Array.from({ length: SIZE / 40 }, (_, step) => step * 40)
  const trajectoryPath = `M${CENTER - 190} ${CENTER + 120} Q${CENTER} ${CENTER - 210} ${CENTER + 190} ${CENTER + 120}`
  const labelWidth = placeholderLabel ? placeholderLabel.length * 7.4 + 36 : 0

  return (
    <svg
      ref={elementRef}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label={photoAlt}
      className={`orbit-frame block h-auto w-full ${hasEnteredView ? 'in-view' : ''} ${className ?? ''}`}
    >
      <defs>
        <radialGradient id={gradientId} cx="35%" cy="30%" r="85%">
          <stop offset="0" stopColor="#0b4a8a" />
          <stop offset="1" stopColor="#001633" />
        </radialGradient>
        <clipPath id={clipId}>
          <circle cx={CENTER} cy={CENTER} r={INNER_RADIUS} />
        </clipPath>
      </defs>

      <path
        className="arc-draw"
        pathLength={1}
        d={`M${arcStart.x.toFixed(1)} ${arcStart.y.toFixed(1)} A${ARC_RADIUS} ${ARC_RADIUS} 0 1 1 ${arcEnd.x.toFixed(1)} ${arcEnd.y.toFixed(1)}`}
        fill="none"
        stroke="#ff780d"
        strokeWidth={12}
        strokeLinecap="round"
      />
      <circle className="arc-dot" cx={arcEnd.x} cy={arcEnd.y} r={17} fill="#ff780d" />

      <g clipPath={`url(#${clipId})`}>
        {photoSrc ? (
          <>
            <image
              href={photoSrc}
              x={CENTER - INNER_RADIUS}
              y={CENTER - INNER_RADIUS}
              width={INNER_RADIUS * 2}
              height={INNER_RADIUS * 2}
              preserveAspectRatio="xMidYMid slice"
            />
            <rect width={SIZE} height={SIZE} fill="#002955" fillOpacity={0.14} />
          </>
        ) : (
          <>
            <rect width={SIZE} height={SIZE} fill={`url(#${gradientId})`} />
            {variant === 'whiteboard' ? (
              <>
                <g stroke="#ffffff" strokeOpacity={0.1} strokeWidth={1}>
                  {gridPositions.map((position) => (
                    <path key={`v-${position}`} d={`M${position} 0V${SIZE}`} />
                  ))}
                  {gridPositions.map((position) => (
                    <path key={`h-${position}`} d={`M0 ${position}H${SIZE}`} />
                  ))}
                </g>
                <path
                  d={trajectoryPath}
                  stroke="#ffffff"
                  strokeOpacity={0.3}
                  strokeWidth={3}
                  fill="none"
                  strokeDasharray="3 10"
                  strokeLinecap="round"
                />
                <path
                  className="curve-draw"
                  pathLength={1}
                  d={trajectoryPath}
                  stroke="#ffffff"
                  strokeOpacity={0.7}
                  strokeWidth={3}
                  fill="none"
                  strokeLinecap="round"
                />
                {prefersReducedMotion ? (
                  <circle cx={CENTER} cy={CENTER - 45} r={9} fill="#ff780d" />
                ) : hasEnteredView ? (
                  <circle r={9} fill="#ff780d">
                    <animateMotion dur="2.2s" begin="0.7s" fill="freeze" path={trajectoryPath} calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1" />
                  </circle>
                ) : null}
                <text className="fade-item" style={{ '--delay': '1.2s' } as CSSProperties} x={CENTER - 170} y={CENTER - 130} fill="#ffffff" fillOpacity={0.6} fontSize={30} fontStyle="italic" fontFamily="Newsreader, Georgia, serif">
                  F = ma
                </text>
                <text className="fade-item" style={{ '--delay': '1.7s' } as CSSProperties} x={CENTER + 20} y={CENTER + 170} fill="#ffffff" fillOpacity={0.5} fontSize={26} fontStyle="italic" fontFamily="Newsreader, Georgia, serif">
                  v = u + at
                </text>
              </>
            ) : (
              <>
                <circle cx={CENTER} cy={CENTER - 36} r={58} fill="#ffffff" fillOpacity={0.18} />
                <path
                  d={`M${CENTER - 120} ${CENTER + INNER_RADIUS} Q${CENTER - 120} ${CENTER + 40} ${CENTER} ${CENTER + 40} Q${CENTER + 120} ${CENTER + 40} ${CENTER + 120} ${CENTER + INNER_RADIUS} Z`}
                  fill="#ffffff"
                  fillOpacity={0.18}
                />
              </>
            )}
          </>
        )}
      </g>

      {placeholderLabel && !photoSrc ? (
        <g>
          <rect x={CENTER - labelWidth / 2} y={CENTER + INNER_RADIUS - 62} width={labelWidth} height={30} rx={15} fill="#001633" fillOpacity={0.78} />
          <text x={CENTER} y={CENTER + INNER_RADIUS - 42} textAnchor="middle" fill="#ffffff" fontSize={13.5} fontWeight={600} fontFamily="Hanken Grotesk, Segoe UI, sans-serif">
            {placeholderLabel}
          </text>
        </g>
      ) : null}
    </svg>
  )
}
