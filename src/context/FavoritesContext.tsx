import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Character } from '../types/character'
import { useToast } from './ToastContext'
import ConfirmDialog from '../components/ConfirmDialog'

interface FavoritesContextValue {
  favorites: Character[]
  isFavorite: (id: number) => boolean
  addFavorite: (character: Character) => void
  /** Abre el modal de confirmación antes de quitar */
  requestRemove: (character: Character) => void
  toggleFavorite: (character: Character) => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

/**
 * El estado de favoritos vive aquí, por encima del Router (en App),
 * para que persista al navegar entre rutas.
 */
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Character[]>([])
  const [pendingRemove, setPendingRemove] = useState<Character | null>(null)
  const { showToast } = useToast()

  const isFavorite = (id: number) => favorites.some((f) => f.id === id)

  const addFavorite = (character: Character) => {
    if (isFavorite(character.id)) return
    setFavorites((list) => [...list, character])
    showToast(`${character.name} agregado a favoritos`, 'success')
  }

  const requestRemove = (character: Character) => setPendingRemove(character)

  const confirmRemove = () => {
    if (!pendingRemove) return
    setFavorites((list) => list.filter((f) => f.id !== pendingRemove.id))
    showToast(`${pendingRemove.name} se quitó de favoritos`, 'info')
    setPendingRemove(null)
  }

  const toggleFavorite = (character: Character) =>
    isFavorite(character.id) ? requestRemove(character) : addFavorite(character)

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, addFavorite, requestRemove, toggleFavorite }}
    >
      {children}
      <ConfirmDialog
        open={pendingRemove !== null}
        title="¿Quitar de favoritos?"
        confirmLabel="Quitar"
        danger
        onConfirm={confirmRemove}
        onCancel={() => setPendingRemove(null)}
      >
        ¿Estás seguro de que quieres quitar a{' '}
        <strong className="text-morty">{pendingRemove?.name}</strong> de tus favoritos?
      </ConfirmDialog>
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites debe usarse dentro de <FavoritesProvider>')
  return ctx
}
