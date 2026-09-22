export default function Loading() {
  return (
    <div className="container-page py-16">
      <div className="h-10 w-64 bg-sand rounded mb-10 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="card p-8 h-40 bg-sand animate-pulse" />
        ))}
      </div>
    </div>
  )
}