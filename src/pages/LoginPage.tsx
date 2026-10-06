import { useState } from 'react'
import { Button, FormField } from '../components/ui'
import type { LoginResponse } from '../services/apiService'

interface LoginPageProps {
  onLogin: (email: string, password: string, businessId?: string) => Promise<LoginResponse | undefined>
  loginError : string | null
  isLoginLoading: boolean
}

export function LoginPage({ onLogin, loginError , isLoginLoading }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [businesses, setBusinesses] = useState<NonNullable<LoginResponse['businesses']>>([])
  const [selectedBusinessId, setSelectedBusinessId] = useState('')

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = await onLogin(email, password, businesses.length ? selectedBusinessId : undefined)

    if (result?.multipleBusinesses) {
      const options = result.businesses ?? []
      setBusinesses(options)
      setSelectedBusinessId(options[0]?.business_id ?? '')
    } else if (result?.token) {
      setBusinesses([])
      setSelectedBusinessId('')
    }
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
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                setBusinesses([])
                setSelectedBusinessId('')
              }}
              placeholder="manager@fastteat.com"
            />
          </FormField>

          <FormField id="password" label="Contraseña">
            <input
              className="rounded-md border border-neutral-200 px-4 py-3 outline-none transition focus:border-primary-500"
              id="password"
              type="password"
              required
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
                setBusinesses([])
                setSelectedBusinessId('')
              }}
              placeholder="••••••••"
            />
          </FormField>

          {businesses.length > 0 ? (
            <FormField id="business" label="Selecciona el negocio">
              <select
                className="rounded-md border border-neutral-200 px-4 py-3 outline-none transition focus:border-primary-500"
                id="business"
                value={selectedBusinessId}
                onChange={(event) => setSelectedBusinessId(event.target.value)}
                required
              >
                {businesses.map((business) => (
                  <option key={business.business_id} value={business.business_id}>
                    {business.business_name}
                  </option>
                ))}
              </select>
            </FormField>
          ) : null}

          {loginError  ? <p className="rounded-md bg-danger-50 px-3 py-2 text-sm text-danger-600" role="alert">{loginError }</p> : null}
          <Button className="mt-2" size="lg" type="submit" disabled={isLoginLoading || (businesses.length > 0 && !selectedBusinessId)}>
            {isLoginLoading ? 'Entrando…' : businesses.length > 0 ? 'Continuar' : 'Entrar al panel'}
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
