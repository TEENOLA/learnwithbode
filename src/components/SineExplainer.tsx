import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import { useInView } from '../hooks/useInView'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import Container from './Container'

const MAX_ANGLE_DEGREES = 720
const DEGREES_PER_SECOND = 55
const START_ANGLE_FOR_STILL_VIEW = 405

// SVG geometry (viewBox 700 x 240, starting at y = 44)
const CIRCLE_CENTER_X = 95
const CIRCLE_CENTER_Y = 150
const CIRCLE_RADIUS = 80
const WAVE_START_X = 225
const WAVE_END_X = 680
const PIXELS_PER_DEGREE = (WAVE_END_X - WAVE_START_X) / MAX_ANGLE_DEGREES
const WAVE_TICK_ANGLES = [0, 180, 360, 540, 720]

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180
}

function formatSine(value: number) {
  const rounded = Math.abs(value) < 0.005 ? 0 : value
  return rounded.toFixed(2).replace('-', '−')
}

function buildWavePath(angleDegrees: number) {
  const commands: string[] = []
  for (let degrees = 0; degrees <= angleDegrees; degrees += 2) {
    const x = WAVE_START_X + degrees * PIXELS_PER_DEGREE
    const y = CIRCLE_CENTER_Y - CIRCLE_RADIUS * Math.sin(toRadians(degrees))
    commands.push(`${commands.length === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  const lastX = WAVE_START_X + angleDegrees * PIXELS_PER_DEGREE
  const lastY = CIRCLE_CENTER_Y - CIRCLE_RADIUS * Math.sin(toRadians(angleDegrees))
  commands.push(`L${lastX.toFixed(1)} ${lastY.toFixed(1)}`)
  return commands.join(' ')
}

export default function SineExplainer() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const { elementRef, hasEnteredView } = useInView<HTMLElement>(0.35)
  const [angleDegrees, setAngleDegrees] = useState(prefersReducedMotion ? START_ANGLE_FOR_STILL_VIEW : 0)
  const [isPlaying, setIsPlaying] = useState(false)
  const hasAutoPlayedRef = useRef(false)

  // Play once automatically the first time the section is seen, unless the visitor prefers reduced motion.
  useEffect(() => {
    if (hasEnteredView && !prefersReducedMotion && !hasAutoPlayedRef.current) {
      hasAutoPlayedRef.current = true
      setIsPlaying(true)
    }
  }, [hasEnteredView, prefersReducedMotion])

  useEffect(() => {
    if (!isPlaying) return
    let animationFrameId = 0
    let previousTimestamp: number | null = null

    function step(timestamp: number) {
      if (previousTimestamp === null) previousTimestamp = timestamp
      const elapsedSeconds = (timestamp - previousTimestamp) / 1000
      previousTimestamp = timestamp
      let reachedEnd = false
      setAngleDegrees((current) => {
        const next = current + elapsedSeconds * DEGREES_PER_SECOND
        if (next >= MAX_ANGLE_DEGREES) {
          reachedEnd = true
          return MAX_ANGLE_DEGREES
        }
        return next
      })
      if (reachedEnd) {
        setIsPlaying(false)
      } else {
        animationFrameId = requestAnimationFrame(step)
      }
    }

    animationFrameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isPlaying])

  function handleSliderChange(event: ChangeEvent<HTMLInputElement>) {
    setIsPlaying(false)
    setAngleDegrees(Number(event.target.value))
  }

  function handlePlayToggle() {
    if (isPlaying) {
      setIsPlaying(false)
      return
    }
    if (angleDegrees >= MAX_ANGLE_DEGREES) setAngleDegrees(0)
    setIsPlaying(true)
  }

  const angleRadians = toRadians(angleDegrees)
  const sineValue = Math.sin(angleRadians)
  const pointX = CIRCLE_CENTER_X + CIRCLE_RADIUS * Math.cos(angleRadians)
  const pointY = CIRCLE_CENTER_Y - CIRCLE_RADIUS * sineValue
  const waveHeadX = WAVE_START_X + angleDegrees * PIXELS_PER_DEGREE
  const angleWithinTurn = angleDegrees % 360
  const arcRadius = 24
  const arcEndX = CIRCLE_CENTER_X + arcRadius * Math.cos(toRadians(angleWithinTurn))
  const arcEndY = CIRCLE_CENTER_Y - arcRadius * Math.sin(toRadians(angleWithinTurn))
  const showAngleArc = angleWithinTurn > 1
  const roundedAngle = Math.round(angleDegrees)
  const buttonLabel = isPlaying ? 'Pause' : angleDegrees >= MAX_ANGLE_DEGREES ? 'Replay' : 'Play'

  return (
    <section ref={elementRef} aria-labelledby="concepts-heading" className="bg-navy text-white">
      <Container className="grid items-center gap-10 py-16 md:py-28 lg:grid-cols-12 lg:gap-x-12">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <h2 id="concepts-heading" className="font-serif text-4xl leading-[1.08] tracking-[-0.015em] md:text-[48px]">
            Concepts, made simple.
          </h2>
          <p className="max-w-[460px] text-[17px] leading-[1.65] text-sky md:text-lg">
            Take the sine wave. It looks like a formula to memorise, but it is just a point going round a circle. The
            height of that point is sin θ. Plot the height against the angle and the wave appears.
          </p>
          <p className="max-w-[460px] text-[17px] leading-[1.65] text-sky md:text-lg">
            Drag the angle and watch it happen. We teach every topic this way: see why it works first, then practise it.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-[10px] border border-white/15 bg-navy-deep p-3 md:p-6">
            <svg
              viewBox="0 44 700 248"
              role="img"
              aria-label={`A point going round a circle and the sine wave it draws. At ${roundedAngle} degrees, sine is ${formatSine(sineValue)}.`}
              className="block h-auto w-full"
            >
              {/* Circle and its axes */}
              <g stroke="#ffffff" strokeOpacity={0.22} strokeWidth={1.5}>
                <path d={`M${CIRCLE_CENTER_X - CIRCLE_RADIUS - 12} ${CIRCLE_CENTER_Y}H${CIRCLE_CENTER_X + CIRCLE_RADIUS + 12}`} />
                <path d={`M${CIRCLE_CENTER_X} ${CIRCLE_CENTER_Y - CIRCLE_RADIUS - 12}V${CIRCLE_CENTER_Y + CIRCLE_RADIUS + 12}`} />
              </g>
              <circle cx={CIRCLE_CENTER_X} cy={CIRCLE_CENTER_Y} r={CIRCLE_RADIUS} fill="none" stroke="#9fb8d6" strokeWidth={2} />

              {/* Wave axes, guide lines and labels */}
              <g stroke="#ffffff" strokeOpacity={0.22} strokeWidth={1.5}>
                <path d={`M${WAVE_START_X} ${CIRCLE_CENTER_Y}H${WAVE_END_X}`} />
                <path d={`M${WAVE_START_X} ${CIRCLE_CENTER_Y - CIRCLE_RADIUS - 12}V${CIRCLE_CENTER_Y + CIRCLE_RADIUS + 12}`} />
              </g>
              <g stroke="#ffffff" strokeOpacity={0.14} strokeWidth={1.5} strokeDasharray="3 6">
                <path d={`M${WAVE_START_X} ${CIRCLE_CENTER_Y - CIRCLE_RADIUS}H${WAVE_END_X}`} />
                <path d={`M${WAVE_START_X} ${CIRCLE_CENTER_Y + CIRCLE_RADIUS}H${WAVE_END_X}`} />
              </g>
              <g fill="#9fb8d6" fontSize={22} fontFamily="Hanken Grotesk, Segoe UI, sans-serif">
                {WAVE_TICK_ANGLES.map((tickAngle) => (
                  <text
                    key={tickAngle}
                    x={WAVE_START_X + tickAngle * PIXELS_PER_DEGREE}
                    y={CIRCLE_CENTER_Y + CIRCLE_RADIUS + 38}
                    textAnchor="middle"
                  >
                    {tickAngle}°
                  </text>
                ))}
                <text x={WAVE_START_X - 12} y={CIRCLE_CENTER_Y - CIRCLE_RADIUS + 6} textAnchor="end">
                  1
                </text>
                <text x={WAVE_START_X - 12} y={CIRCLE_CENTER_Y + 6} textAnchor="end">
                  0
                </text>
                <text x={WAVE_START_X - 12} y={CIRCLE_CENTER_Y + CIRCLE_RADIUS + 6} textAnchor="end">
                  −1
                </text>
              </g>

              {/* The wave drawn so far */}
              <path d={buildWavePath(angleDegrees)} fill="none" stroke="#ffffff" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />

              {/* Link from the point to the wave */}
              <path d={`M${pointX.toFixed(1)} ${pointY.toFixed(1)}H${waveHeadX.toFixed(1)}`} stroke="#ff780d" strokeWidth={1.5} strokeDasharray="4 6" strokeOpacity={0.9} />

              {/* Angle arc, radius and height of the point */}
              {showAngleArc ? (
                <path
                  d={`M${CIRCLE_CENTER_X + arcRadius} ${CIRCLE_CENTER_Y} A${arcRadius} ${arcRadius} 0 ${angleWithinTurn > 180 ? 1 : 0} 0 ${arcEndX.toFixed(1)} ${arcEndY.toFixed(1)}`}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth={2}
                  strokeOpacity={0.7}
                />
              ) : null}
              <path d={`M${CIRCLE_CENTER_X} ${CIRCLE_CENTER_Y}L${pointX.toFixed(1)} ${pointY.toFixed(1)}`} stroke="#ffffff" strokeWidth={2} />
              <path
                d={`M${pointX.toFixed(1)} ${CIRCLE_CENTER_Y}L${pointX.toFixed(1)} ${pointY.toFixed(1)}`}
                stroke="#ff780d"
                strokeWidth={4}
                strokeLinecap="round"
              />
              <circle cx={pointX} cy={pointY} r={7.5} fill="#ff780d" stroke="#ffffff" strokeWidth={2} />
              <circle cx={waveHeadX} cy={pointY} r={6} fill="#ff780d" />
            </svg>

            <div className="mt-3 grid gap-4 md:mt-4 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center md:gap-6">
              <button
                type="button"
                onClick={handlePlayToggle}
                className="inline-flex min-h-11 min-w-[104px] items-center justify-center rounded-md border-2 border-white px-5 text-[15px] font-semibold text-white hover:bg-white/10"
              >
                {buttonLabel}
              </button>
              <label className="flex flex-col gap-1.5 text-sm font-semibold text-sky">
                Angle
                <input
                  type="range"
                  min={0}
                  max={MAX_ANGLE_DEGREES}
                  step={1}
                  value={Math.round(angleDegrees)}
                  onChange={handleSliderChange}
                  aria-valuetext={`${roundedAngle} degrees, sine ${formatSine(sineValue)}`}
                  className="h-6 w-full cursor-pointer accent-[#ff780d]"
                />
              </label>
              <p aria-hidden="true" className="flex gap-5 font-serif text-xl tabular-nums md:text-2xl">
                <span>θ = {roundedAngle}°</span>
                <span className="text-orange-soft">sin θ = {formatSine(sineValue)}</span>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
