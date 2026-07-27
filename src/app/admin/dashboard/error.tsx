"use client"

export default function AdminError({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary p-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full gold-gradient-bg flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-inverse font-bold">!</span>
        </div>
        <h1 className="text-2xl font-bold text-fg-primary mb-2">Admin Panel Error</h1>
        <p className="text-fg-dim mb-6 text-sm">An error occurred in the admin panel. Please try again.</p>
        <button onClick={reset} className="gold-gradient-bg text-inverse font-semibold px-6 py-2.5 rounded-full text-sm transition-all hover:shadow-lg hover:shadow-fg-primary/20 active:scale-95">
          Try Again
        </button>
      </div>
    </div>
  )
}
