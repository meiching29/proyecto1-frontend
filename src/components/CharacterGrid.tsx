import type { Character } from '../types/character'
import CharacterCard from './CharacterCard'

interface CharacterGridProps {
  characters: Character[]
}

/** Catálogo en 1 columna en móvil y 2 columnas de tarjetas horizontales en pantallas grandes. */
export default function CharacterGrid({ characters }: CharacterGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {characters.map((c) => (
        <li key={c.id}>
          <CharacterCard character={c} />
        </li>
      ))}
    </ul>
  )
}
