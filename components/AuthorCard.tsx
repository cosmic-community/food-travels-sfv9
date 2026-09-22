import Link from 'next/link'
import type { Author } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface AuthorCardProps {
  author: Author
  compact?: boolean
  showProfileLink?: boolean
}

export default function AuthorCard({ author, compact = false, showProfileLink = true }: AuthorCardProps) {
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const bio = getMetafieldValue(author.metadata?.bio)
  const homeBase = getMetafieldValue(author.metadata?.home_base)
  const photo = author.metadata?.profile_photo

  if (compact) {
    return (
      <Link href={`/authors/${author.slug}`} className="card flex items-center gap-4 p-4">
        {photo ? (
          <img
            src={`${photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
            alt={name}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-terracotta/20 flex items-center justify-center text-2xl flex-shrink-0">
            🍽️
          </div>
        )}
        <div className="min-w-0">
          <h3 className="font-display font-bold text-charcoal truncate">{name}</h3>
          {homeBase && <p className="text-xs text-olive font-medium">📍 {homeBase}</p>}
        </div>
      </Link>
    )
  }

  return (
    <div className="card p-6 flex flex-col sm:flex-row gap-6 items-start">
      {photo ? (
        <img
          src={`${photo.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
          alt={name}
          width={160}
          height={160}
          className="w-32 h-32 rounded-full object-cover flex-shrink-0 mx-auto sm:mx-0"
        />
      ) : (
        <div className="w-32 h-32 rounded-full bg-terracotta/20 flex items-center justify-center text-4xl flex-shrink-0 mx-auto sm:mx-0">
          🍽️
        </div>
      )}
      <div>
        <h2 className="font-display text-2xl font-bold text-charcoal mb-1">{name}</h2>
        {homeBase && (
          <p className="text-sm text-olive font-semibold mb-3">📍 Based in {homeBase}</p>
        )}
        {bio && <p className="text-charcoal/80 leading-relaxed">{bio}</p>}
        {showProfileLink && (
          <Link
            href={`/authors/${author.slug}`}
            className="inline-block mt-4 text-sm font-semibold text-terracotta hover:text-terracotta-dark"
          >
            View full profile →
          </Link>
        )}
      </div>
    </div>
  )
}