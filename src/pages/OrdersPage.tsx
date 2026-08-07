import type { Order } from '../types'

interface OrdersPageProps {
  orders: Order[]
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void
}

const statusLabelMap: Record<Order['status'], string> = {
  PENDING: 'Pendiente',
  IN_PROGRESS: 'En preparación',
  READY: 'Listo',
  DELIVERED: 'Entregado',
  CANCELLED: 'Cancelado',
}

const statusOptions: Order['status'][] = ['PENDING', 'IN_PROGRESS', 'READY', 'DELIVERED', 'CANCELLED']

export function OrdersPage({ orders, onUpdateOrderStatus }: OrdersPageProps) {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Operaciones</span>
          <h2 className="text-2xl font-bold text-slate-900">Pedidos</h2>
        </div>
        <p className="text-sm text-slate-500">Consulta el estado y actualiza los pedidos activos.</p>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => (
          <article className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-200/60" key={order.order_id}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <strong className="block text-slate-900">{order.customerName}</strong>
                <small className="text-xs text-slate-500">{order.created_at}</small>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-800">{statusLabelMap[order.status]}</span>
                <select
                  className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  value={order.status}
                  onChange={(event) => onUpdateOrderStatus(order.order_id, event.target.value as Order['status'])}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {statusLabelMap[status]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-2">
              {order.items.map((item) => (
                <div key={item.order_item_id} className="flex items-center justify-between gap-3 text-sm text-slate-700">
                  <span>{item.product_name}</span>
                  <span>{item.quantity}x</span>
                  <span>{item.subtotal.toFixed(2)} €</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-semibold text-slate-900">
              <strong>Total</strong>
              <span>{order.total.toFixed(2)} €</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
