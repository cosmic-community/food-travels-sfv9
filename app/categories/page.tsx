import Link from 'next/link'
import { getCosmic } from '@/lib/cosmic-preview'
import { hasStatus, getMetafieldValue } from '@/lib/cosmic'
import type { Category } from '@/types'

async function getCategories(): Promise<Category[]> {
  try {
    const { cosmic, previewToken } = await getCosmic()
    const query = cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)

    const response = previewToken ? await query.status('any') : await query
    return response.objects as Category[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch categories')
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="container-page py-16">
      <h1 className="font-display text-4xl font-bold text-charcoal mb-3">Categories</h1>
      <p className="text-charcoal/70 mb-10">
        Explore our culinary adventures organized by theme.
      </p>

      {categories.length === 0 ? (
        <p className="text-charcoal/60 py-16 text-center">No categories yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="card p-8 text-center hover:-translate-y-1 transform transition-transform"
            >
              <span className="text-3xl mb-4 block">🗂️</span>
              <h2 className="font-display text-xl font-bold text-charcoal mb-2">
                {getMetafieldValue(category.metadata?.name) || category.title}
              </h2>
              {category.metadata?.description && (
                <p className="text-sm text-charcoal/70">
                  {getMetafieldValue(category.metadata.description)}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}