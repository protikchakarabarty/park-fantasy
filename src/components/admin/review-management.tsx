"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Star, ThumbsUp, Trash2, Reply, X, Check } from "lucide-react"
import { getReviews, updateReview, deleteReview, approveReview, featureReview } from "@/data/reviews"
import type { Review } from "@/data/types"

export function ReviewManagement() {
  const [reviews, setReviews] = useState<Review[]>(() => getReviews())
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all")
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")

  const refresh = () => setReviews(getReviews())

  const filtered = reviews.filter((r) => {
    const matchesSearch = r.customerName.toLowerCase().includes(search.toLowerCase()) ||
      r.comment.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "all" || (filter === "approved" && r.isApproved) || (filter === "pending" && !r.isApproved)
    return matchesSearch && matchesFilter
  })

  const handleApprove = (id: string) => {
    approveReview(id)
    refresh()
  }

  const handleFeature = (id: string) => {
    featureReview(id)
    refresh()
  }

  const handleDelete = (id: string) => {
    if (confirm("Delete this review?")) {
      deleteReview(id)
      refresh()
    }
  }

  const handleReply = (id: string) => {
    if (replyText.trim()) {
      updateReview(id, { reply: replyText.trim() })
      setReplyTo(null)
      setReplyText("")
      refresh()
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-3 h-3 ${i < rating ? "text-fg-primary fill-fg-primary" : "text-fg-dim"}`} />
    ))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-fg-primary">Review Management</h1>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-dim" />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reviews..."
            className="w-full h-10 rounded-xl border border-glass-border bg-glass pl-10 pr-4 text-sm text-fg-primary focus:outline-none focus:border-fg-primary/50" />
        </div>
        <div className="flex rounded-xl border border-glass-border overflow-hidden">
          {(["all", "pending", "approved"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 text-xs font-medium transition-all ${
                filter === f ? "gold-gradient-bg text-inverse" : "text-fg-muted hover:text-fg-primary"
              }`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((review) => (
          <motion.div key={review.id} layout className="glass rounded-xl border border-glass-border p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full gold-gradient-bg flex items-center justify-center text-sm text-inverse font-bold shrink-0">
                {review.customerName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-fg-primary">{review.customerName}</span>
                  <span className="text-xs text-fg-dim">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                  {review.productName && (
                    <span className="text-xs px-2 py-0.5 rounded-full glass text-fg-dim ml-auto">
                      {review.productName}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 mb-2">{renderStars(review.rating)}</div>
                <p className="text-sm text-fg-primary">{review.comment}</p>
                {review.reply && (
                  <div className="mt-2 pl-3 border-l-2 border-fg-primary/30">
                    <p className="text-xs text-fg-dim">Your reply:</p>
                    <p className="text-xs text-fg-muted">{review.reply}</p>
                  </div>
                )}
                {replyTo === review.id && (
                  <div className="mt-2 flex gap-2">
                    <input value={replyText} onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write a reply..."
                      className="flex-1 h-9 rounded-xl border border-glass-border bg-glass px-3 text-xs text-fg-primary focus:outline-none focus:border-fg-primary/50" />
                    <button onClick={() => handleReply(review.id)} className="h-9 px-3 gold-gradient-bg text-inverse rounded-full text-xs font-medium">Send</button>
                    <button onClick={() => setReplyTo(null)} aria-label="Cancel reply" className="w-11 h-11 rounded-xl glass flex items-center justify-center">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {!review.isApproved && (
                  <button onClick={() => handleApprove(review.id)} aria-label="Approve review" className="w-11 h-11 rounded-lg glass flex items-center justify-center text-green-400 hover:bg-green-400/10">
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}
                <button onClick={() => { setReplyTo(replyTo === review.id ? null : review.id); setReplyText("") }}
                  aria-label="Reply to review"
                  className="w-11 h-11 rounded-lg glass flex items-center justify-center">
                  <Reply className="w-3.5 h-3.5 text-fg-muted" />
                </button>
                <button onClick={() => handleFeature(review.id)}
                  aria-label="Feature review"
                  className={`w-11 h-11 rounded-lg glass flex items-center justify-center ${review.isFeatured ? "text-fg-primary" : "text-fg-dim"}`}>
                  <ThumbsUp className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(review.id)} aria-label="Delete review" className="w-11 h-11 rounded-lg glass flex items-center justify-center">
                  <Trash2 className="w-3.5 h-3.5 text-red-400" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
