import { siteConfig } from '../config/site'
import { buildWhatsAppChatUrl } from '../lib/enquiry'
import Container from './Container'
import OrbitFrame from './OrbitFrame'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-navy">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_70%_50%,#000_0%,transparent_75%)]"
      />
      <Container className="relative grid items-center gap-12 py-12 pb-14 md:py-[88px] md:pb-[104px] lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col gap-[26px] md:gap-[30px]">
          <h1 className="font-serif text-[48px] leading-[1.02] tracking-[-0.025em] text-white sm:text-[64px] lg:text-[84px] lg:leading-none">
            Where science becomes simple.
          </h1>
          <p className="max-w-[520px] text-[17px] leading-relaxed text-sky md:text-xl">
            Live online classes and private tutoring in the sciences, maths and English, for students preparing for
            WAEC, SAT, A Levels and other major exams.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-3.5">
            <a
              href="#enquire"
              className="inline-flex min-h-[52px] items-center justify-center rounded-md bg-orange px-7 text-base font-semibold text-navy hover:bg-orange-soft"
            >
              Make an enquiry
            </a>
            <a
              href={buildWhatsAppChatUrl()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[52px] items-center justify-center rounded-md border-2 border-white px-7 text-base font-semibold text-white hover:bg-white/10"
            >
              Chat with Bode on WhatsApp
            </a>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[560px]">
          <OrbitFrame
            variant="whiteboard"
            photoSrc={siteConfig.heroPhoto}
            photoAlt={
              siteConfig.heroPhoto ? 'Bode teaching an online class' : 'Whiteboard with a projectile path and physics equations'
            }
          />
        </div>
      </Container>
    </section>
  )
}
