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

const statusColorMap: Record<Order["status"], string> = {
  PENDING: "bg-amber-100 text-amber-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  READY: "bg-emerald-100 text-emerald-700",
  ACCEPTED: "bg-sky-100 text-sky-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const statusOptions: Order["status"][] = [
  "PENDING",
  "ACCEPTED",
  "IN_PROGRESS",
  "READY",
  "DELIVERED",
  "CANCELLED",
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export function OrdersPage({ orders, onUpdateOrderStatus }: OrdersPageProps) {
  return (
    <section className="space-y-6">
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
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    statusColorMap[order.status]
                  }`}
                >
                  {statusLabelMap[order.status]}
                </span>

                <select
                  className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
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
                    value={status}>
                      {statusLabelMap[status]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.order_item_id}
                  className="flex items-center justify-between gap-4 text-sm"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-slate-800">
                      {item.product_name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {item.quantity} u. × {formatPrice(item.unit_price)}
                    </p>
                  </div>

                  <span className="shrink-0 font-semibold text-slate-900">
                    {formatPrice(item.subtotal)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-semibold text-slate-900">
              <strong>Total</strong>

              <span>{formatPrice(order.total)}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}