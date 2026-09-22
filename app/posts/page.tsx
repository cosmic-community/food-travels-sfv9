import { getCosmic } from '@/lib/cosmic-preview'
import { hasStatus } from '@/lib/cosmic'
import PostGrid from '@/components/PostGrid'
import TagFilter from '@/components/TagFilter'
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

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>
}) {
  const { tag } = await searchParams
  const posts = await getAllPosts()

  const filteredPosts = tag
    ? posts.filter((post) => (post.metadata?.tags || []).includes(tag))
    : posts

  return (
    <div className="container-page py-16">
      <div className="mb-10">
        <h1 className="font-display text-4xl font-bold text-charcoal mb-3">All Posts</h1>
        <p className="text-charcoal/70">
          Browse every culinary adventure, or filter by tag to find exactly what you&apos;re craving.
        </p>
      </div>

      <TagFilter activeTag={tag} />

      <PostGrid posts={filteredPosts} emptyMessage="No posts match this tag yet." />
    </div>
  )
}