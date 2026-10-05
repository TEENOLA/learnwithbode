import type { ServiceNeed } from '../data/content'
import Container from './Container'

interface FindATutorProps {
  onChooseNeed: (need: ServiceNeed) => void
}

export default function FindATutor({ onChooseNeed }: FindATutorProps) {
  return (
    <section id="find-a-tutor" className="scroll-mt-24 bg-white">
      <Container className="grid items-start gap-[18px] py-16 md:py-28 lg:grid-cols-12 lg:gap-x-6">
        <h2 className="font-serif text-4xl leading-[1.08] tracking-[-0.015em] text-navy md:text-[48px] lg:col-span-5">
          Need a tutor for another subject?
        </h2>
        <div className="flex flex-col gap-5 lg:col-span-7">
          <p className="max-w-[600px] text-[17px] leading-[1.65] text-muted md:text-[19px]">
            We focus on the subjects listed above. If you need a tutor for something we do not cover, tell us the subject
            and the exam, and we will recommend someone suitable.
          </p>
          <a
            href="#enquire"
            onClick={() => onChooseNeed('sourcing')}
            className="mt-1.5 inline-flex min-h-[52px] items-center justify-center self-start rounded-md border-2 border-navy px-7 text-center text-base font-semibold text-navy hover:bg-tint max-md:self-stretch"
          >
            Ask for a recommendation
          </a>
        </div>
      </Container>
    </section>
  )
}
