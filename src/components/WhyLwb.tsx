import { principles } from '../data/content'
import Container from './Container'

export default function WhyLwb() {
  return (
    <section className="bg-tint">
      <Container className="py-16 md:py-28">
        <p className="max-w-[980px] font-serif text-[30px] leading-[1.22] tracking-[-0.015em] text-navy md:text-[44px] md:leading-[1.2]">
          Most students are not weak at science. They were just never given the time to understand it properly. That is
          the gap we teach into.
        </p>
        <div className="mt-8 grid gap-[26px] border-t border-line pt-7 md:mt-[72px] md:grid-cols-3 md:gap-x-14 md:pt-10">
          {principles.map((principle) => (
            <div key={principle.title}>
              <h3 className="font-serif text-[23px] font-medium leading-tight text-navy md:text-[26px]">{principle.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted md:mt-3 md:text-[17px]">{principle.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
