/* ════════════════════════════════════════════════════════════════
   SITE CONFIG — central place for all external links & integrations
   ────────────────────────────────────────────────────────────────
   An empty string ('') or '#' for a download URL marks that platform
   as "Coming soon" — the download button is shown disabled.
   ════════════════════════════════════════════════════════════════ */

export const SITE = {
  /* Open-source repository (shown in footer) */
  github: 'https://github.com/secretlysecureapp/Secretly-site',

  /* Contact form delivery (Formspree). Empty = fall back to mailto. */
  formspreeEndpoint: 'https://formspree.io/f/xvznglzq',

  /* Support address used by the mailto fallback */
  supportEmail: 'support@secretlyapp.com',

  /* Donorbox campaign slug — embedded on the /donate page */
  donorboxCampaign: 'donate-to-secretly',

  /* Social profiles */
  social: {
    x:        'https://x.com/Secretly_App',
    facebook: 'https://facebook.com/secretlysecureapp',
  },

  /* Store / download destinations.
     '' or '#' => shown as "Coming soon". */
  download: {
    android: 'https://play.google.com/store/apps/details?id=com.secretly.secretly_app&pcampaignid=web_share',
    ios:     'https://apps.apple.com/ua/app/secretly-secure-messenger/id6760417329?l=ru',
    windows: '',  // Coming soon
    macos:   '',  // Coming soon
  },

  /* Privacy-friendly, COOKIELESS analytics — OFF by default (ships no
     third-party requests until you fill this in).
     • Recommended: Cloudflare Web Analytics (free, cookieless; the site
       is already on Cloudflare). Paste its beacon token below — the CSP
       already allows static.cloudflareinsights.com.
     • Or self-host Plausible/Umami: set `script` (+ `domain`) and add
       your analytics origin to public/_headers CSP. */
  analytics: {
    cloudflareToken: '',  // e.g. '0a1b2c3d...' → enables CF Web Analytics
    script: '',           // e.g. 'https://plausible.example.com/js/script.js'
    domain: 'secretlyapp.com',
  },
}

/** True when a download URL points somewhere real (not empty / not '#'). */
export function isAvailable(url: string): boolean {
  return Boolean(url) && url !== '#'
}

export default SITE
