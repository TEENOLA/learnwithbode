import logo from '../assets/logo.png'
import type { ServiceNeed } from '../data/content'
import Container from './Container'

const navLinks = [
  { label: 'What we teach', href: '#teach' },
  { label: 'Classes', href: '#classes' },
  { label: 'Your tutor', href: '#tutor' },
  { label: 'FAQ', href: '#faq' },
]

interface HeaderProps {
  onChooseNeed: (need: ServiceNeed) => void
}

export default function Header({ onChooseNeed }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <Container className="flex h-[72px] items-center justify-between md:h-[92px]">
        <a href="#top" aria-label="Learn With Bode, home">
          <img src={logo} alt="Learn With Bode: where science becomes simple" className="h-12 w-auto md:h-[62px]" />
        </a>
        <nav aria-label="Main" className="flex items-center gap-9">
          <ul className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[15px] font-medium text-ink underline-offset-8 decoration-orange hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#enquire"
            onClick={() => onChooseNeed('trial')}
            className="inline-flex min-h-11 items-center rounded-md bg-navy px-[18px] text-sm font-semibold text-white hover:bg-[#0a3a73] md:min-h-[46px] md:px-[22px] md:text-[15px]"
          >
            <span className="md:hidden">Free trial</span>
            <span className="hidden md:inline">Book a free trial</span>
          </a>
        </nav>
      </Container>
    </header>
  )
}
