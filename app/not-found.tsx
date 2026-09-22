import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <h2 className="font-display text-3xl font-bold text-charcoal mb-4">
        Page Not Found 🍽️
      </h2>
      <p className="text-charcoal/70 mb-8">
        Looks like this dish isn&apos;t on the menu. Let&apos;s get you back on track.
      </p>
      <Link href="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  )
}