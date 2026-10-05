import type { CSSProperties } from 'react'
import { steps } from '../data/content'
import { useInView } from '../hooks/useInView'
import Container from './Container'

/** Vertical climb between neighbouring steps on large screens, in pixels. */
const RISE_PX = 52
const NODE_SIZE_PX = 34
const NODE_CENTRE_PX = NODE_SIZE_PX / 2

export default function HowItWorks() {
  const lastStepIndex = steps.length - 1
  const { elementRef, hasEnteredView } = useInView<HTMLOListElement>(0.35)

  return (
    <section className="overflow-hidden bg-tint">
      <Container className="py-16 md:py-28">
        <h2 className="max-w-[640px] font-serif text-[34px] leading-[1.1] tracking-[-0.015em] text-navy md:text-[44px]">
          Getting started takes four steps.
        </h2>

        <ol ref={elementRef} className={`steps-line mt-10 lg:mt-12 lg:grid lg:grid-cols-4 lg:gap-x-12 ${hasEnteredView ? 'in-view' : ''}`}>
          {steps.map((step, index) => {
            const isLastStep = index === lastStepIndex
            const stepStyle = {
              '--step-offset': `${(lastStepIndex - index) * RISE_PX}px`,
              '--step-delay': `${index * 0.6}s`,
            } as CSSProperties
            return (
              <li
                key={step.title}
                style={stepStyle}
                className="relative pb-9 pl-14 last:pb-0 lg:mt-[var(--step-offset)] lg:pb-0 lg:pl-0 lg:pt-14"
              >
                {/* Mobile: a straight vertical line between nodes. */}
                {isLastStep ? null : (
                  <span
                    aria-hidden="true"
                    className="step-connector-vertical absolute bottom-0 top-[34px] left-4 w-[3px] bg-orange lg:hidden"
                  />
                )}

                {/* Large screens: a rising line from this node to the next, like points on a graph. */}
                {isLastStep ? null : (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="step-connector pointer-events-none absolute hidden lg:block"
                    style={{
                      left: NODE_CENTRE_PX,
                      top: NODE_CENTRE_PX - RISE_PX,
                      height: RISE_PX,
                      width: 'calc(100% + 3rem)',
                    }}
                  >
                    <line
                      x1="0"
                      y1="100"
                      x2="100"
                      y2="0"
                      stroke="#ff780d"
                      strokeWidth="3"
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                    />
                  </svg>
                )}

                <span
                  aria-hidden="true"
                  className={`step-node absolute left-0 top-0 z-10 flex size-[34px] items-center justify-center rounded-full text-base font-bold ${
                    isLastStep ? 'border-[3px] border-orange bg-navy text-white' : 'bg-orange text-navy'
                  }`}
                >
                  {index + 1}
                </span>

                <h3 className="step-text font-serif text-2xl font-medium leading-tight text-navy md:text-[28px]">{step.title}</h3>
                <p className="step-text mt-2 max-w-[340px] text-base leading-relaxed text-muted md:mt-2.5 lg:max-w-[250px]">
                  {step.body}
                </p>
              </li>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}
