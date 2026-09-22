import Link from 'next/link'
import { getCosmic } from '@/lib/cosmic-preview'
import { hasStatus } from '@/lib/cosmic'
import Hero from '@/components/Hero'
import PostGrid from '@/components/PostGrid'
import type { Post } from '@/types'

async function getLatestPosts(): Promise<Post[]> {
  try {
    const { cosmic, previewToken } = await getCosmic()
    const query = cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    const response = previewToken ? await query.status('any') : await query
    const posts = (response.objects as Post[]).sort((a, b) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })

    return posts.slice(0, 6)
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch posts')
  }
}

export default async function HomePage() {
  const posts = await getLatestPosts()
  const heroPost = posts[0]
  const heroImage = heroPost?.metadata?.featured_image?.imgix_url

  return (
    <>
      <Hero imageUrl={heroImage} />

      <section className="container-page py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-display text-3xl font-bold text-charcoal">Latest Adventures</h2>
          <Link href="/posts" className="text-sm font-semibold text-terracotta hover:text-terracotta-dark">
            View all posts →
          </Link>
        </div>

        <PostGrid posts={posts} emptyMessage="No posts yet. Your culinary journey starts here!" />
      </section>
    </>
  )
}