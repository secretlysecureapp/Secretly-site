import { Head } from 'vite-react-ssg'
import { useLocation } from 'react-router-dom'
import { getSeo, OG_IMAGE } from '../seo'

/* ──────────────────────────────────────────────────────────────
   Per-page <head> manager.

   Rendered once inside the app shell. On every route it injects a
   UNIQUE title, description, and a self-referencing canonical /
   og:url — fixing the previous behaviour where every page declared
   the homepage as its canonical and shared one title/description.

   Static / shared tags (charset, viewport, theme-color, icons,
   og:image, twitter:card, og:site_name …) stay in index.html.
   ────────────────────────────────────────────────────────────── */
export default function Seo() {
  const { pathname } = useLocation()
  const { title, description, canonical, indexable } = getSeo(pathname)

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={indexable ? 'index, follow' : 'noindex, follow'} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph (per-page) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={OG_IMAGE} />

      {/* Twitter (per-page) */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Head>
  )
}
