import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, FormField } from '../components/ui'
import type { LoginResponse } from '../services/apiService'

interface CustomerLoginPageProps {
  onLogin: (email: string, password: string) => Promise<LoginResponse | undefined>
  loginError: string | null
  isLoginLoading: boolean
}

export function CustomerLoginPage({ onLogin, loginError, isLoginLoading }: CustomerLoginPageProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const registered = (location.state as { registered?: boolean } | null)?.registered

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = await onLogin(email, password)

    if (result) {
      navigate('/my-orders', { replace: true })
    }
  }

  return (
    <div className="grid min-h-[calc(100vh-5rem)] items-center gap-10 py-8 lg:grid-cols-2 lg:gap-16">
      <section className="mx-auto w-full max-w-lg">
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary-600">FastTeat</span>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-neutral-900 sm:text-5xl">
          Tus favoritos, a un inicio de sesión.
        </h1>
        <p className="mt-4 max-w-md text-base leading-7 text-neutral-500">
          Entra a tu cuenta para consultar tus pedidos y seguir disfrutando de tus negocios favoritos.
        </p>
      </section>

      <section className="mx-auto w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-6 shadow-md sm:p-8">
        <div className="mb-6">
          <p className="text-sm font-semibold text-primary-600">Bienvenido de nuevo</p>
          <h2 className="mt-1 text-2xl font-bold text-neutral-900">Iniciar sesión</h2>
          <p className="mt-2 text-sm text-neutral-500">Ingresa tus datos para continuar.</p>
        </div>

        {registered ? (
          <p className="mb-4 rounded-xl bg-success-50 px-4 py-3 text-sm text-success-700" role="status">
            Tu cuenta fue creada. Ya puedes iniciar sesión.
          </p>
        ) : null}

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <FormField id="customer-email" label="Correo electrónico">
            <input
              autoComplete="email"
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-primary-500"
              id="customer-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="tu@correo.com"
            />
          </FormField>

          <FormField id="customer-password" label="Contraseña">
            <input
              autoComplete="current-password"
              className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-primary-500"
              id="customer-password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Tu contraseña"
            />
          </FormField>

          {loginError ? (
            <p className="rounded-xl bg-danger-50 px-4 py-3 text-sm text-danger-600" role="alert">
              {loginError}
            </p>
          ) : null}

          <Button className="mt-2 w-full rounded-xl" size="lg" type="submit" disabled={isLoginLoading}>
            {isLoginLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500">
          ¿Aún no tienes cuenta?{' '}
          <Link className="font-semibold text-primary-600 hover:text-primary-700" to="/register">
            Regístrate
          </Link>
        </p>
      </section>
    </div>
  )
}
