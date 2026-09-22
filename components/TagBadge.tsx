import Link from 'next/link'

interface TagBadgeProps {
  tag: string
  active?: boolean
}

export default function TagBadge({ tag, active = false }: TagBadgeProps) {
  return (
    <Link
      href={`/tags/${encodeURIComponent(tag)}`}
      className={`inline-flex items-center text-xs font-medium px-3 py-1 rounded-full transition-colors ${
        active
          ? 'bg-terracotta text-white'
          : 'bg-sand text-charcoal/80 hover:bg-terracotta/20'
      }`}
    >
      {tag}
    </Link>
  )
}