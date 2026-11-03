import { useEffect, useRef, useState } from 'react'

interface DarkPatternModalProps {
  open: boolean
  onClose: () => void
  onAccept: () => void
}

/*
 * ⚠️ DARK PATTERN INTENCIONAL (con fines educativos) ⚠️
 *
 * Este modal de "suscripción al boletín" usa a propósito varias prácticas
 * engañosas de UX que NO deberían usarse en un producto real:
 *
 * 1. Confirmshaming: el botón para rechazar dice "No, prefiero quedarme
 *    sin saber nada" para hacer sentir culpable al usuario si dice que no.
 * 2. Jerarquía visual engañosa: aceptar es un botón grande y llamativo;
 *    rechazar es un enlace pequeño y gris, fácil de pasar por alto.
 * 3. Casilla pre-marcada: "compartir mi correo con socios" viene marcada
 *    por defecto, así el usuario acepta algo que no pidió.
 * 4. Sin botón de cerrar (×) visible y se bloquea la tecla Escape, para
 *    que sea más difícil salir sin aceptar.
 * 5. Falsa urgencia: "Oferta solo por hoy" sin que exista tal límite.
 *
 * Lo correcto sería: opciones con el mismo peso visual, texto neutral
 * ("No, gracias"), casillas desmarcadas por defecto y un botón de cerrar claro.
 */
export default function DarkPatternModal({ open, onClose, onAccept }: DarkPatternModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  // Dark pattern #3: la casilla viene marcada por defecto
  const [shareWithPartners, setShareWithPartners] = useState(true)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="newsletter-title"
      // Dark pattern #4: se bloquea Escape para que no se pueda cerrar fácilmente
      onCancel={(e) => e.preventDefault()}
      className="m-auto w-[90%] max-w-md rounded-2xl border-2 border-portal bg-gradient-to-br from-space-2 to-portal-dark/60 p-8 text-center text-white shadow-2xl backdrop:bg-space/80"
    >
      {/* Dark pattern #5: falsa urgencia */}
      <p className="text-xs font-bold uppercase tracking-widest text-morty">
        ⏰ Oferta solo por hoy
      </p>
      <h2 id="newsletter-title" className="mt-2 font-display text-3xl tracking-wide text-portal">
        ¡Únete a la comunidad del Multiverso!
      </h2>
      <p className="mt-2 text-sm text-slate-300">
        Recibe noticias exclusivas de tus personajes favoritos directo en tu correo.
      </p>

      <label htmlFor="partners" className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-300">
        <input
          id="partners"
          type="checkbox"
          checked={shareWithPartners}
          onChange={(e) => setShareWithPartners(e.target.checked)}
        />
        Acepto compartir mi correo con socios comerciales
      </label>

      {/* Dark pattern #2: aceptar es enorme y llamativo */}
      <button
        type="button"
        onClick={onAccept}
        className="mt-6 w-full rounded-xl bg-morty py-3 text-lg font-bold text-space shadow-lg hover:brightness-110"
      >
        ¡Sí, quiero suscribirme!
      </button>

      {/* Dark pattern #1 y #2: confirmshaming con un enlace diminuto y gris */}
      <button
        type="button"
        onClick={onClose}
        className="mt-4 text-[10px] text-slate-500 underline hover:text-slate-400"
      >
        No, prefiero quedarme sin saber nada
      </button>
    </dialog>
  )
}
