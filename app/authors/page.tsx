import { getCosmic } from '@/lib/cosmic-preview'
import { hasStatus } from '@/lib/cosmic'
import AuthorCard from '@/components/AuthorCard'
import type { Author } from '@/types'

async function getAuthors(): Promise<Author[]> {
  try {
    const { cosmic, previewToken } = await getCosmic()
    const query = cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0)

    const response = previewToken ? await query.status('any') : await query
    return response.objects as Author[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch authors')
  }
}

export default async function AuthorsPage() {
  const authors = await getAuthors()

  return (
    <div className="container-page py-16">
      <h1 className="font-display text-4xl font-bold text-charcoal mb-3">Our Authors</h1>
      <p className="text-charcoal/70 mb-10">
        Meet the food-loving travelers behind the stories.
      </p>

      {authors.length === 0 ? (
        <p className="text-charcoal/60 py-16 text-center">No authors yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} compact />
          ))}
        </div>
      )}
    </div>
  )
}