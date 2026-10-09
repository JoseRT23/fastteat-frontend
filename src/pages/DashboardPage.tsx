import type { BusinessUser, Order, Product } from '../types'
import { PageHeader, StatCard } from '../components/ui'

interface DashboardPageProps {
  products: Product[]
  orders: Order[]
  users: BusinessUser[]
}

const statusLabelMap: Record<Order['status'], string> = {
  PENDING: 'Pendiente',
  IN_PROGRESS: 'En preparación',
  READY: 'Listo',
  ACCEPTED: 'Aceptado',
  DELIVERED: 'Entregado',
  CANCELLED: 'Cancelado',
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function DashboardPage({
  products,
  orders,
  users,
}: DashboardPageProps) {
  const activeProducts = products.filter((product) => product.active).length
  const pendingOrders = orders.filter((order) => order.status === 'PENDING').length
  const activeUsers = users.filter((user) => user.active).length

  return (
    <section className="space-y-6">
      <PageHeader title="Dashboard del negocio" />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard value={activeProducts} label="Productos activos" />
        <StatCard value={pendingOrders} label="Pedidos pendientes" />
        <StatCard value={activeUsers} label="Usuarios activos" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-lg bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-neutral-900">
            Pedidos recientes
          </h2>

          <ul className="grid gap-3">
            {orders.slice(0, 3).map((order) => (
              <li
                key={order.order_id}
                className="flex items-center justify-between gap-3"
              >
                <div>
                  <strong className="block text-sm text-neutral-900">
                    {order.customerName}
                  </strong>

                  <small className="text-xs text-neutral-500">
                    {statusLabelMap[order.status]}
                  </small>
                </div>

                <span className="text-sm font-semibold text-neutral-700">
                  {formatPrice(order.total)}
                </span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-lg bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold text-neutral-900">
            Productos destacados
          </h2>

          <ul className="grid gap-3">
            {products.slice(0, 3).map((product) => (
              <li
                key={product.product_id}
                className="flex items-center justify-between gap-3"
              >
                <div>
                  <strong className="block text-sm text-neutral-900">
                    {product.name}
                  </strong>

                  <small className="text-xs text-neutral-500">
                    {product.active ? 'Activo' : 'Inactivo'}
                  </small>
                </div>

                <span className="text-sm font-semibold text-neutral-700">
                  {formatPrice(product.current_price)}
                </span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}