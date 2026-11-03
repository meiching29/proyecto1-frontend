import type { Toast, ToastType } from '../context/ToastContext'

interface ToastContainerProps {
  toasts: Toast[]
  onDismiss: (id: number) => void
}

// Éxito = verde portal, error = rojo, info = celeste Rick
const styles: Record<ToastType, string> = {
  success: 'bg-portal text-space',
  error: 'bg-red-500 text-white',
  info: 'bg-rick text-space',
}

const icons: Record<ToastType, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
}

export default function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed right-4 top-20 z-50 flex w-[calc(100%-2rem)] max-w-xs flex-col gap-2"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role={toast.type === 'error' ? 'alert' : 'status'}
          className={`pointer-events-auto flex items-start gap-2 rounded-xl px-4 py-3 text-sm font-semibold shadow-lg ${styles[toast.type]}`}
        >
          <span aria-hidden="true">{icons[toast.type]}</span>
          <p className="flex-1">{toast.message}</p>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            aria-label="Cerrar notificación"
            className="opacity-70 hover:opacity-100"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
