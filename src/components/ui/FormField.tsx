import type { ReactNode } from 'react'

interface FormFieldProps {
  id: string
  label: string
  children: ReactNode
  hint?: string
  error?: string
}

export function FormField({ id, label, children, hint, error }: FormFieldProps) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium text-neutral-700" htmlFor={id}>
        {label}
      </label>
      {children}
      {error ? <p className="text-sm text-danger-600" role="alert">{error}</p> : null}
      {!error && hint ? <p className="text-xs text-neutral-500">{hint}</p> : null}
    </div>
  )
}