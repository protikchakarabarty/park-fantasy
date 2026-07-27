"use client"

import { Component, type ReactNode } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
  section?: string
}

interface State {
  hasError: boolean
  error: Error | null
}

export class SectionErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary" role="alert">
          <div className="max-w-md mx-auto text-center">
            <div className="w-12 h-12 rounded-full gold-gradient-bg flex items-center justify-center mx-auto mb-4">
              <span className="text-xl text-inverse font-bold">!</span>
            </div>
            <h3 className="text-lg font-semibold text-fg-primary mb-2">
              {this.props.section || "This section"} unavailable
            </h3>
            <p className="text-sm text-fg-dim mb-4">
              Something went wrong loading this section. Please try refreshing the page.
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="text-sm text-fg-primary underline underline-offset-4 hover:text-fg-secondary transition-colors"
            >
              Try again
            </button>
          </div>
        </section>
      )
    }
    return this.props.children
  }
}
