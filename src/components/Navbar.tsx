import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { useFavorites } from '../context/FavoritesContext'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/explorar', label: 'Explorar' },
  { to: '/favoritos', label: 'Favoritos' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { favorites } = useFavorites()

  return (
    <header className="sticky top-0 z-40 border-b border-space-line bg-space/95 text-white backdrop-blur">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3"
      >
        <Link to="/" className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="portal-glow h-7 w-7 rounded-full bg-[radial-gradient(circle,var(--color-portal-light),var(--color-portal-dark))]"
          />
          <span className="font-display text-2xl tracking-wide text-portal">Explorador</span>
        </Link>

        <button
          type="button"
          className="rounded p-2 text-portal sm:hidden"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="menu-principal"
          onClick={() => setMenuOpen((o) => !o)}
        >
          ☰
        </button>

        <ul
          id="menu-principal"
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } absolute left-0 right-0 top-full flex-col gap-1 border-b border-space-line bg-space px-4 pb-4 sm:static sm:flex sm:flex-row sm:gap-2 sm:border-0 sm:bg-transparent sm:p-0`}
        >
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-portal text-space'
                      : 'text-slate-300 hover:bg-space-3 hover:text-portal'
                  }`
                }
              >
                {link.label}
                {link.to === '/favoritos' && favorites.length > 0 && (
                  <span
                    className="ml-1 rounded-full bg-morty px-1.5 text-xs font-bold text-space"
                    aria-label={`${favorites.length} favoritos`}
                  >
                    {favorites.length}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
