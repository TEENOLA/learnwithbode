import { principles } from '../data/content'
import Container from './Container'

export default function WhyLwb() {
  return (
    <section className="bg-tint">
      <Container className="py-16 md:py-28">
        <div className="flex max-w-[760px] flex-col gap-5 md:gap-6">
          <h2 className="font-serif text-4xl leading-[1.08] tracking-[-0.015em] text-navy md:text-[48px]">
            Why students learn with us
          </h2>
          <p className="font-serif text-[26px] leading-[1.25] tracking-[-0.01em] text-navy md:text-[32px]">
            Most students are not weak at science. They were simply rushed through it. That is the gap we close.
          </p>
        </div>
        <div className="mt-10 grid gap-[26px] border-t border-line pt-7 md:mt-[72px] md:grid-cols-3 md:gap-x-14 md:pt-10">
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
