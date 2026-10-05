import bodePortrait from '../assets/photos/bode.jpg'

/**
 * Everything the client still has to supply lives in this one file.
 * Replace the placeholder values below, then rebuild.
 */
export const siteConfig = {
  brandName: 'Learn With Bode',

  /** Shown on the page. */
  phoneDisplay: '0812 104 5090',
  /** Digits to dial, with country code. */
  phoneDial: '+2348121045090',

  /** WhatsApp number in international format, digits only. Same number as the phone. */
  whatsappNumber: '2348121045090',
  whatsappDisplay: '0812 104 5090',

  emailAddress: 'learnwithbode@gmail.com',
  emailDisplay: 'learnwithbode@gmail.com',

  instagramUrl: 'https://www.instagram.com/learnwithbode',
  linkedinUrl: 'https://www.linkedin.com/in/learn-with-bode',

  /** Photos. Put files in src/assets/photos and import them at the top of this file. */
  heroPhoto: null as string | null,
  tutorPhoto: bodePortrait as string | null,
}

/** Formspree form URL, e.g. https://formspree.io/f/abcdwxyz. Set VITE_FORMSPREE_ENDPOINT in .env. */
export const formspreeEndpoint: string | undefined = import.meta.env.VITE_FORMSPREE_ENDPOINT || undefined
