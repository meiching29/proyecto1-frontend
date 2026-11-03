interface FormFieldProps {
  id: string
  label: string
  value: string
  error?: string
  type?: 'text' | 'email'
  multiline?: boolean
  placeholder?: string
  onChange: (value: string) => void
  onBlur?: () => void
}

/** Campo de formulario controlado con label (htmlFor) y mensaje de error accesible. */
export default function FormField({
  id,
  label,
  value,
  error,
  type = 'text',
  multiline = false,
  placeholder,
  onChange,
  onBlur,
}: FormFieldProps) {
  const errorId = `${id}-error`
  const base = `w-full rounded-xl border-2 bg-space px-4 py-2.5 text-white placeholder:text-slate-500 outline-none focus:ring-4 ${
    error
      ? 'border-red-500 focus:ring-red-500/20'
      : 'border-space-line focus:border-portal focus:ring-portal/20'
  }`

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold text-rick">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={5}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={base}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={base}
        />
      )}
      {error && (
        <p id={errorId} className="mt-1 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
