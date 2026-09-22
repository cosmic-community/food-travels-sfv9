// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCosmic } from '@/lib/cosmic-preview'
import { hasStatus, getMetafieldValue } from '@/lib/cosmic'
import CategoryBadge from '@/components/CategoryBadge'
import TagBadge from '@/components/TagBadge'
import AuthorCard from '@/components/AuthorCard'
import type { Post } from '@/types'
import type { Metadata } from 'next'

async function getPost(slug: string): Promise<Post | null> {
  try {
    const { cosmic, previewToken } = await getCosmic()
    const query = cosmic.objects
      .findOne({ type: 'posts', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(2)

    const response = previewToken ? await query.status('any') : await query
    return response.object as Post
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch post')
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return { title: 'Post Not Found | Food Travels' }
  }

  return {
    title: `${post.title} | Food Travels`,
    description: getMetafieldValue(post.metadata?.excerpt) || undefined,
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const image = post.metadata?.featured_image
  const destination = getMetafieldValue(post.metadata?.destination)
  const tags = post.metadata?.tags || []
  const category = post.metadata?.category
  const author = post.metadata?.author
  const content = post.metadata?.content || ''

  return (
    <article>
      <div className="relative">
        {image && (
          <div className="relative h-[45vh] md:h-[55vh] w-full overflow-hidden">
            <img
              src={`${image.imgix_url}?w=2000&h=1200&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
          </div>
        )}

        <div className="container-page">
          <div className={`${image ? '-mt-24 relative' : 'pt-16'} pb-6`}>
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl">
              {destination && (
                <p className="text-sm font-semibold text-olive uppercase tracking-wide mb-3">
                  📍 {destination}
                </p>
              )}
              <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                {category && <CategoryBadge category={category} />}
                {tags.map((tag) => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {content ? (
            <div className="prose-content" dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <p className="text-charcoal/60">No content available for this post yet.</p>
          )}
        </div>

        <div className="lg:col-span-1">
          {author && (
            <div className="sticky top-24">
              <h3 className="font-display text-lg font-bold text-charcoal mb-4">Written by</h3>
              <AuthorCard author={author} />
            </div>
          )}
        </div>
      </div>
    </article>
  )
}