import { Head } from 'vite-react-ssg'
import { SITE } from '../config'

/* Cookieless, privacy-first analytics.
   Renders NOTHING unless configured in config.ts — so by default the
   site makes zero third-party requests, matching the "no trackers" promise. */
export default function Analytics() {
  const { cloudflareToken, script, domain } = SITE.analytics

  if (cloudflareToken) {
    return (
      <Head>
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={`{"token":"${cloudflareToken}"}`}
        />
      </Head>
    )
  }

  if (script) {
    return (
      <Head>
        <script defer src={script} data-domain={domain} />
      </Head>
    )
  }

  return null
}
