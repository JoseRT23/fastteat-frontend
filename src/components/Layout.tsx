import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import type { BusinessUser } from '../types'

interface LayoutProps {
  children: ReactNode
  currentUser: BusinessUser | null
  onLogout: () => void
}

const navItems = [
  { to: '/business/dashboard', label: 'Dashboard' },
  { to: '/business/products', label: 'Productos' },
  { to: '/business/orders', label: 'Pedidos' },
  { to: '/business/users', label: 'Usuarios' },
]

export function Layout({ children, currentUser, onLogout }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="flex flex-col justify-between gap-8 bg-slate-950 p-6 text-white lg:min-h-screen">
        <div>
          <div className="mb-2 text-2xl font-black">FasTTeat</div>
          <p className="text-sm text-slate-300">Panel del negocio</p>
        </div>

        <nav className="grid gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'rounded-xl px-3 py-2 text-sm font-medium transition',
                  isActive
                    ? 'bg-white/15 text-white'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="grid gap-2 border-t border-white/15 pt-4 text-sm">
          <strong>{currentUser?.name ?? 'Usuario'}</strong>
          <span className="text-slate-300">{currentUser?.role ?? 'ADMIN'}</span>
          <button className="rounded-xl bg-transparent px-0 py-2 text-left font-semibold text-white" onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="p-6 lg:p-8">{children}</main>
    </div>
  )
}
