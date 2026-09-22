import Link from 'next/link'
import type { Post } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import TagBadge from '@/components/TagBadge'

export default function PostCard({ post }: { post: Post }) {
  const image = post.metadata?.featured_image
  const destination = getMetafieldValue(post.metadata?.destination)
  const excerpt = getMetafieldValue(post.metadata?.excerpt)
  const tags = post.metadata?.tags || []
  const category = post.metadata?.category

  return (
    <Link href={`/posts/${post.slug}`} className="card group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        {image && (
          <img
            src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={post.title}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        {category && (
          <span className="absolute top-3 left-3 bg-white/90 text-terracotta text-xs font-semibold px-3 py-1 rounded-full">
            {getMetafieldValue(category.metadata?.name) || category.title}
          </span>
        )}
      </div>

      <div className="p-5">
        {destination && (
          <p className="text-xs font-semibold text-olive uppercase tracking-wide mb-2">
            📍 {destination}
          </p>
        )}
        <h3 className="font-display text-xl font-bold text-charcoal mb-2 group-hover:text-terracotta transition-colors line-clamp-2">
          {post.title}
        </h3>
        {excerpt && (
          <p className="text-sm text-charcoal/70 line-clamp-2 mb-3">{excerpt}</p>
        )}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}