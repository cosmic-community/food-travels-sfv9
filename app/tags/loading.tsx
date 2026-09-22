export default function Loading() {
  return (
    <div className="container-page py-16">
      <div className="h-10 w-64 bg-sand rounded mb-10 animate-pulse" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="card p-6 h-20 bg-sand animate-pulse" />
        ))}
      </div>
    </div>
  )
}