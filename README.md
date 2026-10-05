# Learn With Bode (LWB) website

Single-page site built with React, TypeScript, Vite and Tailwind CSS v4.

## Run it

```bash
npm install
npm run dev        # local development
npm run build      # production build in dist/
npm run preview    # preview the production build
```

## What the client still has to supply

Everything is in two places.

1. **`src/config/site.ts`**: phone, WhatsApp, email and social links (already filled in), plus the hero and tutor photos. Bode's portrait is already set as the tutor photo.
2. **Bracketed text on the page**: search the project for `[` in `src/components/TutorSection.tsx`, `src/components/Testimonials.tsx` and `src/data/content.ts` for Bode's bio, the student count, testimonials and the results line.

### Adding photos

Put the files in `src/assets/photos/`, import them in `src/config/site.ts`, and set `heroPhoto` and `tutorPhoto`:

```ts
import heroPhoto from '../assets/photos/bode-teaching.jpg'
// ...
heroPhoto: heroPhoto,
```

Use square or portrait images at least 1200px wide, subject centred. The page adds a light navy tint so photos sit well with the brand.

## The enquiry form

- **Send on WhatsApp** opens WhatsApp with the enquiry pre-filled. It only needs a name. With no WhatsApp number set, WhatsApp asks the visitor to pick a contact, so set the number before launch.
- **Send by email** posts to Formspree, which forwards the enquiry to Bode's inbox. Visitors do not need to be logged in to any mail app. Until the endpoint is set, it falls back to opening the visitor's mail app.

### Set up Formspree (about 5 minutes)

1. Create a free account at formspree.io, using Bode's email address so enquiries land in his inbox.
2. Create a new form and name it "LWB website enquiries". Copy its URL (it looks like `https://formspree.io/f/abcdwxyz`).
3. Copy `.env.example` to `.env`, paste the URL as `VITE_FORMSPREE_ENDPOINT`, and rebuild. On Netlify, Vercel or Cloudflare Pages, add the same variable in the host's environment settings instead.
4. Send a test enquiry from the live site and confirm it arrives. Check the spam folder the first time, and confirm the email address when Formspree asks.

The free plan allows 50 submissions a month. Check formspree.io/plans for current limits. Visitors who choose WhatsApp do not count towards the limit. The form includes Formspree's hidden spam-trap field.

## Deploying

Any static host works (Netlify, Vercel, Cloudflare Pages). Build command `npm run build`, output folder `dist`. Add the `VITE_FORMSPREE_ENDPOINT` variable in the host's environment settings.

## Motion

The hero and tutor ring, the subject illustrations, the four-step line and the sine wave explainer are animated with CSS and SVG only. Everything respects the visitor's reduced-motion setting: they see the finished illustrations and the sine wave stays still until they use the slider. Animations start when each section scrolls into view (`src/hooks/useInView.ts`) and the keyframes live at the bottom of `src/index.css`.

## Brand

Navy `#002955` and orange `#FF780D`, sampled from the logo. Headings use Newsreader, body text uses Hanken Grotesk (both from Google Fonts, loaded in `index.html`).
# learnwithbode
