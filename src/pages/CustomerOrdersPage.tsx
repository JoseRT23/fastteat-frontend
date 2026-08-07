import type { Order } from '../types'

interface CustomerOrdersPageProps {
  orders: Order[]
}

const statusLabelMap: Record<Order['status'], string> = {
  PENDING: 'Pendiente',
  IN_PROGRESS: 'En preparación',
  READY: 'Listo',
  ACCEPTED: 'Aceptado',
  DELIVERED: 'Entregado',
  CANCELLED: 'Cancelado',
}

export function CustomerOrdersPage({ orders }: CustomerOrdersPageProps) {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl bg-white p-5 shadow-sm shadow-slate-200/60">
        <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Estado</span>
        <h2 className="text-2xl font-bold text-slate-900">Mis pedidos</h2>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => (
          <article key={order.order_id} className="rounded-3xl bg-white p-5 shadow-sm shadow-slate-200/60">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <strong className="block text-slate-900">Pedido {order.order_id}</strong>
                <small className="text-xs text-slate-500">{order.created_at}</small>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{statusLabelMap[order.status]}</span>
            </div>

            <div className="space-y-2 text-sm text-slate-700">
              {order.items.map((item) => (
                <div key={item.order_item_id} className="flex items-center justify-between gap-3">
                  <span>{item.product_name}</span>
                  <span>{item.quantity}x</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-sm font-semibold text-slate-900">
              <span>Total</span>
              <span>{order.total.toFixed(2)} €</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
