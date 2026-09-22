// app/categories/[slug]/loading.tsx
export default function Loading() {
  return (
    <div className="container-page py-16">
      <div className="h-10 w-64 bg-sand rounded mb-10 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="card">
            <div className="aspect-[4/3] bg-sand animate-pulse" />
            <div className="p-5 space-y-3">
              <div className="h-4 w-24 bg-sand rounded animate-pulse" />
              <div className="h-6 w-full bg-sand rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}