import type { Order } from "../types";
import { PageHeader } from "../components/ui";

interface OrdersPageProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order["status"]) => void;
}

const statusLabelMap: Record<Order["status"], string> = {
  PENDING: "Pendiente",
  IN_PROGRESS: "En preparación",
  READY: "Listo",
  ACCEPTED: "Aceptado",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
};

const statusOptions: Order["status"][] = [
  "PENDING",
  "IN_PROGRESS",
  "READY",
  "DELIVERED",
  "CANCELLED",
];

export function OrdersPage({ orders, onUpdateOrderStatus }: OrdersPageProps) {
  return (
    <section className="space-y-6">
      {" "}
      <PageHeader
        eyebrow="Operaciones"
        title="Pedidos"
        description="Consulta el estado y actualiza los pedidos activos."
      />
      <div className="grid gap-4">
        {orders.map((order) => (
          <article
            className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-200/60"
            key={order.order_id}
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <strong className="block text-slate-900">
                  {order.customerName}
                </strong>
                <small className="text-xs text-slate-500">
                  {order.created_at}
                </small>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-800">
                  {statusLabelMap[order.status]}
                </span>
                <select
                  className="cursor-pointer rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  value={order.status}
                  onChange={(event) =>
                    onUpdateOrderStatus(
                      order.order_id,
                      event.target.value as Order["status"],
                    )
                  }
                >
                  {statusOptions.map((status) => (
  <option
    key={status}
    value={status}
    className="cursor-pointer"
  >
    {statusLabelMap[status]}
  </option>
))}
                </select>
              </div>
            </div>

            <div className="grid gap-2">
              {order.items.map((item) => (
                <div
                  key={item.order_item_id}
                  className="flex items-center justify-between gap-3 text-sm text-slate-700"
                >
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
  );
}
