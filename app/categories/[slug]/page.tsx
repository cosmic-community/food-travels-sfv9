// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getCosmic } from '@/lib/cosmic-preview'
import { hasStatus, getMetafieldValue } from '@/lib/cosmic'
import PostGrid from '@/components/PostGrid'
import type { Category, Post } from '@/types'

async function getCategory(slug: string): Promise<Category | null> {
  try {
    const { cosmic, previewToken } = await getCosmic()
    const query = cosmic.objects
      .findOne({ type: 'categories', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)

    const response = previewToken ? await query.status('any') : await query
    return response.object as Category
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch category')
  }
}

async function getPostsByCategory(categoryId: string): Promise<Post[]> {
  try {
    const { cosmic, previewToken } = await getCosmic()
    const query = cosmic.objects
      .find({ type: 'posts', 'metadata.category': categoryId })
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

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <div className="container-page py-16">
      <div className="mb-10">
        <span className="text-4xl mb-4 block">🗂️</span>
        <h1 className="font-display text-4xl font-bold text-charcoal mb-3">{name}</h1>
        {description && <p className="text-charcoal/70 max-w-2xl">{description}</p>}
      </div>

      <PostGrid posts={posts} emptyMessage="No posts in this category yet." />
    </div>
  )
}