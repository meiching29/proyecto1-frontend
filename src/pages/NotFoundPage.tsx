import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <section aria-labelledby="nf-title" className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-9xl text-portal drop-shadow-[0_0_25px_rgb(151_206_76/0.6)] sm:text-[10rem]" aria-hidden="true">
        404
      </p>
      <h1 id="nf-title" className="mt-2 text-2xl font-extrabold text-white">
        Página no encontrada
      </h1>
      <p className="mt-2 text-rick">Parece que esta dimensión no existe. La ruta que buscas no está en esta aplicación.</p>
      <Link
        to="/"
        className="mt-6 rounded-full bg-portal px-8 py-3 font-bold text-space hover:bg-portal-light"
      >
        Volver al inicio
      </Link>
    </section>
  )
}
