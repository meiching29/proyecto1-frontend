import type { CharacterStatus } from '../types/character'

export type StatusFilter = CharacterStatus | ''

interface SearchBarProps {
  query: string
  status: StatusFilter
  onQueryChange: (value: string) => void
  onStatusChange: (value: StatusFilter) => void
}

const fieldClass =
  'rounded-full border-2 border-space-line bg-space-2 px-5 py-2.5 text-white placeholder:text-slate-500 outline-none focus:border-portal focus:ring-4 focus:ring-portal/20'

/** Búsqueda por nombre + filtro por estado. Ambos se aplican en tiempo real. */
export default function SearchBar({ query, status, onQueryChange, onStatusChange }: SearchBarProps) {
  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className="mx-auto mt-8 flex w-full max-w-2xl flex-col gap-3 sm:flex-row"
    >
      <label htmlFor="search" className="sr-only">
        Buscar personajes por nombre
      </label>
      <input
        id="search"
        type="search"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Buscar personajes..."
        className={`flex-1 ${fieldClass}`}
      />

      <label htmlFor="status" className="sr-only">
        Filtrar por estado
      </label>
      <select
        id="status"
        value={status}
        onChange={(e) => onStatusChange(e.target.value as StatusFilter)}
        className={`${fieldClass} [&>option]:bg-space-2`}
      >
        <option value="">Todos los estados</option>
        <option value="Alive">Vivo</option>
        <option value="Dead">Muerto</option>
        <option value="unknown">Desconocido</option>
      </select>
    </form>
  )
}
