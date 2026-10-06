import type { ServiceNeed } from '../data/content'
import Container from './Container'

interface ClassesProps {
  onChooseNeed: (need: ServiceNeed) => void
}

interface DetailRow {
  label: string
  value: string
}

function DetailList({ rows }: { rows: DetailRow[] }) {
  return (
    <dl className="mt-2 border-b border-line">
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-[110px_minmax(0,1fr)] gap-x-3.5 border-t border-line py-3.5 text-base leading-snug md:grid-cols-[150px_minmax(0,1fr)] md:gap-x-5 md:py-4 md:text-[17px]"
        >
          <dt className="font-semibold text-muted">{row.label}</dt>
          <dd>{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export default function Classes({ onChooseNeed }: ClassesProps) {
  return (
    <section id="classes" className="scroll-mt-24 bg-white">
      <Container className="grid gap-14 py-16 md:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] md:gap-x-16 md:py-[120px]">
        <div className="flex flex-col gap-[18px] md:gap-[22px]">
          <h2 className="font-serif text-4xl leading-[1.1] tracking-[-0.015em] text-navy md:text-[44px]">Group classes</h2>
          <p className="text-[17px] leading-relaxed text-muted md:text-lg">
            Learn with other students preparing for the same exam, taught live by a tutor who explains, questions and
            corrects as the class goes.
          </p>
          <DetailList
            rows={[
              { label: 'Where', value: 'Live on Zoom' },
              { label: 'Schedule', value: 'Weekday and weekend evenings, so students can join after school' },
              { label: 'Class details', value: 'Shared in your class WhatsApp group' },
              { label: 'Fees', value: 'From ₦30,000 a month' },
            ]}
          />
          <a
            href="#enquire"
            onClick={() => onChooseNeed('group')}
            className="mt-2 inline-flex min-h-[52px] items-center justify-center self-start rounded-md text-center bg-navy px-7 text-base font-semibold text-white hover:bg-[#0a3a73] max-md:self-stretch"
          >
            Ask about group classes
          </a>
        </div>
        <div aria-hidden="true" className="hidden bg-line md:block" />
        <div className="flex flex-col gap-[18px] md:gap-[22px]">
          <h2 className="font-serif text-4xl leading-[1.1] tracking-[-0.015em] text-navy md:text-[44px]">Private tutoring</h2>
          <p className="text-[17px] leading-relaxed text-muted md:text-lg">
            One to one sessions planned around your own gaps, subjects and timetable, for students who want focused
            attention before the exam.
          </p>
          <DetailList
            rows={[
              { label: 'Where', value: 'Online, one to one' },
              { label: 'Planned around', value: 'Your exam and subjects' },
              { label: 'Schedule', value: 'Tailored to your arrangements' },
              { label: 'Fees', value: 'From ₦300,000 a month' },
            ]}
          />
          <a
            href="#enquire"
            onClick={() => onChooseNeed('private')}
            className="mt-2 inline-flex min-h-[52px] items-center justify-center self-start rounded-md text-center border-2 border-navy px-7 text-base font-semibold text-navy hover:bg-tint max-md:self-stretch"
          >
            Request a private tutoring quote
          </a>
        </div>
      </Container>
    </section>
  )
}
