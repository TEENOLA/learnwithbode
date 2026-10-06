import { siteConfig } from '../config/site'
import Container from './Container'
import OrbitFrame from './OrbitFrame'

const results = [
  {
    exam: 'JAMB',
    outcome: 'A student scored 365, then won a Mastercard Foundation scholarship to study Engineering at Pan-Atlantic University.',
  },
  { exam: 'JUPEB 2026', outcome: 'A student recently finished with straight A’s.' },
]

export default function TutorSection() {
  return (
    <section id="tutor" className="scroll-mt-24 bg-navy text-white">
      <Container className="grid items-center gap-7 py-16 md:py-28 lg:grid-cols-2 lg:gap-x-20">
        <div className="mx-auto w-full max-w-[460px]">
          <OrbitFrame
            variant="portrait"
            photoSrc={siteConfig.tutorPhoto}
            photoAlt={siteConfig.tutorPhoto ? 'Portrait of Abiola Olabode (Bode)' : 'Placeholder for a portrait of Bode'}
            placeholderLabel="Photo of Bode goes here"
          />
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="font-serif text-[40px] leading-[1.05] tracking-[-0.015em] md:text-[52px]">Meet Abiola Olabode.</h2>
            <p className="mt-2 text-lg text-sky md:text-xl">Everyone calls him Bode.</p>
          </div>
          <p className="max-w-[540px] text-[17px] leading-[1.65] text-sky md:text-[19px]">
            Bode is a graduate of Petroleum and Gas Engineering from the University of Lagos and co-founder of Platform
            Insight Institute, where he has been a lead tutor for over a decade.
          </p>
          <p className="max-w-[540px] text-[17px] leading-[1.65] text-sky md:text-[19px]">
            He has taught more than 600 students, over 80% of whom scaled their exams and gained admission to top
            universities, into their chosen courses, on merit.
          </p>
          <ul className="flex max-w-[540px] flex-col gap-3 border-l-2 border-orange pl-5 text-[17px] leading-[1.55] md:text-[19px]">
            {results.map((result) => (
              <li key={result.exam}>
                <span className="font-semibold text-white">{result.exam}:</span>{' '}
                <span className="text-sky">{result.outcome}</span>
              </li>
            ))}
          </ul>
          <p className="max-w-[540px] text-[17px] leading-[1.65] text-sky md:text-[19px]">
            His approach is simple: explain why an idea works, then practise it until the student can use it under exam
            conditions.
          </p>
          <p className="mt-2 max-w-[540px] font-serif text-[26px] leading-snug md:text-[30px]">
            Learn With Bode is new. Our tutor is not.
          </p>
        </div>
      </Container>
    </section>
  )
}
