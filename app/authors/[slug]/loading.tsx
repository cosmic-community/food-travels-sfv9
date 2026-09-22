// app/authors/[slug]/loading.tsx
export default function Loading() {
  return (
    <div className="container-page py-16">
      <div className="card p-6 flex gap-6 mb-12">
        <div className="w-32 h-32 rounded-full bg-sand animate-pulse" />
        <div className="flex-1 space-y-3">
          <div className="h-6 w-1/3 bg-sand rounded animate-pulse" />
          <div className="h-4 w-1/4 bg-sand rounded animate-pulse" />
          <div className="h-4 w-full bg-sand rounded animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="card">
            <div className="aspect-[4/3] bg-sand animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}