import Link from 'next/link'
import { ALL_TAGS } from '@/lib/cosmic'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream mt-20">
      <div className="container-page py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-display text-xl font-bold mb-3">Food Travels 🍜</h3>
          <p className="text-sm text-sand/80 max-w-xs">
            Culinary adventures, street food finds, and fine dining discoveries from around the world.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-saffron">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/posts" className="hover:text-terracotta-light transition-colors">All Posts</Link></li>
            <li><Link href="/categories" className="hover:text-terracotta-light transition-colors">Categories</Link></li>
            <li><Link href="/authors" className="hover:text-terracotta-light transition-colors">Authors</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-saffron">Browse by Tag</h4>
          <div className="flex flex-wrap gap-2">
            {ALL_TAGS.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="text-xs bg-white/10 hover:bg-white/20 rounded-full px-3 py-1 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-sand/60">
        © {new Date().getFullYear()} Food Travels. All rights reserved.
      </div>
    </footer>
  )
}