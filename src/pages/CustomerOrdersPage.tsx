import type { Order } from "../types";
import { PageHeader } from "../components/ui/PageHeader";

interface CustomerOrdersPageProps {
  orders: Order[];
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

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export function CustomerOrdersPage({
  orders,
}: CustomerOrdersPageProps) {
  return (
    <section className="space-y-6">
      <PageHeader
        title="Mis pedidos"
      />

      <div className="grid gap-4">
        {orders.map((order) => (
          <article
            key={order.order_id}
            className="rounded-3xl bg-white p-5 shadow-sm shadow-slate-200/60"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <strong className="block text-slate-900">
                  Pedido {order.order_id}
                </strong>

                <small className="text-xs text-slate-500">
                  {order.created_at}
                </small>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  statusColorMap[order.status]
                }`}
              >
                {statusLabelMap[order.status]}
              </span>
            </div>

            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.order_item_id}
                  className="flex items-center justify-between gap-4"
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
              <span>Total</span>

              <span>{formatPrice(order.total)}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}