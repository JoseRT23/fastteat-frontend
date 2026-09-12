import type { ReactNode } from 'react'
import { Button } from './ui'

interface ModalProps {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

export function Modal({ open, title, onClose, children }: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary-950/50 px-4 py-6" role="presentation">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 id="modal-title" className="text-xl font-bold text-neutral-900">{title}</h2>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cerrar
          </Button>
        </div>
        {children}
      </div>
    </div>
  )
}
