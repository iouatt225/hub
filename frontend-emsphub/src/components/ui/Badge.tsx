import * as React from "react"
import { cn } from "@/lib/utils"

const badgeVariants = {
  default: "bg-accent text-background",
  secondary: "bg-surface border border-border text-text-secondary",
  destructive: "bg-error text-white",
  outline: "border border-border text-text-primary bg-transparent",
  success: "bg-success/10 text-success border border-success/20",
  warning: "bg-warning/10 text-warning border border-warning/20",
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
