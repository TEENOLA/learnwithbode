import { useState, type ChangeEvent, type FormEvent } from 'react'
import { examOptions, serviceOptions, type ServiceNeed } from '../data/content'
import {
  buildWhatsAppUrl,
  emptyEnquiry,
  sendByEmail,
  validateForEmail,
  validateForWhatsApp,
  type EnquiryErrors,
  type EnquiryFields,
} from '../lib/enquiry'
import Container from './Container'
import ContactLines from './ContactLines'

interface EnquiryFormProps {
  selectedNeed: ServiceNeed
  onChangeNeed: (need: ServiceNeed) => void
}

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error'

const inputClassName =
  'w-full rounded-md border border-[#9fb0c6] bg-white px-3.5 py-3 text-base font-normal text-ink placeholder:text-[#7a8ca3] aria-[invalid=true]:border-[#b3261e]'

export default function EnquiryForm({ selectedNeed, onChangeNeed }: EnquiryFormProps) {
  const [fields, setFields] = useState<EnquiryFields>(emptyEnquiry)
  const [honeypot, setHoneypot] = useState('')
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')

  const currentFields: EnquiryFields = { ...fields, need: selectedNeed }

  function handleTextChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    setFields((previous) => ({ ...previous, [name]: value }))
    if (errors[name as keyof EnquiryFields]) {
      setErrors((previous) => ({ ...previous, [name]: undefined }))
    }
  }

  function handleWhatsApp() {
    const foundErrors = validateForWhatsApp(currentFields)
    setErrors(foundErrors)
    if (Object.keys(foundErrors).length > 0) return
    window.open(buildWhatsAppUrl(currentFields), '_blank', 'noopener')
  }

  async function handleEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const foundErrors = validateForEmail(currentFields)
    setErrors(foundErrors)
    if (Object.keys(foundErrors).length > 0) return
    setStatus('sending')
    try {
      const result = await sendByEmail(currentFields, honeypot)
      setStatus(result === 'sent' ? 'sent' : 'idle')
    } catch {
      setStatus('error')
    }
  }

  function startAnother() {
    setFields(emptyEnquiry)
    setErrors({})
    setStatus('idle')
  }

  return (
    <section id="enquire" className="scroll-mt-24 bg-navy text-white">
      <Container className="grid items-start gap-7 py-16 md:py-28 lg:grid-cols-12 lg:gap-x-6">
        <div className="flex flex-col gap-[22px] lg:col-span-5 lg:pr-6">
          <h2 className="font-serif text-4xl leading-[1.06] tracking-[-0.015em] md:text-[50px]">
            Make an enquiry or request a quote.
          </h2>
          <p className="text-[17px] leading-relaxed text-sky md:text-lg">
            Tell us what you need and we will reply with the right option and a quote. You can also call or message Bode
            directly.
          </p>
          <div className="mt-3">
            <ContactLines layout="block" />
          </div>
        </div>

        <div className="rounded-[10px] bg-white p-5 text-ink md:p-10 lg:col-span-6 lg:col-start-7">
          {status === 'sent' ? (
            <div role="status" className="flex flex-col gap-4 py-6">
              <h3 className="font-serif text-3xl text-navy">Your enquiry has been sent.</h3>
              <p className="text-[17px] leading-relaxed text-muted">
                Bode will reply by phone, WhatsApp or email. If you need an answer sooner, send the same details on WhatsApp.
              </p>
              <button
                type="button"
                onClick={startAnother}
                className="mt-2 inline-flex min-h-[52px] items-center justify-center self-start rounded-md border-2 border-navy px-7 text-base font-semibold text-navy hover:bg-tint"
              >
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleEmail} noValidate className="flex flex-col gap-[18px] md:gap-[22px]">
              <fieldset className="flex flex-col gap-2 md:gap-2.5">
                <legend className="pb-2 text-sm font-semibold md:pb-2.5">What do you need?</legend>
                <div className="grid gap-2 md:grid-cols-2 md:gap-2.5">
                  {serviceOptions.map((option) => (
                    <label key={option.id} className="relative block cursor-pointer">
                      <input
                        type="radio"
                        name="need"
                        value={option.id}
                        checked={selectedNeed === option.id}
                        onChange={() => onChangeNeed(option.id)}
                        className="peer absolute inset-0 m-0 cursor-pointer opacity-0"
                      />
                      <span className="block rounded-md border border-[#9fb0c6] bg-white px-4 py-3.5 text-[15px] font-medium peer-checked:border-navy peer-checked:bg-tint peer-checked:font-semibold peer-checked:shadow-[inset_4px_0_0_var(--color-orange)] peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-orange">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-[18px] md:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm font-semibold">
                  Full name
                  <input
                    name="name"
                    value={fields.name}
                    onChange={handleTextChange}
                    placeholder="Your name"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'error-name' : undefined}
                    className={inputClassName}
                  />
                  {errors.name ? (
                    <span id="error-name" className="text-[13px] font-medium text-[#b3261e]">
                      {errors.name}
                    </span>
                  ) : null}
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-semibold">
                  Phone or WhatsApp
                  <input
                    name="phone"
                    type="tel"
                    value={fields.phone}
                    onChange={handleTextChange}
                    placeholder="e.g. 0801 234 5678"
                    autoComplete="tel"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'error-phone' : undefined}
                    className={inputClassName}
                  />
                  {errors.phone ? (
                    <span id="error-phone" className="text-[13px] font-medium text-[#b3261e]">
                      {errors.phone}
                    </span>
                  ) : null}
                </label>
              </div>

              <label className="flex flex-col gap-1.5 text-sm font-semibold">
                Email
                <input
                  name="email"
                  type="email"
                  value={fields.email}
                  onChange={handleTextChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'error-email' : undefined}
                  className={inputClassName}
                />
                {errors.email ? (
                  <span id="error-email" className="text-[13px] font-medium text-[#b3261e]">
                    {errors.email}
                  </span>
                ) : null}
              </label>

              <div className="grid gap-[18px] md:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm font-semibold">
                  Exam
                  <select name="exam" value={fields.exam} onChange={handleTextChange} className={inputClassName}>
                    <option value="">Choose an exam</option>
                    {examOptions.map((exam) => (
                      <option key={exam} value={exam}>
                        {exam}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-semibold">
                  Subjects
                  <input
                    name="subjects"
                    value={fields.subjects}
                    onChange={handleTextChange}
                    placeholder="e.g. Physics, Maths"
                    className={inputClassName}
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1.5 text-sm font-semibold">
                Message
                <textarea
                  name="message"
                  rows={4}
                  value={fields.message}
                  onChange={handleTextChange}
                  placeholder="Tell us a little about what you need"
                  className={inputClassName}
                />
              </label>

              {/* Spam trap: real visitors never see or fill this field. */}
              <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <label>
                  Company
                  <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
                </label>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="inline-flex min-h-[52px] items-center justify-center rounded-md bg-navy px-7 text-base font-semibold text-white hover:bg-[#0a3a73]"
                >
                  Send on WhatsApp
                </button>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex min-h-[52px] items-center justify-center rounded-md border-2 border-navy px-7 text-base font-semibold text-navy hover:bg-tint disabled:cursor-wait disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending…' : 'Send by email'}
                </button>
              </div>

              <p aria-live="polite" className="text-[13px] leading-normal text-muted md:text-sm">
                {status === 'error'
                  ? 'We could not send your enquiry. Please try again, or use WhatsApp instead.'
                  : 'On a phone, WhatsApp is quickest. Email goes straight to Bode’s inbox, with no login needed.'}
              </p>
            </form>
          )}
        </div>
      </Container>
    </section>
  )
}
