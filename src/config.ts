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
}

/** True when a download URL points somewhere real (not empty / not '#'). */
export function isAvailable(url: string): boolean {
  return Boolean(url) && url !== '#'
}

export default SITE
