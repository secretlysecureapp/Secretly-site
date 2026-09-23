/* ════════════════════════════════════════════════════════════════
   SITE CONFIG — central place for all external links & integrations
   ────────────────────────────────────────────────────────────────
   An empty string ('') or '#' for a download URL marks that platform
   as "Coming soon" — the download button is shown disabled.
   ════════════════════════════════════════════════════════════════ */

export const SITE = {
  /* Open-source repository of the MESSENGER (shown in footer, on /security
     and in the Organization JSON-LD). Until 18.09.2026 this pointed at the
     repository of THIS marketing site, so everyone who clicked "open source"
     landed on the website's code instead of the application's. */
  github: 'https://github.com/Arkhanhel/Secretly',

  /* Repository of this website itself. Separate licence: the site is MIT,
     the messenger is AGPL-3.0. */
  githubSite: 'https://github.com/secretlysecureapp/Secretly-site',

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
    // Постоянный адрес: ссылка на сервере переставляется при каждом выпуске,
    // поэтому сайт не нужно править. Отдаётся с no-store — иначе промежуточные
    // узлы весь год держали бы по этому адресу старую версию.
    macos:   'https://updates.secretlyapp.com/Secretly-latest.dmg',
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
