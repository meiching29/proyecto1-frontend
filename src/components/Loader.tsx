export default function Loader({ text = 'Abriendo portal...' }: { text?: string }) {
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center gap-4 py-20 text-portal">
      {/* Spinner con forma de portal verde */}
      <span
        aria-hidden="true"
        className="portal-glow h-14 w-14 animate-spin rounded-full border-4 border-portal/20 border-t-portal border-r-portal-light"
      />
      <p className="font-semibold">{text}</p>
    </div>
  )
}
