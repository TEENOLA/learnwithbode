import { siteConfig } from '../config/site'
import Container from './Container'
import OrbitFrame from './OrbitFrame'

export default function TutorSection() {
  return (
    <section id="tutor" className="scroll-mt-24 bg-navy text-white">
      <Container className="grid items-center gap-7 py-16 md:py-28 lg:grid-cols-2 lg:gap-x-20">
        <div className="mx-auto w-full max-w-[460px]">
          <OrbitFrame
            variant="portrait"
            photoSrc={siteConfig.tutorPhoto}
            photoAlt={siteConfig.tutorPhoto ? 'Portrait of Bode' : 'Placeholder for a portrait of Bode'}
            placeholderLabel="Photo of Bode goes here"
          />
        </div>
        <div className="flex flex-col gap-[22px]">
          <h2 className="font-serif text-[44px] leading-[1.05] tracking-[-0.015em] md:text-[56px]">Meet Bode.</h2>
          <p className="max-w-[520px] text-[17px] leading-[1.65] text-sky md:text-[19px]">
            Bode is the founder of Learn With Bode, an online tutoring service that helps students understand science and
            prepare with confidence for their exams.
          </p>
          <p className="max-w-[520px] text-[17px] leading-[1.65] text-sky md:text-[19px]">
            [Add his qualifications and years of teaching, for example: He holds a degree in ___ from ___ and has been
            teaching for ___ years.]
          </p>
          <p className="max-w-[520px] text-[17px] leading-[1.65] text-sky md:text-[19px]">
            His approach is simple: explain why an idea works, then practise it until the student can use it under exam
            conditions.
          </p>
          <p className="mt-2 max-w-[520px] font-serif text-[26px] leading-snug md:text-[28px]">[200+] students taught so far.</p>
        </div>
      </Container>
    </section>
  )
}
