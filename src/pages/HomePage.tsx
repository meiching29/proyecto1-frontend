import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import DarkPatternModal from '../components/DarkPatternModal'
import { useToast } from '../context/ToastContext'

// Se guarda fuera del componente para que el modal salga solo una vez por visita
let newsletterShown = false

export default function HomePage() {
  const [showNewsletter, setShowNewsletter] = useState(false)
  const { showToast } = useToast()

  useEffect(() => {
    if (newsletterShown) return
    const timer = setTimeout(() => {
      newsletterShown = true
      setShowNewsletter(true)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      aria-labelledby="hero-title"
      className="bg-stars flex min-h-[80vh] items-center px-4 py-16 text-center text-white"
    >
      <div className="mx-auto max-w-2xl">
        {/* Portal verde decorativo */}
        <div
          aria-hidden="true"
          className="portal-glow mx-auto mb-10 h-40 w-40 animate-[spin_12s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,var(--color-portal-dark),var(--color-portal-light),var(--color-portal),var(--color-portal-dark))] sm:h-52 sm:w-52"
        />
        <h1 id="hero-title" className="font-display text-5xl tracking-wide sm:text-6xl md:text-7xl">
          Descubre el <span className="text-portal">Multiverso</span>
        </h1>
        <p className="mt-4 text-rick sm:text-lg">
          Explora los personajes de Rick and Morty. Busca, filtra y guarda tus favoritos.
        </p>
        <Link
          to="/explorar"
          className="mt-8 inline-block rounded-full bg-portal px-8 py-3 text-lg font-bold text-space transition hover:scale-105 hover:bg-portal-light"
        >
          Explorar ahora
        </Link>
      </div>

      <DarkPatternModal
        open={showNewsletter}
        onAccept={() => {
          setShowNewsletter(false)
          showToast('¡Gracias por suscribirte al boletín!', 'success')
        }}
        onClose={() => setShowNewsletter(false)}
      />
    </section>
  )
}
