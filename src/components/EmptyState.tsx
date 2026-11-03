import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: string
  message: string
  children?: ReactNode
}

export default function EmptyState({ icon = '📭', message, children }: EmptyStateProps) {
  return (
    <div
      role="status"
      className="mx-auto my-12 flex max-w-md flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-space-line p-10 text-center text-slate-300"
    >
      <span className="text-5xl" role="img" aria-label="Sin resultados">
        {icon}
      </span>
      <p>{message}</p>
      {children}
    </div>
  )
}
