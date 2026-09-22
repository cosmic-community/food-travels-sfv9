import Link from 'next/link'

interface HeroProps {
  imageUrl?: string
}

export default function Hero({ imageUrl }: HeroProps) {
  const backgroundImage = imageUrl
    ? `${imageUrl}?w=2000&h=1200&fit=crop&auto=format,compress`
    : undefined

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : { backgroundColor: '#E2653B' }}
      />
      <div className="absolute inset-0 bg-hero-gradient" />

      <div className="relative container-page py-24 md:py-36 text-white text-center">
        <p className="uppercase tracking-[0.3em] text-sm font-semibold text-white/90 mb-4">
          Culinary Adventures
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 max-w-3xl mx-auto leading-tight">
          Taste the World, One Destination at a Time
        </h1>
        <p className="text-lg text-white/90 max-w-xl mx-auto mb-10">
          Street food stalls, hidden markets, and unforgettable meals from every corner of the globe.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/posts" className="btn-primary">
            Explore Posts
          </Link>
          <Link href="/tags" className="btn-secondary">
            Browse by Tag
          </Link>
        </div>
      </div>
    </section>
  )
}