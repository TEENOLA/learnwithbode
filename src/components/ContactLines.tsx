import { siteConfig } from '../config/site'

interface ContactLinesProps {
  /** 'block' is the labelled list in the enquiry section. 'inline' is the compact footer version. */
  layout: 'block' | 'inline'
}

interface ContactEntry {
  label: string
  display: string
  href: string | null
}

function buildEntries(): ContactEntry[] {
  return [
    {
      label: 'Call Bode',
      display: siteConfig.phoneDisplay,
      href: siteConfig.phoneDial ? `tel:${siteConfig.phoneDial}` : null,
    },
    {
      label: 'WhatsApp',
      display: siteConfig.whatsappDisplay,
      href: siteConfig.whatsappNumber ? `https://wa.me/${siteConfig.whatsappNumber}` : null,
    },
    {
      label: 'Email',
      display: siteConfig.emailDisplay,
      href: siteConfig.emailAddress ? `mailto:${siteConfig.emailAddress}` : null,
    },
  ]
}

export default function ContactLines({ layout }: ContactLinesProps) {
  const entries = buildEntries()

  if (layout === 'inline') {
    return (
      <dl className="flex flex-col gap-4">
        {entries.map((entry) => (
          <div key={entry.label}>
            <dt className="text-[13px] text-sky/70">{entry.label}</dt>
            <dd className="mt-0.5 text-base text-white">
              {entry.href ? (
                <a href={entry.href} className="underline-offset-4 decoration-orange hover:underline">
                  {entry.display}
                </a>
              ) : (
                entry.display
              )}
            </dd>
          </div>
        ))}
      </dl>
    )
  }

  return (
    <dl className="border-b border-white/20">
      {entries.map((entry) => (
        <div key={entry.label} className="border-t border-white/20 py-3 md:py-3.5">
          <dt className="text-[13px] text-[#9fb8d6] md:text-sm">{entry.label}</dt>
          <dd className="mt-0.5 text-lg font-semibold md:text-[19px]">
            {entry.href ? (
              <a href={entry.href} className="hover:underline">
                {entry.display}
              </a>
            ) : (
              entry.display
            )}
          </dd>
        </div>
      ))}
    </dl>
  )
}
