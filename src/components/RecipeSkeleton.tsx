export function RecipeSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <div className="aspect-[4/3] shimmer" />
      <div className="p-4 space-y-3">
        <div className="h-4 shimmer rounded-lg w-full" />
        <div className="h-4 shimmer rounded-lg w-3/4" />
        <div className="h-9 shimmer rounded-xl w-full mt-1" />
      </div>
    </div>
  )
}

export function RecipeSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <RecipeSkeleton key={i} />
      ))}
    </div>
  )
}
