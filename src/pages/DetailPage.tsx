import { Link, useParams } from 'react-router'
import EmptyState from '../components/EmptyState'
import ErrorMessage from '../components/ErrorMessage'
import Loader from '../components/Loader'
import { useFavorites } from '../context/FavoritesContext'
import { useFetch } from '../hooks/useFetch'
import {
  statusLabel,
  translateGender,
  translatePlace,
  translateSpecies,
  type Character,
} from '../types/character'

export default function DetailPage() {
  const { id } = useParams<{ id: string }>()
  // Fetch #2: detalle de un personaje por ID (ruta dinámica)
  const { data, loading, error, notFound, retry } = useFetch<Character>(
    `https://rickandmortyapi.com/api/character/${id}`,
  )
  const { isFavorite, toggleFavorite } = useFavorites()

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <Link to="/explorar" className="text-sm font-semibold text-portal hover:underline">
        ← Volver a explorar
      </Link>

      {loading && <Loader />}
      {!loading && error && <ErrorMessage message={error} onRetry={retry} />}
      {!loading && notFound && (
        <EmptyState icon="👽" message="Ese personaje no existe en este universo." />
      )}

      {!loading && data && (
        <article className="mt-6 flex flex-col overflow-hidden rounded-3xl border-2 border-portal bg-space-2 shadow-[0_0_40px_rgb(151_206_76/0.25)] md:flex-row">
          <img
            src={data.image}
            alt={`Imagen de ${data.name}`}
            className="w-full object-cover md:w-80"
          />
          <div className="flex-1 p-6 sm:p-8">
            <h1 className="font-display text-4xl tracking-wide text-portal">{data.name}</h1>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 text-sm">
              <dt className="text-slate-400">Estado:</dt>
              <dd className="font-semibold text-white">{statusLabel[data.status]}</dd>
              <dt className="text-slate-400">Especie:</dt>
              <dd className="font-semibold text-white">{translateSpecies(data.species)}</dd>
              <dt className="text-slate-400">Género:</dt>
              <dd className="font-semibold text-white">{translateGender(data.gender)}</dd>
              <dt className="text-slate-400">Origen:</dt>
              <dd className="font-semibold text-white">{translatePlace(data.origin.name)}</dd>
              <dt className="text-slate-400">Ubicación:</dt>
              <dd className="font-semibold text-white">{translatePlace(data.location.name)}</dd>
              <dt className="text-slate-400">Episodios:</dt>
              <dd className="font-semibold text-white">{data.episode.length}</dd>
            </dl>

            <button
              type="button"
              onClick={() => toggleFavorite(data)}
              aria-pressed={isFavorite(data.id)}
              className={`mt-8 rounded-full px-6 py-2.5 text-sm font-bold transition ${
                isFavorite(data.id)
                  ? 'bg-morty text-space hover:brightness-110'
                  : 'bg-portal text-space hover:bg-portal-light'
              }`}
            >
              {isFavorite(data.id) ? '★ Quitar de favoritos' : '☆ Agregar a favoritos'}
            </button>
          </div>
        </article>
      )}
    </section>
  )
}
