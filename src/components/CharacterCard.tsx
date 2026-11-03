import { Link } from 'react-router'
import { useFavorites } from '../context/FavoritesContext'
import {
  statusLabel,
  translatePlace,
  translateSpecies,
  type Character,
  type CharacterStatus,
} from '../types/character'

interface CharacterCardProps {
  character: Character
}

// Color del punto de estado: verde portal = vivo, rojo = muerto, gris = desconocido
const statusDot: Record<CharacterStatus, string> = {
  Alive: 'bg-portal',
  Dead: 'bg-red-500',
  unknown: 'bg-slate-400',
}

/** Tarjeta horizontal: imagen a la izquierda e información a la derecha. */
export default function CharacterCard({ character }: CharacterCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(character.id)

  return (
    <article className="group relative flex h-full overflow-hidden rounded-2xl border border-space-line bg-space-2 transition hover:-translate-y-1 hover:border-portal hover:shadow-[0_0_25px_rgb(151_206_76/0.35)]">
      <Link
        to={`/explorar/${character.id}`}
        className="flex flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-portal"
      >
        <img
          src={character.image}
          alt={`Imagen de ${character.name}`}
          loading="lazy"
          className="h-auto w-32 shrink-0 object-cover sm:w-44"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-2 p-4 pr-12">
          <h3 className="truncate text-lg font-extrabold text-white group-hover:text-portal">
            {character.name}
          </h3>
          <p className="flex items-center gap-2 text-sm text-slate-200">
            <span
              aria-hidden="true"
              className={`h-2.5 w-2.5 rounded-full ${statusDot[character.status]}`}
            />
            {statusLabel[character.status]} · {translateSpecies(character.species)}
          </p>
          <div className="mt-auto">
            <p className="text-xs uppercase tracking-wide text-slate-400">Origen</p>
            <p className="truncate text-sm text-rick">{translatePlace(character.origin.name)}</p>
          </div>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => toggleFavorite(character)}
        aria-label={
          fav ? `Quitar a ${character.name} de favoritos` : `Agregar a ${character.name} a favoritos`
        }
        aria-pressed={fav}
        className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border text-lg transition ${
          fav
            ? 'border-morty bg-morty text-space'
            : 'border-space-line bg-space-3 text-slate-400 hover:border-morty hover:text-morty'
        }`}
      >
        ★
      </button>
    </article>
  )
}
