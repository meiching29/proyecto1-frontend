export default function Footer() {
  return (
    <footer className="border-t border-space-line bg-space py-6 text-center text-sm text-slate-400">
      <p>
        Datos obtenidos de{' '}
        <a
          href="https://rickandmortyapi.com"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-portal hover:underline"
        >
          The Rick and Morty API
        </a>
      </p>
    </footer>
  )
}
