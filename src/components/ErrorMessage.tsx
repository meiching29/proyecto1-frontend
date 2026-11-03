interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="mx-auto my-12 flex max-w-md flex-col items-center gap-2 rounded-2xl border border-red-500/40 bg-red-500/10 p-8 text-center"
    >
      <span className="text-5xl" role="img" aria-label="Error">
        ⚠️
      </span>
      <p className="font-bold text-red-400">{message}</p>
      <p className="text-sm text-red-300">Verifica tu conexión e intenta de nuevo.</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 rounded-full bg-red-500 px-6 py-2 text-sm font-bold text-white hover:bg-red-600"
        >
          Reintentar
        </button>
      )}
    </div>
  )
}
