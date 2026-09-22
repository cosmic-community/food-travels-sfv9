// app/posts/[slug]/loading.tsx
export default function Loading() {
  return (
    <div className="container-page py-16">
      <div className="h-[45vh] bg-sand rounded-2xl animate-pulse mb-8" />
      <div className="space-y-4 max-w-3xl">
        <div className="h-8 w-1/2 bg-sand rounded animate-pulse" />
        <div className="h-4 w-full bg-sand rounded animate-pulse" />
        <div className="h-4 w-full bg-sand rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-sand rounded animate-pulse" />
      </div>
    </div>
  )
}