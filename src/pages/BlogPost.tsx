import { useParams, Link, Navigate } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { useReveal } from '../hooks/useReveal'
import { getPost, formatDate } from '../lib/blog'
import { SITE_ORIGIN, OG_IMAGE } from '../seo'

export default function BlogPost() {
  const ref = useReveal()
  const { slug } = useParams()
  const post = slug ? getPost(slug) : undefined

  if (!post) return <Navigate to="/blog" replace />

  const url = `${SITE_ORIGIN}/blog/${post.slug}`
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'Secretly',
      logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}/logo.png` },
    },
    mainEntityOfPage: url,
    image: OG_IMAGE,
  }

  return (
    <div ref={ref}>
      <Head>
        <title>{`${post.title} — Secretly Blog`}</title>
        <meta name="description" content={post.excerpt} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <script type="application/ld+json">{JSON.stringify(ld)}</script>
      </Head>

      <article className="section" style={{ paddingTop: 72 }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <Link to="/blog" className="blog-post__back reveal">← Blog</Link>
          <div className="blog-card__meta reveal" style={{ marginTop: 20 }}>
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readingMinutes} min read</span>
            <span>·</span>
            <span>{post.author}</span>
          </div>
          <h1 className="blog-post__title reveal reveal-delay-1">{post.title}</h1>
          <div
            className="prose reveal reveal-delay-2"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <div className="blog-post__cta reveal">
            <p>Private messaging without phone numbers, ads, or trackers.</p>
            <Link to="/download" className="btn btn--primary">Get Secretly</Link>
          </div>
        </div>
      </article>
    </div>
  )
}
