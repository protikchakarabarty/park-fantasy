"use client"

import React from "react"
import { Search, X } from "lucide-react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export const SearchBar = React.memo(function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative max-w-md w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-dim" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search menu items..."
        aria-label="Search menu items"
        className="w-full h-12 pl-11 pr-10 rounded-xl glass border border-glass-border text-fg-primary placeholder:text-fg-dim focus:outline-none focus:border-fg-primary/40 transition-colors text-sm"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-1 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center hover:bg-glass-hover transition-colors"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5 text-fg-dim" />
        </button>
      )}
    </div>
  )
})
