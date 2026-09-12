import type { ButtonHTMLAttributes } from 'react'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
}

export function IconButton({ label, className = '', children, ...props }: IconButtonProps) {
  return (
    <button
      aria-label={label}
      className={`inline-flex min-h-10 min-w-10 items-center justify-center rounded-pill bg-neutral-100 p-2.5 text-neutral-700 transition-colors hover:bg-neutral-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}