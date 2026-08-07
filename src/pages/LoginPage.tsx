import { useState, type FormEvent } from 'react'

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-sky-100 p-6">
      <div className="w-full max-w-xl rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/70">
        <div className="mb-6 space-y-3">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">FastTeat</span>
          <h1 className="text-3xl font-bold text-slate-900">Inicia sesión para administrar tu negocio</h1>
          <p className="text-sm text-slate-500">Tu dashboard central para gestionar productos, pedidos y usuarios.</p>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>Email</span>
            <input
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none ring-0 transition focus:border-blue-500"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="manager@fastteat.com"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>Contraseña</span>
            <input
              className="rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
            />
          </label>

          {error ? <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p> : null}
          <button className="mt-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400" type="submit" disabled={isLoading}>
            {isLoading ? 'Entrando…' : 'Entrar al panel'}
          </button>
        </form>
      </div>
    </div>
  )
}
