// app/tags/[tag]/page.tsx
import { getCosmic } from '@/lib/cosmic-preview'
import { hasStatus } from '@/lib/cosmic'
import PostGrid from '@/components/PostGrid'
import type { Post } from '@/types'

async function getAllPosts(): Promise<Post[]> {
  try {
    const { cosmic, previewToken } = await getCosmic()
    const query = cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    const response = previewToken ? await query.status('any') : await query
    return (response.objects as Post[]).sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch posts')
  }
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>
}) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = await getAllPosts()

  const filteredPosts = posts.filter((post) =>
    (post.metadata?.tags || []).includes(decodedTag)
  )

  return (
    <div className="container-page py-16">
      <div className="mb-10">
        <p className="text-sm font-semibold text-olive uppercase tracking-wide mb-2">Tag</p>
        <h1 className="font-display text-4xl font-bold text-charcoal">{decodedTag}</h1>
      </div>

      <PostGrid posts={filteredPosts} emptyMessage="No posts with this tag yet." />
    </div>
  )
}