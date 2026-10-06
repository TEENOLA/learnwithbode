import { testimonials } from '../data/content'
import Container from './Container'

export default function Testimonials() {
  return (
    <section className="bg-white">
      <Container className="py-16 md:py-28">
        <h2 className="max-w-[700px] font-serif text-[34px] leading-[1.1] tracking-[-0.015em] text-navy md:text-[44px]">
          Testimonials
        </h2>
        <div className="mt-8 grid gap-8 md:mt-14 md:gap-y-12">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.attribution} className="max-w-[860px] border-l-4 border-orange pl-5 md:pl-7">
              <blockquote className="font-serif text-2xl italic leading-[1.3] text-navy md:text-[30px]">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-4 text-[15px] font-semibold text-muted md:mt-5 md:text-base">
                {testimonial.attribution}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  )
}
