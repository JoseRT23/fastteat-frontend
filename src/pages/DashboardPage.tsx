import type { BusinessUser, Order, Product } from '../types'

interface DashboardPageProps {
  products: Product[]
  orders: Order[]
  users: BusinessUser[]
}

export function DashboardPage({ products, orders, users }: DashboardPageProps) {
  const activeProducts = products.filter((product) => product.active).length
  const pendingOrders = orders.filter((order) => order.status === 'PENDING').length
  const activeUsers = users.filter((user) => user.active).length

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Resumen</span>
          <h2 className="text-2xl font-bold text-slate-900">Dashboard del negocio</h2>
        </div>
        <p className="text-sm text-slate-500">Control rápido de pedidos, productos y colaboración interna.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-200/60">
          <strong className="block text-3xl font-bold text-slate-900">{activeProducts}</strong>
          <span className="text-sm text-slate-500">Productos activos</span>
        </article>
        <article className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-200/60">
          <strong className="block text-3xl font-bold text-slate-900">{pendingOrders}</strong>
          <span className="text-sm text-slate-500">Pedidos pendientes</span>
        </article>
        <article className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-200/60">
          <strong className="block text-3xl font-bold text-slate-900">{activeUsers}</strong>
          <span className="text-sm text-slate-500">Usuarios activos</span>
        </article>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-200/60">
          <h3 className="mb-3 text-lg font-semibold text-slate-900">Pedidos recientes</h3>
          <ul className="grid gap-3">
            {orders.slice(0, 3).map((order) => (
              <li key={order.order_id} className="flex items-center justify-between gap-3">
                <div>
                  <strong className="block text-sm text-slate-900">{order.customerName}</strong>
                  <small className="text-xs text-slate-500">{order.status}</small>
                </div>
                <span className="text-sm font-semibold text-slate-700">{order.total.toFixed(2)} €</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-200/60">
          <h3 className="mb-3 text-lg font-semibold text-slate-900">Productos destacados</h3>
          <ul className="grid gap-3">
            {products.slice(0, 3).map((product) => (
              <li key={product.product_id} className="flex items-center justify-between gap-3">
                <div>
                  <strong className="block text-sm text-slate-900">{product.name}</strong>
                  <small className="text-xs text-slate-500">{product.active ? 'Activo' : 'Inactivo'}</small>
                </div>
                <span className="text-sm font-semibold text-slate-700">{product.current_price.toFixed(2)} €</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}
