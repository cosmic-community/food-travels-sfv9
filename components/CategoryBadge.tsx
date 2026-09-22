import Link from 'next/link'
import type { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function CategoryBadge({ category }: { category: Category }) {
  const name = getMetafieldValue(category.metadata?.name) || category.title

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="inline-flex items-center gap-1.5 bg-terracotta/10 text-terracotta font-semibold text-sm px-4 py-1.5 rounded-full hover:bg-terracotta/20 transition-colors"
    >
      🗂️ {name}
    </Link>
  )
}