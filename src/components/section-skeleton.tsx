export function FeaturedCategoriesSkeleton() {
  return (
    <section className="section-padding px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-48 h-8 rounded-lg bg-bg-secondary animate-shimmer mx-auto mb-3" />
          <div className="w-72 h-5 rounded bg-bg-secondary animate-shimmer mx-auto" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-bg-secondary animate-shimmer mx-auto mb-4" />
              <div className="w-24 h-5 rounded bg-bg-secondary animate-shimmer mx-auto mb-2" />
              <div className="w-32 h-4 rounded bg-bg-secondary animate-shimmer mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function BestSellingSkeleton() {
  return (
    <section className="section-padding px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-48 h-8 rounded-lg bg-bg-secondary animate-shimmer mx-auto mb-3" />
          <div className="w-72 h-5 rounded bg-bg-secondary animate-shimmer mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden">
              <div className="aspect-video bg-bg-secondary animate-shimmer" />
              <div className="p-4 space-y-2">
                <div className="w-3/4 h-5 rounded bg-bg-secondary animate-shimmer" />
                <div className="w-full h-4 rounded bg-bg-secondary animate-shimmer" />
                <div className="flex justify-between items-center pt-2">
                  <div className="w-16 h-6 rounded bg-bg-secondary animate-shimmer" />
                  <div className="w-24 h-10 rounded-full bg-bg-secondary animate-shimmer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function DefaultSectionSkeleton() {
  return (
    <section className="section-padding px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-48 h-8 rounded-lg bg-bg-secondary animate-shimmer mx-auto mb-3" />
          <div className="w-72 h-5 rounded bg-bg-secondary animate-shimmer mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-6">
              <div className="w-full h-32 rounded-xl bg-bg-secondary animate-shimmer mb-4" />
              <div className="w-3/4 h-5 rounded bg-bg-secondary animate-shimmer mb-2" />
              <div className="w-full h-4 rounded bg-bg-secondary animate-shimmer" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
