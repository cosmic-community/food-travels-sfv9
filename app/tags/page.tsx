import Link from 'next/link'
import { getCosmic } from '@/lib/cosmic-preview'
import { hasStatus, ALL_TAGS } from '@/lib/cosmic'
import type { Post } from '@/types'

async function getAllPosts(): Promise<Post[]> {
  try {
    const { cosmic, previewToken } = await getCosmic()
    const query = cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'metadata'])
      .depth(0)

    const response = previewToken ? await query.status('any') : await query
    return response.objects as Post[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch posts')
  }
}

export default async function TagsPage() {
  const posts = await getAllPosts()

  const tagCounts: Record<string, number> = {}
  for (const tag of ALL_TAGS) {
    tagCounts[tag] = posts.filter((post) => (post.metadata?.tags || []).includes(tag)).length
  }

  return (
    <div className="container-page py-16">
      <h1 className="font-display text-4xl font-bold text-charcoal mb-3">Browse by Tag</h1>
      <p className="text-charcoal/70 mb-10">
        Find exactly the kind of culinary adventure you&apos;re craving.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {ALL_TAGS.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="card p-6 text-center hover:-translate-y-1 transform transition-transform"
          >
            <p className="font-display font-bold text-charcoal mb-1">{tag}</p>
            <p className="text-xs text-charcoal/60">
              {tagCounts[tag] || 0} {tagCounts[tag] === 1 ? 'post' : 'posts'}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}