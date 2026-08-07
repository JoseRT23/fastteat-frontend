import { useState, type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

interface CustomerLayoutProps {
  children: ReactNode
  cartCount: number
}

const navItems = [
  { to: '/explore', label: 'Productos' },
  { to: '/businesses', label: 'Negocios' },
  { to: '/my-orders', label: 'Mis pedidos' },
]

export function CustomerLayout({ children, cartCount }: CustomerLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuLinks = navItems.filter((item) => item.to !== '/checkout')

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <div className="text-lg font-black text-slate-900">FasTTeat</div>
            <div className="hidden text-xs text-slate-500 md:block">Ordena desde tu negocio favorito</div>
          </div>

          <div className="flex items-center gap-2">

            <nav className="hidden items-center gap-2 md:flex">
              {navItems.map((item) => {
                const label = item.to === '/checkout' ? `Carrito (${cartCount})` : item.label

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      [
                        'rounded-full px-3 py-2 text-sm font-semibold transition',
                        isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
                      ].join(' ')
                    }
                  >
                    {label}
                  </NavLink>
                )
              })}
            </nav>

            <NavLink
              to="/checkout"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                [
                  'relative inline-flex items-center justify-center rounded-full p-2.5 transition',
                  isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
                ].join(' ')
              }
              aria-label={`Ir al carrito, ${cartCount} artículos`}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 4h2l2 10h9l2-7H7" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="10" cy="18" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="16" cy="18" r="1.5" fill="currentColor" stroke="none" />
              </svg>
              {cartCount > 0 ? (
                <span className="ml-1 rounded-full bg-amber-500 px-2 py-0.5 text-[12px] font-bold text-white">
                  {cartCount}
                </span>
              ) : null}
            </NavLink>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-slate-100 p-2.5 text-slate-700 transition hover:bg-slate-200 md:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            </button>

          </div>
        </div>

        {menuOpen ? (
          <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
            <nav className="flex flex-col gap-2">
              {menuLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    [
                      'rounded-full px-3 py-2 text-sm font-semibold transition',
                      isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        ) : null}
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">{children}</main>
    </div>
  )
}
