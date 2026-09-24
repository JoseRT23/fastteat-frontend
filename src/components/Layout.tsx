import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from './ui'
import type { BusinessUser } from '../types'

interface LayoutProps {
  children: ReactNode
  currentUser: BusinessUser | undefined
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
    <div className="min-h-screen bg-neutral-100 lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="flex flex-col justify-between gap-8 bg-secondary-950 p-6 text-white lg:min-h-screen">
        <div>
          <div className="mb-2 text-2xl font-black">FasTTeat</div>
          <p className="text-sm text-neutral-300">Panel del negocio</p>
        </div>

        <nav className="grid gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-white/15 text-white'
                    : 'text-neutral-300 hover:bg-white/10 hover:text-white',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="grid gap-2 border-t border-white/15 pt-4 text-sm">
          <strong>{currentUser?.name ?? 'Usuario'}</strong>
          {/* <span className="text-neutral-300">{currentUser?.role ?? 'ADMIN'}</span> */}
          <span className="text-neutral-300">{'ADMIN'}</span>
          <Button variant="ghost" className="justify-start px-0 !text-white hover:bg-white/10" onClick={onLogout}>
            Cerrar sesión
          </Button>
        </div>
      </aside>

      <main className="p-6 lg:p-8">{children}</main>
    </div>
  )
}
