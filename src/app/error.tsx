"use client"

import { useEffect } from "react"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary p-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.08)_0%,_transparent_60%)]" />
      <div className="relative z-10 text-center max-w-md">
        <div className="w-20 h-20 rounded-full gold-gradient-bg flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl text-inverse font-bold">!</span>
        </div>
        <h1 className="text-3xl font-bold text-fg-primary mb-3">Something went wrong</h1>
        <p className="text-fg-dim mb-8 leading-relaxed">
          We encountered an unexpected error. Please try again or come back later.
        </p>
        <button
          onClick={reset}
          className="gold-gradient-bg text-inverse font-semibold px-8 py-3 rounded-full transition-all hover:shadow-lg hover:shadow-fg-primary/20 active:scale-95"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
