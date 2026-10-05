import logoReversed from '../assets/logo-reversed.png'
import { examGroups, footerLinks } from '../data/content'
import { siteConfig } from '../config/site'
import Container from './Container'
import ContactLines from './ContactLines'

const allExams = examGroups.flatMap((group) => group.exams)

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-sky">
      <Container className="grid gap-10 pb-10 pt-14 md:grid-cols-2 md:gap-x-12 md:pt-[72px] lg:grid-cols-12 lg:gap-x-8">
        <div className="flex flex-col gap-5 md:col-span-2 lg:col-span-4 lg:pr-8">
          <img src={logoReversed} alt="Learn With Bode: where science becomes simple" className="h-[84px] w-auto self-start md:h-[96px]" />
          <p className="max-w-[320px] text-[15px] leading-relaxed">
            Live online classes and private tutoring for students preparing for the major science and university entrance
            exams.
          </p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-3">
          <h2 className="text-sm font-semibold text-white">Explore</h2>
          <ul className="mt-4 flex flex-col gap-2.5 text-[15px]">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="underline-offset-4 decoration-orange hover:text-white hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-white">Exams</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-[15px] lg:grid-cols-1">
            {allExams.map((exam) => (
              <li key={exam}>{exam}</li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold text-white">Get in touch</h2>
          <div className="mt-4">
            <ContactLines layout="inline" />
          </div>
          <ul className="mt-5 flex gap-5 text-[15px]">
            <li>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 underline-offset-4 decoration-orange hover:text-white hover:underline"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
                </svg>
                Instagram
              </a>
            </li>
            <li>
              <a
                href={siteConfig.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 underline-offset-4 decoration-orange hover:text-white hover:underline"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[18px]" fill="currentColor">
                  <path d="M4.5 9h3.3v10.5H4.5zM6.15 4a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8zM10 9h3.15v1.45h.05c.45-.85 1.55-1.75 3.2-1.75 3.4 0 4.05 2.2 4.05 5.1v5.7h-3.3v-5.05c0-1.2 0-2.75-1.7-2.75s-1.95 1.3-1.95 2.65v5.15H10z" />
                </svg>
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/15">
        <Container className="flex flex-col gap-2 py-6 text-sm md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Learn With Bode. All rights reserved.</p>
          <p className="text-sky/70">Where science becomes simple.</p>
        </Container>
      </div>
    </footer>
  )
}
