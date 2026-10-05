import { formspreeEndpoint, siteConfig } from '../config/site'
import { serviceOptions, type ServiceNeed } from '../data/content'

export interface EnquiryFields {
  need: ServiceNeed
  name: string
  phone: string
  email: string
  exam: string
  subjects: string
  message: string
}

export const emptyEnquiry: EnquiryFields = {
  need: 'general',
  name: '',
  phone: '',
  email: '',
  exam: '',
  subjects: '',
  message: '',
}

export type EnquiryErrors = Partial<Record<keyof EnquiryFields, string>>

export function validateForWhatsApp(fields: EnquiryFields): EnquiryErrors {
  const errors: EnquiryErrors = {}
  if (!fields.name.trim()) errors.name = 'Enter your name so Bode knows who is writing.'
  return errors
}

export function validateForEmail(fields: EnquiryFields): EnquiryErrors {
  const errors: EnquiryErrors = {}
  const hasPhone = fields.phone.trim().length > 0
  const hasEmail = fields.email.trim().length > 0
  if (!fields.name.trim()) errors.name = 'Enter your name so Bode knows who is writing.'
  if (!hasPhone && !hasEmail) {
    errors.phone = 'Add a phone number or an email address so Bode can reply.'
  }
  if (hasEmail && !/^\S+@\S+\.\S+$/.test(fields.email.trim())) {
    errors.email = 'Check this email address. It looks incomplete.'
  }
  return errors
}

function needLabel(need: ServiceNeed): string {
  return serviceOptions.find((option) => option.id === need)?.label ?? 'General enquiry'
}

export function buildMessage(fields: EnquiryFields): string {
  const intro = serviceOptions.find((option) => option.id === fields.need)?.whatsappIntro ?? ''
  const detailLines: [string, string][] = [
    ['Request', needLabel(fields.need)],
    ['Name', fields.name.trim()],
    ['Phone', fields.phone.trim()],
    ['Email', fields.email.trim()],
    ['Exam', fields.exam],
    ['Subjects', fields.subjects.trim()],
    ['Message', fields.message.trim()],
  ]
  const details = detailLines
    .filter(([, value]) => value.length > 0)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n')
  return `${intro}\n\n${details}`
}

export function buildWhatsAppUrl(fields: EnquiryFields): string {
  const target = siteConfig.whatsappNumber ? siteConfig.whatsappNumber : ''
  return `https://wa.me/${target}?text=${encodeURIComponent(buildMessage(fields))}`
}

/** Opens a plain WhatsApp chat with Bode (no pre-filled message). */
export function buildWhatsAppChatUrl(): string {
  return `https://wa.me/${siteConfig.whatsappNumber}`
}

export function buildMailtoUrl(fields: EnquiryFields): string {
  const subject = `${needLabel(fields.need)} from ${fields.name.trim() || 'website visitor'}`
  return `mailto:${siteConfig.emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage(fields))}`
}

export type EmailSendResult = 'sent' | 'fallback-mailto'

/** Sends the enquiry to Bode's inbox through Formspree, or falls back to the visitor's mail app. */
export async function sendByEmail(fields: EnquiryFields, honeypot: string): Promise<EmailSendResult> {
  if (!formspreeEndpoint) {
    window.location.href = buildMailtoUrl(fields)
    return 'fallback-mailto'
  }
  const response = await fetch(formspreeEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: `${needLabel(fields.need)} from ${fields.name.trim()}`,
      request: needLabel(fields.need),
      name: fields.name.trim(),
      phone: fields.phone.trim(),
      // Formspree uses a field called "email" as the reply-to address.
      email: fields.email.trim(),
      exam: fields.exam,
      subjects: fields.subjects.trim(),
      message: fields.message.trim(),
      // Formspree's built-in spam trap: must stay empty.
      _gotcha: honeypot,
    }),
  })
  if (!response.ok) {
    throw new Error(`Formspree request failed with status ${response.status}`)
  }
  return 'sent'
}
