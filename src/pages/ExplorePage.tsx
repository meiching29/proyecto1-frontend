import { useEffect, useState } from 'react'
import CharacterGrid from '../components/CharacterGrid'
import EmptyState from '../components/EmptyState'
import ErrorMessage from '../components/ErrorMessage'
import Loader from '../components/Loader'
import SearchBar, { type StatusFilter } from '../components/SearchBar'
import { useToast } from '../context/ToastContext'
import { useFetch } from '../hooks/useFetch'
import type { CharacterListResponse } from '../types/character'

const API = 'https://rickandmortyapi.com/api/character'

export default function ExplorePage() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<StatusFilter>('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const { showToast } = useToast()

  // Espera 400 ms después de que el usuario deja de escribir para no hacer
  // una petición por cada tecla (la búsqueda sigue siendo en tiempo real).
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 400)
    return () => clearTimeout(t)
  }, [query])

  const params = new URLSearchParams()
  if (debouncedQuery) params.set('name', debouncedQuery)
  if (status) params.set('status', status)
  const url = params.size > 0 ? `${API}?${params}` : API

  // Fetch #1: lista de personajes
  const { data, loading, error, notFound, retry } = useFetch<CharacterListResponse>(url)

  useEffect(() => {
    if (error) showToast('Error al cargar los personajes', 'error')
  }, [error, showToast])

  const results = data?.results ?? []

  return (
    <>
      <section
        aria-labelledby="explore-title"
        className="bg-stars border-b border-space-line px-4 py-14 text-center text-white"
      >
        <h1 id="explore-title" className="font-display text-4xl tracking-wide sm:text-5xl">
          Explorar <span className="text-portal">Personajes</span>
        </h1>
        <p className="mt-2 text-sm text-rick">Datos obtenidos en tiempo real desde la API</p>
        <SearchBar
          query={query}
          status={status}
          onQueryChange={setQuery}
          onStatusChange={setStatus}
        />
      </section>

      <section aria-labelledby="results-title" className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="results-title" className="text-2xl font-extrabold text-white">
            Resultados
          </h2>
          {data && !loading && (
            <p className="rounded-full bg-space-3 px-3 py-1 text-sm text-slate-300" aria-live="polite">
              Mostrando {results.length} de {data.info.count} resultados
            </p>
          )}
        </div>

        {loading && <Loader />}
        {!loading && error && <ErrorMessage message={error} onRetry={retry} />}
        {!loading && !error && (notFound || results.length === 0) && (
          <EmptyState icon="🔍" message="No se encontraron personajes con esa búsqueda." />
        )}
        {!loading && !error && results.length > 0 && <CharacterGrid characters={results} />}
      </section>
    </>
  )
}
