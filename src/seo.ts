/* ════════════════════════════════════════════════════════════════
   PER-PAGE SEO METADATA — single source of truth
   ────────────────────────────────────────────────────────────────
   Every route gets a UNIQUE <title>, meta description and a
   self-referencing <link rel="canonical">. Rendered once in the
   app shell (see components/Seo.tsx) from the current pathname, so
   each statically pre-rendered page ships correct, unique metadata.

   Titles: ~50–60 chars. Descriptions: ~140–160 chars. English is the
   canonical, indexable copy (pre-render runs in the default locale).
   ════════════════════════════════════════════════════════════════ */

export const SITE_ORIGIN = 'https://www.secretlyapp.com'
export const OG_IMAGE = `${SITE_ORIGIN}/og-image.jpg`

export interface SeoEntry {
  title: string
  description: string
}

/* Keyed by canonical pathname (no trailing slash, '/' for home). */
export const SEO_BY_PATH: Record<string, SeoEntry> = {
  '/': {
    title: 'Secretly — Private Messaging Without Phone Numbers or Email',
    description:
      'Secretly is an end-to-end encrypted messenger with no phone number, no email, no ads, and no trackers. Private chats, calls, and file sharing on every device.',
  },
  '/download': {
    title: 'Download Secretly — Android, iOS, Windows & macOS',
    description:
      'Get Secretly free on Android, iPhone, iPad, Windows, and macOS. No phone number or email required — just a private Secretly ID to start.',
  },
  '/download/android': {
    title: 'Download Secretly for Android',
    description:
      'Install Secretly for Android from Google Play. Private, end-to-end encrypted messaging with no phone number or email required.',
  },
  '/download/ios': {
    title: 'Download Secretly for iPhone & iPad',
    description:
      'Install Secretly for iPhone and iPad from the App Store. End-to-end encrypted chats, calls, and files with no phone number or email.',
  },
  '/download/desktop': {
    title: 'Secretly for Windows & macOS Desktop',
    description:
      'Use Secretly on your computer. Link the desktop app to your phone for end-to-end encrypted chats, calls, and files on a bigger screen.',
  },
  '/security': {
    title: 'Secretly Security — Zero-Knowledge & E2EE',
    description:
      'How Secretly protects you: Signal-class end-to-end encryption, zero-knowledge servers, no phone number or email, and a public, verifiable codebase.',
  },
  '/compare': {
    title: 'Secretly vs Signal, Threema & Session',
    description:
      'An honest comparison of Secretly, Signal, Threema, and Session — registration, encryption, open source, audits, desktop, groups, calls, and pricing.',
  },
  '/features': {
    title: 'Secretly Features — Everything It Does',
    description:
      'Every Secretly feature: end-to-end encrypted chats, video notes, voice transcription, calls, deep customization, app lock with Face ID, scheduled messages, and more.',
  },
  '/pricing': {
    title: 'Secretly Pricing — Free, Premium & Teams',
    description:
      'Secretly is free for private, encrypted messaging. Upgrade to Premium for multi-device and larger groups, or Teams for organizations. Security is always free.',
  },
  '/teams': {
    title: 'Secretly for Teams — Secure Business Messaging',
    description:
      'Encrypted communication for legal, healthcare, finance, and journalism teams. Admin controls, organizational IDs, and policies — without ad-funded apps.',
  },
  '/about': {
    title: 'About Secretly — Privacy Is a Right, Not a Luxury',
    description:
      'Secretly is built by engineers and privacy advocates. Learn about our mission to make secure, anonymous communication available to everyone.',
  },
  '/help': {
    title: 'Secretly Help & FAQ',
    description:
      'Answers to common questions about Secretly — getting started, adding contacts, encryption, disappearing messages, calls, desktop, backup, and recovery.',
  },
  '/support': {
    title: 'Secretly Support',
    description:
      'Get help with Secretly: recover access with your recovery kit, restore a previous purchase, report a problem, or contact our support team.',
  },
  '/contact': {
    title: 'Contact Secretly',
    description:
      'Get in touch with the Secretly team. General support, security reports, and business inquiries — we are here to help.',
  },
  '/donate': {
    title: 'Donate to Secretly — Keep Privacy Free',
    description:
      'Support privacy that everyone can use. Your donation keeps Secretly free, independent, and free of ads, trackers, and surveillance.',
  },
  '/delete-account': {
    title: 'Delete Your Secretly Account',
    description:
      'How to delete your Secretly account and data. Because Secretly stores no personal information, removal is simple and final by design.',
  },
  '/privacy-policy': {
    title: 'Secretly Privacy Policy',
    description:
      'How Secretly’s zero-knowledge architecture protects you: what we never collect, what is technically processed, and your rights under GDPR.',
  },
  '/terms-of-service': {
    title: 'Secretly Terms of Service',
    description:
      'The terms governing your use of Secretly, including subscriptions, acceptable use, and the agreement between you and SIA Secretly.',
  },
}

const DEFAULT_SEO: SeoEntry = {
  title: 'Secretly — Private Messaging Without Phone Numbers or Email',
  description:
    'Secretly is an end-to-end encrypted messenger with no phone number, no email, no ads, and no trackers.',
}

export interface ResolvedSeo extends SeoEntry {
  canonical: string
  indexable: boolean
}

/** Normalise a pathname to its canonical form (strip trailing slash). */
function canonicalPath(pathname: string): string {
  if (pathname === '/' || pathname === '') return '/'
  return pathname.replace(/\/+$/, '')
}

/** Resolve SEO metadata + canonical URL for a given route pathname. */
export function getSeo(pathname: string): ResolvedSeo {
  const path = canonicalPath(pathname)
  const entry = SEO_BY_PATH[path]
  const canonical = path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`
  return {
    ...(entry ?? DEFAULT_SEO),
    canonical,
    // Unknown / not-found routes are not indexable.
    indexable: Boolean(entry),
  }
}

/** All canonical, indexable paths — used to keep the sitemap in sync. */
export const INDEXABLE_PATHS = Object.keys(SEO_BY_PATH)
