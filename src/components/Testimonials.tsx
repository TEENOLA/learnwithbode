import { testimonials } from '../data/content'
import Container from './Container'

export default function Testimonials() {
  return (
    <section className="bg-white">
      <Container className="py-16 md:py-28">
        <h2 className="max-w-[700px] font-serif text-[34px] leading-[1.1] tracking-[-0.015em] text-navy md:text-[44px]">
          Testimonials
        </h2>
        <div className="mt-8 grid items-start gap-10 md:mt-14 md:grid-cols-2 md:gap-x-16 md:gap-y-14">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.attribution} className="border-l-4 border-orange pl-5 md:pl-7">
              <blockquote className="text-[17px] leading-[1.7] text-ink md:text-[18px]">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-5 text-[15px] font-semibold text-navy md:text-base">
                {testimonial.attribution}
                {testimonial.detail ? (
                  <span className="mt-0.5 block text-sm font-normal text-muted">{testimonial.detail}</span>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  )
}
