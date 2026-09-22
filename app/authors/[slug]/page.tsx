// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCosmic } from '@/lib/cosmic-preview'
import { hasStatus } from '@/lib/cosmic'
import AuthorCard from '@/components/AuthorCard'
import PostGrid from '@/components/PostGrid'
import type { Author, Post } from '@/types'

async function getAuthor(slug: string): Promise<Author | null> {
  try {
    const { cosmic, previewToken } = await getCosmic()
    const query = cosmic.objects
      .findOne({ type: 'authors', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)

    const response = previewToken ? await query.status('any') : await query
    return response.object as Author
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch author')
  }
}

async function getPostsByAuthor(authorId: string): Promise<Post[]> {
  try {
    const { cosmic, previewToken } = await getCosmic()
    const query = cosmic.objects
      .find({ type: 'posts', 'metadata.author': authorId })
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

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)

  return (
    <div className="container-page py-16">
      <div className="mb-12">
        <AuthorCard author={author} showProfileLink={false} />
      </div>

      <h2 className="font-display text-2xl font-bold text-charcoal mb-8">
        Stories by {author.title}
      </h2>

      <PostGrid posts={posts} emptyMessage="No posts from this author yet." />
    </div>
  )
}