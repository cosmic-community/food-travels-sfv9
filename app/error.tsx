'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container-page py-24 text-center">
      <h2 className="font-display text-2xl font-bold text-charcoal mb-4">
        Something went wrong 🍳
      </h2>
      <p className="text-charcoal/70 mb-8">
        We hit a snag loading this page. Please try again.
      </p>
      <button onClick={reset} className="btn-primary">
        Try again
      </button>
    </div>
  )
}