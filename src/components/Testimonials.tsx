import { testimonials } from '../data/content'
import Container from './Container'

export default function Testimonials() {
  return (
    <section className="bg-white">
      <Container className="py-16 md:py-28">
        <h2 className="max-w-[700px] font-serif text-[34px] leading-[1.1] tracking-[-0.015em] text-navy md:text-[44px]">
          What parents and students say.
        </h2>
        <div className="mt-8 grid gap-8 md:mt-14 md:grid-cols-2 md:gap-x-[72px]">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.attribution} className="border-l-4 border-orange pl-5 md:pl-7">
              <blockquote className="font-serif text-2xl italic leading-[1.3] text-navy md:text-[30px]">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-4 text-[15px] font-semibold text-muted md:mt-5 md:text-base">
                {testimonial.attribution}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-10 text-[15px] text-muted md:mt-12 md:text-base">
          [Exam results will be added here after the next exam season.]
        </p>
      </Container>
    </section>
  )
}
