import { useEffect, useRef, type ReactNode } from 'react'

interface ConfirmDialogProps {
  open: boolean
  title: string
  children: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  danger?: boolean
  onConfirm: () => void
  onCancel: () => void
}

/**
 * Modal de confirmación con <dialog> nativo + useRef + showModal().
 * Se usa para quitar favoritos y para confirmar el envío del formulario.
 */
export default function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="confirm-title"
      onCancel={(e) => {
        // Tecla Escape: cerramos a través del estado de React
        e.preventDefault()
        onCancel()
      }}
      className="m-auto w-[90%] max-w-sm rounded-2xl border border-space-line bg-space-2 p-6 text-center text-slate-200 shadow-2xl backdrop:bg-space/80 backdrop:backdrop-blur-sm"
    >
      <span className="text-4xl" role="img" aria-label="Advertencia">
        ⚠️
      </span>
      <h2 id="confirm-title" className="mt-2 text-lg font-extrabold text-white">
        {title}
      </h2>
      <p className="mt-2 text-sm text-slate-300">{children}</p>
      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-space-line bg-space-3 px-5 py-2 text-sm font-semibold text-slate-200 hover:border-slate-400"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={`rounded-full px-5 py-2 text-sm font-bold ${
            danger ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-portal text-space hover:bg-portal-light'
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </dialog>
  )
}
