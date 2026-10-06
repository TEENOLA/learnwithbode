import { faqs } from '../data/content'
import Container from './Container'

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 bg-white">
      <Container className="grid items-start gap-7 py-16 md:py-[120px] lg:grid-cols-12 lg:gap-x-6">
        <h2 className="font-serif text-[28px] uppercase leading-[1.2] tracking-[0.02em] text-navy md:text-[34px] lg:col-span-4">
          Frequently asked questions
        </h2>
        <div className="lg:col-span-8">
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-t border-line last:border-b">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 font-serif text-xl leading-tight text-navy md:py-6 md:text-2xl">
                {faq.question}
                <span aria-hidden="true" className="flex-none font-sans text-[28px] font-normal leading-none">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </span>
              </summary>
              <p className="mb-6 max-w-[640px] text-base leading-[1.65] text-muted md:mb-[26px] md:text-[17px]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
}
