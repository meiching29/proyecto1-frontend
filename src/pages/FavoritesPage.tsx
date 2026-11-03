import { Link } from 'react-router'
import CharacterGrid from '../components/CharacterGrid'
import EmptyState from '../components/EmptyState'
import { useFavorites } from '../context/FavoritesContext'

export default function FavoritesPage() {
  const { favorites } = useFavorites()

  return (
    <section aria-labelledby="fav-title" className="mx-auto max-w-6xl px-4 py-10">
      <h1 id="fav-title" className="font-display text-4xl tracking-wide text-morty">
        Mis Favoritos
      </h1>
      <p className="mt-1 text-sm text-slate-400">{favorites.length} items guardados</p>

      <div className="mt-8">
        {favorites.length === 0 ? (
          <EmptyState icon="⭐" message="No tienes favoritos guardados">
            <Link to="/explorar" className="rounded-full bg-portal px-5 py-2 font-bold text-space hover:bg-portal-light">
              Explorar y agregar algunos
            </Link>
          </EmptyState>
        ) : (
          <CharacterGrid characters={favorites} />
        )}
      </div>
    </section>
  )
}
