import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, FormField } from '../components/ui'
import { apiService } from '../services/apiService'

type CustomerForm = {
  name: string
  email: string
  phone: string
  password: string
}

export function CustomerRegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<CustomerForm>({
    name: '',
    email: '',
    phone: '',
    password: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await apiService.createUser(form)
      navigate('/login', { replace: true, state: { registered: true } })
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'No se pudo crear la cuenta.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid min-h-[calc(100vh-5rem)] items-center gap-10 py-8 lg:grid-cols-2 lg:gap-16">
      <section className="mx-auto w-full max-w-lg">
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary-600">FastTeat</span>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-neutral-900 sm:text-5xl">
          Todo lo que te gusta, en un solo lugar.
        </h1>
        <p className="mt-4 max-w-md text-base leading-7 text-neutral-500">
          Crea tu cuenta para descubrir negocios, guardar tus pedidos y disfrutar de una experiencia más fácil.
        </p>
      </section>

      <section className="mx-auto w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-6 shadow-md sm:p-8">
        <div className="mb-6">
          <p className="text-sm font-semibold text-primary-600">Únete a FastTeat</p>
          <h2 className="mt-1 text-2xl font-bold text-neutral-900">Crear cuenta</h2>
          <p className="mt-2 text-sm text-neutral-500">Completa tus datos para registrarte como cliente.</p>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <FormField id="customer-name" label="Nombre completo">
            <input
              autoComplete="name"
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-primary-500"
              id="customer-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
            />
          </FormField>

          <FormField id="customer-email" label="Correo electrónico">
            <input
              autoComplete="email"
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-primary-500"
              id="customer-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="tu@correo.com"
              required
            />
          </FormField>

          <FormField id="customer-phone" label="Teléfono">
            <input
              autoComplete="tel"
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-primary-500"
              id="customer-phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="Tu número de teléfono"
              required
            />
          </FormField>

          <FormField id="customer-password" label="Contraseña">
            <input
              autoComplete="new-password"
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-primary-500"
              id="customer-password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Crea una contraseña"
              required
            />
          </FormField>

          {error ? (
            <p className="rounded-xl bg-danger-50 px-4 py-3 text-sm text-danger-600" role="alert">
              {error}
            </p>
          ) : null}

          <Button className="mt-2 w-full rounded-xl" size="lg" type="submit" disabled={isLoading}>
            {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500">
          ¿Ya tienes cuenta?{' '}
          <Link className="font-semibold text-primary-600 hover:text-primary-700" to="/login">
            Inicia sesión
          </Link>
        </p>
      </section>
    </div>
  )
}
