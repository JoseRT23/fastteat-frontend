import { useState, type FormEvent } from 'react'
import { Button, FormField } from '../components/ui'

interface LoginPageProps {
  onLogin: (email: string, password: string) => Promise<void>
  error: string | null
  isLoading: boolean
}

export function LoginPage({ onLogin, error, isLoading }: LoginPageProps) {
  const [email, setEmail] = useState('manager@fastteat.com')
  const [password, setPassword] = useState('fastteat123')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await onLogin(email, password)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 to-blue-100 p-6">
      <div className="w-full max-w-xl rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-6 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary-600">FastTeat</span>
          <h1 className="text-3xl font-bold text-neutral-900">Inicia sesión para administrar tu negocio</h1>
          <p className="text-sm text-neutral-500">Tu dashboard central para gestionar productos, pedidos y usuarios.</p>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <FormField id="email" label="Email">
            <input
              className="rounded-md border border-neutral-200 px-4 py-3 outline-none transition focus:border-primary-500"
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="manager@fastteat.com"
            />
          </FormField>

          <FormField id="password" label="Contraseña">
            <input
              className="rounded-md border border-neutral-200 px-4 py-3 outline-none transition focus:border-primary-500"
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
            />
          </FormField>

          {error ? <p className="rounded-md bg-danger-50 px-3 py-2 text-sm text-danger-600" role="alert">{error}</p> : null}
          <Button className="mt-2" size="lg" type="submit" disabled={isLoading}>
            {isLoading ? 'Entrando…' : 'Entrar al panel'}
          </Button>
        </form>
      </div>
    </div>
  )
}
