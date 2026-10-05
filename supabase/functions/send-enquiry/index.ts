// Supabase Edge Function: emails a website enquiry to Bode's inbox.
// Deploy:  supabase functions deploy send-enquiry --no-verify-jwt
// Secrets: supabase secrets set RESEND_API_KEY=... ENQUIRY_TO_EMAIL=... ENQUIRY_FROM_EMAIL=... ALLOWED_ORIGIN=https://your-domain.com

const allowedOrigin = Deno.env.get('ALLOWED_ORIGIN') ?? '*'

const corsHeaders = {
  'Access-Control-Allow-Origin': allowedOrigin,
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const fieldLimits: Record<string, number> = {
  need: 60,
  name: 120,
  phone: 40,
  email: 160,
  exam: 40,
  subjects: 200,
  message: 2000,
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function jsonResponse(body: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (request: Request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (request.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405)

  let payload: Record<string, unknown>
  try {
    payload = await request.json()
  } catch {
    return jsonResponse({ error: 'Invalid JSON' }, 400)
  }

  // Spam trap: the hidden "company" field must stay empty. Pretend success so bots learn nothing.
  if (typeof payload.company === 'string' && payload.company.trim() !== '') {
    return jsonResponse({ ok: true }, 200)
  }

  const clean: Record<string, string> = {}
  for (const [field, limit] of Object.entries(fieldLimits)) {
    const raw = payload[field]
    clean[field] = typeof raw === 'string' ? raw.trim().slice(0, limit) : ''
  }

  if (!clean.name) return jsonResponse({ error: 'Name is required' }, 400)
  if (!clean.phone && !clean.email) return jsonResponse({ error: 'Phone or email is required' }, 400)
  if (clean.email && !/^\S+@\S+\.\S+$/.test(clean.email)) return jsonResponse({ error: 'Email looks invalid' }, 400)

  const apiKey = Deno.env.get('RESEND_API_KEY')
  const toEmail = Deno.env.get('ENQUIRY_TO_EMAIL')
  const fromEmail = Deno.env.get('ENQUIRY_FROM_EMAIL') ?? 'LWB Website <onboarding@resend.dev>'
  if (!apiKey || !toEmail) return jsonResponse({ error: 'Email service is not configured' }, 500)

  const rows: [string, string][] = [
    ['Request', clean.need],
    ['Name', clean.name],
    ['Phone', clean.phone],
    ['Email', clean.email],
    ['Exam', clean.exam],
    ['Subjects', clean.subjects],
    ['Message', clean.message],
  ]
  const visibleRows = rows.filter(([, value]) => value)
  const html = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:15px">${visibleRows
    .map(([label, value]) => `<tr><td><strong>${label}</strong></td><td>${escapeHtml(value).replaceAll('\n', '<br>')}</td></tr>`)
    .join('')}</table>`
  const text = visibleRows.map(([label, value]) => `${label}: ${value}`).join('\n')

  const sendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: clean.email || undefined,
      subject: `${clean.need || 'Enquiry'} from ${clean.name}`,
      html,
      text,
    }),
  })

  if (!sendResponse.ok) return jsonResponse({ error: 'Could not send email' }, 502)
  return jsonResponse({ ok: true }, 200)
})
