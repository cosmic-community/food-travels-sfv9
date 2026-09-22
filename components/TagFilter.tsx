import Link from 'next/link'
import { ALL_TAGS } from '@/lib/cosmic'

export default function TagFilter({ activeTag }: { activeTag?: string }) {
  return (
    <div className="flex flex-wrap gap-2 mb-10">
      <Link
        href="/posts"
        className={`text-sm font-medium px-4 py-1.5 rounded-full transition-colors ${
          !activeTag ? 'bg-terracotta text-white' : 'bg-sand text-charcoal/80 hover:bg-terracotta/20'
        }`}
      >
        All
      </Link>
      {ALL_TAGS.map((tag) => (
        <Link
          key={tag}
          href={`/posts?tag=${encodeURIComponent(tag)}`}
          className={`text-sm font-medium px-4 py-1.5 rounded-full transition-colors ${
            activeTag === tag ? 'bg-terracotta text-white' : 'bg-sand text-charcoal/80 hover:bg-terracotta/20'
          }`}
        >
          {tag}
        </Link>
      ))}
    </div>
  )
}