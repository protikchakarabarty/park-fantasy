export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full gold-gradient-bg flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
          <span className="text-2xl text-inverse font-bold">P</span>
        </div>
        <div className="w-32 h-2 rounded-full bg-bg-secondary mx-auto overflow-hidden">
          <div className="h-full w-1/3 gold-gradient-bg rounded-full animate-loading-bar" />
        </div>
      </div>
    </div>
  )
}
