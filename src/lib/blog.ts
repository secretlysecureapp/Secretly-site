import { marked } from 'marked'

/* Markdown-file blog. Posts live in src/content/blog/*.md with simple
   `--- key: value ---` frontmatter. Loaded + rendered at build time. */

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  author: string
  tags: string[]
  html: string
  readingMinutes: number
}

const raws = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!m) return { data: {}, body: raw }
  const data: Record<string, string> = {}
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':')
    if (i > 0) {
      const key = line.slice(0, i).trim()
      data[key] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '')
    }
  }
  return { data, body: m[2] }
}

marked.setOptions({ gfm: true, breaks: false })

export const POSTS: BlogPost[] = Object.entries(raws)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '')
    const { data, body } = parseFrontmatter(raw)
    const words = body.split(/\s+/).filter(Boolean).length
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? '',
      excerpt: data.excerpt ?? '',
      author: data.author ?? 'The Secretly Team',
      tags: (data.tags ?? '').split(',').map((s) => s.trim()).filter(Boolean),
      html: marked.parse(body) as string,
      readingMinutes: Math.max(1, Math.round(words / 200)),
    }
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1))

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug)
}

export function formatDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(`${iso}T00:00:00Z`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
}
