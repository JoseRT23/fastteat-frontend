import type { ReactNode } from 'react'

interface ModalProps {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

export function Modal({ open, title, onClose, children }: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-xl font-bold text-slate-900">{title}</h3>
          <button className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700" onClick={onClose}>
            Cerrar
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
