import type { HTMLAttributes } from 'react'

type BadgeVariant = 'neutral' | 'success' | 'warning' | 'danger' | 'info'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-neutral-100 text-neutral-700',
  success: 'bg-success-100 text-success-700',
  warning: 'bg-warning-100 text-warning-700',
  danger: 'bg-danger-100 text-danger-600',
  info: 'bg-info-100 text-info-700',
}

export function Badge({ variant = 'neutral', className = '', ...props }: BadgeProps) {
  return <span className={`inline-flex rounded-pill px-2.5 py-1 text-xs font-semibold ${variantClasses[variant]} ${className}`} {...props} />
}