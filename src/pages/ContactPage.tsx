import { useState, type FormEvent } from 'react'
import ConfirmDialog from '../components/ConfirmDialog'
import FormField from '../components/FormField'
import { useToast } from '../context/ToastContext'

interface ContactForm {
  name: string
  email: string
  message: string
}

type FormErrors = Partial<Record<keyof ContactForm, string>>

const initialForm: ContactForm = { name: '', email: '', message: '' }

function validate(form: ContactForm): FormErrors {
  const errors: FormErrors = {}
  if (form.name.trim().length < 2) errors.name = 'El nombre debe tener al menos 2 caracteres.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    errors.email = 'Ingresa un email válido (debe contener @ y .)'
  if (form.message.trim().length < 10)
    errors.message = 'El mensaje debe tener al menos 10 caracteres.'
  return errors
}

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(initialForm)
  const [touched, setTouched] = useState<Record<keyof ContactForm, boolean>>({
    name: false,
    email: false,
    message: false,
  })
  const [confirmOpen, setConfirmOpen] = useState(false)
  const { showToast } = useToast()

  const errors = validate(form)
  const isValid = Object.keys(errors).length === 0

  const update = (field: keyof ContactForm) => (value: string) => {
    setForm((f) => ({ ...f, [field]: value }))
    setTouched((t) => ({ ...t, [field]: true }))
  }
  const touch = (field: keyof ContactForm) => () => setTouched((t) => ({ ...t, [field]: true }))

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isValid) {
      showToast('Revisa los campos del formulario', 'error')
      return
    }
    setConfirmOpen(true)
  }

  const handleConfirm = () => {
    setConfirmOpen(false)
    showToast(`¡Gracias ${form.name.trim()}! Tu mensaje fue enviado.`, 'success')
    setForm(initialForm)
    setTouched({ name: false, email: false, message: false })
  }

  return (
    <section aria-labelledby="contact-title" className="mx-auto max-w-xl px-4 py-10">
      <h1 id="contact-title" className="font-display text-4xl tracking-wide text-portal">
        Contacto
      </h1>
      <p className="mt-1 text-sm text-slate-400">
        ¿Tienes preguntas o sugerencias? Envíanos un mensaje.
      </p>

      <form
        noValidate
        onSubmit={handleSubmit}
        aria-label="Formulario de contacto"
        className="mt-6 space-y-5 rounded-3xl border border-space-line bg-space-2 p-6 sm:p-8"
      >
        <FormField
          id="name"
          label="Nombre"
          value={form.name}
          placeholder="Tu nombre"
          error={touched.name ? errors.name : undefined}
          onChange={update('name')}
          onBlur={touch('name')}
        />
        <FormField
          id="email"
          label="Email"
          type="email"
          value={form.email}
          placeholder="tu@correo.com"
          error={touched.email ? errors.email : undefined}
          onChange={update('email')}
          onBlur={touch('email')}
        />
        <FormField
          id="message"
          label="Mensaje"
          multiline
          value={form.message}
          placeholder="Escribe tu mensaje aquí..."
          error={touched.message ? errors.message : undefined}
          onChange={update('message')}
          onBlur={touch('message')}
        />

        <button
          type="submit"
          disabled={!isValid}
          className="w-full rounded-full bg-portal py-3 font-bold text-space transition hover:bg-portal-light disabled:cursor-not-allowed disabled:bg-space-3 disabled:text-slate-500"
        >
          Enviar mensaje
        </button>
      </form>

      <ConfirmDialog
        open={confirmOpen}
        title="¿Enviar mensaje?"
        confirmLabel="Enviar"
        onConfirm={handleConfirm}
        onCancel={() => {
          setConfirmOpen(false)
          showToast('Envío cancelado', 'info')
        }}
      >
        Se enviará tu mensaje al equipo del Explorador.
      </ConfirmDialog>
    </section>
  )
}
