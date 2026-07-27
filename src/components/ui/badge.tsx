import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-fg-primary/20 text-fg-primary border border-fg-primary/30",
        secondary: "bg-glass text-fg-muted border border-glass-border",
        destructive: "bg-fg-primary/20 text-fg-primary border border-fg-primary/30",
        outline: "text-fg-muted border border-glass-border",
        success: "bg-fg-primary/20 text-fg-primary border border-fg-primary/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge }
