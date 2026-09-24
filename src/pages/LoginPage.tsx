import { useState } from 'react'
import { Button, FormField } from '../components/ui'

interface LoginPageProps {
  onLogin: (email: string, password: string) => Promise<void>
  loginError : string | null
  isLoginLoading: boolean
}

export function LoginPage({ onLogin, loginError , isLoginLoading }: LoginPageProps) {
  const [email, setEmail] = useState('manager@fastteat.com')
  const [password, setPassword] = useState('fastteat123')

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
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

          {loginError  ? <p className="rounded-md bg-danger-50 px-3 py-2 text-sm text-danger-600" role="alert">{loginError }</p> : null}
          <Button className="mt-2" size="lg" type="submit" disabled={isLoginLoading}>
            {isLoginLoading ? 'Entrando…' : 'Entrar al panel'}
          </Button>

          <div className="text-center space-y-3">
            <p className="text-sm text-neutral-500">No tienes una cuenta?
              <a href="/business/register" className="font-medium text-primary-600 hover:text-primary-500"> Regístrate aquí</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
