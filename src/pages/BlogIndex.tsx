import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { POSTS, formatDate } from '../lib/blog'

export default function BlogIndex() {
  const ref = useReveal()

  return (
    <div ref={ref}>
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__kicker reveal">Blog</p>
          <h1 className="page-hero__title reveal reveal-delay-1">Notes on privacy &amp; security</h1>
          <p className="page-hero__sub reveal reveal-delay-2">
            Plain-language writing on how Secretly protects you — and how private messaging actually works.
          </p>
        </div>
      </section>
      <div className="divider" />

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 22, maxWidth: 980 }}>
            {POSTS.map((post, i) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className={`blog-card reveal reveal-delay-${Math.min(i + 1, 6)}`}
              >
                <div className="blog-card__meta">
                  <span>{formatDate(post.date)}</span>
                  <span>·</span>
                  <span>{post.readingMinutes} min read</span>
                </div>
                <h2 className="blog-card__title">{post.title}</h2>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <span className="blog-card__more">Read article →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
